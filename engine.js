function renderCardsScreenTest(globalGameState) {
    const suits = ["diamonds", "hearts", "clubs", "spades"];
    const ranks = ["6", "7", "8", "9", "10", "Q", "K", "J", "A"];
    let cardsQuantity = 6;
    let k = 0;
    for (let i = 0; i < cardsQuantity / 2; i++) {
        k++;
        globalGameState[k + 0] = `${ranks[i]}.${suits[i]}.png`;
        globalGameState[k + cardsQuantity / 2] = `${ranks[i]}.${suits[i]}.png`;
    }
}

module.exports = renderCardsScreenTest;
