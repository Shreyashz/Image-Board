import {Routes, Route} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/nvabar.component.js"; 
import ThreadList from "./components/thread-list.component.js";
import EditBoard from "./components/edit-board.component.js";
import CreateThread from "./components/create-thread.component.js";
import CreateUser from "./components/create-user.component.js";
import BoardList from "./components/board-list.component.js"
import AddBoard from "./components/create-board.component.js";

function App() {
  return (
    <div className="container">
      <Navbar />
      <br />
      <Routes>
        <Route path="/" exact Component= {ThreadList} />
        <Route path="/edit/:id" Component = {EditBoard} />
        <Route path="/addBoard" Component = {AddBoard} />
        <Route path="/create" exact Component = {CreateThread} />
        <Route path="/user" exact Component = {CreateUser} />
        <Route path="/thread/:topic" exact Component={BoardList} />
      </Routes>
    </div>
  );
}

export default App;
