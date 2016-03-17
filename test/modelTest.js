var expect = chai.expect;

describe('Field constructor', function () {
  it('should return an object', function () {
    expect(new Field()).to.be.a('object');
  });
});

describe('Get functions', function () {
  var field = new Field();

  it('should have a getWidth() function which returns a number', function () {
    expect(field).to.have.property('getWidth');
    expect(field.getWidth()).to.be.a('number');
  });

  it('should have a getHeight() function which returns a number', function () {
    expect(field).to.have.property('getHeight');
    expect(field.getHeight()).to.be.a('number');
  });

  it('should have a getMinesAmount() function which returns a number',
  function () {
    expect(field).to.have.property('getMinesAmount');
    expect(field.getMinesAmount()).to.be.a('number');
  });

  it('should have a getCells() property which returns an array', function () {
    expect(field).to.have.property('getCells');
    expect(field.getCells()).to.be.a('array');
  });
});

describe('Field generate function', function () {
  var field = new Field();

  it('has to be a function', function () {
    expect(field.generate).to.be.a('function');
  });

  it('should modify cells into two-dimensional array', function () {
    expect(field.getCells()[0]).to.be.a('array');
  });
});

describe('Create mines function', function () {
  var field = new Field(5, 5, 6);

  it('has to be a function', function () {
    expect(field.createMines).to.be.a('function');
  });

  it('should set random cells values to -1', function () {
    var count = 0;

    field.getCells().forEach(function (inner) {
      inner.forEach(function (item) {

        if (item === -1) {
          count++;
        }

      });
    });

    expect(count).to.equal(field.getMinesAmount());
  });
});

describe('Create tips function', function () {
  var field = new Field();

  it('has to be a function', function () {
    expect(field.createTips).to.be.a('function');
  });

  it('should create game tips which would show how many mines lay around',
  function () {

    //any cell
    var cells = field.getCells();
    var cellValue = cells[3][3];
    var pretenders = [cells[2][2], cells[2][3], cells[2][4], cells[3][2],
                cells[3][4], cells[4][2], cells[4][3], cells[4][4]].filter(
                  function (item) { return item === -1; });
    expect(cellValue).to.equal(pretenders.length);
  });
});
