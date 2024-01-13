import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Blogs from "./components/Blogs";
import MyBlogs from "./components/MyBlogs";
function App() {
  return (
    <div className="main bg-success vw-100" style={{ overflow: "hidden" }}>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossorigin="anonymous"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/blogs/:name" element={<Blogs />}></Route>
          <Route path="/myblogs/:name" element={<MyBlogs />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
