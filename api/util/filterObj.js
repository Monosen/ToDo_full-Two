const filterObj = (obj, ...allowedFields) => {
  newObj = {};

  Object.keys(obj).forEach((el) => {
    if (el.includes(allowedFields)) {
      newObj[el] = obj[el];
    }
  });

  return newObj;
};

module.exports = { filterObj };
