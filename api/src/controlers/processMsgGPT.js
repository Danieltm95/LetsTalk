const axios = require('axios');
require('dotenv').config();
const { OPENAI_API_KEY } = process.env;

const systemMessage = {
    "role": "system",
    "content": "Remember to always ask me a follow-up question. Always, and never say more that 15 words."
}

const processMsgGPT3 = async (chatMessages) => {
    //console.log(chatMessages, 'usermsg en controler')

 
    let apiMessages = chatMessages.map(messageObject => {
        let role = "";
        if (messageObject.sender === "ChatGPT") {
            role = "assistant";
        } else {
            role = "user";
        }
        return { role: role, content: messageObject.message }
    });
    //console.log(apiMessages, 'apiMessages en controler')
    const apiRequestBody = {
        "model": "gpt-3.5-turbo",
        "messages": [
            systemMessage,
            ...apiMessages // [mensaje1, mensaje2]
        ]
    }
// revisar esto
    try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", apiRequestBody, {
            headers: {
                "Authorization": "Bearer " + OPENAI_API_KEY,
                "Content-Type": "application/json"
            }
        });
        //  console.log(response.data.choices[0].message.content, "devuelta de devuelta de la api de openai");
        return ([...chatMessages, {
            message: response.data.choices[0].message.content,
            sender: "ChatGPT"
        }])
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = { processMsgGPT3 };