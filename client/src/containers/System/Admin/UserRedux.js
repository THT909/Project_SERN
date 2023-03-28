import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from "../../../utils"
import * as actions from "../../../store/actions"
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: []
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
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux
            })
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
                                    <input className='form-control' type="mail" name="" />
                                </div>
                                <div className="col-6">
                                    <label htmlFor=""><FormattedMessage id='manage-user.password' /></label>
                                    <input className='form-control' type="password" name="" />
                                </div>
                            </div>
                            <div className="col-12 row mb-3">

                                <div className="col-6">
                                    <label htmlFor=""> <FormattedMessage id='manage-user.first-name' /></label>
                                    <input className='form-control' type="text" name="" />
                                </div>
                                <div className="col-6">
                                    <label htmlFor=""> <FormattedMessage id='manage-user.last-name' /></label>
                                    <input className='form-control' type="text" name="" />
                                </div>
                            </div>
                            <div className="col-12 row mb-3">

                                <div className="col-9">
                                    <label htmlFor=""><FormattedMessage id='manage-user.phone-number' /></label>
                                    <input className='form-control' type="text" name="" />
                                </div>
                                <div className="col-3">
                                    <label htmlFor=""> <FormattedMessage id='manage-user.address' /></label>
                                    <input className='form-control' type="text" name="" />
                                </div>
                            </div>
                            <div className="col-12 row mb-3">

                                <div className="col-3">
                                    <label htmlFor=""><FormattedMessage id='manage-user.gender' /></label>
                                    <select id="inputState" className="form-select">
                                        {genders && genders.length > 0 &&
                                            genders.map((item, index) => {
                                                return (
                                                    <option key={index}>{
                                                        language === LANGUAGES.VI ? item.valueVi : item.valueEn
                                                    }</option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label htmlFor=""><FormattedMessage id='manage-user.position' /></label>
                                    <select id="inputState" className="form-select">
                                        {positions && positions.length > 0 &&
                                            positions.map((item, index) => {
                                                return (
                                                    <option key={index}>{
                                                        language === LANGUAGES.VI ? item.valueVi : item.valueEn
                                                    }</option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label htmlFor=""><FormattedMessage id='manage-user.role' /></label>
                                    <select id="inputState" className="form-select">
                                        {roles && roles.length > 0 &&
                                            roles.map((item, index) => {
                                                return (
                                                    <option key={index}>{
                                                        language === LANGUAGES.VI ? item.valueVi : item.valueEn
                                                    }</option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label htmlFor=""><FormattedMessage id='manage-user.img' /></label>
                                    <div className="">

                                        <input className='form-control' id='previewImg' type="file" name="" />
                                        <label htmlFor="previewImg">Tải ảnh</label>
                                        <div className="priview-image"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <button className="btn btn-primary"><FormattedMessage id='manage-user.submit' /></button>
                            </div>
                        </div>
                    </div>
                </div>

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
    };
};

const mapDispatchToProps = dispatch => {
    return {

        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart())
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
