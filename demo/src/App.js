import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

import { Embed } from "./Embed";

function App() {
  return _jsxs("div", {
    style: { maxWidth: 600, margin: "0 auto" },
    children: [
      _jsx("h1", { children: "Embeds" }),
      _jsx(Embed, {
        url: "https://powl.vercel.app/id/39k80qwag97grwvk4se5h2799jgy8s0",
      }),
      _jsx(Embed, {
        url: "https://soundcloud.com/frida-darko/frida-darko-saga-bucht-2023",
      }),
    ],
  });
}
export default App;
