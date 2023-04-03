import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./HomeFooter.scss";
// import { FormattedMessage } from 'react-intl';


class HomeFooter extends Component {


    render() {
        return (
            <div className="home-footer">

                <div className="main-footer">

                </div>
                <div className="bottom-footer">
                    <p>&copy; 2023 Make by THT909 <a href=' ' >More information</a> </p>

                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
