import { useEffect } from "react";
import { useState } from "react";
import { getUser } from "../../services/userSercice";
import "./Chat.css";
const Chat = ({ chat, user, isOnline }) => {
  const [friend, setFriend] = useState(null);
  const friendId = chat.users.find((u) => u !== user._id);

  useEffect(() => {
    const fetchFriend = async () => {
      const { data } = await getUser(friendId);
      setFriend(data);
    };
    if (chat) fetchFriend();
  }, [chat, user]);

  return (
    <div className="root__chat">
      <div className="online">
        {isOnline && <div className="green__dot"></div>}
        <img className="chat__img" src={friend?.avatar} alt="" />
      </div>
      <div className="chat__info">
        <h3 className="friend__name"> {friend?.name} </h3>
        <p className="chat__status"> {isOnline ? "Online" : "Ofline"} </p>
      </div>
    </div>
  );
};

export default Chat;
