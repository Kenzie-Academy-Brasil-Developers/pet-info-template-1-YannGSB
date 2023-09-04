import { toast } from "./toast.js";

const baseUrl = "http://localhost:3333";
const token = localStorage.getItem("@petinfo:token");
export { createNewUser, loginRequest, createPostRequest };

const requestHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

// Informações de usuário logado
export async function getCurrentUserInfo() {
  const request = await fetch(`${baseUrl}/users/profile`, {
    method: "GET",
    headers: requestHeaders,
  });
  const user = await request.json();

  return user;
}

// Listagem de posts
export async function getAllPosts() {
  const request = await fetch(`${baseUrl}/posts`, {
    method: "GET",
    headers: requestHeaders,
  });
  const posts = await request.json();
  return posts;
}

// Desenvolva as funcionalidades de requisições aqui
const createNewUser = async (requestBody) => {
  const newUser = await fetch(`${baseUrl}/users/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  }).then(async (res) => {
    const resConverted = await res.json();

    if (res.ok) {
      toast("usuário criado com sucesso", "#91C483");
      setTimeout(() => {
        location.replace("/");
      }, 2000);
    } else {
      toast(resConverted.message, "#FF6464");
    }
  });

  return newUser;
};

const loginRequest = async (loginBody) => {
  const token = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginBody),
  }).then(async (res) => {
    const resConverted = await res.json();

    if (res.ok) {
      localStorage.setItem("@petinfo:token", resConverted.token);
      toast("login realizado com sucesso", "#91C483");
      setTimeout(() => {
        location.replace("./src/pages/feed.html");
      }, 2000);
    } else {
      toast(resConverted.message, "#FF6464");
    }
  });

  return token;
};

const createPostRequest = async (postBody) => {
  const token = localStorage.getItem("@petinfo:token");

  const newPost = await fetch(`${baseUrl}/posts/create`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(postBody),
  }).then(async (res) => {
    const convertedRes = await res.json();

    if (res.ok) {
      toast("Post criado com sucesso", "#91C483");

      return convertedRes;
    } else {
      toast(convertedRes.message, "#FF6464");
    }
  });
  return newPost;
};

export const requestPostByID = async (postId) => {
  const post = await fetch(`${baseUrl}/posts/${postId}`, {
    method: "GET",
    headers: requestHeaders,
  }).then(async (res) => {
    const convertedRes = await res.json();

    if (res.ok) {
      return convertedRes;
    } else {
      toast(convertedRes.message, "#FF6464");
    }
  });
  return post;
};

export const updatePostByID = async (postId, postBody) => {
  const post = await fetch(`${baseUrl}/posts/${postId}`, {
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(postBody),
  }).then(async (res) => {
    const convertedRes = await res.json();

    if (res.ok) {
      toast("Post atualizado com sucesso", "#91C483");
      return convertedRes;
    } else {
      toast(convertedRes.message, "#FF6464");
    }
  });
  return post;
};

export const deletePostByID = async (postId) => {
  const post = await fetch(`${baseUrl}/posts/${postId}`, {
    method: "DELETE",
    headers: requestHeaders,
  }).then(async (res) => {
    const convertedRes = await res.json();

    if (res.ok) {
      toast(convertedRes.message, "#91C483");
      return convertedRes;
    } else {
      toast(convertedRes.message, "#FF6464");
    }
  });
  return post;
};
