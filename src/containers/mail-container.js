import React from "react";
import {connect} from "react-redux";
import WaitingScreen from "../components/waiting-screen";
import MailRow from "../components/mail-row";


let MailContainer = React.createClass({
    render(){
        if (!this.props.login.username) {
            return (
                <div className="mailBox">
                    <p>
                        Use the buttons above to create a new inbox, or open a specific mailbox.
                    </p>
                </div>
            );
        }

        if (!this.props.doneInitialFetchingForUsername && this.props.isFetching) {
            return (
                <div className="mailBox">
                    <WaitingScreen title={this.props.login.username} subtitle="Loading Mails" spinner={true}/>
                </div>
            );
        }

        if (this.props.mails.length > 0) {
            return (
                <div className="mailBox">
                    <main>
                        <div className="container min-height">
                            <div className="email-table">
                                {this.props.mails.map(mail=>
                                    <MailRow mail={mail} key={mail.messageId}> </MailRow>
                                )}
                            </div>
                        </div>
                    </main>
                </div>);
        } else {
            // empty
            return (
                <div className="mailBox">
                    <WaitingScreen title={this.props.login.address} subtitle="Inbox is empty." spinner={false}>
                        Emails to {this.props.address} will be automatically displayed here.
                    </WaitingScreen>
                </div>
            );
        }
    }
});

let mapStateToProps = (state) => {
    return {
        mails: state.mails,
        login: state.login,
        isFetching: state.isFetching,
        doneInitialFetchingForUsername: state.doneInitialFetchingForUsername
    }
};

MailContainer = connect(mapStateToProps)(MailContainer);

export default MailContainer;