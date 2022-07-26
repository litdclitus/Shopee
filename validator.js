// Đối tượng validator
function Validator(options) {
  // Hàm thực hiện validate
  function validate(inputElement, rule) {
    var errorElement = inputElement.parentElement.querySelector(
      options.errorSlector
    );
    var errorMessage = rule.test(inputElement.value);
    if (errorMessage) {
      errorElement.innerText = errorMessage;
      errorElement.parentElement.classList.add("invalid");
    } else {
      errorElement.innerText = "";
      errorElement.parentElement.classList.remove("invalid");
    }
  }

  // Lấy element của form cần validate
  var formElement = document.querySelector(options.form);
  if (formElement) {
    options.rules.forEach(function (rule) {
      var inputElement = formElement.querySelector(rule.selector);
      if (inputElement) {
        // Xử lý trường hợp blur khỏi input
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };
        // Xử lý trường hợp khi đang nhập không hiện lỗi
        inputElement.oninput = function () {
          var errorElement = inputElement.parentElement.querySelector(
            options.errorSlector
          );
          errorElement.innerText = "";
          errorElement.parentElement.classList.remove("invalid");
        };
      }
    });
  }
}

// Rules
Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return emailRegex.test(value) ? undefined : "Vui lòng nhập email";
    },
  };
};

Validator.minLength = function (selector, min) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min
        ? undefined
        : `Độ dài mật khẩu phải lớn hơn ${min} ký tự`;
    },
  };
};
