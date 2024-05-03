import ValidForm from "./validForm.js";

document.addEventListener("DOMContentLoaded", boot);
class ValidCPF extends ValidForm {
  constructor(
    input,
    classInputError,
    classTextError,
    classInputSuccess,
    classTextSuccess
  ) {
    super(classInputError, classTextError, classInputSuccess, classTextSuccess);
    this.cpf = input;
  }
  // Verifica se o CPF é válido
  isValidCPF(messageError, messageSuccess) {
    this.cpf.addEventListener("change", () => {
      if (this.checkInputCPF(this.cpf.value)) {
        this.addAlertSuccess(this.cpf, messageSuccess);
      } else {
        this.addAlertDanger(this.cpf, messageError, messageSuccess);
      }
    });
  }

  // Converte o valor do 'input' em um 'array'
  convertArrayCPF() {
    return Array.from(this.clearInput(this.cpf.value));
  }

  // Cria o último ou antepenúltimo digito do CPF
  createDigitCPF(lastIndex) {
    const arr = this.convertArrayCPF().slice(0, lastIndex);
    let count = arr.length + 1;

    const digit = arr.reduce((acc, curr) => {
      acc += Number(curr) * count;
      count--;

      return acc;
    }, 0);

    const result = 11 - (digit % 11);
    return result >= 10 ? 0 : result;
  }

  // Verifica se o antepútino e ultimo digito do CPF é valido
  checkInputCPF(input) {
    let num = this.checkLength(this.cpf, "11", "14");

    const digit = Array.from(input);

    return (
      input.length === num &&
      this.createDigitCPF(-2) === Number(digit[num - 2]) &&
      this.createDigitCPF(-1) === Number(digit[num - 1]) &&
      this.isSequence(input)
    );
  }

  // Verifica o se o CPF é uma sequencia númerica
  isSequence(input) {
    const arr = Array.from(input);
    if (!input) return;

    return (
      Number(arr[0].charAt(0).repeat(11)) !== Number(this.clearInput(input))
    );
  }

  // OPCIONAL: Aplica uma máscara no input (ao aplicar a máscara, declare acima do 'isValidCPF()' para validar com mais precisão o input)
  applyCpfMask() {
    if (!(this.cpf instanceof HTMLInputElement)) return;

    if (this.cpf.type !== "text") this.cpf.setAttribute("type", "text");

    if (!this.cpf.maxlength || this.cpf.maxlength !== 14)
      this.cpf.setAttribute("maxlength", "14");

    if (!this.cpf.autocomplete || this.cpf.autocomplete !== "off")
      this.cpf.setAttribute("autocomplete", "off");

    this.cpf.addEventListener("keypress", (e) => {
      let maskedCpf = this.cpf.value.replace(/\D/g, "");

      if (maskedCpf.length > 2)
        maskedCpf = maskedCpf.slice(0, 3) + "." + maskedCpf.slice(3);
      if (maskedCpf.length > 6)
        maskedCpf = maskedCpf.slice(0, 7) + "." + maskedCpf.slice(7);
      if (maskedCpf.length > 10)
        maskedCpf = maskedCpf.slice(0, 11) + "-" + maskedCpf.slice(11);

      this.cpf.value = maskedCpf;
    });
  }
}

// Função iniciadora
function boot() {
  const cpf = document.querySelector("#cpf");
  const validCPF = new ValidCPF(
    cpf,
    "alert-danger",
    "alert-danger-text",
    "alert-success",
    "alert-success-text"
  );

  validCPF.applyCpfMask();
  validCPF.isValidCPF("CPF inválido", "CPF válido");
}
