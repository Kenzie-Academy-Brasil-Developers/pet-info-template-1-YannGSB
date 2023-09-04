import {
  modalCreateNewPost,
  renderAllPosts,
  modalAccessPost,
  modalDeletePost,
  modalEditPost,
} from "./render.js";
import {
  getCurrentUserInfo,
  createPostRequest,
  requestPostByID,
  deletePostByID,
  updatePostByID,
} from "./requests.js";
import { toast } from "./toast.js";

const verifyId = () => {
  const token = localStorage.getItem("@petinfo:token");
  if (!token) {
    location.replace("/");
  }
};

async function getUserPicture() {
  const requestUserPicture = await getCurrentUserInfo();
  const img = document.querySelector(".user__image");

  img.src = requestUserPicture.avatar;
}

function showUserMenu() {
  const userAction = document.querySelector(".user__image");
  const menu = document.querySelector(".user__logout");

  userAction.addEventListener("click", async () => {
    const userNameRequest = await getCurrentUserInfo();
    const userName = document.querySelector(".user__uniquename");
    menu.classList.toggle("hidden");
    userName.innerText = userNameRequest.username;
  });
}

function logoff() {
  const button = document.querySelector(".logout__button");

  button.addEventListener("click", () => {
    toast("saindo da conta...", "#91C483");
    setTimeout(() => {
      location.replace("../../index.html");
    }, 2000);
    localStorage.removeItem("@petinfo:token");
  });
}

function openNewPostModal() {
  const newPostButton = document.getElementById("user__newpost");
  const modal = document.querySelector(".modal");
  const closeModalButtons = modal.querySelectorAll(".close");

  newPostButton.addEventListener("click", () => {
    modal.showModal();
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modal.close();
    });
  });
}

const handleNewPost = () => {
  const formInputs = document.querySelectorAll(".newPostInput");
  const formButton = document.querySelector(".form__submit");
  formButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const newPost = {};
    let count = 0;

    formInputs.forEach((input) => {
      if (input.value.trim() === "") {
        count++;
      }
      newPost[input.name] = input.value;
    });

    if (count !== 0) {
      toast("Por favor, preencha todos os campos necessários", "#FF6464");
    } else {
      const post = await createPostRequest(newPost);
      setTimeout(() => {
        location.reload();
      }, 1000);
      return post;
    }
  });
};

function handleAccessPost() {
  const accessPublication = document.querySelectorAll(".post__open");
  const modal = document.querySelector(".modalPost");
  accessPublication.forEach((link) => {
    link.addEventListener("click", async (event) => {
      const postID = event.target.dataset.id;
      const post = await requestPostByID(postID);
      modal.innerHTML = "";
      modalAccessPost(post);
      modal.showModal();

      const closeBtn = document.querySelector(".modalPost__btn");
      closeBtn.addEventListener("click", () => {
        modal.close();
      });
    });
  });
}

function handleDeletePost() {
  const buttons = document.querySelectorAll(".post__button--delete");
  const modal = document.querySelector(".deletePost");

  buttons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const postID = event.target.dataset.id;
      modal.innerHTML = "";
      modalDeletePost();
      modal.showModal();

      const closeModalButtons = document.querySelectorAll(".closed");
      closeModalButtons.forEach((button) => {
        button.addEventListener("click", () => {
          modal.close();
        });
      });

      const confirmButton = document.querySelector(".deletePost__confirmBtn");
      confirmButton.addEventListener("click", () => {
        deletePostByID(postID);
        setTimeout(() => {
          location.reload();
        }, 1000);
        closeModal();
      });
    });
  });
}

function handleEditPost() {
  const buttons = document.querySelectorAll(".post__button--edit");
  const modal = document.querySelector(".editPost");
  const postBody = {};

  buttons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const postID = event.target.dataset.id;
      const post = await requestPostByID(postID);
      modal.innerHTML = "";
      modalEditPost();
      const titleInput = document.querySelector(".form__inputTitle");
      const contentInput = document.querySelector(".form__inputContent");
      modal.showModal();
      titleInput.value = post.title;
      contentInput.value = post.content;

      const inputs = document.querySelectorAll(".editInput");
      const formSubmit = document.querySelector(".form__editSubmit");
      const closeModalButton = document.querySelector(".editPost__btn");
      closeModalButton.addEventListener("click", () => {
        modal.close();
      });
      formSubmit.addEventListener("click", async (event) => {
        event.preventDefault();
        inputs.forEach((input) => {
          postBody[input.name] = input.value;
        });

        const request = await updatePostByID(postID, postBody);
        setTimeout(() => {
          location.reload();
        }, 1000);
      });
    });
  });
}

async function main() {
  // Adiciona os eventos de click ao menu flutuante de logout
  showUserMenu();
  // Renderiza todos os posts no feed (render.js)
  await renderAllPosts();
}

verifyId();
getUserPicture();
modalCreateNewPost();
main();
logoff();
openNewPostModal();
handleNewPost();
setTimeout(handleAccessPost, 100);
setTimeout(handleDeletePost, 100);
setTimeout(handleEditPost, 100);
