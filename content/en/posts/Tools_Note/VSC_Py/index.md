---
categories:
- Programming
tags:
- Python
- VS Code
- Document
- Tutorial
title: "Python + VS Code Quick Setup"
description: Quickly set up a Python development environment in VS Code
image: /images/妹红.jpeg
date: 2024-11-01
links:
  - title: Python With VS Code
    description: GitHub link
    website: https://github.com/A-moment096/Python-with-VS Code
math: true
---
*This is a tutorial written for students who are just starting to learn Python, helping them quickly set up a Python development environment using VS Code. It was originally written on September 14th of this year and has now been moved here and converted to Markdown as the first post in the Programming section.*

## Introduction

Python, a great language. Its simple, human-language-like syntax, rich ecosystem, and powerful features have made Python sit comfortably at the top of the most popular programming languages in recent years. However, for beginners who are just starting to get into programming, the most troublesome part may not be learning syntax or dealing with errors, but rather setting up a simple and easy-to-use development environment. This article will do its best to introduce how to configure a programming environment suitable for beginners or light users using VS Code + Python, so that newcomers can smoothly get through the tedious peripheral tasks of the early stages and get to the main course as soon as possible.

However, I must remind readers that I am not a primary Python user myself. For me, Python is only used for daily data processing. Therefore, if there are any inaccuracies, please contact me for corrections. If there are omissions or inappropriate parts, you are also welcome to reach out. During the writing of this article, I did not delete my existing environment and rebuild it from scratch to complete this guide, so there may be many details that do not match reality. My new computer will arrive soon, and I will follow this article to set up the corresponding environment to verify whether the content is appropriate. Please bear with me, dear readers. This article also assumes that you are using Windows 10 or above. If you are a Linux or other OS user, I believe you do not need this article to quickly set up your environment.

## Downloading the Python Interpreter

