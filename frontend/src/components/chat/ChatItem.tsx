import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const ChatItem = ({
  content,
  role,
}: {
  content: string;
   role: "user" | "assistant";
}) => {
  const auth = useAuth()
  return role === "assistant" ? (<Box sx={{display:'flex', p:2, bgcolor:"white",my:2,gap:2}}>
    <Avatar sx={{ ml:"0", borderRadius:"50%"}}>
      <img src="lemuchiai.jpg" alt="lemuchiai" width={"45px"}/>
    </Avatar>
    <Box>
      <Typography fontSize={"20px"}>{content}
      </Typography>
    </Box>
  </Box>
  ) :
  (
  <Box sx={{display:'flex', p:2, bgcolor:"white",my:2,gap:2}}>
    <Avatar sx={{ ml:"0", bgcolor:"black"}}>
      {auth?.user?.name
          ? auth.user.name.charAt(0).toUpperCase()
          : "?"}
    </Avatar>
    <Box>
      <Typography fontSize={"20px"}>{content}
      </Typography>
    </Box>
  </Box>
  )
}

export default ChatItem
