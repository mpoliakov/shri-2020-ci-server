const mockRequest = (mock = {}) => {
  const req = {
    body: jest.fn(),
    params: jest.fn()
  };

  return Object.assign({}, req, mock);
};

const mockResponse = (mock = {}) => {
  const res = {};

  res.send = jest.fn();
  res.status = jest.fn();
  res.json = jest.fn().mockReturnValue(res);

  return Object.assign({}, res, mock);
};

module.exports = {
  mockRequest,
  mockResponse
};
