import React from 'react';
import firebase from './../firebase';

class Room extends React.Component {
    constructor(props) {
        super(props);

        this.db = firebase.database();

        this.state = {
            currentUser: props.currentUser,
            messages: []
        };
    }

    componentDidMount() {
        this.db
            .ref('/messages')
            .limitToLast(10)
            .on('child_added', child => {
            const message = {id:child.key, ...child.val()};
            this.setState({ messages: [...this.state.messages, message] });

        })
    }

    sendMessage(e) {
        e.preventDefault();

        const newMessage = this.db.ref('/messages').push();

        let user= this.state.currentUser;
        let time = new Date().getTime();
        let text = e.target.message.value.trim();

        newMessage.set({
            user,
            text,
            time
        });

        // construct the new message
        const message = {
            id: newMessage.key,
            user,
            time,
            text
        };

        // update messages without mutating
        this.setState({ messages: [...this.state.messages, message] });

        // clear the input field
        e.target.message.value = "";
    }

    render() {
        return (
            <div className="container">
                <div className="messages">
                    {this.state.messages.map(m => (
                        <div key={m.id} className="message">
                            <img className="avatar" src={m.user.photo}/>
                            <div className="message-info">
                                {m.user.name},
                                {new Date(m.time).toLocaleDateString("en-US", {
                                    hour: "numeric",
                                    minute: "numeric",
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric"
                                })}
                            </div>
                            <div className="message-text">{m.text}</div>
                        </div>
                    ))}
                </div>
                <form className="send-form" onSubmit={e => this.sendMessage(e)}>
                    <input className="message-field" name="message" type="text" placeholder="Type text and press enter to send message" />
                </form>
            </div>
        );
    }
}

export default Room;