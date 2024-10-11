const sessionId = 'test';
const apiKey = process.env.VONAGE_API_KEY || '';
const region = 'us';
const url = `https://studio-api-${region}.ai.vonage.com/insights/sessions/${sessionId}/parameters`;

async function getSession() {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Vgai-Key': apiKey,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

getSession();
