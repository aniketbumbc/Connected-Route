const {
  getConnectedRoute,
  getInitialSource,
  generateInputPathObj,
} = require('./connectedRoute');

test('should generate correct connected route based on 2D path', () => {
  /** Arrange */
  const expectedResult = 'Halifax,Montreal,Toronto,Chicago,Winnipeg,Seattle';
  const inputArray = [
    ['Chicago', 'Winnipeg'],
    ['Toronto', 'Chicago'],
    ['Halifax', 'Montreal'],
    ['Montreal', 'Toronto'],
    ['Winnipeg', 'Seattle'],
  ];

  /** Act */
  const actualResult = getConnectedRoute(inputArray);

  /** Assert */
  expect(actualResult).toEqual(expectedResult);
});

test('Should throw error in case on incorrect input array', () => {
  /** Arrange */
  const inputArray = [[]];

  /** Act */
  try {
    getConnectedRoute(inputArray);
  } catch (e) {
    /** Assert */
    expect(e.message).toEqual(
      'Please check input, input should be in valid format source and destination [[s1, d1], [s2, d2]]'
    );
  }
});

test('Should generate correct input object based on 2D array', () => {
  /** Arrange */
  const expectedResult = {
    Chicago: 'Winnipeg',
    Halifax: 'Montreal',
    Montreal: 'Toronto',
    Toronto: 'Chicago',
    Winnipeg: 'Seattle',
  };
  const inputArray = [
    ['Chicago', 'Winnipeg'],
    ['Toronto', 'Chicago'],
    ['Halifax', 'Montreal'],
    ['Montreal', 'Toronto'],
    ['Winnipeg', 'Seattle'],
  ];

  /** Act */
  const actualResult = generateInputPathObj(inputArray);

  /** Assertion */
  expect(expectedResult).toMatchObject(actualResult);
});

test('Should compute correct initial source from inputPathObj', () => {
  /** Arrange */
  const inputObj = {
    Chicago: 'Winnipeg',
    Halifax: 'Montreal',
    Montreal: 'Toronto',
    Toronto: 'Chicago',
    Winnipeg: 'Seattle',
  };

  /** Act */
  const result = getInitialSource(inputObj);

  /** Assertion */
  expect(result).toEqual('Halifax');
});
