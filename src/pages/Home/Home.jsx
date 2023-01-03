import config from "../../config.json";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Chat from "../../components/chat/Chat";
import Message from "../../components/Messsage/Message";
import Navbar from "../../components/Navbar/Navbar";
import { getChats } from "../../services/chatService";
import { gerUsers } from "../../services/userSercice";
import { io } from "socket.io-client";
import "./Home.css";
const Home = () => {
  const socket = useRef();
  const { user } = useSelector((state) => state.auth);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [reciveMessage, setReciveMessage] = useState(null);

  useEffect(() => {
    socket.current = io(config.ioServer);
    socket.current.emit("new-user-add", user?._id);
    socket.current.on("get-users", (users) => setOnlineUsers(users));
  }, [user]);

  useEffect(() => {
    socket.current.on("recieve-message", (message) =>
      setReciveMessage(message)
    );
  }, []);

  useEffect(() => {
    if (sendMessage) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    const fetchChats = async () => {
      const { data } = await getChats(user?._id);
      setChats(data);
    };
    const fetchUsers = async () => {
      const { data } = await gerUsers();
      setUsers(data);
    };
    fetchChats();
    fetchUsers();
  }, [user]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // const newUsers = users.filter(u._id !== user._id);

  let filtered = users.filter((u) => u._id !== user?._id);
  if (searchQuery)
    filtered = users.filter((m) =>
      m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.users.find((member) => member !== user._id);
    const online = onlineUsers.find((u) => u.userId === chatMember);
    return online ? true : false;
  };

  return (
    <>
      <Navbar users={filtered} value={searchQuery} onChange={handleSearch} />
      <div className="home__page">
        <div className="chats">
          {chats.map((chat) => (
            <div onClick={() => setSelectedChat(chat)} key={chat._id}>
              <Chat
                isOnline={checkOnlineStatus(chat)}
                chat={chat}
                user={user}
              />
            </div>
          ))}
        </div>
        <div className="messages">
          {selectedChat ? (
            <Message
              chat={selectedChat}
              setSendMessage={setSendMessage}
              reciveMessage={reciveMessage}
            />
          ) : (
            <div className="chat__hint">
              <h1>Select a chat for sending message</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
