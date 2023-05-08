/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions"
import { dateFormat, LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker'
import moment from 'moment';
import { toast } from "react-toastify"
import _ from "lodash"

import { saveBulkScheduleDoctor } from '../../../services/userService'

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctor: [],
            selectedDoctor: {},
            currentDate: '', // DD/MM/YYYY
            rangeTime: []
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctor()
        this.props.fetchAllScheduleTime()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
            this.setState({
                listDoctor: dataSelect
            })
        }

        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                // data = data.map(item => {
                //     item.isSelected = false
                //     return item
                // })
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            // console.log('check data', data);
            this.setState({
                rangeTime: data
            })
        }

        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
        //     this.setState({
        //         listDoctor: dataSelect
        //     })
        // }
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
    };
    buildDataInputSelect = (data) => {
        let result = [];
        let language = this.props.language
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }
        return result
    }
    handleOnChangeDatePiker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    handleClickTime = (e) => {
        console.log("e", e.id)
        let { rangeTime } = this.state
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === e.id) {
                    item.isSelected = !item.isSelected
                    console.log("item", item.id)
                }
                this.setState({
                    rangeTime: rangeTime
                })
            })
        }
    }
    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state
        let result = []
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Invalid doctors !')
            return
        }
        if (!currentDate) {
            toast.error('Invalid date !')
            return
        }
        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        let formatedDate = new Date(currentDate).getTime()
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(schedule => {

                    let object = {}
                    object.doctorId = selectedDoctor.value
                    object.date = formatedDate
                    object.timeType = schedule.keyMap
                    result.push(object)
                })
            } else {
                toast.error('Invalid Time !')
                return
            }

        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatedDate: formatedDate
        })
        console.log("check server respone", res.response.errCode);
        console.log('check result', result);
        console.log();
        if (res.response.errCode === 0) {
            toast.success("create a schedule  suceed !")
            return
        }

    }

    render() {
        // console.log('check state:', this.state);
        let { rangeTime } = this.state
        let { language } = this.props
        console.log('check', rangeTime)

        return (

            <div className="manager-schedule-container">
                <div className="m-s-title title">
                    <FormattedMessage id='manager-schedule.title' />
                </div>
                <div className="container">
                    <div className="row ">
                        <div className="col-6 form-group">
                            <label htmlFor="">
                                <FormattedMessage id='manager-schedule.choose-doctor' />
                            </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctor}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label htmlFor="">
                                <FormattedMessage id='manager-schedule.choose-date' />
                            </label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePiker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={new Date()}
                            />
                        </div>
                        <div className="pick-hour-container">
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button className={item.isSelected ? 'btn btn-hour active' : 'btn btn-hour'}
                                            //'btn btn-hour'
                                            onClick={() => this.handleClickTime(item)}
                                            key={index}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}


                                        </button>
                                    )
                                })}
                        </div>
                        <div className="col-12">

                            <button className="btn btn-save"
                                onClick={() => this.handleSaveSchedule()}
                            >
                                <FormattedMessage id='manager-schedule.save' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctor: state.admin.allDoctor,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
