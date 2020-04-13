const stubLastCommit = {
  hash: `asd1234`,
  message: `Very important fix`,
  branch: `master`,
  author: `Max Poliakov`
};

const stubCommit = {
  hash: `qwert69`,
  message: `Refactoring`,
  branch: `branch`,
  author: `Max Poliakov`
};

const mockClone = jest.fn();
const mockCheckout = jest.fn();
const mockGetCommit = jest.fn().mockImplementation(() => Promise.resolve(stubCommit));
const mockGetLastCommit = jest.fn().mockImplementation(() => Promise.resolve(stubLastCommit));

const GitHelper = jest.fn().mockImplementation(() => {
  return {
    clone: mockClone,
    checkout: mockCheckout,
    getCommit: mockGetCommit,
    getLastCommit: mockGetLastCommit
  };
});

module.exports = {
  mockClone,
  mockCheckout,
  mockGetCommit,
  mockGetLastCommit,
  GitHelper
};
