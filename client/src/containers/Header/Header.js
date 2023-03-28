import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils/constant';
class Header extends Component {

    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        const { processLogout, language, userInfo } = this.props;
        console.log('check user info:', userInfo)
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
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
