// 获取按钮元素——用getElementById比querySelector性能更优？，适合当个元素
const button = document.getElementById("myButton");
// 绑定点击事件——用addEventListener而非onclick，支持绑定多个事件
button.addEventListener("click", function () {
  // console.log("this=", this); //console.log可以接受多个参数--显示为DOM元素的形式
  // console.dir(this); //console.dir 只接受一个参数--显示元素对象的属性列表

  // 切换active类（控制样式）——用classList.toggle切换类名，比直接改style更符合“样式与逻辑分离”原则。toggle()返回值：添加类时为true，移除类时为false
  const res = this.classList.toggle("active");
  // 根据类名状态修改文字——确保用户获得清晰的交互反馈（accessibility考虑）。this.classList.contains()也是一次DOM操作，因为这个DOM的方法
  // this.textContent = this.classList.contains("active") ? "已激活" : "点击切换";

  //这个对比11行的代码，符合性能优化和代码简洁性的原则。减少不必要的DOM操作，也使代码更易于维护。
  this.textContent = res ? "已激活" : "点击切换";
});
