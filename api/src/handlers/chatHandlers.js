const { processMsgGPT3} = require('../controlers/processMsgGPT');
const { getTranscription } = require('../controlers/getTranscription');

const getProcessMsgGPT3 = async (req, res) => {
    const  chatMessages  = req.body;
    console.log(chatMessages,  'usermsg en handler')

    try {
        //console.log('entro a gpt api');
        const mensage = await processMsgGPT3(chatMessages);
        res.status(200).json(mensage)
    } catch (error) {
        //console.log('hubo error camino a gpt api');
        res.status(500).json({ error: error.message })
    }
}

const getTranscriptionWhisper = async (req, res) => {
    const  audio  = req.file.buffer;
    //console.log(audio,  'usermsg en handler')

    try {
        // console.log('entro a whisper api');
         const mensageTranscrito = await getTranscription(audio);
        // const mensageTranscrito = " getTranscription(audio)";
        res.status(200).json(mensageTranscrito)
    } catch (error) {
        console.log('hubo error camino a whisper api');
        res.status(500).json({ error: error.message })
    }
}

module.exports = { getProcessMsgGPT3, getTranscriptionWhisper };