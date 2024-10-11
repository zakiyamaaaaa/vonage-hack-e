const sendLineNotify = async (message: string) => {
  const accessToken = process.env.LINE_NOTIFY_TOKEN;

  if (!accessToken) {
    throw new Error('LINE_NOTIFY_TOKEN is not set in environment variables');
  }

  const url = 'https://notify-api.line.me/api/notify';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Bearer ${accessToken}`,
  };

  const body = new URLSearchParams({
    message,
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error(`Error sending LINE Notify: ${response.statusText}`);
    }

    console.log('Message sent to LINE Notify successfully');
  } catch (error) {
    console.error('Failed to send message to LINE Notify:', error);
  }
};

// Example usage
sendLineNotify('こんにちは！LINE Notifyからのメッセージです。');
