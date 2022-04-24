const gameContainer = document.getElementById("game");

const COLORS = [
  "lightseagreen",
  "lightseagreen",
  "darkkhaki",
  "darkkhaki",
  "rebeccapurple",
  "rebeccapurple",
  "lightsalmon",
  "lightsalmon",
  "goldenrod",
  "goldenrod"
];
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
let clickCounter = 0;

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  clickCounter++
  if (clickCounter === 1){
    const firstCard = event.target;
    let firstCardColor = firstCard.classList.value
    firstCard.style.backgroundColor = firstCardColor;
    sessionStorage.setItem("firstColor", firstCardColor);
    firstCard.classList.add('clicked');
  }
  else if (clickCounter === 2){
    let firstCardColor = sessionStorage.getItem("firstColor");
    const secondCard = event.target;
    let secondCardColor = secondCard.classList.value;
    secondCard.style.backgroundColor = secondCardColor;
    secondCard.classList.add('clicked');
    matchCheck(firstCardColor, secondCardColor);
  }
  console.log("click counter: ", clickCounter);
}

function matchCheck(cardOne, cardTwo){
  let resetCardOne = Array.from(document.getElementsByClassName('clicked')).pop();
  resetCardOne.classList.remove('clicked');
  let resetCardTwo = Array.from(document.getElementsByClassName('clicked')).pop();
  resetCardTwo.classList.remove('clicked');
  
  if (cardOne !== cardTwo){
    setTimeout(resetCards, 1000);
    function resetCards() {
      console.log('NO MATCH');
      resetCardOne.style.backgroundColor = '';
      resetCardTwo.style.backgroundColor = '';
      clickCounter = 0;
    }
  }
  else if (cardOne === cardTwo) {
    console.log('Card Match!');
    clickCounter = 0;
  }
  
};



// when the DOM loads
createDivsForColors(shuffledColors);

/* */