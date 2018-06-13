import React, { Component } from 'react';

import './App.css';

import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
require('dotenv').config();
class App extends Component {
	state = {
		isSignedIn: false
	};
	// FirebaseUI config.
	uiConfig = {
		signInFlow: 'popup',
		signInOptions: [
			// Leave the lines as is for the providers you want to offer your users.
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.FacebookAuthProvider.PROVIDER_ID,
			firebase.auth.GithubAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.PROVIDER_ID
		],
		callbacks: {
			signInSuccess: () => false
		}
	};

	componentWillMount() {
		firebase.initializeApp({
			apiKey: process.env.REACT_APP_API_KEY,
			authDomain: process.env.REACT_APP_AUTH_DOMAIN
		});
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				console.log('User: ', user);
				this.setState({
					isSignedIn: true
				});
			}
		});
	}

	render() {
		return (
			<div className="App">
				{!this.state.isSignedIn ? (
					<StyledFirebaseAuth
						uiConfig={this.uiConfig}
						firebaseAuth={firebase.auth()}
					/>
				) : (
					<div>
						<h2>Signed In as {firebase.auth().currentUser.displayName}</h2>
						<img
							height={250}
							alt="profile pic"
							src={firebase.auth().currentUser.photoURL}
						/>
						<br />
						<button
							style={{
								padding: '10px 20px',
								margin: '20px 0',
								fontSize: '15px',
								background: 'crimson',
								color: '#fff',
								outline: 'none',
								cursor: 'pointer'
							}}
							onClick={() => firebase.auth().signOut()}
						>
							Sign Out
						</button>
					</div>
				)}
			</div>
		);
	}
}

export default App;
