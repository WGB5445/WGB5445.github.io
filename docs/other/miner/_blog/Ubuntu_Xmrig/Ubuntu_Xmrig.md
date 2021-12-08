## Ubuntu上编译xmrig
>本文作者: [WGB](https://wgb5445.github.io/)  
          Twitter: [Adelaide5445](https://twitter.com/Adelaide5445)
## 工具
- ubuntu系统
- 网络

## 步骤
1. 安装编译工具以及需要的库
2. 下载源码
3. 编译
4. 成功

## 一、安装工具以及需要的库
在Ubuntu上编译xmrig需要使用编译工具 make cmake gcc g++等  
下载代码需要使用git  
编译xmrig时可以使用附加库libhwloc-dev libuv1-dev libssl-dev  
如果不需要这些库，可以在编译时加选项跳过  

### 1. 更新apt源
先更新源以防止出现找不到包等问题
```shell
sudo apt update
```

### 2. 安装
```shell
sudo apt install make cmake gcc g++ git libhwloc-dev libuv1-dev libssl-dev
```

## 二、下载源码
通过git工具下载xmrig源码(国内用户链接可能较慢)  

```shell
git clone https://github.com/xmrig/xmrig.git
```
## 三、编译
### 1. 进入xmrig文件夹
```shell
cd xmrig/
```
### 2. 创建build文件夹
```shell
mkdir build
```
### 3. 执行编译命令
cmake编译选项可以在xmrig官网查看,可以通过编译选项去掉或者添加功能  
xmrig-CMake选项:[https://xmrig.com/docs/miner/cmake-options](https://xmrig.com/docs/miner/cmake-options)
```shell
cmake ..
```
```shell
make 
```
## 四、生成可执行文件xmrig
经过编译后可以生成可执行文件xmrig，可以使用ls命令查看是否生成
```shell
ls
```
出现xmrig就代表已经成功
```
CMakeCache.txt  CMakeFiles  cmake_install.cmake  config.json  libxmrig-asm.a  Makefile  src  xmrig
```