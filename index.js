let question_data = {
  question_texts: [
    ["What is the capital of France?", "paris"],
    ["How many legs does a spider have?", "8"],
    ["What is coffee made from?", "beans"]
  ],
  current_index: 0,
  correct: [],
  incorrect: []
};

function setUpQuestion(index) {
  document.getElementById("question").innerHTML =
    question_data.question_texts[index][0];
}

function checkAnswer(answer, index) {
  if (answer === question_data.question_texts[index][1]) {
    question_data.correct.push([
      answer,
      question_data.question_texts[index][0]
    ]);
  } else {
    question_data.incorrect.push([
      answer,
      question_data.question_texts[index][0]
    ]);
  }

  if (question_data.current_index < question_data.question_texts.length - 1) {
    question_data.current_index++;
    setUpQuestion(question_data.current_index);
  } else {
    print(results(), "results");
    if (question_data.correct.length > 0) {
      print(buildList(question_data.correct, "Corrent Answers"), "correct");
    }
    if (question_data.incorrect.length > 0) {
      print(
        buildList(question_data.incorrect, "Incorrect Answers"),
        "incorrect"
      );
    }
    document
      .getElementById("quiz-section")
      .setAttribute("style", "display: none");
    document.getElementById("reload").setAttribute("style", "display: block");
  }
}

function print(message, element) {
  let outputDiv = document.getElementById(element);
  outputDiv.innerHTML = message;
}

function submitFunc(event) {
  event.preventDefault();
  checkAnswer(
    event.target.answerText.value.toLowerCase(),
    question_data.current_index
  );
  event.target.answerText.value = "";
}

function print(message, element) {
  let outputDiv = document.getElementById(element);
  outputDiv.innerHTML = message;
}

function buildList(array, title) {
  let list = "<h2>" + title + "</h2><ol>";
  for (let i = 0; i < array.length; i++) {
    list += "<li>" + array[i][1] + " " + array[i][0] + "</li>";
  }
  list += "</ol>";
  return list;
}

function results() {
  let write;
  if (question_data.correct.length >= 2) {
    write =
      "Great! You got " +
      question_data.correct.length +
      " question(s) right and " +
      question_data.incorrect.length +
      " question(s) wrong. Great work!";
  } else {
    write =
      "Too bad! You got " +
      question_data.incorrect.length +
      " question(s) wrong and only " +
      question_data.correct.length +
      " question(s) right. Better luck next time.";
  }
  return write;
}

window.onload = function() {
  setUpQuestion(question_data.current_index);
};
