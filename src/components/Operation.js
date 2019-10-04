import React from 'react';
import {Button, Wrapperoperation} from "./style";
import {ThemeProvider} from 'styled-components';
import * as  Constant from './../lib/constants';


/**
 * this component manages the buttons that show or hide them based the state of the game
 */
export default class Operation extends React.Component{
    constructor(props){
        super(props);
        this.state ={
           /*each index of this variable (buttonShow) is related to the constant variables in the constant file(./src/lib/constants.js
           0: START, 1: SETTING, 2: PAUSE, 3: RESUME, 4: RETRY*/
            buttonShow: [false, false, false, false, false, false],
            gameState: this.props.gameState
        }

        this.showSetting =  this.showSetting.bind(this);
        this.start =  this.start.bind(this);
        this.pause =  this.pause.bind(this);
        this.resume =  this.resume.bind(this);
        this.retry =  this.retry.bind(this);
    }


    showSetting= ()=>{
        this.props.handleSetting();
    }

    start= ()=>{
        this.props.handleStart();
    }
    pause= ()=>{
        this.props.handlePause()
    }
    resume= ()=>{
        this.props.handleResume()
    }
    retry= ()=>{
        this.props.handleRetry()
    }

    /**
     * this function the state of each button(show or hidden) based on the state of the game
     */
    refreshShowButton(){

        let temp =[];
        switch (this.state.gameState) {
            case  Constant.START:
            case Constant.RETRY:
            case Constant.RESUME:
                temp = [false, false, true, false, true, false];
                break;
            case Constant.END_GAME:
                temp = [false, true, false, false, true, false];
                break;
            case Constant.PAUSE:
                temp = [false, true, false, true, true, false];
                break;
            case Constant.END_GAME:
                temp = [false, true, false, false, true, false];
                break;
            case Constant.SETTING:
            default:
                temp = [true, false, false, false, false, false];
        }

        this.state.buttonShow = temp;
       /* this.setState({
            buttonShow: temp
        })*/

    }

    componentDidMount() {
        this.refreshShowButton();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        this.state.gameState = nextProps.gameState;
        //console.log("Game state shouldComponentUpdate: ",this.state.gameState);
        return true;
    }




    render() {
        this.refreshShowButton();
        const buttonShowState = this.state.buttonShow;
        return(
            <ThemeProvider theme={{}}>
                <Wrapperoperation>
                    {buttonShowState[Constant.SETTING] ? (<Button  onClick={()=>this.showSetting()} theme={{ main: "royalblue" }}>Setting</Button>) : ""}
                    {buttonShowState[Constant.START] ? (<Button onClick={()=>this.start()} theme={{ main: "mediumseagreen" }}>Start</Button>) : ""}
                    {buttonShowState[Constant.PAUSE] ? (<Button onClick={()=>this.pause()} theme={{ main: "darkorange" }}>Pause</Button>) : ""}
                    {buttonShowState[Constant.RESUME] ? (<Button onClick={()=>this.resume()} theme={{ main: "darkorange" }}>Resume</Button>) : ""}
                    {buttonShowState[Constant.RETRY] ? (<Button onClick={()=>this.retry()} theme={{ main: "darkorange" }}>Retry</Button>) : ""}
                </Wrapperoperation>
            </ThemeProvider>

        );
    }
}