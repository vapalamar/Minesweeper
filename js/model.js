var Field = (function () {

  var MINE = -1;
  var EMPTY = 0;

  function Field (width, height, minesAmount) {

    this.width = width || 9;
    this.height = height || this.width;
    this.minesAmount = minesAmount || 14;
    this.cells = [];

  };

  Field.prototype.generate = function generateF () {

    for (var i = 0; i < this.height; i++) {
      this.cells[i] = [];

      for (var j = 0; j < this.width; j++) {
        this.cells[i][j] = EMPTY;
      }
    }

  };

  Field.prototype.createMines = function createMinesF () {

    var i = 0;
    while (i < this.minesAmount) {

      var x = Math.floor(Math.random() * this.width);
      var y = Math.floor(Math.random() * this.height);

      if (this.cells[y][x] !== MINE) {

        this.cells[y][x] = MINE;
        i++;

      }
    }

  };

  Field.prototype.createTips = function createTipsF () {

    for (var i = 1; i < this.height - 1; i++) {

      for (var j = 1; j < this.width - 1; j++) {

        if (this.cells[i][j] === MINE) {
          continue;
        }

        var mineCounter = 0;

        if (this.cells[i][j - 1] === MINE) {
          mineCounter++;
        }

        if (this.cells[i][j + 1] === MINE) {
          mineCounter++;
        }

        if (this.cells[i - 1][j] === MINE) {
          mineCounter++;
        }

        if (this.cells[i + 1][j] === MINE) {
          mineCounter++;
        }

        if (this.cells[i - 1][j - 1] === MINE) {
          mineCounter++;
        }

        if (this.cells[i - 1][j + 1] === MINE) {
          mineCounter++;
        }

        if (this.cells[i + 1][j + 1] === MINE) {
          mineCounter++;
        }

        if (this.cells[i + 1][j - 1] === MINE) {
          mineCounter++;
        }

        this.cells[i][j] = mineCounter;
      }
    }

  };

  return Field;

})();
