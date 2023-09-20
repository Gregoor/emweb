import { Embed } from "./Embed";

function App() {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1>Embeds</h1>
      {location.hostname == "localhost" && (
        <Embed url="http://localhost:3000/id/36xwsshad2hncw76hsadvj0r9jff0a8" />
      )}
      <Embed url="https://powl.vercel.app/id/39k80qwag97grwvk4se5h2799jgy8s0" />
      <Embed url="https://soundcloud.com/frida-darko/frida-darko-saga-bucht-2023" />
    </div>
  );
}

export default App;
