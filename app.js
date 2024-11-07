document.addEventListener("DOMContentLoaded", () => {
    const output = document.getElementById("output");
    const startBtn = document.getElementById("start-btn");

    // Check if SpeechRecognition and SpeechSynthesis are supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const synth = window.speechSynthesis;

    if (!SpeechRecognition || !synth) {
        output.textContent = "Your browser does not support Speech Recognition or Speech Synthesis.";
        startBtn.disabled = true;
    } else {
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;

        startBtn.addEventListener("click", () => {
            recognition.start();
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            output.textContent = `You said: ${transcript}`;

            // Generate and handle response based on user's input
            let response = generateResponse(transcript);
            
            // Display and speak the response
            output.textContent += `\nResponse: ${response}`;
            speak(response);

            // Handle special commands and open websites
            handleSpecialCommands(transcript);
        };

        recognition.onerror = (event) => {
            output.textContent = `Error: ${event.error}`;
        };

        // Function to generate a response based on the user's input
        function generateResponse(input) {
            input = input.toLowerCase();
            const currentDate = new Date();

            // Mapping of general responses
            const responses = {
                "hello": "Hello! How can I assist you today?",
                "what is your name": "I am Friday, your friendly voice assistant.",
                "how are you": "I'm here and ready to assist. How can I help you?",
                "what day is it": `Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}.`,
                "what time is it": `The current time is ${new Date().toLocaleTimeString()}.`,
                "what is the date": `Today's date is ${currentDate.toLocaleDateString()}.`,
                "thank you": "You're very welcome!",
                "open google maps": "Opening Google Maps.",
                "open instagram": "Opening Instagram.",
                "open my gmail": "Opening Gmail.",
                "open youtube": "Opening YouTube.",
                "friday": "Yes, I'm here! How can I assist you?"
            };

            // Check for exact match responses
            if (responses[input]) {
                return responses[input];
            }

            // Provide flexible responses for general questions
            if (input.includes("weather")) {
                return "I can't provide live weather updates, but you can check your local weather service.";
            } else if (input.includes("news")) {
                return "For the latest news, please visit a trusted news source.";
            } else if (input.includes("crypto news") || input.includes("berita crypto")) {
                return "Fetching the latest crypto news for you.";
            } else if (input.includes("joke")) {
                return "Why don’t skeletons fight each other? They don’t have the guts!";
            } else if (input.includes("open")) {
                return "I can help open popular websites. Just specify what you need.";
            } else if (input.includes("help")) {
                return "I am here to assist with basic tasks and simple questions. Just let me know what you need.";
            } else {
                return "I'm sorry, I didn't understand that. Could you please clarify?";
            }
        }

        // Function to handle special commands and open relevant websites
        function handleSpecialCommands(transcript) {
            const lowerTranscript = transcript.toLowerCase();

            if (lowerTranscript.includes("open google maps") || lowerTranscript.includes("buka google map")) {
                window.open("https://www.google.com/maps", "_blank");
            } else if (lowerTranscript.includes("open instagram") || lowerTranscript.includes("buka instagram")) {
                window.open("https://www.instagram.com", "_blank");
            } else if (lowerTranscript.includes("open my gmail") || lowerTranscript.includes("buka gmail")) {
                window.open("https://mail.google.com", "_blank");
            } else if (lowerTranscript.includes("crypto news") || lowerTranscript.includes("berita crypto")) {
                const cryptoNewsUrl = "https://www.coindesk.com";
                speak("Fetching the latest crypto news for you.");
                window.open(cryptoNewsUrl, "_blank");
            } else if (lowerTranscript.includes("open youtube") || lowerTranscript.includes("buka youtube")) {
                window.open("https://www.youtube.com", "_blank");
                speak("Opening YouTube.");
            }
        }

        // Function to speak the response
        function speak(text) {
            if (synth.speaking) {
                console.error("Speech synthesis is already speaking.");
                return;
            }

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "en-US"; // Set language to English
            utterance.onend = () => {
                console.log("Speech synthesis finished.");
            };
            utterance.onerror = (e) => {
                console.error("Speech synthesis error:", e);
            };

            synth.speak(utterance);
        }
    }
});

// JavaScript for animating the sound wave
const bars = document.querySelectorAll('.bar');
let interval;

document.getElementById('start-btn').addEventListener('click', () => {
    clearInterval(interval);
    interval = setInterval(() => {
        bars.forEach(bar => {
            const randomHeight = Math.random() * 40 + 10; // Random height between 10px and 50px (matches container height)
            bar.style.height = `${randomHeight}px`;
        });
    }, 200);

    // Optional: Stops animation after 5 seconds for demo purposes
    setTimeout(() => clearInterval(interval), 5000);
});
