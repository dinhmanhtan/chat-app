// import { Link } from 'react-router-dom'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { useState } from 'react';


const MyMessage = ({ message ,isImage, nameFile, Images}) => {

  
  const [IsZoom,setZoom]  = useState(false);
 // console.log(Images);

  var i;
  var index_thisImg;
  for(i = 0 ; i < Images.length ; i++) {

    if(message.attachments && message.attachments.length > 0 && message.attachments[0].file === Images[i])
        index_thisImg = i;

    }
  const[index,setIndex] = useState(index_thisImg);


 
  

  if (message.attachments && message.attachments.length > 0) {
    
   

    return (
      
      isImage
       ?
  
         ( IsZoom ?
           
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
           
          : <img
              src={message.attachments[0].file}
              alt="message-attachment"
              className="message-image"
              style={{ float: 'right' }}
              onClick={() => setZoom(true)}
            />
         )
      : 
      <a href= {message.attachments[0].file}  >
        <div className="container-message-file" style={{ float: 'right'}} >

          
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
       
       
      
    );
  }

  return (
    <div className="message" style={{ float: 'right', marginRight: '18px', color: 'white', backgroundColor: '#3B2A50' }}>
      {message.text}
    </div>
  );
};

export default MyMessage;
