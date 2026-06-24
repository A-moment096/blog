---
categories:
# - Mathematics
- Programming
# - Phase Field
# - Others
tags:
- Shell
- Tools
- Note
- VCS 
- Git
title: "(Maybe) a Git Tutorial? Part Three"
description: "Let's work on a project together~"
date: 2025-08-26T18:28:16+08:00
image: /images/Tatara-Kogasa.jpg
math: true
license: 
hidden: false
comments: true
mermaid: true
---

*The final section -- let's talk about collaborating with others on GitHub~*

*For header image info, please refer to the first section, thanks~ Once again I've picked a Kogasa character theme for the track. Hope you like it!*

{{<music auto="https://music.163.com/#/song?id=455026" loop="none">}}

## So, What Exactly Is Git's Remote?

We've mentioned before that Git uses *remotes* to enable collaboration with others. We've even already covered a few commands for interacting with remotes. But how exactly does Git implement this functionality? What are its characteristics? What do we need to watch out for when collaborating on development with others? Let's go through it step by step. First, let's systematically cover what a *remote* really is.

### Remote: Just Another Machine With Git Installed

Remotes are actually not mysterious at all. Thanks to Git's distributed nature, every machine that has Git installed and has a copy of the project's source code can be considered a remote. Or rather, "remote" is relative: if there are two machines, A and B, both holding the same project's source code with Git installed, then from A's perspective B is a remote, and from B's perspective A is also a remote. Communication between different machines can happen over SSH; for older projects, or if you don't want to use SSH, you can even communicate and transfer code via email -- just like the Linux kernel, GCC, and other projects do. In short, through this *every device stores a copy of the code* approach, Git achieves distributed code storage, where every device can be both a working repository and a repository that serves source code to others.

However, a lot of real-world experience has proven that sometimes having a central server makes things vastly easier. Everyone puts code updates on a public server, and everyone can pull code from that one server, which does a great job of ensuring development progress and code consistency. But then Git loses its innate distributed nature. So, which is better? True distributed, or a centralized code server?

### Comparison: *True* Distributed vs. Centralized Repository

Git supported distributed storage from the very beginning. The biggest advantage of this is that every person's repository is a backup of the code. The more people involved in a project, the more backups that project has. And everyone is the owner of their own copy of the code, with full control over it -- deciding for themselves whether to submit their code to others, or whether to accept changes from others. This decentralized, everyone-is-equal philosophy aligns perfectly with the spirit of free and open-source software. Additionally, this approach doesn't heavily depend on a single central device; the whole thing doesn't become completely unusable just because one device goes offline. Projects like the Linux kernel and the GCC compiler toolchain have no central code server in the usual sense for all collaborators to push code into or pull updates from.

That said, centralized servers naturally have their benefits. Imagine three people working on the same project with no central repository, instead passing updated code directly among themselves. If all three make different and somewhat conflicting changes, syncing is bound to face a ton of headaches. But if their code lives on a central server, that server faithfully records every change anyone makes to it, avoiding the awkwardness of everyone's code flooding in at once while keeping everyone's progress at the same stage, preventing each person from going off in their own direction and making merging impossible (even though branches could technically handle that). Additionally, if in a project the development team has clearly defined roles, there should be someone responsible for reviewing and revising code, and this is where the centralized server shines: let the reviewer(s) exclusively hold the right to modify the central server's code, and then the reviewer(s) can directly conduct reviews and merges on that server, while all collaborators can directly pull the latest code from that location. Some might say, why not just hand the code directly to the reviewer -- why does a central server have to be involved? But if that were the case, the reviewer's own computer would effectively become that central server to some degree. Personally, I can't think of any ordinary project that truly *needs* a fully decentralized workflow. Generally speaking, having one (or, of course, multiple) code hosting location(s) is a lot better.

So, who is the most popular *centralized code repository* on this planet?

## Code Hosting Platforms

