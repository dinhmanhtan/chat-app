import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { useState } from 'react';


const TheirMessage = ({ lastMessage, message, isImage, nameFile, Images }) => {

  const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;
  const [IsZoom,setZoom]  = useState(false);

  var i;
  var index_thisImg;
  for(i = 0 ; i < Images.length ; i++) {

    if(message.attachments && message.attachments.length > 0 && message.attachments[0].file === Images[i])
        index_thisImg = i;

    }
  const[index,setIndex] = useState(index_thisImg);


  
  return (
    <div className="message-row">
      {isFirstMessageByUser && (
        <div
          className="message-avatar"
          style={{ backgroundImage: message.sender && `url(${message.sender.avatar})` }}
        />
      )}
      {message.attachments && message.attachments.length > 0
        ? (
          isImage
           ?
           (  IsZoom ? 
                <div>
                  <Lightbox 
                  mainSrc= {Images[index]}
                  nextSrc={Images[(index + 1) % Images.length]}
                  prevSrc={Images[(index + Images.length - 1) % Images.length]}
                  onCloseRequest={() => setZoom(false)}
                  onMovePrevRequest={() => setIndex((index + Images.length - 1) % Images.length)}
                  onMoveNextRequest={() => setIndex( ( index + 1) % Images.length )  }
                  />
                </div> 
              :
                <img
                    src={message.attachments[0].file}
                    alt="message-attachment"
                    className="message-image"
                    style={{ marginLeft: isFirstMessageByUser ? '4px' : '48px' }}
                    onClick={() => setZoom(true)}
                />
           )
        : 
          <a href= {message.attachments[0].file}  >
            <div className="container-message-file" style={{ marginLeft: isFirstMessageByUser ? '4px' : '48px' }} >

                <img
                    src='./img_file3.png'
                    alt="message-attachment"
                    className="message-file"
                />
                <div className="name-file" >{nameFile}</div>
                
                <img 
                  src="./icon_download.png" 
                  alt="message-attachment"
                  className="icon-download-file"
                />   
          </div>
         </a> 
        )
        : (
          <div className="message" style={{ float: 'left', backgroundColor: '#CABCDC', marginLeft: isFirstMessageByUser ? '4px' : '48px' }}>
            {message.text}
          </div>
        )}
    </div>
  );
};

export default TheirMessage;
