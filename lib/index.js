function onError (err) {
  throw err /* ↓ Check stack trace ↓ */
}

module.exports = function (filename, opts) {
  const jiti = require('../dist/jiti')

  opts = { onError, ...opts }

  if (!opts.transform) {
    if (opts.transformer === 'sucrase') {
      opts.transform = require('../dist/sucrase')
    } else {
      opts.transform = require('../dist/babel')
    }
  }

  return jiti(filename, opts)
}
