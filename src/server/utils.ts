const delay = (ms: number) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

const convertStdoutToCommitObj = (stdout: string) => {
  const segments = stdout.split(`|`);

  return {
    hash: segments[0],
    author: segments[1],
    message: segments[2],
    branch: null // segments[3]
  };
};

export {
  delay,
  convertStdoutToCommitObj,
};
