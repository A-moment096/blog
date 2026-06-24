---
categories:
# - Mathematics
- Programming
# - Phase Field
# - Others
tags:
- Linux
- Shell
- Tools
- Note
title: "Syncing with rsync"
description: 'A simple note on how to use rsync'
date: 2025-07-28T12:43:39+08:00
image: /images/贝加尔湖畔.jpg
math: true
license: 
hidden: false
comments: true
---

*Kinda getting tired of `scp` and `sftp`. Maybe I've just been using them wrong, but either way, I'm going with `rsync`!*

*~~Couldn't find the source for this image... Snagged it from a friend -- it's gorgeous, so I put it here.~~ Found it! It's by [fasnakegod](https://www.pixiv.net/en/users/8605991) -- [Lake Baikal](https://www.pixiv.net/en/artworks/125739568). With that, let me share a piano piece. Here's **Kishi Ou no Hokori** (The Pride of the Knight King) for you all. (Totally unrelated, come on!) *

{{< music auto="https://music.163.com/#/song?id=448119" loop="none">}}

## Why Choose `rsync`?

Sometimes we have multiple remote computers or servers, and we want to download files from them to our local machine. We usually have a few options: use some mature terminal emulators designed for SSH connections, like MobaXTerm; or we can use tools like `scp` or `sftp`, but their interfaces are a bit barebones -- especially `sftp`, where you constantly need to double-check whether you typed the filename correctly. And sometimes we only need to download the parts that differ, without re-downloading what we already have. This is where `rsync`, the *remote sync* tool, gets to shine.

## How to Use It

### Command Structure

The `rsync` command is used like this:

```console
rsync --option1 --option2 /pass/files/from/this/ /path/files/to/here
```

So it basically follows the pattern: `command, options, where from, where to`. Also, since `rsync` is short for *remote sync*, this command naturally works for transferring files between remote servers too. The method is quite simple: just prepend the file path with the SSH username, server address, and other info. We'll cover the specifics below.

### Watch Out for the Path Separator `/`

First, something that needs emphasis: pay attention to the `where from` part, the source side. In the example it's clearly a directory, since the path ends with a `/` symbol. Some might ask: I know it's a directory, but can I skip that `/`? Like using

```console
rsync --opt1 --opt2 /pass/files/from/this /path/files/to/here
```

to send the directory over -- is that OK?

The answer is interesting: yes, you can send it, but maybe not the way you expected. Since `rsync` by default treats the destination as a directory, if you omit that trailing slash, `rsync` will think you intend to place the directory `/pass/files/from/this` **inside** the destination. If that's exactly what you want, then no problem. For instance, if you have a local directory `$HOME/mydocuments` and you have a directory at the same path on the remote server, you can try

```
rsync -r $HOME/mydocuments me@remote:/home/me
```

This will directly place `$HOME/mydocuments` inside the remote `/home/me` directory, forming `/home/me/mydocuments`.

But if what you mean is, "I want to send the **contents** of `$HOME/mydocuments` to `/home/me/another/position`," then you need that trailing slash, because `rsync` will smartly send everything *inside* the directory to that destination directory. This might actually align with the "everything is a file" philosophy: without the separator, you're sending this *file* (directory) into the destination folder; with the path separator, you're saying you want to send the directory's contents.

### Remote Connections

As a remote sync tool, `rsync` naturally needs a way to tell it where to send files from and to. The good news is that `rsync` supports transferring files over SSH, and the method is particularly simple. Just prepend the file path with your username and hostname. If you've configured SSH host aliases, it's even more convenient.

Here's a very simple example: from the local machine to the local machine, but via SSH. We can use `ssh <user>@localhost` to log into a local account on the same machine. My username is `amoment`, so I'd use `ssh amoment@localhost` to log in locally. Then we can tell `rsync`:

```console
rsync -r /home/amoment/myfiles/ amoment@localhost:/home/amoment/somefolder
```

to copy/sync the contents of the `myfiles` directory under my home directory to the `somefolder` directory, also under my home directory. With this example, you should understand how to use `rsync` across devices over SSH for connections and file transfers.

Besides SSH, `rsync` supports other protocols too, like the so-called RSH, or `rsync`'s own `rsync://` protocol. But since SSH support is much more widespread, we'll only cover that approach here. If you're curious, check out `rsync`'s manual or documentation.

### Some Important Options

Below are some important options that you'll likely use frequently. I've roughly grouped them by category for easy reference.

