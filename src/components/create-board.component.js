import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation } from 'react-router';

const CreateBoard = () => {
    const [username, setUsername] = useState('');
    const [ImageLink, setImageLink] = useState('');
    const [text, setText] = useState('');
    const [date, setDate] = useState(new Date());
    const [options, setOptions] = useState('');
    const [subject, setSubject] = useState('');
    const [users, setUsers] = useState([]);
    const location = useLocation();
    const locl =new URLSearchParams(location);
    console.log(locl.get('prev'));
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

    const onChangeImageLink = (e) => {
        setImageLink(e.target.value);
    }

    const onChangeText = (e) => {
        setText(e.target.value);
    }

    const onChangeDate = (date) => {
        setDate(date);
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
            ImageLink: ImageLink,
            text: text,
            date: date,
            Ip: '',
            options: options,
            subject: subject
        }

        console.log(board);

        axios.post('http://localhost:5000/boards/add', board)
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
                        className="form-control"
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
                    <label>ImageLink: </label>
                    <input type="url"
                        required
                        className="form-control"
                        value={ImageLink}
                        onChange={onChangeImageLink} />
                </div>
                <div className="form-group">
                    <label>Text: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={text}
                        onChange={onChangeText} />
                </div>
                <div className="form-group">
                    <label>options: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={options}
                        onChange={onChangeOptions} />
                </div>
                <div className="form-group">
                    <label>subject: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={subject}
                        onChange={onChangeSubject} />
                </div>
                <div className="form-group">
                    <label>
                        Date:
                    </label>
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
