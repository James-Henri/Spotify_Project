from flask import Flask, render_template, request, url_for, session, redirect
from dotenv import load_dotenv
import os
import spotipy
from spotipy.oauth2 import SpotifyOAuth

app = Flask(__name__)

app.secret_key = "PleaseChange"
app.config['SESSION_COOKIE_NAME'] = 'Users Cookie'

def configure():    #configure will get the secret API Keys
    load_dotenv()

@app.route("/", methods = ['GET', 'POST'])
def main_menu():
    configure()         #must call configure in main section to make sure we can retrieve secret key
    if request.method == "POST":
        sp_oauth = create_spotify_oauth()
        auth_url = sp_oauth.get_authorize_url()
        return redirect(auth_url)
    return render_template("main.html")

@app.route("/response", methods = ['GET', 'POST'])
def response():
    return render_template("response.html")


def create_spotify_oauth():
    return SpotifyOAuth(
        client_id="dda07a58df584d4cad1aed5d3d056dae",
        client_secret= os.getenv("api_secret"),
        redirect_uri=url_for('response', _external=True),
        scope="user-library-read"
    )