import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { FormData } from "../types.js";
import { categoryLabels } from "../types.js";

@customElement("confirm-view")
export class ConfirmView extends LitElement {
  @property({ type: Object }) formData!: FormData;
  @state() private submitting = false;

  protected createRenderRoot() {
    return this;
  }

  private handleBack() {
    this.dispatchEvent(
      new CustomEvent("confirm-back", { bubbles: true, composed: true }),
    );
  }

  private async handleSubmit() {
    this.submitting = true;
    await new Promise((resolve) => setTimeout(resolve, 1500));
    this.submitting = false;
    this.dispatchEvent(
      new CustomEvent("confirm-submit", { bubbles: true, composed: true }),
    );
  }

  render() {
    const rows = [
      { label: "お名前", value: this.formData.name },
      { label: "メールアドレス", value: this.formData.email },
      {
        label: "カテゴリ",
        value: categoryLabels[this.formData.category],
      },
      { label: "お問い合わせ内容", value: this.formData.message },
    ];

    return html`
      <div class="bg-white rounded-lg shadow-md p-6 space-y-5">
        <h2 class="text-lg font-semibold text-gray-800">入力内容の確認</h2>

        <dl class="divide-y divide-gray-100">
          ${rows.map(
            (row) => html`
              <div class="py-3">
                <dt class="text-xs font-medium text-gray-500">
                  ${row.label}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                  ${row.value}
                </dd>
              </div>
            `,
          )}
        </dl>

        <div class="flex gap-3">
          <button
            @click=${this.handleBack}
            ?disabled=${this.submitting}
            class="flex-1 py-2 px-4 rounded-md border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
          >
            戻る
          </button>
          <button
            @click=${this.handleSubmit}
            ?disabled=${this.submitting}
            class="flex-1 py-2 px-4 rounded-md bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
          >
            ${this.submitting
              ? html`
                  <svg
                    class="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  送信中...
                `
              : "送信する"}
          </button>
        </div>
      </div>
    `;
  }
}
