class AlertBox extends HTMLElement {
  static observedAttributes = ["type"];
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    // 定义模版
    const alertTemplate = document.createElement("template");
    alertTemplate.innerHTML = `
    <style>
      :host {
        display: block;
        border: 1px solid;
        border-radius: 4px;
        padding: 0.5rem;
        margin: 0.5rem 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 1rem;
        line-height: 1.5;
        border-color: var(--alert-border-color, #ddd);
        background-color: var(--alert-bg-color, #fff);
        color: var(--alert-text-color, #333);
      }

      :host([type="success"]) {
        background-color: var(--alert-success-bg, #f0fff4);
        border-color: var(--alert-success-border, #48bb78);
      }

      :host([type="error"]) {
        background-color: var(--alert-error-bg, #fff5f5);
        border-color: var(--alert-error-border, #f56565);
      }

      :host([type="warn"]) {
        --alert-border-color: #e6a23c;
        --alert-bg: #fdf6ec;
      }

      .container {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .icon {
        flex-shrink: 0;
        font-size: 1.25rem;
      }

      .content {
        flex: 1;
      }

      ::slotted(*) {
        margin: 0;
      }
    </style>

    <div class="container">
      <div class="icon">
        <slot name="icon" id="icon-slot">
          <span id="default-icon">✅</span>
        </slot>
      </div>
      <div class="content">
        <slot>默认提示信息</slot>
      </div>
    </div>
 `;
    const tempContent = alertTemplate.content.cloneNode(true);
    shadowRoot.appendChild(tempContent);

    // 获取默认图标的引用
    this.iconSlot = shadowRoot.getElementById("icon-slot");
    this.defaultIcon = shadowRoot.getElementById("default-icon");
  }

  // 组件挂载到DOM时调用
  connectedCallback() {
    // 确保属性type有效，默认为success
    if (!this.hasAttribute("type")) {
      this.type = "success";
    }
    this.updateIcon();

    this.iconSlot.addEventListener("slotchange", () =>
      this.updateIconVisibility()
    );
  }

  updateIcon() {
    const icons = {
      success: "✅",
      error: "❌",
      warn: "⚠️",
    };
    // 设置默认图标
    this.defaultIcon.textContent = icons[this.type];

    //更新图标可见性
    this.updateIconVisibility();
  }
  updateIconVisibility() {
    const hasCustomIcon = this.iconSlot.assignedNodes().length > 0;
    this.defaultIcon.style.display = hasCustomIcon ? "none" : "inline";
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "type" && oldValue !== newValue) {
      console.log(`Alert type changed from ${oldValue} to ${newValue}`);
      if (!["success", "error", "warn"].includes(newValue)) {
        console.warn(
          `alert-box的type属性值“${newValue}”无效，必须是"success", "error", "warn"中一个`
        );
        this.type = "success";
        return;
      }

      this.updateIcon();
    }
  }

  // type属性的getter
  get type() {
    return this.getAttribute("type");
  }

  // type属性的setter，确保属性与特性同步
  set type(value) {
    this.setAttribute("type", value);
  }
}

customElements.define("alert-box", AlertBox);

export default AlertBox;
