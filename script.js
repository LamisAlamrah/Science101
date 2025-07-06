function toggleDropdown(id) {
  const content = document.getElementById(id);
  content.style.display = (content.style.display === 'block') ? 'none' : 'block';
}

function toggleMenu() {
  const sidebar = document.getElementById('sidebar');
  const btn = document.querySelector('.toggle-btn');
  sidebar.classList.toggle('collapsed');
  btn.textContent = sidebar.classList.contains('collapsed') ? '+' : '−';
}

function showMap() {
  document.getElementById('video-section').style.display = 'none';
  document.getElementById('quiz-section').style.display = 'none';
  document.getElementById('map-section').style.display = 'block';
}

// ====================== ✅ QUIZ FUNCTIONALITY ====================== //

function showQuiz(topic) {
  const quiz = quizzes[topic];
  if (!quiz) {
    alert("Quiz not found.");
    return;
  }

  // Hide other sections
  document.getElementById('video-section').style.display = 'none';
  document.getElementById('map-section').style.display = 'none';

  // Prepare quiz elements
  const section = document.getElementById("quiz-section");
  const title = document.getElementById("quiz-title");
  const form = document.getElementById("quiz-form");
  const result = document.getElementById("quiz-result");

  section.style.display = "block";
  title.textContent = quiz.title;
  form.innerHTML = '';  // Clear the form before loading questions
  result.style.display = "none";

  // Set the current question index to 0
  form.dataset.currentQuestion = 0;
  form.dataset.topic = topic;

  // Load the first question
  loadQuestion(quiz, 0);
}

function loadQuestion(quiz, index) {
  const form = document.getElementById("quiz-form");
  const questionObj = quiz.questions[index];

  form.innerHTML = `
    <div class="quiz-question">
      <p class="quiz-question-text">${index + 1}. ${questionObj.question}</p>
      <div class="quiz-options">
        ${Object.entries(questionObj.options).map(([key, val]) => `
          <label class="quiz-option">
            <input type="radio" name="option" value="${key}"> ${key}. ${val}
          </label>
        `).join('')}
      </div>
      <div class="quiz-submit-container">
        <button type="button" class="quiz-submit-btn" onclick="submitQuiz()">Submit</button>
      </div>
    </div>
  `;
}

function submitQuiz() {
  const form = document.getElementById("quiz-form");
  const topic = form.dataset.topic;
  const quiz = quizzes[topic];
  let current = parseInt(form.dataset.currentQuestion);

  const selected = form.querySelector('input[name="option"]:checked');
  const correct = quiz.questions[current].correct;

  if (!selected) {
    showAlert("⚠️ Please choose an option!");
    return;
  }

  if (selected.value === correct) {
    showAlert("✅ Correct answer!");
    current++;
    if (current < quiz.questions.length) {
      form.dataset.currentQuestion = current;
      setTimeout(() => loadQuestion(quiz, current), 800);
    } else {
      document.getElementById("quiz-form").style.display = "none";
      document.getElementById("quiz-result").style.display = "block";
      document.getElementById("score").textContent = `${quiz.questions.length}/${quiz.questions.length}`;
    }
  } else {
    showAlert("❌ Incorrect, try again!");
  }
}

function showAlert(message) {
  document.getElementById("alertMessage").textContent = message;
  document.getElementById("customAlert").classList.add("active");
  document.body.style.overflow = 'hidden';
}

function closeAlert() {
  document.getElementById("customAlert").classList.remove("active");
  document.body.style.overflow = 'auto';
}


// ====================== ✅ VIDEO FUNCTIONALITY ====================== //

const videoOrder = [
  'intro-bio', 'scientific-method', 'biologists-do', 'life-organized',
  'intro-astronomy', 'naked-eye', 'cycles-sky', 'moon-phases',
  'climate-change', 'climate-science', 'glaciers'
];

let currentVideoIndex = -1;

