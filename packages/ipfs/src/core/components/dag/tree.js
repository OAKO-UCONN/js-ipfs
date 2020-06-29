'use strict'

const { withTimeoutOption } = require('../../utils')
const CID = require('cids')
const errcode = require('err-code')

module.exports = ({ ipld, preload }) => {
  return withTimeoutOption(async function * tree (cid, options = {}) { // eslint-disable-line require-await
    try {
      if (typeof cid === 'string' || cid instanceof String) {
        cid = new CID(cid)
      }

      if (!CID.isCID(cid)) {
        throw new Error('Invalid CID')
      }
    } catch (err) {
      throw errcode(err, 'ERR_INVALID_CID')
    }

    if (options.preload !== false) {
      preload(cid)
    }

    yield * ipld.tree(cid, options.path, options)
  })
}
