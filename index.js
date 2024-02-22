// const translateBtn = document.getElementById('translate-btn')
// const speakBtn = document.getElementById('speak-btn')
// const clearBtn = document.getElementById('clear-btn')
// const englishTextArea = document.getElementById('english-text-area')
// const germanTextArea = document.getElementById('german-text-area')

// const apiUrl = import.meta.env.VITE_API_URL
// const elevenLabsApiKey = import.meta.env.VITE_ELEVEN_LABS_API_KEY

// translateBtn.addEventListener('click', async () => {
//   const englishText = englishTextArea.value 
//   const options = {
//     method: 'POST',
//     body: JSON.stringify({
//       "englishText": englishText
//     }),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   }
//   let response = await fetch(apiUrl + 'translate', options)
//   response = await response.json()
//   germanTextArea.value = response.germanText
// })

// speakBtn.addEventListener('click', async () => {
//   const options = {
//     method: 'POST',
//     headers: {
//       'Accept': 'audio/mpeg',
//       'xi-api-key': elevenLabsApiKey,
//       'Content-Type': 'application/json'
//     },
//     body: `{"model_id":"eleven_multilingual_v2","text": "${germanTextArea.value}"}`
//   };

//   try {
//     const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB?output_format=mp3_22050_32', options)
//     const mp3Data = await response.blob();
//     const mp3Url = URL.createObjectURL(mp3Data);
//     const audio = new Audio(mp3Url);
//     audio.play();
//   }
//   catch(err) {
//     console.error(err);
//   }
// })

// clearBtn.addEventListener('click', () => {
//   englishTextArea.value = ''
//   germanTextArea.value = ''
// })