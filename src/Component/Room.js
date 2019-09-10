import React, {Component} from 'react';

export default class Room extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: props.currentUser,
            messages: []
        };
    }

    sendMessage(e) {
        e.preventDefault();

        const user = this.state.currentUser;
        const text = e.target.message.value.trim();
        const time = new Date().getTime();

        // set the new object value
        const message= {
            id: Math.random().toString(36).slice(2,13),
            user:user,
            text:text,
            time:time
        };

        this.setState({
            messages: [...this.state.messages,message]
        });
        e.target.message.value = '';
    }

    render(){
        return(
            <div className="container">
                <div className="messages">
                    {this.state.messages.map(m => (
                        <div key={m.id} className="message">
                            <img className="avatar" src={m.user.photo} />
                            <div className="message-info">
                                {m.user.name},{' '}
                                {/* we are not storing date object in state anymore.
                 So, have to create a date object */}
                                {new Date(m.time).toLocaleDateString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </div>
                            <div className="message-text">{m.text}</div>
                        </div>
                    ))}
                </div>
                <form className="send-form" onSubmit={e => this.sendMessage(e)}>
                    <input
                        placeholder="Type and press enter to send..."
                        className="message-field"
                        name="message"
                        type="text"
                    />
                </form>
            </div>
        )
    }
}
