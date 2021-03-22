import { ChatEngine } from 'react-chat-engine';

import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import './App.css';



/* install api, library

 npm install @ant-design/icons axios react-chat-engine
 npm install @webscopeio/react-textarea-autocomplete emoji-mart --save  
 npm i react-image-lightbox
 
  
*/



const projectID = 'bb4fb577-e21e-45eb-8f3a-70ba18aeb415';

const App = () => {
  if (!localStorage.getItem('username')) return <LoginForm />;

  return (


      <ChatEngine
        height="100vh"
        projectID={projectID}
        userName={localStorage.getItem('username')}
        userSecret={localStorage.getItem('password')}
        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
        onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
        onDeleteMessage={(chatId, message) => this.onDeleteMessage(chatId, message)}
      />


  
  );
};

// infinite scroll, logout, more customizations...

export default App;
