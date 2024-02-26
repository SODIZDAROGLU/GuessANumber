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
    checkNumber(msg);
}

function writeMessage(msg){
    msgEl.innerHTML = ` 
    <div>You said:</div>
    <span class="box">${msg}</span>
   `;
}

function convertSpokenNumber(input) {
    const numberWords = {
        'zero': 0,
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9,
        'ten': 10,
    };
   // Check if the input is a number word
   if (numberWords.hasOwnProperty(input.toLowerCase())) {
    return numberWords[input.toLowerCase()];
   }
       // If input is not a number word, attempt to parse it as a number
       const parsedNumber = parseInt(input);
       if (!isNaN(parsedNumber)) {
           return parsedNumber;
       }
       
       // If input cannot be converted to a number, return NaN
       return NaN;
};

function checkNumber(msg){
 //let num = +msg;
//debugger
const num = convertSpokenNumber(msg);
//  if(Number.isNaN(num)){
//     // If conversion fails, try converting from word to number
//     num = wordToNumber(msg);
// }
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