### GitHub: The Blessed One

Allow me to proudly introduce the most popular code hosting platform on this planet, the crystallization of countless people's wisdom, the world's largest same-sex (?) social network ([confirmed](https://www.flysnow.org/2019/01/09/github-milestones), over 95% of users are male): GitHub. In the first installment, we already covered the relationship between GitHub and Git, and how people can use GitHub. Here, let's chat a bit more.

Above we called GitHub a code repository, but that's not quite rigorous. It should be called a code hosting platform -- anyone can create their own repositories on it and put their code there. Of course, GitHub's features go well beyond that. It integrates many very useful features, such as Issues, Pull Requests, GitHub Actions, etc. It also provides a beautiful and modern graphical interface, letting everyone visually see the change history of a code repository. It even offers GitHub Pages so developers can host static web pages on it, allowing many projects to have their own websites -- whether for documentation or promotion, the uses are diverse. As an aside, this very blog is hosted on GitHub Pages. GitHub -- greatness needs no words.

Currently, GitHub hosts [over 268 million public repositories](https://gitcharts.com/), sourced from all over the world, with massive numbers of new repositories, pull requests, and code commits every day. People's activity on GitHub has long since gone beyond simply committing their own code -- developers collaborate within projects, set development goals, merge others' pull requests, contribute to or raise issues for projects they're interested in, help others solve problems, and more. The types of repositories are incredibly diverse too: bizarre and wonderful projects written in all kinds of languages, some excellent resource-curation projects, and you'll even come across hilariously unhinged rants and internet memory archives. In short, beyond hosting your own code, you can check out other people's code, play around with others' projects, discuss with fellow developers (~~argue~~), and contribute to others' projects (~~fix typos~~). So many ways to use it -- it just depends on how you go about it.

GitHub originated in 2007 and is now 18 years old. Over these 18 years, GitHub has become increasingly polished and feature-rich. In 2018, Microsoft acquired it, making it a Microsoft subsidiary, and in 2019 GitHub announced support for creating unlimited private repositories for individuals, pushing its popularity to a whole new level. Just recently (August 11, 2025), its CEO announced their resignation, and GitHub was merged into Microsoft's Core AI division. Personally, I think this is bad news -- after all, as the world's largest code hosting platform, GitHub had almost become synonymous with *the spirit of open source*. The fact that what was a relatively independent subsidiary has now been directly folded into a division of Microsoft... no matter how you look at it, its independence is likely to decline further. It's truly a shame. But as of now, GitHub is still the most well-known product of its kind, arguably even a standard of sorts. So, let's keep using it for now. If GitHub ever truly falls, a successor will surely emerge.

### GitLab: Powerful Automation and Self-Hosting

Besides GitHub, there are of course other hosting platforms. Among them, another fairly popular project is GitLab. In addition to hosting on GitLab's own servers, it supports self-hosting your own code hosting platform on your own servers, and offers many similar features to GitHub, such as source code browsing, Issues, Merge Requests (GitHub's counterpart to Pull Requests), CI/CD (Continuous Integration / Continuous Deployment), and more. CI/CD is GitLab's most standout feature, renowned for its speed and efficiency. And because it offers self-hosting (via GitLab Community Edition), it's a great choice for projects that need strong independence, don't want to be under GitHub's control (reasons... I don't know either), or for companies that simply want to keep their projects private. Many projects are hosted on GitLab, such as KDE, ParaView, etc. Compared to GitHub, GitLab's privacy is notably stronger. The bad news, however, is that GitLab announced in 2024 that it would no longer directly provide services to the China region, instead handing it off to the local service provider *JiHu*. I'm hard-pressed to say which one you should use...

GitLab's functionality is very comprehensive. If you don't need such complete features and just want to set up a lightweight Git hosting platform on your own server, you can also choose Gitea. Its biggest feature is being lightweight, having the most basic functions a Git hosting server should have -- though with that comes the possible lack of more complex features, with automation-related stuff perhaps needing to be implemented manually.

With all that said, how exactly does Git interact with remote servers?

## How Git Interacts with Remotes

Let's go through some commands you'll use when Git interacts with remotes.

- `git remote` 

    This command, as the name says, is a subcommand for managing remote-related content. And just like `git branch`, if you run it with no arguments, it tells you what remotes are available. Generally speaking, a repository will have a remote called `origin`, which is usually where your repository is hosted on GitHub. If you want to confirm the specific details of a remote, use `-v` or `--verbose` to have Git tell you all the remote addresses for this repository. You can also use the `show` subcommand to have Git give you detailed info about a specific remote, including where it fetches code from, where it pushes code to, the current branch, the latest commit, and so on.

    If your repository doesn't yet have an available remote, you can use the `add` subcommand to add a remote repository as a remote for your repository. For instance, say you have an empty repository under your personal GitHub account at `https://github.com/abc/test_repo`, where `abc` is the username and `test_repo` is the repository name. You can use `git remote add origin https://github.com/abc/test_repo.git` to add that repository as a remote for your current repository and give it the name `origin`. You can of course also modify the URL of this remote -- use `set-url`, with usage similar to `add`, except the remote name must already exist.

    If you're not happy with a remote's name, you can use `rename <old-name> <new-name>` to change it; if the remote is no longer needed, or you want to delete it for some other reason, it's also simple -- just use the `remove <remote-name>` subcommand. Fairly straightforward.

- `git clone`

    Beyond adding a remote to an existing repository, we can of course copy one from a remote to our local machine. Using `git clone <repo-url>` downloads a remote repository to local. The cloned repository will by default be placed in a directory under the current folder with the same name as the repository, and the repository name will match the remote's name. Since it's cloned from a remote, it will automatically have the remote location configured (with the default name `origin`). Of course, if you want to download it elsewhere, you can append the target folder path after the repository URL.

    Generally, this command is sufficient. However, sometimes you might encounter repositories that use Git Submodules. We're not covering Git Submodules here, but if you clone a project with submodules without also having the clone pull in the submodules inside it, you'll end up having to redo a bunch of stuff later. To avoid this hassle, just add the `--recursive` flag when cloning, telling Git "also download all the Git submodules inside this repository for me." That saves you the trouble of reconfiguring Git submodules later.

    Also, maybe sometimes you're cloning a repository not to develop in it, but just to use it directly (like some ZSH plugins hosted on GitHub). In that case, you might not care about its commit history, or the repository is huge and you don't need all the past commit history -- you just want the most recent few commits. Git thoughtfully provides the `--depth <number>` flag, letting you specify how many of the most recent commits to clone. This is great for saving clone time and being gentler on disk and network.

- `git push`

    When we've made some local changes and have commits that differ from the remote, we can push our local commits to the remote repository. When we use this command directly, Git defaults to pushing the current branch to the corresponding branch on the remote. The default operation is the most frequent one, which is nice. When we need to push to a specific branch (e.g., when the remote branch name differs from the current branch name), we can write the remote branch name first, then the local branch name: `git push <remote-branch> <local-branch>`. We can also use the `-u` or `--set-upstream` flag to modify the default push branch.

    Maybe our repository has more than one remote, and we need to specify which remote to push to. In that case, the `push` syntax changes a bit: `git push <remote-name> <local-branch>:<remote-branch>`. That is, we first specify which remote to push to, then use a colon to separate the local branch and the remote branch.
    
    This syntax fully specifies all push information, and it also has a hidden feature: if we omit the local branch and just write `git push <remote-name> :<remote-branch>`, it means telling Git "I want to push an empty branch to the remote to overwrite that remote branch," which effectively deletes the remote branch. Of course, deleting a remote branch can also be done with `git push <remote-name> -d <remote-branch>` (or `--delete`), which has clearer semantics, though I suspect it's just a new wrapper around the method above. Maybe we have too many remote branches and we want to clean up remote branches that no longer have local counterparts -- in that case we can use `git push --prune <remote-name>` to delete (prune) those extra branches.

    Besides pushing branches, `push` also covers pushing tags. We can use `git push --tags` to push all tags, or `git push <remote-name> tag <tag-name>` to push a specific tag. As for what a tag is, you can think of it as a persistent snapshot independent of the branch tree, preserving the state of a moment without being strongly attached to any specific branch. Tags are generally applied to releases -- yep, that vX.Y.Z format, that's how tags are usually done. We won't go into too much detail here.

    One final warning. Many tutorials recommend using the `-f` or `--force` flag when `push` runs into trouble. This flag tells Git to skip all checks and forcibly overwrite the remote repository's state with your local state. If you're truly collaborating with others, do not do this. You will be sent to Zeiss.

- `git fetch`

    This command is for getting updates from a remote. By default, it fetches the latest updates for all branches of the default remote. If we want to specify which remote to fetch from, just put the remote's name after it. If we want to fetch updates from all remotes, use `--all` to tell Git. Similar to `git push`, we can also add `-t` or `--tags` after `git fetch` to fetch all tag information from the remote, or use `git fetch --prune` or `git fetch -p` to have Git delete local branches that don't exist on the remote.

    One important thing to note: by design, the `fetch` subcommand does not directly merge remote content with your local content. This means `git fetch` only updates your *local remote database*, not actually place the remote data into your local working directory. If you want that, you need to *merge* the remote branch into your local using `git merge`. To specify a remote branch, use `<remote-name>/<remote-branch>` to tell Git we want the `<remote-branch>` branch on `<remote-name>`.

    If you find this far too cumbersome (and it really is), we can use the following command, which combines `fetch` and `merge`:

- `git pull`

    When we're very clear that we want to directly apply remote changes to the local repository, we can just `git pull` to pull remote updates. Since it involves a "merge" step, its default behavior is to fetch changes from the default remote and then apply the remote changes corresponding to the current branch onto the current branch. In other words, the default behavior is to update the current branch's state from the remote.

    Naturally, we can specify what it updates. Using `git pull <remote-name> <branch>` lets us specify which remote to pull from and which branch to update. A thing to note: in a new repository, when you run `git pull`, Git might not know what method to use to apply remote changes to the local branch, because besides `merge`, you can also use `rebase` to do this. So Git might ask you which method to use. Generally, we just use `fast-forward` -- the simplest and most convenient, and it won't leave your Git commit history full of unrecognizable branches.

That's about it for Git's remote commands. In reality, when developing solo, you'll rarely need such complex commands. Day to day, it's just a simple `git pull` to update, make your changes, then `git push` them up. A new repository might need `remote` to add a remote, but you barely need to manage it after that.

## Things to Watch Out for When Collaborating

However, collaborating with others isn't just about knowing these commands. Just knowing these commands won't make you a legend in the open-source world, and careless operations could very well earn you ridicule... Here are a few quick points~

Also, I haven't actually participated in that many open-source projects. If you find my advice below not authoritative enough, I'm sorry -- I'm just not that skilled yet (). Still, I personally think it's fairly practical / reasonable. Anyway, hope it helps.

### Read the Project's Documentation

Before getting involved in a project, you should first try reading its documentation. If you're interested in a project, I'm sure you've already looked at the README. However, if you want to participate in development, reading the README alone might not be enough. Large projects usually have a so-called Code of Conduct. If there's such a document or something similar, please read it before you start contributing, or else the project's code reviewers might very well reject your PR (Pull Request) outright.

### Check the Issues First

Collaborative development generally starts from an Issue -- after all, with a problem identified, there's a target for development work. The main point of checking Issues is to see what problems the project currently has waiting to be addressed, and also to see if someone is already working on a particular problem. If an issue you're interested in is already being followed up on, it's best to discuss with the person handling it and see if there's anything you can help with. Don't just blindly submit a PR.

### Maybe You Need to Open a Separate Issue

Some projects require that if you want to submit a PR, you should have a corresponding Issue for it, or open an Issue first. This is a good practice that gives every PR a clear purpose. A PR I submitted before was asked to open an Issue and in the PR specify which Issue it was meant to address. The bad news is my PR apparently didn't pass the automated checks... even though it was such a simple PR...

### Wait, What Is a PR, Anyway?

Maybe you've been wanting to ask this question for a while. Me too. I often hear people saying things like "PRs welcome," "submit a PR," "merge a PR," but I was never clear on what it actually meant. I deliberately held back this detail until now to explain it, so you'd know just how many jargon-spewing riddle-talkers there are in this field ~~(jk, please don't beat me up wuwuwu)~~.

PR stands for Pull Request. Huh? Pull Request? What am I requesting to be pulled? Pull? At first I also couldn't wrap my head around what kind of pull I was requesting. Later, with the mighty help of AI and some other resources, I finally understood: a Pull Request is asking others to review the code you've submitted and then merge it into the project. So-called "submitting a PR" is just initiating a merge request.

So if a PR is a merge request, why isn't it called *Merge Request*? Exactly right -- GitLab does exactly that. On GitLab, you don't submit a *PR*; you submit an *MR*. The two terms refer to the same operation. So where does the P in PR come from? According to some sources, the "Pull" in PR means you want others to *pull* your changes into their copy. It's like saying: I've built this really awesome feature for the project, but it's only on my own computer right now. I want others to also be able to use this feature I wrote, so I'll write up some description explaining what my changes do, why they're awesome, and why I recommend everyone pull this set of changes into their copy. In comparison, *Merge Request* is much more straightforward: I've made some changes, now please merge these changes into your branch.

Tone-wise, PR is clearly more polite. After learning this etymology, my first reaction was: PR wants to convey, if you think my changes are great, you can pull my version into yours. If you think my changes aren't good, just don't pull. MR, by comparison, feels slightly more forceful: can you merge my changes into yours? Maybe I'm being overly sensitive. Anyway, after learning the origin of the term PR, I actually like the name more, and MR feels a bit odd in contrast, haha.

But you should also understand by now that when submitting a PR, you should include some explanation of the changes you want to submit -- like a brief summary of what you changed, why you changed it, what happens after the change, etc. If you just bare-bones ask for the code to be merged in, the code reviewer probably won't bother to scrutinize what your code actually does and will choose to ignore your submission.

### Why Not Just Push Changes Directly Into the Repository?

Generally speaking, repositories are owned by someone. Even if it's a public repository, not everyone is allowed to push code directly into it. Usually, only direct maintainers have the right to change the repository's content. If an outsider wants to modify the repository's content, it's almost always done through a PR, handing the code changes to a reviewer who decides whether to merge them into the repository. Of course, if you're the repository owner or have edit permissions, you might be allowed to commit code directly. However, if you're collaborating with several people, it's still better to go through a PR process, since PRs provide a place for discussion and exchange. Directly committing code doesn't necessarily mean that commit is the most appropriate one.

### Focus on Communication and Collaboration -- Watch Your Tone

It's clear that collaborating on GitHub inevitably involves communicating and interacting with others. As an international platform, it's generally recommended to communicate in English -- unless it's a clearly all-Chinese project / China-specific project / project with no foreigners using it, like certain domestic specialties (Great Firewall bypass tools), where English is practically unnecessary. If your English isn't great, hmm, I'd say translation software is really good these days, and you're not limited to translating English into Chinese -- you can also translate Chinese into English.

Also, be mindful of basic courtesy (). No one likes collaborating with someone rude, generally speaking. That said, sometimes it's not even about being impolite -- it might just be pure matter-of-factness. I recall reading in *Confessions of a Hacker* that many people simply can't be bothered with pleasantries and prefer to just address the problem directly and solve it. My advice on this is to use your own judgment. I personally take the "you can never be too polite" stance, but if someone doesn't like that approach, I don't mind either, as long as nobody starts cursing at each other.

### Don't Flood Issues With Off-Topic Chatter

Pretty obvious. GitHub Issues is meant as a platform for discussing problems; it's not the place for idle chat or going off-topic. Though in some repositories, this doesn't seem to matter much? After all, by the time people realize they've gone off-topic, it's usually not the moment they first started going off-topic.

That's all I can think of for now. If you have anything else you think could be added, feel free to tell me. I'll add it in! Really!

## Afterword

Honestly, I felt a bit creatively drained writing this one. Because I'm also learning Git myself, and part of the reason for writing these is to review and solidify / opportunistically learn Git commands. So if there are any oversights in the content, I hope you'll forgive me.

Some might ask: now that there are so many GUI clients for Git, why bother learning Git's command-line operations? You're absolutely right: Git now has many GUIs, and it even comes with one built in. Still, I feel the command line is closest to how Git was meant to be used when it was first designed. Additionally, thanks to Git's very comprehensive command-line interactivity, sometimes we can write a simple script to automate some Git tasks. And those, GUIs can't do for us. But it's undeniable that GUIs are truly nice. At the very least, Git's branch state on the command line is still not intuitive enough -- that has to be admitted. With GUI Git tools, their branch diagrams are generally drawn beautifully. Not gonna lie, sometimes I also just use VS Code's Git integration to make commits. Because it's convenient, hahaha.

Others ask: there are already plenty of good VCS (Version Control Systems) beyond just Git -- why not introduce newer tools instead of this old-fashioned, even somewhat creaky, not-very-user-friendly Git? My answer is: first, it's not that bad; second, it may have already become a de facto standard; third, it's genuinely really good to use. Plus, almost all VCS tools provide functionality for converting Git repositories into their own formats, which further demonstrates Git's important position in the VCS field. If you know how to use Git, I'm confident other VCS systems won't stump you either. Of course, I'm also very willing to try other tools, like the recently buzzy Jujutsu, written in Rust. But that's a story for another day. (Git is really great, though.)

I only realized near the end of writing this piece that I hadn't yet covered how to view Git's commit history. It felt a bit awkward to put it in this section, since this one is mainly about collaborating with others, and the history-viewing feature doesn't quite fit here. After thinking it over, I put it in the previous section, since it's closely related to branches. If you read the previous section and didn't get the update to that section, I suggest you go back and check ().

Additionally, this series truly couldn't have been done without certain tools, like `tldr` (the package name is `tealdeer`, though other versions are also great), and AI tools like ChatGPT and DeepSeek. Of course, Git's own documentation is also very good. On Linux you can directly `man git` to see the general introduction, and use `man git-add` and similar to read the usage of each Git subcommand (`add` here). On Windows, since there's no `man`, you can use `git help git-add`, or more simply `git add --help` to view the Git documentation that ships with the Git installation. And Git also has its own "official textbook": [*ProGit*](https://git-scm.com/book/id/v2), available in multiple languages. As a tutorial, it's naturally much easier to follow than Git's own docs. Though Git's docs are also quite well-written.

Finally, thank you so much for reading this far. If you've read all three installments, I'm even more deeply grateful. If these words have been of any help to you, that would be wonderful; if they didn't help much, I hope they at least gave you a chuckle. Oh come on, at least smile a bit, so this series doesn't seem entirely worthless. ~~(That [article about the Snake Lemma](/content/posts/Math_Note/Snake_Lemma/index.md) I wrote before also said I hoped to bring a smile to readers, only to find that barely anyone read it, damn it... let alone getting anyone to laugh. Sigh, such a failure.)~~

So, as always, wishing you peace of mind and body, smooth work, and fewer bugs~!
