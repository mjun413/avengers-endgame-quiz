let questionNum = 0;
let score = 0;

function registerStartButtonEvent() {
  $('#quiz-start-button').on('click', function(event) {
    $(".quiz-start").hide();
    $('#question-answer-form').html(generateQuizQuestions());
    $('#question-answer-form').show();
    $('#question-number').text(questionNum + 1);
    registerSubmitButtonEvent();
  });
}

function generateQuizQuestions() {
  return `
  <div id="quiz-questions">
    <h2 id="question-texts">${STORE[questionNum].question}</h2>
    <form id="question-form">
      <fieldset class="answer-container">
        <label class="answer-choices">
          <input type="radio" value="${STORE[questionNum].answer[0]}" name="answer" required>
          <span>${STORE[questionNum].answer[0]}</span>
        </label>
        <label class="answer-choices">
          <input type="radio" value="${STORE[questionNum].answer[1]}" name="answer" required>
          <span>${STORE[questionNum].answer[1]}</span>
        </label>
        <label class="answer-choices">
          <input type="radio" value="${STORE[questionNum].answer[2]}" name="answer" required>
          <span>${STORE[questionNum].answer[2]}</span>
        </label>
        <label class="answer-choices">
          <input type="radio" value="${STORE[questionNum].answer[3]}" name="answer" required>
          <span>${STORE[questionNum].answer[3]}</span>
        </label>
        <label class="sumbit">
        <input type="submit" value="Submit" class="submit"> 
        </label>
      </fieldset>
    </form>
    </div>`;
}

function showResults() {
  if (score === 10) {
    $('#question-answer-form').html(`<div class="high-score"><p class="final-score"><b>Your score is: ${score}</b></p><img id="high-score-icon" src="https://media.giphy.com/media/fnpxKUa2yhrUabpxdC/giphy.gif" alt="infinity gloves giving thumbs up"><p class="final-results"><b>Amazing! You are an Avengers super fan as you know every detail of their stories!</b></p><button type=button class="restart-button">Restart</button></div>`);
  } else if (score >= 6) {
    $('#question-answer-form').html(`<div class="medium-score"><p class="final-score"><b>Your score is: ${score}</b></p><img id="medium-score-icon" src="https://media.giphy.com/media/fnpxKUa2yhrUabpxdC/giphy.gif" alt="infinity gloves giving thumbs up"><p class="final-results"><b>Good work! You are surely an Avengers fan! Watch the movie one more time may help with filling some knowledge gaps!</b></p><button type=button class="restart-button">Restart</button></div>`);
  } else {
    $('#question-answer-form').html(`<div class="low-score"><p class="final-score"><b>Your score is: ${score}</b></p><img id="low-score-icon" src="https://media.giphy.com/media/gMZziYFpqJSjS/giphy.gif" alt="Captain America glazing"><p class="final-results"><b>No worries. Watch the movie one more time will help you get to know the heros more!</b></p><button type=button class="restart-button">Restart</button></div>`);
  }
  registerRestartQuizButton();
}

function next() {
  if (questionNum < STORE.length - 1) {
    showNextQuestion();
  } else {
    showResults();
  }
}

function showNextQuestion() {
    questionNum++;
    $('#question-number').text(questionNum + 1);
    $('#question-answer-form').html(generateQuizQuestions());
}

function registerSubmitButtonEvent() {
  $('#question-form').submit(function(event) {
    event.preventDefault();
    let userAnswerValue = $('input[name=answer]:checked').val();
    let correctAnswerValue= `${STORE[questionNum].correctAnswer}`;
    if (userAnswerValue === correctAnswerValue) {
      correctAnswerScreen();
      updateQuizScore();
      registerNextQuestionEvent();
    } else {
      showWrongAnswerScreen();
    }
  });
}

function correctAnswerScreen() {
    $('#question-answer-form').html(`
      <div class="correct-answer-screen"><img class="feeback-icon-correct" src="https://media2.giphy.com/media/2cleOD8vjmCWY/giphy.gif" alt="Ironman Helmet"><p><b>Your answer is correct!</b></p><button type=button class="nextButton">Next</button></div>`);
}

function updateQuizScore() {
  score++;
  $('#score').text(score);
}

function showWrongAnswerScreen() {
  let correctAnswer = `${STORE[questionNum].correctAnswer}`;
  $('#question-answer-form').html(`
    <div class="wrong-answer-screen"><img class="feeback-icon-wrong" src="https://media.tenor.com/images/95503a69448b6520e570eb621620a6c2/tenor.gif" alt="Dancing Thanos"><p><b>Your answer is wrong. The correct answer is "<span>${correctAnswer}</span>".</b></p><button type=button class="nextButton">Next</button></div>`);
  registerNextQuestionEvent();
}

function registerNextQuestionEvent() {
  $(".nextButton").click(function(){
    next();
    registerSubmitButtonEvent();
  });
}

function registerRestartQuizButton() {
  $('.restart-button').click(function(event) {
    location.reload();
  });
}

function initQuiz() {
  registerStartButtonEvent();
}

$(initQuiz);