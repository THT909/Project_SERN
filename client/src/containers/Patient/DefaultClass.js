import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {FormattedMessage} from 'react-intl'
class DefaulClass extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {}
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    render() {
        return <div></div>;
    }
}
const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};
const mapDispathToProps = (dispatch) => {
    return {};
};
export default connect(mapStateToProps, mapDispathToProps)(DefaulClass);
