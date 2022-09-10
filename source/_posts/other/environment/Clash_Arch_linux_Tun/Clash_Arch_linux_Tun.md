---
title: ArchLinux Clash Tun 模式失败问题
date: 2022-09-10 13:01:43
cover: 
---

使用 Arch linux 时使用 Clash Tun 模式在第一此打开时可用，但重启或者注销后再次启用时无法连接网络

可以使用以下命令， `/usr/bin/clash` 可以换成自己的 `Clash` 的路径
```
sudo setcap cap_net_bind_service,cap_net_admin=+ep /usr/bin/clash
```

如果是使用 `clash for windows` 可以在 `clash for windows` 解压路径下找到 `clash` ，并执行 `setcap`
```
resources/static/files/linux/x64/service/clash-core-service
```
