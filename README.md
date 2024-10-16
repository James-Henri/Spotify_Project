![image](https://github.com/user-attachments/assets/75450a93-ab35-444f-9ddf-824b83350895)


# Final Spotify Fantasy Project

I would see websites like receiptify, that allow the user to access their spotify account, and in return get some information about their account presented in a fun way. I wanted to be able to create something similar to that. My own spin on it is that I have recently been playing Final Fantasy VII Remake and Rebirth. I always loved the original, and because of that I wanted my UI to look a lot like how the orignal game menu's did. While everyone may not get the theme I think it still looks pretty cool and those who do get it, will enjoy the styling choices.

## How to set up this project

1. Clone this project
2. Make sure you have Flask and Spotipy API installed

```
py -m pip install flask
py -m pip install spotipy
```

3. Create a .env file in the root directory
4. Go to [Spotify for Developers](https://developer.spotify.com/)
5. Create or login to an account
6. Create an app
7. Once created, make sure the Redirect URI is set to, http://127.0.0.1:5000/response
8. Now make sure you get the clientID and clientSecret
9. Add clientSecret to the .env file as a string and name the variable api_secret, also create a random flask secret and call the variable flask_secret
10. In start.py, change the client_id variable to yours
```
sp_oauth =  SpotifyOAuth(
    client_id="",   # <----------- change here
    client_secret= os.getenv("api_secret"),
    redirect_uri="http://127.0.0.1:5000/response",
    scope="user-top-read",
    cache_handler = cache_handler,
    show_dialog=True
)
```

11. Run the program in terminal
```
py -m flask --app start run
```
