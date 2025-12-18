import * as answers from "./answer.js";

let currentGameMode = null; // Will store 'classique' or 'historique'
let totalTime = 0; // Total time in seconds
let currentStageTimer = null; // Timer for current stage
let totalTimer = null; // Total game timer
let correctAnswers = 0;
let totalQuestions = 0;

function startGame(mode) {
  currentGameMode = mode;
  correctAnswers = 0;
  totalQuestions = 0;
  totalTime = 0;
  
  const modeSection = document.getElementById(mode);
  if (modeSection) {
    modeSection.classList.remove("hidden");
    // Show the first stage with mode prefix
    const firstStage = document.getElementById(`${mode}_stage1_pays`);
    if (firstStage) {
      firstStage.classList.remove("hidden");
      startStageTimer('pays', firstStage);
    }
  }
  
  // Start total timer (20 minutes max)
  startTotalTimer();
}

// Make functions available globally for onclick handlers
window.startGame = startGame;
window.getInputValue = getInputValue;

// Add Enter key support
document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      const activeElement = document.activeElement;
      if (activeElement.tagName === 'INPUT' && activeElement.type === 'text') {
        const inputId = activeElement.id;
        if (inputId && inputId.includes('_answer')) {
          getInputValue(inputId);
        }
      }
    }
  });
});

function match(string, expected) {
  // Normalize function to handle case, accents, and special characters
  const normalize = (str) => {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .replace(/[^a-z0-9\s]/g, "") // Remove special characters
      .trim()
      .replace(/\s+/g, " "); // Normalize whitespace
  };

  return normalize(string) == normalize(expected);
}

function showAnswer(stageElement, stageType, correctAnswer) {
  // Remove blur from personnage image if applicable
  if (stageType === 'personnage') {
    const images = stageElement.querySelectorAll('.picture img');
    images.forEach(img => img.classList.remove('blurred'));
  }
  
  // Create answer reveal element
  const answerReveal = document.createElement('div');
  answerReveal.className = 'answer-reveal';
  answerReveal.innerHTML = `
    <p class="answer-text">⏱️ ¡Tiempo agotado! La respuesta era: <strong>${correctAnswer}</strong></p>
  `;
  
  // Insert before the question div
  const questionDiv = stageElement.querySelector('.question');
  if (questionDiv) {
    questionDiv.parentNode.insertBefore(answerReveal, questionDiv);
    // Hide the input and button
    questionDiv.style.display = 'none';
  }
  
  // Auto-advance after 3 seconds
  setTimeout(() => {
    const inputId = stageElement.id + '_answer';
    autoAdvance(inputId, true); // true indicates timeout
  }, 3000);
}

function startStageTimer(stageType, stageElement) {
  stopStageTimer(); // Stop any existing timer
  
  const timerDisplay = stageElement.querySelector('.timer');
  if (!timerDisplay) return;
  
  const duration = stageType === 'pays' ? 30 : 300; // 30s for pays, 5min for personnage
  let timeRemaining = duration;
  
  const updateDisplay = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Add warning color when time is running out
    if (timeRemaining <= 10) {
      timerDisplay.style.color = '#ff4444';
    } else if (timeRemaining <= 30) {
      timerDisplay.style.color = '#ff9944';
    }
  };
  
  updateDisplay();
  
  currentStageTimer = setInterval(() => {
    timeRemaining--;
    updateDisplay();
    
    if (timeRemaining <= 0) {
      stopStageTimer();
      // Show answer after timeout
      const answerId = stageElement.id + '_answer';
      const correctAnswer = answers.answers[answerId];
      if (correctAnswer) {
        showAnswer(stageElement, stageType, correctAnswer);
      }
    }
  }, 1000);
}

function stopStageTimer() {
  if (currentStageTimer) {
    clearInterval(currentStageTimer);
    currentStageTimer = null;
  }
}

function startTotalTimer() {
  totalTime = 0;
  totalTimer = setInterval(() => {
    totalTime++;
    // Check if 20 minutes (1200 seconds) exceeded
    if (totalTime >= 1200) {
      endGame(false); // Defeat
    }
  }, 1000);
}

function stopTotalTimer() {
  if (totalTimer) {
    clearInterval(totalTimer);
    totalTimer = null;
  }
}

