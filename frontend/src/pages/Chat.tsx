import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import axios, { sendChatRequest } from "../helpers/api-communicator";

const Chat = () => {

  useEffect(() => {
  const fetchChats = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const res = await axios.get(`/chat/history/${userId}`);
      setChatMessages(res.data.chats || []);
    } catch (err) {
      console.error("Erro ao carregar histórico:", err);
    }
  };

  fetchChats();
}, []);
type Message = {
  role: "user" | "assistant";
  content: string;
};

  const inputRef = useRef<HTMLInputElement>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value.trim();
    if (!content) return;

    if (inputRef.current) inputRef.current.value = "";

    const userMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, userMessage]);

    try {
      const chatData = await sendChatRequest(content);

      setChatMessages(chatData.chats);
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
    }
  };

  return (
    <Box sx={{ display: "flex", flex: 1, width: "100%", height: "100%", mt: 3, gap: 3 }}>
      <Box sx={{ display: { md: "flex", xs: "none" }, flex: 0.2, flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "#00162dc2",
            borderRadius: 2,
            flexDirection: "column",
            mx: 3,
            alignItems: "center",
            p: 2,
          }}
        >
          <Avatar sx={{ mx: "auto", my: 2, bgcolor: "white", color: "black", fontWeight: 700 }}>
            {auth?.user?.name ? auth.user.name.charAt(0).toUpperCase() : "?"}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking with MARKETBOT<br></br>Ask me something and I will tell you
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3, textAlign: "center" }}>
            <Button className="logout"
            variant="contained"
              color="error"
              onClick={() => auth?.logout()}
              >Logout</Button>
          </Typography>

        </Box>
      </Box>

      <Box sx={{ display: "flex", flex: { md: 0.8, xs: 1 }, flexDirection: "column", px: 2, justifyContent: "center", alignItems: "center", textAlign: "center", p: 2 }}>
        <Typography sx={{ fontSize: "30px", fontWeight: 450, maxWidth: "580px" }}>
          This is a ChatBot created by <b>Gabriel Lemuchi Braz</b>, to response some questions about a market
        </Typography>

        <Box sx={{ width: "90%", height: "60vh", borderRadius: 3, mx: "auto", display: "flex", flexDirection: "column", overflow: "scroll", overflowX: "hidden", scrollBehavior: "smooth" }}>
          {chatMessages.map((chat, index) => (

            <ChatItem key={index} content={chat.content} role={chat.role} />
          ))}
        </Box>

        {/* Input */}
        <div
          style={{
            width: "86%",
            padding: "20px",
            marginTop: "8px",
            borderRadius: 5,
            backgroundColor: "#011021d3",
            display: "flex",
            margin: "auto",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            style={{ width: "100%", backgroundColor: "transparent", padding: "8px", border: "none", outline: "none", color: "white", fontSize: "20px" }}
          />
          <IconButton onClick={handleSubmit} sx={{ ml: "auto", color: "white" }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
