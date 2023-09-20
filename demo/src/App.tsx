import useLocalStorageState from "use-local-storage-state";

import { Embed } from "./Embed";

function App() {
  const [customURL, setCustomURL] = useLocalStorageState("customURL", {
    defaultValue: "",
  });
  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1>OEmbed</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Embed url="https://powl.vercel.app/id/39k80qwag97grwvk4se5h2799jgy8s0" />
        <Embed url="https://soundcloud.com/frida-darko/frida-darko-saga-bucht-2023" />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <h2>Try your own</h2>
          <Embed
            url={customURL}
            inputProps={{
              value: customURL,
              onChange: (e) => setCustomURL(e.target.value),
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
