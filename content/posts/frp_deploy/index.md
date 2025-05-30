---
categories:
# - Mathematics
# - Programming
# - Phase Field
- Others
tags:
- Linux
- Software
- Server
title: "搭建 FRP 服务"
description: 简单记录一下自己搭建 FRP 服务的过程
date: 2025-05-23T09:26:16+08:00
image: 
math: false
license: 
hidden: false
comments: true
draft: true
---

*美妙的五一假期，怎么可能只给自己笔记本装个 Arch Linux 就收手？就自己搭个 `frp` 服务咯*

## 引子：为什么要跳板机

为了方便提交任务，做相场计算，组里配了一台计算服务器，一个管理节点+两个计算节点，劲呀！然而坏消息是：组里没有多余的空间放置服务器了，只能托管到另一个老师那里。

OK，没什么关系，给服务器配个公网IP，那不就和在自己组里一样咯？可是实际上并没有那样的好事，公网IP也不是想申请就申请的。课题组内貌似对网络配置这块不了解，也不打算了解，所以就只能交给装机的小哥处理。而他和那边老师协商后，决定采用的方案是：使用 ToDesk 连接到和服务器处于同一公网下的 Windows 电脑，再用那个 Windows 电脑 SSH 到服务器上。

这个方案，说实在的感觉很蠢。一个服务器，搭载着多用户操作系统，竟然必须用 Windows 做跳板然后跳过去！？这不就意味着，如果有两个人同时使用服务器，我就会和对方产生会话冲突？而且如果有人盯着那台 Windows 电脑的屏幕，我的操作不就暴露地清清楚楚了！？怎么想都是很愚蠢的做法，不过也能理解：这应该（也许）是一个临时的解决方案。而后面谁来解决这个问题呢？

那必须是我了！

## 搭建：也许需要个 TL;DR

我觉得也许应该先写一下 frp 技术是什么以及介绍一下这中间的网络通信过程是什么样的，然而我相信，来看这个博文的朋友应该都是需要一份切实可行的执行过程的。所以下面的第一步是：

### TL;DR
*下面的流程大量参考自开源教程：[Frp内网穿透搭建教学](https://github.com/CNFlyCat/UsefulTutorials/)，内容非常详细，感觉这里不清楚的可以去看看*

1. 租个服务器：在阿里云用学生认证白嫖三个月的便宜服务器，有个公网IP就行，待会儿会用这个IP
2. 先用 ToDesk 连到远程计算服务器上，然后用 `curl ifconfig.me` 得到服务器所在公网的公网IP，待会儿会用到
3. 在计算服务器上下载 frp: 

```sh
#  如果有 wget 的话：
wget https://github.com/fatedier/frp/releases/download/v0.61.1/frp_0.61.1_linux_amd64.tar.gz
#  如果没有 wget，可以试试 curl：
curl -LO https://github.com/fatedier/frp/releases/download/v0.61.1/frp_0.61.1_linux_amd64.tar.gz
```

4. 用 `tar` 解压压缩包：`tar xzf frp_0.61.1_linux_amd64.tar.gz`
5. 进入文件夹，配置 `frpc.toml`，内容为：

```toml
# 服务端地址（这里要填你有公网IP的服务器的IP或者是服务器的域名）
serverAddr = "192.xxx.x.x"
# 服务器端口（Frp 服务端监听的端口）
serverPort = 7000

# 连接协议
transport.protocol = "tcp"

# 代理配置
[[proxies]]
# 代理名称（标识该代理的名称，根据你的喜好填写）
name = "comp_server"
type = "tcp"
localIP = "127.0.0.1" #这里就是这个，代表本机IP
localPort = 6000

remotePort = 6000
```

6. 启动 frpc：`./frpc`
7. 在公网服务器上进行类似操作，这里我没有改 `frps.toml`，其中内容只有一行：

```toml
bindPort = 7000
```

这样的服务器端配置显得有些简陋了，不过目前来讲是完全够用的。然而如果你需要更详细的配置，或者更完善的配置的话，可以参考上述的开源教程。需要注意的是，这个地方的 `7000` 完全是默认的一个值，而这个值是可以自己选择的。一般来讲端口号会尽量选择比较大的数字（高位端口），目的主要是为了安全着想。如果这个地方
