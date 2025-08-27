let contactCount = 1;
const formEl = document.getElementById("contactForm");
const addContactBtnEl = document.getElementById("addContactBtn");
const buttonsEl = document.querySelector(".buttons");

// 添加联系人
addContactBtnEl.addEventListener("click", function () {
  const newFormGroupEl = document.createElement("div");
  const newIndex = contactCount++;
  newFormGroupEl.dataset.index = newIndex;
  newFormGroupEl.className = "form-group";
  newFormGroupEl.innerHTML = `
      <div class="form-field">
        <label for="name-${newIndex}" class="field-label">姓名</label>
        <input id="name-${newIndex}" type="text" class="name-input" placeholder="请输入姓名" required>
        <p class="error-msg"></p>
      </div>
      <div class="form-field">
        <label for="tel-${newIndex}" class="field-label">手机号</label>
        <input id="tel-${newIndex}" type="tel" class="tel-input" placeholder="请输入手机号" required>
        <p class="error-msg"></p>
      </div>
      <button class="delete-btn">删除</button>
  `;
  // 在buttons元素前插入联系人
  buttonsEl.parentNode.insertBefore(newFormGroupEl, buttonsEl);
  // 删除联系人
  newFormGroupEl
    .querySelector(".delete-btn")
    .addEventListener("click", function () {
      newFormGroupEl.remove();
    });
});

// 实时验证
formEl.addEventListener("input", (e) => {
  const inputEl = e.target;
  const errMsgEl = inputEl.nextElementSibling;

  if (inputEl.classList.contains("name-input")) {
    if (!inputEl.value.trim()) {
      inputEl.classList.add("error");
      errMsgEl.textContent = "姓名不能为空";
    } else {
      inputEl.classList.remove("error");
      errMsgEl.textContent = "";
    }
  }
  if (inputEl.classList.contains("tel-input")) {
    const telReg = /^1\d{10}$/;
    if (!telReg.test(inputEl.value)) {
      inputEl.classList.add("error");
      errMsgEl.textContent = "请输入有效手机号";
    } else {
      inputEl.classList.remove("error");
      errMsgEl.textContent = "";
    }
  }
});

// 表单提交
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  let contacts = [];
  let isValid = false;

  const formGroups = formEl.querySelectorAll(".form-group");

  formGroups.forEach((group) => {
    const nameEl = group.querySelector(".name-input");
    const telEl = group.querySelector(".tel-input");
    const name = nameEl.value.trim();
    const tel = telEl.value.trim();
    const nameErrorEl = nameEl.nextElementSibling;
    const telErrorEl = telEl.nextElementSibling;

    // 表单验证
    if (!name) {
      nameEl.classList.add("error");
      nameErrorEl.textContent = "名字不能为空";
      return;
    }

    const telReg = /^1\d{10}$/;
    if (!telReg.test(tel)) {
      telEl.classList.add("error");
      telErrorEl.textContent = "请输入有效手机号";
      return;
    }

    if (name && telReg.test(tel)) {
      contacts.push({ name, tel });
      isValid = true;
    }
  });

  if (isValid) {
    console.log("成功提交数据，提交联系人的数据为：", contacts);
    alert(`你已成功提交了${contacts.length}个联系人`);
    formEl.reset();
  }
});
