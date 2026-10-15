const API_URL = "http://localhost:5000/api";

export const loginOwner = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const getHostels = async (token) => {
  const response = await fetch(`${API_URL}/hostels`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get hostels");
  }

  return data;
};

export const getRooms = async (hostelId, token) => {
  const response = await fetch(`${API_URL}/rooms/${hostelId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get rooms");
  }

  return data;
};

export const getBeds = async (roomId, token) => {
  const response = await fetch(`${API_URL}/beds/${roomId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get beds");
  }

  return data;
};

export const getStudents = async (token) => {
  const response = await fetch(`${API_URL}/students`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get students");
  }

  return data;
};
export const createStudent = async (studentData, token) => {
  const response = await fetch(`${API_URL}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(studentData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create student");
  }

  return data;
};
export const createRoom = async (roomData, token) => {
  const response = await fetch(`${API_URL}/rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(roomData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create room");
  }

  return data;
};

export const createBeds = async (roomId, token) => {
  const response = await fetch(`${API_URL}/beds`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      roomId: roomId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create beds");
  }

  return data;
};