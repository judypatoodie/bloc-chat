import React, { Component } from 'react'
import { Button, DropdownButton, MenuItem, ButtonGroup  } from 'react-bootstrap';



class User extends Component {
  constructor(props) {
  super(props);

this.state ={
  user: 'Guest',
    showSignedIn: <MenuItem eventKey="2" onClick={()=> this.signOut()}>Sign Out</MenuItem>,
    showSignedOut: <MenuItem disabled eventKey="2" >Sign Out</MenuItem>

  }

}


componentDidMount() {
  this.props.firebase.auth().onAuthStateChanged( user => {
  this.props.setUser(user);
  console.log(this.props.user)
});
}


signIn(){
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase
  .auth()
  .signInWithPopup( provider );
}

signOut(){

  this.props.firebase
  .auth()
  .signOut()
  .then(alert('Sign out successful'));
}




render(){

  return(
    <div>
        <div style={{fontSize:'1.5rem', position:'absolute', top: '1rem', right: '4rem', top: '0'}}>
          <ion-icon name="person"></ion-icon>
          {this.props.user ? this.props.user.displayName : 'Guest'}
        </div>
        <ButtonGroup vertical style={{position:'absolute', top: '1rem', right: '4rem', top: '0'}}>
          <DropdownButton title=<ion-icon style= {{color: '#7D26CD'}} name="menu"></ion-icon> id="bg-justified-dropdown dropdown-no-caret" pullRight noCaret>
            <MenuItem eventKey="1" onClick={()=> this.signIn()}>{this.props.user ? 'Sign in as another user' : 'Sign In'}</MenuItem>
            {this.props.user ? this.state.showSignedIn : this.state.showSignedOut }
          </DropdownButton>
       </ButtonGroup>
    </div>

  );
}
}


export default User;
