const { Rover } = require("./Rover");
let bot;

describe("Rover throws", () => {
  test("bad commands - strings", () => {
    bot = new Rover();
    expect(() => bot.commandInput("5 F")).toThrow("invalid command parameter");
  });

  test("bad commands - strings", () => {
    bot = new Rover();
    expect(() => bot.commandInput("5 9 9 N")).toThrow("invalid command parameter");
  });

  test("initiate wrong order of commands 1", () => {
    bot = new Rover();
    const orders = ["0 0 E", "5 5", "MMLL"];

    expect(() => bot.commandInput(orders.shift())).toThrow("unexpect command in wrong order");
  });
  test("initiate wrong order of commands 2", () => {
    bot = new Rover();
    const orders = ["0 0 E", "5 5", "MMLL"];

    expect(() => bot.commandInput(orders.shift())).toThrow("unexpect command in wrong order");
  });
  test("initiate wrong order of commands 3", () => {
    bot = new Rover();
    const orders = ["MMLL", "0 0 S", "5 5"];

    expect(() => bot.commandInput(orders.shift())).toThrow("unexpect command in wrong order");
  });
});

describe("Rover initiation", () => {
  test("initiate and setup map limit", () => {
    bot = new Rover();
    const orders = ["5 5"];

    const spy = jest.spyOn(bot, "commandInput");
    bot.commandInput(orders.shift());
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("initiate and set position and bearing", () => {
    bot = new Rover();
    const orders = ["5 5", "1 2 N"];

    const spy = jest.spyOn(bot, "commandInput");
    bot.commandInput(orders.shift());
    expect(spy).toHaveBeenCalledTimes(1);
    bot.commandInput(orders.shift());
    expect(spy).toHaveBeenCalledTimes(2);
  });
});

describe("Rover full simple tests", () => {
  test("initiate and run sequence", () => {
    bot = new Rover();
    const orders = ["5 5", "0 0 N", "M"];
    const reported = "0 1 N";

    bot.commandInput(orders.shift());
    bot.commandInput(orders.shift());
    expect(bot.commandInput(orders.shift())).toBe(reported);
  });
});

describe("Rover full single tests", () => {
  test("initiate and run full example sequence 1", () => {
    bot = new Rover();
    const orders = ["5 5", "1 2 N", "LMLMLMLMM"];
    const reported = "1 3 N";

    bot.commandInput(orders.shift());
    bot.commandInput(orders.shift());
    expect(bot.commandInput(orders.shift())).toBe(reported);
  });

  test("initiate and run full example sequence 2", () => {
    bot = new Rover();
    const orders = ["5 5", "1 3 E", "MMRMMRMRRM"];
    const reported = "3 1 E";

    bot.commandInput(orders.shift());
    bot.commandInput(orders.shift());
    expect(bot.commandInput(orders.shift())).toBe(reported);
  });
});

describe("Rover full multi commands ", () => {
  test("initiate and run double example sequence", () => {
    bot = new Rover();
    const orders = ["5 5", "1 2 N", "LMLMLMLMM", "1 3 E", "MMRMMRMRRM"];
    const results_expected = ["1 3 N", "3 1 E"];

    bot.commandInput(orders.shift());
    bot.commandInput(orders.shift());
    expect(bot.commandInput(orders.shift())).toBe(results_expected[0]);
    bot.commandInput(orders.shift());
    expect(bot.commandInput(orders.shift())).toBe(results_expected[1]);
  });

  test("initiate and run 4 sequences", () => {
    bot = new Rover();
    const orders = ["5 5", "0 0 N", "MMMMR", "0 4 E", "MMMMR", "4 4 S", "MMMMR", "4 0 W", "MMMMR"];
    const results_expected = ["0 4 E", "4 4 S", "4 0 W", "0 0 N"];

    bot.commandInput(orders.shift());
    bot.commandInput(orders.shift());
    expect(bot.commandInput(orders.shift())).toBe(results_expected[0]);
    bot.commandInput(orders.shift());
    expect(bot.commandInput(orders.shift())).toBe(results_expected[1]);
    bot.commandInput(orders.shift());
    expect(bot.commandInput(orders.shift())).toBe(results_expected[2]);
    bot.commandInput(orders.shift());
    expect(bot.commandInput(orders.shift())).toBe(results_expected[3]);
  });
});

describe("initiate, run sequence outside of map bounds", () => {
  test("move outside North", () => {
    bot = new Rover();
    const orders = ["5 5", "5 5 N", "M"];

    bot.commandInput(orders.shift());
    bot.commandInput(orders.shift());
    expect(() => bot.commandInput(orders.shift())).toThrow("Rover moved outside of map area");
  });

  test("move outside East", () => {
    bot = new Rover();
    const orders = ["5 5", "5 5 E", "M"];

    bot.commandInput(orders.shift());
    bot.commandInput(orders.shift());
    expect(() => bot.commandInput(orders.shift())).toThrow("Rover moved outside of map area");
  });

  test("move outside South", () => {
    bot = new Rover();
    const orders = ["5 5", "0 0 W", "M"];

    bot.commandInput(orders.shift());
    bot.commandInput(orders.shift());
    expect(() => bot.commandInput(orders.shift())).toThrow("Rover moved outside of map area");
  });

  test("move outside West", () => {
    bot = new Rover();
    const orders = ["5 5", "0 0 S", "M"];

    bot.commandInput(orders.shift());
    bot.commandInput(orders.shift());
    expect(() => bot.commandInput(orders.shift())).toThrow("Rover moved outside of map area");
  });
});

// mock / spy checks
// for each tests?
