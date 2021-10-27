function MapController() {
  const mapSize = {};

  this.initMapSize = (xAxis, yAxis) => {
    if (xAxis === undefined || yAxis === undefined || isNaN(xAxis) || isNaN(yAxis))
      throw new Error("invalid parameter xAxis(" + xAxis + ") yAxis(" + yAxis + ")");
    mapSize.maxX = xAxis;
    mapSize.maxY = yAxis;
    mapSize.minX = 0;
    mapSize.minY = 0;
  };

  this.moveOutOfBounds = (x, y) => {
    if (mapSize.maxX === undefined) throw new Error("MapController not initiated");
    if (x === undefined || y === undefined || isNaN(x) || isNaN(y))
      throw new Error("invalid parameter x(" + x + ") y(" + y + ")");
    return x < mapSize.minX || x > mapSize.maxX - 1 || y < mapSize.minY || y > mapSize.maxY - 1;
  };
}

module.exports = { MapController };
