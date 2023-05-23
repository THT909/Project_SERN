import React, { Component } from 'react';
import { connect } from "react-redux";

import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import './DoctorSchedule.scss'
import moment from 'moment';
import { getScheduleByDate } from '../../../services/userService'

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDay: []
        }
    }

    async componentDidMount() {
        let { language } = this.props

        this.setArrDays(language)


    }
    setArrDays = (language) => {
        let arrDays = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (language === LANGUAGES.VI) {

                object.label = moment(new Date()).add(i, 'days').format('dddd-DD/MM')
            }
            else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd-DD/MM')
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            arrDays.push(object)
        }
        console.log(arrDays)
        this.setState({
            allDay: arrDays
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setArrDays(this.props.language)
        }
    }
    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent
            let date = event.target.value
            let res = await getScheduleByDate(doctorId, date)
            console.log('check res schedule from react ', res)
        }
    }

    render() {
        let { allDay } = this.state
        console.log('check arr option', allDay);
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
