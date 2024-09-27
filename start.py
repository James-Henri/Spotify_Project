from flask import Flask, render_template
import spotipy
from spotipy.oauth2 import SpotifyOAuth

app = Flask(__name__)

@app.route("/")
def main_menu():
    return render_template("main.html")