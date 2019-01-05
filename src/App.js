import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomsList from './components/RoomsList';
import { Popover, Button, OverlayTrigger, Form, ControlLabel, FormGroup, FormControl   } from 'react-bootstrap';


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



  render() {
    return (
      <div className="App">

          <div className="leftCol">

              <div className="roomNames">
                <RoomsList firebase={firebase}/>
              </div>
          </div>
          <div className="main">
          Main
          </div>


      </div>
    );
  }
}

export default App;
