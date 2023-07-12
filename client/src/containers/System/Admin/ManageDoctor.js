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
            data.map(function (item, index) {
                let object = {}
                let labelVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi
                let labelEn = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueEn
                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })
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
            let dataSelectPrice = this.buildDataInputSelect(resPrice)
            let dataSelectPayment = this.buildDataInputSelect(resPayment)
            let dataSelectProvince = this.buildDataInputSelect(resProvince)
            // console.log('data new', dataSelectPrice, dataSelectPayment, dataSelectProvince);
            this.setState({
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
    handleSaveContentMardown = () => {
        let { hasOldData } = this.state
        this.props.saveInfoDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE
        })
        this.setState({
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            hasOldData: false
        })
    }
    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await getDetailDoctorService(selectedDoctor.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown
            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,
                hasOldData: true
            })
        }
        else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                hasOldData: false
            })
        }
        console.log(`Option check res:`, res)
    };
    handleOnChangeDesc = (event) => {
        this.setState(({
            description: event.target.value
        }))
    }
    render() {
        console.log(this.state)
        let { hasOldData } = this.state
        return (
            <div className='manage-doctor-conainer'>
                <div className="manage-doctor-title"><FormattedMessage id="admin.manager-doctor.title"></FormattedMessage></div>
                <div className="more-infor1">
                    <div className="content-left">
                        <label htmlFor=""> <FormattedMessage id="admin.manager-doctor.select-doctor"></FormattedMessage></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctor}
                            placeholder={"Chọn bác sĩ"}
                        />
                    </div>
                    <div className="content-right">
                        <label htmlFor=""><FormattedMessage id="admin.manager-doctor.intro"></FormattedMessage></label>
                        <textarea
                            className='form-control'
                            onChange={(event) => this.handleOnChangeDesc(event)}
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
                            <label htmlFor="">Chon gia</label>
                            <Select
                                options={this.state.listPrice}
                                placeholder={'Chon gia'}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label htmlFor="">Chon phuong thuc thanh toan</label>
                            <Select name="" id=""
                                options={this.state.listPayment}
                                placeholder={'chon phuong thuc thanh toan'}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label htmlFor="">Chon tinh thanh</label>
                            <Select name="" id=""
                                options={this.state.listProvince}
                                placeholder={'chon tinh thanh'}
                            />
                        </div>
                    </div>
                    <div className="mt-2 row">
                        <div className="col-4 form-group">
                            <label htmlFor="">Ten phong kham</label>
                            <input className='form-control' />
                        </div>
                        <div className="col-4 form-group">
                            <label htmlFor="">Dia chi phong kham</label>
                            <input className='form-control' />
                        </div>
                        <div className="col-4 form-group">
                            <label htmlFor="">Note</label>
                            <input className='form-control' />
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
                    onClick={() => { this.handleSaveContentMardown() }}
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
