import React, {Component} from "react";
import Gameconfig from "./Gameconfig";
import Drawgamespace from "./Drawgamespace";
import Stopwatch from "./Stopwatch";
import AleretMessage from "./AlertMessage";
import Operation from "./Operation";
import * as  Constant from './../lib/constants';
import {getCurrentDate} from "./../lib/utility";
import {GameSection, Card, CardTitle, CardBody} from "./style";


/**
 * this component is the main class to manage game, In fact all other components that are related to the game are
 * rendered by this component, including a component to start game, a component for operation, etc
 * Game have 5 different states, you can see them in ./lib/constants.js as constants variables.
 * the value of the cups is  added over the time
 */
export default class Game extends Component {
    constructor(props) {
        super(props);
        this.cupCount = 1;// a default value for the count of cups
        this.interval = null; //
        this.fillCupNumber = Constant.Max_CUP_VALUE;// for checking if the volume of a cup is full or not
        this.state = {
            cupValues: [],
            setting: true,
            isActive: false,
            gameState: Constant.SETTING,
            defaultStopWatch: 0,
            startWatch: true,
            showMessage: false,
            message: "",
            highScore: 0
        }
        this.startGame = this.startGame.bind(this);
        this.setCountOfCup = this.setCountOfCup.bind(this);
        this.checkState = this.checkState.bind(this);
        this.setTimer = this.setTimer.bind(this);
        this.changeCupValue = this.changeCupValue.bind(this);
        this.showSetting = this.showSetting.bind(this);
        this.pauseGame = this.pauseGame.bind(this);
        this.resumeGame = this.resumeGame.bind(this);
        this.retryGame = this.retryGame.bind(this);
        this.gameIsActive = this.gameIsActive.bind(this);
        this.savePauseGame = this.savePauseGame.bind(this);
        this.retrieveOldGame = this.retrieveOldGame.bind(this);
        this.retrieveOldGame = this.retrieveOldGame.bind(this);
        this.getGameState = this.getGameState.bind(this);
        this.setGameState = this.setGameState.bind(this);
        this.saveEndedGame = this.saveEndedGame.bind(this);
        this.saveHighScore = this.saveHighScore.bind(this);
        this.compareHighScore = this.compareHighScore.bind(this);
    }

    /**
     * when user clicks on the setting  button, the game is stopped, and the view is changed as well
     */
    showSetting() {
        this.stopGame();

        // set some variable to default values
        this.setState({
            setting: true,
            isActive: false,
            message: "",
            showMessage: false
        })
        this.setGameState(Constant.SETTING);

    }


    /**
     * @param count   the count of cups
     * this function is sets the count of cups
     */
    setCountOfCup(count) {
        this.cupCount = count;
    }

    /**
     * check if the game is active or not
     */
    gameIsActive() {
        return this.state.isActive;
    }

    /**
     * this function return the state of the game
     * return boolean
     */
    getGameState() {
        return this.state.gameState;
    }

    /**
     * set the new state of the game
     */
    setGameState(state) {
        this.setState({
            gameState: state,
        })

    }

    /**
     * when this function is called, the game is started,
     * here the value of cups is set to default values
     */
    startGame = () => {
        let tempValue = [];

        for (let i = 0; i < this.cupCount; i++) {
            tempValue[i] = {
                volume: 0,
                id: i,
                isFull: false
            };
        }

        this.setState({
            cupValues: tempValue,
            setting: false,
            isActive: true
        });

        //calling stopwatch to start time
        this.setTimer();
        this.setGameState(Constant.START);
        this.setState({
            message: "",
            showMessage: false
        })
    }

    /**
     * if user clicks on the pause button, this functions is called, and the game is stopped
     * the game is saved in the cache API, so if the user reload the application later, they can reload the game
     */
    pauseGame() {

        clearInterval(this.interval);
        this.stopwatch.handleStop();
        this.state.isActive = false;

        this.savePauseGame();
        this.setGameState(Constant.PAUSE);
        this.saveHighScore();
    }

    /**
     * this method is called when user clicks on the resume button
     */
    resumeGame() {
        this.setTimer();
        this.stopwatch.handleStart();
        this.state.isActive = true;
        this.removeOldGame();
        this.setGameState(Constant.RESUME);
    }

    /**
     * this method create a new game
     */
    retryGame() {
        // remove current timer
        clearInterval(this.interval);
        //stop current timer
        this.stopwatch.handleReset();

        this.startGame();
        this.stopwatch.handleStart();
        this.setGameState(Constant.RETRY);
        this.setState({
            message: "",
            showMessage: false
        })
    }

    /**
     * this method stops the game. This method is typically called, when the game is over
     */
    stopGame() {
        clearInterval(this.interval);
        this.stopwatch.handleStop()
        this.state.isActive = false;
    }

    checkState() {
        for (let i = 0; i < this.state.cupValues; i++) {
            let cupinfo = this.state.cupValues[i];
            if (cupinfo.isFull) {
                console.log("clear interval");
                clearInterval(this.interval);
                this.setGameState(Constant.END_GAME);
            }
        }
    }


    /**
     * set a new value for a cup
     */
    changeCupValue(cup) {
        this.state.cupValues[cup.id] = cup;
    }


