import "./style.css";

const levelsCont = document.querySelector(".levels");
const globalGameState = {};
const container = document.querySelector(".container");
let cardsCounter = 0;

const levels = {
    easy: 6,
    moderate: 12,
    challenging: 18,
};

const card = {
    tag: "div",
    cls: "card",
    content: {
        tag: "img",
        cls: "card__pic",
        attrs: {
            src: "src/img/cover.png",
        },
    },
};
const cardCont = {
    tag: "div",
    cls: "cards",
};

const startButton = document.querySelector(".chooseLevel__start");

function chooseLevel(event) {
    console.log(globalGameState.difficulty);
    const items = levelsCont.children;
    console.log(items);
    for (let i = 0; i < items.length; i++) {
        if (items[i].classList.contains("level__chosen")) {
            items[i].classList.remove("level__chosen");
        }
    }

    let target = event.target;
    globalGameState.difficulty = target.className;

    target.classList.add("level__chosen");
}

function templateEngine(block) {
    if (block === undefined || block === null || block === false) {
        return document.createTextNode("");
    }
    if (
        typeof block === "string" ||
        typeof block === "number" ||
        block === true
    ) {
        return document.createTextNode(block);
    }
    if (Array.isArray(block)) {
        const fragment = document.createDocumentFragment();
        block.forEach((item) => {
            const el = templateEngine(item);
            fragment.appendChild(el);
        });
        return fragment;
    }

    const element = document.createElement(block.tag);
    element.classList.add(...[].concat(block.cls).filter(Boolean));

    if (block.cls) {
        element.classList.add(...[].concat(block.cls).filter(Boolean));
    }

    if (block.attrs) {
        const keys = Object.keys(block.attrs);
        keys.forEach((key) => {
            // href
            element.setAttribute(key, block.attrs[key]);
        });
    }

    const content = templateEngine(block.content);
    element.appendChild(content);
    return element;
}

function secondScreen() {
    if (globalGameState.difficulty in levels) {
        let cardQuantity = 0;
        container.remove();
        if (globalGameState.difficulty in levels) {
            switch (globalGameState.difficulty) {
                case "easy":
                    cardQuantity = levels.easy;
                    break;
                case "moderate":
                    cardQuantity = levels.moderate;
                    break;
                case "challenging":
                    cardQuantity = levels.challenging;
                    break;
            }
            document.body.appendChild(templateEngine(cardCont));
            const cardContainer = document.querySelector(".cards");
            for (let i = 0; i < cardQuantity; i++) {
                cardContainer.appendChild(templateEngine(card));
            }
        } else {
            alert("Выберите уровень сложности игры.");
        }
    } else {
        alert("Выберите уровень сложности игры");
    }
}

function renderCardsScreen() {
    if (globalGameState.difficulty in levels) {
        const suits = ["diamonds", "hearts", "clubs", "spades"];
        const ranks = ["6", "7", "8", "9", "10", "Q", "K", "J", "A"];
        let indexSuits = 10;
        let indexRanks = 10;
        let k = 0;
        let cards = document.querySelectorAll(".card__pic");

        for (let i = 0; i < cards.length / 2; i++) {
            do {
                indexSuits = Math.round(Math.random() * 10);
            } while (indexSuits > suits.length - 1);
            do {
                indexRanks = Math.round(Math.random() * 10);
            } while (indexRanks > ranks.length - 1);

            cards[
                i
            ].src = `static/${ranks[indexRanks]}.${suits[indexSuits]}.png`;
            cards[
                i + cards.length / 2
            ].src = `static/${ranks[indexRanks]}.${suits[indexSuits]}.png`;
            k++;
            globalGameState[
                k + 0
            ] = `${ranks[indexRanks]}.${suits[indexSuits]}`;
            globalGameState[
                k + cards.length / 2
            ] = `${ranks[indexRanks]}.${suits[indexSuits]}`;
        }
        console.log(globalGameState);
        const cardsCont = document.querySelector(".cards");
        const cardsItem = document.querySelectorAll(".card");
        const cardsMix = {
            tag: "div",
            cls: "mix",
        };
        cardsCont.appendChild(templateEngine(cardsMix));
        const mixCont = document.querySelector(".mix");
        console.log(cardsItem.length);

        for (let i = cardsItem.length; i > 0; i--) {
            if (cardsItem[i - 3]) {
                mixCont.appendChild(cardsItem[i - 3]);
                console.log(i);
            }
        }

        const cardsContElements = cardsCont.querySelectorAll(".card");
        for (let i = 0; i < cardsContElements.length; i++) {
            mixCont.appendChild(cardsContElements[i]);
        }
        console.log(mixCont.children);
    }
}

function cardShow(event) {
    cardsCounter++;
    const covers = document.querySelectorAll(".cover");
    if (covers.length < 2) {
        //alert("Вы выиграли");
        winScreen();
    } else {
        console.log("works");
    }

    let target = event.target;
    let card = target.previousElementSibling;
    card.classList.remove("hidden");
    target.remove();
    if (cardsCounter === 1) {
        globalGameState.cardChosen = card.src;
    } else {
        if (globalGameState.cardChosen !== card.src) {
            //alert("Вы проиграли");
            loseScreen();
        } else {
            globalGameState.cardChosen = card.src;
            cardsCounter = 0;
            return cardsCounter;
        }
    }
}

