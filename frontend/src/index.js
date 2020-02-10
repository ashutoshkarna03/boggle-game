import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Game from "./components/gameCompenent";

const element = <h1>Hello World from React</h1>
console.log("Working")
console.log(element)

ReactDOM.render(<Game />, document.getElementById('root'));


