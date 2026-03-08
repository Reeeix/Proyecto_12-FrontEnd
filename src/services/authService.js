import { request } from "./api"

export const registerUser = async (userData) => {
  return await request("/users/register", "POST", userData)
}

export const loginUser = async ({ email, password }) => {
  return request("/users/login", "POST", { email, password })
}

export const getUserProfile = async (token) => {
  return await request("/users/profile", "GET", null, token)
}