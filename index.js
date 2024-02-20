import OpenAI from "openai";

const translateBtn = document.getElementById('translate-btn')
const englishTextArea = document.getElementById('english-text-area')
const germanTextArea = document.getElementById('german-text-area')

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

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