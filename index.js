const assert = require('nanoassert')
const mod = require('./murmur3')()

/**
 * Murmur3 hash
 * @param  {Uint8Array|Buffer} buf  data encoded as Uint8Array or Buffer
 * @param  {number}            seed seed as 32-bit integer
 * @return {numver}                 hash as 32-bit integer
 */
module.exports = function murmur3Hash (buf, seed) {
  assert(buf instanceof Uint8Array, 'buf must be Buffer or Uint8Array')
  assert(seed >>> 0 < 0xffffffff + 1, 'seed must be a valid 32-bit integer')

  if (buf.byteLength > mod.memory.byteLength) {
    mod.realloc(buf.byteLength)
  }

  mod.memory.set(buf, 0)
  return mod.exports.hash(0, buf.byteLength, seed)
}
