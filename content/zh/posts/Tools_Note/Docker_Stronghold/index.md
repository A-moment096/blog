---
categories:
# - Mathematics
# - Programming
# - Phase Field
- Others
tags:
- Docker
- Server
title: 用 Docker 部署卫戍协议网页版！
description: 何忆卫……
date: 2026-10-07T12:50:22+08:00
image: /images/安洁莉娜.jpg
imageObjectPosition: center 10%
math: true
hidden: false
comments: true
---

*应群友号召，在自己小鸡上部署 [卫戍协议浏览器版](https://github.com/sganggs/Stronghold-Protocol)，顺带记录一下*

*头图来自 Pixiv [StarSigilArt](https://www.pixiv.net/en/users/15122716) 太太的 [予愿安洁莉娜](https://www.pixiv.net/en/artworks/148972500)，这里选用的是带水印的版本，不带水印的需要从太太的 [Patreon](https://www.patreon.com/cw/StarCatSF) 上获取；音乐则选择了粥游经典曲目 [Radiant](https://www.bilibili.com/video/BV1QU4y1u7D7/)（这里贴的是 B站链接），祝您战斗，爽！*

{{<music auto="https://music.163.com/#/song?id=1890402858" loop="none">}}

## 何忆卫！？

*明日方舟*，一款二次元塔防游戏，也是笔者玩过的二次元手游里比较长的一款（现已退坑许久），它有一个非常受玩家欢迎的模式：*卫戍协议*，或者我们大白话一些，多人联机的自走棋/酒馆战棋模式。虽然笔者退坑时这个游戏模式还没有出来，但由于群友经常高强度游玩+对这个模式青睐有加+我在群友旁边看过他打这个模式，即便是我也略知一二。

可惜的是，卫戍协议这个模式并不是常驻玩法，而是活动玩法，只有那么几周能玩到。据我所知，没有卫戍协议玩的群友甚至会跑去日服玩这个模式（以及别的模式，比如肉鸽），但这也不是长久之计。那么有没有解决办法呢？欸！非常好开源项目 [Stronghold-Protocol](https://github.com/sganggs/Stronghold-Protocol) 解决了这个问题，通过浏览器技术实现在线联机与游玩，而且对机器的内存占用也不大，小鸡也能跑。

所以这里简单记录一下我在自己小鸡上部署这个服务的过程。

## 用 Docker 部署！

按照 README.md 和 docs/DEPLOY.md 的说法，我们只需要下载 Release 包然后解压缩，之后就可以用 docker 部署或者运行 node 来启动服务啦。然而因为从 GitHub Release 直接拉取的速度实在是太慢了（几十 KB 每秒），我的做法主要还是在自己电脑上下载好压缩包之后再上传到服务器上。不从源码部署的主要原因则是下载美术资源太慢了，它默认是从 GitHub 下载的美术资源，失败时会降级到 jsDilvr 上，但一般 GitHub 会成功链接并龟速跑…… 不如直接用 Release 里打包好的美术资源。

由于笔者之前安装了 Docker 和 Docker Compose 用来部署别的服务，因此这两者在我自己的服务器上是已经可以正常使用的。如果您的服务器没有 Docker 和 Docker Compose 的话，可以查看 [官方文档](https://docs.docker.com/get-started/get-docker/) 来在自己的服务器上安装 Docker。

### 下载发行包

下载的话，可以用浏览器点击下载，也可以用 `wget` 或者 `curl`。我个人推荐 `wget`，不用输入多余的参数（这里下载的是本文成文时最新的 v0.2.0 版本）：

```sh
wget https://github.com/sganggs/Stronghold-Protocol/releases/download/v0.2.0/Stronghold-Protocol-v0.2.0.zip
```

如果您钟爱 `curl` 的话：

```sh
curl -LO https://github.com/sganggs/Stronghold-Protocol/releases/download/v0.2.0/Stronghold-Protocol-v0.2.0.zip
```

其中 `-L` 为要求 `curl` 追踪重定向请求，用来确保能下载到真正的文件，而 `-O` 意思是下载到的文件使用它在链接中的名字。如果想指定名称，可以将 `-O` 替换为 `-o <name>`。

### 解压与 Docker 部署

在下载好压缩包后，就可以把它就地解压了：

```sh
unzip Stronghold-Protocol-v0.2.0.zip
```

（不会没有人服务器上没有 `unzip` 吧……）它会解压出来名为 `Stronghold-Protocol` 的文件夹，里面就是可以直接用 Docker 部署的发行版了。此时我们需要先构建镜像，然后启动容器：

```sh
docker build -t stronghold-protocol .
docker run -d --name stronghold -p 3000:3000 --restart unless-stopped -v "$PWD/public/assets:/app/public/assets:ro" stronghold-protocol
```

这样就可以了。我个人喜欢用 `docker compose` 功能，可以写这么个 `compose.yml` 文件来指定上面的两行命令中的信息：

```yaml
services:
  stronghold:
    build:
      context: .
    image: stronghold-protocol
    container_name: stronghold
    ports:
      - "3000:3000"
    restart: unless-stopped
    volumes:
      - ./public/assets:/app/public/asstes:ro
```

这样就可以直接使用 `docker compose up -d` 来读取 `compose.yml` 中的信息并自动读取文件夹内的 `Dockerfile`，完成镜像构建和启动。如果一切顺利的话，服务就应该正常启动并运行在 `3000` 端口上了，如果是本地部署就可以用 `http://localhost:3000` 这个地址来在浏览器中启动并查看结果了。您也可以使用 `docker compose logs` 来启动日志查看部署情况。

当然，由于我部署在服务器上，肯定不想让 `3000` 这样非常 **“众所周知”** 的端口部署上这个服务。Docker 支持通过端口映射来把容器内的端口映射到容器外的别的端口，实际上在 `compose.yml` 的 `ports` 字段里就是定义端口映射的。比如我们要在 `<port>` 端口上开放这个服务，就可以在 `ports` 字段下将内容修改为：

``` yaml
ports:
  - "<port>:3000"
```

当然，不要忘记在服务器防火墙上打开自己设置的端口。

### 使用 Nginx 进行反向代理

通过上面的方式部署好之后，需要通过端口号来访问这个服务。这也 OK 啦，但是这么搞总是感觉怪怪的，谁家好人使用服务的时候是直接写端口号的呀！？所以很有必要把这个端口 *反向代理* 到内部的一个链接上。我自己的服务器上使用的是 Nginx，这里就简单贴一下流程吧。

首先要写一份 Nginx 的配置文件，实际上这个项目已经提供了配置文件的模板了：

```nginx
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}
server {
    listen 443 ssl;
    listen [::]:443 ssl;

    server_name <game.example.com>;
    
    ssl_certificate     /etc/letsencrypt/live/<example.com>/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/<example.com>/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:<port>;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header Host $host;

        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 1h;      # WebSocket 长连接
    }
}
``` 

这里用了 `<game.example.com>` 和 `<port>` 来占位，使用的时候换成自己的地址和端口就好。值得注意的是这里使用的 `ssl_certificate` 和 `ssl_certificate_key` 的路径是用的 Let's Encrypt 的默认证书位置，如果您使用别的证书位置的话需要手动修改一下；最后是这个地方不用证书我不清楚可不可以，如果不用证书的话还是用端口吧，端口号也没什么不好的……

Nginx 的默认配置路径在 `/etc/nginx/sites-available` 里，将它保存在这个位置，命名为 `stronghold` 之后用 ` ln -s /etc/nginx/sites-available/stronghold /etc/nginx/sites-enabled/` 可以创建一个软链接来让 Nginx 读取到这个配置（方便管理）。此时记得运行 `nginx -t` 来测试配置文件是否正确，无误之后就可以重启 Nginx 服务来加载这份配置文件了。我使用 SystemD 来启动 Nginx 服务，因此只需要 `systemctl restart nginx` 就可以了，以后使用 `server_name` 下的地址就可以启动游戏了。

## 更新版本！

这个项目目前在积极开发中，经常会发布新版本（大概一两天一版），为了让群友及时品尝到最新版本的卫，作为客服小A自然要为群友积极更新。

其实说是更新，就是从头构建镜像并启动容器。用到的命令如下：

```sh
docker compose stop
docker compose down
docker image rm stronghold-protocol
```

这几个命令挺好理解的，第一行先停下当前的容器，第二行删除当前的容器，第三行则删除之前构建的旧镜像。在这之后我们可以将更新压缩包解压到当前文件夹下。如果您没有删除整个文件夹的话， `compose.yml` 这个文件依旧会存在并起作用，只需要在得到的文件夹内运行 `docker compose up -d` 就可以重新构建镜像并运行了。记得一定要先删除旧镜像哟！不然 `docker compose up` 会默认使用 “最新” 的镜像，而用这样的 `compose.yml` 构建出的镜像是 `latest` 版本的，即 “最新” 的。如果您在构建时希望把版本号附在上面，可以在 `compose.yml` 里使用 `image: stronghold-protocol:v0.2.0` 来指定使用的镜像版本。也许这样能解决必须要先删除旧镜像的问题？我暂时还没有尝试过。

最新的 v0.2.0 版本提供了 *lite* 包，不知道以后能不能直接下载它来覆盖到原来的内容上实现更新。可以的话会方便很多，但感觉如果有美术/语音资源更新的话依旧需要用完整包进行部署。

## 尾声

其实我自己不玩卫，这个项目部署到自己服务器上一来就是方便群友，让群友玩的开心，而来则是提高这个小鸡的利用率，不然就用来挂一个 NAS 挂一个音乐服务感觉还是有点没意思。

我部署的位置就不公开啦，害怕小鸡被打…… 希望以后能出一个密码墙之类的，或者也许可以用反代工具 Nginx 试着实现这个功能？这些也都是后话了。另外虽说用 Docker 部署的这个项目，我对 Docker 的具体操作依旧不熟悉，而且 Dockerfile 我自己也不会写。如果我对 Docker 更熟悉一些的话也许可以考虑增量更新之类的功能？不过目前只能就这么部署了。

希望群友们玩的开心！也希望这篇文章能帮助您了解怎么部署这个项目（虽然大概率用不上吧，太简单了）。那么，一如既往地，祝您身体健康（我感冒了呜呜呜），假期愉快（虽然已经是最后一天了？）


