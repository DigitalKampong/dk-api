function fmtErrorResp(err: Error) {
  return {
    name: err.name,
    message: err.message,
  };
}

export { fmtErrorResp };
