---
title: Solidity-2 开发环境
date: 2022-07-17 14:38:31
tags:
    - 以太坊
    - solidity
categories:
    - solidityTutorial
description: 简单概述 solidity 的几种开发环境，Remix、solc-js、docker
---
对于 Solidity 的学习，我们有几种方式来开发编译:
- Remix [ https://remix.ethereum.org/ ](https://remix.ethereum.org/)
- solc-js [https://github.com/ethereum/solc-js](https://github.com/ethereum/solc-js)
- solc [https://github.com/ethereum/solidity](https://github.com/ethereum/solidity)
- solc docker [https://hub.docker.com/r/ethereum/solc](https://hub.docker.com/r/ethereum/solc)

### Remix 
Remix 是一个 在线的 IDE ，可以作为 Solidity 的开发部署环境，图形化的界面十分方便
可以自由的选择需要的编译器、部署的方式
部署方式支持：
- Javascript VM 部署
- 链接浏览器插件钱包部署
- HardHat 部署
- Truffle 部署
- Wallet Connect 部署

做开发十分方便，但网站在国外，访问速度较慢

### solc-js 
solc-js 是通过 solc 的代码编译生成的方便js调用的版本，可以作为命令行工具，但是功能较少  
不适合直接使用，可以配合 HardHat 、Truffle 框架作为编译工具

在学习过程中，可以使用 solc-js 作为编译工具，用来学习 solidity 语法

### solc 
solc 是 通过 C++ 编写的命令行工具，功能全面，但是日常使用较少  
若无需要，不建议使用

在学习过程中可以使用 solc 作为工具学习

### solc docker 
实际上和 solc 的二进制版本类似，通过 docker 运行

```
docker run ethereum/solc:stable --help
```