The execution of the Python language relies on the Python interpreter interpreting the written Python scripts line by line. It can also be used interactively, executing input immediately after the interpreter reads it. Therefore, the Python language interpreter is necessary for learning Python. To download the Python interpreter, please go to the [Python official website](https://www.python.org/downloads/). Beginners do not need to worry too much about language version issues (a version that is too new may cause some libraries that have not yet been adapted to fail to work properly); you just need to make sure the version you download is Python 3 (the version number starts with 3). Python 3 and Python 2 have many fundamental syntax differences, and many libraries currently do not support Python 2 very well. Of course, to keep things simple, downloading the latest version directly is perfectly fine, and it is also fine to change versions later when actual needs arise.

After downloading the Python interpreter, you can proceed with the installation. **Please make sure to check "Add to PATH" to avoid the complicated process of manually adding environment variables later!** Of course, if unfortunately you have already installed the Python interpreter without checking this option, you can consider uninstalling and reinstalling, or manually adding the Python path to the environment variables. This will not be elaborated on here.

For the remaining options, you can go with the defaults all the way. There is an option that asks whether to install for all users. If there is only one account on the computer you are using (or, in common terms, only you use this computer), whether or not to select this option generally does not matter. If you are using a public computer or a server, please do not check this option, meaning install only for yourself.

Finally, please check whether you have successfully installed the Python interpreter. You can press `Win`+`R` on your keyboard to open the Run dialog, type `cmd` in the dialog and confirm, and you will enter a "black box" (Command Prompt). At this point, type `python -V` (note the capital V) or `python --version`. If Python was successfully installed and added to the environment variables, the version of the Python interpreter you installed will appear on the screen. Otherwise, if you see an error similar to "Python is not recognized," then your installation may have failed, or Python was not added to the environment variables during installation.

The above covers the process of installing the Python interpreter.

## Installing and Configuring VS Code

This step is parallel to the previous one — there is no required order, and you can freely choose which part to do first. However, it is recommended to do the previous part first, so that by the end of this part you will be able to start Python programming directly in VS Code.

VS Code is a powerful text editor. Its biggest feature is its excellent plugin ecosystem and extensive language support (also achieved through plugins). By combining VS Code with plugins, you can build a development environment comparable to an IDE. I recommend the official guide by VS Code for using Python in VS Code: [Python in Visual Studio Code](https://code.visualstudio.com/docs/languages/python). This document provides a detailed introduction on how to use Python in VS Code from scratch, and it has virtually no downsides except for being in English (of course, you can use webpage translation). Below, I will introduce how to install VS Code and related plugins myself.

Click [here](https://code.visualstudio.com/) to open the VS Code official website. VS Code installation can be done entirely with default options, which will allow you to use the basic features of VS Code. To install plugins, you can select the sidebar or use the shortcut `Ctrl`+`Shift`+`X` to open the Extensions Marketplace. Enter relevant keywords in the search box at the top of the page to find related plugins. For Python development, please install the following plugins.

- **Chinese (Simplified) Language Pack for Visual Studio Code**: Changes the VS Code display language to Chinese.
- **Python Extension Pack**: An all-in-one bundle of Python plugins for VS Code. Installing this is the most convenient option.

## Trial Run of a Python Script

After completing the steps described above, you can start writing your first Python script to check whether your environment is set up correctly. Below are some simple steps:

1. Create a new file, name it whatever you like, and change its extension to `.py`.
2. Right-click the file and select **Open with VS Code**. After the VS Code interface opens, VS Code may ask whether you trust the folder. Please select **Trust** so that your installed plugins can run properly; otherwise, the plugins may be blocked by VS Code.
3. Now you can edit the file. Type in some Python code. Below is a simple test:
    ```python
    print("Hello Python!")
    ```
    Please write and save this file.
4. Now try running the script. If you have successfully installed the Python plugin, a small right-pointing arrow should appear in the upper-right corner of the file interface. Click that arrow to start running. Since this is very likely your first time running a Python script in VS Code, a notification will pop up in the bottom-right corner informing you that you have not yet selected a Python interpreter. At this point, a dialog will appear at the top of the interface, letting you choose the Python interpreter you need. You may see multiple interpreters (if you have downloaded multiple interpreter versions) or an option to create a virtual environment (Create Virtual Environment). You can set aside the idea of a virtual environment for now and use an existing globally available Python interpreter first.
5. After selecting, repeat the previous step and press the small arrow. This time, a new panel will appear at the bottom of the VS Code interface, showing the result of your program's execution. At this point, you have successfully run the Python script, which also means your Python development environment has been set up successfully.

## Python Debug, Pip, Jupyter Notebook

This section will briefly introduce other aspects of Python and VS Code.

### Debugging

Debugging is the operation used to investigate errors and omissions in program execution. Writing code once and having it run perfectly is certainly nice, but this situation is rarely encountered in actual development. In real development, various problems often arise that hinder development progress. These errors in a program, whether logical or syntactical, are called bugs. The process of finding bugs in a program and fixing them so that the program can run correctly is debugging, also known as Debug.

The simplest debugging method is to output the data of the program at a certain step to the console using `cout` (C++), `printf` (C), or `print` (Python). However, this approach can be somewhat tedious, especially when encountering data that is difficult to output to the screen, at which point the output method falls short. In modern program development, a debugger is often used to run the program step by step in an attempt to discover hidden problems. Although Python itself is an interpreted language that runs existing programs line by line, the many features of a debugger can still assist in finding program flaws.

First, let's introduce breakpoints. When a program runs to a breakpoint, it will stop just before that point and wait for the user's next command. Breakpoints are generally inserted near the line numbers on the left side of the code editor (to the left of the line numbers in VS Code), and a small red dot will appear after successful insertion. When the program stops at a breakpoint, you can view the values of variables, the function call stack, and various other information, and then you can step forward through the program, stop debugging, or step into function internals (controlled via the small toolbar in the upper-right corner of VS Code).

To enter VS Code's Debug mode, when running a Python script, find a downward-pointing arrow next to the run arrow in the upper-right corner. Click to expand the menu and select Python Debugger: Debug Python File, and you will enter debug mode. Please note that this option not only starts debugging but also changes the default launch mode in the upper-right corner to debug mode. In debug mode, a small bug icon will appear next to the triangle, indicating that you are currently in debug mode.

Please make good use of debug mode and the debugger.

### Pip

Pip (Package Installer for Python) is the package manager for Python. A "package" refers to function libraries, class libraries, and so on that need to be called during Python execution. A large part of Python's strength comes from its active ecosystem, meaning its rich set of third-party libraries, or third-party packages. Some even say that Python is a glue language, meant to bind various libraries together to get things done. In any case, the significance of packages for Python is beyond doubt, and as Python's default built-in package manager, the basic operations of Pip are worth briefly learning. Below, I will introduce some simple Pip commands, using the installation of Numpy, a famous scientific computing library in Python, as an example to demonstrate Pip's usage. Common Pip commands and parameters include:

- `help`: Displays help information, showing you the function of a command.
- `install`: Instructs Pip to enter download mode. Append a package name after Pip to download that package. If you need to update a package, add `--upgrade` before the package name to tell Pip to update this package rather than install it.
- `uninstall`: Uninstalls a Python package. Append the package name after this command.
- `list`: Lists all Python packages you have installed.

Next, let's go through installing Numpy:

1. Open the Command Prompt and enter `pip` to check whether Pip is working properly. If available, some help text will be displayed without any error messages;
2. You may see that your Pip has an available update. If, after running the `pip` command, Pip prompts you that you can update to the latest version, you can choose to enter the command as prompted to perform the update.
3. Enter `pip install numpy` to install Numpy. After a short wait, you will have Numpy installed for global use. Note that Numpy downloaded in the global environment will take effect globally.

### Jupyter Notebook

Python scripts often need to be written and then executed from start to finish in one go, while interactive mode (opening Python in the Command Prompt (`python`) will enter interactive mode) executes whatever the user inputs each time. The former lacks flexibility, while the latter easily loses context. Is there a more interactive way of using Python that does not lose the contextual environment? Jupyter Notebook provides just such a method.

Jupyter Notebook integrates the Python environment and Markdown, allowing you to write and run Python scripts in code cells and edit text using Markdown syntax in Markdown cells. The two types of cells are very flexible in placement, and Notebooks can be opened directly in a browser, saving the trouble of a dedicated editor, or you can choose to use them in VS Code. Below, I will introduce how to install and use Jupyter Notebook.

1. Use Pip to install Jupyter: `pip install jupyter` and wait for the installation to complete.
2. Enter `jupyter notebook` and press Enter. Please be careful not to close this window, as it will run as a server. Closing it will cause Jupyter Notebook to become unusable.
3. After a short wait, your default browser will pop up a window with Jupyter displayed in the upper-left corner, and your user folder shown on the main page below. You can double-click an existing file ending in `.ipynb` to open an existing Jupyter Notebook file, or click **New → Notebook** on the right to create a new Jupyter Notebook in the current folder, which will open in a new page of your browser.
4. At this point, the new page will ask you to select a Python kernel. Use the default setting, and you will have created a new Jupyter Notebook. The first cell by default will be a code input cell. Click the cell in the center of the page to enter input mode, enter Python code, and then press `Ctrl`+`Enter` to run the code. The result will be displayed below that code cell.
5. You can use the toolbar at the top to create, insert, delete, and run code cells or Markdown cells. Explore more features on your own.

With the above, you have successfully installed and trial-run Jupyter Notebook.

In addition to using the native Jupyter Notebook in the browser, you can also launch it in VS Code after installing Jupyter. After installing the Jupyter plugin, use the shortcut `Ctrl`+`Shift`+`P` in VS Code, or click the search box at the very top of VS Code and type `>` to enter Command Mode, then type `jupyter`. The dialog will then show all available commands. Click **Create: New Jupyter Notebook** to create a new Jupyter Notebook. Subsequent operations are similar to those on the web version. This method does not require you to manually open a Jupyter server — the Jupyter plugin installed in VS Code will automatically start a Jupyter server in the background of VS Code.

## Afterword

I hope that through this article, I can introduce what I consider to be a good, simple, and convenient Python development environment to the readers of this article. However, as someone who is not a primary Python user, omissions in the content of this article are inevitable, and since the illustration experience in $\LaTeX$ is not excellent, I have not inserted images into the article but instead used verbal descriptions. I hope readers can understand.

Thank you for reading this far. If you have any thoughts or opinions about the content of this article, you are welcome to contact me. Finally, I hope this article can truly deliver, and help you realize Python's famous saying:

> Life is short, I use Python.

Wishing you a pleasant life.
