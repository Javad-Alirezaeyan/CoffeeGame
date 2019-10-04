## CoffeeGame

CoffeGame  is a game that the user play with cups. To start the user must set the count of cups in the game,
then starts the game. 

This application has been implemented by a react library and PWA. You can see the online version here:
 <a href="http://coffeegame.ramanpardaz.com">http://coffeegame.ramanpardaz.com</a>

<b style="color:red">Note:</b> the above link works with http, so service worker doesnt work with it

### Details

The applications save the information of each game in the local storage, including:

- high score is stored
- paused game: if the user pauses the game, all data of the game are stored in the storage. So when the user reloads the page later, the application retrieves the information of the game and the user can continue the game.
 
- After a game is ended, the information is saved in the local storage, so we always have a history of all games.
 
 - Users can work with the application both online and offline. In this application, files saved in the local with CacheAPI. 
 A service worker has been implemented to do it.
 
 - Showing a message to the user when the users can enhance their records. A  component  has been implemented to show messages 
 to the users when they are playing
 
 - User can integrate with the application with some buttons including Setting, Pause, Resume, Retry, Start, Reset
 
 - The count of cups must be a number between 1 and 8, if the users want to set a number out of this range, they receive 
 a warning. This range can be customized in the constant file in this path: "./src/lib/constant.js"
 
 - There is a simple algorithm to fill the cups over time. The algorithm is run each one and half seconds, then choose a
  number to determine(for example k) how many the cups must be changed. Next, it randomly choose k-cups for incrementing
   value of the cups. If there is more cups, algorithm sets a bigger number in k variable.
 
 
 ### Technology
 
 - React
 - PWA 
 - Service Worker
 - Style-Component
 - Html, CSS3
 - CacheAPI, Local Storage
 
## Requirement

- npm
- node



## 

- Bundling with parcel
- Dev server with hot module replacement
- React 16npm start
- styled-components

## Developing

After downloading the source code, run the following command in the terminal
 for installing and updating the modules:

`npm install`


### Building

To start the development server with hot module reloading, run:

* `npm start`

To build for production

* first remove the folders `dist` and `.cache`
* then run: `npm run build`

## Screen shots

![alt text](https://github.com/Javad-Alirezaeyan/CoffeeGame/blob/master/screenshot/1.png)


![alt text](https://github.com/Javad-Alirezaeyan/CoffeeGame/blob/master/screenshot/2.png)

![alt text](https://github.com/Javad-Alirezaeyan/CoffeeGame/blob/master/screenshot/6.png)

![alt text](https://github.com/Javad-Alirezaeyan/CoffeeGame/blob/master/screenshot/3.png)


![alt text](https://github.com/Javad-Alirezaeyan/CoffeeGame/blob/master/screenshot/4.png)


![alt text](https://github.com/Javad-Alirezaeyan/CoffeeGame/blob/master/screenshot/5.png)
