import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';


class Login extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="login-backgroud">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="colum-12 text-login">
                            <p>Login</p>
                        </div>
                        <div className="col-12 from-group login-input">
                            <label >User Name:</label>
                            <input type="text" className='form-control' placeholder='Enter your usename' />
                        </div>
                        <div className="col-12 from-group login-input">
                            <label >Password:</label>
                            <input type="password" className='form-control' placeholder='Enter your password' />
                        </div>
                        <div className="col-12 ">
                            <button className="btn-login">Login</button>
                        </div>
                        <div className="col-12 forgot-password">
                            <span>Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center">
                            <span className="text-center"> Or login with:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus"></i>
                            <i className="fab fa-facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);


