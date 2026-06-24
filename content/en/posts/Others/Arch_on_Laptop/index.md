---
categories:
# - Mathematics
# - Programming
# - Phase Field
- Others
tags:
- Arch
- Linux
- Software
title: "Installing Arch Linux on a Laptop (Physical Machine)"
description: "Holiday's here, time to mess with my laptop~"
date: 2025-05-02T16:12:04+08:00
image: /images/Alice.png
math: true
license: 
hidden: false
comments: true
draft: false
---
*Installing Arch Linux on a virtual machine before was just not satisfying enough (lol, you didn't even finish the series (x)), so this time I'm putting Arch on my little thin-and-light. And along the way, documenting the pitfalls you might hit on real hardware?*

*The header image is from R Sound Design's new track 《アリス？》, a really cheerful Vocaloid song~ Bilibili [submission](https://www.bilibili.com/video/BV1UtV5zqEjC/)*

{{< music auto="https://music.163.com/#/song?id=2702335223" loop="none">}}
*~~Sadly, both NetEase Music and QQ Music don't have this song yet, so you'll have to hop over to Bilibili to listen. Once there's an update I'll paste it right here~~*

*NetEase Music has this song now!~*

## Prologue: I'm in a hurry, why is power drain so bad

> Dear Laptop:
> 
> <p style="text-indent: 50px">Plugged in, it feels like we've just met. It's been over a year since we first crossed paths. The last time I saw you, well, felt like the last time. As a traditionalist, I flashed you with Windows 10 because the aesthetics of Windows 11 were violently assaulting my eyes. We conquered obstacles together, installed all sorts of messy drivers, and in the end, I got you up and running. Sure, your RAM isn't much, your storage is modest, your CPU is average, and your graphics are integrated, but you have to believe me — you're in my heart.</p>
> 
> <p style="text-indent: 50px">However, the Windows 10 on you, familiar as it is, has terrifyingly high power consumption. I can't stand a workflow where every unplugged moment feels like a race against time. I blame all of this on the damn Microsoft, the damn Windows 10. It's not your fault, but I still want to tell you: you're about to carry a new system. She's lightweight and nimble, yet bold and sizzling — I'm sure you two will get along great.</p>
>
> <p align="right">Love, </p>
> <p align="right">A Moment</p>

The beautiful May Day holiday — it'd be a shame not to do something crazy. Looking at my Windows 10 laptop with growing dislike, and with my heart gradually captured by Linux (Arch Linux specifically), I decided: kill Windows 10, fully embrace Arch Linux. Surely, having prior experience installing Arch Linux, this installation journey will be smooth sailing. Let's begin.

## Preparation: Backup and Bootable USB

First, of course, back up all existing data on the laptop. Honestly, there weren't that many files — mainly two unfinished visual novels (guilty), since most files had already been moved to my desktop. At first, I thought about keeping the files on a carefully carved-out small partition and just not formatting it during installation, but that still felt a tiiiiny bit risky, so I figured I'd just move everything to another machine and wipe the entire laptop drive. Although maybe I should consider smarter backup solutions? Eh, I'll think about it later (adding to the TODO pit).

Second, prepare the bootable USB. I actually wanted to try a different installation medium this time, like a CD-ROM? (Yes, I have an optical disc burner, bought it to listen to CDs (lol)), but ended up ditching the idea because... hassle. Didn't I already have the ISO from the VM installation? Why not just use that? As for why I didn't download the latest one (the newest was literally released yesterday, the May 1st version) — when I was about to download, I saw a small line at the top:

![Isn't it fine to just update after installing? (rolling update breakage warning)](imgs/no_need_for_download.png)

So, why not?

I still used `rufus` to flash the ISO onto my 6+ year-old USB drive. Formatting and all that — `rufus` handles it automatically. There was a small hiccup where `rufus` didn't fully support the latest syslinux version and needed two extra small libraries. Whatever (lol), I chose to trust.

At this point, everything was pretty much ready for installation. I'm sure a veteran could get the whole system installed in no time with this setup. But of course, I'm a newbie, so let's take it step by step. That's pretty much the point of this (and the previous) article: recording my dumb moments while installing a system.

## Starting: Booting into the Installer~

### Getting into the Installer First
Heart pounding, hands trembling — plug in the USB and boot from it, what could go wrong?

Too bad, secure boot was still on. Nothing happened. Searched online for my laptop's BIOS method — Redmi Book 14 requires pressing F2 at boot to enter BIOS, then in the boot settings you need to **set an administrator password first** before you can disable secure boot. Feels a bit like taking your pants off to fart... whatever. Anyway, I got in, entered the installer. Now it really was heart pounding, hands trembling.

(I won't take photos of the screen due to glare — it looks exactly like last time anyway.)

This time I had to be extra careful: this isn't a virtual machine. Even though I could redo everything if I messed up (nothing else important was left on the laptop, I planned to format everything), just knowing it's physical hardware made me a little nervous.

~~Actually, I only started writing this article after booting into the installer. I didn't plan to write one at first, but since I haven't updated the blog in a while, might as well churn one out (lol)~~

### Pre-flight Checks and Network Setup

This time, with the record of my previous install, I could actually just reference what I wrote before. Thank goodness for syntax highlighting — I immediately typed `localectl list-keymaps`. But: it was useless. Bro, you're using a US keyboard layout!? Why would you list all keymaps... never mind, moving on. But verifying the boot mode might still be necessary? Again, `cat /sys/firmware/efi/fw_platform_size`, result was `64`. This probably means my boot mode system is 64-bit, right?

Next, verify networking. I was a bit worried about this step — what if the installer doesn't recognize my laptop's network card? Scary. But let's give it a try.

From the results, I had a `lo` — *virtual loopback interface*, ignore; and a `wlan0` — looks like it recognized my wireless card, nice. But its `state` was **DOWN**, hmm...

(Looking for solutions...)

So stupid. **DOWN** just means I wasn't connected to a network... But according to ArchWiki, first use the `rfkill` command to check if my wireless card is *blocked* (blocked? maybe?), good news — it wasn't; then use `iwctl` to connect. This step felt a bit tedious: first, in the interactive interface, use `device list` to list devices. Lucky for me, it showed `wlan0 powered on` — `wlan0` was my device name. Then `station wlan0 scan` to scan for available networks, then `station wlan0 get-networks` to list them. Here's the magical part: could it connect to my campus network? Tried `station wlan0 connect CSU-WIFI`. Good news — it worked, somehow. Normally, connecting to our campus network requires authenticating through a web page, but maybe because I had just connected on the Windows system, it successfully reconnected? Not sure, but hey, it's a win. Finally, `exit` out of `iwctl`'s interactive interface, then `ip link` to verify: no problem. The green `UP` is so beautiful, ahh.

Dynamic IP should be auto-configured (ArchWiki says it's *out of the box*), so I'll leave it. Maybe later I'll want a static one? Ugh, not understanding networking really gives me a headache. Whatever, whatever. Let's just `ping archlinux.org`.

Nope, no data returned. Totally busted.

(Looking for solutions x2...)

Surrender. It's not like there aren't other WiFi networks to use. Just connected to the office WiFi instead. Of course, here are the blog posts I referenced for connecting to campus networks: [Link 1](https://www.cnblogs.com/holaworld/p/17839616.html) and [Link 2](https://www.bilibili.com/opus/852262124483772422).

Finally, for networking, we also need to set the system time. Use `timedatectl` for that. Thank you `zsh` and the auto-completion these tools ship with — `timedatectl --help`, follow my gut, and I got `timedatectl set-timezone Asia/Shanghai`. Pretty simple.

### Goodbye, My (Old) Files

Here comes everyone's favorite and most nerve-wracking part of every system install: disk partitioning. There's always a sense of breaking down and rebuilding — after formatting the disk, it feels like this computer becomes brand new. Same as before, `fdisk -l` to list available partitions. A bunch showed up — delete, delete, delete them all.

Once again I saw my disk size: only 476.94 GiB. Sad. But, thin-and-light laptop, meant for business trips and casual work — it's fine, right? I'll think about adding capacity or even getting a new laptop later (so extravagant (lol)).

Time to partition. Directly `fdisk /dev/nvme0n1` to enter interactive mode (my disk is the only one, the `/dev/nvme0n1` listed by `fdisk -l`, so just pass it as the argument). Since the drive is small and I don't have elaborate file management plans, just one `SWAP` and one `/` will do. For the partition table, I'm still going with GPT. Apparently GPT is more powerful and has completely surpassed the old MBR? I should really learn more about these things before making judgments, but for now I'll just trust the internet (lol).

I made a huge blunder here: I accidentally partitioned the bootable USB `/dev/sda`. Gotta say, that was pretty dumb... For now, I'll leave it — the installer didn't crash, and as long as I don't touch it, it should be fine, right? But take note for next time: according to the ArchWiki guide, you should actually back up the partition table first. The command is `sfdisk -d /dev/sda > sda.dump` (where `/dev/sda` is the disk whose partition table you want to back up). I'll definitely pay attention next time. Sigh.

Next is formatting the filesystems with `mkfs` and such. A lot of people recommend `Btrfs` — the so-called *B Tree File System* (I initially thought it was *Better File System*) — because it apparently supports automatic compression and other advanced features like snapshots, very convenient for personal use. This time I won't go with the traditional `ext4`, let's try something new. Use `mkfs.btrfs /dev/nvme0n1p1` to format the first partition as Btrfs. I kept one partition as Swap, sized at 8G. Create a swap partition with just `mkswap /dev/nvme0n1p2`.

Partitioned, now mount the filesystems. `mount /dev/nvme0n1p1 /mnt` does it. For Swap, use `swapon /dev/nvme0n1p2`. Now we've prepared the disk, ready to install Arch Linux onto this main drive temporarily mounted at `/mnt`.

## Installation: Sprint! Sprint! Sprint!

One of the souls of Arch Linux might just be the `pacman` package manager. Installing Arch Linux is essentially done through pacman. So first, we configure pacman as needed.

First, choose mirrors. The available mirror list is at `/etc/pacman.d/mirrorlist`. I'll borrow from last time's experience and use `reflector --latest 10 --sort rate` to sort out the 10 fastest servers. After seeing the results, consider appending `--save /etc/pacman.d/mirrorlist` to save them. Of course, before that (learning from my earlier lesson), I made a backup copy of the original file.

Next, install the essential packages with `pacstrap -K /mnt base linux linux-firmware`. The `-K` flag means generate an empty keyring at the destination. (As for what a keyring is — sorry, I don't know. I'll learn it later (lol))

After a long wait, my installation... errored out. First, it was incredibly slow — probably a mirror issue, so I tried `reflector --country China --age 12 --sort rate` to get domestic mirrors; it sped up after that, but then suddenly threw *error: GPGME error: No data*. No matter what I did with `pacman`, nothing worked. I suspect the keyring or something got corrupted — seems like that reckless partitioning of the USB drive earlier caused problems. Had to shut down, unplug the USB, re-flash it, reformat the laptop's drive, and reinstall. Fortunately, the second install was fast, and this hiccup passed.

Now, what was installed should be the most bare-bones packages. To have some extra functionality after installation (like networking), I need to install a few more packages. I'm planning to install `vim`, `dhcpcd`, and `networkmanager`. But I'll deal with those after `chroot`.

(Installing...)

---
*Let's just pretend this silly kid messed around and eventually got it installed. There were probably more hiccups along the way, but after he installed it he really just sprinted through everything, finished up, and took the laptop back to the dorm to keep tinkering. By the time he remembered to write this blog post, 10 days had passed. Forgive him — he's forgotten a lot of the details too.*

---

Alright, installation successful! Now, how should I decorate it?

## Customization: Let's try KDE first, and deal with IME, fonts, and networking issues along the way

*The following content is all recalled by this silly kid, and a lot of it might be off (probably). Please reference with caution.*

### Dunno, Let's See KDE Plasma First

Pretty much just copied the KDE Plasma installation procedure from last time. The packages installed, the settings configured — almost identical. The difference might be that the `locale` setup was a bit more involved this time? Can't recall clearly. The main issue was that every time I used `man`, it complained about `locale` configuration errors. The fix was simple: just redo the locale settings following the ArchWiki Installation Guide. Everything else — like setting up the Taskbar and Terminal — was basically the same.

One great thing about KDE Plasma is that it's almost out-of-the-box ready, except for two important but not mandatory packages: a file manager and a terminal emulator. In theory, you should use KDE's own `Dolphin` and `Konsole` for the best experience (maybe), but after experiencing `Konsole`'s slightly (really, just slightly) dated UI, I chose `kitty` instead. It natively supports viewing images, which is kind of a killer feature; it also comes with multi-tab support and convenient split panes — feels really comfortable to use. As for the file manager, no particular thoughts yet, so I'll stick with `Dolphin` for now.

### Input Method: Still Using Little Penguin (fcitx5) and Rime

I could pretty much just say "same as above" or something, because the end result was basically identical to the VM installation, except I didn't import my pre-configured profiles from Windows this time, that's all. But the process still felt a bit painful, especially when I kept agonizing over where the input method settings actually were. In reality, according to fcitx5's documentation, when using Wayland, you just set the environment variables as instructed, reboot, and you'll see the effect in the input method section. (Maybe you don't even need to reboot — just logging out and back in might do it?)

The default Rime setup is actually quite usable already. The problem is, its default input is Chinese, yet on the Linux command line you almost never use Chinese. Every accidental input triggers nameless fury. The solution is simple: put an English input method first. I don't mean making Rime's English mode the default, but installing a separate English input method and placing it at the top of the list. I actually do the same thing on Windows. Works great for daily use.

### Networking: Surfing Scientifically Is Not Easy

Through tireless effort and unrelentingly bothering AI, I successfully found a way to surf scientifically on my little craptop. I won't go into details, but the core is just one thing: use TUN mode. Once TUN was enabled, everything was right — completely right! Thank you AI, thank you DeepSeek, thank you ChatGPT! Greatness needs no words.

### Fonts: Copying the Tutorial

I didn't really pay much attention to fonts during the VM installation. This time, since it's for daily personal use, I took notice — after all, seeing oddly-shaped Chinese characters every day is genuinely jarring. Font configuration was basically following [this blog post](https://catcat.cc/post/2021-03-07/). Thank you, wise elder. But note: when reading (or, copying), you still need to be careful — some settings aren't actually the best, and can be replaced by better configurations that appear later in the post. I suppose it also serves as a slight barrier to leeches? Maybe?

### Fingerprint: Wuwuwuwu How Can Hardware Be Closed-Source

My laptop's feature I'm most proud of is its excellent fingerprint recognition. It didn't seem urgent at first, but once I thought about it, I really wanted to tinker. Especially since typing passwords every time is genuinely tiring. Sure, this laptop is just for me and there's nothing sensitive on it, but I still don't want to run naked without a password. And if I had fingerprint, everything would feel familiar. Ah, how wonderful that would be.

Until I spent over two hours getting fingerprint recognition almost fully configured, only to discover that the stupid Redmi Book 14 (under the foolish Xiaomi brand) uses a closed-source fingerprint module with no reverse engineering attempts — there's currently no driver that can enable it.

Tears just streamed out. Especially when the stupid Firefox stubbornly insisted my laptop had usable fingerprint recognition — I couldn't even generate a GitHub token without it demanding my fingerprint. Press my ass.

Sigh.

## Wrap-Up: Another Rambling Log, But Let's Still Summarize

It feels like this post didn't contain anything substantial — just pure record-keeping and me muttering to myself. Given that, I've decided to summarize the main pitfalls I ran into and the general installation flow, as a quick reference.

### Quick Reference: Installation

Here's the process from initial preparation to getting a usable system:

0. Prepare bootable USB, backup, yada yada
1. Boot the system from USB, enter the shell, perform basic checks (system architecture, keyboard layout, network verification, timezone setup...)
2. Partition the disk (important) and format, mount the filesystem
3. Check `pacman` mirror speed and choose, install essential packages (base, linux, linux-firmware)
4. `chroot` into the mounted filesystem, install necessary tools (network manager, text editor, pager, man-pages)
5. Set up bootloader (important and tricky), read the docs carefully
6. Attempt reboot and boot via bootloader, enter `tty1`

### Quick Reference: Customization

Here's part of the configuration process to get my current environment:

0. Installed, ensure Arch Linux boots correctly
1. Use `nmcli con up` to start networking (later found `nmtui`), ensure network connectivity
2. Add the `archlinuxcn` repository
3. Update and install packages. I installed `vi`, `sudo`, `git`, `eza`, `zsh`, `nvim`, `kitty`, `firefox` and other basic tools
4. Install `oh-my-zsh` and `oh-my-posh`, import existing configs, add common aliases like `l`, `la`, `l.`, `ls.`, etc.
5. Install a window manager — started with `KDE plasma` as an "at least usable" desktop environment, with `dolphin` as the file manager
6. Install Chinese input method `fcitx5-im` and `fcitx5-rime`, perform necessary configuration (XDG config, etc.)
7. Modify `localectl` so `man` works properly
8. Install `yay` and attempt to surf scientifically

### Pitfalls Encountered:

Here are the parts that took the most time:

1. Partitioned the wrong disk — should've been nvme but ended up on sda;
2. Didn't think through how to partition, messed around and had to redo;
3. Didn't check mirror speed, leading to turtle-speed downloads (sigh, Arch Linux, dependent on the network, what a shame);
4. When `umount`-ing, didn't `umount` cleanly, causing things to break;
5. When `mount`-ing, didn't verify the correct mount points;
6. Forgot to install network manager, editor, etc.;
7. Didn't set up the `bootloader` correctly (you MUST read through the `bootloader` entry on `ArchWiki`!);
8. Didn't handle `localectl` and `locale` properly;
9. Didn't reboot after installing `fcitx5` (remember to reboot after it's configured to test).

Hope these summaries help you, and make this post not a complete waste.

## Postscript: I Must Have Some Weird Fantasy About Linux

> Dear Arch Linux Laptop:
> 
> <p style="text-indent: 50px"> Finally, BTW, I USE ARCH!!! Thank you for the journey we've been on together. Ever since installing Arch Linux, you've been blazing fast. Before I could even come to my senses, you had already booted. The KISS principle, the elegant balance pacman and AUR strike between simplicity and richness, the thrill of rolling releases — it's all so exhilarating. The advanced Arch Linux has completely surpassed the decrepit Windows!</p>
> 
> <p style="text-indent: 50px"> However, maybe I still misunderstand you too much. After installing Arch Linux, you didn't become more power-efficient — you actually seem to use even more power? I hope this is just because I haven't set up power management properly, but why can't you handle this for me? I get it, we Linux folks believe that to celebrate a birthday you should start by raising chickens and running a farm, but why? Also, why can't you handle closed-source drivers? Can't we use a compatibility layer? And speaking of which, it pisses me off — how come your config files can still end up as messy as Windows? Why don't you rein in software packages that crap everywhere? I understand the philosophy, but shouldn't a sysadmin not be buried in this stuff every day? Also...</p>
> 
> <p align="middle"> -- 2000 words of ranting omitted -- </p>
>
> <p style="text-indent: 50px"> But, you know, you're Linux, right? You're a mature operating system by now — you should learn to handle these problems yourself, right?
> <p align="right">Yours, </p>
> <p align="right">A Moment</p>

Thank you for reading this far. Reading through this mountain of nonsense — honestly, it must've been tiring. If these shenanigans brought you a little joy, then that's wonderful. As always, I wish you good health.
