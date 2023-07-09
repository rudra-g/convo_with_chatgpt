# Node.js Speech-to-Text and ChatGPT Conversion

This Node.js project is designed to convert speech input into text using speech recognition, pass the text to ChatGPT for generating a response, and then convert the response into speech output using speech synthesis. The project utilizes various libraries and APIs to achieve this functionality.

link - `https://rudra-project-talk-to-chatgpt.onrender.com/`

## Installation

1. Clone the repository to your local machine:

```bash
https://github.com/rudra-g/convo_with_chatgpt.git
```

2. Navigate to the project directory

3. Install the required dependencies:

```bash
npm install
```

## Configuration

1. Create a `.env` file in the project root directory.

2. Add the following environment variables to the `.env` file:

```
PORT=<your choice>
ACCESS_TOKEN=your_chatgpt_access_token
```

Replace `your_chatgpt_access_token` with the actual access token for the ChatGPT API.

## Usage

1. Start the application:

```bash
npm start
```

2. Open your web browser and visit `http://localhost:<specified port>`.

3. Click on the "Start Transcription" button to begin speech recognition.

4. Start speaking into your microphone. The speech will be converted into text and displayed in the transcript area.

5. Once you stop speaking, the text will be sent to ChatGPT for generating a response.

6. The response from ChatGPT will be displayed in the chatGptResponse area and spoken out loud.

7. You can repeat the process by clicking the "Start Transcription" button again.

## Customization

- If you want to modify the frontend appearance or behavior, you can edit the HTML and CSS files located in the `public` directory.

- To make changes to the speech-to-text or text-to-speech functionality, refer to the JavaScript code in the `public/js/script.js` file.

- If you want to extend or modify the ChatGPT integration, refer to the `/api/chatgpt` route in the `server.js` file.


## Acknowledgements

- [ChatGPT](https://www.chatgpt.com) - AI-powered language model for generating chatbot responses.
- [SpeechRecognition API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) - API for performing speech recognition in the browser.
- [SpeechSynthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis) - API for speech synthesis in the browser.

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or bug fixes, please open an issue or submit a pull request.

## Support

If you have any questions or need assistance, feel free to contact me at rudrarajghosh8@gmail.com.
