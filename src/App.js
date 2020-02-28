import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomsList from './components/RoomsList';
import MessageList from './components/MessageList';
import User from './components/Users';


// Initialize Firebase
var config = {
  apiKey: "AIzaSyBm2rA1N5cpa32MwMY5TCTcGhXocwA5XUw",
  authDomain: "bloc-chat-app-1b93b.firebaseapp.com",
  databaseURL: "https://bloc-chat-app-1b93b.firebaseio.com",
  projectId: "bloc-chat-app-1b93b",
  storageBucket: "bloc-chat-app-1b93b.appspot.com",
  messagingSenderId: "470119704880"
};

firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
  super(props);

      this.state= {
        activeRoom: null,
        activeRoomId: '-LVVq0wuq85QhAHIhejy',
        user: 'Guest'
      };


  }


setDefaultRoom = (defaultRoom) => {

  this.state.activeRoom ? this.setState({activeRoom: this.state.activeRoom}) : this.setState({activeRoom: defaultRoom})

}

  setRoomTitle = (changedRoomName, roomKey) => {
    this.setState({
      activeRoom: changedRoomName,
      activeRoomId: roomKey
    });
  };


setUser(user){
 this.setState({user: user});
}


  render() {

    return (
      <div className="App">

          <div className="leftCol">

              <div className="roomNames">
                <RoomsList firebase={firebase}
                replace={this.setRoomTitle}
                setDefaultRoom={this.setDefaultRoom}
                activeRoom={this.state.activeRoom} />

              </div>

          </div>
          <div className="main" style={{marginTop:'2.5rem'}} >
           <div style={{ borderBottom: '1px solid #D3D3D3', paddingBottom: '2rem', marginRight: '40px'}}>
            <ion-icon name="paper-plane"></ion-icon> {this.state.activeRoom}
           </div>

          <MessageList
          firebase={firebase}
          activeRoomId={this.state.activeRoomId}
          user={this.state.user}/>

          <User
          firebase={firebase}
          user={this.state.user}
          setUser={(user) => this.setUser(user)}/>
          </div>


      </div>
    );
  }
}

export default App;
