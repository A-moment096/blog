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
title: "What Was the Last Command?"
description: "Using macros in interactive [BA,Z]SH to get info about the previous command"
date: 2025-07-26T20:09:18+08:00
image: /images/SEASIDE_SOLILOQUIES.png 
math: true
license: 
comments: true
---

*I used to always wonder: how do you get the previous command? Should be simple, right? After a quick search, here's what I found. Let me jot it down.*

*The header image is from Orangestar's album **SEASIDE SOLILOQUIES** -- beautiful art and great music. So for the track pick here, let's go with the title song from that album: **Alice in Reitouko** (Alice in the Freezer). Hope you enjoy it.*

{{< music auto="https://music.163.com/#/song?id=458231453" loop="none">}}

## When Would You Use This?

Sometimes we type out a long command with really annoying paths in it, and we wish there were some symbol that could automatically fill in certain arguments from the command. One of the most common examples: when I'm about to install some packages and occasionally forget to add `sudo` to run with admin privileges. At that point, copying the whole command again and adding `sudo` is way too slow, and pressing the up arrow then moving the cursor to the beginning to type `sudo` always feels exhausting -- the distance your hand travels just feels so far. Beyond that, sometimes after running a long command or set of arguments, I need to continue using those arguments for another command. If I use command history at that point, I'd have to position the cursor again, delete the useless parts, and then fill in the replacement. That is just way too slow.

Fortunately, in these situations we can use a built-in macro in `zsh`'s interactive mode: using `!`, the exclamation mark, along with its corresponding variants, to grab arguments from the previous command, or even the entire command. Let's go through how to use it.

## I Need the Whole Command

### What Was the Last Command?

We can use `!!`, or `!-1`, to get the "last executed command." For example:
```bash
$ echo hello bash world!
hello bash world!
$ echo !! # !! substitutes the entire last executed command, i.e., it substitutes "echo hello bash world"
echo hello bash world!
$ echo !-1 # Same as above, also substitutes the last executed command, so it substitutes "echo echo hello bash world"
echo echo hello bash world! 
```

### I Want to Recall a History Command

We can also use `!<num>` to select a specific history command. First, let's use `head` to peek at the earliest entries in our command history:

```bash
$ head ~/.zsh_history # My zsh command history is stored in this file; use head to see the first few commands
: 12345:0;clear
: 12346:0;echo hello
: 12347:0;ls
## ... ... 
```

Then we can use `!1` to select the first command in history, which here is `clear`:

```bash
$ !1 # Execute the first history command, which is clear -- it will clear the screen directly;
$ !2 # Execute the second history command, prints hello;
hello
$ !3 # Execute the third history command, prints the contents of the current directory
file1 file2 file3
```

### Summary

As we can see, the number following `!` actually represents "the nth command." By extension, `!-1` means "the last command" (the previous one), and `!-2` would be the second-to-last command.

> With these two commands, we can conveniently use `sudo !!` when we forget to use `sudo` privileges, or select a specific history command to quickly run it with `sudo`.

## I Need a Few Arguments

### I Need a Specific Argument

We can use `:<num>` to select the nth argument. It needs to be used together with `!`. Arguments start counting from 1, while 0 has a special meaning: it represents the command itself. For example:
```bash
$ echo one two three
one two three
$ echo !-1:2 # Equivalent to echo two
two
$ echo !:0 # The previous command used echo, so 0 represents echo; this command is equivalent to echo echo
echo
```
When using `:` for argument selection, if you're selecting from the previous command, you can abbreviate it as `!:<num1>-<num2>`.

### I Need a Range of Arguments

We can also use `:<num1>-<num2>` to select a range of arguments. For example, `!!:1-2` means "take the first and second arguments." (Note: these are arguments, not space-separated strings, and the first word -- the command -- is not included.) For instance:
```bash
$ echo one two three four
one two three four
$ echo !!:1-2 # Equivalent to echo one two 
one two
$ echo one two three four # This line resets the last command
one two three four
$ echo !!:-3 # Without <num1>, it defaults to 0, equivalent to echo echo one two three
echo one two three
$ echo !-2:1-2 # Used with !<num>, equivalent to echo one two 
one two 
$ echo !-3:1- # Without <num2>, it matches all arguments except the last one, equivalent to echo one two three
one two three
$ echo !-4:$ # Use $ to get the last argument, equivalent to echo four
four
$ echo !-5:3-$ # $ also supports range selection, equivalent to echo three four
three four
$ echo !-6:* # Use * to mean all arguments, equivalent to echo !-6:1-$, i.e., echo one two three four
one two three four 
$ echo !:* # !: is shorthand for !!: or !-1: when using colon, equivalent to echo one two three four
one two three four 
```
Without `<num1>`, it defaults from `0`, meaning everything is included; without `<num2>`, it stops just before the last argument. Use `*` to select all arguments, and `$` to select the last argument.

