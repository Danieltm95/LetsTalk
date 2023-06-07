const axios = require('axios');
require('dotenv').config();
const { OPENAI_API_KEY } = process.env;
const FormData  = require('form-data');

const getTranscription = async (audio) => {
    //console.log('entre al conrtoler whisper')
  try {
    const formData = new FormData();
    formData.append('file', audio, 'recording.wav');
    formData.append('model', 'whisper-1');
    formData.append('response_format', 'json');
    const response = await axios.post(
      'https://api.openai.com/v1/audio/translations',
      formData,
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );
     console.log(response.data.text, 'respuesta whisper controler');
    return response.data.text;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to transcribe audio');
  }
};
module.exports = { getTranscription };