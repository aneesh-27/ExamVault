const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/v1";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    let message = "Something went wrong. Please try again.";
    try {
      const payload = await response.json();
      if (typeof payload.detail === "string") message = payload.detail;
      else if (Array.isArray(payload.detail)) message = payload.detail.map((item) => item.msg).join(" ");
      else if (typeof payload.message === "string") message = payload.message;
    } catch {
      // Keep the generic message when the API does not return JSON.
    }
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export function registerUser({ email, full_name, password }) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, full_name, password }),
  });
}

export function loginUser({ email, password }) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function getCurrentUser(accessToken) {
  return request("/auth/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export function uploadStudyDocument(file, accessToken) {
  const formData = new FormData();
  formData.append("file", file);

  return fetch(`${API_BASE_URL}/documents/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  }).then(async (res) => {
    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Upload failed");
    }
    return res.json();
  });
}

export function getDocuments(accessToken) {
  return request("/documents/", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export function getDocument(documentId, accessToken) {
  return request(`/documents/${documentId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export function getDocumentTopics(documentId, accessToken) {
  return request(`/documents/${documentId}/topics`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export function getTopicFlashcards(topicId, accessToken) {
  return request(`/documents/topics/${topicId}/flashcards`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}
