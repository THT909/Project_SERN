/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import { getDetailDoctorService } from '../../../services/userService'

import Select from 'react-select';
import { CRUD_ACTION, LANGUAGES } from '../../../utils';
const mdParser = new MarkdownIt(/* Markdown-it options */);



class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {

            contentHTML: '',
            contentMarkdown: '',
            selectedDoctor: '',
            description: '',
            listDoctor: [],
            hasOldData: false,

            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            addressClinic: '',
            nameClinic: '',
            note: '',

        }
    }
    buildDataInputSelect = (data, type) => {
        let result = [];
        let language = this.props.language
        if (data && data.length > 0) {
            if (type === "USERS") {
                data.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.lastName} ${item.firstName}`
                    let labelEn = `${item.firstName} ${item.lastName}`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.id
                    result.push(object)
                })
            }
            if (type === "PRICE") {
                data.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.valueVi} `
                    let labelEn = `${item.valueEn} USD`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })
            }

            if (type === "PAYMENT" || type === "PROVINCE") {
                data.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.valueVi} `
                    let labelEn = `${item.valueEn}`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })
            }
        }
        return result
    }
    componentDidMount() {
        this.props.fetchAllDoctor()
        this.props.getAllRequiredDoctorInfor()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor, 'USERS')
            this.setState({
                listDoctor: dataSelect
            })
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor
            let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE")
            let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT")
            let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE")
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor, "USERS")
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor
            let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE")
            let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT")
            let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE")
            this.setState({
                listDoctor: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        })
    }
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state
        this.props.saveInfoDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,

            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note
        })
    }


    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let { listPrice, listProvince, listPayment } = this.state

        let res = await getDetailDoctorService(selectedDoctor.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown

            let addressClinic = '', nameClinic = '', note = '', paymentId = '', priceId = '', provinceId = '',
                selectedPayment = '', selectedPrice = '', selectedProvince = ''
            if (res.data.Doctor_infor) {

                addressClinic = res.data.Doctor_infor.addressClinic
                nameClinic = res.data.Doctor_infor.nameClinic
                note = res.data.Doctor_infor.note
                paymentId = res.data.Doctor_infor.paymentId
                priceId = res.data.Doctor_infor.priceId
                provinceId = res.data.Doctor_infor.provinceId

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })

            }


            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                hasOldData: true,
            })
        }
        else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                addressClinic: '',
                nameClinic: '',
                note: '',
                hasOldData: false,

            })
        }
        console.log(`Option check res:`, res)
    };
    handleChangeSelectDoctor = async (selectedDoctor, name) => {
        console.log("name:", name.name)
        console.log("selecetedDoctor", selectedDoctor);
        let stateName = name.name
        let stateCoppy = { ...this.state }
        stateCoppy[stateName] = selectedDoctor
        this.setState({
            ...stateCoppy
        })
    };
    handleOnChangeDesc = (event, id) => {
        let stateCoppy = { ...this.state }
        stateCoppy[id] = event.target.value
        this.setState(({
            ...stateCoppy
        }))
    }
    render() {
        console.log(this.state.selectedPrice)
        let { hasOldData } = this.state
        return (
            <div className='manage-doctor-conainer'>
                <div className="manage-doctor-title"><FormattedMessage id="admin.manager-doctor.title"></FormattedMessage></div>
                <div className="more-infor1">
                    <div className="content-left">
                        <label htmlFor=""><FormattedMessage id="admin.manager-doctor.select-doctor"></FormattedMessage></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctor}
                            placeholder={<FormattedMessage id="admin.manager-doctor.select-doctor"></FormattedMessage>}
                        />
                    </div>
                    <div className="content-right">
                        <label htmlFor=""><FormattedMessage id="admin.manager-doctor.intro"></FormattedMessage></label>
                        <textarea
                            className='form-control'
                            onChange={(event) => this.handleOnChangeDesc(event, 'description')}
                            value={this.state.description}
                            name=""
                            id=""
                            rows="4"
                        >
                        </textarea>
                    </div>
                </div>
                <div className="more-infor2 row">
                    <div className="mt-2 row">
                        <div className="col-4 form-group">
                            <label htmlFor=""><FormattedMessage id="admin.manager-doctor.price"></FormattedMessage></label>
                            <Select
                                options={this.state.listPrice}
                                placeholder={<FormattedMessage id="admin.manager-doctor.price"></FormattedMessage>}
                                value={this.state.selectedPrice}
                                onChange={this.handleChangeSelectDoctor}
                                name="selectedPrice"
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label htmlFor=""><FormattedMessage id="admin.manager-doctor.payment"></FormattedMessage></label>
                            <Select
                                options={this.state.listPayment}
                                placeholder={<FormattedMessage id="admin.manager-doctor.payment"></FormattedMessage>}
                                value={this.state.selectedPayment}
                                onChange={this.handleChangeSelectDoctor}
                                name="selectedPayment"
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label htmlFor=""><FormattedMessage id="admin.manager-doctor.province"></FormattedMessage></label>
                            <Select
                                options={this.state.listProvince}
                                placeholder={<FormattedMessage id="admin.manager-doctor.province"></FormattedMessage>}
                                value={this.state.selectedProvince}
                                onChange={this.handleChangeSelectDoctor}
                                name="selectedProvince"
                            />
                        </div>
                    </div>
                    <div className="mt-2 row">
                        <div className="col-4 form-group">
                            <label htmlFor=""><FormattedMessage id="admin.manager-doctor.nameClinic"></FormattedMessage></label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeDesc(event, "nameClinic")}
                                value={this.state.nameClinic}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label htmlFor=""><FormattedMessage id="admin.manager-doctor.addressClinic"></FormattedMessage></label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeDesc(event, "addressClinic")}
                                value={this.state.addressClinic}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label htmlFor=""><FormattedMessage id="admin.manager-doctor.note"></FormattedMessage></label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeDesc(event, "note")}
                                value={this.state.note}
                            />
                        </div>
                    </div>
                </div>



                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown} />
                </div>
                <button
                    onClick={() => { this.handleSaveContentMarkdown() }}
                    className={hasOldData === false ? "btn btn-primary  save-content-doctor" : "btn btn-warning"}>
                    {hasOldData === false ?
                        <span><FormattedMessage id="admin.manager-doctor.add"></FormattedMessage></span> :
                        <span><FormattedMessage id="admin.manager-doctor.save"></FormattedMessage></span>}
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctor: state.admin.allDoctor,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveInfoDoctor: (data) => dispatch(actions.saveInfoDoctor(data)),
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
