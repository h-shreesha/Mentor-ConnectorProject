import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function MentorChat() {

    const [requestList, setRequestList] = useState([]);

    // store person b details
    const [chatId, setChatId] = useState("");
    const [chatName, setChatName] = useState("");
    const [chatEmail, setChatEmail] = useState("");
    const [chatPhone, setChatPhone] = useState("");

    const [chatList, setChatList] = useState([]);

    const [chatMessage, setChatMessage] = useState("");

    const getMyRequets = () => {
        Axios.post("http://127.0.0.1:3001/getmenteelist", {
            mentor: sessionStorage.getItem("ID"),
        }).then((response) => {
            setRequestList(response.data);
            setChatId(response.data[0].mentee_info._id);
            setChatName(response.data[0].mentee_info.name);
            setChatEmail(response.data[0].mentee_info.email);
            setChatPhone(response.data[0].mentee_info.phone);
        });
    }

    const getRequestedChat = (id, phone) => {
        Axios.post("http://127.0.0.1:3001/getchats", {
            from_user: sessionStorage.getItem("ID") + sessionStorage.getItem("PHONE"),
            to_user: id + phone
        }).then((response) => {
            setChatList(response.data)
        });
    }

    const sendChat = () => {
        Axios.post("http://127.0.0.1:3001/sendchat", {
            from_user: sessionStorage.getItem("ID") + sessionStorage.getItem("PHONE"),
            to_user: chatId + chatPhone,
            chat: chatMessage
        }).then((response) => {
            setChatMessage("");
            console.log("success");
        });
    }

    useEffect(() => {
        getMyRequets();
    }, []);

    useEffect(() => {
        getRequestedChat(chatId, chatPhone);
    }, [chatList]);

    const getChat = (id, name, email, phone) => {
        setChatName(name);
        setChatEmail(email);
        setChatPhone(phone);
        setChatId(id);
        getRequestedChat(id, phone);
    }

    return (
        <div className="row m-3">
            <div className="col-6 p-4">
                <h3 className="my-5">Recent Chats</h3>
                <div className="row mb-5">
                    {
                        requestList.map((data, key) => {
                            return (
                                <div className="col-12 mb-3" onClick={() => getChat(data.mentee_info._id, data.mentee_info.name, data.mentee_info.email, data.mentee_info.phone)}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="mb-1 p-0"><b>{data.mentee_info.name}</b></h5>
                                            <p className="m-0 p-0">{data.mentee_info.email}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div className="col-6">
                <div className="card">
                    <div className="card-body">
                        <div className="card border-primary">
                            <div className="card-body">
                                <h5 className="text-primary mb-1 p-0"><b>{chatName}</b></h5>
                                <p className="text-muted m-0 p-0">{chatEmail}</p>
                            </div>
                        </div>
                        <div className="row main-container my-4" style={{ 'height': '60vh', 'display': 'block' }}>
                            {
                                chatList.map((data, key) => {
                                    return (

                                        data.from_user === sessionStorage.getItem("ID") + sessionStorage.getItem("PHONE") ? <div className="col-12 d-flex justify-content-end">
                                            <div className="card w-75 bg-dark text-light mb-2">
                                                <div className="card-body">
                                                    <p className="m-0 p-0"><i>{data.chat}</i></p>
                                                </div>
                                            </div>
                                        </div> : <div className="col-12">
                                            <div className="card border-dark w-75 mb-2">
                                                <div className="card-body">
                                                    <p className="m-0 p-0"><i>{data.chat}</i></p>
                                                </div>
                                            </div>
                                        </div>

                                    );
                                })
                            }
                        </div>
                        <div className="row">
                            <div className="col-10">
                                <input className="form-control" value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} />
                            </div>
                            <div className="col-2 text-center">
                                <button type="button" className="btn btn-primary btn-sm" onClick={sendChat}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MentorChat;