// const nameInput = document.querySelector("#name");
// const numberInput = document.querySelector("#number");
// const emailInput = document.querySelector("#email");
// const passwordInput = document.querySelector("#password");
// const textInput = document.querySelector("#text");
// const selectInput = document.querySelector("#select");
//
// const radioBoxInput = document.querySelectorAll("radioBoxOption");
// const checkBoxInput = document.querySelector("#checkBoxOption");

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
const allTextAreas = document.querySelectorAll("textarea");

const allFields = [...allTextAreas, ...allInputs, ...allSelects];
let state = {
  valid: false,
};

const initialErrors = {
  name: "Please, provide a name.",
  number: "Number must be 8 characters long.",
  email: "Please, provide a valid e-mail.",
  password:
    "Password must be minimum eight characters, at least one letter and one number.",
  info: "Enter your message.",
  radioBoxOption: "One of these options is required.",
  checkBoxOption: "This checkbox is required.",
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
          : "Please, provide a valid e-mail.";
        break;
      case "password":
        errors.password = validPasswordRegex.test(value)
          ? ""
          : "Password must be minimum eight characters, at least one letter and one number.";
        break;
      case "info":
        errors.info = value.length < 5 ? "Enter your message." : "";
        break;
      case "radioBoxOption":
        errors.radioBoxOption = event.target.checked
          ? ""
          : "One of these options is required.";
        break;
      case "checkBoxOption":
        errors.checkBoxOption = event.target.checked
          ? ""
          : "This checkbox is required.";
        break;
      default:
        break;
    }

    const spanError = document.querySelector(`#${name}-error`);
    console.log(spanError);
    spanError.classList.add("fade");
    spanError.textContent = errors[name];
    console.log(errors);
    state.valid = validateForm(errors);
    console.log(state.valid);
  });
});

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false) //If expr1 can be converted to true, returns expr2; else, returns expr1.
  );
  return valid;
};

//submit

const showErrors = (errorsList) => {
  Object.keys(errorsList).forEach((key) => {
    if (errorsList[key].length > 0) {
      const spanError = document.querySelector(`#${key}-error`);
      spanError.textContent = errorsList[key];
    }
  });
};

const spanSubmit = document.querySelector(`#submit-status`);

const handleSubmit = (event) => {
  event.preventDefault();
  if (state.valid) {
    spanSubmit.classList.add("success");
    spanSubmit.textContent = "Submitted!";
  } else {
    spanSubmit.classList.add("error");
    spanSubmit.textContent = "Check your data.";
    showErrors(initialErrors);
  }
};

const submitButton = document.querySelector("#form-submit");
submitButton.addEventListener("click", handleSubmit);

//reset
const handleReset = (event) => {
  spanSubmit.textContent = "";
  allFields.forEach((item) => {
    const { name } = item;
    const spanError = document.querySelector(`#${name}-error`);
    spanError.textContent = "";
  });
};

const resetButton = document.querySelector("#form-reset");
resetButton.addEventListener("click", handleReset);
