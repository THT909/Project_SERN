import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
        this.listenToEmitter()
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        })
    };
    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromUser();
    }

    handleOnChangeInput = (event, id) => {
        // console.log(event.target.value, id)
        //bad code
        // this.state[id] = event.target.value;
        // this.setState({
        //     ...this.state
        // }, () => {
        //     console.log('check bad state:', this.state)
        // })
        //good code
        let coppyState = { ...this.state };
        coppyState[id] = event.target.value
        this.setState({
            ...coppyState
        }
            // , () => {

            //     console.log('check state: ', this.state)
            // }
        )


    }
    checkValidateInput = () => {
        let isValidate = true;
        let arrInput = ["email", "password", "firstName", "lastName", "address"];
        for (let i = 0; i < arrInput.length; i++) {
            console.log('check loop ', this.state[arrInput[i]], arrInput[i])
            if (!this.state[arrInput[i]]) {
                isValidate = false;
                alert('missing paremeter: ', arrInput[i])
                break
            }

        }
        return isValidate;
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === true) {
            //call Api
            this.props.createNewUser(this.state)
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
                <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className="modal-body">
                        <div className="input-container">
                            <label htmlFor="">Email</label>
                            <input
                                type="email"
                                onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                                value={this.state.email}
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="">Password</label>
                            <input
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
                        onClick={() => { this.handleAddNewUser() }}
                    >
                        Submit
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);









