import { useEffect, useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { setIsTyping, getChatMessages, getChatUser } from './redux/actions';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react"
import { useDispatch, useSelector } from 'react-redux'
import './App.css';
import axios from 'axios';
import { useReactMediaRecorder } from 'react-media-recorder';
axios.defaults.baseURL = 'http://localhost:3001/';





function App() {
  const messages = useSelector((state) => state.messages)
  const typing = useSelector((state) => state.isTyping)

  const [recording, setRecording] = useState(false);
  const [transcription, setTranscription] = useState('');

  const dispatch = useDispatch();

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    onStop: async (blobUrl, blob) => {
      // console.log(blob, 'blob')
      // console.log(blobUrl, 'blobUrl')
      const formData = new FormData();
      formData.append('audio', blob, 'recording.wav');
      // console.log(formData,  'formData'); // Log the form data
      const response = await axios.post('/chat/transcribe', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data, 'response whisper frontend');
      // setTranscription(response.data);
      handleSend(response.data);  
    },
    onError: (err) => {
      console.error('Failed to start recording', err);
    },
  });

  const handleRecord = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
    setRecording(!recording);
  };



  const handleSend = async (message) => {
    const newMessage = {
      message,
      sender: "user",
      direction: "outgoing",
    }

    const newMessages = [...messages, newMessage];
    dispatch(getChatUser(newMessages));
    dispatch(setIsTyping());
    await dispatch(getChatMessages(newMessages))
  }

  return (

    <div className='App'>
      <div style={{ position: "relative", height: "500px", width: "700px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator={typing ? <TypingIndicator content="ChatGPT is talking..." /> : null}
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />
              })}
            </MessageList>
          </ChatContainer>
        </MainContainer>
            <div>
              <button onClick={handleRecord}>{recording ? "Stop Recording" : "Start Recording"}</button>
            </div>
        {/* <video src={mediaBlobUrl} controls autoPlay loop /> */}
      </div>
    </div>

  )
}

export default App;

