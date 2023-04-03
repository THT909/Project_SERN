import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions"
class TableManagerUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userDataRedux: [],
        }
    }
    componentDidMount() {
        this.props.fetchUserRedux()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsersRedux !== this.props.listUsersRedux) {
            this.setState({
                userDataRedux: this.props.listUsersRedux
            })
        }
    }
    hanldeDeleteUser = (id) => {
        this.props.deletaUserRedux(id)
        console.log('check ib table', id)
    }
    render() {
        console.log('check list user', this.props.listUsersRedux)
        console.log('check redux fire : ', this.state.userDataRedux)
        let arrUser = this.state.userDataRedux
        return (
            <table id="Table">
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>Frst name</th>
                        <th>Last name</th>
                        <th>Adress</th>
                        <th>Action</th>
                    </tr>
                    {arrUser && arrUser.length > 0 &&
                        arrUser.map((item, index) => {
                            return (
                                <tr key={index} >
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <div className="bnt">
                                            <button>Edit</button>
                                            <button
                                                onClick={() => this.hanldeDeleteUser(item.id)}
                                            >Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsersRedux: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deletaUserRedux: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerUser);
