import { memo } from "react";
import Dictionary from "./components/dictionary/Dictionary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./components/login/Login";

const App = memo(() => {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="dir" element={<Dictionary />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
});

export default App;