function hideCards() {
    let cardsItems = document.querySelectorAll(".card");
    let cardsPics = document.querySelectorAll(".card__pic");
    let cardsCont = document.querySelector(".mix");
    const coverObject = {
        tag: "img",
        cls: "cover",
        attrs: {
            src: "static/cover.png",
        },
    };
    cardsItems.forEach((item) => item.appendChild(templateEngine(coverObject)));
    cardsPics.forEach((item) => item.classList.add("hidden"));
    const headerObj = {
        tag: "div",
        cls: "header",
        content: [
            {
                tag: "div",
                cls: "time",
                content: [
                    {
                        tag: "div",
                        cls: "min",
                        content: [
                            {
                                tag: "div",
                                cls: "text",
                                content: "min",
                            },
                            {
                                tag: "div",
                                cls: "figures",
                                content: "00",
                                attrs: {
                                    id: "min",
                                },
                            },
                        ],
                    },
                    {
                        tag: "div",
                        cls: "dot_white",
                    },
                    {
                        tag: "div",
                        cls: "sec",
                        content: [
                            {
                                tag: "div",
                                cls: "text",
                                content: "sec",
                            },
                            {
                                tag: "div",
                                cls: "figures",
                                content: "00",
                                attrs: {
                                    id: "sec",
                                },
                            },
                        ],
                    },
                ],
            },
            {
                tag: "div",
                cls: "startButtonCont",
                content: {
                    tag: "button",
                    cls: "startButton",
                    content: "Начать заново",
                },
            },
        ],
    };

    document.body.prepend(templateEngine(headerObj));
    let timer = 0;
    let timerInterval;
    let second = document.getElementById("sec");
    let minute = document.getElementById("min");

    function start() {
        clearTimer();
        timerInterval = setInterval(function () {
            timer += 1 / 60;
            let secondVal = Math.floor(timer) - Math.floor(timer / 60) * 60;
            let minuteVal = Math.floor(timer / 60);

            second.innerHTML =
                secondVal < 10 ? "0" + secondVal.toString() : secondVal;
            minute.innerHTML =
                minuteVal < 10 ? "0" + minuteVal.toString() : minuteVal;
        }, 1000 / 60);
    }

    function clearTimer() {
        clearInterval(timerInterval);
    }
    start();
    globalGameState.timer = timerInterval;
    const buttonStart = document.querySelector(".startButton");
    buttonStart.addEventListener("click", function () {
        location.reload();
    });
    cardsCont.addEventListener("click", cardShow);
}
const hideCardsTimer = () => {
    if (globalGameState.difficulty in levels) {
        setTimeout(hideCards, 5000);
    }
};

function loseScreen() {
    let second = document.getElementById("sec");
    let minute = document.getElementById("min");
    document.body.style.position = "relative";
    const losePopUpObject = {
        tag: "div",
        cls: "lose_container",
        content: [
            {
                tag: "div",
                cls: "lose_icon",
                content: {
                    tag: "img",
                    cls: "lose_pic",
                    attrs: {
                        src: "static/lose.png",
                    },
                },
            },
            {
                tag: "h3",
                cls: "lose_title",
                content: "Вы проиграли!",
            },
            {
                tag: "p",
                cls: "lose_text",
                content: "Затраченное время:",
            },
            {
                tag: "div",
                cls: "time",
                content: [
                    {
                        tag: "div",
                        cls: "minute",
                        content: minute.textContent,
                    },
                    {
                        tag: "div",
                        cls: "dot",
                    },
                    {
                        tag: "div",
                        cls: "second",
                        content: second.textContent,
                    },
                ],
            },
            {
                tag: "div",
                cls: "play_again",
                content: {
                    tag: "button",
                    cls: "play_again_button",
                    content: "Играть снова",
                },
            },
        ],
    };
    const coverObject = {
        tag: "div",
        cls: "lose_cover",
    };
    document.body.appendChild(templateEngine(coverObject));
    const loseCover = document.querySelector(".lose_cover");
    loseCover.appendChild(templateEngine(losePopUpObject));

    function clearTimer() {
        clearInterval(globalGameState.timer);
    }
    clearTimer();

    const playAgain = document.querySelector(".play_again");
    playAgain.addEventListener("click", function () {
        location.reload();
    });
}

function winScreen() {
    let second = document.getElementById("sec");
    let minute = document.getElementById("min");
    document.body.style.position = "relative";
    const winPopUpObject = {
        tag: "div",
        cls: "win_container",
        content: [
            {
                tag: "div",
                cls: "win_icon",
                content: {
                    tag: "img",
                    cls: "win_pic",
                    attrs: {
                        src: "static/win.png",
                    },
                },
            },
            {
                tag: "h3",
                cls: "win_title",
                content: "Вы выиграли!",
            },
            {
                tag: "p",
                cls: "win_text",
                content: "Затраченное время:",
            },
            {
                tag: "div",
                cls: "time",
                content: [
                    {
                        tag: "div",
                        cls: "minute",
                        content: minute.textContent,
                    },
                    {
                        tag: "div",
                        cls: "dot",
                    },
                    {
                        tag: "div",
                        cls: "second",
                        content: second.textContent,
                    },
                ],
            },
            {
                tag: "div",
                cls: "play_again",
                content: {
                    tag: "button",
                    cls: "play_again_button",
                    content: "Играть снова",
                },
            },
        ],
    };
    const coverObject = {
        tag: "div",
        cls: "win_cover",
    };
    document.body.appendChild(templateEngine(coverObject));
    const winCover = document.querySelector(".win_cover");
    winCover.appendChild(templateEngine(winPopUpObject));

    function clearTimer() {
        clearInterval(globalGameState.timer);
    }
    clearTimer();

    const playAgain = document.querySelector(".play_again");
    playAgain.addEventListener("click", function () {
        location.reload();
    });
}

levelsCont.addEventListener("click", chooseLevel);
startButton.addEventListener("click", secondScreen);
startButton.addEventListener("click", renderCardsScreen);
startButton.addEventListener("click", hideCardsTimer);