## I Need to Manipulate Strings

After the colon, use certain letters to perform corresponding transformations. Suppose we have the command `ls /path/to/a/file.txt` and we use `echo !:1` to try and invoke that `ls` command's argument. The following modifiers can be applied:

- `:p` (print) Only print, don't execute -- gives you a preview. ZSH users might not need to worry about this one.
- `:q` (quote) Wrap the selected field in quotes, producing `'/path/to/a/file.txt'`
- `:r` (root) Get the full filename without extension, producing `/path/to/a/file`
- `:e` (extension) Get the file extension, producing `txt`
- `:h` (head) Get the path's directory, producing `/path/to/a/`
- `:t` (tail) Get the filename, producing `file.txt`
- `:s/to/has` (search) Find the *first* occurrence of `to` in the argument and replace it with `has`, producing `/path/has/a/file.txt`
- `:gs/to/has` (global search) Same as above, but replaces globally.

## TL;DR

Here's a simple table summarizing these usages.

### Command Selection (using `!`)
| Syntax      | Meaning                                      | Example     |
| -------- | ------------------------------------- | ---------- |
| `!!`     | The previous command                  | `sudo !!`  |
| `!-n`    | The nth-to-last command               | `!-2`      |
| `!n`     | The nth history command               | `!42`      |
| `!string`   | The most recent command starting with that string       | `!ls`      |
| `!?string?` | The most recent command containing that string          | `!?foo?`   |
| `^old^new`   | Replace the first occurrence of "old" in the previous command with "new" | `^cat^bat` |

### Argument Selection (using `:`)

The examples below use `echo file.txt` for demonstration.

| Syntax       | Meaning                                | Example                  |
| -------- | ------------------------------------- | ------------------- |
| `!!:0`   | The command name of the previous command            | `!!:0` -> `echo`     |
| `!!:1`   | The first argument                      | `!!:1` -> `file.txt` |
| `!!:2`   | The second argument                      |                     |
| `!!:$`   | The last argument                        | `!!:$`              |
| `!!:*`   | All arguments (equivalent to `!!:1-$`) | `!!:*`              |
| `!!:1-3` | Arguments 1 through 3                  | `!!:1-3`            |
| `!!:2-$` | From the 2nd argument to the last      | `!!:2-$`            |
| `!$`     | The last argument of the previous command (colon can be omitted)       | `cat !$`            |
| `!*`     | All arguments of the previous command (colon can be omitted)            | `rm !*`             |

### Argument Modifiers

The examples below use `echo /path/to/file.txt` for demonstration.

| Modifier        | Meaning                                      | Example                         |
| ---------- | --------------------------------------- | -------------------------- |
| `:p`       | Only print the command, don't execute             | `sudo !!:p`                |
| `:q`       | Quote the argument to avoid issues with spaces or special characters    | `echo !!:1:q`              |
| `:h`       | Get the path head (like `dirname`)   | `echo !!:1:h` -> `/path/to` |
| `:t`       | Get the path tail (like `basename`) | `echo !!:1:t` -> `file.txt` |
| `:r`       | Remove the file extension (keep the stem)          | `echo !!:1:r` -> `file`     |
| `:e`       | Get the file extension                         | `echo !!:1:e` -> `txt`      |
| `:s/old/new/`  | Replace the first occurrence of a substring            | `!!:1:s/foo/bar/`          |
| `:gs/old/new/` | Replace all occurrences of a substring                  | `!!:1:gs/foo/bar/`         |

## Conclusion

I suppose this isn't really complete, but as far as the methods I've listed here go, I personally feel they're already more than enough. After all, the ones I use the most in daily life are just `sudo !!` to add admin privileges to `pacman -Syu`, or using `vim` or `cd` to open a file/directory after confirming it exists with `ls -l /path/to/file`.

One more thing to note: `bash`, by default, won't give you a preview of what will happen before executing, unlike `zsh`. It just runs the command straight away. So when using this feature in `bash`, you might want to be extra careful, especially with somewhat dangerous actions like `rm`. In those cases, you can try using `:p` first to print out the command that would run; if nothing looks wrong, go ahead and run it. I vaguely recall there being another way to make `bash` also provide a preview instead of executing immediately. But since I use `zsh`, I won't dwell on that. Maybe I'll update this article someday? Haha.

Anyway, thank you for reading this far. Wishing you a pleasant mood and good health~
