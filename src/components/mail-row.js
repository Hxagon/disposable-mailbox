import React from "react";
import DOMPurify from "dompurify";
import {nl2br, autolink} from "../utils";


const MailTitle = React.createClass({
    propTypes: {
        subject: React.PropTypes.string
    },
    render() {
        return (
            <div className="row ">
                <div className="col-sm-12 email-summary">{this.props.subject}</div>
            </div>
        );
    }
});

const SanatizedHtml = React.createClass({
    propTypes: {
        content: React.PropTypes.string,
        active: React.PropTypes.bool
    },
    render() {
        let html = '';

        // can be inactive, prevents loading images
        if (this.props.active) {
            html = DOMPurify.sanitize(this.props.content);
        }
        let htmlAsHtml = {__html: html};

        return (
            <div dangerouslySetInnerHTML={htmlAsHtml}></div>
        );
    }

});

const MailBody = React.createClass({
    propTypes: {
        textPlain: React.PropTypes.string,
        textHtml: React.PropTypes.string
    },
    getInitialState() {
        return {htmlTabActive: false};
    },
    showTextOrHtml() {
        if (this.state.htmlTabActive) {
            return (
                <SanatizedHtml active={this.state.htmlTabActive} content={this.props.textHtml}/>
            )
        } else {
            let textPlain = autolink(nl2br(this.props.textPlain));
            return (
                <SanatizedHtml active={true} content={textPlain}/>
            )
        }
    },
    showButton(){
        if (this.state.htmlTabActive) {
            return <button className="btn btn-outline-info btn-sm" onClick={this.hideHtml}>show text</button>
        } else if (this.props.textHtml) {
            return <button className="btn btn-outline-info btn-sm" onClick={this.showHtml}>show html</button>
        } else {
            return null;
        }

    },
    showHtml(){
        this.setState({htmlTabActive: true})
    },
    hideHtml(){
        this.setState({htmlTabActive: false})
    },
    render() {
        return (
            <div className="row mail-content">
                {this.showButton()}
                {this.showTextOrHtml()}
            </div>
        );
    }
});

const MailHeader = React.createClass({
    propTypes: {
        mail: React.PropTypes.object
    },
    render() {
        return (
            <div className="row">
                <div className="col-sm-12 email-headers">
                    <dl>
                        <dt>To:</dt>
                        <dd>{this.props.mail.toString}</dd>
                        {this.props.mail.cc.map(cc =>
                            <div>
                                <dt>CC:</dt>
                                <dd>{cc}</dd>
                            </div>
                        )}

                        <dt>From:</dt>
                        <dd>{this.props.mail.fromName} &lt;{this.props.mail.fromAddress}&gt;</dd>
                        <dt>Date:</dt>
                        <dd>{this.props.mail.date}</dd>
                    </dl>
                </div>
            </div>
        );
    }
});

const MailRow = React.createClass({
    propTypes: {
        mail: React.PropTypes.object
    },
    render() {
        return (
            <section className="email">
                <MailTitle subject={this.props.mail.subject}/>
                <MailHeader mail={this.props.mail}/>
                <MailBody textPlain={this.props.mail.textPlain} textHtml={this.props.mail.textHtml}/>
            </section>
        );
    }
});

export default MailRow;