import React, { useState, useEffect } from "react";
import axios from "axios";

const EditBoard = () => {
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const [IP, setIP] = useState("");
  const [options, setOptions] = useState("");
  const [subject, setSubject] = useState("");
  
  const boardId = window.location.pathname.replace('/edit/', '');

  useEffect(() => {
    axios.get('http://localhost:5000/boards/' + boardId)
      .then(response => {
        setUsername(response.data.username);
        setText(response.data.text);
        setSubject(response.data.subject);
        setOptions(response.data.options);
      })
      .catch(function (err) { console.log(err); })
  }, [boardId]);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  }

  const onChangeText = (e) => {
    setText(e.target.value);
  }

  const onChangeOptions = (e) => {
    setOptions(e.target.value);
  }

  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const board = {
      username: username,
      text: text,
      IP: IP,
      options: options,
      subject: subject
    }

    console.log(board);

    axios.post('http://localhost:5000/boards/update/' + boardId, board)
      .then(res => console.log(res.data));
    window.location = '/';
  }

  return (
    <div>
      <h3>Edit Board</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <label className="text-info p-2">{username}</label>
        </div>
        <div className="form-group">
          <label>Subject: </label>
          <input type="text"
            required
            className="form-control"
            value={subject}
            onChange={onChangeSubject} />
        </div>
        <div className="form-group">
          <label>Options: </label>
          <input type="text"
            required
            className="form-control"
            value={options}
            onChange={onChangeOptions} />
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input type="text"
            required
            className="form-control"
            value={text}
            onChange={onChangeText} />
        </div>
        <div className="form-group">
          <input type="submit" value="Edit Board" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default EditBoard;
