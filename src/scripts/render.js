import { getCurrentUserInfo, getAllPosts } from "./requests.js";


export async function renderAllPosts() {
  const postSection = document.querySelector(".posts");
  postSection.innerHTML = "";
  const posts = await getAllPosts();

  posts.forEach(async (post) => {
    const postArticle = await renderPost(post, true);
    postSection.appendChild(postArticle);
  });
}


export async function renderPost(post) {
  const postContainer = document.createElement("article");
  postContainer.classList.add("post__article");

  const postTitle = document.createElement("h2");
  postTitle.classList.add("post__title", "text1", "bolder");
  postTitle.innerText = post.title;

  const postContent = document.createElement("p");
  postContent.classList.add("post__content", "text3");

  const postHeader = await renderPostHeader(post);

  postContent.classList.add("post__content--feed", "text3");
  postContent.innerText = post.content;

  const openButton = document.createElement("a");
  openButton.classList.add("post__open", "text3", "bold");
  openButton.innerText = "Acessar publicação";
  openButton.dataset.id = post.id;

  postContainer.append(postHeader, postTitle, postContent, openButton);

  return postContainer;
}


async function checkEditPermission(authorID) {
  const { id } = await getCurrentUserInfo();

  if (Object.values({ id }, [0]).toString() == authorID) {
    return true;
  } else {
    return false;
  }
}


async function renderPostHeader(post) {
  const userInfo = post.user;

  const postDateInfo = handleDate(post.createdAt);

  const postHeader = document.createElement("header");
  postHeader.classList.add("post__header");

  const postInfo = document.createElement("div");
  postInfo.classList.add("post__info");

  const authorImage = document.createElement("img");
  authorImage.classList.add("post__author-image");
  authorImage.src = userInfo.avatar;

  const authorName = document.createElement("h2");
  authorName.classList.add("post__author-name", "text4", "bolder");
  authorName.innerText = userInfo.username;

  const divisor = document.createElement("small");
  divisor.innerText = "|";
  divisor.classList.add("post__date", "text4");

  const postDate = document.createElement("small");
  postDate.classList.add("post__date", "text4");
  postDate.innerText = postDateInfo;

  postInfo.append(authorImage, authorName, divisor, postDate);

  postHeader.appendChild(postInfo);

  const editable = await checkEditPermission(userInfo.id);

  if (editable) {
    const postActions = renderPostActions(post.id);
    postHeader.appendChild(postActions);
  }

  return postHeader;
}

function renderPostActions(postID) {
  const actionsContainer = document.createElement("div");
  actionsContainer.classList.add("post__actions");

  const editButton = document.createElement("button");
  editButton.classList.add(
    "post__button--edit",
    "btn",
    "btn--gray",
    "btn--small",
    "text4"
  );
  editButton.dataset.id = postID;
  editButton.innerText = "Editar";

  const deleteButton = document.createElement("button");
  deleteButton.classList.add(
    "post__button--delete",
    "btn",
    "btn--gray",
    "btn--small",
    "text4"
  );
  deleteButton.dataset.id = postID;
  deleteButton.innerText = "Excluir";

  actionsContainer.append(editButton, deleteButton);

  return actionsContainer;
}


export function handleDate(timeStamp) {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const date = new Date(timeStamp);
  const month = months.at(date.getMonth());
  const year = date.getFullYear();

  return `${month} de ${year}`;
}

