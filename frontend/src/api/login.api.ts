import axios from "axios";
const baseURL = process.env.URL || "http://localhost:3001";

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${baseURL}/auth/signIn`, {
      username: email,
      password: password
    })
    if (!response) return;
    return response;
  } catch (error) {
    console.log('Error Login: ', error)
    return error;
  }
}