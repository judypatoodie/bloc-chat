import React, { Component } from 'react';
import { Button, FormGroup, FormControl, Form } from 'react-bootstrap';
import './MessageList.css'

class MessageList extends Component {
  constructor(props) {
  super(props);

    this.state= {
      roomID: '',
      content: '',
      messages: [
        {
          username: '',
          sentAt: '',
          roomId:'',
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
   this.setState({ messages: this.state.messages.concat( message ) });
   this.setState({ roomID: this.props.activeRoomId});

 });
}

  formatTime(time) {
    const date = new Date(time);
    const hours = date.getHours()< 12 ? date.getHours() : date.getHours() - 12 ;
    const amOrPm = date.getHours() < 12 ? " AM" : " PM";
    const minutes =  date.getMinutes();
    const formattedTime = hours + ':' + minutes + amOrPm;

    return formattedTime;
  }

handleChange(e){
  let newMessageContent = e.target.value;
     this.setState({content: newMessageContent});
}


createNewMessage(e){
  e.preventDefault();
  let newContent = this.state.content;
  this.messagesRef.push({
    username: this.props.user ? this.props.user.displayName : 'Guest',
    sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
    roomId: this.props.activeRoomId,
    content: newContent
  })
  this.setState({content: ''});

}


deleteMessage(e, messageId){

  this.msgDeleteRef= this.props.firebase.database().ref('messages');
  this.msgDeleteRef.child(messageId).remove();
  console.log(messageId);
}

render(){

  return(


 <div>


  <Form
  inline
  onSubmit={(e) => this.createNewMessage(e)}>
   <FormGroup
   controlId="formControlsTextarea"
   style={{bottom: '2rem', width: '70vw', position: 'absolute', marginBottom: '5rem'}}>
     <FormControl
     componentClass="textarea"
     onChange={(e) => this.handleChange(e)}
     type="text"
     value={this.state.content}
     placeholder="Type Message Here.."
     style={{width: '100%'}} />
   </FormGroup>


   <div>
     <Button
     type="submit"
     style={{bottom: '0rem', position: 'absolute', marginLeft: '0rem'}}>
     Submit
     </Button>
   </div>
   </Form>


   <div className="messages" style={{marginTop:'3rem'}}>
     {this.state.messages
       .filter (message => message.roomId === this.props.activeRoomId)
       .map(messages => (

           <div className="message-group" key={messages.key} style={{fontSize: '2rem'}}>
             <div>
               <b>{messages.username}   </b>
               <small style={{fontSize: '1.5rem' , color: '#A9A9A9'}}>
                {this.formatTime(messages.sentAt)}

                </small>
                <span className="deleteButton" onClick={(e, messageId)=> this.deleteMessage(e, messages.key)}>  <ion-icon  name="trash"></ion-icon>
                </span>
                <p>{messages.content}</p>
             </div>

           </div>
         ))}
   </div>

 </div>
  );
}
}


export default MessageList;
