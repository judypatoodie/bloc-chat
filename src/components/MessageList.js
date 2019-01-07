import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

class MessageList extends Component {
  constructor(props) {
  super(props);

    this.state= {
      roomID: ''
    }

  this.roomsRef = this.props.firebase.database().ref('rooms');

};


  

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
 </div>
  );
}
}


export default MessageList;
