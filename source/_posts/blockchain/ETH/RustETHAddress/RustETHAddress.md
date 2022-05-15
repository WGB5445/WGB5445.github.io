---
title: 以太坊系列 - Rust 私钥生成以太坊地址
date: 2022-05-15 18:20:43
tags: 
    - rust
    - 以太坊
    - 私钥
categories:
    - BlockChainETH
---
>本文实现 Rust 随机生成私钥/读取字符串私钥、生成公钥、地址

### Rust - 以太坊
Rust 作为加密世界的宠儿，有各种好用的加密库
使用多层嵌套的库，无形中增加风险，也不利于学习
使用几个比较基本的库来实现功能可以加深理解
### Cargo.toml
首先展示下本次用到的库 Cargo.toml
```
[dependencies]
libsecp256k1 = { version = "0.7.0"}
rand = {version = "0.8.5"}
hex = {version = "0.4.3"}
sha3 = {version = "0.10.1"}
```
### 以太坊 - 私钥与公钥
以太坊公钥和私钥的关系：
- 以太坊的私钥和公钥是采用 secp256k1 算法生成的，可以用随机的 32 byte 私钥来生成对应的公钥
对于任意一串 32 byte 的私钥可以生成唯一对应的公钥

#### 生成随机私钥 - Rust 实现
使用 Rust 的 [rand](https://docs.rs/rand/latest/rand/) 库生成随机的私钥

代码：
```rust
use libsecp256k1;
use hex::*;
use rand::{thread_rng};
fn main() {
    let keypair = libsecp256k1::SecretKey::random(&mut thread_rng());
    println!("private_key:{:?}",libsecp256k1::SecretKey::serialize(&keypair).encode_hex::<String>());
    let publickey = libsecp256k1::PublicKey::from_secret_key(&keypair);
    println!("publickey:{:?}", libsecp256k1::PublicKey::serialize(&publickey).encode_hex::<String>());
}
```
运行结果：
```

```
#### 读取字符串私钥转为公钥 - Rust 实现
需要使用 [hex](https://docs.rs/hex/0.4.3/hex/) 库处理 hex 字符串
导入私钥:
```
2627f6859715ad1dd294ddc476193931f1adb558f0939732192bd1c0fd168e4e
```
代码：
```rust
use libsecp256k1;
use hex::*;
fn main() {
    let buffer_private = <[u8; 32]>::from_hex("2627f6859715ad1dd294ddc476193931f1adb558f0939732192bd1c0fd168e4e").unwrap();
    let keypair =libsecp256k1::SecretKey::parse(&buffer).unwrap();
    println!("private_key:{:?}",libsecp256k1::SecretKey::serialize(&keypair).encode_hex::<String>());
    let publickey = libsecp256k1::PublicKey::from_secret_key(&keypair);
    println!("publickey:{:?}", libsecp256k1::PublicKey::serialize(&publickey).encode_hex::<String>());
}
```
结果:
```
private_key:"2627f6859715ad1dd294ddc476193931f1adb558f0939732192bd1c0fd168e4e"
publickey:"0416c28c003cb50c5cef10829fc325d4da3a59dfe7fc17ca1634895a06b049c17b942d9ac07f0997da6a84f8c5178662d92aaca4bbeee5120233ae34038539f159"
```
### 以太坊 - 公钥与地址
- 地址通过对公钥去掉开头的 1 个 byte (0x04)
- 对剩余部分进行 Keccak256
- 将得到的 hash 取后面 20 byte 

就可以获得这个公钥对应的以太坊的地址
#### 由公钥获得地址 - Rust 实现
在前面的基础上增加 Rust [sha3](https://docs.rs/sha3/0.10.1/sha3/) 库 进行 hash 运算  

代码：
```rust
use libsecp256k1;
use hex::*;
use sha3::*;
fn main() {
  let buffer_private = <[u8; 32]>::from_hex("2627f6859715ad1dd294ddc476193931f1adb558f0939732192bd1c0fd168e4e").unwrap();
    let keypair   = libsecp256k1::SecretKey::parse(&buffer).unwrap();
    let publickey = libsecp256k1::PublicKey::from_secret_key(&keypair);

    let p = &libsecp256k1::PublicKey::serialize(&publickey)[1..];
    let mut hasher = Keccak256::new();
    hasher.update(p);
    let result = hasher.finalize();
    let address = (&result[12..]);

    println!("hash  = {:?}" , result.encode_hex::<String>());
    println!("address  = {:?}" , address.encode_hex::<String>());
}
```
结果：
```
hash  = "e6a7b9ca516010f43abfbeb32959e6b2d3cee1e66a21647987b80e7f998cbfcc"
address  = "2959e6b2d3cee1e66a21647987b80e7f998cbfcc"
```