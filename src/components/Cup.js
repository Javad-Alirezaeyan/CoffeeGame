import React , { Component } from "react";
import  { Wrappercups, Imagecups } from "./style";
import * as  Constant from './../lib/constants';


/**
 * this component has designed to show cups and their operations
 */
export default  class Cup extends Component{
    constructor(props){
        super(props);

        this.cupVolumeImage ={
            0 : "cup_empty.png",
            1 : "cup_fill_1.png",
            2 : "cup_fill_2.png",
            3 : "cup_fill_3.png",
            4 : "cup_full.png",
            5 : "cup_too_full.png",
        }

        this.state = {
            volume : this.props.info.volume, // this variable  determines the volume of the cups with a number between 0 and 5
            id: this.props.info.id,
        };

        this.empty = this.empty.bind(this);
    }

    /**
     * when user clicks on a cup, the volume of the cup is emptied, in fact the value of that is set to 0
     */
    empty(){
        // if the game is inactive, clicking is forbidden
        if (!this.props.handleGameIsActive()){
            //the game is inactive
            alert(Constant.WarningGameDisable);
            return;
        }
        //the game is active
        this.setState({
            volume : 0
        })
        this.props.handleChangeCupValue({
            volume : 0,
            id: this.state.id,
            isFull: false
        } );
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

      //  console.log("nextprops cup:", nextProps);
        this.state.volume = nextProps.info.volume;
        return true;
    }

    render(){
        const imgPath = "/image/cups/"+ this.cupVolumeImage[this.state.volume]

        return(
            <Wrappercups>
                <a onClick={()=> this.empty()} >
                    <Imagecups src={imgPath} />
                </a>
            </Wrappercups>


        )
    }
}