export function modalCreateNewPost() {
  const modal = document.querySelector(".modal");
  const container = document.createElement("div");
  container.classList.add("modal__container");

  const closeButton = document.createElement("span");
  closeButton.classList.add("modal__btn", "close");
  closeButton.id = "modal__btn";
  closeButton.innerText = "X";

  const postDetails = document.createElement("div");
  postDetails.classList.add("modal__postDetails");

  const title = document.createElement("h2");
  title.classList.add("modal__title", "title1", "bold");
  title.innerText = "Criando novo post";

  const form = document.createElement("form");
  form.classList.add("form__container");

  const fieldset = document.createElement("fieldset");
  fieldset.classList.add("form__fieldset", "fieldset__container");

  const titleLabel = document.createElement("label");
  titleLabel.classList.add("form__label", "text3", "bold");
  titleLabel.innerText = "Título do post";

  const titleInput = document.createElement("input");
  titleInput.name = "title";
  titleInput.classList.add("form__input", "text3", "newPostInput");
  titleInput.type = "text";
  titleInput.id = "PostTitle";
  titleInput.placeholder = "Digite o título do post aqui";
  titleInput.required = true;

  const contentLabel = document.createElement("label");
  contentLabel.classList.add("form__label", "text3", "bold");
  contentLabel.innerText = "Conteúdo do post";

  const contentTextarea = document.createElement("textarea");
  contentTextarea.rows = "5";
  contentTextarea.name = "content";
  contentTextarea.classList.add("form__input", "text3", "newPostInput");
  contentTextarea.id = "PostContent";
  contentTextarea.placeholder = "Desenvolva o conteúdo do post aqui...";
  contentTextarea.required = true;

  const publishButton = document.createElement("button");
  publishButton.classList.add(
    "form__submit",
    "btn",
    "btn--brand",
    "btn--small",
    "text3"
  );
  publishButton.innerText = "Publicar";

  const cancelButton = document.createElement("button");
  cancelButton.classList.add(
    "form__close",
    "btn",
    "btn--gray",
    "btn--small",
    "text3",
    "close"
  );
  cancelButton.innerText = "Cancelar";

  fieldset.appendChild(titleLabel);
  fieldset.appendChild(titleInput);
  fieldset.appendChild(contentLabel);
  fieldset.appendChild(contentTextarea);

  form.appendChild(fieldset);
  form.appendChild(publishButton);
  form.appendChild(cancelButton);

  postDetails.appendChild(title);
  postDetails.appendChild(form);

  container.appendChild(closeButton);
  container.appendChild(postDetails);

  modal.appendChild(container);
}

export function modalAccessPost(post) {
  const userInfo = post.user;

  const postDateInfo = handleDate(post.created_at);

  const postHeader = document.createElement("header");
  postHeader.classList.add("post__header");

  const postInfo = document.createElement("div");
  postInfo.classList.add("post__info");

  const authorImage = document.createElement("img");
  authorImage.classList.add("post__author-image");
  authorImage.src = userInfo.avatar;

  const authorName = document.createElement("h2");
  authorName.classList.add("post__author-name", "text4", "bolder");
  authorName.innerText = userInfo.username;

  const divisor = document.createElement("small");
  divisor.innerText = "|";
  divisor.classList.add("post__date", "text4");

  const postDate = document.createElement("small");
  postDate.classList.add("post__date", "text4");
  postDate.innerText = postDateInfo;

  postInfo.append(authorImage, authorName, divisor, postDate);

  const modal = document.querySelector(".modalPost");

  const container = document.createElement("div");
  container.classList.add("modalPost__container");

  const closeButton = document.createElement("span");
  closeButton.classList.add(
    "modalPost__btn",
    "close",
    "modalPost__close",
    "btn",
    "btn--gray",
    "btn--small",
    "text3"
  );
  closeButton.id = "modalPost__btn";
  closeButton.innerText = "X";

  const title = document.createElement("h2");
  title.classList.add("modalPost__title", "text1", "bolder");
  title.innerText = post.title;

  const paragraph = document.createElement("p");
  paragraph.classList.add("modalPost__paragraph", "text3");
  paragraph.innerText = post.content;

  container.appendChild(closeButton);
  container.appendChild(title);
  container.appendChild(paragraph);

  modal.append(postInfo, container);
}

