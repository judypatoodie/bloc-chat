import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomsList from './components/RoomsList';
import MessageList from './components/MessageList';


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
    {

      this.state= {
        content: 'Select Room',
      }

    }
  }


  setRoomTitle = changedRoomName => {
    this.setState({
      content: changedRoomName
    });
  };


  getRoomID() {
    return(
      this.roomsRef.on("child_added", function(snapshot, prevChildKey) {
        var newPost = snapshot.val();
        console.log(newPost);
      })
    );

   }


  render() {

    return (
      <div className="App">

          <div className="leftCol">

              <div className="roomNames">
                <RoomsList firebase={firebase} replace={this.setRoomTitle} />

              </div>

          </div>
          <div className="main">
          {this.state.content}

          <MessageList firebase={firebase} />
          </div>


      </div>
    );
  }
}

export default App;
