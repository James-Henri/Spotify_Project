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

function calculateHp(level) {
    const minHp = 100 + (level * 50); // Min HP increases with level
    const maxHp = 500 + (level * 100); // Max HP grows faster with higher levels
    return barsRandomGenerator(minHp, maxHp);
}

function calculateMp(level) {
    const minMp = 20 + (level * 5); // Min MP
    const maxMp = 50 + (level * 10); // Max MP
    return barsRandomGenerator(minMp, maxMp);
}

// Random width generator for the bars
function barsRandomGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Select all HP and MP elements
const hpBars = document.querySelectorAll(".hp_bar");
const hpMins = document.querySelectorAll(".hp_min");
const hpMaxs = document.querySelectorAll(".hp_max");

const mpBars = document.querySelectorAll(".mp_bar");
const mpMins = document.querySelectorAll(".mp_min");
const mpMaxs = document.querySelectorAll(".mp_max");

// Loop through each artist and assign values dynamically
artists.forEach((artist, index) => {
    const level = artist.popularity;  // Assuming "popularity" is used as a proxy for "level" here

    console.log(level)
    // Calculate HP and MP based on level
    const currentHp = calculateHp(level);
    const maxHp = barsRandomGenerator(currentHp, currentHp + 500); // Random max HP value slightly higher than current HP

    const currentMp = calculateMp(level);
    const maxMp = barsRandomGenerator(currentMp, currentMp + 100); // Random max MP value slightly higher than current MP

    // Update HP and MP bars and values
    hpMins[index].textContent = currentHp;
    hpMaxs[index].textContent = maxHp;
    hpBars[index].style.width = (currentHp / maxHp) * 100 + '%'; // Width as a percentage of current to max HP

    mpMins[index].textContent = currentMp;
    mpMaxs[index].textContent = maxMp;
    mpBars[index].style.width = (currentMp / maxMp) * 100 + '%'; // Width as a percentage of current to max MP
});