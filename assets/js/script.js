// Check if the .carousel element exists on the page before executing the carousel-related code
const carouselElement = document.querySelector(".carousel");
if (carouselElement) {
  let firstImg = carouselElement.querySelectorAll("img")[0];
  let arrowIcons = document.querySelectorAll(".wrapper i");
  let isDragStart = false,
    isDragging = false,
    prevPageX,
    prevScrollLeft,
    positionDiff;

  const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carouselElement.scrollWidth - carouselElement.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carouselElement.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carouselElement.scrollLeft == scrollWidth ? "none" : "block";
  };

  arrowIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
      // if clicked icon is left, reduce width value from the carousel scroll left else add to it
      carouselElement.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
      setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
  });

  let autoSlide = () => {
    // if there is no image left to scroll then return from here
    if (carouselElement.scrollLeft - (carouselElement.scrollWidth - carouselElement.clientWidth) > -1 || carouselElement.scrollLeft <= 0) return;
    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;
    if (carouselElement.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
      return carouselElement.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carouselElement.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
  };

  let dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carouselElement.scrollLeft;
  };

  let dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carouselElement.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carouselElement.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
  };

  let dragStop = () => {
    isDragStart = false;
    carouselElement.classList.remove("dragging");
    if (!isDragging) return;
    isDragging = false;
    autoSlide();
  };

  carouselElement.addEventListener("mousedown", dragStart);
  carouselElement.addEventListener("touchstart", dragStart);
  document.addEventListener("mousemove", dragging);
  carouselElement.addEventListener("touchmove", dragging);
  document.addEventListener("mouseup", dragStop);
  carouselElement.addEventListener("touchend", dragStop);
}

// Rest of your JavaScript code...

const quizData = [
  {
    question: "What is the capital of France?",
    choices: ["London", "Paris", "Berlin"],
    correctAnswer: 1,
  },
  {
    question: "Which planet is closest to the Sun?",
    choices: ["Venus", "Mercury", "Mars"],
    correctAnswer: 1,
  },
  {
    question: "What is the largest mammal in the world?",
    choices: ["Blue Whale", "Elephant", "Giraffe"],
    correctAnswer: 0,
  },
];

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const submitButton = document.getElementById("submit-btn");
const resultElement = document.getElementById("result");

let currentQuestion = 0;
let score = 0;

function showQuestion() {
  if (currentQuestion < quizData.length) {
    const question = quizData[currentQuestion].question;
    const choices = quizData[currentQuestion].choices;

    questionElement.textContent = question;
    choicesElement.innerHTML = "";

    choices.forEach((choice, index) => {
      const choiceElement = document.createElement("div");
      choiceElement.className = "choice";

      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = "quizChoice";
      radioInput.value = index; // Set the value to the index of the choice

      const choiceLabel = document.createElement("label");
      choiceLabel.textContent = choice;

      choiceElement.appendChild(radioInput);
      choiceElement.appendChild(choiceLabel);
      choicesElement.appendChild(choiceElement);
    });

    submitButton.textContent = "Submit";
  } else {
    showResult();
  }
}

function handleChoiceClick() {
  const selectedRadio = document.querySelector('input[name="quizChoice"]:checked');
  if (selectedRadio) {
    const selectedIndex = parseInt(selectedRadio.value);
    const correctAnswer = quizData[currentQuestion].correctAnswer;

    if (selectedIndex === correctAnswer) {
      score++;
    }

    currentQuestion++;
    showQuestion();
  }
}

function showResult() {
  questionElement.textContent = "";
  choicesElement.innerHTML = "";
  resultElement.textContent = `You scored ${score} out of ${quizData.length} questions.`;
  resultElement.style.display = "block";
  submitButton.style.display = "none";
}

submitButton.addEventListener("click", handleChoiceClick);
showQuestion();

// Get the current URL path
  let currentPath = window.location.pathname;

  // Find the corresponding link in the navigation and add the "active-link" class
  let links = document.querySelectorAll('.navbar .nav-link');
  links.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active-link');
    }
  });
