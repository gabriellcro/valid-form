document.addEventListener("DOMContentLoaded", boot);

class ValidForm {
  constructor(
    classInputError,
    classTextError,
    classInputSuccess,
    classTextSuccess,
    fullname,
    email,
    contact,
    datebirth,
    state,
    gender
  ) {
    this.fullname = fullname;
    this.email = email;
    this.contact = contact;
    this.datebirth = datebirth;
    this.state = state;
    this.gender = gender;
    this.classInputError = classInputError;
    this.classTextError = classTextError;
    this.classInputSuccess = classInputSuccess;
    this.classTextSuccess = classTextSuccess;
  }

  isValidFullname(messageError, messageSuccess) {
    this.fullname.addEventListener("change", () => {
      if (this.fullname.value.length > 3) {
        this.addAlertSuccess(this.fullname, messageSuccess);
      } else {
        this.addAlertDanger(this.fullname, messageError, messageSuccess);
      }
    });
  }

  isValidEmail(messageSuccess, messageError) {
    const regex =
      /^([a-z0-9/./_/-]{2,})\@([a-z0-9]{2,})\.([a-z0-9]{2,})(\.[a-z0-9]{2,})?$/g;

    this.email.addEventListener("change", () => {
      if (regex.test(this.email.value)) {
        this.addAlertSuccess(this.email, messageSuccess);
      } else {
        this.addAlertDanger(this.email, messageError, messageSuccess);
      }
    });
  }

  // Adiciona um feedback de erro
  addAlertDanger(input, messageError, messageSuccess) {
    // Verifica se existe os argumentos da classe de sucesso, se for verdadeiro remove o alerta de sucesso.
    if (messageSuccess && this.classInputSuccess && this.classTextSuccess)
      this.removeAlertSuccess(input);

    if (
      !input.nextElementSibling ||
      input.nextElementSibling.className !== this.classTextError
    ) {
      const alertElement = document.createElement("span");
      alertElement.textContent = messageError;
      alertElement.classList.add(this.classTextError);

      input.classList.add(this.classInputError);
      input.parentNode.appendChild(alertElement);
    }
  }

  // Remove o feedback de erro
  removeAlertDanger(input) {
    if (
      input.nextElementSibling &&
      input.nextElementSibling.className === this.classTextError
    ) {
      input.classList.remove(this.classInputError);
      input.parentNode.removeChild(input.nextElementSibling);
    }
  }

  // Adiciona um feedback de sucesso
  addAlertSuccess(input, messageSuccess) {
    this.removeAlertDanger(input);

    if (messageSuccess && this.classInputSuccess && this.classTextSuccess) {
      if (
        !input.nextElementSibling ||
        input.nextElementSibling.className !== this.classTextSuccess
      ) {
        const alertElement = document.createElement("span");
        alertElement.textContent = messageSuccess;
        alertElement.classList.add(this.classTextSuccess);

        input.classList.add(this.classInputSuccess);
        input.parentNode.appendChild(alertElement);
      }
    }
  }

  // Remove o feedback de sucesso
  removeAlertSuccess(input) {
    if (
      input.nextElementSibling &&
      input.nextElementSibling.className === this.classTextSuccess
    ) {
      input.classList.remove(this.classInputSuccess);
      input.parentNode.removeChild(input.nextElementSibling);
    }
  }
}

function boot() {
  // input
  const fullname = document.querySelector("#fullname");
  const email = document.querySelector("#email");
  const contact = document.querySelector("#contact");
  const datebirth = document.querySelector("#datebirth");
  const state = document.querySelector("#state");
  const gender = document.querySelector("#gender");

  const validForm = new ValidForm(
    "alert-danger",
    "alert-danger-text",
    "alert-success",
    "alert-success-text",
    fullname,
    email,
    contact,
    datebirth,
    state,
    gender
  );

  validForm.isValidFullname(
    "O campo nome não pode estar vazio e deve conter pelo menos 3 caracteres.",
    "Nome válido"
  );
  validForm.isValidEmail("E-mail válido", "E-mail inválido");
}

export default ValidForm;
