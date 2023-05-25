const { it } = require("@jest/globals");
const renderCardsScreenTest = require("./engine");

it("should create card src name and put it in the globalGameState object", () => {
    const globalGameState = {};
    expect(renderCardsScreenTest(globalGameState)).not.toBeNull();
    console.log(globalGameState);
});
