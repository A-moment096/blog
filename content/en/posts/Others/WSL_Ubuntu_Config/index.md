---
categories:
# - Mathematics
- Programming
# - Phase Field
# - Others
tags:
- CUDA
- WSL
- Linux
- Shell
- Python
title: Setting Up Ubuntu WSL for Machine Learning
description: How to quickly set up a usable Ubuntu WSL (and a few packages)
date: 2025-11-29T14:28:17+08:00
image: /images/ピンクの夢.png
imagePosition: top
math: true
hidden: false
comments: true
---

*Someone needed to set up an environment for machine learning. This is what happened to his computer after setting it up...*

*The header image features an adorable sheep, from [ピンクの夢](https://www.pixiv.net/artworks/112910033#1) by [Ruziかねつカーぺット](https://www.pixiv.net/users/3402557). Pink and cute~*

*The track is [さよならプリンセス](https://www.bilibili.com/video/BV1j3411L76S/ "Original Bilibili link") (Goodbye Princess) from [STUDY WITH MIKU -part2-](https://www.bilibili.com/video/BV1924y1T7mV/ "Bilibili link"), originally by producer [Kai](https://twitter.com/kaivcl), sung by Hatsune Miku. Playful music, so nice...*

{{<music auto="https://music.163.com/#/song?id=2053344485" loop="none">}}


## Background

After attending the Materials Genome Engineering Conference just held in Xi'an, someone was deeply moved:

> Machine learning is amazing! I must start immediately!

So he decided to set up a machine learning environment on his computer. However, he has some... cleanliness quirks. He didn't want his work environment to pollute his daily setup, so he decided not to install these things on his beloved Arch Linux, but instead freshly install an Ubuntu WSL — everything else would be done inside WSL.

He's just finished setting it up, and I've organized his installation process and the pitfalls along the way, recorded here, hoping to help those in need~

(For convenience, I'll switch to first person from here on.)

## Current Environment & Goals

The table below summarizes my current environment:

|     Item     |        Status         |
| :----------: | :-------------------: |
|     OS       |    Windows 11 Pro     |
|    GPU       |   RTX 5060 Laptop     |
|  Terminal    |   Windows Terminal    |
|    Shell     |    Powershell 7       |
|     WSL      | Arch Linux (not used) |
|     IDE      | Microsoft VS Code[^1] |
|    Disk      |      C: drive only    |

Even though Microsoft is deeply sinful, after some taming, Win11 becomes usable; Windows Terminal is genuinely great — I recommend everyone use the hell out of it (lol); it's hard to imagine a life without the beautiful, elegant, **partially GNU/Linux-command-compatible** Powershell 7 (`pwsh`); we assume scientific internet access is enabled with virtual NIC mode on, so the shell doesn't stupidly bypass the proxy.

Our goal? Naturally, set up an Ubuntu WSL, install Anaconda and CUDA inside it, and finally create a conda virtual environment with PyTorch installed for testing.

Let's get started~

## Installing / Setting Up Ubuntu WSL

In some sense, Ubuntu has become synonymous with Linux (GNU/Linux): widespread market share, high name recognition, fairly easy to use, and its Debian-based nature probably makes it reasonably stable. Most importantly, Windows' WSL2 uses Ubuntu as its default distribution, and perhaps because of this, CUDA's WSL support assumes users are on Ubuntu.

To be honest, I really don't want to go through the trouble of setting up a whole Ubuntu WSL specifically for machine learning when I already have a beautifully configured Arch WSL — and Arch Linux actually has pre-packaged CUDA packages that can be easily downloaded with `pacman`. However, considering I don't want the complicated (bloated) Anaconda polluting my computer, and I don't want to spend time debugging issues between Arch and CUDA while running programs, I might as well just spin up another Ubuntu.

### Installing Ubuntu WSL

The installation process was fairly simple because I already had Arch WSL on my computer, so installing Ubuntu WSL didn't require waiting through a lengthy WSL initialization. The command is also straightforward:

```pwsh
wsl --install
```

That's right, just one line, and you don't even need to specify which distribution (yep, because it's the default). Of course, if you want to see what Linux distributions are available on WSL, you can:

```pwsh
wsl -l -o
# which is wsl --list --online
```

However, I didn't go with the default install. Following the principle of installing the newest available, I chose Ubuntu 24.04:

```pwsh
wsl --install Ubuntu-24.04
```

You'll need to set a username and administrator password during the process. The username **must be lowercase only**, and **you won't see the characters as you type your password**. Most importantly, **keep your admin password safe** — otherwise you'll just have to uninstall and reinstall, which would be a real loss. Speaking of which, how do you uninstall an installed WSL distribution? Very simple:

```pwsh
wsl --unregister Ubuntu-24.04
```

This command will delete your Ubuntu-24.04 distribution. Also, checking what WSL distributions are installed is also easy:

```pwsh
wsl --list --verbose
# wsl -l -v
```

This command not only lists installed WSL distributions but also shows their status. To completely shut down running WSL (not just close the shell), you can:

```pwsh
wsl --shutdown
```

(This shuts down WSL, meaning all running distributions will be stopped.)

A bit verbose, but with just these few simple commands you can handle WSL installation, uninstallation, querying, and so on.

### Configuring the Fresh Ubuntu WSL

A brand-new system — how can you not set it up a bit? A craftsman must first sharpen his tools, right? I installed these:

- `zsh`: replaces `bash`
- `fd`: replaces `find`
- `rg`: replaces `grep`
- `eza`: replaces `ls`
- `bat`: replaces `cat`
- `nvim`
- `cmake`
- `build-essential`
- `git`
- `gdb`
- `tldr`: for quickly checking command usage

Then install some plugins for ZSH. For plugin management I went with the classic `oh-my-zsh` — a plugin manager that works by `git clone`-ing repos into the corresponding folder (lol). Plugins installed:

- `zsh-autosuggestions`: gives your ZSH FISH-like autocompletion (in that case, why not just use FISH? Don't ask...);
- `zsh-syntax-highlighting`: colors correct/incorrect/special commands distinctly, very convenient, just like FISH (in that case...);
- `zsh-completions`: makes ZSH completions smarter;
- `conda-zsh-completion`: adds conda command completions to ZSH;
- `zsh-vi-mode`: press ESC to use vi mode to edit your command line! Occasionally useful, but watch the cursor shape...

Here are the commands we used:

```bash
# Upgrade the source first
sudo apt update && sudo apt upgrade
# fd has package name fd-find; rg has package name ripgrep; nvim has package name neovim;
# tealdeer for tldr
sudo apt install zsh fd-find ripgrep eza bat neovim cmake build-essential git gdb tealdeer
# download oh-my-zsh, install and use it
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
# several zsh plugins
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-completions.git ${ZSH_CUSTOM:-${ZSH:-~/.oh-my-zsh}/custom}/plugins/zsh-completions
git clone https://github.com/conda-incubator/conda-zsh-completion ${ZSH_CUSTOM:=~/.oh-my-zsh/custom}/plugins/conda-zsh-completion
git clone https://github.com/jeffreytse/zsh-vi-mode $ZSH_CUSTOM/plugins/zsh-vi-mode
# Config for tldr, update the cache
tldr --update
```

You can copy the commands above and paste them into your shell. You'll need to enter your password a few times and press Enter to confirm a few things. After installing `oh-my-zsh`, your shell will switch to `zsh` — please type `exit` to exit the current `zsh` session so you can continue installing the plugins below.

Then sync my previously used `.zshrc` config into the Ubuntu WSL:

```zsh
# $HOME/.zshrc
export ZSH="$HOME/.oh-my-zsh"

ZSH_THEME="robbyrussell"

# Use zsh-completions plugin
fpath+=${ZSH_CUSTOM:-${ZSH:-~/.oh-my-zsh}/custom}/plugins/zsh-completions/src
autoload -U compinit && compinit

# Update when available
zstyle ':omz:update' mode reminder

plugins=(
    git
    colored-man-pages
    zsh-vi-mode
    zsh-autosuggestions
    zsh-syntax-highlighting
    conda-zsh-completion
)

source "$ZSH/oh-my-zsh.sh"

# Source everything in the custom env folder
if [ -d $ZSH_CUSTOM/env ]; then
    for f in $ZSH_CUSTOM/env/*; do
        source $f
    done
fi

# Set ~win as the windows user home folder
hash -d win=/mnt/c/Users/AMoment
# Disable pipe override (>)
set -o noclobber

```

This `.zshrc` file has had many unused comments removed. Those comments were auto-generated by `oh-my-zsh` to make it easier for users to adjust things themselves. If you need them, only modify and add the content above at the specific lines. Be mindful of ordering — especially `zsh-completion`, which specifically requires its order to be preserved.

The two small blocks at the bottom are some of my personal configurations. The first one: I place all environment-related content as `program-name.zsh` scripts in the `$ZSH_CUSTOM/env` folder, and this just `source`s them one by one. The second block: the first line makes it convenient to go to the Windows host's home directory (yep, my home directory is here), so `~win` resolves to that path — kinda handy; the second line disables the `>` redirect to overwrite files that already have content, to prevent me from doing something dumb.

Finally, add a few useful aliases. We can write them directly into `$ZSH_CUSTOM/aliases.zsh`. Here's what I use:

```zsh
alias ls="eza --icons=auto"
alias ll="eza -lh --icons=auto"
alias la="eza -A --icons=auto"
alias la="eza -lAh --icons=auto"
alias vim="nvim"
alias fd="fdfind"
alias bat="batcat"
```

After making changes, use `exec zsh` to apply them, and you're done. But we can also make a few simple tweaks on the Windows host side.

### Simple Configuration on the Windows Host

Since I use Windows Terminal, after installing Ubuntu WSL, just close Windows Terminal and reopen it — the newly configured Ubuntu WSL will appear under Profiles:

![Installed WSL](wt-ubuntu-24.04.png)

Your Windows Terminal might have many other options, or the default shell might not be PowerShell — no worries, we can go into Settings and modify them. For example, make PowerShell the default profile[^2], reorder frequently used profiles to the top, etc.

Here I mainly want to talk about these settings — remember to save. If you're using the GUI, there's a save button in the bottom right; if using the JSON file, save the file:
- Reorder profiles: Windows Terminal actually stores all profile info in a JSON file, which you can open from the bottom left of the Settings page. Just manually adjust the desired profile order;
- Hide profiles: you can modify this directly in the GUI — there's a "Hide profile from dropdown" option. Or in the JSON file, find the corresponding profile and add `"hidden": true`;
- If you don't want the shell's tab title changing to the running program's name, under Terminal Emulation select "Suppress title changes". This way it keeps displaying the profile name. Really handy when you have several profiles of the same type (e.g., two Ubuntus).

That's pretty much it. Actually, Windows Terminal's default configuration is already very good — you just need a few simple tweaks to have a great experience. That's why I like it. Microsoft, you did a great job (applause).

---

And with that, we've set up an (in my personal opinion) very pleasant working environment. What's next, naturally, is installation. Although the order of CUDA and Anaconda installation isn't that strict, let's install Anaconda first.

## Anaconda

Before the actual installation, I think it's worth:

### A Brief Introduction to Anaconda

So, what is Anaconda? Is it Python? What is Python? Do I still need Anaconda after already having Python? If you're already familiar with these concepts, feel free to skip ahead (lol).

Let's start with Python and package management. As a relatively modern language, Python uses an interpreter for line-by-line code execution and manages modules and libraries used in code through a package manager. However, Python itself is just a language — what we commonly call "downloading Python" is actually downloading a distribution that includes the Python interpreter, a package manager, and the runtime environment. The Python installer we get from the [official site](https://www.python.org) actually includes: CPython — the C-language implementation of the Python interpreter; `pip` — a package manager that downloads and installs packages from PyPI (Python Package Index); and the runtime environment they need. (If you checked the IDLE option, you also install a small Python IDE.) We call this the official Python distribution.

Beyond the official distribution, since CPython uses an open-source license, anyone is free to package and distribute their own CPython-based Python distribution. And indeed, many different CPython-based distributions exist. One very famous one is our protagonist today: Anaconda. Anaconda's Python distribution includes its own packaged CPython interpreter, a different package manager — `conda` (not `pip`), and a runtime environment pre-loaded with many scientific computing and data statistics libraries, provided by Anaconda.

Anaconda's defining feature is `conda` as a package manager. It can select corresponding channels to install libraries from different sources, and more importantly, its libraries aren't limited to Python: it manages not only Python libraries but also other language libraries those Python libraries might depend on, performing necessary dependency resolution. It also integrates virtual environment management — unlike Python's official `venv` environment management tool — making `conda` an All-In-One management tool. Of course, it also directly provides some commonly needed libraries for scientific computing, like NumPy, Matplotlib, Pandas, etc. If you just want the purest `conda` experience, consider installing Miniconda. But since we're doing machine learning, might as well just install Anaconda.

So, why do we need Anaconda? Is Anaconda required for machine learning? And don't most Python packages prefer PyPI distribution over Anaconda's package sources? The main reason for using Anaconda, besides the tutorial I'm following using it for environment management, is the key point that `conda` manages not just packages but also their dependencies, and can directly manage environments. This solves a very troublesome problem: dependency hell. Suppose package A and package B both depend on library C, but A requires an older version of C while B requires a newer version, and your computer already has the old C library installed — what do you do? Uninstall old C and reinstall the new one? `conda` provides an elegant solution: virtualize an environment and install compatible A, B, and C within it. More importantly, this environment won't affect other environments — no need to worry about installing something and destroying all the libraries on your entire computer. In fact, in the relatively new and evolving field of machine learning, the libraries used are quite likely to produce weird dependency issues. Using `conda` makes solving such problems much more convenient.

Enough rambling from me — time to start installing.

### Installing Anaconda

Installing it is actually quite simple. Just grab the installation script and run it. We use:

```zsh
wget https://repo.anaconda.com/archive/Anaconda3-2025.06-1-Linux-x86_64.sh
```

to download the installation script. Honestly, this script is quite large: it's about 1 GB, because besides being a script it apparently bundles some compressed archives. After downloading, we can use `sha256sum` to verify the downloaded file's integrity:

```zsh
echo 82976426a2c91fe1453281def386f9ebebd8fdb45dc6c970b54cfef4e9120857 ./Anaconda3-2025.06-1-Linux-x86_64.sh | sha256sum --check
```

Generally there won't be issues — it'll display `./Anaconda3-2025.06-1-Linux-x86_64.sh: OK`. Then we can proceed with installation by running the script. But the script can't be executed directly yet, because all execute permissions on the file are turned off by default. We use `chmod +x` to grant execution permission and then run it:

```zsh
chmod +x ./Anaconda3-2025.06-1-Linux-x86_64.sh
./Anaconda3-2025.06-1-Linux-x86_64.sh
```

This enters the installation flow. First, agree to their license terms — we press Enter, it'll say we must agree to the terms, at which point we have to explicitly type `yes` and press Enter, otherwise:

![Type `yes` here!](yes.png)

Next is the install location — it defaults to `anaconda3` in the home directory. We can accept this location or manually type a different one. I'll just go with the default. Then comes a strong burst of installation, followed by the final step: whether to add `conda` to the shell's config so it auto-starts `conda` every time you open a shell. Default is `no` — we'll accept the default and manually add the relevant content later.

That completes the installation. However, since `conda` hasn't been initialized in the shell, we need to run initialization first. Our installed `conda` is at `~/anaconda3/bin/conda`, so we use:

```zsh
$HOME/anaconda3/bin/conda init zsh
```
It will modify `.zshrc`, appending something like:

```zsh
# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/home/amoment/anaconda3/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/home/amoment/anaconda3/etc/profile.d/conda.sh" ]; then
        . "/home/amoment/anaconda3/etc/profile.d/conda.sh"
    else
        export PATH="/home/amoment/anaconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<
```

This basically adds `conda` to the `$PATH` environment variable. Optionally, we can move this block into our reserved `$ZSH_CUSTOM/env`:

```zsh
mkdir $ZSH_CUSTOM/env
vim $ZSH_CUSTOM/env/conda_env.zsh
```

Then paste the content in, restart the shell, and it's done. You should see `(base)` on the left side of your shell prompt — that means we've successfully activated conda's `base` environment.

![Base Environment](base-env.png)

---

Let's not go into Anaconda's specific operations just yet, because for us, environment configuration isn't complete. Next up is setting up CUDA.

## CUDA

I just got some bad news: right as I finished writing the CUDA installation section, by some stroke of fate, I spotted the section about "conda" in the official CUDA documentation: [Conda Installation](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/#conda-installation)

![Conda Installation](conda-installation.png)

What does this mean... After `conda activate pytorch-test` (my environment is called `pytorch-test`), running `where nvcc` gave me this:

```zsh
/home/amoment/.conda/envs/pytorch/bin/nvcc
/usr/local/cuda-13.0/bin/nvcc
```

![Could it be!?](难道说.jpg)

Ah, whatever. Since I've already written it, let's still go through how to install, and how to *uninstall*...

### A Brief Introduction to CUDA

CUDA is Nvidia's GPU computing framework, short for Compute Unified Device Architecture (mysterious machine translation). The "Device" here mainly refers to Nvidia's various graphics cards. Since machine learning involves computing on large amounts of data (questionable), and the computation demands aren't particularly complex (compared to CPUs being better suited for complex computation tasks), using graphics cards — devices designed for image processing — for accelerated computation has become almost a necessity.

While Nvidia's Linux GPU support may not be as good as on Windows (F**k you Nvidia!), Linux is still the main workhorse for scientific computing. Microsoft and Nvidia have also been considerate enough to provide ordinary developers a great option: use WSL to leverage Windows GPU drivers for CUDA development, with WSL-specific packages and documentation available for download. So let's just do that — use Ubuntu, which has the best support, for the corresponding development.

### Installing CUDA

Before starting, we'd better confirm our device can use CUDA. First, use `nvidia-smi` — it displays info about the Nvidia GPU on the device:

![nvidia-smi](nvidia-smi.png)

You can see a bunch of information here, including my device's GPU and the corresponding CUDA version. If you have an older GPU, check the [CUDA GPU Compute Capability](https://developer.nvidia.com/cuda-gpus) page — compute capability 3.0 or higher means it can use CUDA normally. Generally, unless it's an ancient relic of a GPU, it should be fine (flees).

Next is the actual installation. According to the [official documentation](https://docs.nvidia.com/cuda/wsl-user-guide/index.html#cuda-support-for-wsl-2), the first step should be removing old GPG keys:

```zsh
sudo apt-key del 7fa2af80
```

Then we can directly download the CUDA Toolkit. The latest version is 13.1, and the download page actually provides a set of scripts:

```zsh
wget https://developer.download.nvidia.com/compute/cuda/repos/wsl-ubuntu/x86_64/cuda-wsl-ubuntu.pin
sudo mv cuda-wsl-ubuntu.pin /etc/apt/preferences.d/cuda-repository-pin-600
wget https://developer.download.nvidia.com/compute/cuda/13.1.0/local_installers/cuda-repo-wsl-ubuntu-13-1-local_13.1.0-1_amd64.deb
sudo dpkg -i cuda-repo-wsl-ubuntu-13-1-local_13.1.0-1_amd64.deb
sudo cp /var/cuda-repo-wsl-ubuntu-13-1-local/cuda-*-keyring.gpg /usr/share/keyrings/
sudo apt-get update
sudo apt-get -y install cuda-toolkit-13-1
```

From the script above, it first uses `wget` to download the `cuda-wsl-ubuntu.pin` file and moves it to the appropriate location to set the priority for the CUDA-Toolkit we'll download. Then it downloads the `.deb` package and installs it, copies the key into the system keyring, updates the `apt` sources, and finally installs CUDA-Toolkit.

After installation, we need to add `/usr/local/cuda-13.0/bin` to the `$PATH` environment variable. We can write in `.zshrc`, or in `$ZSH_CUSTOM/env/cuda_env.zsh`:

```zsh
export PATH=/usr/local/cuda-13.0/bin:$PATH
export LD_LIBRARY_PATH=/usr/local/cuda-13.0/lib64:$LD_LIBRARY_PATH
```

Then refresh the shell, and we can use `nvcc` directly from the command line.

### Uninstalling CUDA

Sigh, just finished installing and already saying goodbye. Uninstalling is also simple, since `apt-get` package management is handy:

```zsh
sudo apt-get purge "cuda-*"
sudo apt-get autoremove
sudo apt-get autoclean
```

These three lines respectively tell `apt-get` to: delete all packages starting with `cuda-` along with their config files; automatically clean up no-longer-needed package dependencies; automatically clean up local `.deb` packages.

Then delete the environment variables we just added, and it's completely removed. Happy times are fleeting — goodbye, all Global Installations.

## Configuring the Development Environment

The final step is actually relatively simple. We just need a few commands to create a virtual environment, install the required packages, and after a long wait, we can run a snippet of code in VS Code to see the results.

Let's first create the virtual environment.

### Creating a Virtual Environment

One command creates the base environment:

```zsh
conda create -n pytorch-test python=3.12
```

Here `-n` specifies the name we want to give this environment; `python=3.12` tells `conda` to install the `python` interpreter first and requires version 3.12. Why not use the newer 3.13 or even $\pi$thon (3.14)? Mainly because PyTorch doesn't support newer versions that well. After creating the environment, you should see instructions on how to activate it:

```zsh
conda activate pytorch-test
```

Once inside, we can try `python --version`. The result is something like:

```zsh
Python 3.12.12
```

Then we continue using `conda` to install other needed libraries. The main library we need is `torch`. We need both the base and GPU variants — in `conda` they're called `pytorch` and `pytorch-gpu`:

```zsh
conda install pytorch pytorch-gpu -c anaconda -c nvidia
```

The `-c` in this command is `--channel`, specifying download/install channels. We ask it to first search the `anaconda` channel, then the `nvidia` channel, with the `default` channel as a fallback. Running this command should list these channels and ask you to press Enter to confirm. Then comes a long wait, and while waiting, we can do something else: set up a VS Code environment for running test code later.

Since we can install needed packages during environment creation, we can actually do:

```zsh
conda create -n pytorch-test python=3.12 pytorch pytorch-gpu -c anaconda -c nvidia
```

Then after creation, `conda activate pytorch-test` and it's done. To check what environments are available, use `conda env list` to list all environments. To delete an environment, use `conda env remove -n pytorch-test` or `conda remove -n pytorch-test --all`.

### Configuring the VS Code Environment

The first step is entering WSL and launching `code`. We can either start VS Code on Windows and click the bottom-left button to connect to the needed WSL, or type `code` in the WSL shell to directly launch code inside WSL. The key part is plugin installation.

Here we recommend installing these plugins:

- `Jupyter`: an extension pack containing all plugins needed for Jupyter;
- `Python`: although this is a standalone package, installing it also auto-installs a series of extensions, including environment management, code debugging, syntax checking, etc.;
- `Black Formatter`: a code formatting tool, very useful, but sometimes stubborn...
- `autoDocstring`: auto-generates docstrings to explain what your functions do;
- `Even Better TOML`: since Python uses `pyproject.toml` files as project description files, and VS Code doesn't have official TOML support, if you mainly work on Python projects, you might need this.

Installation isn't too troublesome — just click, click, click. If you're lazy, you can also use VS Code's relatively new Profile (there's that word again) feature. Click the button in the bottom left that looks like a settings icon — there's `Profile (Default)` in the menu. Choose `Profiles` to enter the Profile settings page. Our great Python has a Profile template. We can directly apply this template. Simple and convenient — basically the plugins I just listed.

### After the Long Wait...

You should have all the libraries needed in the environment downloaded. Now open the VS Code we just set up, enter an empty folder, `Ctrl+Shift+P` to bring up the VS Code command palette, search for `Jupyter`, and the option to create a new Notebook will appear. Click it, and a Jupyter Notebook interface opens. In the top-right corner, choose the kernel — it'll auto-detect what virtual environments we have in WSL. Select the `pytorch-test` we painstakingly configured, then test your environment setup in a code cell:

```python
import torch

print(f'PyTorch version: {torch.__version__}')
print("CUDA available:", torch.cuda.is_available())
if torch.cuda.is_available():
    print("GPU:", torch.cuda.get_device_name(0))
    print("CUDA version:", torch.version.cuda) # type: ignore
```

If it runs successfully, these few lines will faithfully tell you the current PyTorch version, CUDA status, GPU in use, etc. At this point, mission accomplished.

If you encounter this mysterious error:

```
libtorch_cpu.so: undefined symbol: iJIT_NotifyEvent
```

Don't panic: it's most likely because the `mkl` library version is too new and doesn't match the PyTorch version you're using. Use `conda search mkl` to see what `mkl` library versions are available and pick an older one. Most online search results suggest installing `mkl=2024.0`, but maybe due to `conda` version issues or not picking the right channel, the only result I found was `mkl=2023.1`, so I installed that version. It worked fine, no issues.

## Postscript

It's been two weeks since I started writing this post. Dragging my feet, I finally got it out — even if I took some detours along the way. In hindsight, `conda` is quite a fine package manager: it can directly use its own bundled `cuda-toolkit`, sparing users from configuring the CUDA environment themselves. Taking it a step further, we could even let `conda` manage the C/C++ environment — I found it can install `g++`, and paired with the `nvcc` provided by installing `pytorch-gpu`, it might really be possible to manage the entire development environment with a single package manager.

However, the installation process is still quite slow, with the biggest issue being download time. `libtorch` is huge — if I remember right, it's 1.x GB. If needed, you can configure `conda` to use domestic mirror sources, like Alibaba or Tsinghua mirrors. I won't go into detail here.

So, thank you for putting up with my rambling this far. As always, I wish you good health, and happy coding~


[^1]: I know it's not an IDE, just an editor, but after some configuration it really does become equivalent to an IDE — forgive me (lol)
[^2]: Honestly not sure how to best translate this term...
