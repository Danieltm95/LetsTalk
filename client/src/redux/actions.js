import {GET_CHAT_API, GET_CHAT_USER, SET_IS_TYPING} from "./types";
import axios from 'axios';


export const getChatMessages = (newMessages) => {
    return async function (dispatch) {
        try {
            const response = await axios.post('/chat', newMessages);
            dispatch({
                type: GET_CHAT_API,
                payload: response.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const setIsTyping = () => {
    return {
      type: SET_IS_TYPING
    };
  };
  
  export const getChatUser = (newMessages) => {
    return {
      type: GET_CHAT_USER,
      payload: newMessages
    };
  };
