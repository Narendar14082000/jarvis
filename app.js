const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
let recognition; // Declare recognition globally

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
    wishMe();
    initSpeechRecognition(); // Initialize speech recognition on page load
});

function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    recognition.onresult = (event) => {
        const currentIndex = event.resultIndex;
        const transcript = event.results[currentIndex][0].transcript;
        content.textContent = transcript;
        console.log('Transcript:', transcript); // Log the transcript for debugging
        takeCommand(transcript.toLowerCase());
    };
}

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    console.log('Recognition started'); // Log when recognition starts
    recognition.start();
});

function takeCommand(message) {
    console.log('Received message:', message); // Log the message for debugging
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        console.log('Opening YouTube'); // Log when trying to open YouTube
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } else if (message.includes("open chatgpt")) {
        console.log('Opening ChatGPT'); // Log when trying to open ChatGPT
        window.open("https://chatgpt.com", "_blank");
        speak("Opening ChatGPT...");
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
    } else if (message.includes('scroll down')) {
        window.scrollBy(0, window.innerHeight);
        speak("Scrolling down...");
    } else if (message.includes('scroll up')) {
        window.scrollBy(0, -window.innerHeight);
        speak("Scrolling up...");
    } else if (message.includes('click this link')) {
        document.querySelector('a').click();
        speak("Clicking the link...");
    } else if (message.includes('search for') && message.includes('on youtube')) {
        const query = message.replace('search for', '').replace('on youtube', '').trim();
        window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
        speak(`Searching for ${query} on YouTube...`);
    } else if (message.includes('click this video')) {
        const video = document.querySelector('ytd-video-renderer');
        if (video) {
            video.click();
            speak("Clicking the video...");
        } else {
            speak("No video found to click.");
        }
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }

    // Check if the user wants to end the conversation
    if (message.includes("i am done with you jarvis")) {
        speak("Goodbye Sir. Have a nice day!");
    } else {
        // Continue listening for further commands
        recognition.start();
    }
}