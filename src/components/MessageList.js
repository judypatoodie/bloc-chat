import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

class MessageList extends Component {
  constructor(props) {
  super(props);

    this.state= {
      roomID: '',
      messages: [
        {
          username: '',
          sentAt: '',
          content: ''
        }
      ]
    }

  this.messagesRef = this.props.firebase.database().ref('messages');

};


componentDidMount() {
 this.messagesRef.on('child_added', snapshot => {
   const message = snapshot.val();
   message.key = snapshot.key;
   this.setState({ messages: this.state.messages.concat( message ) })
   this.setState({ roomID: message.roomId})
   console.log(message.roomId)
   console.log(this.props.activeRoomId)
 });
}



render(){
  return(


 <div>

  <form>
   <FormGroup controlId="formControlsTextarea" style={{bottom: '2rem', width: '70vw', position: 'absolute', marginBottom: '5rem'}}>

     <FormControl componentClass="textarea" placeholder="Type Message Here.." style={{width: '100%'}} />
   </FormGroup>

   <div><Button type="submit" style={{bottom: '0rem', position: 'absolute', marginLeft: '0rem'}}>Submit</Button>
   </div>
   </form>

   <div className="messages" style={{marginTop:'3rem'}}>
     {this.state.messages
       .filter (message => message.roomId === this.props.activeRoomId)
       .map(messages => (
           <div className="message-group" key={messages.key} style={{fontSize: '2rem'}}>
             <div><b>{messages.username}</b> ({messages.sentAt}): {messages.content}</div>

           </div>
         ))}
   </div>

 </div>
  );
}
}


export default MessageList;
