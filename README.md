# intl-hmessage

A Javascript international Tools

## Install

> npm install intl-hmessage  
> or  
> yarn add intl-hmeesage

## LICENSE

MIT

## Usage

The hmessage is base on <a href="https://formatjs.io/docs/intl-messageformat/" >intl-messageformat</a>

**Normal:**

```javascript
import { Lang, Message, DefaultPlugin } from "intl-hmessage";

Lang.use(DefaultPlugin);

const lang = new Lang("en");

const intl = new Message(
  {
    metas: {
      en: {
        t1: "test",
      },
      zh: {
        t1: "测试",
      },
    },
  },
  lang
);

console.log(intl.get("t1"));
// when your browser language is en: test.
```

**getHtml:**  
If you using react or preact, you can use getHtml to genernate v-node.

```javascript
import { Lang, Message, DefaultPlugin } from "intl-hmessage";

Lang.use(DefaultPlugin);

const lang = new Lang("en");

const intl = new Message(
  {
    metas: {
      en: {
        t1: "<p>test</p>",
      },
      zh: {
        t1: "<p>测试</p>",
      },
    },
  },
  lang,
  React.createElement // pass it!!!
);

function App() {
  return <>{intl.getHtml("t1")}</>;
}
// it displays test in html with p tag;
```

**Note: you can use the lib with <a href="https://github.com/MNISHoward/style-i18n-loader" >style-i18n-loader</a>**
