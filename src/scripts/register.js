// Desenvolva as funcionalidades de cadastro aqui

import { createNewUser } from "./requests.js";

const handleNewUser = () => {
  const registerInputs = document.querySelectorAll(".inputRegister");
  const registerButton = document.querySelector("#register__submit");
  registerButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const newUser = {};

    registerInputs.forEach((input) => {
      newUser[input.name] = input.value;
    });
    const user = await createNewUser(newUser);
    return user;
  });
};

const redirectToLogin = () => {
  const button = document.querySelector("#redirect__button");

  button.addEventListener("click", () => {
    location.replace("/");
  });
};

handleNewUser();
redirectToLogin();