# emweb

[Demo](https://emweb.vercel.app/) | [Blog Post](https://dflate.io/emweb)

## Host

For embedding other pages you can either use the the vanilla library or the
React component.

In either case you should polyfill URLPattern (e.g. by using
[urlpattern-polyfill](https://github.com/kenchris/urlpattern-polyfill)), since
[browser compatibility is not great atm](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern#browser_compatibility).

### Vanilla

#### Installation

```sh
npm install @emweb/host
```

#### Usage

```ts
import { fetchFrameSrc, onWindowMessage } from "@emweb/host";

// put the URL you want to embed here
const url = "https://shd.is/s/b8agf9";

const src = fetchFrameSrc(url);
// src can now be used as the src attribute of an iframe

// You can use the onWindowMessage function to listen to messages from the embedded page's iframe
onWindowMessage(url, {
  onResize: (width, height) => {
    console.log("iframe size", width, height);
  },
});
```

### React

The React version falls back to [oembed](https://oembed.com/) if there is no
emweb manifest for the given URL.

#### Installation

```sh
npm install @emweb/react
```

#### Usage

```tsx
import { Embed } from "@emweb/react";

// this already handles resizing
<Embed url="https://shd.is/s/b8agf9" />;
```

## Guest

The only requirement is a [manifest](/packages/schemas/emweb.schema.json)
hosted at `/.well-known/emweb.json` that points towards URLs that have
permissive CORS headers set.

If you want to give the host page the ability to resize, depending on your
page's content size, you can use the `@emweb/bus` library.

### Installation

```sh
npm install @emweb/bus
```

### Usage

```ts
import { postResizeChanges } from "@emweb/bus";

const cleanup = postResizeChanges();
// call cleanup() to stop sending resize messages

// this makes it straightforward to register e.g. within a React component
useEffect(postResizeChanges, []);
```