export function modalEditPost(postId) {
  const modal = document.querySelector(".editPost");

  const container = document.createElement("div");
  container.classList.add("editPost__container");

  const closeButton = document.createElement("span");
  closeButton.classList.add(
    "editPost__btn",
    "btn",
    "btn--gray",
    "btn--small",
    "text3",
    "close"
  );
  closeButton.id = "editPost__btn";
  closeButton.innerText = "X";

  const postDetails = document.createElement("div");
  postDetails.classList.add("editPost__postDetails");

  const title = document.createElement("h2");
  title.classList.add("editPost__title", "title1", "bold");
  title.innerText = "Edição";

  const form = document.createElement("form");
  form.classList.add("form__container");

  const fieldset = document.createElement("fieldset");
  fieldset.classList.add("form__fieldset", "fieldset__container");

  const titleLabel = document.createElement("label");
  titleLabel.classList.add("form__label", "text3", "bold");
  titleLabel.innerText = "Título do post";

  const titleInput = document.createElement("input");
  titleInput.name = "title";
  titleInput.classList.add("form__inputTitle", "text3", "editInput");
  titleInput.type = "text";
  titleInput.id = "PostTitle";
  titleInput.required = true;

  const contentLabel = document.createElement("label");
  contentLabel.classList.add("form__label", "text3", "bold");
  contentLabel.innerText = "Conteúdo do post";

  const contentTextarea = document.createElement("textarea");
  contentTextarea.rows = "5";
  contentTextarea.name = "content";
  contentTextarea.classList.add("form__inputContent", "text3", "editInput");
  contentTextarea.id = "PostContent";
  contentTextarea.required = true;

  const editButton = document.createElement("button");
  editButton.classList.add(
    "form__editSubmit",
    "btn",
    "btn--brand",
    "btn--small",
    "text3"
  );
  editButton.innerText = "Salvar alterações";

  const cancelButton = document.createElement("button");
  cancelButton.classList.add(
    "form__close",
    "btn",
    "btn--gray",
    "btn--small",
    "text3",
    "close"
  );
  cancelButton.innerText = "Cancelar";

  fieldset.appendChild(titleLabel);
  fieldset.appendChild(titleInput);
  fieldset.appendChild(contentLabel);
  fieldset.appendChild(contentTextarea);

  form.appendChild(fieldset);
  form.appendChild(editButton);
  form.appendChild(cancelButton);

  postDetails.appendChild(title);
  postDetails.appendChild(form);

  container.appendChild(closeButton);
  container.appendChild(postDetails);

  modal.appendChild(container);
}

//cria o modal de exclusão de post
export function modalDeletePost() {
  const modal = document.querySelector(".deletePost");

  const container = document.createElement("div");
  container.classList.add("deletePost__container");

  const confirmation = document.createElement("h3");
  confirmation.classList.add("deletePost__confirmation", "text2", "bolder");
  confirmation.innerText = "Confirmação de exclusão";

  const title = document.createElement("h2");
  title.classList.add("deletePost__title", "text1", "bolder");
  title.innerText = "Tem certeza que deseja excluir este post?";

  const paragraph = document.createElement("p");
  paragraph.classList.add("deletePost__paragraph", "text3");
  paragraph.innerText =
    "Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir";

  const closeButton = document.createElement("span");
  closeButton.classList.add(
    "deletePost__closeBtn",
    "closed",
    "btn",
    "btn--gray",
    "btn--small",
    "text3"
  );
  closeButton.innerText = "X";

  const cancelButton = document.createElement("span");
  cancelButton.classList.add(
    "deletePost__cancelBtn",
    "closed",
    "btn",
    "btn--gray",
    "btn--small",
    "text3"
  );
  cancelButton.innerText = "Cancelar";

  const confirmButton = document.createElement("span");
  confirmButton.classList.add("deletePost__confirmBtn", "btn--alert");
  confirmButton.innerText = "Sim, excluir esse post";

  container.append(
    confirmation,
    title,
    paragraph,
    closeButton,
    confirmButton,
    cancelButton
  );
  modal.appendChild(container);
}