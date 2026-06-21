import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("complete-view")
export class CompleteView extends LitElement {
  @property() submissionId = "";

  protected createRenderRoot() {
    return this;
  }

  private handleReset() {
    this.dispatchEvent(
      new CustomEvent("complete-reset", { bubbles: true, composed: true }),
    );
  }

  render() {
    return html`
      <div class="bg-white rounded-lg shadow-md p-6 text-center space-y-5">
        <div
          class="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center"
        >
          <svg
            class="w-6 h-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 class="text-xl font-semibold text-gray-800">
          送信が完了しました
        </h2>

        <p class="text-sm text-gray-500">
          受付番号:
          <span class="font-mono font-semibold text-gray-800"
            >${this.submissionId}</span
          >
        </p>

        <button
          @click=${this.handleReset}
          class="inline-block py-2 px-6 rounded-md bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors cursor-pointer"
        >
          新しいお問い合わせ
        </button>
      </div>
    `;
  }
}
