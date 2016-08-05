import React from "react";
import {connect} from "react-redux";
import {loginWithRandomUsername, loginWithInputUsernameIfValid, changeInputUsername} from "../actions";


let Header = React.createClass({
    mailCountBadge() {
        if (this.props.mailcount > 0) {
            return <span className="tag tag-pill tag-default">{this.props.mailcount}</span>
        } else {
            return null;
        }

    },
    render() {
        let title = this.props.address ? this.props.address : 'Mailbox';
        return (
            <div className="nav-container">
                <div className="container">
                    <nav className="navbar navbar-light">
                        <a className="navbar-brand"><span className="octicon-inbox"></span>
                            &nbsp;
                            {title}
                            &nbsp;
                            {this.mailCountBadge()}
                        </a>


                        <ul className="nav navbar-nav">

                            {/*Random Button*/}
                            <button type="button nav-link" className="btn btn-outline-primary pull-xs-right"
                                    onClick={e => {
                                        e.preventDefault();
                                        this.props.onClickRandomize();
                                    }
                                    }>
                                <span className={'glyphicon glyphicon-random'}></span>&nbsp;
                                randomize
                            </button>

                            {/*Login Form*/}
                            <form className="form-inline pull-xs-right" onSubmit={e => {
                                e.preventDefault();
                                this.props.onLoginSubmit();
                            }
                            }>
                                <input value={this.props.inputFieldUsername}
                                       onChange={(e) => this.props.onChangeInputUsername(e.target.value)  }
                                       placeholder="username"
                                       type="text" className="form-control"/>
                                <button type="submit" className="btn btn-outline-success">login</button>
                            </form>

                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
});


const mapStateToProps = (state, ownProps) => {
    return {
        inputFieldUsername: state.login.inputFieldUsername,
        address: state.login.address,
        mailcount: state.mails.length
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClickRandomize: () => {
            dispatch(loginWithRandomUsername())
        },
        onLoginSubmit: () => {
            dispatch(loginWithInputUsernameIfValid())
        },
        onChangeInputUsername: (value) => {
            dispatch(changeInputUsername(value))
        }
    }
};

Header = connect(mapStateToProps, mapDispatchToProps)(Header);

export default Header;