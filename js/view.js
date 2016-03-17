var field = new Field();
var minedCells = [];
var MINE = -1;

var fieldView = document.getElementById('field');
var restartButton = document.getElementById('restart_button');
var cellsView;

var createFieldView = function createFieldF () {

  field.getCells().forEach(function (row) {

    var rowView = document.createElement('div');
    rowView.className = "row";
    fieldView.appendChild(rowView);

    row.forEach(function (cell) {
      var cellView = document.createElement('div');
      var cellData = document.createElement('p');

      cellView.className = "cell";
      cellData.innerHTML = cell;

      cellView.appendChild(cellData);
      rowView.appendChild(cellView);

    });
  });

  cellsView = document.getElementsByClassName('cell');
}

var updateFieldView = function updateFieldViewF () {
  minedCells = [];
  cellsView = document.getElementsByClassName('cell');

  for (var i = 0; i < cellsView.length; i++) {
    cellsView[i].firstChild.innerHTML = field.getCell(i);

    if (field.getCell(i) === MINE) {
      minedCells.push(cellsView[i]);
    }
  }
}

var openCell = function openCellF (event) {

  var cell = event.target.closest('[class=cell]');

  if (!cell) {
    return;
  }

  if (parseInt(cell.firstChild.innerHTML) === MINE) {

    var defeatDiv = document.getElementById('defeat');
    defeatDiv.style.display = 'block';

    showAllMines();
    fieldView.onclick = null;
  }

  else if (parseInt(cell.firstChild.innerHTML) === 0) {

    var rows = getRows();
    var cells = getCells();
    var currentRowIndex = rows.indexOf(cell.parentNode);
    var cellIndex = cells.indexOf(cell) - field.getHeight() * currentRowIndex;

    cell.firstChild.className = "visible";
    showNeighbours(currentRowIndex, cellIndex);

  }



  else if (cell.firstChild.className !== "visible") {
    cell.firstChild.className = "visible";
    var allOpened = document.getElementsByClassName('visible');

    if (allOpened.length === field.getSize() - minedCells.length) {
      var winDiv = document.getElementById('win');
      win.style.display = 'block';
      fieldView.onclick = null;
    }
  }

}

var collectAllNeighbours = function collectAllNeighboursF (y, x) {
  var firstItem = {
    value : field.getCell(y * field.getHeight() + x),
    y : y,
    x : x
  };

  var neighbours = field.getCellNeighbours(y, x);
  var cellQueue = [firstItem].concat(neighbours);
  var clickedArr = [firstItem];
  var alreadyChecked = 0;

  while(cellQueue.length > 0) {

    if (indexOf(clickedArr, cellQueue[0]) === MINE) {

      var clickedCell = cellQueue.shift();
      clickedArr.push(clickedCell);

      var clickedCellNeighbours = field.getCellNeighbours
                                    (clickedCell.y, clickedCell.x);

      var isBombAround = false;

      for (var i = 0; i < clickedCellNeighbours.length; i++) {

        if (clickedCellNeighbours[i].value === MINE) {
          isBombAround = true;
        }

      }

      if (!isBombAround) {
        cellQueue = cellQueue.concat(clickedCellNeighbours);
      }

    }

    else {
      cellQueue.shift();
    }

  }

  return clickedArr;
}

var indexOf = function indexOf(array, item) {

  for (var i = 0; i < array.length; i++) {
    if (array[i].x === item.x && array[i].y === item.y) {
      return i;
    }
  }

  return MINE;
}

var showNeighbours = function showNeighboursF(y, x) {

  var allCells = collectAllNeighbours(y, x);

  allCells.forEach(function (cell) {
    var cellView = getCell(cell.y, cell.x);
    cellView.firstChild.className = "visible";
    cellView.className = "cell empty";
  })

}

var validateFirstClick = function validateFirstClickF (event) {

  var cell = event.target.closest('[class=cell]');

  if (!cell) {
    return 0;
  }

  if (parseInt(cell.firstChild.innerHTML) <= 0) {

    while (parseInt(cell.firstChild.innerHTML) <= 0) {
      field = new Field();
      field.createMines().createTips();
      updateFieldView();
    }

  }

  cell.firstChild.className = "visible";

  return 1;
}

var showAllMines = function showAllMinesF () {

  minedCells.forEach(function (mine) {
    mine.className += " mine";
  });

}

var getRows = function getRowsF () {
  return Array.prototype.slice.call(fieldView.getElementsByClassName('row'));
}

var getCells = function getCellsF () {
  return Array.prototype.slice.call(fieldView.getElementsByClassName('cell'));
}

var getCell = function getCellF (rowNum, cellNum) {
  var index = rowNum * field.getHeight() + cellNum;
  return fieldView.getElementsByClassName('cell')[index];
}

createFieldView();

var onFieldClick = function onFieldClickF (event) {
  if (validateFirstClick(event) === 1) {
    validateFirstClick(event)
    fieldView.onclick = openCell;
  }
}

fieldView.onclick = onFieldClick;


restartButton.onclick = function () {
  field = new Field();
  fieldView.innerHTML = "";
  createFieldView();

  fieldView.onclick = onFieldClick;
}
