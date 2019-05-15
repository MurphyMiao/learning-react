## react入门-概述和演练教程（翻译）

[原文地址](https://www.taniarascia.com/getting-started-with-react/) ： https://www.taniarascia.com/getting-started-with-react/

在我刚开始学习JavaScript时，我就已经听过react，但是我不得不承认我只看了一眼就被吓住了。我看到一堆HTML标签中混合着JavaScript，然后很疑惑，难道我们不是应该尽量避免这么写吗？react有什么大不了的？

所以，我专注于学习vanilla JavaScript，并在更专业的环境中使用jQuery。经过几次沮丧和失败的使用react后，我终于开始学习react，我开始意识到为什么我更需要react而不是vanilla JS和jQuery。

我努力将我学到的所有内容压缩成一个不错的介绍分享给你们，就是接下来的内容。

### **预备知识**

在玩耍react之前，有一些事情你必须有所了解。如果你之前从未使用过js或者DOM，例如，我在使用react之前，已经熟悉了以下知识。

以下是我认为学习react之前所需要掌握的

- HTML和CSS的基础知识
- JavaScript和变成的基础知识
- 对DOM有一定的理解
- 熟悉ES6的语法和功能
- 全局安装了npm和Node.js

### **目标**

- 了解基本的react组成和相关术语，例如Babel，Webpack，JSX，组件，props，state，和生命周期
- 创建一个简单的react应用，演示以上概念

以下是最终结果源码和demo

- [View Sourve on Github](https://github.com/taniarascia/react-tutorial)
- [View Demo](https://taniarascia.github.io/react-tutorial/)

### **react是什么？**

- react是一个js库——最受欢迎的库之一，在github上有100000+star
- react不是一个框架（不像Angular，Angular更死板）
- react是Facebook的一个开源项目
- react在前端被用来创建用户界面（UI）
- react是MVC应用程序的view层（Model View Controller）

react最重要的一个方面之一就是你可以创建定制化和可复用HTML元素的组件，这样就可以快速有效的创建用户界面。react还使用state和props来简化了数据的存储和使用。

我们将在整篇文章中全面了解这些，让我们开始吧。

### **设置和安装**

有几种方法可以安装react，我会告诉你两种，这样你就可以很好的了解它是如何工作的。

### **静态HTML文件引入**

这种方法并不受欢迎，我们也不会在教程之外的地方使用，但是如果你使用过jQuery这种库的话，这个方法可以用熟悉的方式使你快速理解，如果你对Webpack、Babel、node.js不熟悉，这也是也是最不会使人感到恐惧的入门方式。

让我们创建一个基本的index.html文件。我们将会在head中加载三个CDN—— React, React DOM, and Babel。接下来添加一个id为root的div，最后创建一个script标签来存放你自定义的js代码。

*index.html*
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />

    <title>Hello React!</title>

    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
  </head>

  <body>
    <div id="root"></div>

    <script type="text/babel">
      // React code will go here
    </script>
  </body>
</html>
```

我加载了在写文章时最新的稳定版本。

- [React](https://reactjs.org/docs/react-api.html) —— react顶层API
- [React DOM](https://reactjs.org/docs/react-dom.html) —— 添加DOM方法
- [Babel](https://babeljs.io/) —— 一个能让ES6+运行在旧浏览器的js编译器

app的入口是id名为root的div元素，root为命名惯例。注意底部的script标签类型为text/babel，这是因为使用Babel必须这样规定。

现在，让我们写第一个react代码块。我们将会使用ES6的class创建一个名为App的react组件。

```js
class App extends React.Component {
  //...
}
```

现在，我们添加一个render方法，这个方法是class组件中唯一一个必须创建的，它用来渲染DOM节点。

```js
class App extends React.Component {
  render() {
      return (
          //...
      );
  }
}
```

在return中，我们加入一个很简单HTML元素。注意，我们并不是用的字符串，所以不要用引号包裹元素。这种语法叫做JSX，我们接下来将会学到更多相关内容。

```js
class App extends React.Component {
  render() {
    return <h1>Hello world!</h1>
  }
}
```

最后，我们用React DOM的render()方法来渲染App类（我们刚刚创建在HTML中id为root的div中）。

```js
ReactDOM.render(<App />, document.getElementById('root'))
```

下面是完整的index.html代码

*index.html*

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />

    <title>Hello React!</title>

    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
  </head>

  <body>
    <div id="root"></div>

    <script type="text/babel">
      class App extends React.Component {
        render() {
          return <h1>Hello world!</h1>
        }
      }

      ReactDOM.render(<App />, document.getElementById('root'))
    </script>
  </body>
</html>
```

在你的浏览器中打开index.html，你可以看到我们在DOM中已经将h1标签渲染好了。

![demo](re.png)

很好！我们要已经完成了这个任务，你可以看到这样入门就显得react没有特别吓人。这只是一些可以引入HTML中的js帮助库。

我们已经完成了演示的目标，但从现在开始，我们开始用另一种方法：创建React App。

## **创建React App**

刚刚在静态HTML文件中引入库和动态渲染React和Babel的方法效率不高，而且难以维护。

幸运的是，Facebook已经创建了[Creat React App](https://github.com/facebook/create-react-app)，一个已经预先配置好创建一个react app所需要的所有东西的环境。它使用Webpack来自动编译React、JSX、ES6、预编译css文件，使用ESLint来测试和提醒代码中的错误，它将创建一个能实时开发的服务。

在你想要创建项目的目录下，在终端中运行以下代码来安装creat-react-app。确定你的node版本等于或高于5.2。

```
npx create-react-app react-tutorial
```

完成安装后，打开最新创建的文件目录，开始创建新项目。

```
cd react-tutorial
npm start
```

运行完以上命令行之后，一个新的浏览器页面会弹出来，地址为localhostL:3000，这就是已经创建好的react app。

![creat-react-app](tutorial.png)

如果你查看目录结构，你可以看到/public和/src文件夹，已经常规的node_modules，.gitignore，README.md和package.json。

在/public目录下，最重要的文件是index.html，它和我们之前创建的静态index.html非常相似——只有一个id为root的div元素。这次，没有任何库和脚本被加载。在/src目录下，包含了我们所有的react代码。

在/src/App.js中，找到下面一行代码，查看这个环境是怎样自动编译和更新你的react代码：

```html
Edit <code>src/App.js</code> and save to reload
```

用新的文字替换这句话，保存以重新加载。一旦你保存了文件，你会发现localhost:3000编译更新了新的数据。

往下走，删除/src目录下的所有文件，然后我们创建属于自己的没有任何干扰的样板文件。我们只创建index.js和index.css文件。

在index.css中，我只是粘贴复制了[Primitive CSS](https://taniarascia.github.io/primitive/css/main.css)。如果你想，还可以使用任Bootstrap或其他你喜欢的CSS框架，也可以什么也不写。我只是这个CSS更有效。

现在在index.js中，我们导入React，ReactDOM和CSS文件。

```js
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
```

让我们再次创建App组件。之前，我们只创建了一个h1标签，现在增加了一个有class的div标签。你将会注意到我们使用了 className 而不是 class。这是我们第一个表明写在这的是JavaScript而不是HTML的暗示。

```js
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello, React!</h1>
      </div>
    )
  }
}
```
最后，像之前一样，我们将渲染App到root上。

```js
ReactDOM.render(<App />, document.getElementById('root'))
```

下面是完整的index.js。这次，我们将 Component  作为React的一个属性加载，所以我们不再需要extend React.Component。

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello, React!</h1>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
```

如果现在去查看localhost:3000，你会看到”Hello React!“。我们已经开始使用React App了。

### **React开发工具**

有一个名为React Developer Tools能让你在开发React时更轻松。下载[React DevTools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi),或者其它你喜欢的浏览器的扩展程序。

在安装之后，当你打开开发工具时，你会发现一个react标签。点击它，你就可以以当初书写的格式检查组件。你也可以到Elements标签下去查看实际输出的DOM。现在也许不会用到这个功能，但是当你的app变得更复杂时，这个开发工具将会越来越有必要使用。

![react devTools](react-devTools.png)

现在我们拥有了实际开始开发React所需的所有工具和设置。

### **JSX: JavaScript + XML**