import { memo } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Card from "./components/Card";
import PlayDeck from "./components/PlayDeck";

const App = memo(() => {
  return (
    <>
      <PlayDeck />
    </>
  );
});

export default App;
