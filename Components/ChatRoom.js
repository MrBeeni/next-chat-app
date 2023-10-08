import { useEffect, useRef, useState } from "react";
import { serverTimestamp } from "firebase/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { query, orderBy, limit } from "firebase/firestore";
import { formatRelative } from "date-fns";
import { FiSend } from "react-icons/fi";

export default function ChatRoom(props) {
  // constants
  const db = props.db;
  const dummySpace = useRef();
  //   get user details
  const { uid, displayName, photoURL } = props.user;

  // initial states
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const getMessage = async () => {
      try {
        const messagesRef = collection(db, "messages");
        const querySnapshot = await getDocs(
          query(messagesRef, orderBy("createdAt"))
        );
        setMessages(
          querySnapshot.docs.map((doc) => {
            console.log(doc.id, "idddddddddd");
            return {
              ...doc.data(),
              id: doc.id,
            };
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [newMessage]);

  // when form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      createdAt: serverTimestamp(),
      uid,
      displayName,
      photoURL,
    });

    setNewMessage("");

    // scroll down the chat
    dummySpace.current.scrollIntoView({ behavor: "smooth" });
  };

  return (
    <div className="container relative">
      <ul className="">
        {messages.map((message) => (
          <li
            key={message.id}
            className={`flex items-center mt-2 gap-3 ${
              message.uid === uid ? "flex-row-reverse" : ""
            }`}
          >
            {message.photoURL ? (
              <img
                className="rounded-full"
                src={message.photoURL}
                alt="Avatar"
                width={45}
                height={45}
              />
            ) : null}
            <div>
              <p className=" max-w-[70vw]  bg-green-300 p-1 rounded-lg text-start">
                {message.text}
                {message.createdAt?.seconds ? (
                  <i className="text-slate-500 mx-2">
                    {formatRelative(
                      new Date(message.createdAt.seconds * 1000),
                      new Date()
                    )}
                  </i>
                ) : null}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <section ref={dummySpace}></section>
      <div className=" bg-white min-w-full p-2 ">
        <form className="flex px-1 gap-3 text-xl" onSubmit={handleSubmit}>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
          />

          <button
            className="flex items-center gap-2 text-white bg-indigo-500 border-0 py-2 px-3 shadow-lg shadow-gray-500 focus:outline-none hover:scale-105 hover:bg-indigo-600 rounded-xl text-base"
            type="submit"
            disabled={!newMessage}
          >
            Send <FiSend />
          </button>
        </form>
      </div>
    </div>
  );
}
