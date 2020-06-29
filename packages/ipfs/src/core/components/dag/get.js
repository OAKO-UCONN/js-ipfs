'use strict'

const { withTimeoutOption } = require('../../utils')
const first = require('it-first')
const last = require('it-last')
const CID = require('cids')
const errcode = require('err-code')

module.exports = ({ ipld, preload }) => {
  return withTimeoutOption(async function get (cid, options = {}) {
    if (!CID.isCID(cid)) {
      throw errcode(new Error('Invalid CID'), 'ERR_INVALID_CID')
    }

    if (options.preload !== false) {
      preload(cid)
    }

    if (options.path) {
      if (options.localResolve) {
        return first(ipld.resolve(cid, options.path))
      }

      return last(ipld.resolve(cid, options.path))
    }

    return {
      value: await ipld.get(cid, options),
      remainderPath: ''
    }
  })
}
