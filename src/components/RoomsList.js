import React, { Component } from 'react';
import { Popover, Button, OverlayTrigger, Form, ControlLabel, FormGroup, FormControl   } from 'react-bootstrap';


class RoomList extends Component {
  constructor(props) {
  super(props);

    this.state= {
      rooms: [],
      roomName: '',

      overlay: (
        <Popover id="popover-positioned-bottom" title="Create new room">
            <Form inline onSubmit={this.handleClick}>
              <FormGroup controlId="formInlineName">
                <ControlLabel>Room Name</ControlLabel>{' '}
                <FormControl type="text" placeholder="Lunch Room" />
              </FormGroup>{' '}
              <FormGroup controlId="formInlineEmail">
              </FormGroup>{' '}
              <Button type="submit" >Create Room</Button>
              <Button type="button" onClick={() => this.handleCancel()}>Cancel</Button>
            </Form>
        </Popover>
      )

  };
  this.roomsRef = this.props.firebase.database().ref('rooms');

}



handleClick(e){

  this.roomsRef.push({name: this.state.roomName});
     this.setState({roomName: ''});
     e.preventDefault();

}

handleCancel(e){

  alert('u sure?');
}

 componentDidMount() {
  this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
    this.setState({ rooms: this.state.rooms.concat( room ) })
    console.log(room.key)
  });
}
  render() {
    return (
      <section className="chatColumn">
      <h1 className="colTitle">Bloc Chat</h1>
      <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay= {this.state.overlay}>

         <Button bsStyle="success" style={{float:'right'}}>New Room</Button>
       </OverlayTrigger>
          <div className="roomsList">

            {this.state.rooms.map((room,index)  =>
            <p key={index}>{room.name}</p>)}
          </div>
        </section>


    );
  }
}

export default RoomList;
