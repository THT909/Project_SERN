import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./HomeHeader.scss"
import logo from "../../assets/logo.png"
import { FormattedMessage } from 'react-intl'

class HomeHeader extends Component {

    render() {
        console.log('check : ', this.props)
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i class="fas fa-bars"></i>
                            <img src={logo} alt="" />
                        </div>

                        <div className="center-content">
                            <div className="child-content">
                                <div className="">
                                    <b>
                                        <FormattedMessage id='homeHeader.speciality' ></FormattedMessage>
                                    </b>
                                </div>
                                <div className="sub-title"><FormattedMessage id='homeHeader.searchDoctor' ></FormattedMessage></div>
                            </div>
                            <div className="child-content">
                                <div className=""><b><FormattedMessage id='homeHeader.facility' ></FormattedMessage></b></div>
                                <div className="sub-title"><FormattedMessage id='homeHeader.selectFacility' ></FormattedMessage></div>
                            </div>
                            <div className="child-content">
                                <div className=""><b><FormattedMessage id='homeHeader.doctor' ></FormattedMessage></b></div>
                                <div className="sub-title"><FormattedMessage id='homeHeader.choseDoctor'></FormattedMessage></div>
                            </div>
                            <div className="child-content">
                                <div className=""><b><FormattedMessage id='homeHeader.medicalPackge' ></FormattedMessage></b></div>
                                <div className="sub-title"><FormattedMessage id='homeHeader.medicalPackge' ></FormattedMessage></div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i class="fas fa-question-circle"></i>
                                <FormattedMessage id='homeHeader.support' ></FormattedMessage>
                            </div>
                            <div className="flag"><FormattedMessage id='homeHeader.language' ></FormattedMessage></div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className="content-up">
                        <div className="title"><FormattedMessage id='banner.title1' ></FormattedMessage></div>
                        <div className="title-sub"><FormattedMessage id='banner.title2' ></FormattedMessage></div>
                        <div className="search">
                            <i className='fas fa-search'></i>
                            <input type="text" name="" id="" placeholder='Tìm chuyên khoa khám bệnh' />
                        </div>
                    </div>
                    <div className="content-down">
                        <div className="option">
                            <div className="option-child">
                                <div className="icon-child ">
                                    <div className="img-option img1"></div>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id='banner.option.sub1' ></FormattedMessage>
                                </div>
                            </div>
                        </div>
                        <div className="option">
                            <div className="option-child">
                                <div className="icon-child ">
                                    <div className="img-option img2"></div>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id='banner.option.sub2' ></FormattedMessage>
                                </div>
                            </div>
                        </div>
                        <div className="option">
                            <div className="option-child">
                                <div className="icon-child ">
                                    <div className="img-option img3"></div>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id='banner.option.sub3' ></FormattedMessage>
                                </div>
                            </div>
                        </div>
                        <div className="option">
                            <div className="option-child">
                                <div className="icon-child ">
                                    <div className="img-option img4"></div>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id='banner.option.sub4' ></FormattedMessage>
                                </div>
                            </div>
                        </div>
                        <div className="option">
                            <div className="option-child">
                                <div className="icon-child ">
                                    <div className="img-option img5"></div>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id='banner.option.sub5' ></FormattedMessage>
                                </div>
                            </div>
                        </div>
                        <div className="option">
                            <div className="option-child">
                                <div className="icon-child ">
                                    <div className="img-option img6"></div>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id='banner.option.sub6' ></FormattedMessage>
                                </div>
                            </div>
                        </div>
                        <div className="option">
                            <div className="option-child">
                                <div className="icon-child ">
                                    <div className="img-option img7"></div>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id='banner.option.sub7' ></FormattedMessage>
                                </div>
                            </div>
                        </div>
                        <div className="option">
                            <div className="option-child">
                                <div className="icon-child ">
                                    <div className="img-option img8"></div>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id='banner.option.sub8' ></FormattedMessage>
                                </div>
                            </div>
                        </div>
                        <div className="option">
                            <div className="option-child">
                                <div className="icon-child ">
                                    <div className="img-option img9"></div>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id='banner.option.sub9' ></FormattedMessage>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
