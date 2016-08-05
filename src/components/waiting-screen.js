import React from "react";
import spinner from "../spinner.gif";

const WaitingScreen = React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        subtitle: React.PropTypes.string,
        spinner: React.PropTypes.bool,
        children: React.PropTypes.node,
    },
    render() {
        return (
            <div className="waiting-screen">
                <h1>{this.props.title}</h1>
                <p className="lead">{this.props.subtitle}</p>
                <p><br/>
                    {this.props.spinner ? <img src={spinner}/> : ""}
                    <br/>
                </p>
                <p>{this.props.children}</p>
            </div>
        );
    }
});

export default WaitingScreen;