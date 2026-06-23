---
categories:
- Others
tags:
- Build Blog
- Experience
title: "First Blog: Building This Site"
description: The experience of building my first blog
image: Reimu.png
date: 2024-11-01
links:
  - title: Hugo Theme Stack
    description: The theme used to build this blog — really like it
    website: https://github.com/CaiJimmy/hugo-theme-stack
  - title: Jimmy Cai
    description: Full time Computer Science student, part time developer.
    website: https://jimmycai.com/
---

A simple record of my blog-building journey.
<!--more-->

## Begin: I Really Want a Blog

While surfing the web at high intensity, I noticed that many people have their own blogs. After reading several blog posts in particular, my admiration for these blog-owning wizards grew ever more intense, and I too wanted to build a little nook of my own online — a place to record my learning and life (so as to mentally join the ranks of said wizards). And so, after much dithering and deliberation, I decided to give Hexo + GitHub Pages a try.

## Try: First Attempt at Hexo

Actually, I'd already tried building a blog around October. But online tutorials were a tangled mess, the Hexo docs seemed to not have been updated in ages, and after writing the About page I sank into an endless cycle of customization attempts and failure, with no progress to show for it. At one point I found a theme I really liked, only to rage-delete everything in a fit of fury over the excessive character spacing caused by mixed Chinese-English typesetting. The result: the blog-building plan got pushed back again and again. (In truth, I still hadn't found a theme that truly clicked. :P)

Still, October's failed attempt wasn't a total loss — it gave me a bit of knowledge about YAML and TOML, and (perhaps) taught me how to search for tutorials more efficiently. Not a complete waste.

## Again: Hexo, Round Two

Before I knew it, it was late October — yesterday, to be precise, October 31. On a sudden whim, I charged at Hexo once more. But what stopped me wasn't just the lack of a good-looking theme (this time I was going by GitHub stars — maybe my taste is just too niche?), but also infuriating network issues. One moment `npm` couldn't fetch packages, the next `git` couldn't connect to the repo. Later I found online that my proxy setup was wrong — I needed global mode — and switching `npm` to the [Taobao mirror] (https://npmmirror.com/) would fix things easily. But the relentless cascade of errors had already drained my patience.

Right? Do I really need a blog? That evening my senior lab mate suggested: why not consider a WeChat public account?

## ?: Enough — Let's Hugo

Still didn't want a public account. It felt too... public. Sure, it has blog-like features, but who's going to make up for the lack of theme customization?! It was then that I recalled another framework I'd stumbled upon the night before while surfing: [*Hugo*](https://gohugo.io/). I made a snap decision and rushed to GitHub to browse themes, eventually falling for [**Stack**](https://github.com/CaiJimmy/hugo-theme-stack). Its minimalist interface was exactly my taste, while also satisfying my layout requirements (weird, I know). Most importantly, the theme's template directory structure was crystal clear! I fumbled around adding a few icons and ended up with a result I'm genuinely happy with. Thank you, [Jimmy Cai](https://jimmycai.com/)!

## End: Hooray

Building my first blog — I feel like I stepped into my fair share of pitfalls. Though most of them stemmed from unfamiliarity with frontend. Ah, if only I were a CS/software engineering/frontend/XXX student... too bad, can't change that now. Then again, stumbling through pitfalls is its own kind of learning process. Maybe I'll add some new toys to the blog later, make it fancier~

One more thing that sent chills down my spine: while deploying, I stupidly deleted all my own changes on GitHub, and nearly thought everything was lost for good... Thankfully, GitHub Desktop discards stashed changes to the Recycle Bin, so I was able to recover all those config files. Git operations demand caution, folks.

Someone might ask why I spent so much time agonizing over themes, saying that content is what really matters for a blog. I completely agree that content is king, but writing on a theme I'm not satisfied with just doesn't feel right. I'm a believer in *"a craftsman must first sharpen his tools."* Since this is my first blog, the cost of experimenting with themes is practically zero (no migration to worry about) — so why not try different themes and get everything perfect from the start?

So, that's it. Thanks for reading~!