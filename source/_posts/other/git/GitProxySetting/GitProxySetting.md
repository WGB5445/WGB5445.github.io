---
title: Git的基本代理设置
data: 2021-12-09
cover: 
---
## 一、 设置代理
### 1.当前Git仓库代理(临时)
```shell
git config http.proxy http://127.0.0.1:10808
```
### 2.全局设置 (永久)
```shell
git config --global http.proxy http://127.0.0.1:10808
```
## 二、取消代理
### 1.取消当前的Git仓库代理
```shell
git config --unset http.proxy
```
### 1.取消全局的Git仓库代理
```shell
git config --global --unset http.proxy
```