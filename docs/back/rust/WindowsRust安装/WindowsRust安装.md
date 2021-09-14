# Windows 上用国内源安装Rust
## 一、获取安装包
>在Rust官网上下载安装包
[官网链接](https://www.rust-lang.org/zh-CN/):https://www.rust-lang.org/zh-CN/
## 二、修改环境变量
>在安装包所在目录运行powershell，并修改环境变量为国内源
```powershell
$env:RUSTUP_DIST_SERVER="https://mirrors.tuna.tsinghua.edu.cn/rustup"
```
## 三、运行安装包
>开始安装，并选择自己需要的编译器环境
```powershell
.\rustup-init.exe
```