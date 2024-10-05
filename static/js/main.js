document.addEventListener("DOMContentLoaded", function() {
    const startOverlay = document.getElementById("start_overlay");
    const mainMenu = document.querySelector(".main_menu_background_image");

    // Handle click on the overlay
    startOverlay.addEventListener("click", function() {
        // Create and display a full black screen instantly
        const blackScreen = document.createElement("div");
        blackScreen.classList.add("black_screen");
        document.body.appendChild(blackScreen);

        // Set the black screen to full opacity immediately
        blackScreen.style.opacity = "1";

        // Fade the black screen out after a brief moment
        setTimeout(function() {
            // Fade the black screen out
            blackScreen.style.opacity = "0";

            // Wait for the fade-out transition to finish (1 second), then show the main menu
            setTimeout(function() {
                menu_sound.play()
                blackScreen.remove(); // Remove the black screen element from the DOM
                startOverlay.classList.add("hidden"); // Hide the overlay
                mainMenu.classList.add("visible"); // Show the main menu
            }, 0); // Matches the 1 second transition duration for the fade-out
        }, 0); // Optional time before starting to fade out the black screen (can be set to 0 if instant fade-out is desired)

        // Enable audio actions since there's a click
        let audioEnabled = true;

        const newGameButton = document.querySelector(".new_game_button");
        const arrow = document.getElementById("new_game_arrow");
        const select_sound = document.getElementById("select_sound");
        const menu_sound = document.getElementById("mainmenu_sound");

        newGameButton.addEventListener("mouseover", function() {
            arrow.style.visibility = "visible"; 
            select_sound.play();
        });

        newGameButton.addEventListener("mouseout", function() {
            arrow.style.visibility = "hidden";
        });
    });
});
