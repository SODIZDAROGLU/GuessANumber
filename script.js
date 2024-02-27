const msgEl = document.getElementById('msg');
const startBtn = document.getElementById('start-btn'); 
const randomNum = getRandomNumber();

console.log('Number', randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

let recognition;

// Initialize speech recognition in a function
function startGame() {
    recognition = new window.SpeechRecognition();
    recognition.start();
    recognition.addEventListener('result', onSpeak);
    recognition.addEventListener('end', recognition.start); // Keep listening even after end
}


function onSpeak(e){
    const msg = e.results[0][0].transcript;
    console.log(msg)
    writeMessage(msg);
    checkNumber(wordToNumber(msg));
}

function writeMessage(msg){
    msgEl.innerHTML = ` 
    <div>You said:</div>
    <span class="box">${msg}</span>
   `;
}



function checkNumber(msg){
    debugger
    const num = +msg;
//     let r = wordToNumber(msg);
//     console.log(r);

//  let num = +r;
 if(Number.isNaN(num)){
    msgEl.innerHTML += `<div>That is not a valid number</div>`;
    return;
 }

 if(num > 100 || num < 1){
    msgEl.innerHTML += `<div>Number must be beetween 1 and 100</div>`;
    return;
 }

 if(num === randomNum) {
    document.body.innerHTML = `<h2>Congrats! You have guessed the number! <br><br>I was ${num}</h2>
    <button class="play-again" id="play-again">Play Again</button>`
}else if(num > randomNum){
    msgEl.innerHTML += `<div>GO LOWER</div>`;
}else{
    msgEl.innerHTML += `<div>GO HIGHER</div>`;
}
    
}

function wordToNumber(input) {
    debugger
    if (typeof input === 'string') {
        console.log("Input is not a string:", input);
        let lowerCaseWord = input.toLowerCase();
        

  //  console.log("Lowercase word:", lowerCaseWord);
    switch (lowerCaseWord) {
        case 'one':
            return 1;
        case 'two':
            return 2;
        case 'three':
            return 3;
        case 'four':
            return 4;
        case 'five':
            return 5;
        case 'six':
            return 6;
        case 'seven':
            return 7;
        case 'eight':
            return 8;
        case 'nine':
            return 9;
        case 'ten':
            return 10;
        default:
            return input;
    }
}
return input;
   
};

function getRandomNumber(){
    return Math.floor(Math.random() * 100) + 1
}

startBtn.addEventListener('click', () => {
    startGame();
  
});

document.body.addEventListener('click', (e) => {
    if(e.target.id == `play-again`) {
        window.location.reload();
    }
});


