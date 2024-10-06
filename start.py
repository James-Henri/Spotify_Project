from flask import Flask, render_template, request, url_for, session, redirect
from dotenv import load_dotenv
import os
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import time

app = Flask(__name__)

app.secret_key = "PleaseChange"
app.config['SESSION_COOKIE_NAME'] = 'Users Cookie'
TOKEN_INFO = "token_info"

def configure():    # configure will get the secret API Keys
    load_dotenv()

@app.route("/", methods = ['GET', 'POST'])
def main_menu():
    configure()         # must call configure in main section to make sure we can retrieve secret key
    if request.method == "POST":    # will be invoked when user clicks the spotify login button
        sp_oauth = create_spotify_oauth()
        auth_url = sp_oauth.get_authorize_url()
        return redirect(auth_url)
    return render_template("main.html") # main page layout

@app.route("/response", methods = ['GET', 'POST'])  # after loggin in, while be redirected to response
def response():
    sp_oauth = create_spotify_oauth()   # needed to 
    session.clear()     # clearing to ensure that any previous data related to the session is removed before setting new data
    code = request.args.get("code")     # After user logs into spotify, spotify gives us a special code that will be used to to exchange for an access token
    token_info = sp_oauth.get_access_token(code)    # exchanging the code for the access token   
    session[TOKEN_INFO] = token_info    # storing the access token into memory
    return redirect("/menu")

@app.route("/menu")
def menu():
    try:
        token_info = get_token()    # Checking to see if there is currently an access token in session
    except:
        print("user not logged in") # If not, then user is not logged in currently
        redirect("/")

    sp = spotipy.Spotify(auth=token_info['access_token'])   # This will retrieve all the information
    all_artists = sp.current_user_top_artists(limit=20, time_range='long_term')['items']
    print(all_artists)

    page = request.args.get('page', 1, type=int)
    per_page = 3
    start = (page - 1) * per_page
    end = start + per_page
    artists = all_artists[start:end]

    artists = []
    for artist in all_artists[start:end]:
        # Extract the artist name and image URL (use the first image in the list)
        artist_data = {
            'name': artist['name'],
            'image': artist['images'][0]['url'] if artist['images'] else None,  # Ensure there's an image
            'popularity' : artist['popularity'],
            'followers' : artist['followers']['total']
        }
        artists.append(artist_data)

        print(artists)

    next_page = page + 1 if len(all_artists) > end else None
    previous_page = page - 1 if page > 1 else None

    return render_template("menu.html", artists=artists, next_page=next_page, previous_page=previous_page)

def get_token():
    token_info = session.get(TOKEN_INFO, None)
    if not token_info:
        raise "exception"
    now = int(time.time())
    expired = token_info["expires_at"] - now < 60

    if(expired):
        sp_oauth = create_spotify_oauth()
        token_info = sp_oauth.refresh_access_token(token_info['refresh_token'])
    return token_info

def create_spotify_oauth():
    return SpotifyOAuth(
        client_id="266db9561eef4aeda001535943a08fc0",   #client id and secret from Spotify Developers
        client_secret= os.getenv("api_secret"),
        redirect_uri=url_for('response', _external=True),   #where to redirect to after authorization
        scope="user-top-read"   #what information we will be retrieving
    )