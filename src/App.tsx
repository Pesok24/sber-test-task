import { memo } from "react";
import Dictionary from "./components/Dictionary/Dictionary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = memo(() => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/dir" element={<Dictionary />}>
          </Route>
        </Routes>
      </Router>
    </>
  );
});

export default App;
