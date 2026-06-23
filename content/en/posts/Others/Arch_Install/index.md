---
categories:
- Programming
tags:
- Arch
- Linux
- Software
title: "Installing Arch Linux from Scratch"
description: A record of my journey learning to install Arch Linux
date: 2024-11-10T22:34:55+08:00
image: /images/Reimu_Water.jpg
math: 
links: 
  - title: Arch Linux+KDE Installation Guide & Pitfall Log by Azure Zeng
    # description:
    website: https://blog.azurezeng.com/installation-guide-for-archlinux-kde/
  - title: ArchLinux KDE Plasma Installation and Common Issues by Skyone
    description: 
    website: https://www.skyone.host/2024/archlinux-plasma-faq#input-method
---
*I've long heard of the legendary Arch Linux. I once tried installing it on my own computer, but failed miserably. Recently the urge to try again resurfaced, so I'm recording the process here — partly as notes, and partly so I can look back later and laugh at my own absurd missteps.*
<!--more-->
## Prologue: Linux and Me

My acquaintance with Linux began during the pandemic, when I was stuck at home with nothing to do, starting with installing Ubuntu on my Dell laptop. Before that, I only knew that beyond the vast empire of Windows there lay a hidden paradise called Linux (yes, I didn't even know Mac OS existed back then, lol). As my interest in programming gradually deepened, I grew more and more curious about what this operating system that "only the pros can handle" actually looked like. So, with my father's help, I carved out a small slice of hard drive space on my Dell for Linux (yes, I was trying to set up a dual-boot system) and installed Ubuntu. The whole process took an entire day, even sparked a minor argument with my dad in the middle, and drained what little energy I had. Naturally, after the install, I opened it once, installed QQ to show off to a classmate, and then... nothing. It vanished the next time I formatted the hard drive.

My second attempt at Linux came during my bored-out-of-my-mind days in the UK. Once again driven by curiosity about computers and what Linux was like, I tried installing Linux on my own again. This time I followed Uncle Bird's (鸟哥) tutorials, so I installed CentOS as recommended. Hmm, this system felt a bit dated or something — it doesn't seem very popular these days. Uncle Bird's tutorials were remarkably thorough and thoughtful; even a total newbie like me (maybe) muddled through the installation on a virtual machine, tried a few commands, and glimpsed the magic of the command line. But maybe my curiosity was too hyperactive, or for some other reason, my interest quickly wandered off, and this Linux exploration ended at learning how to shut down from the command line (which, of course, I've now forgotten haha).

The third attempt came after starting grad school. Since my programs needed to run, compile, and debug under Linux, I tried Linux once again. But this time, I used WSL. At first I installed Ubuntu again, but then I kept seeing "BTW, I use Arch" memes online, along with all kinds of recommendations, so I tried installing Arch Linux on a VM. But perhaps I was too impatient — I couldn't pull it off. Later I installed some pro's Arch WSL setup, which has now bid farewell along with my old laptop's retirement.

Currently I still mainly use Linux through WSL — it really is convenient. But deep down, the itch remains: why can't I just install Arch? So this time, I WILL install Arch Linux no matter what! Even if it ends up as dust-gathering software in the corner of some folder, I want to proudly declare: "BTW, I use Arch!" (Next episode might be Debian, who knows, hahaha.)

## Preparation: VirtualBox and the Arch Mirror

