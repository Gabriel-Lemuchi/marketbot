import React from "react"
import { Box, Typography, Button } from "@mui/material"
import CustomizedInput from "../components/CustomizedInput";
import axios from "axios"
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
axios.defaults.baseURL = "https://marketbot-backend.onrender.com"
axios.defaults.withCredentials = true

const Login = () => {
  const auth = useAuth()
  const HandleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    try {
      toast.loading("Signing In", { id: "login"})
      await auth?.login(email, password)
      toast.success("Signed In", { id: "login"}
      )
    } catch(error) {
      console.log(error)
      toast.error("Signing In Failed", {id: "login"})
    }
  }
  return (
    <Box width={"100%"} height={"100%"}
    display="flex" flex={1}>
      <Box padding={4} mt={8} ml={20} display={{md:"flex", sm:"none", xs:"none"}}>
        <img src="market.png" style={{ width:"400px", height:"360px", borderRadius:"20%", marginTop:"60px",
        filter: "grayscale(0.6)", boxShadow: "4px 8px black"
         }}/>
      </Box>
      <Box display={"flex"} flex={{xs: 1, md:0.5}} justifyContent={"center"}
      alignItems={"center"}
      padding={2}
      ml={"auto"}
      mt={16}
      mr={20}>
        <form
        onSubmit={HandleSubmit}
        style={{
          margin: "auto",
          padding: "30px",
          boxShadow: "10px 10px 20px #000",
          borderRadius: "5px",
          border: "none"
        }}>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: "center",
          }}>

          <Typography variant="h4" textAlign="center" padding={2} fontWeight={600}>
            Login
            </Typography>
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password"
            />
            <Button type="submit" className="login-button"
            >
            Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Login;
