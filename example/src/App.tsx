import React, { useEffect } from "react";
import Donkeyclip from "@donkeyclip/react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Donkeyclip
        id="dJu4vjemNTBVxhcikxHP9X"
        mcversion="7.9.2"
        controls
        pointerevents
        initParams={{
          color: "green",
        }}
      />
    </div>
  );
}

export default App;
