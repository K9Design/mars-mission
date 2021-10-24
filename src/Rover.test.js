


const {Rover} = require('./Rover')

const bot = new Rover();

describe("Rover initiation test", () => {
  test("initiate and run sequence", () => {
    const orders = ["5 5", "1 2 N", "LMLMLMLMM"];
    const reported = "3 3 E";

    expect( bot.commandBot(orders.shift()) ).toBe(null);
    expect( bot.commandBot(orders.shift()) ).toBe(null);
    expect( bot.commandBot(orders.shift()) ).toBe(reported);
  });

});



