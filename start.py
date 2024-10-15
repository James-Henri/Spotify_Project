from flask import Flask, render_template, request, url_for, session, redirect
from dotenv import load_dotenv
import os
from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
from spotipy.cache_handler import FlaskSessionCacheHandler
import time

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv("flask_secret")

cache_handler = FlaskSessionCacheHandler(session)

sp_oauth =  SpotifyOAuth(
    client_id="266db9561eef4aeda001535943a08fc0",   #client id and secret from Spotify Developers
    client_secret= os.getenv("api_secret"),
    redirect_uri="http://127.0.0.1:5000/response",   #where to redirect to after authorization
    scope="user-top-read",   #what information we will be retrieving
    cache_handler = cache_handler,
    show_dialog=True
)

sp = Spotify(auth_manager=sp_oauth)

def configure():    # configure will get the secret API Keys
    load_dotenv()

@app.route("/", methods = ['GET', 'POST'])
def main_menu():
    configure()         # must call configure in main section to make sure we can retrieve secret key

    if request.method == "POST":    # will be invoked when user clicks the spotify login button

        if not sp_oauth.validate_token(cache_handler.get_cached_token()):
            auth_url = sp_oauth.get_authorize_url()
            return redirect(auth_url)
        else:
            return redirect(url_for("/response"))
    
    return render_template("main.html") # main page layout

@app.route("/response", methods = ['GET', 'POST'])  # after loggin in, while be redirected to response
def response():
    sp_oauth.get_access_token(request.args['code'])
    return redirect("/artist_long_term")

@app.route("/artist_long_term")
def artist_long_term():
    return render_top_artists('long_term')

@app.route("/artist_medium_term")
def artist_medium_term():
    return render_top_artists('medium_term')

@app.route("/artist_short_term")
def artist_short_term():
    return render_top_artists('short_term')

def render_top_artists(time_range): #helper function for long_term, medium_term, short_term
    
    if not sp_oauth.validate_token(cache_handler.get_cached_token()):
            auth_url = sp_oauth.get_authorize_url()
            return redirect(auth_url)

    all_artists = sp.current_user_top_artists(limit=20, time_range=time_range)['items']

    page = request.args.get('page', 1, type=int)
    per_page = 3
    start = (page - 1) * per_page
    end = start + per_page
    artists = []

    for artist in all_artists[start:end]:
        artist_data = {
            'name': artist['name'],
            'image': artist['images'][0]['url'] if artist['images'] else None,
            'popularity': artist['popularity'],
            'followers': artist['followers']['total']
        }
        artists.append(artist_data)

    next_page = page + 1 if len(all_artists) > end else None
    previous_page = page - 1 if page > 1 else None

    return render_template("menu.html", artists=artists, next_page=next_page, previous_page=previous_page, page=page, time_range=time_range)

@app.route("/logout")
def logout():
    session.clear()  # Clear session to log out the user
    return redirect("/")  # Redirect to the main page or login

