import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
} from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter'
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
        }
    }

    async componentDidMount() {
        await this.getAlluserFromReact()
        // console.log('mouting  modale')
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }
    getAlluserFromReact = async () => {
        let respone = await getAllUsers('ALL');
        if (respone && respone.errCode === 0) {
            this.setState({
                arrUsers: respone.users,
                isOpenModalUser: false,
                isOpenModalEditUser: false,

            })
        }
    }
    createNewUser = async (data) => {
        try {
            let respone = await createNewUserService(data)
            if (respone && respone.errCode !== 0) {
                alert(respone.errMessage)
            }
            else {
                await this.getAlluserFromReact()
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' })
                // alert(respone.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
        // console.log('check data from child', data)
    }

    handleDeleteUser = async (user) => {
        // console.log('check data user delete ', user)

        try {
            let res = await deleteUserService(user.id)
            if (res && res.errCode === 0) {
                await this.getAlluserFromReact()
            }
        } catch (e) {
            console.log(e)
        }
    }


    handleEditUser = async (user) => {
        try {
            // console.log('check edit id user', user)
            this.setState({
                isOpenModalEditUser: true,
                userEdit: user
            })
        } catch (e) {
            console.log(e)
        }
    }
    doEditUser = async (user) => {

        try {
            let res = await editUserService(user)
            if (res && res.errCode === 0) {
                await this.getAlluserFromReact()
            }
        } catch (e) {
            console.log(e)
        }
    }
    /** life cycle
     *  Run component:
     * 1. Run construct -> init state
     * 2. Did mount( set state)( this part call api)
     * 3. Render
     * 
     * 
     */
    render() {
        // console.log('check render', this.state)
        let arrUsers = this.state.arrUsers
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromUser={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromUser={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    // createNewUser={this.createNewUser}

                    />
                }
                <div className="title text-center">
                    Manager users with me
                </div>
                <div className="mx-1">
                    <button className="btn-add px-3"
                        onClick={() => this.handleAddNewUser()}
                    ><i className='fas fa-plus'></i>
                        Add New Users
                    </button>
                </div>
                <div className="users-table mt-4 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Frst name</th>
                                <th>Last name</th>
                                <th>Adress</th>
                                <th>Action</th>
                            </tr>
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <div className="bnt">
                                                <button
                                                    onClick={() => this.handleEditUser(item)}
                                                >
                                                    Edit

                                                </button>
                                                <button
                                                    className="btn-red"
                                                    onClick={() => this.handleDeleteUser(item)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
