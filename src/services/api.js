const API_URL = "https://movies-explorer-rtc.onrender.com/api"

export const request = async (endpoint, method = "GET", body = null, token = null) => {
  const headers = { "Content-Type": "application/json" }
  const authToken = token || localStorage.getItem("token")
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || "API request failed")
  }

  return res.json()
}

export default request
