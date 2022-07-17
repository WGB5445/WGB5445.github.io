---
title: Solidity-1 简要概述
date: 2022-07-10 10:00:46
tags:
    - 以太坊
    - solidity
categories:
    - solidityTutorial
description: 简单概述 Solidity 是什么？语言上的组成？
---
Solidity 是一种面向合约的高级编程语言，用于实现智能合约。Solidity 受到 C++，Python和JavaScript 的影响，旨在针对以太坊虚拟机（EVM）。

## 什么是以太坊？
以太坊是一个分布式的区块链平台可以运行智能合约，可以编写按照编程运行的应用程序。

## 以太坊虚拟机 （EVM）
以太坊虚拟机，也称为 EVM ，是以太坊智能合约的运行时环境。以太坊虚拟机专注于提供安全性，并由世界各地的计算机执行不受信任的代码。

EVM专门防止拒绝服务攻击，并确保程序无法访问彼此的状态，确保可以在没有任何潜在干扰的情况下建立通信。

以太坊虚拟机被设计为基于以太坊的智能合约的运行时环境。

## 什么是智能合约？
智能合约是一种计算机协议，旨在以数字方式促进，验证或执行合同的谈判或履行。智能合约允许在没有第三方的情况下执行可信的交易。这些交易是可跟踪和不可逆的。

## Solidity 简单示例
让我们从一个简单的 Solidity 源文件开始。  
以下是一个 Solidity 文件的示例   
```
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;
contract SimpleStorage {
   uint storedData;

   function set(uint x) public {
      storedData = x;
   }

   function get() public view returns (uint) {
      return storedData;
   }
}
```
### SPDX 许可证标识符

第一行是一个 `SPDX 许可证标识符`

如果智能合约的源代码开源，则可以更好地建立对智能合约的信任。由于源代码的可用性总是涉及与版权有关的法律问题，因此Solidity编译器鼓励使用机器可读的SPDX许可证标识符。  

每个源文件都应以注释开头，指示其许可证：

`// SPDX-License-Identifier: MIT`

编译器不会验证许可证是否属于 SPDX 允许的列表的一部分，但会在字节码元数据中包含提供的字符串。

如果您不想指定许可证或源代码不是开源的，请使用特殊值 `UNLICENSED`   
请注意`UNLICENSED`（不允许使用，SPDX 许可证列表中不存在）不同于 `UNLICENSE`（向所有人授予所有权限）

编译器可以在文件级别的任何位置识别注释，但建议将其放在文件的顶部。

有关如何使用 SPDX 许可证标识符的详细信息，请访问 [SPDX](https://spdx.org/ids-how) 网站。

### 编译指示
第二行是一个`编译指示`，它告诉源代码是为 Solidity 版本 0.4.0 或任何更新的版本编写的，这些版本不会将功能分解到（但不包括 0.6.0 版本）。

### 合约

一个合约类似在 C++、Java 中的一个 class ，它可以继承其他的合约或者被其他合约继承  
在合约内部可以保存状态变量(可以类比为成员变量)、也可以保存函数(可以类比为成员函数)
```
contract SimpleStorage {
   ...
}
```
### 状态变量  State Variables

状态变量是其值永久存储在合约存储中的变量。  

```
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

contract SimpleStorage {
    uint storedData; // State variable
    // ...
}
```

### functions
函数是代码的可执行单元。函数通常在合约内部定义，但也可以在合约外部定义。   

函数调用可以在内部或外部进行，并且对其他合约具有不同级别的可见性  
```
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.1 <0.9.0;

contract SimpleAuction {
    function bid() public payable { // Function
        // ...
    }
}

// Helper function defined outside of a contract
function helper(uint x) pure returns (uint) {
    return x * 2;
}
```

### 函数修饰符 Function Modifiers
函数修饰符可用于以声明性方式修改函数的语义  
函数不支持重载，修饰符可以被覆盖
```
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

contract Purchase {
    address public seller;

    modifier onlySeller() { // Modifier
        require(
            msg.sender == seller,
            "Only seller can call this."
        );
        _;
    }

    function abort() public view onlySeller { // Modifier usage
        // ...
    }
}
```

### 事件 Events
事件是与 EVM 日志记录工具的便捷接口  
```
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.21 <0.9.0;

contract SimpleAuction {
    event HighestBidIncreased(address bidder, uint amount); // Event

    function bid() public payable {
        // ...
        emit HighestBidIncreased(msg.sender, msg.value); // Triggering event
    }
}
```


### 结构体类型 Struct Types  

结构是自定义的类型，可以对多个变量进行分组  

```
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

contract Ballot {
    struct Voter { // Struct
        uint weight;
        bool voted;
        address delegate;
        uint vote;
    }
}
```

### 错误 Error

error 允许为故障情况定义描述性名称和数据，error 可以在revert 中使用  
这比字符串要便宜很多，同时可以对其他数据编码

```
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

/// Not enough funds for transfer. Requested `requested`,
/// but only `available` available.
error NotEnoughFunds(uint requested, uint available);

contract Token {
    mapping(address => uint) balances;
    function transfer(address to, uint amount) public {
        uint balance = balances[msg.sender];
        if (balance < amount)
            revert NotEnoughFunds(amount, balance);
        balances[msg.sender] -= amount;
        balances[to] += amount;
        // ...
    }
}
```

### 枚举类型  Enum Types
枚举可用于创建具有一组有限的“常量值”的自定义类型
```
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

contract Purchase {
    enum State { Created, Locked, Inactive } // Enum
}
```