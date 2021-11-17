//tic tac toe game

//gameboard -- 9 squares
//displayController -- Connect to DOM, recieve input?

//I want to get a good understand of the pseudo code before I start this thing, what can I do, and what am I trying to do? Modules allow me to create 

const Gameboard = (function (){
    let positions = new Array();
    const rounds = 0;
    const addRound = (rounds) => {rounds++};
    for(let i=0; i<9; i++){
        positions.push('');
    }
    const changeState = (value, position) => {
        console.log('here');
        if(value == 'x' || value == 'y')
            positions[position]=value
        }
    const numEmptyPositions = () => {
        let num=0
        //console.log('eher')
        positions.forEach(function(position){
            //console.log('ekekee')
            if(position==""){
                //console.log(num);
                num++
            }
        }) 
        return num;
    }
    return {
        changeState,
        get positions(){
            return positions;
        },
        addRound,
        numEmptyPositions
    }
})();

const DisplayController = (function(){
    const displayBoard = document.querySelector('#gameboard');
    for(let i=0; i<9; i++){
        let boardSquare = document.createElement('div')
        boardSquare.classList.add('board-square');
        boardSquare.setAttribute('number', `${i}`)
        displayBoard.appendChild(boardSquare);
        //playerRound toggle
        boardSquare.addEventListener('click', function(){
           // console.log(handleGame.onPlayerInput)
            boardSquare.classList.add(`clicked-player`);
            handleGame.playerInput(i)
        
            //self.setSquare(i) move to a player input function?
        })        
    }
    const changeState = (mark, num, color) => {
        let square = displayBoard.childNodes[num];
        square.style.backgroundColor = color;
        square.textContent=mark;
    }
    return{displayBoard,
    changeState}
})();
const handleGame = (function(){
    //Two different game options, 2 players, 1 player vs ai
    //1 player, ideally could set up a random "x player goes first"
    let onPlayerOne = true;
    const playerInput = (num) => {
        if(onPlayerOne){
        playerOne.setSquare(num);
        onPlayerOne=false;
        }else{
        playerTwo.setSquare(num);
        onPlayerOne=true;
        }
    }
    //Set up as AI later? Build just a two player input
    //const getComputerInput = () => {
    //    let num = Math.floor(Math.random() * Gameboard.numEmptyPositions());
    //    console.log(num);
    //}
    return {
        get onPlayerInput(){
            return onPlayerInput
            },
        playerInput
    }
})();
//
const PlayerFactory = (name, mark, color) => {
    const winGame = () => console.log(`The ${name} won the game`);
    const setSquare = (num) => {
        Gameboard.changeState(mark, num);
        DisplayController.changeState(mark, num, color);
    }
    return {
        winGame,
        setSquare
    }
}
const playerOne = PlayerFactory('player one', 'x', 'green');
const playerTwo = PlayerFactory('computer two', 'o', 'pink');