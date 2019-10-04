import React from 'react';



export default class Header extends React.Component{


    render(){
        return(
            <header className="header">
                <h1>
                    Coffee Game
                </h1>
               {/* <button id="butInstall" aria-label="Install"></button>
                <button id="butRefresh" aria-label="Refresh"></button>*/}
            </header>
        );
    }
}