const backgroundMusic = new Audio('quiz.mp3');

backgroundMusic.play(); 
backgroundMusic.loop = true; 



// Questions array with associated images
const questions = [
    {
        question: "The Question asked will be here",
        options: ["Correct Sample Answer", "Correct Sample Answer", "Incorrect Sample Answer", "Incorrect Sample Answer"],
        answer: ["Correct Sample Answer", "Correct Sample Answer"],
        image: "placeholder.jpg",
        correctMessage: "After you get the correct answer, a short message will apear here "
    }
    , {
        question: "What’s the first thing you should do when starting a treasure hunt?",
        options: ["Dig randomly in different spots", "Study the map and plan your route", "Choose the biggest shovel you can find", "Take a nap to prepare for the adventure"],
        answer: "Study the map and plan your route",
        image: "q1.webp",
        correctMessage: "Good job, now you know where to look for the treasure"
    },
    {
        question: "Which of these tools is most important when searching for buried treasure?",
        options: ["A fishing rod", "A metal detector", "A flashlight", " A compass"],
        answer: ["A metal detector"],
        image: "q2.jpg",
        correctMessage: "Nice, a metal detector can detect metal"
    },
    {
        question: "If you find a chest locked with a riddle, what’s the best approach?",
        options: ["Force it open with a crowbar", "Leave it and search for an easier treasure", "Solve the riddle for the key", "Use a potion to magically unlock it"],
        answer: "Solve the riddle for the key",
        image: "q3.webp",
        correctMessage: "Excellent work! Now you can open any chest"
    },
    {
        question: "What type of landmark is commonly used to mark a treasure location on a map?",
        options: ["A palm tree", "A golden statue", "A large 'X'", "A glowing crystal"],
        answer: ["A large 'X'"],
        image: "q4.webp",
        correctMessage: "Well done, now you can read any map there is"
    },
    {
        question: "What should you do if your treasure map leads you into a dense jungle?",
        options: ["Charge through and hope for the best", "Follow animal trails and look for signs", "Set up camp and wait for someone to rescue you"],
        answer: ["Follow animal trails and look for signs"],
        image: "q5.jpg  ",
        correctMessage: "Great!, now you know what to do in this precarious situation"
        
    }
];

// Global variables
let currentQuestion = 0;
let score = 0;

// Function to display question and options
function displayQuestion() {
    backgroundMusic.play();
    backgroundMusic.loop = true; 
    const questionElement = document.getElementById('question');
    const questionImg = document.getElementById('question-img');
    const optionsElement = document.getElementById('options');
    const currentQ = questions[currentQuestion];

    questionElement.textContent = currentQ.question;
    questionImg.src = currentQ.image;
    optionsElement.innerHTML = '';

    currentQ.options.forEach((option, index) => {
        const li = document.createElement('li');
        const radio = document.createElement('input');
        const label = document.createElement('label');
        
        radio.type = 'radio';
        radio.name = 'option';
        radio.id = `option${index}`;
        radio.value = option;
        
        label.htmlFor = `option${index}`;
        label.textContent = option;

        optionsElement.appendChild(li);
        li.appendChild(radio);
        li.appendChild(label);
    });
}

// Function to check answer
function checkAnswer() {
  //  localStorage.removeItem("message");
    const selectedOption = document.querySelector('input[name="option"]:checked');
    const options = document.querySelectorAll('input[name="option"]');
    
    if (!selectedOption) {
        alert('Please select an option.');
        return;
    }

    const correctAnswers = questions[currentQuestion].answer;

    if (Array.isArray(correctAnswers)) {
        // If there are multiple correct answers
        let isCorrect = false;

        correctAnswers.forEach(correctAnswer => {
            if (selectedOption.value === correctAnswer) {
                isCorrect = true;
            }
        });

        if (isCorrect) {
            // Show modal for correct answer with specific message
            showModal('Correct answer! ' + questions[currentQuestion].correctMessage);
            // Change background color to green
            selectedOption.nextElementSibling.style.backgroundColor = 'green';
            // Wait for modal to be closed
            return;
        }
    } else {
        // If there is only one correct answer
        if (selectedOption.value === correctAnswers) {
            // Show modal for correct answer with specific message
            showModal('Correct answer! ' + questions[currentQuestion].correctMessage);
            // Change background color to green
            selectedOption.nextElementSibling.style.backgroundColor = 'green';
            // Wait for modal to be closed
            return;
        }
    }

    // If wrong answer, change background color to red for selected option
    selectedOption.nextElementSibling.style.backgroundColor = 'red';
}




// Function to show modal
// Function to show modal
function showModal(message) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');

    // Create modal element
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <p>${message}</p>
        </div>
    `;

    // Append modal to overlay
    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);

    // Close modal when close button is clicked
    const closeButton = modal.querySelector('.close');
    closeButton.addEventListener('click', closeModal);

    // Close modal when clicking outside of it
    modalOverlay.addEventListener('click', closeModal);

    // Prevent clicks inside modal from closing it
    modal.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Function to close modal
    function closeModal() {
        modalOverlay.remove();
        // Move to the next question after closing modal
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            displayResult();
        }
    }
}





// Function to display result
function displayResult() {

    
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Congratulations! you finished the quiz and got a key 🗝️`;

    
    localStorage.setItem("quiz", "win");
}

// Event listener for submit button
document.getElementById('submitBtn').addEventListener('click', checkAnswer);

// Display first question
displayQuestion();
