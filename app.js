
const employeesData = [
  {
    id: 101,
    name: "Rahul Sharma",
    department: "Sales",
    role: "Manager",
    clients: ["Tata Motors", "Reliance Industries", "HDFC Bank", "Infosys", "Wipro"],
    status: "Active",
    performance: 85,
    assessmentScore: null  
  },
  {
    id: 102,
    name: "Ananya Gupta",
    department: "Marketing",
    role: "Executive",
    clients: ["Zomato", "Swiggy", "Ola"],
    status: "Active",
    performance: 72,
    assessmentScore: null
  },
  {
    id: 103,
    name: "Vikram Singh",
    department: "HR",
    role: "Senior Executive",
    clients: ["Google India", "Microsoft India"],
    status: "Inactive",
    performance: 60,
    assessmentScore: null
  },
  {
    id: 104,
    name: "Priya Nair",
    department: "IT",
    role: "Developer",
    clients: ["Amazon India", "Flipkart", "Myntra", "Meesho"],
    status: "Active",
    performance: 90,
    assessmentScore: null
  },
  {
    id: 105,
    name: "Karan Mehta",
    department: "Finance",
    role: "Analyst",
    clients: ["ICICI Bank"],
    status: "Active",
    performance: 78,
    assessmentScore: null
  }
];


const quizQuestions = [
  {
    question: "What does CRM stand for?",
    options: [
      "Customer Resource Manager",
      "Customer Relationship Management",
      "Client Response Management",
      "Corporate Record Management"
    ],
    correct: 1  
  },
  {
    question: "Which department handles recruitment in a company?",
    options: ["Finance", "IT", "HR", "Marketing"],
    correct: 2
  },
  {
    question: "What is the primary goal of a Sales team?",
    options: [
      "Manage IT systems",
      "Handle payroll",
      "Generate revenue by selling products/services",
      "Design marketing campaigns"
    ],
    correct: 2
  },
  {
    question: "Which tool is commonly used for project management?",
    options: ["Photoshop", "JIRA", "Audacity", "Illustrator"],
    correct: 1
  },
  {
    question: "What does KPI stand for?",
    options: [
      "Key Performance Indicator",
      "Key Process Integration",
      "Knowledge Productivity Index",
      "Known Parameter Interface"
    ],
    correct: 0
  }
];


function saveEmployees(data) {
  localStorage.setItem("employeesData", JSON.stringify(data));
}


function loadEmployees() {
  const saved = localStorage.getItem("employeesData");
  if (saved) {
    return JSON.parse(saved);
  }
  return employeesData;         
}


function simulateDataLoad(data) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(data);    
    }, 1000);
  });
}

// ---- Grade Calculation ----

function calculateGrade(percentage) {
  if (percentage >= 90) return "A";
  else if (percentage >= 75) return "B";
  else if (percentage >= 60) return "C";
  else if (percentage >= 40) return "D";
  else return "F";
}

// ---- Pass/Fail Logic ----

function isPassed(percentage) {
  return percentage >= 40;
}

// ---- Performance Feedback Message ----

function getPerformanceFeedback(grade) {
  switch (grade) {
    case "A": return "Outstanding! Keep up the excellent work!";
    case "B": return "Great job! You're performing well.";
    case "C": return "Good effort. There's room to improve.";
    case "D": return "Below average. Please work harder.";
    case "F": return "Did not pass. Consider retaking the assessment.";
    default:  return "No feedback available.";
  }
}

// ---- Recent Activities ----

const recentActivities = [
  { icon: "👤", color: "#e8f0fe", text: "Priya Nair completed the skill assessment.", time: "2 hours ago" },
  { icon: "📋", color: "#e6f4ea", text: "Rahul Sharma was assigned a new client: Infosys.", time: "5 hours ago" },
  { icon: "⭐", color: "#fef3c7", text: "Ananya Gupta's performance was updated to 72%.", time: "1 day ago" },
  { icon: "🔄", color: "#fde8e8", text: "Vikram Singh's status changed to Inactive.", time: "2 days ago" },
  { icon: "✅", color: "#e8f0fe", text: "Karan Mehta joined the Finance department.", time: "3 days ago" }
];
