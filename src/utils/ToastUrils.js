const Timeout = async (ms) =>
  // eslint-disable-next-line prefer-promise-reject-errors
  new Promise((_, reject) => setTimeout(reject("timeout"), ms));

// eslint-disable-next-line import/prefer-default-export
export { Timeout };