function autoAdvance(inputId, isTimeout = false) {
  // Only increment totalQuestions if not already incremented and it's a timeout
  if (isTimeout) {
    totalQuestions++;
  }
  
  const matchResult = inputId.match(/(classique|historique)_stage(\d+)_(pays|personnage)_answer/);
  
  if (matchResult) {
    const mode = matchResult[1];
    const stageNum = parseInt(matchResult[2]);
    const stageType = matchResult[3];
    let nextElementId;

    if (stageType === "pays") {
      nextElementId = `${mode}_stage${stageNum}_personnage`;
    } else if (stageType === "personnage") {
      if (stageNum < answers.number_of_stages) {
        nextElementId = `${mode}_stage${stageNum + 1}_pays`;
      } else {
        // Game complete
        endGame(true);
        return;
      }
    }

    const nextElement = document.getElementById(nextElementId);
    if (nextElement) {
      nextElement.classList.remove("hidden");
      const nextStageType = stageType === "pays" ? "personnage" : "pays";
      startStageTimer(nextStageType, nextElement);
      
      // Don't remove blur here - keep it until correct answer
    }
  }
}

function endGame(checkScore) {
  stopStageTimer();
  stopTotalTimer();
  
  let screenId;
  if (!checkScore || correctAnswers < totalQuestions / 2) {
    // Defeat
    screenId = 'defeat_screen';
  } else {
    // Victory
    screenId = `${currentGameMode}_end_screen`;
  }
  
  const endScreen = document.getElementById(screenId);
  if (endScreen) {
    endScreen.classList.remove('hidden');
    
    // Display score
    const scoreText = `Puntuación: ${correctAnswers}/${totalQuestions} - Tiempo: ${Math.floor(totalTime / 60)}:${(totalTime % 60).toString().padStart(2, '0')}`;
    const scoreElement = endScreen.querySelector('.score');
    if (scoreElement) {
      scoreElement.textContent = scoreText;
    }
  }
}

function getInputValue(inputId) {
  const inputValue = document.getElementById(inputId).value;
  
  console.log(`Input ID: ${inputId}, Value: ${inputValue}`);

  // Get the correct answer directly using the full inputId as key
  const correctAnswer = answers.answers[inputId];

  if (!correctAnswer) {
    console.error(`No answer found for ${inputId}`);
    return;
  }

  totalQuestions++;
  
  if (match(inputValue, correctAnswer)) {
    correctAnswers++;
    console.log("Correct answer!");
    
    // Determine the next stage to reveal
    let nextElementId;

    // Parse the mode, stage number and type from the input ID
    // Format: mode_stageX_type_answer (e.g., classique_stage1_pays_answer, historique_stage2_personnage_answer)
    const matchResult = inputId.match(/(classique|historique)_stage(\d+)_(pays|personnage)_answer/);
    
    if (matchResult) {
      const mode = matchResult[1];
      const stageNum = parseInt(matchResult[2]);
      const stageType = matchResult[3];

      if (stageType === "pays") {
        // After a pays question, show the personnage question of the same stage
        nextElementId = `${mode}_stage${stageNum}_personnage`;
      } else if (stageType === "personnage") {
        // After a personnage question, move to the next stage's pays question
        if (stageNum < answers.number_of_stages) {
          nextElementId = `${mode}_stage${stageNum + 1}_pays`;
        } else {
          // Game is complete
          endGame(true);
          return;
        }
      }
    }

    const nextElement = document.getElementById(nextElementId);
    if (nextElement) {
      stopStageTimer(); // Stop current timer
      
      // Remove blur from current personnage image if we answered correctly
      const currentElement = document.getElementById(inputId.replace('_answer', ''));
      if (currentElement && inputId.includes('personnage')) {
        const images = currentElement.querySelectorAll('.picture img');
        images.forEach(img => img.classList.remove('blurred'));
      }
      
      nextElement.classList.remove("hidden");
      console.log(`Showing: ${nextElementId}`);
      
      // Start timer for next stage
      const nextStageType = nextElementId.includes('_pays') ? 'pays' : 'personnage';
      startStageTimer(nextStageType, nextElement);
    } else {
      console.error(`Element not found: ${nextElementId}`);
    }
  } else {
    console.log("Incorrect answer");
    alert("¡Respuesta incorrecta, intenta de nuevo!");
  }
}
