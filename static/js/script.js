// Variables to store the current state of the transcript and chatGptResponse
let updatedTranscript = '';
let transcript = '';
let chatGptResponse = '';

// Function to update the transcript value
function updateTranscript(value) {
    transcript = value;
    render();
}

// Function to show the loader
function showLoader() {
    document.getElementById('loader').style.display = 'block';
}

// Function to hide the loader
function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}

// Function to update the chatGptResponse value
function updateChatGptResponse(value) {
    chatGptResponse = value;
    render();
    speak(value);
}

// Function to start the transcription
function startTranscription() {
    recognition.start();
}

// Function to stop the transcription
function stopTranscription() {
    recognition.stop();
}

// Function to render the transcript and chatGptResponse values in the HTML
function render() {
    document.getElementById('transcript').textContent = transcript;
    document.getElementById('chatGptResponse').textContent = chatGptResponse;
}

// Function to speak the given text using the speech synthesis API
function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new window.SpeechSynthesisUtterance(text);
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    } else {
        console.log('Speech synthesis is not supported in this browser.');
    }
}

// Setting up the SpeechRecognition object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.interimResults = true;

// Event handler for speech recognition results
recognition.onresult = async (event) => {
    let interimTranscript = '';
    let finalTranscript = '';
    updatedTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
        const { transcript, isFinal } = event.results[i][0];

        if (isFinal) {
            finalTranscript += transcript + ' ';
        } else {
            interimTranscript += transcript + ' ';
        }
    }

    updatedTranscript = interimTranscript + finalTranscript;
    updateTranscript(updatedTranscript);
};

// Event handler for speech recognition end
recognition.onend = async () => {
    try {
        showLoader();
        const response = await fetch('/api/chatgpt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: updatedTranscript }),
        });

        const data = await response.json();
        updateChatGptResponse(data.chatGptResponse);
        hideLoader();
    } catch (error) {
        updateChatGptResponse('An unexpected error occurred, please try again!');
        console.error('Error:', error);
        hideLoader();
    }
};

// Event listeners for start and stop buttons
document.getElementById('startTranscription').addEventListener('click', startTranscription);
document.getElementById('stopTranscription').addEventListener('click', stopTranscription);

// Initial rendering of the transcript and chatGptResponse values
render();
