import type { SessionResponse } from "./types";

const sessionId = 'test';
const apiKey = process.env.VONAGE_API_KEY || ''; // X-Vgai-Key に対応するAPIキー
const region = 'us';
const url = `https://studio-api-${region}.ai.vonage.com/insights/sessions/search/${sessionId}`;

async function searchSessionById() {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Vgai-Key': apiKey,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json() as SessionResponse;
    console.dir(data);
    console.log(data.transcription.filter(elem => elem.user).at(-1)); // userの会話の末尾
    console.log(data.channel_data.audio_url); // 音声のURL
  } catch (error) {
    console.error('Error:', error);
  }
}

searchSessionById();
