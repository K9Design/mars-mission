function Rover() {
  this.type = "rover";
  this.mapSize = [0, 0];
  this.position = [0, 0];
  this.bearing = "N";
  this.record = [];

  this.commandBot = (command) => {
    this.record.push(command);

    // init
    if (this.record.length === 1) this.mapSize = [command.split(" ")[0], command.split(" ")[1]];
    if (this.record.length === 2) {
      this.map = [command.split(" ")[0], command.split(" ")[1]];
      this.bearing = command.split(" ")[2];
    }
    //actions
    if (this.record.length > 2) {
      command.split("").forEach((direction) => this.action(direction));
      return "test";//this.position[0] + " " + this.position[1] + " " + this.bearing
    }
    //5 5
    // 1 2 N
    // LMLMLMLMM
    // -> 3 3 E
    return "";
  };

  this.action = (action) => {
    console.log(action);
  };

  this.validActions = ["M", "L", "R"];
}

module.exports = { Rover };
