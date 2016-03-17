var Field = (function () {

  var MINE = -1;
  var EMPTY = 0;

  var cells = [];
  var width = 0;
  var height = 0;
  var minesAmount = 0;

  function Field (w, h, minesNum) {

    width = w || 9;
    height = h || width;
    minesAmount = minesNum || 14;

    this.generate();

  };

  Field.prototype.generate = function generateF () {

    for (var i = 0; i < height; i++) {
      cells[i] = [];

      for (var j = 0; j < width; j++) {
        cells[i][j] = EMPTY;
      }
    }

    return this;

  };

  Field.prototype.createMines = function createMinesF () {

    var i = 0;
    while (i < minesAmount) {

      var x = Math.floor(Math.random() * width);
      var y = Math.floor(Math.random() * height);

      if (cells[y][x] !== MINE) {

        cells[y][x] = MINE;
        i++;

      }
    }

    return this;

  };

  Field.prototype.createTips = function createTipsF () {

    for (var i = 0; i < height; i++) {

      for (var j = 0; j < width; j++) {

        if (cells[i][j] === MINE) {
          continue;
        }

        var mineCounter = 0;

        if (cells[i][j - 1] && cells[i][j - 1] === MINE) {
          mineCounter++;
        }

        if (cells[i][j + 1] && cells[i][j + 1] === MINE) {
          mineCounter++;
        }

        if (cells[i - 1] && cells[i - 1][j] === MINE) {
          mineCounter++;
        }

        if (cells[i + 1] && cells[i + 1][j] === MINE) {
          mineCounter++;
        }

        if (cells[i - 1] && cells[i - 1][j - 1]
          && cells[i - 1][j - 1] === MINE) {

          mineCounter++;
        }

        if (cells[i - 1] && cells[i - 1][j + 1]
          && cells[i - 1][j + 1] === MINE) {

          mineCounter++;
        }

        if (cells[i + 1] && cells[i + 1][j + 1] &&
          cells[i + 1][j + 1] === MINE) {

          mineCounter++;
        }

        if (cells[i + 1] && cells[i + 1][j - 1] &&
          cells[i + 1][j - 1] === MINE) {

          mineCounter++;
        }

        cells[i][j] = mineCounter;
      }
    }

    return this;

  };

  Field.prototype.getCells = function getCellsF () {
    return cells;
  }

  Field.prototype.getSize = function getSizeF () {
    return width * height;
  }

  Field.prototype.getWidth = function getWidthF () {
    return width;
  }

  Field.prototype.getHeight = function getHeightF () {
    return height;
  }

  Field.prototype.getMinesAmount = function getMinesAmountF () {
    return minesAmount;
  }

  Field.prototype.getCell = function getCellF (index) {
    return index < width ? cells[0][index] :
    cells[Math.floor(index / height)][index % width];
  }

  Field.prototype.getCellNeighbours = function getCellNeighboursF (y, x) {

    var neighbours = [];

    var outerLoopStart = y - 1 > 0 ? y - 1 : 0;
    var innerLoopStart = x - 1 > 0 ? x - 1 : 0;
    var outerLoopFinish = y + 1 > height - 1 ? height - 1 : y + 1;
    var innerLoopFinish = x + 1 > width - 1 ? width - 1 : x + 1;

    while (outerLoopStart <= outerLoopFinish) {

      while (innerLoopStart <= innerLoopFinish) {
        
        if (!(outerLoopStart === y && innerLoopStart === x)) {
          neighbours.push({
            value: cells[outerLoopStart][innerLoopStart],
            x: innerLoopStart,
            y: outerLoopStart
          });
        }
        innerLoopStart++;
      }

      innerLoopStart = x - 1 > 0 ? x - 1 : 0;
      outerLoopStart++;
    }

    return neighbours;
  }

  return Field;

})();
