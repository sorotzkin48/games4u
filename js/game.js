let SIZE;
let colorAmount;

const colorArray = ["green", "yellow", "orange", "red", "pink", "purple", "blue", "lightBlue"];
let chosenClass;

let counter = -1;
let currentIndex = 0;

let setGame = [];
let startTime;

let chosen = [];

let whites = 0, countScore = 0;

let endTime;

let currentUser = JSON.parse(localStorage.getItem("currentUser"));

let signOut = document.getElementById("signOut");
signOut.addEventListener("click", signOutFunc);

//function that changes the amount of colors to choose from and circles to fill
function changeFunc() {
    SIZE = JSON.parse(localStorage.getItem("size"));
    if (SIZE)
        localStorage.removeItem("size");
    else
        SIZE = 4;

    colorAmount = JSON.parse(localStorage.getItem("colorAmount"))
    if (colorAmount)
        localStorage.removeItem("colorAmount");
    else
        colorAmount = 6;

}

// creating the color options for player to pick from
function setColorOptions() {
    for (let i = 0; i < colorAmount; i++) {
        const color = document.createElement("button");
        color.setAttribute("class", colorArray[i]);
        color.classList.add("colorNav");
        color.addEventListener("click", clickFunc);
        color.innerText = colorArray[i];
        document.getElementById("colors").appendChild(color);
    }
    console.log(colorArray);

}
//Randomizing colors for setting the game
function setGameFunc() {
    for (let i = 0; i < SIZE; i++) {
        let rndNumber;
        rndNumber = Math.floor(Math.random() * colorAmount);
        setGame[i] = colorArray[rndNumber];
        for (let j = 0; j < i; j++)
            if (setGame[i] == setGame[j]) {
                i--;
                break;
            }
    };
    console.log(setGame);
    setInterval(() => {
        time++;
    }, 1000)
}

let time = 0;

//function for adding a new line to the game
function newLine() {
    const board = document.getElementById("myBoard");
    counter++;

    let row = document.createElement("tr");
    row.setAttribute("id", "row" + counter);
    board.appendChild(row);
    for (let i = 0; i < SIZE; i++) {
        let box = document.createElement("td");
        box.setAttribute("class", "playersChoice");
        box.setAttribute("id", counter + "" + i);
        row.appendChild(box);
    }
    let score = document.createElement("td");
    score.setAttribute("class", "scoreContainer");
    row.appendChild(score);
    for (let i = 0; i < SIZE; i++) {
        let littleBox = document.createElement("div");
        littleBox.setAttribute("class", "score")
        littleBox.setAttribute("id", "score_" + counter + "" + i);
        score.appendChild(littleBox);
    }
}

//fuction for filling the squares according to the user's choice
function clickFunc(e) {
    let mySquare = document.getElementById(counter + "" + currentIndex);
    let tmp = 0;
    for (let i = 0; i < chosen.length; i++) {
        if (chosen[i] == e.target.classList[0])
            tmp++;
    }
    if (tmp === 0) {
        chosen.push(e.target.classList[0]);
        mySquare.classList.add(chosen[chosen.length - 1]);
        if (currentIndex == SIZE - 1)
            checkWhites();
        currentIndex++;
    }
}

//functions for checking the score
function checkWhites() {
    // checking how many are the right color in the right place- (whites)
    whites = 0;
    countScore = 0;
    for (let i = 0; i < SIZE; i++) {
        if (chosen[i] == setGame[i]) {
            score = document.getElementById("score_" + counter + "" + countScore);
            score.classList.add("white");
            countScore++;
            whites++;
        }
    }
    checkBlacks();
}

//checking how many are the right color in the wrong place (blacks)
function checkBlacks() {
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            if (i != j)
                if (chosen[i] == setGame[j]) {
                    score = document.getElementById("score_" + counter + "" + countScore);
                    score.classList.add("black");
                    countScore++;
                }
        }
    }
    if (whites == SIZE)
        winFunc();
    else
        newLine();
    chosen = [];
    currentIndex = -1;
}

// function for printing out message to winner
function winFunc() {
    let myAudio = document.getElementById("audio");
    myAudio.play();

    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    let name = currentUser.name;
    let wins = currentUser.wins++;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    let win = document.getElementById("win");
    win.style.display = "block";

    let printToWinner1 = document.createElement("h1");
    printToWinner1.innerHTML = "Hurray to " + name + " !";
    win.appendChild(printToWinner1);

    let printToWinner2 = document.createElement("h1");
    printToWinner2.innerHTML = "You won in " + ++counter + " turns";
    win.appendChild(printToWinner2);

    let printToWinner3 = document.createElement("h1");
    printToWinner3.innerHTML = "It took you only " + minutes + " minutes and " + seconds + " seconds. Good for you!!!";
    win.appendChild(printToWinner3);

    wins++;

    let add = "th";
    if (wins > 10 && wins < 20) {
        suffix = "th";
    }
    else {
        switch (wins % 10) {
            case (1):
                suffix = "st";
                break;
            case (2):
                suffix = "nd";
                break;
            case (3):
                suffix = "rd";
                break;
            default:
                suffix = "th";

        }
    }

    let printToWinner4 = document.createElement("h1");
    printToWinner4.innerHTML = "It is your " + wins + suffix + " time winning this game.";
    win.appendChild(printToWinner4);
}

//function for signing out
function signOutFunc() {
    arrOfUsers = JSON.parse(localStorage.getItem("arrayOfUsers"));
    let index = arrOfUsers.findIndex(item => { return item.name == currentUser.name });
    arrOfUsers[index].wins = currentUser.wins;
    localStorage.setItem("arrayOfUsers", JSON.stringify(arrOfUsers));
    localStorage.removeItem("currentUser");
    location.href = "../html/home.html";
}

changeFunc();
setColorOptions();
setGameFunc();
newLine();

