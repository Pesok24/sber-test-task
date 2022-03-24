import { memo } from "react";
import Dictionary from "./components/dictionary/Dictionary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./components/login/Login";
import MainPage from "./components/mainPage/MainPage";
import About from "./components/about/About";

const App = memo(() => {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<MainPage />} />
              <Route path="dictionary" element={<Dictionary />} />
              <Route path="login" element={<Login />} />
              <Route path="about" element={<About />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
});

export default App;
