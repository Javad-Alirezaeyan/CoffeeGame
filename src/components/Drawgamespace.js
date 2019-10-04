import React , { Component } from "react";
import Cup from "./Cup";
import {Header} from "./style";


/**
 * this component  draw the space of the game
 */

export default  class Drawgamespace extends Component{
    constructor(props){
        super(props);

        this.state ={
            cupsList : this.props.cupsList //
        }
        this.changeCupValue = this.changeCupValue.bind(this);
        this.handleGameIsActive = this.handleGameIsActive.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        this.state.cupsList = nextProps.cupsList;
        return true;
    }

    /**
     * this function calls a method from the parent (Game) to set new value of the cup
     */
    changeCupValue(cup){
        this.props.handleChangeCupValue(cup);
    }

    /**
     * this function calls a method from the parent (Game) to check if the game is active or not
     */
    handleGameIsActive(){
        return this.props.handleGameIsActive();
    }

    render(){
        const cupsList = this.state.cupsList;

        const listImage = cupsList.map((cup) =>
            <Cup key={cup.id} handleChangeCupValue={this.changeCupValue} handleGameIsActive={this.handleGameIsActive}  info={cup} />
        );

        return (
            <Header  theme={{bg: "ghostwhite"}}>
                <div>
                    {listImage}
                    <div style={{both: "clear"}}></div>

                </div>
            </Header>

        );

    }

}