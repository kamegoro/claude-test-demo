import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { FormData } from "../types.js";

@customElement("form-view")
export class FormView extends LitElement {
  @property({ type: Object }) formData: FormData = {
    name: "",
    email: "",
    category: "general",
    message: "",
  };

  @state() private name = "";
  @state() private email = "";
  @state() private category: FormData["category"] = "general";
  @state() private message = "";

  @state() private touched = {
    name: false,
    email: false,
    message: false,
  };

  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.name = this.formData.name;
    this.email = this.formData.email;
    this.category = this.formData.category;
    this.message = this.formData.message;
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has("formData")) {
      this.name = this.formData.name;
      this.email = this.formData.email;
      this.category = this.formData.category;
      this.message = this.formData.message;
    }
  }

  private get nameError(): string {
    if (!this.name.trim()) return "お名前は必須です";
    if (this.name.length > 50) return "お名前は50文字以内で入力してください";
    return "";
  }

  private get emailError(): string {
    if (!this.email.trim()) return "メールアドレスは必須です";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email))
      return "正しいメールアドレスを入力してください";
    return "";
  }

  private get messageError(): string {
    if (!this.message.trim()) return "お問い合わせ内容は必須です";
    if (this.message.length < 10) return "10文字以上で入力してください";
    if (this.message.length > 500) return "500文字以内で入力してください";
    return "";
  }

  private get isValid(): boolean {
    return !this.nameError && !this.emailError && !this.messageError;
  }

  private handleBlur(field: "name" | "email" | "message") {
    this.touched = { ...this.touched, [field]: true };
  }

  private handleConfirm() {
    this.dispatchEvent(
      new CustomEvent<FormData>("form-confirm", {
        detail: {
          name: this.name,
          email: this.email,
          category: this.category,
          message: this.message,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <div class="bg-white rounded-lg shadow-md p-6 space-y-5">
        <!-- お名前 -->
        <div>
          <label
            for="name"
            class="block text-sm font-medium text-gray-700 mb-1"
            >お名前</label
          >
          <input
            id="name"
            type="text"
            maxlength="50"
            .value=${this.name}
            @input=${(e: Event) =>
              (this.name = (e.target as HTMLInputElement).value)}
            @blur=${() => this.handleBlur("name")}
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="山田 太郎"
          />
          ${this.touched.name && this.nameError
            ? html`<p class="text-red-600 text-xs mt-1">${this.nameError}</p>`
            : null}
        </div>

        <!-- メールアドレス -->
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 mb-1"
            >メールアドレス</label
          >
          <input
            id="email"
            type="email"
            .value=${this.email}
            @input=${(e: Event) =>
              (this.email = (e.target as HTMLInputElement).value)}
            @blur=${() => this.handleBlur("email")}
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="example@mail.com"
          />
          ${this.touched.email && this.emailError
            ? html`<p class="text-red-600 text-xs mt-1">${this.emailError}</p>`
            : null}
        </div>

        <!-- カテゴリ -->
        <div>
          <label
            for="category"
            class="block text-sm font-medium text-gray-700 mb-1"
            >カテゴリ</label
          >
          <select
            id="category"
            .value=${this.category}
            @change=${(e: Event) =>
              (this.category = (e.target as HTMLSelectElement)
                .value as FormData["category"])}
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="bug">バグ報告</option>
            <option value="feature">機能リクエスト</option>
            <option value="general">一般的なお問い合わせ</option>
          </select>
        </div>

        <!-- お問い合わせ内容 -->
        <div>
          <label
            for="message"
            class="block text-sm font-medium text-gray-700 mb-1"
            >お問い合わせ内容</label
          >
          <textarea
            id="message"
            rows="4"
            maxlength="500"
            .value=${this.message}
            @input=${(e: Event) =>
              (this.message = (e.target as HTMLTextAreaElement).value)}
            @blur=${() => this.handleBlur("message")}
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="お問い合わせ内容を入力してください（10〜500文字）"
          ></textarea>
          <div class="flex justify-between items-center mt-1">
            ${this.touched.message && this.messageError
              ? html`<p class="text-red-600 text-xs">${this.messageError}</p>`
              : html`<span></span>`}
            <span class="text-xs text-gray-400"
              >${this.message.length}/500</span
            >
          </div>
        </div>

        <!-- 確認ボタン -->
        <button
          @click=${this.handleConfirm}
          ?disabled=${!this.isValid}
          class="w-full py-2 px-4 rounded-md text-white font-medium text-sm transition-colors ${this
            .isValid
            ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            : "bg-gray-300 cursor-not-allowed"}"
        >
          確認する
        </button>
      </div>
    `;
  }
}
