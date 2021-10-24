function Rover() {
  //console.log("--- NEW ROVER ---");
  this.type = "rover";
  this.mapSize = { x: 0, y: 0 };
  this.position = { x: 0, y: 0 }; //[0, 0];
  this.bearing = "N";
  this.record = [];
  const bearingsWheel = ["N", "E", "S", "W"];
  const moveWheel = [{ y: 1 }, { x: 1 }, { y: -1 }, { x: -1 }];

  this.commandBot = (command) => {
    this.record.push(command);
    //console.log("command[" + this.record.length + "]: " + command);

    // init
    if (this.record.length === 1) {
      this.mapSize.x = command.split(" ")[0];
      this.mapSize.y = command.split(" ")[1];
    } else if (this.record.length === 2 || command.indexOf(" ") > -1) {
      this.position.x = command.split(" ")[0];
      this.position.y = command.split(" ")[1];
      this.bearing = command.split(" ")[2];
      //console.log("    rebase -> " + this.position + " " + this.bearing + " ");
    } else if (this.record.length > 2) {
      //console.log("  --> " + command);
      command.split("").forEach((direction) => this.action(direction));
      //console.log("results: " + this.output());
      return this.output();
    }

    return null;
  };

  this.action = (action) => {
    //console.log("     " + this.position + " " + this.bearing + "   -> " + action);
    let bearingIndex = bearingsWheel.findIndex((currentBearing) => this.bearing === currentBearing);

    if (action === "M") {
      let axis = Object.keys(moveWheel[bearingIndex])[0];
      let moveChange = moveWheel[bearingIndex][axis];
      this.position[axis] = Number(this.position[axis]) + moveChange;
    }
    if (action === "L")
      this.bearing = bearingIndex === 0 ? bearingsWheel[bearingsWheel.length - 1] : bearingsWheel[bearingIndex - 1];

    if (action === "R")
      this.bearing = bearingIndex === bearingsWheel.length - 1 ? bearingsWheel[0] : bearingsWheel[bearingIndex + 1];
  };

  this.output = () => {
    return this.position.x + " " + this.position.y + " " + this.bearing;
  };


  this.validActions = ["M", "L", "R"];
}

module.exports = { Rover };
