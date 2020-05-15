// const nameInput = document.querySelector("#name");
// const numberInput = document.querySelector("#number");
// const emailInput = document.querySelector("#email");
// const passwordInput = document.querySelector("#password");
// const textInput = document.querySelector("#text");
// const selectInput = document.querySelector("#select");
//
// const radioBoxInput = document.querySelectorAll("radioBoxOption");
// const checkBoxInput = document.querySelector("#checkBoxOption");
// const resetButton = document.querySelector("#form-reset");
// const submitButton = document.querySelector("#form-submit");
//
// const submittedInformationContainer = document.querySelector("#submitted-info");
// const logSubmit = () => {
//   const checkedRadioInput = document.querySelector(
//     "input[name=option]:checked"
//   );
//   event.preventDefault();
//
//   submittedInformationContainer.innerHTML = `
// <p> Name: ${nameInput.value}  </p>
// <p> Number: ${numberInput.value}  </p>
// <p> Email: ${emailInput.value}  </p>
// <p> Password: ${passwordInput.value}  </p>
// <p> Info: ${textInput.value} </p>
// <p> Select: ${selectInput.value} </p>
// <p> Radio: ${radioBoxInput.checked} </p>
// <p> Check: ${checkBoxInput.checked}</p>
//
// `;
// };
//
// submitButton.addEventListener("click", logSubmit);

const validEmailRegex = RegExp(
    /^(([^<>()[\],;:\s@]+(\.[^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+\.)+[^<>()[\],;:\s@]{2,})$/i
);
const validPasswordRegex = RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

const allInputs = document.querySelectorAll("input");
const allSelects = document.querySelectorAll("select");
const allTextAreas = document.querySelectorAll("textarea")

const allFields = [...allInputs, ...allSelects, ...allTextAreas]

const initialErrors = {
  name: "Please, provide a name.",
  number: "Number must be 8 characters long.",
  email: "Please provide a valid e-mail.",
  password:
      "Password must be minimum eight characters, at least one letter and one number.",
  text: "Enter your message.",
  radioBoxOption: "One of these options is required.",
  checkboxOption: "This checkbox is required.",
};


allFields.forEach((item) => {
  item.addEventListener("input", (event) => {
    const { name, value } = event.target;
    let errors = initialErrors;

    switch (name) {
      case "name":
        errors.name = value.length < 2 ? "Please, provide name." : "";
        break;
      case "number":
        errors.number =
            value.length < 8 ? "Number must be 8 characters long." : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value)
            ? ""
            : "Please provide a valid e-mail.";
        break;
      case "password":
        errors.password = validPasswordRegex.test(value)
            ? ""
            : "Password must be minimum eight characters, at least one letter and one number.";
        break;
      case "text":
        errors.text = value.length < 5 ? "Enter your message." : "";
        break;
      case "radioBoxOption":
        errors.radioBoxOption = event.target.checked
            ? ""
            : "One of these options is required.";
        break;
      case "checkBoxOption":
        errors.checkboxOption = event.target.checked
            ? ""
            : "This checkbox is required.";
        break;
      default:
        break;
    }
    console.log(`#${name}-error`)
    const spanError = document.querySelector(`#${name}-error`);
    console.log(errors[name])
    spanError.classList.add('fade')
    spanError.textContent = errors[name];
    console.log(errors)
    console.log(validateForm(errors));
  });
});
;
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false) //If expr1 can be converted to true, returns expr2; else, returns expr1.
  );
  return valid;
};

const handleSubmit = (event) => {
  event.preventDefault();
  if (valid) {
    const spanSubmit = document.querySelector(`#submitted`);
    spanSubmit.textContent = "Submitted!";
  }
};

const submitButton = document.querySelector("#form-submit");
submitButton.addEventListener("click", handleSubmit);