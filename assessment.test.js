

// -- Function 1: Calculate Grade --
function calculateGrade(percentage) {
  if (percentage >= 90) return "A";
  else if (percentage >= 75) return "B";
  else if (percentage >= 60) return "C";
  else if (percentage >= 40) return "D";
  else return "F";
}

// -- Function 2: Pass/Fail Logic --
function isPassed(percentage) {
  return percentage >= 40;
}

// -- Function 3: Percentage Calculation --
// score = number of correct answers, total = total questions
function calculatePercentage(score, total) {
  if (total === 0) return 0;  // avoid divide by zero
  return Math.round((score / total) * 100);
}


// --- Test Suite 1: Grade Calculation ---
describe("Grade Calculation Tests", function () {

  test("Score 95 should give grade A", function () {
    expect(calculateGrade(95)).toBe("A");
  });

  test("Score 80 should give grade B", function () {
    expect(calculateGrade(80)).toBe("B");
  });

  test("Score 65 should give grade C", function () {
    expect(calculateGrade(65)).toBe("C");
  });

  test("Score 45 should give grade D", function () {
    expect(calculateGrade(45)).toBe("D");
  });

  test("Score 30 should give grade F", function () {
    expect(calculateGrade(30)).toBe("F");
  });

});

// --- Test Suite 2: Pass/Fail Logic ---
describe("Pass/Fail Logic Tests", function () {

  test("Score 50 should be passing (true)", function () {
    expect(isPassed(50)).toBe(true);
  });

  test("Score 40 should be passing (boundary case)", function () {
    expect(isPassed(40)).toBe(true);   // 40 is the minimum pass mark
  });

  test("Score 39 should be failing (false)", function () {
    expect(isPassed(39)).toBe(false);
  });

  test("Score 0 should be failing (false)", function () {
    expect(isPassed(0)).toBe(false);
  });

  test("Score 100 should be passing (true)", function () {
    expect(isPassed(100)).toBe(true);
  });

});

// --- Test Suite 3: Percentage Calculation ---
describe("Percentage Calculation Tests", function () {

  test("3 correct out of 5 = 60%", function () {
    expect(calculatePercentage(3, 5)).toBe(60);
  });

  test("5 correct out of 5 = 100%", function () {
    expect(calculatePercentage(5, 5)).toBe(100);
  });

  test("0 correct out of 5 = 0%", function () {
    expect(calculatePercentage(0, 5)).toBe(0);
  });

  test("Total 0 questions should return 0% (no divide by zero error)", function () {
    expect(calculatePercentage(0, 0)).toBe(0);
  });

  test("1 correct out of 4 = 25%", function () {
    expect(calculatePercentage(1, 4)).toBe(25);
  });

});
