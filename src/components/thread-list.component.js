import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Thread = (props) => (
  <tr>
    <td>{props.thread.username}</td>
    <td>
      <Link to={"/thread/" + props.thread.topic}>{props.thread.topic}</Link>
    </td>
    <td>
      <Link to={"/edit/" + props.thread._id}>edit</Link> |
      <a href="#" onClick={() => props.deleteThread(props.thread._id)}>delete</a>
    </td>
  </tr>
);

const ThreadList = () => {
  const [threads, setThreads] = useState([]);

  const deleteThread = (id) => {
    axios.delete('http://localhost:5000/threads/' + id)
      .then(res => console.log(res));
    setThreads(threads.filter(el => el._id !== id));
  };

  useEffect(() => {
    axios.get("http://localhost:5000/threads/")
      .then(response => {
        setThreads(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const renderThreadList = () => {
    return threads.map(currThread => {
      return <Thread thread={currThread} deleteThread={deleteThread} key={currThread._id} />;
    });
  };

  return (
    <div>
      <h3>Threads</h3>
      <table className="table">
        <thead className="thread-light">
          <tr>
            <th>Started By</th>
            <th>text</th>
          </tr>
        </thead>
        <tbody>
          {renderThreadList()}
        </tbody>
      </table>
    </div>
  );
};

export default ThreadList;
