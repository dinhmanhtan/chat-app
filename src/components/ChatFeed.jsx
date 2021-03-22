import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import MessageForm from './MessageForm';
import { deleteMessage } from 'react-chat-engine'

const ChatFeed = (props) => {
 // console.log(props);
  const { chats, activeChat, userName, messages } = props;

  const chat = chats && chats[activeChat];
  const renderReadReceipts = (message, isMyMessage) => chat.people.map((person, index) => person.last_read === message.id && (
    <div
      key={`read_${index}`}
      className="read-receipt"
      style={{
        float: isMyMessage ? 'right' : 'left',
        backgroundImage: person.person.avatar && `url(${person.person.avatar})`,
      }}
    />
  ));


  function CheckFile(strfile) {
    const firstIndex = strfile.lastIndexOf('/');
    const lastIndex = strfile.indexOf('?');

    var nameFile = strfile.substring(firstIndex + 1,lastIndex);

    const messageFileExtention = nameFile.substring(nameFile.lastIndexOf('.') , nameFile.length);
    
    const fileExtensions = [".apng",".gif",".ico",".cur",".jpg", ".jpeg", ".jfif", ".pjpeg", ".pjp",".png",".svg"];
  // console.log(messageFileExtention);
    var str;

    for( str in fileExtensions) {
      if( fileExtensions[str] === messageFileExtention) 
        return {name:nameFile,isImage:true};
    }   
 
     return {name:nameFile,isImage:false};
 }




  const renderMessages = () => {
    const keys = Object.keys(messages);
  

      let Images = [];
      let i  = 0;
      var j;
  // console.log(keys);

 //  const ids = keys.map((key,index) => key);
  
        for( j = 0; j < keys.length ; j++) {
          
          const key = keys[j];
          const message = messages[key];
    
          if(message.attachments && message.attachments.length > 0) {
            
              const KQ = CheckFile(message.attachments[0].file);
              const isImage = KQ.isImage;
              
              if ( isImage ) {
                Images[i] = message.attachments[0].file;
                i ++;
              }
              
          } 
        }          
      //  console.log(Images);


    return keys.map((key, index) => {
      const message = messages[key];
     
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isMyMessage = userName === message.sender.username;
    
   // Xác định tin nhắn đầu tiên mà một người gửi
      const lastMessage = messages[lastMessageKey];
      const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;
      
      const isFirstMessageByOther = isFirstMessageByUser && !isMyMessage;
      
     
   // Kiểm tra xem có là image hay file ko

  
      
         

      let isImage = false;
      let nameFile = "name";

      if (message.attachments && message.attachments.length > 0) {
    
        const strFile = message.attachments[0].file;
  
        const KQ = CheckFile(strFile);
        isImage = KQ.isImage;
        nameFile = KQ.name;

      }

      return (
        <div key={`msg_${index}`} style={{ width: '100%' }}>
          <div className="name-sender">
            {isFirstMessageByOther && `${message.sender.first_name} ${message.sender.last_name}` }
          </div>
          <div className="message-block">
            <div>
              {isMyMessage
                ? <MyMessage message={message}  isImage={isImage} nameFile={nameFile} Images={Images} />
                : <TheirMessage message={message} lastMessage={messages[lastMessageKey]}
                  isImage={isImage} nameFile={nameFile} Images={Images} />}
            </div>  
          </div>
          <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };
  
  const keys = Object.keys(messages);

    const messageID = keys[keys.length-1];
    const message = messages[messageID];
    const DeleteMessage = () => {
   
     // event.preventDefault();
      deleteMessage(props,activeChat,messageID);
    }
 
  if (!chat) return <div />;

  return (
    <div className="chat-feed">
      <div className="chat-title-container">
        <div className="chat-title">{chat?.title}</div>
        <div className="chat-subtitle">
          {chat.people.map((person) => ` ${person.person.username}`)}
        </div>
      </div>
      {renderMessages()}
      <div style={{ height: '100px' }} />
      <div >
        <MessageForm {...props} chatId={activeChat} />
        {/* <button 
        onClick={() => deleteMessage(props,activeChat,messageID)}
         onDeleteMessage={(activeChat, message) => this.onDeleteMessage(activeChat, message)}> xoa </button> */}
      </div>
      
    </div>
  );
};

export default ChatFeed;

