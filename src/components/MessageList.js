import React, { Component } from 'react';
import { Button, FormGroup, FormControl, Form } from 'react-bootstrap';
import './MessageList.css'
import { Modal, ControlLabel } from 'react-bootstrap';
import Moment from 'react-moment';


class MessageList extends Component {
  constructor(props) {
  super(props);

    this.state= {
      roomID: '',
      content: '',
      deleteMsgShow: false,
      deletedMsgId:'',
      deleteMsgContent:'',
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

 this.messagesRef.on('child_removed', snapshot  => {
  this.setState({ messages: this.state.messages.filter( message => message.key !== snapshot.key) });

});
}

formatTime(time) {
  var today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yy = today.getFullYear().toString().substr(-2);
  today = mm + '/' + dd + '/' + yy
  const date = new Date(time);
  const hours = date.getHours()< 12 ? date.getHours() : date.getHours() - 12 ;
  const amOrPm = date.getHours() < 12 ? " AM" : " PM";
  const minutes =  date.getMinutes();
  const formattedTime = today + ' ' + hours + ':' + minutes + amOrPm;

  return formattedTime;
}

handleChange(e){
  let newMessageContent = e.target.value;
     this.setState({content: newMessageContent});
}

handleClose() {
   this.setState({ deleteMsgShow: false });
 }

 handleShow() {
   this.setState({ deleteMsgShow: true });
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
  this.setState({deletedMsgId: messageId})
  //console.log(messageId);
  this.setState({ deleteMsgShow: false });
}


render(){

  return(


 <div className="messageSection">

<div >
  <Form
  inline
  onSubmit={(e) => this.createNewMessage(e)}>
   <FormGroup
   controlId="formControlsTextarea"
   style={{bottom: '2rem', width: '70%',position: 'absolute', marginBottom: '5rem'}}>
     <FormControl
     componentClass="textarea"
     onChange={(e) => this.handleChange(e)}
     type="text"
     value={this.state.content}
     placeholder="Type Message Here.."
      />
   </FormGroup>



   <div>
     <Button
     type="submit"
     style={{bottom: '0rem', position: 'absolute', marginLeft: '0rem'}}>
     Submit
     </Button>
   </div>
   </Form>
   </div>


   <div className="messages" style={{marginTop:'3rem'}}>
     {this.state.messages
       .filter (message => message.roomId === this.props.activeRoomId)
       .map(messages => (

           <div className="message-group" key={messages.key} style={{fontSize: '2rem'}}>
             <div>
               <b>{messages.username}   </b>
               <small style={{fontSize: '1.5rem' , color: '#A9A9A9'}}>
               <Moment element="span" format="MM/DD/YY hh:mm A" className="sent-at">
               	  	  { messages.sentAt }
               		</Moment>

                </small>
                <button className="deleteButton" onClick={() => this.handleShow()}>  <ion-icon  name="trash"></ion-icon>
                </button>
                <Modal
                  show={this.state.deleteMsgShow}
                  onHide={() => this.handleClose()}
                  className="deleteMsgModal"
                  >
                  <Modal.Header closeButton>
                    <Modal.Title>Deleting message <ion-icon  name="warning"></ion-icon></Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure you would like to delete this message?
                    <p>This action can't be undone.</p>



                  </Modal.Body>
                  <Modal.Footer>
                    <div>
                      <Button
                      className="cancelButton"
                      bsStyle="danger"
                      onClick={() => this.handleClose()}>Cancel</Button>
                    <Button
                    className="cancelButton"
                    style={{marginRight:'9px'}}
                    bsStyle="success"
                    onClick={(e, messageId)=> this.deleteMessage(e, messages.key)}>
                    Yes
                  </Button>

                  </div>
                  </Modal.Footer>

                 </Modal>


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
