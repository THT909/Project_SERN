import React, { Component } from 'react';
import { connect } from "react-redux";

import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import './DoctorSchedule.scss'
import moment from 'moment';
import { getScheduleByDate } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDay: [],
            allAvalableTime: []
        }
    }

    async componentDidMount() {
        let { language } = this.props

        let alldays = this.setArrDays(language)
        this.setState({
            allDay: alldays
        })


    }
    setArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Hôm nay-${ddMM}`
                    object.label = today
                }
                else {
                    object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                }
            }
            else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Hôm nay-${ddMM}`
                    object.label = today
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd-DD/MM')
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            allDays.push(object)
        }
        return allDays
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.setArrDays(this.props.language)
            this.setState({
                allDays: allDays
            })
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let alldays = this.setArrDays(this.props.language)
            let res = await getScheduleByDate(this.props.doctorIdFromParent, alldays[0].value)
            this.setState({
                allAvalableTime: res.data ? res.data.dataSchedule : []
            })
        }
    }




    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent
            let date = event.target.value
            let res = await getScheduleByDate(doctorId, date)
            if (res && res.data ? res.data : []) {
                this.setState({
                    allAvalableTime: res.data ? res.data.dataSchedule : []
                })
            }
        }
    }

    render() {
        let { allDay } = this.state
        let allAvalableTime = this.state.allAvalableTime
        console.log('check state', allAvalableTime);
        let { language } = this.props
        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select name="" id=""
                        onChange={(event) => this.handleOnChangeSelect(event)}
                    >
                        {allDay && allDay.length > 0 &&
                            allDay.map((item, index) => {
                                return (
                                    <option
                                        value={item.value}
                                        key={index}>{item.label}</option>
                                )
                            })
                        }

                    </select>
                </div>
                <div className="all-available-time">
                    <div className="text-content">
                        <i className="fas fa-calendar-alt"></i>
                        <span><FormattedMessage id="patient.detail-doctor.schedule"></FormattedMessage> </span>

                    </div>
                    <div className="time-content">
                        {console.log('check', allAvalableTime.length)}
                        {allAvalableTime && allAvalableTime.length > 0 ?
                            <>
                                <div className="time-content-btns">

                                    {allAvalableTime.map((item, index) => {

                                        let timeDisplay = language === LANGUAGES.VI ?
                                            item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                        return (
                                            <button key={index}>{timeDisplay}</button>
                                        )
                                    })}
                                </div>
                                <div className="book-free">
                                    <span>
                                        <FormattedMessage id="patient.detail-doctor.choose"></FormattedMessage>
                                        <i className="far fa-hand-point-up"></i>
                                        <FormattedMessage id="patient.detail-doctor.book-free"></FormattedMessage>
                                    </span>
                                </div>
                            </>
                            : <div className="no-chedule">
                                <FormattedMessage id="patient.detail-doctor.no-schedule"></FormattedMessage></div>
                        }
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
