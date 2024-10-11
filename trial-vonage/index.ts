const makeCall = async () => {
  const apiKey = process.env.VONAGE_API_KEY || ''; // X-Vgai-Key に対応するAPIキー
  const url = 'https://studio-api-us.ai.vonage.com/telephony/make-call'; // エージェントがEUリージョンの場合
  const agentId = process.env.AGENT_ID || '';
  const to = process.env.MY_PHONE_NUMBER || '';

  const body = {
    agent_id: agentId, // 使用する仮想エージェントのID
    to: to, // 目的の電話番号（国コードを含む）
    hangup_on_answer_machine: false, // 留守番電話に反応して通話を切るオプション
    session_parameters: [
      {
        name: 'PROPERTY_VALUE',
        value: '500'
      }
    ]
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Vgai-Key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    console.log('Success:', data);
  } catch (error) {
    console.error(error);
  }
};

makeCall();
