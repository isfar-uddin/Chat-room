import React, {Component} from 'react';
import Room from './Component/Room';
import firebase from './firebase';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';


export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentUser : null,
            loadingUI : true
        };

        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.setState({
                    currentUser:{
                        name:user.displayName,
                        photo:user.photoURL,
                        uid: user.uid
                    }
                })
            }else {
                const uiConfig = {
                    callbacks: {
                        signInSuccessWithAuthResult: () => {
                            return false;
                        },
                        uiShown: ()=>{
                            this.setState({loadingUI:false})
                        }
                    },
                    signInFlow: 'popup',
                    signInOptions : [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
                };

                const ui = new firebaseui.auth.AuthUI(firebase.auth());
                ui.start('#firebaseui-auth-container',uiConfig);

            }
        });
    }

    render(){

        if(this.state.currentUser === null) {
            return (
                <div>
                    <h1>Welcome to chat room</h1>
                    <div id="firebaseui-auth-container"></div>
                    <div id="loader" style={{display :!this.state.loadingUI ? 'none': ''}}>
                        Loading...
                    </div>
                </div>
            );
        }

        return (
            <Room currentUser={this.state.currentUser}/>
        );
    }
}
