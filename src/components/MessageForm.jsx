import { useState } from 'react';
import { SendOutlined, PictureOutlined,PaperClipOutlined } from '@ant-design/icons';
import { sendMessage, isTyping, deleteMessage } from 'react-chat-engine';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

import React, { useRef, useEffect } from "react";



// Check click out side component 

function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = event => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
   
    [ref, handler]
  );
}


// Message form

const MessageForm = (props) => {
  const [value, setValue] = useState('');
  const { chatId, creds } = props;

  const ref = useRef();
  const[choseEmoji,setEmoji] = useState(false);

  useOnClickOutside(ref, () => setEmoji(false));      // Close Picker Emoji when click outside
 
 
  console.log(props);
  
  const handleChange = (event) => {
    setValue(event.target.value);

    isTyping(props, chatId);
  };

  const addEmoji = (e) => {

    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach(el => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setValue(value + emoji);

  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const text = value.trim();

    if (text.length > 0) {
      sendMessage(creds, chatId, { text });
    }

    setValue('');
  };

  

  const handleUpload = (event) => {
    sendMessage(creds, chatId, { files: event.target.files, text: '' });
    console.log(event.target.files);
  };

  return (

    <div> 

      { choseEmoji ?
            <div className="Picker-Emoji" ref={ref}  >
                <Picker title="Pick Your Emoji ..."  set='apple'  onSelect={addEmoji} />
              
            </div>
      : null }
     
      <span className="message-form-container"> 
          <form className="message-form"  onSubmit={handleSubmit}>
            <input
              className="message-input"
              placeholder="Send a message..."
              value={value}                          // reset value cua thanh input sau khi submit
              onChange={handleChange}
              onSubmit={handleSubmit}
            />

            <span className="image-button" onClick={() => setEmoji(true)}> 
                <img
                className="emoji"
                src='./emoji.png'
                />
            </span>

            <label htmlFor="uploadIMG-button">
              <span className="image-button">
                <PictureOutlined className="picture-icon" />
              </span>
            </label>
            <input
              type="file"
              multiple={false}
              id="uploadIMG-button"
              style={{ display: 'none' }}
              onChange={handleUpload.bind(this)}
            />

            <label htmlFor="uploadFile-button">
              <span className="file-button">
                <PaperClipOutlined className="picture-icon" />
              </span>
            </label>
            <input
              type="file"
              multiple={false}
              id="uploadFile-button"
              style={{ display: 'none' }}
              onChange={handleUpload.bind(this)}
            />

            <button className="send-button" onSubmit={handleSubmit} >
              <SendOutlined className="send-icon" />
            </button>

          
          </form>
      </span>
    </div>
  );
};

export default MessageForm;
