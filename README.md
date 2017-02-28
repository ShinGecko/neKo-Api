# neKo [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

[neKo](https://github.com/Shenrak/neKo) is an innovative chat created by two students from France.
It has been designed to offer several brand new user-friendly features.

## Installing
 
Make sure you have [Node](https://nodejs.org/en/) installed for the API.
You can then clone the repository with `git`:
```bash
git clone https://github.com/Shenrak/neKo
```

## Building
 
 * `cd` into the neKoApi folder
 * Run `npm install` to install the dependencies
 * Run `npm start` to start neKo

## Contributing

Feel free to explore the code, create issues and/or **contribute** to the code!
A more detailed guide on this will come later.

Right now, the workflow is based mainly on [`xo`](https://github.com/sindresorhus/xo), with some
adjustments. Each time you'll try to push, it will check the coding style. To resume the so called coding style:
- two-space indentation
- no ending semi-colons ([it's fine, guys](http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding))
- one space after each keyword (`if (..)`, `while (..)`, `for (..)`...)
- one space before each opening brace (eg. `if (foo === bar) {..}`)
- one space after the `function` keyword, but not between the function _name_ and the `()`
- and a lot more (but maybe less opiniated)....

But to get proper linting information inside your text editor, you can use on of the following [plugins](https://github.com/sindresorhus/xo#editor-plugins)

> Side note: if you're using vim (like me), juste use [ale](https://github.com/w0rp/ale), it's way better than syntastic.

You can also install [editorconfig](http://editorconfig.org) to allow your editor of choice respect the coding style (on some particuliar aspects).
