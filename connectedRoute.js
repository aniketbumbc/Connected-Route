/**
 * Method @getConnectedRoute return connected route.
 * It call generateInputPathObj which gives path object
 * create soucre,destination and connected path array for computeConnectedPath method.
 *
 * @param {*} inputPath 2D array which contain source and destination.
 */

const getConnectedRoute = (inputPath) => {
  try {
    if (!Array.isArray(inputPath) || !inputPath[0].length) {
      throw Error(
        "Please check input, input should be in valid format source and destination [['s1', 'd1'], ['s2', 'd2']]"
      );
    }
    const inputPathObj = generateInputPathObj(inputPath);
    let source = getInitialSource(inputPathObj);
    let destination = inputPathObj[source];
    let connectedPath = [source, destination];
    return computeConnectedPath(destination, inputPathObj, connectedPath);
  } catch (error) {
    console.error(error.message);
  }
};

/***
 * Method @generateInputPathObj accept 2D array.
 * Return object as soucre is a key and destination as a value.
 *  @param inputPath 2D array
 */

const generateInputPathObj = (inputPath) => {
  const inputPathObj = {};
  inputPath.forEach((ele) => {
    let source = ele[0];
    let destination = ele[1];
    inputPathObj[source] = destination;
  });
  return inputPathObj;
};

/**
 *  Method @computeConnectedPath compute path based on nextDestination.
 *  @return {*} connectedPath array of string
 * @param {*} destination
 * @param {*} inputPathObj
 * @param {*} connectedPath
 */

const computeConnectedPath = (destination, inputPathObj, connectedPath) => {
  let nextDestination = inputPathObj[destination];

  if (nextDestination !== undefined) {
    connectedPath.push(nextDestination);
    computeConnectedPath(nextDestination, inputPathObj, connectedPath);
  }
  return connectedPath.toString();
};

/**
 *  Method @getInitialSource calculate initial source based on objects keys.
 * If objects key is not present in values ie startSoucre.
 * @param {*} inputPathObj
 */

const getInitialSource = (inputPathObj) => {
  const objSourceKeys = Object.keys(inputPathObj);
  const objDestinationValues = Object.values(inputPathObj);
  let startSource;

  objSourceKeys.filter((source) => {
    if (!objDestinationValues.includes(source)) {
      startSource = source;
    }
  });
  return startSource;
};

console.log(
  getConnectedRoute([
    ['MNL', 'TAG'],
    ['CEB', 'TAC'],
    ['TAG', 'CEB'],
    ['TAC', 'BER'],
  ])
);

console.log(
  getConnectedRoute([
    ['Chicago', 'Winnipeg'],
    ['Toronto', 'Chicago'],
    ['Halifax', 'Montreal'],
    ['Montreal', 'Toronto'],
    ['Winnipeg', 'Seattle'],
  ])
);

//getConnectedRoute([[]]);

module.exports = {
  getConnectedRoute,
  getInitialSource,
  generateInputPathObj,
};
