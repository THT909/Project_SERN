import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProfileDoctor.scss';
// import {FormattedMessage} from 'react-intl'
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        };
    }
    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data,
        });
    }
    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    };
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            //  this.getInforDoctor( this.props. doctorId)
        }
    }
    renderTimeBoking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time =
                language === LANGUAGES.VI
                    ? dataTime.timeTypeData.valueVi
                    : dataTime.timeTypeData.valueEn;
            let date =
                language === LANGUAGES.VI
                    ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                    : moment
                          .unix(+dataTime.date / 1000)
                          .locale('en')
                          .format('ddd - MM/DD/YYYY');
            return (
                <>
                    <div>
                        {time}-{date}
                        <div>Miễn phí đặt lịch</div>
                    </div>
                </>
            );
        }
    };

    render() {
        let nameEn = '',
            nameVi = '';
        let { dataProfile } = this.state;
        let { language, ísShowDescriptionDoctor, dataTime } = this.props;

        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi},${dataProfile.lastName}${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn},${dataProfile.firstName}${dataProfile.lastName}`;
        }
        // let dataPrice = dataProfile.Doctor_infor;
        return (
            <div className="profile-doctor-container">
                <div className="infor-doctor">
                    <div
                        className="content-left"
                        style={{
                            backgroundImage: `url(${
                                dataProfile && dataProfile.image ? dataProfile.image : ''
                            })`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            cursor: 'pointer',
                        }}
                    ></div>
                    <div className="content-right">
                        <div className="up">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                        <div className="down">
                            {ísShowDescriptionDoctor === true ? (
                                <>
                                    {dataProfile &&
                                        dataProfile.Markdown &&
                                        dataProfile.Markdown.description && (
                                            <span>{dataProfile.Markdown.description}</span>
                                        )}
                                </>
                            ) : (
                                <>{this.renderTimeBoking(dataTime)}</>
                            )}
                        </div>
                    </div>
                </div>
                <div className="price">
                    <div className="price-title">Giá khám: </div>
                    {dataProfile && dataProfile.Doctor_infor && language === LANGUAGES.VI && (
                        <NumberFormat
                            className="currency"
                            value={dataProfile.Doctor_infor.priceTypeData.valueVi}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'VNĐ'}
                        />
                    )}
                    {dataProfile && dataProfile.Doctor_infor && language === LANGUAGES.EN && (
                        <NumberFormat
                            className="currency"
                            value={dataProfile.Doctor_infor.priceTypeData.valueEn}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'$'}
                        />
                    )}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};
const mapDispathToProps = (dispatch) => {
    return {};
};
export default connect(mapStateToProps, mapDispathToProps)(ProfileDoctor);
