function copyButton(){
    console.log("Hello everyone");
    let copyMessage=document.querySelector(".toCopy");
    navigator.clipboard.writeText(copyMessage.value);
}
let passwordLength=12;

const passwordDisplayValue=document.querySelector(".toCopy");


const sliderValue=document.querySelector(".slider");

const lengthDisplay=document.querySelector(".lengthDisplay");
handleSlider();

function handleSlider(){

    sliderValue.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
}


const indicator=document.querySelector(".indicator");
    
function setIndicator(color){
    indicator.style.backgroundcolor=color;
}

function getRandomNumber(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function getRandomInteger(){
    return getRandomNumber(0,9);
}

function getRandomUpper(){
    return String.fromCharCode(getRandomNumber(65,93));
}

function getRandomLower(){
    return String.fromCharCode(getRandomNumber(97,123));
}
let symbolString="!#$%&'()*+,-./:;<=>?@[\]^_{|}~";

function getRandomSymbol(){
    const randnum=getRandomNumber(0,symbolString.length);
    return symbolString.charAt(randnum);
}

const upperCase=document.querySelector("#upperCase");
const lowerCase=document.querySelector("#lowerCase");
const includeNumbers=document.querySelector("#includeNumbers");
const includeSymbols=document.querySelector("#includeSymbols");

function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNumbers=false;
    let hasSymbols=false;
    if(upperCase.checked){
        hasUpper=true;
    }
    if(lowerCase.checked){
        hasLower=true;
    }
    if(includeNumbers.checked){
        hasNumbers=true;
    }
    if(includeSymbols.checked){
        hasSymbols=true;
    }
    if(hasUpper && hasLower && (hasNumbers || hasSymbols) && passwordLength>=8){
        setIndicator("#0f0")
    }
    else if(hasUpper  && (hasNumbers || hasSymbols) && passwordLength>=6){
        setIndicator("#ff0")
    }
    else{
        setIndicator("f00");
    }
}

const inputSlider=document.querySelector(".slider");
inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
})

const generatePassword=document.querySelector(".generatePassword");

let checkCount=0;
const allCheckbox=document.querySelectorAll("input[type=checkbox]");


function handleCheckbox(){
     checkCount=0;
     allCheckbox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
     });
     if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
     }
}

allCheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckbox);
})

let password="";

generatePassword.addEventListener("click",()=>{
    if(checkCount==0){
        return;
    }
    password="";
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
    let functArr=[];
    if(upperCase.checked){
        functArr.push(getRandomUpper);
    }
    if(lowerCase.checked){
        functArr.push(getRandomLower);
    }
    if(includeNumbers.checked){
        functArr.push(getRandomInteger);
    }
    if(includeSymbols.checked){
        functArr.push(getRandomSymbol);
    }
    for(let i=0;i<functArr.length;i++){
        password=password+functArr[i]();
    };

    for(let i=0;i<passwordLength-functArr.length;i++){
        let randIndex=getRandomNumber(0,functArr.length);
        password=password+functArr[randIndex]();
    }
    passwordDisplayValue.value=password;
    console.log(password);
    calcStrength();
    


});
