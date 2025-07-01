function toggleDropdown(id) {
  const content = document.getElementById(id);
  content.style.display = (content.style.display === 'block') ? 'none' : 'block';
}

function showQuiz() {
  document.getElementById('video-section').style.display = 'none';
  document.getElementById('map-section').style.display = 'none';
  document.getElementById('quiz-section').style.display = 'block';
}



function submitQuiz() {
  let score = 0;
  const q1 = document.querySelector('input[name="q1"]:checked');
  const q2 = document.querySelector('input[name="q2"]:checked');

  if (q1 && q1.value === 'B') score++;
  if (q2 && q2.value === 'B') score++;

  document.getElementById('quiz-form').style.display = 'none';
  document.getElementById('quiz-result').style.display = 'block';
  document.getElementById('score').textContent = score;
}



function toggleMenu() {
  const sidebar = document.getElementById('sidebar');
  const btn = document.querySelector('.toggle-btn');

  sidebar.classList.toggle('collapsed');

  // بدل العلامة حسب الحالة
  btn.textContent = sidebar.classList.contains('collapsed') ? '+' : '−';
}


function showMap() {
  document.getElementById('video-section').style.display = 'none';
  document.getElementById('quiz-section').style.display = 'none';
  document.getElementById('map-section').style.display = 'block';
}

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

  document.getElementById('map-section').style.display = 'none';
  document.getElementById('quiz-section').style.display = 'none';

  currentVideoIndex = videoOrder.indexOf(topic);

  const videoIds = {
    'intro-bio': 'W6NZfCO5SIk',
    'scientific-method': 'EwJtZpzKD3o',
    'biologists-do': 'tVm1KsqQ4FI',
    'life-organized': 'gg5Ncc9GODY',
    'intro-astronomy': '8qSnUmKp9bU',
    'naked-eye': '6kYdlLpCLqE',
    'cycles-sky': '0g7HlhQ4aZI',
    'moon-phases': 'OZIB_leg75Q',
    'climate-change': 'G4H1N_yXBiA',
    'climate-science': 'ffjIyms1BX4',
    'glaciers': '3jFzEVeS6aY'
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


  