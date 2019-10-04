import React from "react";
import ReactDOM from "react-dom";
import Game from "./components/Game";
import Gameinfo from "./components/Gameinfo";
import {Maincontent} from "./components/style";
import Header from "./components/Header";


if ("serviceWorker" in navigator){
  window.addEventListener("load", function () {
    navigator.serviceWorker
    //.register("serviceworker.js",{"scope":"."})
        .register("serviceworker.js")
        .then(function () {
            //alert("service worker register");
          console.log("service worker registered")
        }).catch(function (error) {
            alert("service worker didn't register");
            console.error("service worker didn't register:", error);
    });
  });
}

(function() {
    if(window.localStorage){
        console.log("Local Storage Supported");
    }
    else{
        alert("Local Storage Not Supported")
        console.log("Local Storage Not Supported")
    }
})();

const App = () => (
    <main className="main">
        <Header />
        <Maincontent>
            <Game/>
            <Gameinfo/>
        </Maincontent>
    </main>

);

ReactDOM.render(<App />, document.getElementById("root"));

// Hot Module Replacement
if (module.hot) {
  //dev mode
  module.hot.accept();
} else {
  // production mode
}
