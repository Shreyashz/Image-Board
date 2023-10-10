import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Board = (props) => (
  <tr>
    <td>{props.board.username}</td>
    <td>{props.board.text}</td>
    <td>{props.board.options}</td>
    <td>{props.board.Date}</td>
    <td>
      <Link to={"/edit/" + props.board._id}>edit</Link> |{" "}
      <a href="#" onClick={() => props.deleteThread(props.board._id)}>
        delete
      </a>
    </td>
  </tr>
);

const BoardList = () => {
  const [boards, setBoards] = useState([]);

  const deleteBoard = (id) => {
    axios.delete("http://localhost:5000/boards/" + id).then((res) => console.log(res));
    setBoards(boards.filter((el) => el._id !== id));
  };

  useEffect(() => {
    const topic = window.location.pathname.replace("/thread/", "");
    axios
      .get("http://localhost:5000/boards/topic/" + topic)
      .then((response) => {
        setBoards(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderBoardList = () => {
    return boards.map((currboard) => {
      return <Board board={currboard} deleteThread={deleteBoard} key={currboard._id} />;
    });
  };

  return (
    <div>
      <h3>Boards</h3>
      <table className="table">
        <thead className="thread-light">
          <tr>
            <th>By</th>
            <th>text</th>
            <th>Options</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>{renderBoardList()}</tbody>
      </table>
    </div>
  );
};

export default BoardList;
