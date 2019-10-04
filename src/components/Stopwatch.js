import React , { Component } from "react";
import {Wrapperstopwatch} from "./style";
import {formattedSeconds} from "./../lib/utility";


/**
 * this method is responsible to show stop watcher,
 * here, a counter is set that is add 1 unit to that each 10 ms
 */
export default class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secondsElapsed: this.props.defaultTime,
            laps: [],
            lastClearedIncrementer: null,
            startWatch : this.props.startWatch
        };
        this.incrementer = null;
    }

    /**
     * this function start the counter
     */
    handleStart() {
        this.incrementer = setInterval( () =>{
            this.setState({
                secondsElapsed: this.state.secondsElapsed + 1
            })
            // call a parent function to check if a user has achieved  a new high score or not
            this.props.handleCompareHighScore(this.state.secondsElapsed);
        }, 10);
    }

    /**
     * this function stops the timewatcher, this method typically calls when user clicks on the pause button
     */
    handleStop() {
        clearInterval(this.incrementer);
        this.setState({
            lastClearedIncrementer: this.incrementer
        });
    }


    handleReset() {
        clearInterval(this.incrementer);
        this.setState({
            secondsElapsed: 0,
            laps: []
        });
    }

    /**
     * returning the counter
     */
    getTimer() {
        return this.state.secondsElapsed
    }


    componentDidMount() {
        if (this.state.startWatch){
            this.handleStart();
        }
        this.props.onRef(this)
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
    }
    render() {
        return (
            <Wrapperstopwatch >
                <h1 >{formattedSeconds(this.state.secondsElapsed)}</h1>
            </Wrapperstopwatch>
        );
    }
}