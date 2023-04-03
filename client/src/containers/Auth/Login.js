import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
// import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        }
    }
    handlOnChangeUserName = (event) => {
        this.setState({
            userName: event.target.value,
        })
        // console.log(event.target.value)
    }
    handlOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        })
        // console.log(event.target.value)
    }
    handlOnLogin = async () => {
        this.setState({
            errMessage: ''
        })
        // console.log(this.state)//log username and password
        try {
            let data = await handleLoginApi(this.state.userName, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('login succeeds')
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log('check err', error.response)
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
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
                            <input type="text"
                                value={this.state.userName}
                                onChange={(event) => this.handlOnChangeUserName(event)}
                                className='form-control'
                                placeholder='Enter your username' />
                        </div>
                        <div className="col-12 from-group login-input">
                            <label >Password:</label>
                            <div className="custom-password">
                                <input type={this.state.isShowPassword ? 'text' : 'password'}
                                    value={this.state.password}
                                    onChange={(event) => this.handlOnChangePassword(event)}
                                    className='form-control'
                                    placeholder='Enter your password' />
                                <span
                                    onClick={() => { this.handleShowHidePassword() }} >
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: "red" }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12 ">
                            <button className="btn-login"
                                onClick={() => this.handlOnLogin()}
                            >Login</button>
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
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);