Looked around my computer and realized I hadn't brought the VMware Workstation installer over to this new machine. And even though VMware Workstation 17 Pro is now free, it still demands registration... So I went with Oracle's open-source VirtualBox instead. Next up, the Arch Linux source — I chose to install via ISO image, downloaded through [Alibaba Cloud's mirror](https://mirrors.aliyun.com/archlinux/iso/2024.11.01/) (basically just the first option, too lazy to scroll further). Took about 40 minutes to download; speed felt decent for a 1 GB file.

In VirtualBox, I reserved 4096 MB (4 GB) of RAM and 8 GB of disk space for Arch. Hopefully that's enough. After verifying the SHA256 checksum — and since I hadn't pointed the VM to the Arch ISO when setting it up (it hadn't finished downloading yet) — booting the VM showed "failed to boot" and asked me to specify a DVD path. Picked the Arch ISO, hit `mount and reboot`, and I was greeted by the Arch installation screen. From here on, we're officially entering Arch Linux installation territory.

## Getting Started (Pre-Installation)

### A Stylish Splash, Then into the Shell

![Installation begins!](imgs/Welcome.png)

Here we open the [Arch Linux Installation Guide](https://wiki.archlinux.org/title/Installation_guide) to follow the official instructions. I don't plan to use `archinstall` — feels like it takes the fun out of it (~~said the same thing last time~~). Per section 1.4.2, since we're using optical media (an ISO counts as a disc image), the first option works fine.

![Very stylish](imgs/Hacking.png)

The screen flashed with some very hacker-esque visuals (my guess is a system self-check, probably systemd, since there were lots of green "OK" labels on the left), and then we arrived at this:

![Installation screen 1](imgs/Install_1.png)

According to section 1.4.3, we've landed in the first virtual console, logged in as root, with Zsh as the shell. Thank goodness for virtual machines — no need to worry that stupid commands under root will kill my computer (and me). Let's continue~

### Keyboard Mapping, Fonts, and Verifying the Boot Mode

Next up: setting the keyboard mapping. Honestly the US keyboard seems fine, but let's take a look anyway. Who knows, maybe I'll want Chinese input methods later — I've seen Rime (小狼毫) before and it looked pretty good (still using it now).

Anyway, I digress. The command to view keymaps is `localectl list-keymaps`. This command feels easy to break down: "locale ctl" — has a localization-control vibe. Bam! Right after entering the command, a looong list pops out! It should contain every keyboard mapping option Arch Linux supports. Looks like they piped it through Vim for display, so all Vim operations are supported (though I only know a handful, plus how to quit). Bad news: no Chinese options. But that's probably me being dumb — Chinese input actually uses the US keyboard layout... Anyway, we'll just accept the default settings and not bother changing the keyboard layout. Later I might consider remapping `CapsLock` to `Esc`/`Ctrl`, but for now, let's skip it. We could also set the console font here, but... skip that too, future problem. I feel like the main goal at this stage is just to get Arch Linux installed smoothly — personalization should come after the system is set up.

Now to verify the boot mode. The command is `cat /sys/firmware/efi/fw_platform_size`. WTF? It says no such file. According to the guide, this means the system booted via BIOS or CSM. Checking the VM settings under Motherboard, I see "Enable EFI" is not checked. Alright, so it's BIOS boot then.

### Verifying the Network, Then Updating System Time

Time to connect to the network. As a networking noob, all I can do is follow the guide step by step. First, check if the network interface is up using `ip link` — I got two lines: one for *lo* and one for *enp0s3*. No idea what those mean. Checking the Arch Wiki on network interfaces: lo is a *virtual loopback interface*, not used for actual networking. The other one, enp0s3, looks like the real network interface. According to the docs, *en* stands for Ethernet, and as long as it shows *UP*, the interface is enabled. Great — no obstacles on the network front.

My VM uses NAT, which, according to Google, stands for Network Address Translation — a technique for remapping IP addresses. Sounds a lot like what routers do. Per the installation guide, all we need is to plug in the Ethernet cable and set up DHCP, and DHCP seems to auto-configure itself. So actually, there's nothing to do. The final networking step is to try `ping archlinux.org`. Nice, results came back! From what I know, this command sends a few short data packets to a server and waits for it to respond, measuring network latency. Besides [archlinux.org](https://archlinux.org), I also tried pinging Bilibili, Google, Baidu. All good except Google — probably because my proxy doesn't cover the VM's ports (wild guess). Anyway, networking is sorted. Next: updating the system time. Easy — just `timedatectl`. Piece of cake. Looks like it's 4:30 PM US time.

### Partitioning the Disk — Then Formatting and Mounting

Now comes disk partitioning. I always get nervous at this step — not sure if it's because I've messed up a disk before (though that was physical damage, nothing to do with the OS). Let's see what devices are available: `fdisk -l`. Two devices found: `/dev/sda` and `/dev/loop0`. One is the 8 GB solid-state virtual filesystem I reserved, the other... I'm not sure. The tutorial says anything ending with `loop` can be ignored — but mine starts with `loop`... Oh well, should be fine. The guide also mentions that if disks don't show up, I need to make sure the disk controller isn't in RAID mode. RAID, huh — seems like disk arrays might complicate an Arch install. Since my disk is plain SATA, I'll skip the NVMe-related notes.

Now to begin partitioning in earnest. The guide specifies two partitions: **one for mounting the root directory `/`** and **an EFI system partition for UEFI boot**. That EFI partition rings a bell — in Windows's Disk Management, you can see an EFI system partition right inside the `C` drive. Looks like EFI is a pretty universal boot method these days. Then I realized: I set the disk space way too small. The tutorial recommends at least 23–32 GB for the root mount. Ugh. How frustrating. Time to scrap this VM and start over.

Waiting...

Fortunately, everything up to now was mostly just checks, so I can skip straight past them. Reallocated disk space to 64 GB, booted up, and now we can partition for real. The tutorial mentions a few points: 1. Plan your space allocation; 2. If setting up storage pools, do it now; 3. If the disk already has an EFI partition, don't create another; 4. You can set up swap on filesystems that support it. There are also two partitioning examples below — let's try the simplest one, the first scheme in section 1.9.1. Personally, this scheme feels pretty suitable.

We use `fdisk` to create disk partitions: `fdisk /dev/sda` (the disk I'm partitioning is `/dev/sda`, hence the argument). I've never used this CLI tool before (last time I installed, I think it was a different one, with a TUI. Or maybe fdisk has a TUI too and I just didn't trigger it this time). Consulting the fdisk docs, starting from section 4 — first thing it says: creating partitions will wipe all data on the disk. Terrifying. Good thing we're on a VM. It shouldn't touch my precious C drive, right?

First, create a partition table. I'll use MBR since that's the default. According to online searches, MBR is also suitable for smaller disk capacities like mine. Then press `n` to enter the partition creation wizard. It asks for partition type (primary or extended), partition number, and start and end sectors. The first partition goes to `/boot` as the boot partition — defaults for everything before the end sector (primary, number 1, starting at sector 2048), then `+1G` to give it 1 GB. Create the second partition, also default everything before the end, use `+4G` for 4 GB. I'll make this 4 GB into swap (basically virtual memory). First use `l` to see the partition type codes (swap is 82), then `t` to change the partition type, pick number 2, type 82. Finally, give all remaining space to the third partition, and mark partition 1 as bootable (use `a` then select 1).

At this point, `p` shows the partitioning results in a neat table. Once confirmed, `w` writes the partition table to disk. Next we need to format the filesystem; otherwise, the OS won't know how files are stored. First, `lsblk -f` to check current disk info (or just the partition layout we made). Here's what I got:

![lsblk -f result](imgs/DiskPartition.png)

This shows the `sda` disk has been divided into three regions, none of them mounted. Then I noticed a problem: I'm using MBR partition table, so why did I create `/boot`, which is recommended for GPT? And earlier I confirmed EFI wasn't enabled, yet now I'm making an EFI-style `/boot`? Ridiculous. Fine, let's re-partition.

Waiting...

Alright, with practiced skill ~~(i.e., just learned)~~, first use `d` to delete all partitions, then create a 4 GB swap partition and a bootable root directory partition. The new layout looks like this:

![New partition layout](imgs/DiskPartition1.png)

We'll use the classic `ext4` format (basically the tutorial's recommendation) for `/dev/sda2`: `mkfs.ext4 /dev/sda2`. Then `mkswap /dev/sda1` to format `/dev/sda1` as swap. The overall result:

![Partition formatting](imgs/DiskFormat.png)

Finally, we mount the filesystem. I've learned this part — use `mount` to attach hardware to a directory. First mount the root directory to `/mnt`: `mount /dev/sda2 /mnt`. Since I have no other file partitions besides swap, we just run `swapon /dev/sda1` to enable swap.

## The Actual Installation

Just realized — the previous section was titled "Pre-installation." I'm dying. Was ALL of that really just preparation? Looking back, it kind of makes sense — nothing involved actual software installation, more like creating an environment where Arch Linux could be installed. But the Installation section in the guide only has two subsections, so maybe it's not that complicated after all.

First, choose a mirror. This mirror selection seems to be about setting up pacman's mirror sources for the system. Arch already has a mirror server list generated by Reflector at `/etc/pacman.d/mirrorlist` — you can view or edit this file to prioritize the geographically closest servers. I used `reflector --latest 10 --sort rate` to sort the 10 most recently updated servers by response speed. A lot of them timed out. Tried `reflector --country China --age 12 --sort rate` twice — results were hit and miss. Whatever, at least when it works, there are sources available. Use `reflector --country China --age 12 --sort rate --save /etc/pacman.d/mirrorlist` to save the output to `/etc/pacman.d/mirrorlist`.

Now install essential packages. Per the tutorial, this includes the `base` package, the Linux kernel, and common firmware. Command: `pacstrap -K /mnt base linux linux-firmware`. Then the installation screen appears.

![Installation](imgs/Installation.png)

Looks like 127 packages to install — not a small number. And my internet speed doesn't seem great either. Time to wait. This installation progress oddly reminds me of installing $\LaTeX$.

Waiting...

Huh? The rest went by that fast? 127 packages weren't that big after all. Here's how it looked after:

![Installation complete](imgs/AfterInstall.png)

You can see some parts are missing. Shouldn't matter — a VM might genuinely lack some non-essential components. You can also install extras like CPU microcode updates (`microcode`), RAID utilities, etc. I'll skip those for now and install what I need later with `pacman`. As for `microcode` — since I'm on a VM, the instruction set patches should live on the host machine (this Windows PC), so no need to install.

Turns out you don't actually need `linux-firmware` when installing on a VM... uh, well, whatever. Realized that way too late, lol. On to the next step.

## Configuring the System!

### Fstab, chroot, and Localization

First, generate a fstab file: `genfstab -U /mnt >> /mnt/etc/fstab`. Then check the result with `cat` and fix it if anything's off. The Arch Wiki page on `fstab` has some examples, so I won't belabor it (mine seemed fine).

Now change root into the new system: `arch-chroot /mnt`. According to the Chinese Arch Wiki, chroot is "the operation of changing the apparent root directory for the current process and its children." Seems like after the change, the process treats `/mnt` as its root directory `/`:

![After chroot](imgs/Chroot.png)

My bold guess: we've now transferred the process from the system in the ISO file to the system on my VM. Though I have no idea how to verify this theory. Moving on.

Now set the timezone. China should be GMT+8. According to the tutorial, use `timedatectl list-timezones` to list available timezones. Bad news: there are so many entries that... for some reason, I can't scroll in this terminal (mouse and `Shift`+`PgUp` both fail). After some digging, I learned that scrollback was ripped out of the kernel since hardly anyone uses it anymore — everyone's on terminal emulators now. Fine, redirect the output to a file and open with Vim. But wait — the new system literally has nothing, not even Vim or Nano?! Had to fall back to the installation ISO. China uses `Asia/Shanghai`, so after `arch-chroot /mnt` back to root, set the timezone with `ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime`, then generate `/etc/adjtime` with `hwclock --systohc`.

Next is localization. I personally prefer not to switch to Chinese, and since I haven't installed an editor, I can't change localization settings anyway (so stupid — why didn't I install an editor!). Fine, hold it in a bit longer. Let's set the hostname first. Since there's no editor, I'll just use `echo` redirected to `/etc/hostname`. Assuming no LVM or RAID, the next step is setting the password. Characters are invisible when typing the password, which is normal. Seems like most password inputs on Linux hide the characters — a common privacy practice.

## Boot Loader, and the Fate-Deciding Reboot!

Finally, choose and install a boot loader. This step is critical — without it, Arch Linux won't boot. Based on the boot loader feature comparison table and some online research (actually, I couldn't figure out how to set up EFI boot stub), I chose GRUB. First, install GRUB (and screw it, let's install Vim too while we're at it — can't hold it anymore): `pacman -S grub vim`. Following the GRUB Arch Wiki page, under BIOS Systems, section 2 — Master Boot Record (MBR) (why did I keep circling around UEFI for so long?). Command: `grub-install --target=i386-pc /dev/sda`. Here `--target=i386-pc` is fixed, and `/dev/sda` refers to the disk, not a partition.

After installation, configure GRUB: `grub-mkconfig -o /boot/grub/grub.cfg`. Looks like that's it. That seemed... surprisingly simple. I've got a bad feeling about this. Alright, let's reboot! Hope everything goes smoothly.

It worked! Hooray! But what greeted me wasn't a beautiful graphical interface — it was a spartan tty1, even asking for a username and password to log in. Well, at least the installation succeeded. Now for post-installation.

## Post-Installation Configuration

If we're being strict, Arch Linux is already installed. But I've decided to see this through and configure a system suitable for daily use (~~messing around~~). Following the installation guide, we now jump to the General Recommendations page. That counts as a guide too, so let's follow it.

### System Administration: Adding Users and More

First, let's grasp two concepts: system administration and package management. The first is important for any Linux system; the second is probably emphasized because of Arch's unique rolling release model.

First point: the root account should only be used for system administration. Day-to-day use should happen under an unprivileged (non-elevated) regular user. Use `useradd -m amoment` to create a user named `amoment` and initialize the corresponding `/home/amoment` folder. Then `passwd amoment` to give this account a password. In practice, since I need to be logged in as root to do this, after execution I can `logout` and log back in as the newly created `amoment`.

Next: security. Can't even look at it — the more I read, the more I feel like I'm streaking on the internet (which I probably already am). My cybersecurity awareness clearly needs work. This section is long; I'll read it in detail later. Then: service management, mostly about using `systemd`. Maybe someday I'll need `systemd` for automating some services. Finally: system maintenance needs due to Arch's rolling releases. Since this is a ~~toy~~ system, skip this for now too.

### Package Management: pacman, but...

Arch Linux defaults to `pacman` as its package manager. You use the package manager to install things, provided you have internet. However... good news: my freshly installed Arch Linux mysteriously has no network. So the package management chapter goes on pause — jumping to **Network Configuration** instead.

### Let's Get Networking Before Installing Anything!

The symptom is weird: after `ip link`, all network adapters show as down, and after `ip a`, nothing has an IPv4 address.

- Guess 1: VM settings are wrong
  - Fiddled with NAT network settings for ages, but the problem probably isn't here — NAT was working before, otherwise I couldn't have installed `vim`
- Guess 2: IP configuration is wrong
  - But I don't understand IP either. As a networking (physics) noob, I genuinely don't get these network protocols. Went back to the installation guide — nothing about this either.
- Recollection: There WAS network during installation, and I didn't touch the network environment after.
- Guess 3: Could it be that I didn't install the drivers on my own system?
  - Oh no. Did some frantic searching — turns out I really didn't install the network services `dhcpcd` and `networkmanager`. Sheepishly boot back into the installation ISO, `mount` root partition `/dev/sda2` to `/mnt`, `arch-chroot /mnt`, and obediently install `dhcpcd` and `networkmanager`. Thanks to [this discussion thread](https://bbs.archlinuxcn.org/viewtopic.php?id=12603) and [this blog post](https://www.cnblogs.com/yuxiayizhengwan/p/16576946.html).

Looking back at the installation guide, I now understand what the Note at the bottom of section 1.7 meant: network services are NOT included in the freshly installed system! Okay, installation done. Back to `pacman`.

### pacman: Yes, Kid, It's Me Again

First, to let my regular user elevate privileges and use `pacman`, let's install `sudo` under root: `pacman -S sudo`. After installation, an awkward discovery: my regular account isn't in the sudoers file. The guide says to use `visudo` to edit `/etc/sudoers`, but `visudo` requires `vi`. I installed `vim`, but that doesn't include `vi` by default. The online solutions looked messy, so I just `pacman -S vi` to install it. Then `visudo /etc/sudoers`, insert `amoment ALL=(ALL:ALL) ALL` somewhere (I put it below the root line), and now my personal account can be elevated when needed.

Great, but does this actually explain how to use `pacman`? Not enough, it seems. Consulting the guide: when installing packages, do NOT use `pacman -Sy` — that causes partial upgrades and can easily break the system (a "roll-crash"). Install packages with `pacman -S <pack name>`; upgrade the system with `pacman -Syu`. Let me break down pacman's flags: `-S` stands for *Sync*, meaning this command syncs the corresponding package from Arch Linux's software mirror servers to your local machine. A really novel concept — at least the philosophy has left traditional installation far behind. In `-Syu`, `y` means *refresh* — download the latest package database from the server — and `u` means *sysupgrade* — update all packages on the system. So the meaning of `-Syu` is clear: you don't want to fetch the latest package data without actually upgrading the software. It makes perfect sense to pair them.

Let's look at removing packages. I realized `networkmanager` might be unnecessary — Arch Linux's `systemd` comes with `systemd-networkd` built in. Remove packages with `pacman -R`, but this leaves behind the dependencies that were installed alongside it. To also remove *orphaned* dependencies (some might still be needed by other packages), use `pacman -Rs`. The `s` stands for "recursive." `R` is self-explanatory — Remove. So to delete `networkmanager` without affecting other packages' dependencies: `sudo pacman -Rs networkmanager`.

Finally, let's understand how to list installed packages. `pacman -Q` lists all installed packages (a LOT, since `pacman` was already being used during system installation). Check other query options with `pacman -h -Q` (`-h` for help).

### Desktop Environment: KDE

Alright, we're now just one step away from being able to smugly declare "By the way, I use Arch" — installing a desktop environment. After a not-very-thorough selection process, I decided on KDE Plasma (Gnome's skeuomorphic icons don't really appeal to me, though I do like its left sidebar design — but Plasma can probably do that too?).

Install Plasma via `pacman -S plasma-meta`. There were a few prompts to choose sources for things like fonts and decoders — not much discussion online about these, so I mostly went with defaults. Then casually installed `zsh`, `noto-fonts-cjk/emoji/extra`, `bluez-utils`, `kitty`, `konsole`, and `alacritty`. Three terminals — `kitty`, `konsole`, `alacritty` — are redundant, but I want to try them all.

First, enable Bluetooth: `sudo systemctl enable --now bluetooth`. Then `sudo systemctl enable --now sddm` to enter the KDE Plasma desktop. The rest is clicky-clicky — click, click, ahhhh! I MUST immediately move the taskbar (called "panel" here) to the left!

![KDE Plasma Desktop Environment](imgs/KDE.png)

### Installing Other Tools...

#### Where's My Chinese Input Method?!

To get Chinese input working, I installed the `fcitx` mega-pack: `fcitx5`, `fcitx5-configtool`, `fcitx5-chinese-addons`, `fcitx-gtk`. But I ran into several weird pitfalls:

1. The tutorial said to add some content to `/etc/environment/`, but when I opened it with `vim`, it was read-only. I could force-overwrite, but something felt off. After some searching, I learned: yes, this is permission control. Running `ls -l /etc/environment` shows the permission flags on the left — this file can only be read and written by its owner, while group members and others can only read it, and the file's creator is `root`. So just use `sudo vim /etc/environment` — it's really that simple.

2. To configure Chinese input, I went to KDE Plasma's settings, found `Input Method`, and under `Add Input Method...` at the bottom-right, selected `Keyboard - Chinese`. Nothing happened. Even though the input method indicator showed zh, it still wasn't Chinese output. So weird! But the solution was surprisingly simple: after closely studying various experts' blog posts, I discovered Chinese input isn't called that — you need to directly search for `pinyin`. Unbelievable. My mental state: mildly imploding.

Per `fcitx`'s official tutorial, to make `fcitx5` work, create a file `im.conf` under `~/.config/environment.d/` with:
```bash
XMODIFIERS=@im=fcitx
SDL_IM_MODULE=fcitx
```
After a reboot, Chinese input should work.

#### Still Want to Use `fcitx5-rime`

I installed `fcitx5-rime` straight from the instructions. Just use `pacman`: `sudo pacman -S fcitx5-rime`. Then search for `rime` in the input method settings and select it. But the default dictionaries and configurations aren't quite to my taste. And on Windows, I also use a Rime-family input method (specifically, Weasel 小狼毫), with a customized setup (using `oh-my-rime`, also called the Mint input scheme). So, might as well import the config from Windows to the VM.

To transfer my Windows config files directly into Arch, I needed to install `virtualbox-guest-utils` on the Arch side (use the `-nox` variant if X isn't supported), and add it to systemd services: `sudo systemctl enable --now vboxservice.service`. Then enable Drag and Drop and Shared Folders in the VM settings. I packaged my Rime config files into a tar archive, placed it in the Shared Folder, and extracted it from inside the VM to the required path. I did consider using `ssh` or other methods to transfer the archive, but ultimately gave up. Anyway, as long as the goal is accomplished — `ssh`? Who needs it! ()

#### Can't Do Science Online?

Even though it's a VM, I wanted to try installing some science-going-online tools. I have a working tool on Windows, but it doesn't seem to work well on Linux... After some searching I zeroed in on V2rayA, which can be easily installed with `yay` (? proxy? GitHub?).

After actually trying it, this tool seems to not get along with my current setup? Tried the same tool on Windows and found it really doesn't work well. Oh well. Forget it. What's the worst that could happen without science online?

#### Why Do the Terminal Fonts Look Weird? Alacritty?

I'd heard that Alacritty uses Rust and has outstanding performance. But after I gleefully changed the system font to Chinese, Alacritty's fonts became unbearable...

![Weird fonts](imgs/alacritty_font.png)

What on earth is going on? With help from enthusiastic community members, I checked Alacritty's Arch Wiki and discovered a shocking fact: I hadn't configured any font file at all. Simply installed `ttf-cascadia-mono-nerd` (not strictly necessary), then created a new folder and file under the home directory: `.config/alacritty/alacritty.toml` and edited it with `vim`. The format looks like this:

![alt text](imgs/alacritty_fc.png)

The changes apply immediately upon saving. The `family` name can be found in the system's font management settings — just type it in. You mainly need a monospace font family for proper display. I chose this font because it's the same `Cascadia` I use on my Windows terminal — really like it, so I kept it consistent.

## A 2026 Roast

This guy still hasn't written the ZSH installation section, yet back then he rushed to publish it anyway. Granted, he really has been using ZSH all along, but there's clearly no point in continuing this post anymore. If you're disappointed, please check out one of his newer articles, where he installed Arch Linux on a physical machine (a Redmi Note 14), even though he's now planning to swap Arch out for NixOS...

If it weren't for this site-wide translation effort, this article might have truly remained in this half-baked state forever. If you saw this post before this section was added — sorry you didn't get to see the rest. If you're reading this update now, please, feel free to roast him mercilessly, hahaha!

And so, as always — take care, and may your days be pleasant and productive!
