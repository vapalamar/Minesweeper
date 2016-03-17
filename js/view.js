var field = new Field();

var fieldView = document.getElementById('field');
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
  var cellsView = document.getElementsByClassName('cell');
  for (var i = 0; i < cellsView.length; i++) {
    cellsView[i].firstChild.innerHTML = field.getCell(i);
  }
}

var openCell = function openCellF (event) {
  console.log('fired');
  var cell = event.target.closest('[class=cell]');
  if (!cell) {
    console.log(cell);
    return;
  }
  else {
    cell.firstChild.style.visibility = "visible";
  }

}

var validateFirstClick = function validateFirstClickF (event) {
  var cell = event.target.closest('[class=cell]');

  field.createMines().createTips();
  updateFieldView();

  if(!cell) {
    return;
  }

  if (cell.firstChild.innerHTML <= 0) {
    while (cell.firstChild.innerHTML <= 0) {
      field = new Field();
      field.createMines().createTips();
      updateFieldView();
    }
  }
  cell.firstChild.style.visibility = "visible";
}

createFieldView();

fieldView.onclick = function (event) {
  validateFirstClick(event);
  fieldView.onclick = openCell;
}
