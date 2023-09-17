import React, { Component } from 'react';
import { connect } from "react-redux";

import { LANGUAGES } from '../../../utils';
import './DoctorExtraInfor.scss'
import { getScheduleByDate } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false
        }
    }

    async componentDidMount() {


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
    showHideDetailInfior = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor } = this.state
        return (
            <div className="doctor-extra-infor-container">
                <div className="content-up">
                    <div className="text-address">ĐỊA CHỈ KHÁM</div>
                    <div className="name-clinic">Phòng khám Chuyên khoa Da liễu</div>
                    <div className="detail-address">233 Quang Trung - Gò Vấp - TP Hồ Chí Minh</div>
                </div>
                <div className="content-down">
                    {isShowDetailInfor === false &&
                        <div className="short-infor">
                            GIÁ KHÁM: 200.000đ.
                            <span
                                onClick={() => this.showHideDetailInfior(true)}>
                                Xem chi tiết
                            </span>
                        </div>
                    }{
                        isShowDetailInfor === true &&
                        <>
                            <div className="title-price">GIÁ KHÁM.</div>
                            <div className="detail-infor">
                                <div className="price">
                                    <div className="left">Giá Khám</div>
                                    <div className="right">200.000đ</div>
                                </div>
                                <div className="note">Giá khám đã bao gồm phí đặt lịch hẹn trước (Giá niêm yết của phòng khám)
                                    Giá khám cho người nước ngoài 30 USD</div>
                                <div className="payment">Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ</div>
                                <div className="hide-price">
                                    <span
                                        onClick={() => this.showHideDetailInfior(false)}>
                                        Ẩn bảng giá.
                                    </span>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
