import axios from "axios";

axios.defaults.baseURL = "https://marketbot-backend.onrender.com/api/v1";
axios.defaults.withCredentials = false;

export default axios;

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = res.data;

  // salva id no localStorage para usar no chat
  if (data.id) {
      localStorage.setItem("userId", data.id);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userEmail", data.email);
  }

  return data;
};

export const signupUser = async (name: string, email: string, password: string) => {
  const res = await axios.post("/user/signup", { name, email, password });
  if (res.status !== 200 && res.status !== 201) {
    throw new Error("Unable to signup");
  }
  const data = res.data;

  if (data.id) {
    localStorage.setItem("userId", data.id);
    localStorage.setItem("userName", data.name);
    localStorage.setItem("userEmail", data.email);
  }

  return data;
};

export const checkAuthStatus = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");

    if (userId && userName && userEmail) {
      return { id: userId, email: userEmail, name: userName };
    }

    return null;
  } catch (error) {
    console.error("Auth check failed:", error);
    return null;
  }
};

export const sendChatRequest = async (message: string) => {
  try {
    const userId = localStorage.getItem("userId"); // pega userId salvo no login/signup
    if (!userId) {
      throw new Error("Usuário não autenticado");
    }

    const response = await axios.post("/chat/new", {
      message,
      userId,
    });

    return response.data;
  } catch (error: any) {
    console.error("Erro no sendChatRequest:", error.response?.data || error.message);
    throw error;
  }
};
