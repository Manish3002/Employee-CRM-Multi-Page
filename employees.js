

$(document).ready(function () {

  
  $("#loading-spinner").show();
  $("#employees-table-wrapper").hide();

  async function loadPage() {
    const employees = await simulateDataLoad(loadEmployees());
    $("#loading-spinner").hide();
    $("#employees-table-wrapper").show();
    renderEmployeeTable(employees);
  }

  loadPage();

-
  $("#show-add-form-btn").on("click", function () {
    $("#employees-table-wrapper").hide();
    $("#show-add-form-btn").hide();   
    $("#add-employee-form").show();
  });

  $("#cancel-add-btn").on("click", function () {
    $("#add-employee-form").hide();
    $("#add-employee-form form")[0].reset();  
    $("#employees-table-wrapper").show();
    $("#show-add-form-btn").show();
  });

 
  $("#save-employee-btn").on("click", function () {

    const name        = $("#emp-name").val().trim();
    const department  = $("#emp-department").val();
    const role        = $("#emp-role").val().trim();
    const performance = parseInt($("#emp-performance").val());
    const status      = $("#emp-status").val();
    const clientsText = $("#emp-clients").val().trim();

 
    if (!name || !department || !role || !clientsText || isNaN(performance)) {
      alert("Please fill in all fields!");
      return;
    }


    if (performance < 0 || performance > 100) {
      alert("Performance must be between 0 and 100!");
      return;
    }

   
    const clients = clientsText.split(",").map(c => c.trim()).filter(c => c);

    if (clients.length === 0) {
      alert("Please enter at least one client!");
      return;
    }


    const employees = loadEmployees();

 
    const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 101;


    const newEmployee = {
      id:              newId,
      name:            name,
      department:      department,
      role:            role,
      clients:         clients,
      status:          status,
      performance:     performance,
      assessmentScore: null
    };

    // Add to array and save to localStorage
    employees.push(newEmployee);
    saveEmployees(employees);

    alert(`Employee "${name}" added successfully! You can see them on the Dashboard too.`);

    // Hide form, clear fields, show table
    $("#add-employee-form").hide();
    $("#add-employee-form form")[0].reset();
    $("#employees-table-wrapper").show();
    $("#show-add-form-btn").show();

    
    renderEmployeeTable(employees);
  });

  
  function renderEmployeeTable(employees) {
    const tbody = $("#employee-tbody");
    tbody.empty();

    employees.forEach(function (emp) {
      const badgeClass = emp.status === "Active" ? "bg-success" : "bg-secondary";

      const row = `
        <tr>
          <td>${emp.id}</td>
          <td>${emp.name}</td>
          <td>${emp.department}</td>
          <td>${emp.role}</td>
          <td>${emp.clients.length}</td>
          <td><span class="badge ${badgeClass}">${emp.status}</span></td>
          <td>
            <button class="btn-view btn-toggle me-1"
              data-id="${emp.id}"
              data-status="${emp.status}">
              ${emp.status === "Active" ? "Mark Inactive" : "Mark Active"}
            </button>
            <button class="btn-view btn-details" data-id="${emp.id}">
              View
            </button>
          </td>
        </tr>
      `;
      tbody.append(row);
    });
  }


  $(document).on("click", ".btn-toggle", function () {
    const empId     = parseInt($(this).data("id"));
    const employees = loadEmployees();

    employees.forEach(function (emp) {
      if (emp.id === empId) {
        emp.status = emp.status === "Active" ? "Inactive" : "Active";
      }
    });

    saveEmployees(employees);
    renderEmployeeTable(employees);
  });

 
  $(document).on("click", ".btn-details", function () {
    const empId     = parseInt($(this).data("id"));
    const employees = loadEmployees();
    const emp       = employees.find(e => e.id === empId);

    if (!emp) return;

    $("#modal-name").text(emp.name);
    $("#modal-dept").text(emp.department);
    $("#modal-role").text(emp.role);
    $("#modal-status").text(emp.status);
    $("#modal-performance").text(emp.performance + "%");
    $("#modal-performance-bar").css("width", emp.performance + "%").attr("aria-valuenow", emp.performance);

    const clientList = $("#modal-clients");
    clientList.empty();
    emp.clients.forEach(function (client) {
      clientList.append(`<li>${client}</li>`);
    });

    $("#modal-profile-link").attr("href", `Profile.html?id=${emp.id}`);

    const modal = new bootstrap.Modal(document.getElementById("employeeModal"));
    modal.show();
  });

});