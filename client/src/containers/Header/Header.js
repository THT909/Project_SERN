import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, docotrMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from '../../utils/constant';
import _ from 'lodash'
class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuApp: []
        }
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    componentDidMount() {
        let { userInfo } = this.props
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }
            if (role === USER_ROLE.DOCTOR) {
                menu = docotrMenu;
            }
        }
        this.setState({
            menuApp: menu
        })
        console.log("check user infor", this.props.userInfo)
    }
    render() {
        const { processLogout, language, userInfo } = this.props;
        console.log('check user info:', userInfo)
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className="header-logout-languages">

                    <div className="languages">
                        <span className="welcom">
                            <FormattedMessage id='menu.welcome'></FormattedMessage>
                            , {userInfo && userInfo.firstName ? userInfo.firstName : ''} !
                        </span>
                        <span className={language === LANGUAGES.VI ? 'languages-vi active' : 'languages-vi'}
                            onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>
                            VN
                        </span>
                        <span className={language === LANGUAGES.EN ? 'languages-en active' : 'languages-en'}
                            onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>
                            EN
                        </span>
                    </div>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title="Log out">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
