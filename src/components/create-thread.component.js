import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateBoard = () => {
    const [username, setUsername] = useState('');
    const [topic, setTopic] = useState('');
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    setUsers(response.data.map(user => user.username));
                    setUsername(response.data[0].username);
                }
            });
    }, []);

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onChangeDate = (date) => {
        setDate(date);
    }

    const onChangeTopic = (e) => {
        setTopic(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const thread = {
            username: username,
            topic: topic,
        }

        console.log(thread);

        axios.post('http://localhost:5000/threads/add', thread)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    return (
        <div>
            <h3>Create New board</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select
                        required
                        className="form-Control"
                        value={username}
                        onChange={onChangeUsername}>
                        {
                            users.map(function (user) {
                                return (
                                    <option
                                        key={user}
                                        value={user}>
                                        {user}
                                    </option>
                                );
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>topic: </label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        value={topic}
                        onChange={onChangeTopic} />
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <div>
                        <DatePicker
                            selected={date}
                            onChange={onChangeDate} />
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Create a board" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}

export default CreateBoard;
