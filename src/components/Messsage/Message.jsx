import "./Messages.css";
import { useEffect, useRef } from "react";
import { format } from "timeago.js";
import { useState } from "react";
import { getUser } from "../../services/userSercice";
import { getMessage, sentMessage } from "../../services/messageService";
import InputEmoji from "react-input-emoji";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
const Message = ({ chat, setSendMessage, reciveMessage }) => {
  const { user } = useSelector((state) => state.auth);
  const scrollRef = useRef();
  const [friend, setFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const friendId = chat.users.find((u) => u !== user._id);

  useEffect(() => {
    const fetchFriend = async () => {
      const { data } = await getUser(friendId);
      setFriend(data);
    };
    if (chat) fetchFriend();
  }, [chat, user]);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await getMessage(chat?._id);
      setMessages(data);
    };
    if (chat) fetchMessages();
  }, [chat]);

  const handleChange = (message) => {
    setNewMessage(message);
  };

  const handleSent = async (e) => {
    e.preventDefault();
    const message = {
      chatId: chat._id,
      sender: user._id,
      content: newMessage,
    };

    const receiverId = chat.users.find((id) => id !== user._id);
    try {
      setLoading(true);
      if (!newMessage) return toast.error("You can not send empty message");
      const { data } = await sentMessage(message);
      setSendMessage({ ...message, receiverId });
      setMessages([...messages, data]);
      setNewMessage("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (reciveMessage && reciveMessage.chatId === chat._id) {
      setMessages([...messages, reciveMessage]);
    }
  }, [reciveMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="message__box">
      <div className="message__header">
        <img className="friend__img" src={friend?.avatar} alt="" />
      </div>
      <div ref={scrollRef} className="message__body">
        {messages.map((message) => (
          <div
            className={
              message.sender === user._id ? "message__me message" : "message"
            }
            ref={scrollRef}
            key={message._id}
          >
            <p>{message.content}</p>
            <span> {format(message.createdAt)} </span>
          </div>
        ))}
      </div>
      <div className="message__footer">
        <InputEmoji
          value={newMessage}
          onChange={handleChange}
          placeholder="Type a message"
        />
        <button onClick={handleSent} className="send__btn">
          {loading ? <Loading /> : <i className="fa fa-paper-plane"></i>}
        </button>
      </div>
    </div>
  );
};

export default Message;
