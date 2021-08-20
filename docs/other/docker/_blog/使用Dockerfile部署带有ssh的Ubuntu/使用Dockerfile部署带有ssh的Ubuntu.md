## 使用Dockerile部署带有ssh的Ubuntu

### 一、Dockerfile 展示
```Dockerfile
FROM ubuntu:20.04 
ENV TZ Asia/Shanghai
ENV LANG zh_CN.UTF-8
RUN echo 'root:root' |chpasswd
RUN echo "deb http://mirrors.163.com/ubuntu/ focal main restricted universe multiverse\n \
deb http://mirrors.163.com/ubuntu/ focal-security main restricted universe multiverse \n \
deb http://mirrors.163.com/ubuntu/ focal-updates main restricted universe multiverse\n	\
deb http://mirrors.163.com/ubuntu/ focal-backports main restricted universe multiverse\n"\
            > /etc/apt/sources.list        \
            && apt update && apt install -y \ 
			openssh-server \
			vim \
			&& apt clean \
			&& rm -rf /tmp/* /var/lib/apt/lists/* /var/tmp* \
			&& echo "PermitRootLogin yes" >> /etc/ssh/sshd_config
RUN mkdir /var/run/sshd

EXPOSE 22
CMD ["/usr/sbin/sshd","-D"]
``` 
### 二、分步解析
#### 1. 容器的选择
>由于平时使用的大多是ubuntu 所以这次选择了选择了ubuntu20.04 版

```Dockerfile
FROM ubuntu:20.04 
```
#### 2. 环境变量的设置
> 设置时区和文字环境，其实作用并不大，但是还是设置上吧
```Dockerfile
ENV TZ Asia/Shanghai
ENV LANG zh_CN.UTF-8
```
#### 3. root用户的密码更改
> 因为ssh 时需要用登陆用户名和密码，所以将root密码改成自己想要的
```Dockerfile
RUN echo 'root:root' |chpasswd
```
> &emsp;" ："&emsp;前面的root 是用户名，&emsp;" : " &emsp;后面的root是密码
#### 4. 换国内源、安装SSH
> 因为镜像在本地构建，所以使用国内源可以有一个比较好的网速来下载。  
然后通过apt 安装vim 和 openssh-server 以便使用ssh 和一些简单的编辑。  
当ssh使用root登陆时需要更改配置中的&emsp;"PermitRootLogin"&emsp; 为 &emsp;"Yes" &emsp;以便root用户使用ssh。
```Dockerfile
RUN echo "deb http://mirrors.163.com/ubuntu/ focal main restricted universe multiverse\n \
deb http://mirrors.163.com/ubuntu/ focal-security main restricted universe multiverse \n \
deb http://mirrors.163.com/ubuntu/ focal-updates main restricted universe multiverse\n	\
deb http://mirrors.163.com/ubuntu/ focal-backports main restricted universe multiverse\n" \
            > /etc/apt/sources.list \
            && apt update && apt install -y \ 
			openssh-server \
			vim \
			&& apt clean \
			&& rm -rf /tmp/* /var/lib/apt/lists/* /var/tmp* \
			&& echo "PermitRootLogin yes" >> /etc/ssh/sshd_config
```
#### 5. 创建ssh的目录
> 如果没有这个目录，ssh 是会崩掉的，所以乖乖加上。
```Dockerfile
RUN mkdir /var/run/sshd
```
#### 6. 暴露端口
> ssh默认的端口号是 22 所以在这里我们暴露镜像的端口号。
```Dockerfile
EXPOSE 22
```
#### 7. 在开机时启动ssh服务
> 虽然在系统中安装了openssh-server ,但是ssh服务仍需要在开机时启动。
```DockerDockerfile
CMD ["/usr/sbin/sshd","-D"]
```