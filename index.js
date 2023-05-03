const levelsCont = document.querySelector(".levels");
const globalGameState = {};
const container = document.querySelector(".container");

levels = {
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
    const items = levelsCont.children;
    console.log(items);
    for (let i = 0; i < items.length; i++) {
        if (items[i].classList.contains("level__chosen")) {
            items[i].classList.remove("level__chosen");
        }
    }

    let target = event.target;
    globalGameState.difficulty = target.className;
    console.log(globalGameState.difficulty);
    target.classList.add("level__chosen");
    console.log(target);
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
    let cardQuantity = 0;
    container.remove();
    if (globalGameState.difficulty in levels) {
        console.log(globalGameState.difficulty);
    }
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
}

const suits = [" ", "diamonds", "hearts", "clubs", "spades"];
const ranks = ["6", "7", "8", "9", "10", "Q", "K", "J", "A"];

levelsCont.addEventListener("click", chooseLevel);
startButton.addEventListener("click", secondScreen);
