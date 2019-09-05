import React from "react";
import "./App.scss";
import Deck from "./components/Deck";

const App: React.FC = () => {
   return (
      <div className="App">
         <Deck title="React TS Example" />
      </div>
   );
};

export default App;
