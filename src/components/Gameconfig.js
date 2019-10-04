import React , { Component } from "react";
import {Header, Countbutton, Labelnumber, Labeltitle} from "./style";
import * as  Constant from './../lib/constants';


/**
 * this class show the view to configure game such as the count of the cups. the count of cups  must be a number between
 * 1 and 8. But you can change them in the  constant file
 *
 */
export default  class Gameconfig extends Component{


    constructor(props){
        super(props);

        this.maxCup = Constant.MAX_CUPS;
        this.minCup = Constant.MIN_CUPS;

        this.state ={
            cupCount : this.props.cupCount
        }

        this.decrement = this.decrement.bind(this);
        this.increment = this.increment.bind(this);

    }

    /**
     * incrementing the cups
     */
    increment(){
        //check the range of the cups
        if (this.state.cupCount == this.maxCup){
            this.showWarning();
            return;
        }
        this.setState((state, props) => ({
            cupCount: state.cupCount + 1
        }));
    }

    /**
     *decrementing the cups
     */
    decrement(){
        //check the range of the cups
        if (this.state.cupCount == this.minCup){
            this.showWarning();
            return;
        }
        this.setState((state, props) => ({
            cupCount: state.cupCount - 1
        }));

    }

    showWarning(){
        alert(Constant.WarningRangeCups);
    }


    render(){
        this.props.handleChnageCupCount(this.state.cupCount);
        return(
                <Header theme={{bg: "black"}}>
                    <Labeltitle>The count of cups:</Labeltitle>
                    <Labelnumber> {this.state.cupCount} </Labelnumber>
                    <Countbutton onClick={()=>this.increment()} >Increment</Countbutton>
                    <Countbutton  onClick={()=>this.decrement()} >Decrement</Countbutton>

                </Header>

            );

    }

}

/*

 "build": "cross-env NODE_ENV=production parcel build src/index.html --no-minify",
    "start": "cross-env NODE_ENV=development parcel src/index.html",
 */