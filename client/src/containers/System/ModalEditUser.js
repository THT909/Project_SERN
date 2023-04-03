import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import { emitter } from '../../utils/emitter'
import _ from 'lodash'
class ModalUserEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }
    componentDidMount() {
        let user = this.props.currentUser
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: "hardcode",
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            })
            console.log('didmount check', user)
        }
    }

    toggle = () => {
        this.props.toggleFromUser();
    }

    handleOnChangeInput = (event, id) => {

        //good code
        let coppyState = { ...this.state };
        coppyState[id] = event.target.value
        this.setState({
            ...coppyState
        }
        )


    }
    checkValidateInput = () => {
        let isValidate = true;
        let arrInput = ["email", "password", "firstName", "lastName", "address"];
        for (let i = 0; i < arrInput.length; i++) {
            // console.log('check loop ', this.state[arrInput[i]], arrInput[i])
            if (!this.state[arrInput[i]]) {
                isValidate = false;
                alert('missing paremeter: ', arrInput[i])
                break
            }

        }
        return isValidate;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === true) {
            //call Api
            this.props.editUser(this.state)
        }
        // console.log('data modal', this.state)
    }

    render() {
        // console.log('check child props', this.props)
        // console.log('check child open modl', this.props.isOpen)
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-form'}
                size="lg"
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit a user</ModalHeader>
                <ModalBody>
                    <div className="modal-body">
                        <div className="input-container">
                            <label htmlFor="">Email</label>
                            <input
                                disabled
                                type="email"
                                onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                                value={this.state.email}
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="">Password</label>
                            <input
                                disabled
                                type="Password"
                                onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                                value={this.state.password}
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="">First name</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="">Last name</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="">Address</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, 'address') }}
                                value={this.state.address}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className='px-3 '
                        onClick={() => { this.handleSaveUser() }}
                    >
                        Save&Change
                    </Button>{' '}
                    <Button
                        color="secondary"
                        className='px-3 '
                        onClick={() => { this.toggle() }}
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>

        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUserEditUser);









