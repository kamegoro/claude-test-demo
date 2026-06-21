import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { FormData, ViewState } from "./types.js";

@customElement("app-root")
export class AppRoot extends LitElement {
  @state() private currentView: ViewState = "form";
  @state() private formData: FormData = {
    name: "",
    email: "",
    category: "general",
    message: "",
  };
  @state() private submissionId = "";

  protected createRenderRoot() {
    return this;
  }

  private handleConfirm(e: CustomEvent<FormData>) {
    this.formData = e.detail;
    this.currentView = "confirm";
  }

  private handleBack() {
    this.currentView = "form";
  }

  private handleSubmit() {
    const now = new Date();
    const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
    const hexPart = Math.floor(Math.random() * 0xffff)
      .toString(16)
      .padStart(4, "0");
    this.submissionId = `SUB-${datePart}-${hexPart}`;
    this.currentView = "complete";
  }

  private handleReset() {
    this.formData = {
      name: "",
      email: "",
      category: "general",
      message: "",
    };
    this.submissionId = "";
    this.currentView = "form";
  }

  render() {
    return html`
      <div class="w-full max-w-lg mx-auto">
        <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">
          お問い合わせフォーム
        </h1>

        ${this.currentView === "form"
          ? html`<form-view
              .formData=${this.formData}
              @form-confirm=${this.handleConfirm}
            ></form-view>`
          : this.currentView === "confirm"
            ? html`<confirm-view
                .formData=${this.formData}
                @confirm-back=${this.handleBack}
                @confirm-submit=${this.handleSubmit}
              ></confirm-view>`
            : html`<complete-view
                .submissionId=${this.submissionId}
                @complete-reset=${this.handleReset}
              ></complete-view>`}
      </div>
    `;
  }
}
