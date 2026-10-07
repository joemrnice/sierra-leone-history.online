/* ==========================================================================
   Sierra Leone Historical Knowledge Center - Educational Quiz Engine
   ========================================================================== */

const SLQuiz = {
  questions: [
    {
      q: "In what year did Portuguese navigator Pedro de Sintra name the peninsula 'Serra Leoa'?",
      options: ["1462", "1508", "1670", "1787"],
      answer: 0,
      explanation: "Pedro de Sintra sailed into the peninsula harbor in 1462 and recorded the mountainous area as Serra Leoa (Lion Mountains)."
    },
    {
      q: "Which paramount chief led the northern guerrilla resistance during the 1898 Hut Tax War?",
      options: ["Madam Yoko", "Bai Bureh", "Sengbe Pieh", "Kai Londo"],
      answer: 1,
      explanation: "Paramount Chief Bai Bureh of Kasseh led the northern armed opposition against Governor Cardew's direct hut tax in 1898."
    },
    {
      q: "When did Sierra Leone gain full sovereign independence from Great Britain?",
      options: ["27 April 1951", "27 April 1961", "12 October 1967", "18 January 2002"],
      answer: 1,
      explanation: "Sierra Leone achieved sovereign independence on 27 April 1961 under Prime Minister Sir Milton Margai."
    },
    {
      q: "Which institution established in Freetown in 1827 became known as the 'Athens of West Africa'?",
      options: ["Bo School", "Fourah Bay College", "Albert Academy", "Njala University"],
      answer: 1,
      explanation: "Fourah Bay College, established in 1827 by the CMS, was the first Western university-level institution in West Africa."
    }
  ],

  currentIndex: 0,
  score: 0,

  init() {
    const container = document.getElementById('quiz-container');
    if (!container) return;
    this.renderQuestion(container);
  },

  renderQuestion(container) {
    if (this.currentIndex >= this.questions.length) {
      this.renderResults(container);
      return;
    }

    const current = this.questions[this.currentIndex];
    container.innerHTML = `
      <div class="card">
        <div class="card-meta">
          <span class="badge badge-primary">Question ${this.currentIndex + 1} of ${this.questions.length}</span>
        </div>
        <h3 class="card-title" style="margin-bottom: 1.25rem;">${current.q}</h3>
        <div class="quiz-options" style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
          ${current.options.map((opt, i) => `
            <button class="btn-quiz-opt btn-icon" style="justify-content: flex-start; padding: 0.85rem 1.25rem; font-size: 1rem; width: 100%; text-align: left;" data-index="${i}">
              ${opt}
            </button>
          `).join('')}
        </div>
        <div id="quiz-feedback" style="display: none; padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1rem;"></div>
        <button id="next-quiz-btn" class="search-btn" style="display: none;">Next Question →</button>
      </div>
    `;

    container.querySelectorAll('.btn-quiz-opt').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const selected = parseInt(e.currentTarget.getAttribute('data-index'));
        this.checkAnswer(container, selected);
      });
    });
  },

  checkAnswer(container, selected) {
    const current = this.questions[this.currentIndex];
    const feedback = container.querySelector('#quiz-feedback');
    const nextBtn = container.querySelector('#next-quiz-btn');

    container.querySelectorAll('.btn-quiz-opt').forEach(b => b.disabled = true);

    if (selected === current.answer) {
      this.score++;
      feedback.style.backgroundColor = 'var(--badge-primary-bg)';
      feedback.style.color = 'var(--badge-primary-text)';
      feedback.innerHTML = `<strong>Correct!</strong> ${current.explanation}`;
    } else {
      feedback.style.backgroundColor = '#fce8e6';
      feedback.style.color = '#c5221f';
      feedback.innerHTML = `<strong>Incorrect.</strong> ${current.explanation}`;
    }

    feedback.style.display = 'block';
    nextBtn.style.display = 'inline-block';

    nextBtn.addEventListener('click', () => {
      this.currentIndex++;
      this.renderQuestion(container);
    });
  },

  renderResults(container) {
    container.innerHTML = `
      <div class="card" style="text-align: center; padding: 2.5rem;">
        <span class="badge badge-archival" style="margin-bottom: 1rem;">Quiz Completed</span>
        <h3 class="card-title">Your Score: ${this.score} / ${this.questions.length}</h3>
        <p class="card-body" style="margin: 1rem 0;">${this.score === this.questions.length ? 'Exceptional historical knowledge!' : 'Good effort! Review the historical timeline and directories to deepen your understanding.'}</p>
        <button id="retry-quiz-btn" class="search-btn">Retry Quiz</button>
      </div>
    `;

    container.querySelector('#retry-quiz-btn').addEventListener('click', () => {
      this.currentIndex = 0;
      this.score = 0;
      this.renderQuestion(container);
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  SLQuiz.init();
});
