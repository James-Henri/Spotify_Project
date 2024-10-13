function getRandomWidth() {
    return Math.floor(Math.random() * 101) + '%';  // Generate a random number between 0 and 100
}

const nextLevelBars = document.querySelectorAll('.next_level_bar');
const limitLevelBars = document.querySelectorAll('.limit_level_bar');

nextLevelBars.forEach(bar => {
    bar.style.width = getRandomWidth();
});

limitLevelBars.forEach(bar => {
    bar.style.width = getRandomWidth();
});
 
function barsRandomGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const hpBars = document.querySelectorAll(".hp_bar");
const hpMins = document.querySelectorAll(".hp_min");
const hpMaxs = document.querySelectorAll(".hp_max");

const maxBarWidth = 145;

const mpBars = document.querySelectorAll(".mp_bar");
const mpMins = document.querySelectorAll(".mp_min");
const mpMaxs = document.querySelectorAll(".mp_max");

const level = document.querySelectorAll(".popularity_stats")

level.forEach((element, index) => {
    const popularityValue = parseInt(element.textContent);

    let hpMaxValue, mpMaxValue, hpMinValue, mpMinValue;
    if(popularityValue >= 90) {
        hpMaxValue = Math.floor(Math.random() * (9999 - 8500) + 8500);
        mpMaxValue = Math.floor(Math.random() * (999 - 850) + 850);
        hpMinValue = Math.floor(Math.random() * (hpMaxValue - 0) + 0);
        mpMinValue = Math.floor(Math.random() * (mpMaxValue - 0) + 0);
    }
    else if(popularityValue >= 80  && popularityValue < 90) {
        hpMaxValue = Math.floor(Math.random() * (8499 - 7500) + 7500);
        mpMaxValue = Math.floor(Math.random() * (849 - 750) + 750);
        hpMinValue = Math.floor(Math.random() * (hpMaxValue - 0) + 0);
        mpMinValue = Math.floor(Math.random() * (mpMaxValue - 0) + 0);
    }
    else if (popularityValue >= 60 && popularityValue < 80) {
        hpMaxValue = Math.floor(Math.random() * (7499 - 6000) + 6000);
        mpMaxValue = Math.floor(Math.random() * (749 - 600) + 600);
        hpMinValue = Math.floor(Math.random() * (hpMaxValue - 0) + 0);
        mpMinValue = Math.floor(Math.random() * (mpMaxValue - 0) + 0);
    }
    else if (popularityValue >= 40 && popularityValue < 60) {
        hpMaxValue = Math.floor(Math.random() * (5999 - 4000) + 4000);
        mpMaxValue = Math.floor(Math.random() * (599 - 350) + 450);
        hpMinValue = Math.floor(Math.random() * (hpMaxValue - 0) + 0);
        mpMinValue = Math.floor(Math.random() * (mpMaxValue - 0) + 0);
    }
    else {
        hpMaxValue = Math.floor(Math.random() * (3999 - 1000) + 1000);
        mpMaxValue = Math.floor(Math.random() * (399 - 100) + 100);
        hpMinValue = Math.floor(Math.random() * (hpMaxValue - 0) + 0);
        mpMinValue = Math.floor(Math.random() * (mpMaxValue - 0) + 0);
    }

    hpMaxs[index].textContent = `${hpMaxValue}`;
    mpMaxs[index].textContent = `${mpMaxValue}`;
    hpMins[index].textContent = `${hpMinValue} /`;
    mpMins[index].textContent = `${mpMinValue} /`;

    const hpBarWidth = (hpMinValue / hpMaxValue) * maxBarWidth;
    const mpBarWidth = (mpMinValue / mpMaxValue) * maxBarWidth;

    hpBars[index].style.width = `${hpBarWidth}px`;
    mpBars[index].style.width = `${mpBarWidth}px`;

});


function updateTime() {
    const activeTime = document.getElementById('active_time');
    const now = new Date();
    
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');
    
    activeTime.innerHTML = `${hours}<txt id="colon">:</txt>${minutes}:${seconds}`;
}

function toggleColonColor() {
    const colon = document.getElementById('colon');
    // Toggle between gray and default color (black or whatever is set in CSS)
    colon.style.color = colon.style.color === 'gray' ? 'white' : 'gray';
}

setInterval(updateTime, 1000);
setInterval(toggleColonColor, 500);
updateTime();

document.querySelectorAll('#select_menu li').forEach(item => {
    item.addEventListener('mouseover', () => {
        // Play the select sound
        const selectSound = document.getElementById('select_sound');
        selectSound.play(); // Play the sound

        // Remove 'active' class from all items
        document.querySelector('#select_menu li.active').classList.remove('active');
        // Add 'active' class to the hovered item
        item.classList.add('active');
    });
});