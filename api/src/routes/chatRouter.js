const { Router } = require('express');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { getProcessMsgGPT3, getTranscriptionWhisper}  = require('../handlers/chatHandlers');
const chatRouter = Router()
// console.log("entro a Chatrouter ");
chatRouter.post("/", getProcessMsgGPT3);
chatRouter.post('/transcribe', upload.single('audio'), getTranscriptionWhisper)

module.exports = chatRouter;
