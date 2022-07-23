---
title: Solidity-3-Run
date: 2022-07-23 17:20:44
tags:
---
初学者和大部分简单的部署都可以使用 Remix 作为开发调试环境

### 进入 Remix 
进入 [ https://remix.ethereum.org/ ](https://remix.ethereum.org/)

### 编辑代码
在 File explorer 中编辑 contracts 文件夹中的 1_Storage.sol

```
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract Storage {

    uint256 number;

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public {
        number = num;
    }

    /**
     * @dev Return value 
     * @return value of 'number'
     */
    function retrieve() public view returns (uint256){
        return number;
    }
}
```
### 编译
#### 选择 0.8.15 编译器
点击左侧栏中的 solidity compiler 并选择 Compiler 中的 0.8.15+commit.e14f2714

#### 编译
点击下方的 Compile 1_Storage.sol

### 部署
点击左侧栏中的Deploy & Run transactions，选择 ENVIRONMENT 中的 Remix VM (London) 并在 Contract 选择 Storage - contracts/1_Storage.sol 点击 Deploy

### 合约交互
#### store 
在下方 Deployed Contracts 中输入一个数字 并点击 store ，可以将数字存储在合约中
#### retrieve
点击 retrieve 可以读取 store 的数字 
