import { loginRequest } from "./requests.js";
import { toast } from "./toast.js";

const handleUserLogin = () => {
  const loginInputs = document.querySelectorAll(".inputLogin");
  const loginButton = document.querySelector("#login__submit");
  let count = 0;

  loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    const loginBody = {};

    loginInputs.forEach((input) => {
      if (input.value.trim() === "") {
        count++;
      }
      loginBody[input.name] = input.value;
    });

    if (count !== 0) {
      count = 0;

      return toast("Por favor, preencha todos os campos necessários", "#FF6464");
    }
    loginRequest(loginBody);
  });
};

const redirectToRegister = () => {
  const button = document.querySelector("#register__button");

  button.addEventListener("click", () => {
    location.replace("./src/pages/register.html");
  });
};

handleUserLogin();
redirectToRegister();