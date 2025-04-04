let btn = document.querySelector('#btn');
let voice = document.querySelector('#voice'); // Voice animation image

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "HI_GB";

    window.speechSynthesis.speak(text_speak);

    // Hide voice animation after speaking is finished
    text_speak.onend = () => {
        voice.style.display = "none";
        btn.style.display = "flex";
    };
}

btn.addEventListener('click', () => {
    recognition.start();
    voice.style.display = "block"; // Show voice animation when recording starts
    btn.style.display = "none"; // Hide button
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;

    btn.innerText = transcript; // Show the recognized text on the button
    btn.style.display = "flex"; // Show button back after recognition
    voice.style.display = "none"; // Hide voice animation

    takeCommand(transcript);
};
// Start recognition when button is clicked
btn.addEventListener('click', () => {
    recognition.start();
    btn.style.display='none'
    voice.style.display="block"
});

function takeCommand(message) {
    btn.style.display = 'flex';
    voice.style.display = "none";
    message = message.toLowerCase(); // Convert to lowercase to avoid case issues

    if (message.includes("hello")) {
        speak('Hello there, what can I help you with?');
    } else if (message.includes("who are you") || message.includes("hu r u")) {
        speak('I am a virtual assistant designed by Sanal.');
    }                                                                                                                                   
    // Open YouTube
    else if (message.includes("open youtube")) {
        speak('Opening YouTube');
        window.open("https://www.youtube.com");
    } 
    // Open Instagram
    else if (message.includes("open instagram")) {
        speak('Opening Instagram');
        window.open("https://www.instagram.com");
    }                    
    // Open ChatGPT
    else if (message.includes("open chat gpt")) {
        speak('Opening ChatGPT');
        window.open("https://chat.openai.com/");
    } 
    // Get current time
    else if (message.includes("what's the time") || message.includes("tell me the time")) {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // Convert to 12-hour format
        let timeString = `The time is ${hours} ${minutes} ${ampm}`;
        speak(timeString);
    } 
    // Search a song on Spotify
    else if (message.includes("play") && message.includes("on spotify")) {
        let song = message.replace("play", "").replace("on spotify", "").trim();
        speak(`Playing ${song} on Spotify`);
        window.open(`https://open.spotify.com/search/${song}`);
    } 
    // Open any app on Windows (requires additional setup)
    else if (message.includes("open")) {
        let app = message.replace("open", "").trim();
        speak(`Opening ${app}`);
        openApp(app);
    } 
    // Default action: Search on Google
    else {
        speak('This is what I found on the internet');
        window.open(`https://www.google.com/search?q=${message}`);
    }
}