    /**
     * this method add values to the cups randomly
     */
    setTimer() {
        this.interval = setInterval(() => {
            const cupCount = this.cupCount;
            let count = (cupCount/2) + Math.floor(Math.random() * (cupCount - (cupCount/2)));
            let cupValues = this.state.cupValues;

            for (let i = 0; i <= count; i++) {
                let number = Math.floor(Math.random() * this.cupCount);

                // /  console.log(cupValues[number]);
                (cupValues[number]).volume = (cupValues[number]).volume + 1;

                if ((cupValues[number]).volume == this.fillCupNumber) {
                    (cupValues[number]).isFull = true;
                    this.stopGame();
                    this.setGameState(Constant.END_GAME);
                    this.saveEndedGame();
                    break;
                }
            }
            this.setState({
                cupValues: cupValues,
            })
            //  console.log(this.state.cupValues);

        }, 1500);

    }


    /**
     * save game in the local storage, each game that is ended  stores in the storage
     */
    saveEndedGame() {

        const timeScore = this.stopwatch.getTimer();
        let gameHistory = JSON.parse(window.localStorage.getItem("gameHistory"));
        if (!gameHistory) {
            gameHistory = [];
        }

        gameHistory.push({
            "cupValues": this.state.cupValues,
            'timeScore': timeScore,
            "cupCount": this.cupCount,
            "date": getCurrentDate()
        });

        this.setState({
            message: Constant.GameOverMessage,
            showMessage : true
        })

        window.localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
        this.saveHighScore();
    }

    /**
     * compare current timer with high score, if timer is bigger than high score, it sets the message variable to show a alert message
     */
    compareHighScore(timeScore) {
        if (this.state.highScore == 0)
            return;
        if (timeScore > this.state.highScore) {
            this.setState({
                message: Constant.MessageBeatHighScore,
                showMessage: true
            })

        }
    }

    /**
     * when the game is ended or paused, this method is run to compare current time with the high score in the local storage
     * if the timer is bigger than current high score, new values is set in the storage
     */
    saveHighScore() {
        const timeScore = this.stopwatch.getTimer();
        let highScore = window.localStorage.getItem("highScore");
        if (!highScore) {
            highScore = timeScore;
        }
        if (highScore <= timeScore) {
            window.localStorage.setItem("highScore", timeScore);
            this.setState({
                highScore: timeScore
            })
        }
    }

    /**
     * when user clicks on the pause button, the game is saved in the storage
     * later if the user loaded the application, the saved game is reloaded
     */
    savePauseGame() {
        window.localStorage.setItem("oldGame", JSON.stringify(this.state.cupValues));
        window.localStorage.setItem("cupCount", this.cupCount);
        window.localStorage.setItem("time", this.stopwatch.getTimer());

    }

    /**
     * when a games is retrieved from the storage one times, it is removed
     */
    removeOldGame() {
        window.localStorage.removeItem("oldGame");
        window.localStorage.removeItem("cupCount");
        window.localStorage.removeItem("time");
    }


    retrieveOldGame() {
        let oldGame = JSON.parse(window.localStorage.getItem("oldGame"));
        if (oldGame) {
            this.state.cupValues = oldGame;
            this.state.setting = false;
            this.state.defaultStopWatch = parseInt(window.localStorage.getItem("time"));
            this.state.startWatch = false;
            this.cupCount = window.localStorage.getItem("cupCount");
            this.removeOldGame();

            return true;
        }
        return false;
    }

    componentWillMount() {

        //check if there is old high score in the storage or not
        let highScore = window.localStorage.getItem("highScore");
        if (highScore) {
            this.state.highScore = parseInt(highScore);
        }

        if (this.retrieveOldGame()) {
            // if there is a old game in the storage, the variables are set to show the cups and information
            this.state.setting = false;
            this.state.message = Constant.RecoveryOldMessage;
            this.state.showMessage = true;
            this.setGameState(Constant.PAUSE);
        }
    }


    render() {

        const setting = this.state.setting;
        // if there are any message to show, AleretMessage is set to show it
        const message = this.state.showMessage ? <AleretMessage type={"Success"} message={this.state.message} show={false}/> : "";

        return (

            <GameSection>
                <Card>
                    <CardBody className="card-body">
                        <CardTitle >Game space</CardTitle>
                        <hr/>
                        <div>
                            {message}
                            {/* here is checked to show the setting view or the space of the game */}
                            {setting ? (
                                <div>
                                    <Gameconfig cupCount={this.cupCount} handleChnageCupCount={this.setCountOfCup}
                                                handleStart={this.startGame}/>
                                </div>

                            ) : (
                                <div>
                                    <Stopwatch
                                        startWatch={this.state.startWatch}
                                        defaultTime={this.state.defaultStopWatch}
                                        onRef={ref => (this.stopwatch = ref)}
                                        handleCompareHighScore={this.compareHighScore}

                                    />
                                    <Drawgamespace
                                        handleChangeCupValue={this.changeCupValue}
                                        cupsList={this.state.cupValues}
                                        handleGameIsActive={this.gameIsActive}
                                    />

                                </div>

                            )}
                            {/* show buttons, */}
                            <Operation handleSetting={this.showSetting}
                                       handleStart={this.startGame}
                                       handleStop={this.stopGame}
                                       handleResume={this.resumeGame}
                                       handlePause={this.pauseGame}
                                       handleRetry={this.retryGame}
                                       handeGetGameState={this.getGameState}
                                       gameState={this.state.gameState}
                            />
                        </div>
                    </CardBody>
                </Card>

            </GameSection>

        );

    }

}
