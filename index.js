let difficulty = document.getElementById("difficulty");
let timer = document.getElementById("timer");
let check = document.getElementById("check");

function setDifficulty(event) {
  let diff = event.target.innerHTML;
  difficulty.style.color = "#3498db";
  setTimeout(() => {
    difficulty.innerHTML = diff;
    difficulty.style.color = "white";
  }, 500);
}

let counter = 100;
let first = "first";
let fruitsArray0 = [];
let fruitsArray1 = [];

let countDown;

function start() {
  check.innerHTML = "";
  if (difficulty.innerHTML === "Difficulty") {
    alert("Please Choose Difficulty!");
  } else {
    if (first === "first") {
      countDown = setInterval(() => {
        if (counter > 0) {
          counter--;
          timer.innerHTML = "Timer : " + counter + " sec";
        } else {
          clearInterval(countDown);
          check.innerHTML = "You Lost! :) Try Again.";
          let cards = document.getElementsByClassName("card");
          for (let i = 0; i < cards.length; i++) {
            cards[i].removeAttribute("onclick");
          }
        }
      }, 1000);
      first = "second";
    } else {
      removeTable();
      clearInterval(countDown);
      counter = 100;
      timer.innerHTML = "Timer : " + counter;
      countDown = setInterval(() => {
        if (counter > 0) {
          counter--;
          timer.innerHTML = "Timer : " + counter;
        } else {
          clearInterval(countDown);
          check.innerHTML = "You Lost! :) Try Again.";
          let cards = document.getElementsByClassName("card");
          for (let i = 0; i < cards.length; i++) {
            cards[i].removeAttribute("onclick");
          }
        }
      }, 1000);
    }

    createTable();
  }
}

let container = document.getElementById("container");

let cardsCount;

function createTable() {
  if (difficulty.innerHTML === "Easy") {
    cardsCount = 20;
    container.style.width = "400px";
  } else if (difficulty.innerHTML === "Medium") {
    cardsCount = 40;
    container.style.width = "600px";
  } else if (difficulty.innerHTML === "Hard") {
    container.style.width = "800px";
    cardsCount = 60;
  }

  for (let i = 0; i < cardsCount; i++) {
    let card = document.createElement("div");
    let front = document.createElement("div");
    let back = document.createElement("div");
    let inner = document.createElement("div");
    card.classList.add("card");
    front.classList.add("front");
    back.classList.add("back");
    inner.classList.add("inner");
    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);
    card.setAttribute("onclick", "rotateCard(event)");
    container.appendChild(card);
  }
  let unsorteredArray0 = setInterval(() => {
    let position = Math.floor((Math.random() * cardsCount) / 2);
    if (fruitsArray0.length === cardsCount / 2) {
      clearInterval(unsorteredArray0);
      setPairs0();
    } else if (fruitsArray0.includes(position) === false) {
      fruitsArray0.push(position);
    }
  }, 0);

  let unsorteredArray1 = setInterval(() => {
    let position = Math.floor((Math.random() * cardsCount) / 2);
    if (fruitsArray1.length === cardsCount / 2) {
      clearInterval(unsorteredArray1);
      setPairs0();
    } else if (fruitsArray1.includes(position) === false) {
      fruitsArray1.push(position);
    }
  }, 0);

  console.log(fruitsArray0);
  console.log(fruitsArray1);

  let cards = document.getElementsByClassName("card");
  let back = document.getElementsByClassName("back");

  function setPairs0() {
    setTimeout(() => {
      for (let i = 0; i < cardsCount; i++) {
        if (i < cardsCount / 2) {
          cards[i].classList.add(`fruit-${fruitsArray0[i]}`);
          back[i].classList.add(`fruits-${fruitsArray0[i]}`);
        } else {
          cards[i].classList.add(`fruit-${fruitsArray1[i - cardsCount / 2]}`);
          back[i].classList.add(`fruits-${fruitsArray1[i - cardsCount / 2]}`);
        }
      }
      setBackground();
    }, 1000);
  }
}

function removeTable() {
  container.innerHTML = "";
}

function setBackground() {
  for (let i = 0; i < cardsCount; i++) {
    let backs = document.getElementsByClassName(`fruits-${i}`);
    backs[0].style.backgroundImage = `url("img/fruit-${i}.png")`;
    backs[1].style.backgroundImage = `url("img/fruit-${i}.png")`;
  }
}

let checkWin = [];
let clicks = 0;

let cards = document.getElementsByClassName("card");

function rotateCard(event) {
  clicks++;
  event.target.style.transform = "rotateY(180deg)";
  event.target.parentNode.classList.add("pair");
  let val = event.target.parentNode.classList.item(1);
  checkWin.push(val);
  if (checkWin.length == 2 && checkWin[0] === checkWin[1]) {
    let done = document.getElementsByClassName(checkWin[0]);
    for (let i = 0; i < done.length; i++) {
      done[i].classList.add("done");
    }
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.remove("pair");
    }
    clicks = 0;
    checkWin = [];
  } else {
    if (clicks === 2) {
      let pair = document.getElementsByClassName("pair");
      for (let i = 0; i < cards.length; i++) {
        cards[i].removeAttribute("onclick");
      }
      setTimeout(() => {
        for (let i = 0; i < cards.length; i++) {
          cards[i].setAttribute("onclick", "rotateCard(event)");
        }
      }, 1000);
      setTimeout(() => {
        pair[0].firstChild.style.transform = "rotateY(0deg)";
        pair[1].firstChild.style.transform = "rotateY(0deg)";
        for (let i = 0; i < cards.length; i++) {
          cards[i].classList.remove("pair");
        }
      }, 1000);
      clicks = 0;
      checkWin = [];
    }
  }

  let done = document.getElementsByClassName("done");
  setTimeout(() => {
    for (let i = 0; i < done.length; i++) {
      done[i].removeAttribute("onclick");
    }
  }, 1100);

  if (done.length === cardsCount) {
    clearInterval(countDown);

    if (difficulty.innerHTML === "Easy") {
      if (Number(document.getElementById("easy").innerHTML) < counter) {
        document.getElementById("easy").innerHTML = counter;
        check.innerHTML =
          "You Won! " +
          "Difficulty - " +
          difficulty.innerHTML +
          "," +
          " Score - " +
          counter;
      }
    } else if (difficulty.innerHTML === "Medium") {
      if (Number(document.getElementById("medium0").innerHTML) < counter) {
        document.getElementById("medium0").innerHTML = counter;
        check.innerHTML =
          "You Won! " +
          "Difficulty - " +
          difficulty.innerHTML +
          "," +
          " Score - " +
          counter;
      }
    } else if (difficulty.innerHTML === "Hard") {
      if (Number(document.getElementById("hard0").innerHTML) < counter) {
        document.getElementById("hard0").innerHTML = counter;
        check.innerHTML =
          "You Won! " +
          "Difficulty - " +
          difficulty.innerHTML +
          "," +
          " Score - " +
          counter;
      }
    }
  }
}
