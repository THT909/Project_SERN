import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BestDoctor.scss';
import * as action from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import Slider from 'react-slick';
class BestDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: [],
            arrImgDoctor: []
        }

    }
    componentDidMount() {
        this.props.loadTopDoctor()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({

                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }
    handleViewDetailDoctor = (id) => {
        this.props.history.push(`/detail-doctor/${id}`)
    }
    render() {
        let arrDoctors = this.state.arrDoctors
        let { language } = this.props
        return (
            <div className="section-slider section-bestdoctor">
                <div className="section-content">
                    <div className="section-header">
                        <span><FormattedMessage id="homePage.bestDoctor" /></span>
                        <button><FormattedMessage id="homePage.more-information" /></button>
                    </div>
                    <Slider {...this.props.settings}>
                        {arrDoctors && arrDoctors.length > 0
                            && arrDoctors.map((item, index) => {
                                let imageBase64 = ''
                                if (item.image) {
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')

                                    }
                                }
                                let nameVi = `${item.positionData.valueVi} ${item.lastName} ${item.firstName}`
                                let nameEn = `${item.positionData.valueEn} ${item.firstName} ${item.lastName}`
                                return (
                                    <div className='slide-customize'
                                        onClick={() => this.handleViewDetailDoctor(item.id)}
                                    >
                                        <div className="border-custom">
                                            <img alt="" src={imageBase64} />
                                            <p>{language === LANGUAGES.VI ? nameVi : nameEn}</p>
                                            <span>Tim mạch Đây là một đoạn văn bản rất dài, khi hiển thị trên trình duyệt thì nó sẽ tự động xuống dòng để hiển thị đầy đủ nội dung</span>
                                        </div>
                                    </div>
                                )
                            })}


                    </Slider>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(action.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BestDoctor));
