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

  isValidContact(messageSuccess, messageError) {
    const regex = /^\(([\d]{2})\)\s(\d{5})\-(\d{4})|\d{11}/;
    const inputLength = this.checkLength(this.contact, "11", "15");

    this.contact.addEventListener("change", () => {
      const value = this.contact.value;
      if (value.length === inputLength && regex.test(value)) {
        this.addAlertSuccess(this.contact, messageSuccess);
      } else {
        this.addAlertDanger(this.contact, messageError, messageSuccess);

        console.log(value.length === inputLength);
        console.log(inputLength);
        console.log(value.length);
        console.log(regex.test(value));
      }
    });
  }

  // OPCIONAL: Aplica uma máscara no input (ao aplicar a máscara, declare acima do 'isValidContact()' para validar com mais precisão o input)
  applyContactMask() {
    if (!(this.contact instanceof HTMLInputElement)) return;

    if (this.contact.type !== "tel") this.contact.setAttribute("type", "tel");

    if (this.contact.maxlength !== 15)
      this.contact.setAttribute("maxlength", "15");

    this.contact.addEventListener("keypress", () => {
      let maskedContact = this.contact.value;

      if (maskedContact.length === 2)
        maskedContact = "(" + maskedContact.slice(0, 2) + ")" + " ";

      if (maskedContact.length === 11)
        maskedContact = maskedContact.slice(0, 10) + "-";

      this.contact.value = maskedContact;
    });
  }

  // Se o input for 'type=number' recebe o argumento 'num', mas se for 'type=string' recebe o argumento 'str'
  checkLength(input, num, str) {
    let length = Number(str);
    if (input.type === "number") length = Number(num);

    return length;
  }

  // Remove todos os caracteres que não são números
  clearInput(input) {
    return input.replace(/\D+/g, "");
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

  validForm.applyContactMask();
  validForm.isValidContact("Número inválido", "Número válido");
}

export default ValidForm;
