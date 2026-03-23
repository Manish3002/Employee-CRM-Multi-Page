

$(document).ready(function () {


  const urlParams  = new URLSearchParams(window.location.search);
  const empId      = parseInt(urlParams.get("id"));  


  const employees  = loadEmployees();


  const emp = employees.find(function (e) { return e.id === empId; });


  if (!emp) {
    $("#profile-content").html(`
      <div class="alert alert-danger">
        Employee not found. Please go back to the
        <a href="Employees.html">Employees page</a>.
      </div>
    `);
    return;  // stop running the rest of the code
  }

  $("#profile-name").text(emp.name);
  $("#profile-role").text(emp.role + " | " + emp.department);


  const badgeClass = emp.status === "Active" ? "bg-success" : "bg-secondary";
  $("#profile-status").text(emp.status).addClass(badgeClass);


  $("#detail-id").text(emp.id);
  $("#detail-dept").text(emp.department);
  $("#detail-role").text(emp.role);
  $("#detail-status").text(emp.status);


  const clientList = $("#client-list");
  emp.clients.forEach(function (client, index) {
    clientList.append(`<li>${client}</li>`);
  });

 
  const perf = emp.performance;
  $("#performance-bar")
    .css("width", perf + "%")
    .attr("aria-valuenow", perf)
    .text(perf + "%");

 
  if (perf >= 80) {
    $("#performance-bar").removeClass().addClass("progress-bar bg-success");
  } else if (perf >= 60) {
    $("#performance-bar").removeClass().addClass("progress-bar bg-warning");
  } else {
    $("#performance-bar").removeClass().addClass("progress-bar bg-danger");
  }

  // ---- Assessment section ----

  const savedScore      = localStorage.getItem("lastAssessmentScore");
  const savedPercentage = localStorage.getItem("lastAssessmentPercentage");
  const savedGrade      = localStorage.getItem("lastAssessmentGrade");
  const savedDate       = localStorage.getItem("lastAssessmentDate");

  if (savedScore !== null) {
   
    $("#assessment-score").text(savedScore + " / " + quizQuestions.length);
    $("#assessment-percentage").text(savedPercentage + "%");
    $("#assessment-grade").text(savedGrade);
    $("#assessment-date").text(savedDate);

 
    $("#assessment-bar")
      .css("width", savedPercentage + "%")
      .attr("aria-valuenow", savedPercentage)
      .text(savedPercentage + "%");
  } else {

    $("#assessment-section").html(`
      <p class="text-muted">No assessment taken yet.
        <a href="Assessment.html">Take Assessment →</a>
      </p>
    `);
  }


  $("#breadcrumb-name").text(emp.name);

});
