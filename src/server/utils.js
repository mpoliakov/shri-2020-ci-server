const delay = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

const convertStdoutToCommitObj = (stdout) => {
  const segments = stdout.toString().split(`|`);

  return {
    hash: segments[0],
    author: segments[1],
    message: segments[2],
    branch: null // segments[3]
  };
};

module.exports = {
  delay,
  convertStdoutToCommitObj,
};
