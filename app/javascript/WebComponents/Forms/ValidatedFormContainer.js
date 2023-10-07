export class ValidatedFormContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.shadowRoot.querySelectorAll('validated-input, validated-textarea, validated-number-input').forEach(el => {
      el.addEventListener('input', () => this.updateButtonState());
    });

    this.shadowRoot.querySelectorAll('validated-select').forEach(el => {
      el.addEventListener('change', () => this.updateButtonState());
    })

    this.updateButtonState();

    const submitButton = this.shadowRoot.querySelector('button');
    submitButton.addEventListener('click', () => this.submitForm());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelectorAll('validated-input, validated-textarea, validated-number-input').forEach(el => {
      el.removeEventListener('input', () => this.updateButtonState());
    })

    this.shadowRoot.querySelectorAll('validated-select').forEach(el => {
      el.removeEventListener('change', () => this.updateButtonState());
    })

    const submitButton = this.shadowRoot.querySelector('button');
    submitButton.removeEventListener('click', () => this.submitForm());
  }

  render() {
    this.shadowRoot.innerHTML = `
                <validated-input name="name" data-required="true" label="名前" data-maxlength="100"></validated-input>
                <validated-input name="nickname" data-required="true" label="ニックネーム" data-maxlength="100"></validated-input>
                <validated-textarea name="introduction" label="自己紹介"></validated-textarea>
                <validated-number-input name="age" label="年齢" min="0" max="99"></validated-number-input>
                <validated-input name="schoolName" label="学校名"></validated-input>
                <validated-select name="gender" label="性別">
                  <option value="default" selected>選択してください</option>
                  <option value="male">男性</option>
                  <option value="female">女性</option>
                  <option value="other">その他</option>
                </validated-select>
                <button type="button" disabled>送信</button>
            `;
  }

  updateButtonState() {
    const allValid = Array.from(this.shadowRoot.querySelectorAll('[data-valid="false"]')).length === 0;
    this.shadowRoot.querySelector('button').disabled = !allValid;
  }
  async submitForm() {
    const data = {};

    // すべてのvalidated-input、validated-textarea、validated-number-input、validated-selectを取得
    const inputs = this.shadowRoot.querySelectorAll('validated-input, validated-textarea, validated-number-input, validated-select');

    inputs.forEach(input => {
      data[input.name] = input.value;
    });


    // リアルタイムバリデーションを行う、

    //formを送信するようにする？

    // try {
    //   const response = await fetch('YOUR_API_ENDPOINT', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    //   });

    //   if (!response.ok) {
    //     const responseData = await response.json();
    //     if (responseData.errors) {
    //       for (let [key, value] of Object.entries(responseData.errors)) {
    //         const element = this.shadowRoot.querySelector(`validated-input[label="${key}"], validated-textarea[label="${key}"], validated-number-input[label="${key}"], validated-select[label="${key}"]`);
    //         if (element) {
    //           element.error = value.join(' '); // エラー内容を連結して表示
    //         }
    //       }
    //     }
    //   }

    // } catch (error) {
    //   console.error('Error submitting the form:', error);
    // }
  }
}
