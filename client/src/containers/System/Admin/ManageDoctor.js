/* eslint-disable array-callback-return */
import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';

import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {

            contentHTML: '',
            contentMarkdown: '',
            selectedDoctor: '',
            description: '',
            listDoctor: []
        }
    }
    buildDataInputSelect = (data) => {
        let result = [];
        let language = this.props.language
        if (data && data.length > 0) {
            data.map(function (item, index) {
                let object = {}
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`
                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })
        }
        return result
    }
    componentDidMount() {
        this.props.fetchAllDoctor()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
            this.setState({
                listDoctor: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
            this.setState({
                listDoctor: dataSelect
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
        this.props.saveInfoDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value
        })
    }
    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
            console.log(`Option selected:`, this.state.selectedDoctor)
        );
    };
    handleOnChangeDesc = (event) => {
        this.setState(({
            description: event.target.value
        }))
    }
    render() {
        console.log(this.state)
        return (
            <div className='manage-doctor-conainer'>
                <div className="manage-doctor-title">manager more infor doctor</div>
                <div className="more-infor">
                    <div className="content-left">
                        <label htmlFor=""> chon bac si</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.listDoctor}
                        />
                    </div>
                    <div className="content-right">
                        <label htmlFor="">thong tin gioi thieu</label>
                        <textarea
                            className='form-control'
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                            name=""
                            id=""
                            rows="4"
                        >hello</textarea>
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange} />
                </div>
                <button
                    onClick={() => { this.handleSaveContentMardown() }}
                    className="btn btn-primary save-content-doctor ">
                    Save
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctor: state.admin.allDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveInfoDoctor: (data) => dispatch(actions.saveInfoDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
