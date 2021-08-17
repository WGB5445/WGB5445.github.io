---
title: Systemctl简单应用
---
## systemctl
>&nbsp;&nbsp;systemctl是linux中的服务管理,是一个systemd的工具，主要负责控制systemd系统和服务管理器  
在ubuntu 、centos等一系列发行版中可用。可以方便的管理需要启动的服务等。可以实现开机自启动、出错重启和定时重启等等功能。

*简单的演示*
```
[Unit]
Description= a sample thing

[Service]
type=simple
Restart=on-failure
ExecStart=/home/ubuntu/mimc-fast-aarch64

[Install]
WantedBy=multi-user.target
```
### 一、 **[Unit]**
>定义启动的顺序以及依赖的关系  

|  可选项              | 描述                                   |
|  ----               |  ----                                 |
|  Description        | 主要是填写一些信息，用于当前服务的简单描述    |
| Documentation       | 可以用来指定文档的位置，用于当前服务文档查询 |
| After               | 可以指定在哪些服务之后进行启动 |
| Before              | 可以指定在哪些服务之前进行启动 |
| Wants               | 可以指定服务依赖于哪些服务(这种依赖是"弱依赖"，即使所依赖的服务的启动情况不影响当前的服务是否启动) |
| Requires            | 可以指定服务依赖于哪些服务(这种依赖是"强依赖"，一旦所依赖的服务异常，当前的服务也随之停止)   |  
### 二、**[Service]**
>定义启动、关闭和重启服务等操作时的方式

| 可选项                |               描述|
| ----                  | ----                  |
|EnvironmentFile        | 用来指定当前服务启动的环境变量  以路径的形式在文件中用*key=value* 的形式写入  读取时可以使用$key来读取    |
|ExecStart              | 指定服务启动时执行的命令          |
|ExecStop               |指定服务停止时执行的命令           |
|ExecReload             |指定服务重启时执行的命令           |
|ExecStartPre           |指定服务启动之前执行的命令         |
|ExecStartPost          |指定服务启动之后执行的命令         |
|ExecStopPost           |指定服务停止之后执行的命令         |
|RestartSec             |指定服务在重启前等待的时间(单位为&nbsp;"秒") |
|Type                   |指定启动类型:见下方[Type](#type)|
|Restart                |指定重启时的类型:见下方[Restart](#restart)   |
|KillMode               |指定停止的方式:见下方[KillMode](#killmode)|
特殊前缀
>1. &nbsp; @&emsp;:之后的参数依次作为"argv[0]&nbsp; argv[1] &nbsp; argv[2] &nbsp;…"传给需要执行的进程
>2. &nbsp; -&emsp;:进程运行错误也不会当作执行失败，但是会在日志中报错
>3. &nbsp; +&emsp;:进程以超级管理员权限运行
#### **[Type]**
|可选项|描述|
|----|----|
|simple         |   指定ExecStart字段的进程为主进程         |
|forking        |   指定以fork() 子进程执行ExecStart字段的进程| 
|oneshot        |   执行一次                            |
|notify         |   启动后发送会发送通知信号通知systemd     |
|idle           |   等其他任务结束后才运行                  |
#### **[Restart]**
|可选项|描述|
|----|----|
|no                 | 退出后不会重启                      |
|on-success         | 当进程正常退出时(退出码为0) 执行重启    | 
|on-failure         | 当进程不正常退出时(退出码不为0) 执行重启|
|on-abnormal        | 当被信号终止和超时执行重启            |
|on-abort           | 当收到没有捕捉到的信号终止时执行重启     |
|on-watchdog        | 当看门狗超时时执行重启              |
|always             | 一直重启                          |
#### **[KillMode]**
|可选项|描述|
|----|----|
|control-group         | 杀掉当前进程中所有的进程        |
|process        |  杀掉当前进程的主进程 | 
|mixed        |   主进程将收到 SIGTERM 信号，子进程收到 SIGKILL 信号                           |
|none         |   不杀掉任何进程     |


### 三、**[Install]**
> 定义安装配置文件（开机自启动必备）

|可选项| 描述   |
|----                   |----      |
|WantedBy           |表示该服务所在的 Target(一般写&nbsp; **multi-user.target**)|

### 四、**启动、停止、开机自启动**
#### 1. 启动
- 通过systemctl start 来启动
```shell
sudo systemctl start test.service
```
#### 2. 停止
- 通过systemctl stop 来停止
```shell
sudo systemctl stop test.service
```
#### 3. 重启
- 通过systemctl restart 来重启
```shell
sudo systemctl restart test.service
```
#### 4. 开启开机自启动
- 通过systemctl enable 来开启开机自启动
```shell
sudo systemctl enable test.service
```
#### 5. 关闭开机自启动
- 通过systemctl disable 来关闭开机自启动
```shell
sudo systemctl disable test.service
```