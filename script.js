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
        if(value == playerOne.mark || value == playerTwo.mark)
            positions[position]=value
        }
    const numEmptyPositions = () => {
        let num=0
        positions.forEach(function(position){
            if(position==""){
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
    const squares = displayBoard.childNodes;
    for(let i=0; i<9; i++){
        let boardSquare = document.createElement('div')
        boardSquare.classList.add('board-square');
        boardSquare.setAttribute('number', `${i}`)
        displayBoard.appendChild(boardSquare);
        boardSquare.addEventListener('click', function(){
            boardSquare.classList.add(`clicked-player`);
            handleGame.playerInput(i)
        })        
    }
    const changeState = (mark, num, color) => {
        let square = squares[num];
        square.style.backgroundColor = color;
        square.textContent=mark;
    }
    const displaySelectionError = (num) => {
        let square = squares[num];
        square.classList.add('error-click');
        setTimeout(function(){
            square.classList.remove('error-click')
        }, 200);
    }
    return{
        displayBoard,
        changeState,
        displaySelectionError
    }
})();
const handleGame = (function(){
    let onPlayerOne = true;
    const playerInput = (num) => {
        if(!Gameboard.positions[num]){
            if(onPlayerOne){
            playerOne.setSquare(num);
            onPlayerOne=false;
            checkWin(playerOne);
            }else{
            playerTwo.setSquare(num);
            onPlayerOne=true;
            checkWin(playerTwo)
            }
        }else{
            DisplayController.displaySelectionError(num);
        }    
    }
    const winningPositions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    const checkWin = (player) => {
        const positionsHeld = [];
        Gameboard.positions.forEach((position, index) => {
            if(position == player.mark){
                positionsHeld.push(index);
            }
        })
        winningPositions.forEach((combination) => {
            if(positionsHeld.includes(combination[0])){
                if(positionsHeld.includes(combination[1])){
                    if(positionsHeld.includes(combination[2])){
                        console.log(`Congratulations ${player.name} on the win`)
                    }
                }
            }
        })
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

const PlayerFactory = (name, mark, color) => {
    const winGame = () => console.log(`The ${name} won the game`);
    const setSquare = (num) => {
        Gameboard.changeState(mark, num);
        DisplayController.changeState(mark, num, color);
    }
    return {
        name,
        winGame,
        setSquare,
        mark
    }
}
const playerOne = PlayerFactory('player one', 'x', 'green');
const playerTwo = PlayerFactory('player two', 'o', 'pink');