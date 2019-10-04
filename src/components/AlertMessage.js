import React , { Component } from "react";
import {Alert} from "./style";


/*const theme ={
    color: #155724,
    background-color: #d4edda,
    border-color: #c3e6cb
}*/

/**
 * this class is responsible to show message
 */
export default class AleretMessage extends Component{

    constructor(props){
        super(props);

        this.state ={
            message: this.props.message
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

        //check if the message has changed, the new value is set in the state
        if (this.props.message != nextProps.message){
            this.state ={
                message: nextProps.message
            }
            return true;
        }
        return false;
    }

    render() {

        const message = this.state.message;
        return(
            <Alert>{message}</Alert>
        );
    }

}