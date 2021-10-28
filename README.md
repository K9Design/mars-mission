# Rover - Mars Mission
By Hagen L

A Mars Rover simulation - controlled by only 3 commands.

### Requirement: 

- Node (stable) v17.0.1
- eslint v7.32.0
- jest v25.2.4 (for testing)

### Usage: 
```javascript
const { Rover } = require("./Rover");
const bot = new Rover();

// commands in needed order
// first command
bot.commandInput("5 5"); // sets the map size maximum x-axis, y-axis. Minimum x-axis and y-axis is 0.

// second command
bot.commandInput("1 3 E"); // rover placement. x-axis / y-axis / bearing ((N)orth (E)ast (S)outh (W)est)

// third command
const output = bot.commandInput("MMRMMRMRRM"); // move orders. (M)ove 1 forward in bearing direction. Rotate (L)eft, rotate (R)ight
console.log(output) // > 3 1 E 
// third command will output the rovers new position
. 
. // second command and third command can be repeated indefinitely
.
```
### Unit Testing: 

> npm test

# Background

### Approach: 
In this project I tried a TDD approach, which went sideways as soon as I had it planned on paper. After spending some time building a light framework of function classes, variables and data, I started testing. After doing the first few tests to check test connectivity, I deleted most of the framework and did one step at a time TDD style, beginning with the Rover. Rover being initiated in the test, and MapController initiated in each Rover. It didn't always go red/green refactor, but tried most of the time.

Both rover and MapController are function classes with their own public ( this.something() / this.variable) and private (const function() / const variable) methods and variables.

### Assumptions and Considerations: 
- Rovers are invisible to eachother and can't interact to each other
- It is expected that movement orders bringing the Rover outside the plateau bounds will throw an error, and not automatically course correct the bot.

### Testing

I made a range of tests for each script covering parameter validation, commands in right order, correct movement and rotation and checking for movement off the plateau. I used spy on commands that did respons information back, to check that they ran.


# Future considerations

I decided to make the two main scripts Rover and MapController as function classes, but could be real Classes in the future. The idea was to keep in open for multible instances of Rovers and future vehicles with a static map to keep an overview.

The Rover and other bots could be a subclass of a Vehicle class. All with their own set of actions like LRM, and future (U)p, (D)own, dig, scan, shoot, rotations in smaller degrees etc.

A CommandCenter class could manage the vehicles and give them orders.

The MapController could keep track of all the vehicles, check for when vehicles are in same space, maybe add a z-axis for flying/digging bots, as well handle different shaped maps and their boundaries in 2D/3D space.

