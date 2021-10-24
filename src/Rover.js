function Rover() {
  console.log("--- NEW ROVER ---");
  this.type = "rover";
  this.mapSize = [0, 0];
  this.position = [0, 0];
  this.bearing = "N";
  this.record = [];
  const bearingsWheel = ["N", "E", "S", "W"];

  this.commandBot = (command) => {
    this.record.push(command);
    console.log("command[" + this.record.length + "]: " + command);

    // init
    if (this.record.length === 1) {
      this.mapSize = [command.split(" ")[0], command.split(" ")[1]];
    } else if (this.record.length === 2 || command.indexOf(" ") > -1) {

      this.position = [command.split(" ")[0], command.split(" ")[1]];
      this.bearing = command.split(" ")[2];
      console.log("    rebase -> " + this.position + " " + this.bearing + " ");

    } else if (this.record.length > 2) {
      console.log("  --> " + command);
      command.split("").forEach((direction) => this.action(direction));
      console.log("results: " + this.output());
      return this.output();
    }

    return null;
  };

  this.action = (action) => {
    console.log("     " + this.position + " " + this.bearing + "   -> " + action);

    if (action === "M") {
      switch (this.bearing) {
        case "N":
          this.position[1]++;
          break;
        case "E":
          this.position[0]++;
          break;
        case "S":
          this.position[1]--;
          break;
        case "W":
          this.position[0]--;
          break;
      }
    }
    if (action === "L") {
      let bearingIndex = bearingsWheel.findIndex(currentBearing => this.bearing === currentBearing);
      this.bearing = bearingIndex === 0 ? bearingsWheel[bearingsWheel.length-1] : bearingsWheel[bearingIndex-1];
    }
    if (action === "R") {
      let bearingIndex = bearingsWheel.findIndex(currentBearing => this.bearing === currentBearing);
      this.bearing = bearingIndex === bearingsWheel.length-1 ? bearingsWheel[0] : bearingsWheel[bearingIndex+1];
    }
  };

  this.output = () => {
    return this.position[0] + " " + this.position[1] + " " + this.bearing;
  };
  this.validActions = ["M", "L", "R"];
}

module.exports = { Rover };
