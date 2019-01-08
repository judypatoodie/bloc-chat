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
        activeRoom: 'Select Room',
        activeRoomId: '',
        user: null
      };



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
    console.log(this.state.activeRoomId);
    return (
      <div className="App">

          <div className="leftCol">

              <div className="roomNames">
                <RoomsList firebase={firebase} replace={this.setRoomTitle} />

              </div>

          </div>
          <div className="main">
          {this.state.activeRoom}

          <MessageList firebase={firebase}  activeRoomId={this.state.activeRoomId}/>
          <User firebase={firebase} user={this.state.user} setUser={(user) => this.setUser(user)}/>
          </div>


      </div>
    );
  }
}

export default App;
