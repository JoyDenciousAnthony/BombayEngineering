import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHome from "./Page/Home/AppHome";
import AppAdmin from "./Page/Admin/AppAdmin";
import AppUser from "./Page/User/AppUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppHome></AppHome>} />
        <Route path="/admin" element={<AppAdmin ></AppAdmin>} />
        <Route path="/user" element={<AppUser></AppUser>} />
      </Routes>
    </Router>
  );
}

export default App;
