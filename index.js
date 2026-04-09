var volume = 1;

document.getElementById("volume").addEventListener("input", function() {
    volume = this.value;
});

for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {

    document.querySelectorAll(".drum")[i].addEventListener("click", function () {

        var key = this.textContent.trim().toLowerCase();
        makeSound(key);
        buttonAnimation(key);

    });
}

document.addEventListener("keydown", function (event) {

    var key = event.key.toLowerCase();
    makeSound(key);
    buttonAnimation(key);

});

function makeSound(key) {

    var audio;

    switch (key) {
        case "w": audio = new Audio("assets/sounds/tom-1.mp3"); break;
        case "a": audio = new Audio("assets/sounds/tom-2.mp3"); break;
        case "s": audio = new Audio("assets/sounds/tom-3.mp3"); break;
        case "d": audio = new Audio("assets/sounds/tom-4.mp3"); break;
        case "j": audio = new Audio("assets/sounds/snare.mp3"); break;
        case "k": audio = new Audio("assets/sounds/crash.mp3"); break;
        case "l": audio = new Audio("assets/sounds/kick-bass.mp3"); break;
        default: return;
    }

    audio.volume = volume;
    audio.play();
}

function buttonAnimation(currentKey) {

    currentKey = currentKey.toLowerCase();

    var activeButton = document.querySelector("." + currentKey);
    if (!activeButton) return;

    activeButton.textContent = currentKey.toUpperCase();

    var randomColor = "hsl(" + Math.random() * 360 + ", 70%, 50%)";

    activeButton.style.backgroundImage =
        "linear-gradient(" + randomColor + "," + randomColor + "), " +
        window.getComputedStyle(activeButton).backgroundImage;

    activeButton.style.backgroundBlendMode = "multiply";

    activeButton.classList.add("pressed");

    setTimeout(function () {
        activeButton.textContent = currentKey;
        activeButton.style.backgroundImage = "";
        activeButton.style.backgroundBlendMode = "";
        activeButton.classList.remove("pressed");
    }, 100);

    document.querySelectorAll(".key-hints span").forEach(key => {
        if (key.textContent === currentKey) {
            key.style.background = "#DA0463";
            key.style.color = "white";

            setTimeout(() => {
                key.style.background = "#404B69";
                key.style.color = "#DA0463";
            }, 100);
        }
    });
}