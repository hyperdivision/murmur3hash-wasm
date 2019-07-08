const test = require('tape')
const murmur3 = require('.')

// from https://stackoverflow.com/a/31929528
test('fixtures', function (assert) {
  assert.equal(murmur3(new Uint8Array(), 0), 0, 'with zero data and zero seed, everything becomes zero')
  assert.equal(murmur3(new Uint8Array(), 1) >>> 0, 0x514E28B7, 'ignores nearly all the math')
  assert.equal(murmur3(new Uint8Array(), 0xffffffff) >>> 0, 0x81F16F39, 'make sure your seed uses unsigned 32-bit math')

  assert.equal(murmur3(new Uint8Array([0xff, 0xff, 0xff, 0xff]), 0) >>> 0, 0x76293B50, 'make sure 4-byte chunks use unsigned math')

  assert.equal(murmur3(new Uint8Array([0x21, 0x43, 0x65, 0x87]), 0) >>> 0, 0xF55B516B, 'Endian order. UInt32 should end up as 0x87654321')
  assert.equal(murmur3(new Uint8Array([0x21, 0x43, 0x65, 0x87]), 0x5082EDEE) >>> 0, 0x2362F9DE, 'Special seed value eliminates initial key with xor')
  assert.equal(murmur3(new Uint8Array([0x21, 0x43, 0x65]), 0) >>> 0, 0x7E4A8634, 'Only three bytes. Should end up as 0x654321')
  assert.equal(murmur3(new Uint8Array([0x21, 0x43]), 0) >>> 0, 0xA0F7B07A, 'Only two bytes. Should end up as 0x4321')
  assert.equal(murmur3(new Uint8Array([0x21]), 0) >>> 0, 0x72661CF4, 'Only one byte. Should end up as 0x21')

  assert.equal(murmur3(new Uint8Array([0, 0, 0, 0]), 0) >>> 0, 0x2362F9DE, `Make sure compiler doesn't see zero and convert to null 4 bytes`)
  assert.equal(murmur3(new Uint8Array([0, 0, 0]), 0) >>> 0, 0x85F0B427, `Make sure compiler doesn't see zero and convert to null 3 bytes`)
  assert.equal(murmur3(new Uint8Array([0, 0]), 0) >>> 0, 0x30F4C306, `Make sure compiler doesn't see zero and convert to null 2 bytes`)
  assert.equal(murmur3(new Uint8Array([0]), 0) >>> 0, 0x514E28B7, `Make sure compiler doesn't see zero and convert to null 1 byte`)

  assert.equal(murmur3(new Uint8Array(), 0) >>> 0, 0)

  assert.equal(murmur3(new Uint8Array(), 1) >>> 0, 0x514E28B7)

  assert.equal(murmur3(new Uint8Array(), 0xffffffff) >>> 0, 0x81F16F39)

  assert.equal(murmur3(Buffer.from('Hello wor')) >>> 0, 220812671, 'Hello wor')
  assert.equal(murmur3(Buffer.from('Hello worl')) >>> 0, 3633227568, 'Hello worl')
  assert.equal(murmur3(Buffer.from('Hello world')) >>> 0, 2911983372, 'Hello world')
  assert.equal(murmur3(Buffer.from('Hello world!')) >>> 0, 1652231212, 'Hello world!')
  assert.equal(murmur3(Buffer.from('abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq'), 0) >>> 0, 0xEE925B90, 'random')
  assert.equal(murmur3(Buffer.from('Hello world!')) >>> 0, 1652231212, 'Hello world!')
  assert.equal(murmur3(Buffer.from('Hello world')) >>> 0, 2911983372, 'Hello world')
  assert.equal(murmur3(Buffer.from('Hello worl')) >>> 0, 3633227568, 'Hello worl')
  assert.equal(murmur3(Buffer.from('Hello wor')) >>> 0, 220812671, 'Hello wor')
  assert.equal(murmur3(Buffer.from('Hello wor')) >>> 0, 220812671, 'Hello wor')
  assert.equal(murmur3(Buffer.from('Hello worl')) >>> 0, 3633227568, 'Hello worl')
  assert.equal(murmur3(Buffer.from('Hello world')) >>> 0, 2911983372, 'Hello world')
  assert.equal(murmur3(Buffer.from('Hello world!')) >>> 0, 1652231212, 'Hello world!')

  assert.end()
})
