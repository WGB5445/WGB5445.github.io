---
title: Bundlr Network -- 分布式存储的兼容层
date: 2022-05-14 13:34:43
tags:
    - 分布式存储
categories: 
    - Web3.0
---
>{% label 警告警告 red %}: Web3尚在初期，任何项目都有风险，投资需谨慎，本文作为经验分享，不作为投资建议  

>[ Bundlr Network 介绍](https://docs.bundlr.network/docs/about/introduction)
Bundlr通过启用对Arweave的多链支持，使分散的永久数据存储变得快速而简单。  
Arweave是唯一一个永久存储数据的分散式数据链。  
Bundlr在不牺牲安全性或可用性的情况下，将Arweave上执行的交易量增加了4000%，并且在上传数据方面的速度提高了约3000倍。
Bundlr具有无限可扩展性，其技术允许用户访问永久数据存储，并具有即时和有保证的交易最终性。它支持多种加密货币，包括以太坊，Solana，Polygon和Avalanche。

# Web2.0-存储

>电子时代如果没有一个安全的存储设备，那么你什么都留不下

记录，是人类进步最根本的途径，记录代表着传承，知识可以代代相传，如果少了古代流传下来的诗书，医书，以及各种著作，人类的文明不会如此璀璨，人们只会一遍一遍的造同样的轮子。

对以前的人来说，写在纸上、刻在石头上是比较好的记录方式，那么到了电子时代，我们每天产生的数据量极为巨大，这时我们会产生思考，我们想要保留些什么?哪些是可以被舍弃的？

对于这个问题不同的人有不同的答案，但相同点就是这个答案一定你想保存的东西，这时就会产生出另一个问题，我存在哪里？它安全么？可以保存多久？会不会丢失？

有几个方向的选择 U盘？硬盘？固态硬盘？网盘？云存储？

- U盘容易丢失、容易损坏、但便携性好适合短时间存储

- 机械硬盘写入较慢，价格较便宜、但是太笨重，容量上限比较低适合长时间存储的场景

- 固态硬盘价格高、读写快、但是比较容易损坏适合快速读写的场景

- 网盘下载速度不确定、价格适中但是较为中心化如果网盘公司倒闭，数据将全部丢失

- 云存储价格较贵，需要自己搭建服务器，虽然比较中心化但是自己交钱自己用也算舒心

# Web3.0 时代-存储

Web3.0 时代初期的我们不如来看看新的一些方案：  

**"去中心化存储" Arweave 以及它的"兼容层" Bundlr Network**
## Arweave

Arweave 最重要的特点在于 “永久储存”。它将自己描述为一种新颖的数据存储区块链协议，实现了 “永久网络” 的概念，并创建了真正的永久数据

Arweave 是一个激励存储协议，基于区块链技术作为激励和维护网络的手段  

跟传统的按需购买的方式不同，它实现了：一次付费，永久使用

不过，Arweave还尚在初期，不建议将大量的数据存入其中

## Bundlr Network

Arweave作为底层协议，不好与用户进行交互，Bundlr Network 可以帮忙解决这个问题

Bundlr Network 基于 Arweave 作为底层存储，优点是支持其他链上的资产作为 AR 存储的费用

对于大多数人来说，没有人会单独保存一些 AR ，大家经常持有 ETH、Matic、SOL 等资产  

当你想保存一些东西的时候，需要兑换一些 AR，才能保存，这对于普通用户是极为不方便的 

Bundlr Network 就可以轻松解决这个问题，在存储和用户中间做一个兼容，支持用户使用不同的 Token 进行付费

# 使用 Bundlr Network 存储

[Bundlr Network 文档](https://docs.bundlr.network/docs/overview)

使用 Bundlr Network 的方式有很多种：
- **CLI** -- [https://docs.bundlr.network/docs/client/cli](https://docs.bundlr.network/docs/client/cli)
- **JS Client** -- [https://docs.bundlr.network/docs/client/js](https://docs.bundlr.network/docs/client/js)
    - **Creating,Signing and Posting** -- [https://docs.bundlr.network/docs/client/transactions](https://docs.bundlr.network/docs/client/transactions)
    - **Tags** -- [https://docs.bundlr.network/docs/client/tags](https://docs.bundlr.network/docs/client/tags)
    - **Uploading a directory using the CLI** -- [https://docs.bundlr.network/docs/client/upload](https://docs.bundlr.network/docs/client/upload)
- **Bundlr in the browser** -- [https://docs.bundlr.network/docs/client/web](https://docs.bundlr.network/docs/client/web)

可以查看官网文档的更多示例：
- 完整示例 -- [https://docs.bundlr.network/docs/client/examples/full-example](https://docs.bundlr.network/docs/client/examples/full-example)
- 注资示例 -- [https://docs.bundlr.network/docs/client/examples/funding-your-account](https://docs.bundlr.network/docs/client/examples/funding-your-account)


## CLI
### 安装
```
npm install -g @bundlr-network/client
```
>以下所有示例均以最小单位在 Arweave 中付款
只需更改您的钱包 -w  和 货币 -c 即可使用其他货币
### 命令行界面
```
Usage: Bundlr [options] [command]

Options:
  -h, --host <string>          Bundlr node hostname/URL (eg http://node1.bundlr.network)
  -w, --wallet <string>        Path to keyfile or the private key itself (default: "default")
  -c, --currency <string>      The currency to use
  --timeout <number>           The timeout (in ms) for API HTTP requests - increase if you get timeouts for upload
  --no-confirmation            Disable confirmations for certain actions
  --multiplier <number>        Adjust the multiplier used for tx rewards - the higher the faster the network will
                               process the transaction. (default: "1.00")
  --batch-size <number>        Adjust the upload-dir batch size (process more items at once - uses more resources
                               (network, memory, cpu) accordingly!) (default: "5")
  --debug, -d                  Increases verbosity of errors and logs additional debug information. Used for
                               troubleshooting. (default: false)
  --index-file <string>        Name of the file to use as an index for upload-dir manifests (relative to the path
                               provided to upload-dir).
  --provider-url <string>      Override the provider URL
  --contract-address <string>  Override the contract address
  --content-type <string>      Override the content type for *ALL* files uploaded
  --remove-deleted             Removes previously uploaded (but now deleted) items from the manifest
  --force-chunking             Forces usage of chunking for all files regardless of size
  -v, --version                Gets the current package version of the bundlr client
  --help                       display help for command

Commands:
  balance <address>            Gets the specified user's balance for the current Bundlr node
  withdraw <amount>            Sends a fund withdrawal request
  upload <file>                Uploads a specified file
  upload-dir <folder>          Uploads a folder (with a manifest)
  deploy <folder>              (DEPRECATED - use the functionally identical 'upload-dir' instead.) Deploys a folder
                               (with a manifest) to the specified bundler
  fund <amount>                Funds your account with the specified amount of atomic units
  price <bytes>                Check how much of a specific currency is required for an upload of <amount> bytes
  help [command]               display help for command
```
### 获取地址的金额
在 balance 后填写使用的钱包地址，钱包地址的格式应该与 -c 后的货币网络地址匹配
```
bundlr balance 0xbEbE89611b732B9569Bf409c0Ae2e02EdFB2A59D -h https://node1.bundlr.network -c matic
```
因为当前没有使用这个地址对节点注入金额，所以应给返回:
```
Balance: 0 wei (0 matic)
```
### 查看存储需要的金额
因为存储需要收取一定费用，并且不同链收取的 Token fee 也不同，所以需要查看指定大小需要付的费用  
通过 matic 付费 ，存储 1000000 bytes 数据需要 0.010660399591891892 matic
```
bundlr price 1000000 -h https://node1.bundlr.network -c matic
```
返回：
```
Price for 1000000 bytes in matic is 10660399591891892 wei (0.010660399591891892 matic)
```
### 向节点注入金额
如果想要使用 Bundlr Network 存入文件到 Arweave 网络，需要预先注入一定量的金额来抵扣存入网络的费用  
钱包当前网络中必须有足够的 Token 
需要用 -w 填写私钥或者json 并 -c 指定 Token  
需要输入 Y 确认，即可注入资金
```
bundlr fund 10660399591891892 -h https://node1.bundlr.network -w 128111105cf9aea4546cd0c1008b7b7ad2508b1dbe855bc7d4e950316c6a2260 -c matic 
```
### 上传文件
当成功注入资金后，可以上传一个文件，但上传文件所需金额不能超过这个钱包向节点注入的金额
```
bundlr upload .\img\dog.jpg -c matic -h https://node1.bundlr.network -w 128111105cf9aea4546cd0c1008b7b7ad2508b1dbe855bc7d4e950316c6a2260
```
如果成功上传则会返回钱包地址和已上传文件的 URL 
```
Loaded address: 0xbEbE89611b732B9569Bf409c0Ae2e02EdFB2A59D
Uploaded to https://arweave.net/mFFcgeIoLnhzQDYAHTYHkQ1eEYVwO9XvU7GitAUnq4U
```
访问这个 URL 就可以看到上传的文件了

[https://arweave.net/mFFcgeIoLnhzQDYAHTYHkQ1eEYVwO9XvU7GitAUnq4U](https://arweave.net/mFFcgeIoLnhzQDYAHTYHkQ1eEYVwO9XvU7GitAUnq4U)