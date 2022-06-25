module.exports = (fn) => (async (res, req, next) => {
  try {
    await fn(res, req, next);
  } catch (err) {
    next(err);
  }
});
