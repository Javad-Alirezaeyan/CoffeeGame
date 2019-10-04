import React from 'react';
import {InfoSection, Card, CardBody, CardTitle, Table, Label, LabelValue} from "./style";
import {formattedSeconds} from "./../lib/utility";


/**
 * In this application, we save the result of each games in the local store, so the users can see a history of their games,
 * this component shows the information of the old games with retrieving of the local storage, high score, and the count of plays
 */
export default class Gameinfo extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            gameHistory : []
        }
        this.retrieveGames =  this.retrieveGames.bind(this);
        this.getHighScore =  this.getHighScore.bind(this);
        this.getLastGameDate =  this.getLastGameDate.bind(this);
    }


    retrieveGames(){
        let gameHistory =  JSON.parse(window.localStorage.getItem("gameHistory"));
        if (!gameHistory){
            gameHistory = [];
        }
        this.state.gameHistory = gameHistory;
    }
    getLastGameDate(){
        if (this.state.gameHistory.length > 0){
            let  lastGame = this.state.gameHistory[this.state.gameHistory.length -1];
            return lastGame.date;
        }
        return "";
    }
    getHighScore(){
        let highScore =  window.localStorage.getItem("highScore");
        if (!highScore){
            highScore = 0 ;
        }
        return formattedSeconds(highScore)
    }

    componentDidMount() {
        this.retrieveGames();
        this.setState({
        })
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
       // console.log("next:", nextProps);
        this.retrieveGames();
        return true;
    }

    render(){
        let gameHistory =  this.state.gameHistory;
        gameHistory.reverse();
        const allGames = this.state.gameHistory.length;
        const highScore = this.getHighScore();
        const lastGameDate = this.getLastGameDate();
        let i =1;
        const list = gameHistory.map((game)=>
            <tr key={i}>
                <td>{i++}</td>
                <td>{game.date}</td>
                <td>{formattedSeconds(game.timeScore)}</td>
                <td>{game.cupCount}</td>
            </tr>
        );

        return (
            <InfoSection >
                <Card >
                    <CardBody >
                        <div>
                            <Label>All game:</Label>
                            <LabelValue > {allGames}</LabelValue>
                        </div>
                        <div>
                            <Label>High Score:</Label>
                            <LabelValue color={"blue"} > {highScore}</LabelValue>
                        </div>
                        <div>
                            <Label>last game:</Label>
                            <LabelValue > {lastGameDate}</LabelValue>
                        </div>

                        <hr/>
                        <table>
                            <caption>Game History</caption>
                            <thead>
                            <tr>
                                <th>Number</th>
                                <th>Date</th>
                                <th>TimeScore</th>
                                <th>Cup count</th>
                            </tr>
                            </thead>
                            <tbody>
                            {list}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </InfoSection>
        );
    }
}

