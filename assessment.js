

$(document).ready(function () {

  // ---- Step 1: Show spinner, then load questions ----
  $("#loading-spinner").show();
  $("#quiz-container").hide();

  async function loadQuiz() {
    // simulateDataLoad is in app.js – waits 1 second then returns data
    const questions = await simulateDataLoad(quizQuestions);

    $("#loading-spinner").hide();
    $("#quiz-container").show();

    renderQuiz(questions);
  }

  loadQuiz();


  function renderQuiz(questions) {
    const container = $("#questions-wrapper");
    container.empty();


    questions.forEach(function (q, index) {
   
      let optionsHtml = "";

      q.options.forEach(function (option, optIndex) {
      
        optionsHtml += `
          <div class="form-check">
            <input class="form-check-input" type="radio"
              name="question_${index}"
              id="q${index}_opt${optIndex}"
              value="${optIndex}">
            <label class="form-check-label" for="q${index}_opt${optIndex}">
              ${option}
            </label>
          </div>
        `;
      });

      const questionCard = `
        <div class="quiz-card">
          <p class="question-text">Q${index + 1}. ${q.question}</p>
          ${optionsHtml}
        </div>
      `;
      container.append(questionCard);
    });
  }

  
  $("#submitQuiz").click(function () {
    calculateScore();
  });

  // ---- Calculate Score ----
  function calculateScore() {
    let score = 0;
    let unanswered = 0;

    quizQuestions.forEach(function (q, index) {
      // $("input[name=...]") selects the radio button group
      const selected = $(`input[name="question_${index}"]:checked`).val();

      if (selected === undefined) {
        unanswered++;   
      } else if (parseInt(selected) === q.correct) {
        score++;       
      }
    });

    if (unanswered > 0) {
      showAlert("warning", `Please answer all questions. You missed ${unanswered} question(s).`);
      return; 
    }

    // Calculate percentage
    const total      = quizQuestions.length;
    const percentage = Math.round((score / total) * 100);
    const grade      = calculateGrade(percentage);
    const passed     = isPassed(percentage);
    const feedback   = getPerformanceFeedback(grade);

    // ---- Save result to localStorage ----
    localStorage.setItem("lastAssessmentScore", score);
    localStorage.setItem("lastAssessmentPercentage", percentage);
    localStorage.setItem("lastAssessmentGrade", grade);
    localStorage.setItem("lastAssessmentDate", new Date().toLocaleDateString());

    // ---- Display the result ----
    showResult(score, total, percentage, grade, passed, feedback);

    // Disable the submit button so user can't re-submit
    $("#submitQuiz").prop("disabled", true).text("Submitted ✓");
  }

  // ---- Show result section ----
  function showResult(score, total, percentage, grade, passed, feedback) {
    // Pick color based on pass/fail
    const resultClass = passed ? "alert-success" : "alert-danger";
    const statusText  = passed ? "✅ PASSED" : "❌ FAILED";

    const resultHtml = `
      <div class="alert ${resultClass} mt-3" role="alert">
        <h4 class="alert-heading">${statusText}</h4>
        <hr>
        <p><strong>Score:</strong> ${score} / ${total}</p>
        <p><strong>Percentage:</strong> ${percentage}%</p>
        <p><strong>Grade:</strong> ${grade}</p>
        <p><strong>Feedback:</strong> ${feedback}</p>
      </div>
    `;

  
    const resultsDiv = $("#quiz-results");
    resultsDiv.html(resultHtml).show();

    $("html, body").animate({ scrollTop: resultsDiv.offset().top - 80 }, 500);
  }

 
  function showAlert(type, message) {
    const alertHtml = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
   
    $("#quiz-container").prepend(alertHtml);
  }

  // ---- Retake quiz button ----
  
  $(document).on("change", "input[type=radio]", function () {
    $("#submitQuiz").prop("disabled", false).text("Submit Quiz");
    $("#quiz-results").hide();
  });

});
