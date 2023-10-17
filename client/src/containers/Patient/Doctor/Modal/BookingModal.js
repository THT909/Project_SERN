import _ from 'lodash';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import React, { Component } from 'react';
import ProfileDoctor from '../ProfileDoctor';

import { connect } from 'react-redux';
// import {FormattedMessage} from 'react-intl'

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {}
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    render() {
        let { isOpenModal, closeBookingClose, dataTime } = this.props;
        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId;
        }

        return (
            <Modal isOpen={isOpenModal} className={'booking-modal-container'} size="lg" centered>
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left">Thông tin đặt lịch khám bệnh</span>
                        <span className="rignt" onClick={closeBookingClose}>
                            <i className="fas fa-times" />
                        </span>
                    </div>
                    <hr />
                    <div className="booking-modal-body">
                        {/* {JSON.stringify(dataTime)} */}
                        <div className="doctor-infor">
                            <ProfileDoctor
                                doctorId={doctorId}
                                ísShowDescriptionDoctor={false}
                                dataTime={dataTime}
                            />
                        </div>
                        <div className="row">
                            <div className="col-6 form-grou py-2">
                                <label htmlFor="">Họ tên</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-6 form-group py-2">
                                <label htmlFor="">Số điện thoại</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-6 form-group  py-2">
                                <label htmlFor="">Địa chỉ Email</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-6 form-group  py-2">
                                <label htmlFor="">Địa chỉ liên hệ</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-12 form-group  py-2">
                                <label htmlFor="">Lý do khám</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-6 form-group  py-2">
                                <label htmlFor="">Đặt cho ai</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-6 form-group  py-2">
                                <label htmlFor="">Giới tính</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="booking-modal-footer">
                        <button
                            className="btn-booking-confirm btn btn-primary"
                            onClick={closeBookingClose}
                        >
                            Xác nhận
                        </button>
                        <button
                            className="btn-booking-cancel btn btn-danger"
                            onClick={closeBookingClose}
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
