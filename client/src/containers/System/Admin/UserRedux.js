import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from "../../../utils"
import * as actions from "../../../store/actions"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import TableManageUser from './TableManageUser';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,
            //this state take data on from
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

        }
    }
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        //***this code call live api  */
        // try {
        //     let res = await getAllCodeService('gender')
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        //     console.log('res gender', res)
        // } catch (e) {
        //     console.log(e)
        // }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGender = this.props.genderRedux
            this.setState({
                genderArr: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].key : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].key : ''
            })
        }
        if (prevProps.listUsersRedux !== this.props.listUsersRedux) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',
            })
        }
    }
    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl,
                avatar: file
            })
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return
        this.setState({
            isOpen: true
        })
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) return
        //fire action redux
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            gender: this.state.gender,
            role: this.state.role,
            position: this.state.position,
            // avatar: this.state.avatar
        })
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['email', 'password', 'firstName',
            'lastName', 'phoneNumber', 'address']
        if (this.validteEmail() === false) {
            isValid = false
            alert("Địa chỉ email không hợp lệ")
        } else {

            for (let i = 0; i < arrCheck.length; i++) {
                if (!this.state[arrCheck[i]]) {
                    isValid = false;
                    alert('This input is required: ' + arrCheck[i])
                    break;
                }

            }
        }
        return (isValid)
    }
    validteEmail = () => {
        // Define a regular expression pattern to match email addresses
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Check if the email matches the pattern
        if (pattern.test(this.state.email)) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        // console.log('check state', this.state)
        let genders = this.state.genderArr
        let positions = this.state.positionArr
        let roles = this.state.roleArr
        let language = this.props.language
        let isLoadingGender = this.props.isLoadingGender
        // console.log('check redux component gender:', this.state.genderArr)
        // console.log('check redux component role:', this.state.roleArr)
        // console.log('check redux component positon:', this.state.positionArr)
        let { email, password, firstName,
            lastName, phoneNumber, address,
            // gender, position, role, avatar 
        } = this.state
        return (
            <div className="user-redux-container">
                <div className="title">
                    <div className="text-center" >User redux</div>
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">{isLoadingGender === true ? 'Loading gender' : ''}</div>
                            <div className="col-12 my-3"><FormattedMessage id='manage-user.add' /></div>
                            <div className="col-12 row mb-3">

                                <div className="col-6">
                                    <label htmlFor=""><FormattedMessage id='manage-user.email' /></label>
                                    <input
                                        autoComplete='off'
                                        className='form-control'
                                        type="email"
                                        value={email}
                                        onChange={(event) => { this.onChangeInput(event, 'email') }} />
                                </div>
                                <div className="col-6">
                                    <label htmlFor=""><FormattedMessage id='manage-user.password' /></label>
                                    <input
                                        className='form-control'
                                        type="password"
                                        value={password}
                                        onChange={(event) => { this.onChangeInput(event, 'password') }} />
                                </div>
                            </div>
                            <div className="col-12 row mb-3">

                                <div className="col-6">
                                    <label htmlFor=""> <FormattedMessage id='manage-user.first-name' /></label>
                                    <input
                                        className='form-control'
                                        type="text"
                                        value={firstName}
                                        onChange={(event) => { this.onChangeInput(event, 'firstName') }} />
                                </div>
                                <div className="col-6">
                                    <label htmlFor=""> <FormattedMessage id='manage-user.last-name' /></label>
                                    <input
                                        className='form-control'
                                        type="text"
                                        value={lastName}
                                        onChange={(event) => { this.onChangeInput(event, 'lastName') }} />
                                </div>
                            </div>
                            <div className="col-12 row mb-3">

                                <div className="col-9">
                                    <label htmlFor=""><FormattedMessage id='manage-user.phone-number' /></label>
                                    <input
                                        className='form-control'
                                        type="text"
                                        value={phoneNumber}
                                        onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }} />
                                </div>
                                <div className="col-3">
                                    <label htmlFor=""> <FormattedMessage id='manage-user.address' /></label>
                                    <input
                                        className='form-control'
                                        type="text"
                                        value={address}
                                        onChange={(event) => { this.onChangeInput(event, 'address') }} />
                                </div>
                            </div>
                            <div className="col-12 row mb-3">

                                <div className="col-3">
                                    <label htmlFor=""><FormattedMessage id='manage-user.gender' /></label>
                                    <select
                                        id="inputState"
                                        className="form-select"
                                        onChange={(event) => { this.onChangeInput(event, 'gender') }}>
                                        {genders && genders.length > 0 &&
                                            genders.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.key}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label htmlFor=""><FormattedMessage id='manage-user.position' /></label>
                                    <select
                                        id="inputState"
                                        className="form-select"
                                        onChange={(event) => { this.onChangeInput(event, 'position') }}>
                                        {positions && positions.length > 0 &&
                                            positions.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.key}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label htmlFor=""><FormattedMessage id='manage-user.role' /></label>
                                    <select
                                        id="inputState"
                                        className="form-select"
                                        onChange={(event) => { this.onChangeInput(event, 'role') }}>
                                        {roles && roles.length > 0 &&
                                            roles.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.key}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className="col-3 mb-5">
                                    <label htmlFor=""><FormattedMessage id='manage-user.img' /></label>
                                    <div className="">

                                        <input
                                            className='form-control'
                                            id='previewImg'
                                            type="file"
                                            accept=".jpg,.png "
                                            onChange={(event) => this.handleOnChangeImage(event)}
                                        />
                                        {/* <label htmlFor="previewImg">Tải ảnh</label> */}
                                        <div className='w-100 mt-3'
                                            style={{
                                                "height": "50px",
                                                "backgroundImage": `url(${this.state.previewImgURL})`,
                                                "backgroundRepeat": "no-repeat",
                                                "backgroundSize": "contain",
                                                "backgroundPosition": "center",
                                                "cursor": "pointer",
                                                "borderWidth": "1px",
                                                "borderStyle": "solid",
                                                "borderColor": "#ddd",


                                            }}
                                            onClick={() => this.openPreviewImage()}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 my-3">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => this.handleSaveUser()}
                                ><FormattedMessage id='manage-user.submit' />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 container">
                        <TableManageUser />
                    </div>
                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        listUsersRedux: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {

        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart())
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
