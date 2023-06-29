import express from 'express';
import pkg from 'body-parser';
const { json } = pkg;
import cors from "cors";
import { ChatGPTUnofficialProxyAPI } from 'chatgpt';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import * as dotenv from 'dotenv'
dotenv.config();

const PORT = process.env.PORT;

// Get the current file path and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a new instance of ChatGPTUnofficialProxyAPI
const api = new ChatGPTUnofficialProxyAPI({
  accessToken: process.env.ACCESS_TOKEN,
  apiReverseProxyUrl: 'https://api.pawan.krd/backend-api/conversation'
});

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(json());

// Serve static files from the 'static' directory
app.use('/public', express.static(path.join(__dirname, './static')));

// Handle POST requests to '/api/chatgpt'
app.post('/api/chatgpt', async (req, res) => {
  const { text } = req.body;

  try {
    const prompt = text;
    const response = await api.sendMessage(prompt);
    console.log(response.text);
    const chatGptResponse = response.text;

    res.json({ chatGptResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Serve the index.html file for GET requests to the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
