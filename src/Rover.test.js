const {Rover} = require('./Rover')

let bot;

describe("Rover initiation", () => {
  bot = new Rover();
  test("initiate and setup map limit", () => {
    const orders = ["5 5", "1 2 N"];

    bot.commandBot(orders.shift()); // mock
  });

  bot = new Rover();
  test("initiate and set position and bearing", () => {
    const orders = ["5 5", "1 2 N"];

    bot.commandBot(orders.shift()); //mock
    bot.commandBot(orders.shift()); //mock
  });

});

xdescribe("Rover full simple tests", () => {
  bot = new Rover();
  test("initiate and run sequence", () => {
    const orders = ["5 5", "0 0 N", "M"];
    const reported = "0 1 N";

    bot.commandBot(orders.shift());
    bot.commandBot(orders.shift());
    expect( bot.commandBot( orders.shift()) ).toBe(reported);
  });

});

xdescribe("Rover full tests", () => {
  bot = new Rover();
  test("initiate and run full example sequence", () => {
    const orders = ["5 5", "1 2 N", "LMLMLMLMM"];
    const reported = "3 3 E";

    bot.commandBot(orders.shift());
    bot.commandBot(orders.shift());
    expect( bot.commandBot( orders.shift()) ).toBe(reported);
  });

});
