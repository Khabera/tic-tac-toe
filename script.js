//what functionality do I want to add?
//Player Selection
//Mark Selection
//Clear Game
//Game Type

const Gameboard = (function (){
    let positions = new Array();
    const rounds = 0;
    const addRound = (rounds) => {rounds++};
    for(let i=0; i<9; i++){
        positions.push('');
    }
    const changeState = (value, position) => {
        if(value == playerOne.mark || value == playerTwo.mark){
            positions[position]=value
        }
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
    const clearGameboard = () => {
        positions.forEach(function(position, index){
            positions[index]="";
            DisplayController.changeState('', index, 'white')
            if(DisplayController.highlightOn){
                DisplayController.toggleNewRoundHighlight();
            }
        })
    }
    return {
        changeState,
        get positions(){
            return positions;
        },
        clearGameboard,
        addRound,
        numEmptyPositions
    }
})();

//add name highlights if they are not entered
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
            gameHandler.playerInput(i)
        })        
    }
    const changeState = (mark, num, color) => {
        let square = squares[num];
        square.style.color = color;
        square.textContent=mark;
    }
    const displaySelectionError = (num) => {
        let square = squares[num];
        square.classList.add('error-click');
        setTimeout(function(){
            square.classList.remove('error-click')
        }, 200);
    }
    let highlightOn = false
    const toggleNewRoundHighlight = () => {
        button = document.querySelector('#new-round');
        if(!highlightOn){
            button.classList.add('button-highlight');
            return (highlightOn = !highlightOn);
        }else{
            button.classList.remove('button-highlight');
            return (highlightOn = !highlightOn);
        }
    }
    //definitely would be able to clean this the fuck up
    let forms = document.querySelectorAll('form')
        forms.forEach((form) => {
            form[1].addEventListener('click', () => {
                if(form.getAttribute('id')=='p1'){
                    playerOne.setName(form[0].value);
                }else{
                    playerTwo.setName(form[0].value);
                }
                form.childNodes[3].textContent = form[0].value;
                form[1].remove();
                form[0].remove();
            })
    })
    const updateWins = (player) => {
        let entryArea = document.querySelector(`#${player.id}-wins`)
        entryArea.textContent = `Wins: ${player.wins}`;
    }
    return{
        get highlightOn(){
            return highlightOn;
        },
        displayBoard,
        changeState,
        updateWins,
        displaySelectionError,
        toggleNewRoundHighlight
    }
})();

const gameHandler = (function(){
    let gameActive = true;
    let onPlayerOne = true;

    const playerInput = (num) => {
        if(Gameboard.positions[num]=="" && gameActive){
            if(onPlayerOne){
            playerOne.setSquare(num);
            onPlayerOne=false;
            checkWin(playerOne);
            }else{
            playerTwo.setSquare(num);
            onPlayerOne=true;
            checkWin(playerTwo)
            }
            checkStalemate();
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
                        gameWon(player);
                    }
                }
            }
        })
    }
    function checkStalemate(){
        if(!Gameboard.positions.includes('')){
            DisplayController.toggleNewRoundHighlight();
        }
    }
    const gameWon = (player) => {
        console.log(`congrats ${player.name} on the win`)
        player.addWin();
        DisplayController.toggleNewRoundHighlight();
        gameActive = false;
        DisplayController.updateWins(player);
    }
    const clearButton = document.querySelector('#new-round')
    clearButton.addEventListener('click', () => {
        Gameboard.clearGameboard();
        gameActive=true;
    });

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
    const setName = (recieved) => {
        return (name = recieved);
    }
    let wins = 0
    const addWin = () => {
        return (++wins);
    } 
    return {
        get name(){
            return name;
        },
        get wins(){
            return wins;
        },
        addWin,
        setName,
        winGame,
        setSquare,
        mark,
        id: name
    }
}
const playerOne = PlayerFactory('playerOne', 'x', 'green');
const playerTwo = PlayerFactory('playerTwo', 'o', 'pink');