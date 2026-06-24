---
categories:
# - Mathematics
- Programming
# - Phase Field
# - Others
tags:
- Note
- VS Code
- Software
- Document
title: "VS Code Might Actually Be an IDE"
description: "How to Use VS Code as an IDE: A C++ Example"
date: 2025-09-17T14:35:38+08:00
image: /images/猛独が襲う.png
imageObjectPosition: center 20%
math: true
hidden: false
comments: true
---

*Although VS Code[^1] is technically an editor, it actually feels more like an IDE (Integrated Development Environment) in disguise. And its most powerful feature is arguably its remote capabilities. Today, let's talk about how to configure VS Code into a multi-purpose IDE that rivals Visual Studio*

*The song I've chosen this time is a highly acclaimed Vocaloid track with countless covers, and one that I'm personally very fond of: **猛独が襲う** (Moudoku ga Osou), written and composed by producer [一二三 (Hifumi)](https://twitter.com/hihumi_v). I happened to hear it at noon and thought it was fantastic, so I went with it. The featured image is from the equally stunning MV for this song, illustrated by [休符 (Kyufu)](https://twitter.com/kyu_fu) — it's really gorgeous~ I also have to point out that the incredible guitar work on this song was performed by [じゅみ (Jumi)](https://twitter.com/junjun_mimi03). I must immediately confess that the guitar is my favorite part of this song lol*

{{<music auto="https://music.163.com/#/song?id=487379581" loop="none">}}

## A Quick Introduction

VS Code, a highly regarded editor, was first developed by Erich Gamma in 2011 and officially released on April 29, 2015[^2]. Built on the Electron framework (or in other words, a browser), this editor has now become an indispensable part of nearly every developer's toolkit. Beyond its sleek, modern interface, its open attitude (VS Code's core functionality is open source, with the open-source distribution known as *Code-OSS*) has also drawn the attention of many open-source enthusiasts. And its killer feature is undoubtedly its incredibly rich extension marketplace and ecosystem — all I can say is: magnificent. No further words needed. (Unfortunately, "magnificent" only to a point, because many extensions in the marketplace are proprietary Microsoft software — a bit of a shame.)

VS Code already comes with a ton of features out of the box: a handy integrated terminal, output panel, debug console, tabbed interface, feature-rich sidebar, integrated file explorer, and so on. It even offers native JavaScript/TypeScript support (since the editor itself is written in them). And with extensions added, it really does become almost an IDE. For example, install Microsoft's C/C++ extension and you can write C++ code in VS Code while also running and debugging it directly. Install the CMake extension, and you can manage your entire project with CMake, with detailed configuration options provided in the sidebar. We'll use this as an example later and go through how to set up GCC + CMake + VS Code.

<details>
<summary>Editors, Compilers, and IDEs — What Exactly Are They?</summary>

This is, to some extent, one of those evergreen questions.

Let's start with **(text) editors**. We're all familiar with them — we use them all the time when writing things on a computer. They are mainly designed for editing text content, and the most basic features are things like line breaks, backspace, save, etc. — stuff you might already take for granted. Let's name a few editors: VS Code, Vim, Emacs, Microsoft Notepad, and so on. In short, an editor is something you use to edit documents. Besides text editors, we might also use hex editors and other kinds of editors, all of which have editing content as their core purpose.

