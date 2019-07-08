# `murmur3hash-wasm`

[![Build Status](https://travis-ci.org/hyperdivision/murmur3hash-wasm.svg?branch=master)](https://travis-ci.org/hyperdivision/murmur3hash-wasm)

> Murmur3 Hash implemented in hand-written WASM

## Usage

```js
var murmur3Hash = require('murmur3hash-wasm')

console.log(murmur3Hash(Buffer.from('Emil'), 0))
```

## API

### `var hash = murmur3Hash(buf, seed)`

Murmur3 hash `buf` with initial `seed`. Seed must be a valid 32-bit integer, and
`buf` must be a `Buffer` or `Uint8Array`. Returns a 32-bit integer.

## Install

```sh
npm install murmur3hash-wasm
```

## License

[ISC](LICENSE)