#### File Operations

- `-r --recursive`: Recursive mode

It stands for *recursive*, meaning send everything recursively. What happens if you don't include this? The good news is you'll still complete the transfer, but the bad news is, you'll **only send the directory itself**. In other words, unless your goal is just to create a (possibly new) directory at the destination, remember to bring `-r` along if you want the files transferred.

- `-a --archive`: Archive mode

You can also choose `-a` instead of `-r`. Using `-a` transfers files in archive mode, meaning everything inside the directory will be sent *exactly as-is*: whether files, directories, symlinks, device descriptors, etc., all will be preserved in their original form. `-a` is actually a combination of several options. According to the help docs, it's `-rlptgoD`. That's quite a bunch...

- `--delete`: Allow deletion of out-of-sync content

Because `rsync`, as the name suggests, is *sync software*, we might sometimes want not just to "upload" files, but to *sync the local file structure to the remote*. In that case, we need the `--delete` option, which gives `rsync` the right to delete extraneous files in the destination directory, ensuring you are truly *syncing* the content.

- `--exclude` `--include`: Exclude/include by pattern

Let's cover these two together. As the names suggest, they tell `rsync` which files to exclude or include. If you have files you don't want to send, or specifically want to send, set these options.

- `--ignore-existing`: Skip transferring files with the same name

Adding this option makes `rsync` check the names of files already on the receiving end. If both the source and destination have a file with the same name, it will skip that file without transferring.

- `-u --update`: Only transfer updated content

This option means you intend to *update* the files. So, what if the file on the receiving end is newer than the one on the sending end? The answer is: those files won't be touched.

- `-z --compress`: Compress first

This option tells `rsync` to compress what you're sending before transferring. `rsync` will choose a compression method itself, so there's generally no need to worry.

#### Information Display

- `-n --dry-run`: Dry run

If you're worried that what gets sent isn't what you actually intended, you can have `rsync` tell you what the current command *would* send without actually doing any work -- just add `-n`. You can think of it as *no*, even though its full long option is `--dry-run`. This command is really useful when you're unsure what will be transferred.

- `-v --verbose`: Be more verbose

Almost all (relatively complex) command-line programs have an option like this to display work info in a "more verbose" way. If you need extra information, use this option.

- `-P`: Progress bar

This makes `rsync` report the current transfer progress. I really like using this one.

#### Involving `rsync` Itself / Remote Collaboration

- `-e --rsh`: Specify the transport protocol

Maybe the device we're transferring to has its SSH port on a custom port instead of the default `22`. In that case, we need `-e` followed by a string indicating which shell to use. For example, if my remote receiving end is on port `1145`, I'd use

```console
rsync -r -e "ssh -p 1145" /myfiles/ me@remote:/myfiles
```

to tell `rsync` to attempt SSH communication and file transfer on port `1145`.

- `--rsync-path`: Where is `rsync`?

Sometimes we need to help the local `rsync` find where the other `rsync` actually lives. In that case, we need this option, followed by a method for locating `rsync` -- whether a path to `rsync` or something else. For instance, if the target device has `rsync` but it's on WSL, we can do

```console
rsync -r --rsync-path 'wsl rsync' me@remote:/myfiles/ /myfiles
```

to have the remote end use the `rsync` on WSL to do the work for us.

## Afterword

My initial reason for using `rsync` was mainly to sync my music library across different devices. Since I had already moved some songs via an external hard drive, but some still weren't synced, and on another computer I'd even added a new album, manually hunting down the files to migrate felt like too much work. That's when `rsync` caught my eye with its **incremental sync** feature, so I used it to sync my remote songs down to my local machine.

`rsync` is pretty handy. Its syntax might not be the smartest, but it's more than enough to handle the problems I ran into. I vaguely recall some other sync tools, like `Syncthing` that a friend recommended -- maybe I'll give that a try sometime later.

Also, I have to mention the sources I consulted while preparing this article. Many thanks!

- First, ChatGPT and Deepseek -- asking these AIs when you know absolutely nothing is really helpful;
- [rsync tutorial](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories): A simple rsync walkthrough that helped me a lot;
- [rsync command in Linux with Examples](https://www.geeksforgeeks.org/linux-unix/rsync-command-in-linux-with-examples/): A blog post on GeeksForGeeks with very rich content.

Finally, thank you for reading this far. Wishing you good health and a cheerful mood~
