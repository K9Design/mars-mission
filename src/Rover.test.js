const {Rover} = require('./Rover')

let bot;

xdescribe("Rover initiation", () => {
  
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

xdescribe("Rover full simple tests", () => {
  test("initiate and run sequence", () => {
    bot = new Rover();
    const orders = ["5 5", "0 0 N", "M"];
    const reported = "0 1 N";

    bot.commandBot(orders.shift());
    bot.commandBot(orders.shift());
    expect( bot.commandBot( orders.shift()) ).toBe(reported);
  });

});

xdescribe("Rover full single tests", () => {
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
});
