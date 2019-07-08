(module
  (memory (export "memory") 1)

  ;; based on https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash3.cpp#L92-L146
  (func $hash
    (export "hash")
    (param $data.ptr i32)
    (param $data.len i32)
    (param $seed i32)
    (result i32)

    (local $data.end i32)
    (local $h i32)
    (local $k i32)

    (set_local $data.end
               (i32.add (get_local $data.ptr)
                        (i32.and (get_local $data.len)
                                 (i32.const 0xfffffffc))))

    (set_local $h
               (get_local $seed))

    (if (i32.gt_u (get_local $data.len) (i32.const 3))
      (then
        (loop $continue
              (i32.load (get_local $data.ptr))
              (i32.mul (i32.const 0xcc9e2d51))
              (i32.rotl (i32.const 15))
              (i32.mul (i32.const 0x1b873593))
              (get_local $h)
              (i32.xor)
              (i32.rotl (i32.const 13))
              (i32.mul (i32.const 5))
              (i32.add (i32.const 0xe6546b64))
              (set_local $h)

              (br_if $continue (i32.lt_u (tee_local $data.ptr
                                                    (i32.add (get_local $data.ptr)
                                                             (i32.const 4)))
                                         (get_local $data.end))))))

    (block $switch
      (block $0 (result i32)
        (block $1 (result i32)
          (block $2 (result i32)
            (block $3 (result i32)
              (block $inner (result i32)
                (i32.const 0)
                (br_table $0 $1 $2 $3
                          (i32.and (get_local $data.len)
                                   (i32.const 3)))))
            (i32.load8_u offset=2 (get_local $data.end))
            (i32.shl (i32.const 16))
            (i32.xor))
          (i32.load8_u offset=1 (get_local $data.end))
          (i32.shl (i32.const 8))
          (i32.xor))
        (i32.load8_u offset=0 (get_local $data.end))
        (i32.xor)
        (i32.mul (i32.const 0xcc9e2d51))
        (i32.rotl (i32.const 15))
        (i32.mul (i32.const 0x1b873593))
        (get_local $h)
        (i32.xor)
        (tee_local $h))
      (drop))


    (get_local $h)
    (get_local $data.len)
    (i32.xor)
    (tee_local $h)
    ;; fmix32
    (i32.shr_u (i32.const 16))
    (get_local $h)
    (i32.xor)
    (i32.mul (i32.const 0x85ebca6b))
    (tee_local $h)
    (i32.shr_u (i32.const 13))
    (get_local $h)
    (i32.xor)
    (i32.mul (i32.const 0xc2b2ae35))
    (tee_local $h)
    (i32.shr_u (i32.const 16))
    (get_local $h)
    (i32.xor)

    (return)))
