# Voice Assistant Using Web Speech API

This project implements a simple voice assistant using the Web Speech API. The assistant can respond to various voice commands, perform actions such as opening websites, fetching information, and providing the current time or date. It also greets the user based on the time of day.

## Features

- **Voice Commands Recognition**: Listens for and processes voice commands.
- **Speech Synthesis**: Responds to user commands using text-to-speech.
- **Time-Based Greetings**: Greets the user based on the current time.
- **Open Websites**: Can open specific websites like Google, YouTube, Facebook, and ChatGPT.
- **Fetch Information**: Can search for information on Google or Wikipedia.
- **Tell Time and Date**: Provides the current time and date.
- **Calculator Access**: Opens the calculator application.

## Technologies Used

- HTML
- JavaScript
- Web Speech API (SpeechRecognition and SpeechSynthesis)

## Hosted Link

[View the Voice Assistant Project](https://narendar14082000.github.io/jarvis/)


## Setup and Usage

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/voice-assistant.git
   ```

2. Navigate to the project directory:
   ```bash
   cd voice-assistant
   ```

3. Open the `index.html` file in your web browser.

4. Click the "Talk" button to start the voice assistant.

## Project Structure

- **index.html**: The main HTML file containing the structure of the voice assistant interface.
- **style.css** (optional): The CSS file for styling the interface (if used).
- **script.js**: The JavaScript file containing the logic for the voice assistant.

## Code Explanation

### HTML

The HTML file includes a button for initiating voice recognition and a content area for displaying the recognized text.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Voice Assistant</title>
</head>
<body>
    <button class="talk">Talk</button>
    <div class="content"></div>
    <script src="script.js"></script>
</body>
</html>
```

### JavaScript

The JavaScript file contains the logic for handling voice recognition, responding to commands, and performing actions.

```javascript
const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

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
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
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
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}
```


