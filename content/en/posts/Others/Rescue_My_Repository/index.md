---
categories:
# - Mathematics
- Programming
# - Phase Field
- Others
tags:
- Git
- Shell
- Experience
title: Rescuing a Code Repository Accidentally Deleted by git-reset
description: Don't use commands you don't understand, and RTFM
date: 2025-12-28T00:13:03+08:00
image: /images/迷迭香.png
imageObjectPosition: "center 10%"
math: true
hidden: false
comments: true
draft: false
---

*Some idiot mistakenly used `git reset --hard`. This is what happened to him.*

*The header image features adorable Rosemary! Drawn by Pixiv artist [赌上厨师生涯的拼好饭](https://www.pixiv.net/users/38336697), here's the [original link](https://www.pixiv.net/artworks/138994056). The track is a Touhou doujin piece I've been listening to a lot lately: **encourager**, the first track from [凋叶棕 (RD-Sounds)](http://www.rd-sounds.com/)'s album **望 (Bou)**. The melody is positive and uplifting, bright and cheerful. The blonde kid on the album cover is so cute — can you even argue with that!?*

{{< music auto="https://music.163.com/#/song?id=28732491" loop="none">}}

## Prologue

A wonderful and joyful Friday — at my senior lab mate's suggestion, I decided to put the deep learning code I'd written with AI onto a GitHub repository. Everything works great! The results from my code looked decent, and sharing them on GitHub with the lab mates seemed nice enough (just probably not up to everyone's standards, hehe). Without further ado, create a Git repo first, push to remote later — easy~

First, naturally, let Git take over this repo:

```bash
git init .
```

Just as I reflexively typed:

```bash
git add .; git commit -m "
```

I suddenly realized — this project had been thrown together messily, "as long as it works" style. The working directory was a mess, no README either. Shouldn't I clean it up first? So I deleted the commit part:

```bash
git add .
```

Let's just stage the files for now. But wait — did I just add a bunch of useless and really large data files!? One glance at VS Code's sidebar — the little blue Git dot — wow, 200+ files, definitely not right. Write a `.gitignore` file to ignore the `data` folder contents. Next, I should write a README.md explaining what this project does and how to prepare project dependencies. While at it, I also learned how `conda` can `freeze` like `pip`:

```bash
conda list --export > requirements.txt
```

That's it.

After writing these things, I glanced at the Git blue dot again: not much change... Oh right! I remembered you can use `git reset --hard` to make Git stop tracking certain files, right? So:

```bash
git reset --hard
```

……

The nightmare began.

## Woah, Help, Git!

Looking at my directory — only a few files I'd created *after* running `git init .` remained, while everything from before initializing the git repo was gone. I suddenly realized: `git reset --hard` isn't an "undo" — it resets the repo state to the previous commit. And my repo had never been committed, so all the pre-repo content was just... gone. At that moment I had no mind to figure out what `git reset` actually does. My only goal was: get my dear files back. That was two weeks of me asking AI to write code for me!

My first instinct was to use the incredibly powerful `git reflog`, which I remembered records every operation you make in Git. Yet running `git reflog` gave me:

```bash
fatal: your current branch 'main' does not have any commits yet
```

Too cruel. You need commit history... oh god...

Then I thought — I'm in WSL, maybe I can find them in the Recycle Bin... After a moment's thought, I laughed at myself. This is WSL — it's Linux, with its own independent virtual disk `ext4.vhdx`. In this environment, Git deleting files is like using `rm` to delete them yourself — there's no Recycle Bin to recover from.

I was totally screwed... Looks like Git and I just pulled off a big one together...

## What Now, Recover the Entire Disk?

It's 2025 — when you run into a problem, you should learn to ask AI. I fired off my situation to AI. It didn't hesitate — luckily I was using WSL, and the vhdx disk file could be backed up as a copy. It told me to locate the disk file and copy it elsewhere. But the next steps floored me: I'd need disk recovery software, mount this disk image from a different environment, install packages, and try to fish out data from the disk that hadn't yet been overwritten.

Why can disk recovery tools attempt to retrieve these files? Isn't deleting in Linux supposed to mean permanent deletion? Actually, "permanently gone" isn't quite accurate. In practice, deletion generally doesn't erase the data — it just disconnects the data from the filesystem. Or rather, when we delete a file in the filesystem, the filesystem doesn't wipe the data stored in those areas — it simply stops protecting that storage region. Whoever needs that space later will get it allocated to them. It oddly reminds me of the saying *death isn't the end of life; being forgotten is*. In filesystem terms: *deletion isn't the end of a file; being overwritten is*.

Therefore, as long as I hadn't stupidly written more data to the filesystem, those locations shouldn't have been overwritten yet, and I still had a chance to rescue this data: have the filesystem re-link and protect that region. But that's easier said than done. My knowledge of filesystems only goes this far (and might even be wrong — experts please go easy on me, sniff). The thought of my beautiful Friday afternoon being completely occupied and ruined by data recovery — and the fact that the most important stuff to recover made up less than 10% (after all, most of what was lost was computation data, copied into WSL, while the important parts were the code) — and that even that was AI-written...

The moment I thought about that, I gave up on the idea of recovering the whole disk. Chatted with AI a bit more — it suggested I try recovering something from the editor. I tried, but it didn't help... Was I really just going to accept defeat and get AI to write the code again?

Then it hit me — why not Google it? (Fine, DuckDuckGo. Sorry, DuckDuckGo really is great, goodbye Google.) I searched `git reset --recover recover` and ended up finding an amazing Stack Overflow post:

## Stack Overflow to the Rescue

Top search result — [this Stack Overflow post](https://stackoverflow.com/questions/5788037/recover-from-losing-uncommitted-changes-by-git-reset-hard) with a very direct question. The top-voted answer said the same thing I thought: if you have commit history, you can use `git reflog show` to save yourself. Funnily enough, this answer wasn't selected as the accepted answer. Instead, the second answer, with slightly fewer upvotes, was chosen by the OP. This answer, originally posted in 2011, said:

> Previously staged changes (`git add`) should be recoverable from index objects, so if you did, use `git fsck --lost-found` to locate the objects related to it. (This writes the objects to the `.git/lost-found/` directory; from there you can use `git show <filename>` to see the contents of each file.)

Huh! I *did* run `git add .` earlier! At that thought, I immediately tried this method. And sure enough, in the `.git/lost-found/others` folder, I found all the files I'd lost. The catch — all the filenames were garbled, and the vast majority were XML-format data files. Finding the critical files would take a long time, and `git show <filename>` didn't seem to work either. But regardless, I'd successfully recovered the content, which was a huge relief. Worst case, I'd just open all the files one by one.

Still, with this progress, why not ask AI for further help?

## AI Is Actually Pretty Useful

Upon hearing the news, AI first congratulated me enthusiastically, then pointed me to a bright path: the `file` command can inspect file types and tell me what each file's content is. Excellent! I had AI write a Bash script on the spot, and soon the files were sorted into different folders by type. Interestingly, I also discovered that Jupyter Notebook `.ipynb` files are actually JSON files in disguise, and dear VS Code, upon detecting that a file is JSON with an `.ipynb` extension, will directly render it for you (even creating an `.ipynb` file in VS Code auto-writes some file headers and renders it). Thank you, VS Code!

After finding the most important `.ipynb` files and Python scripts, the rest could actually be deleted. I had successfully weathered this crisis. Thank you Stack Overflow, thank you AI, thank you VS Code, thank you everyone — I survived.

## So, What Does `git-reset` Actually Do?

The best way to answer this is **RTFM**, i.e., *Read The Friendly Manual*. If you don't have a built-in doc reader like `man`, or on Windows, typing `git reset --help` opens the `git-reset` help documentation (yep, `man` is actually a lightweight HTML reader).

By reading the (~~not-so-friendly, a bit obscure~~ actually quite friendly) documentation, you learn that `git reset` is designed to *undo* certain operations through *resetting*. The `SYNOPSIS` and `DESCRIPTION` sections are admittedly a bit hard to follow at first, but we can jump straight to `EXAMPLES`, which thoroughly documents practical use cases for `git reset` in various situations. Honestly, each example ends with some explanatory text that reads almost like a little story or the protagonist's inner monologue — kind of fun. I won't list the specifics here since there's quite a lot of content, but if you're interested, feel free to look it up and read at your own pace.

So what does `git reset --hard` do? The answer: it completely reverts to a specific commit. When you append a commit position (using `HEAD` relative position or a `commit-hash`), it jumps back to that commit and **thoroughly deletes** all changes after it. If you don't specify a commit position, it defaults to `HEAD`, resetting Git's head pointer. *Changes* to files tracked and indexed by Git are discarded, while files that were never indexed are simply deleted outright.

This explains what happened in my repo. Files I *created* after `git init .` were directly indexed, but since they were new files rather than *changes*, they weren't deleted — they were left as-is. But files that existed before `git init .` — since they hadn't been tracked and indexed by Git yet — were ruthlessly deleted by `git reset --hard`. The exact phrasing is:

> Any untracked files or directories in the way of writing any tracked files are simply deleted.

Thank you, Git. I'll never blindly use `git reset` again.

## What Did `git-add` Do? And What Is `git-fsck`?

So why was I able to recover my files? The reason lies in how `git add` works. After `git add`, files added to the staging area are stored in the `.git/objects` folder. Let's do a little experiment with the following code:

```bash
mkdir test-folder
cd test-folder
echo hello > test.txt
git init .
```

So we created a new folder, wrote a new file, and ran `git init .` while files were present to initialize the repo. Let's check with `git status`:

![Git status output](git-status.png)

Now let's look at the `.git/objects` folder:

![.git/objects folder](eza-git-object.png)

It's empty. Now let's run these Git commands:

```bash
git add .
eza --tree .git/objects
# if you don't have eza:
# tree .git/objects
```

![.git/objects after add](after-add.png)

How do we confirm that's our file? Git provides its hashing command — we run `git hash-object ./test.txt` and get:

```bash
ce013625030ba8dba906f756967f9e9ca394464a
```

Interesting: Git takes the first two characters of the hash as a folder name, and the rest as the filename.

Now let's recreate the brilliant thing I did, and then look at `.git/objects`:

```bash
git reset --hard
ls -l
eza --tree .git/objects
```

![After git reset](git-reset--hard.png)

How magical! The files in the working directory were indeed deleted, but the contents of `.git/objects` were not. All thanks to `git add .` — which staged the results. Now let's try `git fsck --lost-found`:

```bash
git fsck --lost-found
eza --tree .git/lost-found
cat .git/lost-found/other/ce013625030ba8dba906f756967f9e9ca394464a
```

![After git fsck --lost-found](git-fsck--lost-found.png)

So essentially, `git fsck --lost-found` recovers files that were `git add`-ed from `.git/objects`. So what is `git fsck`? Checking the manual:

>  git-fsck - Verifies the connectivity and validity of the objects in the database
>
> `--lost-found`
> 
>  <p style="text-indent: 50px"> Write dangling objects into `.git/lost-found/commit/` or `.git/lost-found/other/`, depending on type. If the object is a blob, the contents are written into the file, rather than its object name.

That's it! *fsck* should be an abbreviation of *filesystem check*, and `--lost-found`, as expected, restores *dangling* objects into these two folders.

## Conclusion

This really made me break out in a cold sweat. Luckily I had the habit of `git add .`-ing beforehand — otherwise, not even a deity could have saved me. I really didn't want to spend my beautiful Friday hours on filesystem recovery. Of course, the biggest lesson is: don't casually use commands you don't fully understand, especially ones that can make semi-irreversible changes to your filesystem. I thought I was somewhat familiar with Git — looking at it now, that was sheer arrogance. A little knowledge is a dangerous thing — I ended up shooting myself in the foot. I still have much to learn!

But to give myself some credit, I did handle some things well in this ordeal. At least I didn't completely panic and perform even more baffling operations, like shutting down and rebooting to ensure total deletion — that level of insanity. Once before, I lost something and couldn't find it; in a moment of panic, I ended up losing it for good. Fortunately, that time the files weren't important, so losing them wasn't a big deal. Seems like this time I'd learned a bit from that lesson: don't panic and flail about, don't let the left brain fight the right brain.

Also, DuckDuckGo is genuinely great, and Stack Overflow is genuinely great. Without a search engine and this amazing forum, two weeks' worth of effort might really have gone down the drain (even if I had AI doing the grunt work (lol)).

I hope this experience helps anyone who runs into a similar situation, or at least serves as a wake-up call for you too. So, thank you for reading this far — I wish you good health, smooth work, and no facepalm moments~
