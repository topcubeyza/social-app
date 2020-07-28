import React, { Component } from 'react';

import AlertOverlay from "../../Components/AlertOverlay"


const initialState = {
    isOpen: false,
    title: '',
    message: '',
    buttons: [],
    onBackdropPress: () => {},
    cancellable: true
};

export const alertContext = React.createContext(initialState);
const { Provider } = alertContext;

class AlertProvider extends Component {

    constructor(props) {
        super(props)

        this.state = initialState
    }

    alert = ({title, message, buttons, onBackdropPress, cancellable}) => {
        this.setState({
            isOpen: true,
            title,
            message,
            buttons,
            onBackdropPress,
            cancellable
        })
    };

    close = () => {
        this.setState(initialState)
    }

    render() {
        return (
            <>
                <Provider value={{show:this.alert, close:this.close}}>{this.props.children}</Provider>
                <AlertOverlay {...this.state} close={this.close} />
            </>
        );
    }
}

export default AlertProvider;