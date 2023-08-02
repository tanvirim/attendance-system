const error = (message = "something wrong happend", status = 400) => {
  const e = new Error(message);

  e.status = status;
  return e;
};

module.exports = error;
