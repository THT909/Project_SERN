import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers } from '../../services/userService';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: []
        }
    }

    async componentDidMount() {
        let respone = await getAllUsers('ALL');
        if (respone && respone.errCode === 0) {
            this.setState({
                arrUsers: respone.users
            })
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
        console.log('check render', this.state)
        let arrUsers = this.state.arrUsers
        return (
            <div className="users-container">
                <div className="title text-center">
                    Manager users with me
                </div>
                <div className="users-table mt-4 mx-1">
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>Frst name</th>
                            <th>Last name</th>
                            <th>Adress</th>
                            <th>Action</th>
                        </tr>


                        {arrUsers && arrUsers.map((item, index) => {
                            return (
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <div className="bnt">
                                            <button>Edit</button>
                                            <button>Delete</button>
                                        </div>
                                    </td>
                                </tr>

                            )
                        })}
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
