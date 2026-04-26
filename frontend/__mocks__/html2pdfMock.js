const html2pdf = () => ({
  set: () => ({ from: () => ({ save: () => Promise.resolve() }) }),
});
module.exports = html2pdf;
module.exports.default = html2pdf;
