import { GET_CHAT_API, SET_IS_TYPING, GET_CHAT_USER } from "./types";

const initialState = {
    messages: [
        {
            message: "Hello i'm Victoria",
            sender: "ChatGPT",
        },
    ],
    isTyping: false,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CHAT_API:
            return {
                messages: action.payload,
                isTyping: false,
            };
        case SET_IS_TYPING:
            return {
                ...state,
                isTyping: true,
            };
        case GET_CHAT_USER:
            return {
                messages: action.payload,
                isTyping: false,
            };

        default:
            return state;
    }
};

export default rootReducer;