function loadVideo(topic) {
  const videoContainer = document.getElementById('youtube-video-container');
  const videoSection = document.getElementById('video-section');

  videoSection.style.display = 'block';
  document.getElementById('quiz-section').style.display = 'none';
  document.getElementById('map-section').style.display = 'none';

  const titleElement = document.getElementById('video-title');
  const topicTitles = {
    'intro-bio': 'Introduction to Biology',
    'scientific-method': 'The Scientific Method',
    'biologists-do': 'What Biologists Do',
    'life-organized': 'How Life is Organized',
    'intro-astronomy': 'Introduction to Astronomy',
    'naked-eye': 'Naked Eye Observations',
    'cycles-sky': 'Cycles in the Sky',
    'moon-phases': 'Moon Phases',
    'climate-change': 'What is Climate Change?',
    'climate-science': 'Climate Science',
    'glaciers': 'What Are Glaciers'
  };

  if (titleElement && topicTitles[topic]) {
    titleElement.textContent = topicTitles[topic];
  }

  currentVideoIndex = videoOrder.indexOf(topic);

  const videoIds = {
    'intro-bio': 'tZE_fQFK8EY',
    'scientific-method': 'xOLcZMw0hd4',
    'biologists-do': 'rgZhDoPgzK8',
    'life-organized': 'cjR5zPrVjTc',
    'intro-astronomy': 'sViAwfeMjV0',
    'naked-eye': 'L-Wtlev6suc',
    'cycles-sky': '01QWC-rZcfE',
    'moon-phases': 'AQ5vty8f9Xc',
    'climate-change': 'tMwFNMfjFuU',
    'climate-science': 'LsFdROZ2OdA',
    'glaciers': 'mkt-0ZuTKXU'
  };

  const videoId = videoIds[topic];

  if (videoId) {
    const hasNext = currentVideoIndex < videoOrder.length - 1;

    const continueBtnHTML = hasNext
      ? `<div id="continue-btn-container">
          <button class="continue-btn" onclick="goToNextVideo()">Continue ▶</button>
        </div>`
      : '';

    videoContainer.innerHTML = `
      <iframe width="100%" height="400"
        src="https://www.youtube.com/embed/${videoId}"
        frameborder="0" allowfullscreen></iframe>
      ${continueBtnHTML}
    `;
  }
}

function goToNextVideo() {
  if (currentVideoIndex >= 0 && currentVideoIndex < videoOrder.length - 1) {
    const nextTopic = videoOrder[currentVideoIndex + 1];
    loadVideo(nextTopic);
  } else {
    alert("You're done! 🎉 No more videos.");
  }
}

// ====================== ✅ QUIZZES DATA ====================== //

const quizzes = {
  'biology-quiz': {
    title: "Biology Section Quiz",
    questions: [
      {
        question: "What is the scientific method used for?",
        options: {
          A: "To memorize facts",
          B: "To test hypotheses",
          C: "To ignore data"
        },
        correct: "B"
      },
      {
        question: "What do biologists study?",
        options: {
          A: "Planets",
          B: "Chemicals",
          C: "Living organisms"
        },
        correct: "C"
      },
      {
        question: "Which is the correct order of biological organization?",
        options: {
          A: "Cell → Tissue → Organ",
          B: "Organ → Tissue → Cell",
          C: "Organism → Organ → Molecule"
        },
        correct: "A"
      }
    ]
  },

  'astronomy-quiz': {
    title: "Astronomy Section Quiz",
    questions: [
      {
        question: "What does astronomy study?",
        options: {
          A: "Living organisms",
          B: "Earth's oceans",
          C: "Celestial bodies"
        },
        correct: "C"
      },
      {
        question: "Which object is NOT a planet?",
        options: {
          A: "Mars",
          B: "Pluto",
          C: "The Moon"
        },
        correct: "C"
      },
      {
        question: "What causes moon phases?",
        options: {
          A: "Earth’s rotation",
          B: "Moon's rotation around Earth",
          C: "Sun moving around Earth"
        },
        correct: "B"
      }
    ]
  },

  'environment-quiz': {
    title: "Environmental Science Quiz",
    questions: [
      {
        question: "Which gas is a major contributor to climate change?",
        options: {
          A: "Oxygen",
          B: "Carbon Dioxide",
          C: "Nitrogen"
        },
        correct: "B"
      },
      {
        question: "What is the greenhouse effect?",
        options: {
          A: "A way to grow plants",
          B: "Trapping heat in Earth’s atmosphere",
          C: "The melting of ice caps"
        },
        correct: "B"
      },
      {
        question: "Which of these is a renewable energy source?",
        options: {
          A: "Coal",
          B: "Natural Gas",
          C: "Solar Energy"
        },
        correct: "C"
      }
    ]
  }
};



  