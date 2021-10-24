function Rover() {
  this.type = "rover";
  this.mapSize = [0, 0];
  this.position = [0, 0];
  this.bearing = "N";
  this.record = [];

  this.commandBot = (command) => {
    console.log("command["+this.record.length+"]: "+ command);
    this.record.push(command);

    // init
    if (this.record.length === 1) this.mapSize = [command.split(" ")[0], command.split(" ")[1]];
    if (this.record.length === 2) {
      this.map = [command.split(" ")[0], command.split(" ")[1]];
      this.bearing = command.split(" ")[2];
    }
    //actions
    if (this.record.length > 2) {
      console.log("  --> "+ command);
      command.split("").forEach((direction) => this.action(direction));
      return this.output();
    }

    return null;
  };

  this.action = (action) => {
    if(action === "M"){
      switch(this.bearing){
        case "N": this.position[1]++; break;
        case "E": this.position[0]++; break;
        case "S": this.position[1]--; break;
        case "W": this.position[0]--; break;
      }
    }
    if(action === "L"){
      switch(this.bearing){
        case "N": this.bearing = "W"; break;
        case "E": this.bearing = "N"; break;
        case "S": this.bearing = "E"; break;
        case "W": this.bearing = "S"; break;
      }
    }
    if(action === "R"){
      switch(this.bearing){
        case "N": this.bearing = "E"; break;
        case "E": this.bearing = "S"; break;
        case "S": this.bearing = "W"; break;
        case "W": this.bearing = "N"; break;
      }
    }
    console.log("   ["+action+"] "+this.output());
  };

  this.output = () => {
    return this.position[0] + " " + this.position[1] + " " + this.bearing
  }
  this.validActions = ["M", "L", "R"];
}

module.exports = { Rover };
