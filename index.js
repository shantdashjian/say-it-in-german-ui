import OpenAI from "openai";

const translateBtn = document.getElementById('translate-btn')
const speakBtn = document.getElementById('speak-btn')
const englishTextArea = document.getElementById('english-text-area')
const germanTextArea = document.getElementById('german-text-area')

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const elevenLabsApiKey = import.meta.env.VITE_ELEVEN_LABS_API_KEY

translateBtn.addEventListener('click', async () => {
  const englishText = englishTextArea.value 
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "system",
        "content": "You are an English to German translator."
      },
      {
        "role": "user",
        "content": "Translate this: " + englishText 
      }
    ],
  });
  germanTextArea.value = response.choices[0].message.content
})

speakBtn.addEventListener('click', async () => {
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'xi-api-key': elevenLabsApiKey,
      'Content-Type': 'application/json'
    },
    body: `{"model_id":"eleven_multilingual_v2","text": "${germanTextArea.value}"}`
  };

  try {
    const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB?output_format=mp3_22050_32', options)
    const mp3Data = await response.blob();
    const mp3Url = URL.createObjectURL(mp3Data);
    const audio = new Audio(mp3Url);
    audio.play();
  }
  catch(err) {
    console.error(err);
  }
})