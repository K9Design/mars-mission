const {Rover} = require('./Rover')

let bot;

describe("Rover initiation", () => {
  
  test("initiate and setup map limit", () => {
    bot = new Rover();
    const orders = ["5 5"];

    bot.commandBot(orders.shift()); // mock
  });

  test("initiate and set position and bearing", () => {
    bot = new Rover();
    const orders = ["5 5", "1 2 N"];

    bot.commandBot(orders.shift()); //mock
    bot.commandBot(orders.shift()); //mock
  });

});

describe("Rover full simple tests", () => {
  test("initiate and run sequence", () => {
    bot = new Rover();
    const orders = ["5 5", "0 0 N", "M"];
    const reported = "0 1 N";

    bot.commandBot(orders.shift());
    bot.commandBot(orders.shift());
    expect( bot.commandBot( orders.shift()) ).toBe(reported);
  });

});

describe("Rover full single tests", () => {
  test("initiate and run full example sequence", () => {
    bot = new Rover();
    const orders = ["5 5", "1 2 N", "LMLMLMLMM"];
    const reported = "1 3 N";

    bot.commandBot(orders.shift());
    bot.commandBot(orders.shift());
    expect( bot.commandBot( orders.shift()) ).toBe(reported);
  });

  test("initiate and run full example sequence", () => {
    bot = new Rover();
    const orders = ["5 5", "3 3 E", "MMRMMRMRRM"];
    const reported = "5 1 E";

    bot.commandBot(orders.shift());
    bot.commandBot(orders.shift());
    expect( bot.commandBot( orders.shift()) ).toBe(reported);
  });
});

describe("Rover full multi commands ", () => {

  test("initiate and run double example sequence", () => {
    bot = new Rover();
    const orders = ["5 5", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"];
    const reported_first = "1 3 N";
    const reported_second = "5 1 E";

    bot.commandBot(orders.shift());
    bot.commandBot(orders.shift());
    expect( bot.commandBot( orders.shift()) ).toBe(reported_first);
    bot.commandBot(orders.shift());
    expect( bot.commandBot( orders.shift()) ).toBe(reported_second);
  });

  test("initiate and run 5 sequences", () => {
    bot = new Rover();
    const orders = ["5 5", "0 0 N", "MMMMR", "0 4 E", "MMMMR", "4 4 S", "MMMMR", "4 0 W", "MMMMR"];
    const results_expected = ["0 4 E", "4 4 S", "4 0 W", "0 0 N"];

    bot.commandBot(orders.shift());
    bot.commandBot(orders.shift());
    expect( bot.commandBot( orders.shift()) ).toBe(results_expected[0]);
    bot.commandBot(orders.shift());
    expect( bot.commandBot( orders.shift()) ).toBe(results_expected[1]);
    bot.commandBot(orders.shift());
    expect( bot.commandBot( orders.shift()) ).toBe(results_expected[2]);
    bot.commandBot(orders.shift());
    expect( bot.commandBot( orders.shift()) ).toBe(results_expected[3]);
  });

// Validation
// order of commands
// - numbers, bearings

  // Edge Cases
  // - go out of bounds
  
});