A **compiler**, on the other hand, is a completely different thing. A compiler's job is to take a program (a text file), parse it according to grammar rules, and compile it into a binary file that a machine can read. The output of compilation might be an executable file, or it might be something non-executable, but the common trait is that you can't just open them with a regular text editor — or you'd need a dedicated hex editor to open and edit them. There are many compilers too. Taking C/C++ as an example, the three famous major compilers are `gcc`/`g++` (both part of the GCC compiler toolchain), `clang`/`clang++` (LLVM's compiler frontend, with `llvm` as the backend), and `cl` + `MSVC` (as the name suggests, Microsoft's offering). Naturally, other compiled languages each have their own build tools as well. An interesting tidbit: most compilers are either built on GNU's `GCC` toolchain (GNU Compiler Collection) or on the LLVM backend. But that's a story for another day.

Finally, there's the **IDE**. The full name is *Integrated Development Environment*. It's a collection of an editor, a compiler, and many other tools such as a debugger, profiler, and static analysis tools (hence the term *integrated*). The most famous C/C++ IDE is the legendary "Number One IDE in the Universe": Visual Studio, or the equally well-regarded CLion from JetBrains. By the way, JetBrains has developed multiple IDEs, and there's a corresponding JetBrains IDE for practically every mainstream language.

Understanding these concepts makes discussions on related topics much clearer. But even if you don't, it's not that big a deal lol. That's also because many editors nowadays are evolving in the direction of IDEs — like our protagonist today, VS Code. So some developers believe that VS Code is indeed an IDE, and I totally get that.

</details>

## First Things First — Download It

I've actually already covered the VS Code download question in [this article](VSC_Py/index.md). But if you don't want to dig through that one, just follow along below.

### Download the Application Itself

We'll only consider Windows usage here. If you're on GNU/Linux, please pick the package manager and version you prefer on your own (after all, as someone using Linux, the poster child of open source, you might not want to use Microsoft's proprietary software: Visual Studio Code). Here are two download methods. The first is downloading from the official website — click [this link](https://code.visualstudio.com/download) to go straight to the download page.

![Download page](img/VSC_Download.png)

You'll notice there's a big download button, along with a few options below it — User Installer, System Installer, x64, ARM, and so on. If you're not sure which to pick, just hit that big button. It'll download the User Installer version. If you know exactly which version you need, help yourself. Let me briefly explain the difference between User Installer and System Installer. If your computer is only used by a single account, User Installer is convenient, fast, and trouble-free. If your computer has multiple accounts and you want every user to have access to VS Code, go with the System Installer version. However, this comes with UAC (User Access Control) headaches, and you'll often be prompted for administrator privileges just to modify some file (i.e., the UAC popup will appear).

Once you've downloaded the installer, open it, agree to the license agreement, choose the install path (you can leave it as is), decide whether to add Start Menu entries (can also be ignored), and then you'll encounter this page:

![Installer page](img/InstallVSC.png)

Here I recommend checking the option to integrate "Open with Code" into the File Explorer context menu. But if you think your right-click menu is already cluttered enough, feel free to skip it. After that, it'll ask you to confirm your install options — if everything looks fine, go ahead and install.

The other download method, which I personally don't especially recommend, is using Windows' package manager. Newer versions of Windows come with a decent package manager called `WinGet`. You can use `winget install Microsoft.VisualStudioCode` to install it directly via the command line, but this approach has a problem: there's no File Explorer integration (i.e., no "Open with VS Code" option in the right-click menu). WinGet does offer a solution, but it's a bit ugly: `winget install Microsoft.VisualStudioCode --override '/SILENT /mergetasks="!runcode,addcontextmenufiles,addcontextmenufolders"'`. And the reason for this problem is hilariously dumb: the default command-line arguments passed to WinGet have a typo, with `MERGETASKS` written as `MERGETAKS` (missing an S). The info above comes from [this discussion thread](https://github.com/microsoft/winget-cli/discussions/1798) — worth a read if you're interested.

In any case, you should have it installed by now. Heart racing with excitement, hands trembling with anticipation, you open up the software, ready to dive in — and then you might realize: the entire interface is in English. Maybe you think an English interface is totally fine, but that's still a bit niche lol. So how do you localize it to Chinese? Surely such an awesome piece of software has decent localization, right? Don't worry, the solution is below:

### Time to Install Extensions, Right Now

Since this is presumably our first time installing VS Code, we don't need to worry about extensions synced from an account. So, the first thing to do is click the Extensions icon on the left sidebar, or use the shortcut `Ctrl+Shift+X`, to open the Extensions Marketplace.

![Extensions Marketplace](img/Extensions.png)

If you need the Chinese language pack, install the **Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code** extension (search for "Chinese Language Pack" and it'll show up). Yes, all of VS Code's localization is achieved through these language packs published by Microsoft. If you're into exotic flavors, you can also try language packs for other languages.

When downloading an extension, if it's your first time installing one from a particular author/organization, VS Code will ask whether you trust that extension author. Generally speaking, as long as you're not installing random junk, these authors are trustworthy. That said, VS Code's extension marketplace has had supply-chain poisoning incidents in the past, so do proceed with caution.

Now onto our main topic — we need to do C++ development in VS Code. For that, we need to install the **C/C++ Extension Pack**, which is basically Microsoft's C++ extension family bundle. It includes **CMake Tools** (for integrated CMake project management), **C/C++** (Microsoft's implementation of the C/C++ Language Server Protocol, including syntax highlighting, compiler/debugger integration, etc.), and **C/C++ Themes**, which gives your code nice semantic highlighting styles. With these, you can happily write C++ in VS Code!

Finally, note that we also want to do remote development. For that, we need to also install **Remote - SSH**, **Remote - SSH: Editing Configuration Files**, and **Remote Explorer** — three extensions. Once all of these are installed, we can start getting ready.

## Give Local C/C++ Development a Try First!

Before diving straight into remote development, it's best to get familiar with doing C/C++ development locally. The reason is simple: we haven't set up the remote configuration yet, and C/C++ development is pretty much the same whether local or remote.

In fact, VS Code has written plenty of guides on their official website. For instance, [C/C++ for Visual Studio Code](https://code.visualstudio.com/docs/languages/cpp) gives a general introduction to writing and debugging simple C/C++ code in VS Code. And there's a whole dedicated section (which you can find in the left sidebar of that same article) with multiple guide articles covering C/C++ development configuration for every platform and compiler. It's so detailed that I feel writing my own version would be completely redundant — just painting legs on a snake, as the saying goes.

So, what are we going to write about here then? Let's talk about CMake. But before that, we really ought to cover a tiny bit of history about C/C++ project builds.

### A Little History of C/C++ Project Building

In the very, very, very beginning, everything was simple: you'd write your source code, then tell the compiler "go compile this for me" and that was it. Take our dear old-timer compiler `gcc` (or `g++`, which is specifically for C++) for example — to compile a program you've written, you just need `gcc source-code.c` or `g++ source-code.cpp`, and out comes a file called `a.out`.

However, as projects grew more and more complex, it became impossible to have `gcc` compile each file one by one. Maybe you could use some shell features to batch-select files for compilation, but what about selective compilation? What about applying different compiler flags to different targets? How do you automatically handle dependency relationships in large projects? These problems eventually got solutions, and on Linux, that solution was the build tool Make. You'd place a `Makefile` in your project folder, and inside it, like writing a script, you'd tell the compiler how to compile the files in the folder — which ones to process in what ways, and so on. Once written, you'd just use the `make` command in the terminal, and it would automatically read the `Makefile`, invoke the corresponding tools, and carry out compilation (or, from a project perspective, the project build) with the specified compiler flags and in the correct compilation order.

So where does CMake come in? Here's the thing: C/C++ code is designed to be runnable on machines with many different architectures, but it needs the corresponding compilation approach for each one. Plus, Makefile syntax is still a bit hard to learn. To realize the noble ideal of "one codebase, build everywhere," CMake was naturally born — a "build system generator that invokes build tools like Makefile." To accommodate the various build tools across different platforms, it needed its own independent configuration approach. And since it builds code by invoking the platform's existing build tools, you need to tell it which one to use. On Windows, you might use MSVC or Microsoft's packaged NMake; on a Linux distro, you'll most likely use Makefile; if you want to try something new, or your project is especially large and you want faster build speeds, you might use Google's Ninja... but you need to tell CMake which one you're using.

Once you've told CMake which build tool to use, CMake can generate a `build` folder for you (or for itself) to use when building the project. Inside it are a whole bunch of build files generated by CMake to describe your project. At that point, you can invoke the build tool from within that folder to perform the build, or you can let CMake invoke the corresponding build tool on your behalf. Let's briefly go over how to do these steps from the command line.

### How to Build with CMake (Manually)?

First, let's cover the old-school method. We use a single line with multiple commands. In our project root directory, run:

```shell
mkdir build; cd build; cmake ..; make -j
```

This generates the build files and builds the project. Let's take it step by step: typically we create a `build` folder so CMake can put all build-file-related stuff inside it; then we enter that folder and tell CMake that the project we want to build is in the project root directory. CMake reads the `CMakeLists.txt` in the root and writes all the build files into the current working directory (i.e., `build`). Finally, after the build files are generated, we invoke the build tool to build the project. Here we're demonstrating `make -j`, which tells Make to compile in multi-threaded mode.

However, this whole gymnastics routine is frankly hideous. Having to manually enter a newly created build folder just to build — it feels awkward no matter how you look at it. Sure, it's flexible: you don't have to name it `build`, but somehow it just doesn't feel modern.

The new-school approach goes like this. Execute the following in your project folder:

```shell
cmake -S . -B build
cmake --build build
```

The first line says: use the `CMakeLists.txt` in the project folder to configure the project, and put the project configuration in the `build` folder. `-S` specifies where the project root directory is (current directory in this case); `-B` specifies where to place the configuration content (we chose the `build` folder). This command will put things directly into `build` if it exists, or obediently create one if it doesn't. And the second line tells CMake: I want to build this project now — please read the project configuration already in the `build` folder and build it for me. You can see that this approach is more in line with our expectations of what CMake as a tool should do. At least it doesn't need external commands to handle things for it. But if you prefer the old method, that's fine too — CMake's forward compatibility is quite good.

### CMake Is Basically an Old Hand at This

CMake has gradually become the de facto standard: every major library provides CMake modules for easy integration, and all the major package managers (yes, C++ does have some package management, though it's sparse and fragmented) usually offer CMake integration as well. Even though CMake's syntax is notoriously awkward (I mean, how do if-elseif-endif all look like they're implemented as functions?!?!), at the moment, the most battle-tested and reasonably usable project build tool is still CMake.

CMake is trying to get better, though. Presets, for example, let you quickly apply certain build configurations. And the emergence of AI has nearly perfectly solved the chronic pain point of writing `CMakeLists.txt`. So, might as well just use it. With VS Code's integration and AI assistance, building a project is just a matter of clicking a few buttons — pretty convenient, really. But some people say: I refuse to use AI! What then? Let's briefly go over the basics of writing a CMakeLists.txt.

### How to Write a CMakeLists.txt?

First of all, the most bizarre thing about this file is that the name cannot be off by a single character — not CMakeList, not CMakeList.txt — it has to be **CMakeLists.txt**, and pay attention to the capitalization. If you followed the steps above and installed the **C/C++ Extension Pack**, your CMakeLists.txt should have syntax highlighting.

For a simple project, the main things we need to tell CMake are the project name, the compilation targets, and the output artifacts. First, create this file in the project root directory. Below is a simple example:

```cmake
cmake_minimum_required(VERSION 3.15)
project(HelloCMake VERSION 1.0 LANGUAGES CXX)

# Set C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Define the executable
add_executable(hello src/main.cpp)
```

What the above does: first, it tells CMake the minimum CMake version required for this CMakeLists.txt. This is for compatibility reasons — some platforms may not have a newer version of CMake available. Naturally, the lower this is, the better, since lower means broader compatibility. But you can also require a very high version — forcing a high version lets you freely use the nicer configuration options available in newer versions.

Next comes defining our project metadata. It needs a name, placed in the first position; it needs a version, prefixed with `VERSION` followed by the specific version number. You decide the version number yourself — for a test case, it's not that important. Finally, tell CMake what kind of language project this is — use `LANGUAGES` (or `LANGUAGE`) followed by `CXX` as the language type, indicating it's a C++ project. Why `CXX` instead of `CPP` or `C++`? This probably involves some naming quibbles from the early days of C++'s design — not really important. An interesting thing is that `CXX` is also one of the recommended C++ source file extensions. Hopefully that helps you accept the use of `CXX` here. If your project also uses `C`, just append it after `LANGUAGE`, separated by a space.

Next, set up the C++-related content. First we specify the C++ standard version to use — here we're using the C++17 standard; then on the next line, we indicate that this standard is required. Notice we're using `set`, which looks a lot like a function. In reality, we're setting some variables that get passed to CMake to control its configuration and compile-time behavior.

Finally, we tell CMake about the targets in this project. We're saying we want to add an executable to the project — its name is `hello`, and its source files are `src/main.cpp` (okay, just one file really). This way, CMake knows which things should be compiled into what. Now if we place the source code in `src/main.cpp` relative to the project root, and run the command line instructions above, we can compile an executable. This file is usually placed in a subfolder inside the `build` folder — possibly `Debug` or `Release`, etc. Choose according to your needs. However, if you're following this tutorial, CMake's default build mode is Debug. If you need to compile a Release build, append the option `-DCMAKE_BUILD_TYPE=Release` to the project configuration command, and when executing the build command (the second one in the newer approach), append the option `--config Release`. This ensures what you compile is the Release version.

A bit more supplementary info: notice that this project of ours is really very simple, but even a sparrow, small as it is, has all its vital organs. It brings together the project's own configuration content, build-related configuration content, and the execution approach during the build. First we declare the content closely tied to CMake itself, then we describe the project's global configuration, like the language standard we're adopting. Here we could also prepare the external libraries our project needs, using `find_package` with the library name filled in the parentheses as needed. Then we start defining targets — what header files they use, what things they need compiled, and using `target_xxxxx` functions to specify certain configuration requirements for a particular target, like `target_include_directories`, `target_compile_definitions`, `target_link_libraries`, and so on. Here we need to specify which target these settings are for, whether this configuration will be inherited by projects that use it, and then carry out the corresponding configuration. Finally, we might also want to use CTest or CPack for testing and packaging, but we won't go into that here.

Sigh, writing CMakeLists.txt does take some effort to learn, which is why my recommendation is still to use AI. That said, if you can master writing CMakeLists.txt, you'll certainly become a rare talent on any team. Let's stop here on project configuration, because our main goal is not actually to go all-in on CMake — we still need to get onto remote development.

## Let's Try Connecting to a Remote Server!

Connecting to a remote server is actually a fairly big topic. Generally speaking, the default assumption is that we're connecting to a GNU/Linux device — like Red Hat's CentOS, Rocky Linux, RHEL, etc.; Debian-family ones like Ubuntu, and so on. In short, it's rarely a Windows Server. The differences between Linux distros mainly lie in the package manager as well as some differences in filesystem structure and system configuration. At the usage level, the basic GNU tool suite should be more or less the same. In particular, the tool we'll be using to connect remotely from the terminal — OpenSSH — is pretty much uniform across nearly all platforms (Windows included, by the way).

Let's first introduce SSH, and then we'll talk about how to easily accomplish this using VS Code extensions. But there's still an order to follow: once the first part is done, using VS Code becomes much more convenient.

### SSH: Secure Shell

SSH is currently the gold standard for terminal-based remote login. You might have seen many terminal remote tools — like MobaXTerm (the only one I know of) — which is essentially just a GUI wrapper around SSH. It was developed in 1995 to establish a trustworthy channel for connecting two devices in that primordial era of the internet.

Using SSH naturally requires two devices — your local machine and the remote machine you want to connect to. Let's simply call them the local machine and the server. The server definitely needs to have the `sshd` service installed (SSH Daemon), and we assume our server has a stable public IP we can connect to. We'll denote this IP as `<server_ip>`. Please modify it according to your actual situation (and remove the angle brackets). Finally, we assume the dear server administrator has told you which SSH port the server uses (denoted as `<port>` — if not mentioned, it's 22) and has thoughtfully created an account for you, named `<user>`, whose password you know, so you can use your own account for remote connections. If no such account exists, please pressure your server administrator, or if you have root access, create a regular user for yourself to SSH into. We do not recommend SSH-ing into the admin account — after all, the network is still too dangerous, and the admin account getting compromised means the whole server is toast. You don't want to see your server, after being breached by bad actors, going on a rampage, right? lol

Alright, let's get started.

### Let Me Connect~

The command for connecting is actually quite simple.

```shell
ssh <user>@<server_ip> -p <port>
```

In other words, tell SSH which port to go through, which server to connect to, and whom to log in as. Pretty intuitive, right? If this is your first time connecting to this server, your terminal will tell you: I don't recognize this server — do you trust it? You have to explicitly type `yes` to add this server's info to your trusted server list, otherwise you're declaring you don't trust it and it won't connect. If everything goes smoothly afterwards, you'll be asked to enter the password for the account you're logging into. One thing to particularly emphasize: you won't see anything when typing your password (nothing appears on screen). Not seeing any result while typing your password is normal. Once you've entered the password, press Enter. If the password is correct, you'll be placed onto the remote server. You can use `who` or `hostname` to confirm where you are — these two commands will tell you your username and your hostname respectively.

Once connected successfully, you can try out other commands, but you can also figure out a way to bypass password login: switch to key-based authentication.

### Let Me Connect with a Key~

Keep the session above open — don't close it. Open a new terminal window; this newly opened window should be a terminal session on your own computer. Now use the command: `ssh-keygen` and hit Enter, and you'll enter the SSH key generation process. While the information here is somewhat important, if you find it a hassle, just press Enter all the way through. It'll ask what encryption method you want to use — generally RSA or ED25519 and the like. The default is usually fine. It'll also ask whether you want to use a passphrase — meaning whether the key should require a passphrase to verify that it's indeed you who generated it. If you don't type anything and just press Enter, that means you don't want a passphrase. Finally, it'll display a bunch of stuff — some randomart fingerprint and whatnot — you don't really need to worry about it. In any case, at this point a key pair has been generated.

Now navigate to the `.ssh` folder in your home directory: `cd ~/.ssh`. Inside you'll find the key pair you just generated. Taking a key generated with the ED25519 encryption method as an example, you'll see two files: `id_ed25519` and `id_ed25519.pub`. `id_ed25519` is your private key — you must protect it and never show it to anyone, as it represents your identity. `id_ed25519.pub` is the corresponding public key — you should hand it over to servers you trust. The specific steps: use `cat ~/.ssh/id_ed25519.pub` to print your public key to the screen, then use your mouse, or whatever method, to copy it down. Next, go to the session logged into the remote server, locate the `~/.ssh/authorized_keys` file (create it if it doesn't exist), open it, and append your public key at the end — and that's it. After doing this, whenever you log into this server in the future, SSH will have the server verify your signature. If it finds that your corresponding private key matches the public key stored in `authorized_keys`, you'll be able to log straight into the server without entering a password. Some servers even mandate key-based login — after your first password login, they'll require you to upload your public key and then disable password login entirely, keeping only key-based authentication.

In any case, after uploading your public key, you can try opening a new window to connect to the server. **Important: don't be in a rush to close the window you already have open**, because if something went wrong with the setup and key-based login isn't working, you'd have to log in with a password again. And if your server has the security setting mentioned above, you might have to go find the system administrator for help. So, don't casually close an already-open session window.

If the connection succeeds — congratulations, your connection process just got a little smoother! But every time you connect, you have to recite your name like a magic spell, intone the IP address, and even chant the port number. Way too tedious. Is there a more convenient way? Yes, brother, there is.

### Setting Up a Server Alias

We can bundle the server IP address, port number, and the account name you want to log in as, and turn it all into a server alias. This way, we can use the server alias to fill in all these presets in one shot.

To achieve this, create a `config` file inside the `~/.ssh` folder, and add the following content:

```
Host the_server
    Hostname <server_ip>
    User <user>
    Port <port>

```

Remember to replace all those angle-bracketed placeholders with the info you should be filling in. The above content lets us successfully create a server alias named `the_server`. Now, to connect to this server, all we need is: `ssh the_server`. Easy, right?

Why do we call it a *server alias*? In truth, we've **only** set the alias for the server — that is, we've just given our own name to that string of IP numbers or a domain name. So what about those `User`, `Port`, and such? Those are actually our default configuration settings. For example, if we also have a user `<user_2>` on this server, and we suddenly feel like logging into that account on a whim, we just need `ssh <user_2>@the_server`. Done.

We now know how to use SSH, and we've also gone over how to use CMake. So? Time to try combining them with VS Code!

## VS Code + CMake + SSH

That being said, it really is just clicking around... I'll just half-ass my way through this section lol.

### CMake Integration

Below is a screenshot of the CMake integration toolbar for a project I maintain:

![CMake Integration](img/CMakeWindow.png)

First, look at the far left: the sidebar has a CMake logo — that's the entry point for the CMake integration tools, and from here you can start clicking away. On the left, `PROJECT STATUS` describes some current CMake configurations. This project's folder is TaskScheduler — we haven't selected a configuration or build preset yet.

The big area in the middle is our CMakeLists. In this project, I need to compile two programs: one `main_cpp` and one `sim_kernel`. And below there's conditional compilation: if it's a UNIX platform and NOT an APPLE platform, link the `pthread` library to the `main_cpp` program. We also named the project `SimLauncher`, required C++17 as the standard, and specified the output folder as `build/bin`. All of this is fairly self-explanatory.

To build this project, we need to select a project configuration and a build configuration. Hover your mouse over the `[No Kit Selected]` under `Configure` in the right sidebar — a pencil icon will appear. Click it, and a top dropdown will pop up asking you to choose which compiler kit to use:

![Select Compiler Kit](img/SelectKits.png)

Since we're on Windows and I have VS installed, I naturally have an MSVC compiler kit. The first and second options are for scanning to see if there are any other kits; the third is "don't specify manually" — I don't recommend picking it if you're unsure, though it works. Among the bottom four, their difference mainly lies in the target platform architecture: `amd64` (sometimes you'll see so-called `x64` — they can be treated as the same thing) means your CPU architecture is 64-bit. Generally we just pick this one and we're good. `x86`, on the other hand, refers to the so-called Intel 8086 architecture processors, i.e., 32-bit processor architecture. We won't bother with that — 64-bit is just fine. You can also see there are two more options where both appear together, like `amd64_x86`, meaning your own machine is 64-bit architecture but the compilation target is 32-bit. We don't need such fancy functionality.

Once you've made your selection, CMake will start configuring. The results will default to the `build` folder, and it'll also set the build, debug, and run target all to `ALL_BUILD` — meaning all targets will be processed, not just a specific one. Of course, hovering your mouse over it will also reveal a little pencil, so you can choose whichever one you like. As for the contents of the `build` folder, we don't need to worry about it much — if you're curious, you can look into it yourself.

After configuration is done, we can build the project. Hover your mouse over `PROJECT OUTLINE` and a little icon will appear:

![Build](img/Build.png)

The little bug next to it is the button to start debugging, and the one on the far left is for configuring all targets. Click this icon that looks like you're packing things into a box — it's our project build button. After clicking it, the `OUTPUT` panel on the right will spit out a bunch of info telling you how your build process is going:

![Build Output](img/BuildOutput.png)

When you see `[build] Build finished with exit code 0` appear at the very bottom — just like how many programs return 0 to indicate successful execution — it means your build succeeded. Since we selected `Debug` under `Configure`, and our `CMakeLists.txt` set our build output to the `build/bin` folder, we can find our compilation artifacts in `build/bin/Debug`.

Of course, we don't have to run things manually — after all, running manually means learning to manually use a debugger for debugging. Let's still take advantage of VS Code's integrated features instead. Click the little bug mentioned earlier and you can start debugging. Just remember to set a breakpoint before debugging, otherwise the program won't stop and wait for you.

Finally, worth mentioning: the few buttons in the bottom-left corner of your window also include a `Build`, a little bug, and something that looks like a play button — they represent Build, Debug, and Run respectively, and they're linked to CMake. You can also use the bottom status bar for these operations.

![Bottom Status Bar](img/Bottom.png)

Now that we've covered CMake integration, let's try connecting to a remote server!

### Remote Features

VS Code's remote functionality is actually a lot like it's preloaded. Remember that bottom status bar from above? The blue button on the far left is the one that launches remote connections. Clicking it will bring up a window something like this:

![Choose Connection Mode](img/RemoteConnection.png)

Since my machine has WSL (Windows Subsystem for Linux), this page has an extra option for connecting to WSL. Select `Connect to Host...`, and you'll see:

![Select Remote Machine](img/SelectRemote.png)

I already have 5 options — that's because my `.ssh/config` contains these 5 configurations: the extension actually reads this file and presents them here. Please select the server you want to connect to, and it'll start connecting.

Since we're connecting through VS Code, we need to wait for the server side to install the VS Code server program — it might take a little while. This process depends on your network speed, but it's usually done in a few minutes. Once connected, a new VS Code window will open, but the bottom-left corner will show the name (alias) of the server you logged into, and any remote folder you open will also show the server name (alias) in the title bar.

And then? That's it. Develop on the remote VS Code the exact same way you develop on your local VS Code.

So, at this point, I hope you've successfully configured your VS Code and can use it smoothly for remote development.

## Afterword

This article is essentially an upgraded version of that one about VS Code and Python configuration — the installation steps are more detailed, and I've added some CMake introduction. Last week I did a local build on the remote compute server I've got my hands on, and it felt pretty nice, so I wrote it down. After all, when it comes to programs, locally compiled artifacts just feel like they're more computationally efficient (well, it feels that way, at least).

This article's creation process also produced a side effect — maybe you've already noticed: some of my screenshots were taken on a Windows 11 virtual machine. That's because my own installation is already crammed full of all sorts of my personal configurations, so if I wanted to talk about how to install and configure from scratch, using my own computer would definitely not be appropriate.

However, installing Windows on a virtual machine turned out to be way more troublesome than I imagined: all kinds of mysterious little bugs. At first, I installed it on Oracle VirtualBox, but it would often black-screen on boot. Then some group chat friends suggested that for installing Windows on Windows, I should try Hyper-V. After moving to Hyper-V, the VM would frequently drop its connection — it would log out the account after a short while, which was incredibly annoying. Finally, after much effort (and some time), I managed to get it installed properly on VirtualBox, but then the network was acting up, and then the network magically fixed itself for no apparent reason.

Thinking about how I went through all this just to install VS Code in a clean environment... it's just hard not to laugh-cry. Still, the result turned out fine in the end, I suppose. Just some rambling thoughts — hope it gave you a chuckle.

As always, I wish you a pleasant life and smooth sailing at work.

[^1]: The full name of this software should be *Visual Studio Code*, but in everyday use we shorten it to *VS Code*, *VSCode*, *vscode*, or *VSC*. I personally still prefer the *VS Code* style.
[^2]: Source: [The Untold Story of Visual Studio Code: A Revolution in Software Development](https://dev.to/rajeshkumaryadavdotcom/the-untold-story-of-visual-studio-code-a-revolution-in-software-development-44pp), which tells the story of VS Code — pretty interesting.
