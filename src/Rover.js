const { MapController } = require("./MapController");
const mapController = new MapController();

function Rover() {
  this.type = "rover";
  this.position = { x: 0, y: 0 }; 
  this.bearing = "N";
  this.commandRecords = [];

  const bearingsWheel = ["N", "E", "S", "W"];
  const moveWheel = [{ y: 1 }, { x: 1 }, { y: -1 }, { x: -1 }];

  this.commandInput = (command) => {
    const commandSection = command.split(" ");
    if (!validateCommand(command) || commandSection.length > 3) throw new Error("invalid command parameter");
    this.commandRecords.push(command);

    if (commandSection.length === 2 && this.commandRecords.length === 1) {
      doCommand("init", commandSection);
    } else if (commandSection.length === 3 && this.commandRecords.length > 1) {
      doCommand("placement", commandSection);
    } else if (commandSection.length === 1 && this.commandRecords.length > 1) {
      doCommand("move", commandSection);
    } else throw new Error("unexpect command in wrong order");

    return reportLocationAndBearing();
  };

  const doCommand = (commandType, commandSection) => {
    if (commandType === "init") {
      mapController.initMapSize(commandSection[0], commandSection[1]);
    } else if (commandType === "placement") {
      this.position.x = commandSection[0];
      this.position.y = commandSection[1];
      this.bearing = commandSection[2];
    } else if (commandType === "move") {
      commandSection[0].split("").forEach((action) => doAction(action));
    }
  };

  const doAction = (action) => {
    const bearingIndex = bearingsWheel.findIndex((currentBearing) => this.bearing === currentBearing);

    if (action === "M") {
      const axis = Object.keys(moveWheel[bearingIndex])[0];
      const moveChange = moveWheel[bearingIndex][axis];
      this.position[axis] = Number(this.position[axis]) + moveChange;
      if (mapController.moveOutOfBounds(this.position.x, this.position.y))
        throw new Error("Rover moved outside of map area");
    }
    if (action === "L")
      this.bearing = bearingIndex === 0 ? bearingsWheel[bearingsWheel.length - 1] : bearingsWheel[bearingIndex - 1];

    if (action === "R")
      this.bearing = bearingIndex === bearingsWheel.length - 1 ? bearingsWheel[0] : bearingsWheel[bearingIndex + 1];
  };

  const reportLocationAndBearing = () => {
    return this.position.x + " " + this.position.y + " " + this.bearing;
  };
}

const validateCommand = (command) => {
  if (command === undefined) return false;
  return command.replace(/[0-9NESWMLR\ ]+/g, "").length === 0;
};

module.exports = { Rover };
