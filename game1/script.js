// Get the counter element
var counter = document.getElementById('counter');

// Get the picture element
var picture = document.getElementById('picture');

var alarmClockGif = document.getElementById('alarmPicture')

// Get the status element
var statusElement = document.querySelector('.container2 .item');

var closeButton = document.querySelector('.close');

// Initialize counter value
var count = 0;

// Define initial interval time
var intervalTime = 250; // Default interval time

// Define interval variable
var interval;

// Initialize audio context
var audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Load the background sound
var audioElement = new Audio('alarm.mp3');
var audioSource = audioContext.createMediaElementSource(audioElement);
var gainNode = audioContext.createGain(); // Create a gain node to control volume
audioSource.connect(gainNode);
gainNode.connect(audioContext.destination);

// Define a flag to indicate if decrement should start
var shouldDecrement = false;

var snore = new Audio('snore.mp3');
var yay = new Audio('yay.mp3'); 
var alarm = new Audio('alarm.mp3'); 

// Function to increment counter and update text
function incrementCounter() {
    count++;
    counter.textContent = count;
    
    // Adjust volume based on count
    var volume = count * 0.033; // Normalize count to a value between 0 and 1
    gainNode.gain.value = volume; // Set the volume based on the count
    
    // Set the flag to true after the first increment
    shouldDecrement = true;
}

document.addEventListener('DOMContentLoaded', function() {
    // Call the showModal function with the desired message
    showModal("Oh no!! The dragon of the forest is sleeping. Repeatedly press W to ring the dragon's alarm clock so he can wakeup and give you the key. Be careful though, for if the alarm clock stops ringing, he will fall into a deep sleep! and can't give you the key. Click anywhere outside to begin");
});

alarm.addEventListener('ended', function() {
    alarm.currentTime = 0; // Reset the playback to the beginning
    alarm.play(); // Play the audio again
   
});


// Listen for "w" key press and increment count
document.addEventListener('keydown', function(event) {
    if (event.key === 'w' || event.key === 'W') {
        
        if(count > -1)
        {
            alarm.play();
           
        }

        if(count == 0)
        {
            alarmClockGif.src = 'alarmGif.gif';
        }

        if (count === -1) {
            return;
        }
        incrementCounter();
        updateImage();
        
        // Start the interval only after the first "w" key press
        if (shouldDecrement && !interval) {
            interval = setInterval(intervalCallback, intervalTime);
        }
    }
});


closeButton.addEventListener('click', function() {
    // Close the modal
    modal.style.display = 'none';
    
    // Refresh the page
    location.reload();
});

// Define interval callback function
function intervalCallback() {
    // Stop decrementing when count reaches 30
    if (count >= 30) {
        clearInterval(interval);
        return;
    }

    if (count <= -1) {
        clearInterval(interval);
        return;
    }

    // Decrease the counter by 1 every interval time
    count -= 1;

    // Change image based on count
    updateImage();

    // Adjust interval time based on count
    if (count < 10) {
        intervalTime = 500; 
    } else if (count >= 10 && count < 20) {
        intervalTime = 250;
    } else if (count >= 20 && count < 30){
        intervalTime = 125; 
    }

    // Clear and reset the interval with the updated intervalTime
    clearInterval(interval);
    interval = setInterval(intervalCallback, intervalTime);
}

// Call drawMeter every millisecond
setInterval(function() {
    // Draw meter   
    drawMeter(count);
}, 1); // 1 millisecond

// Function to draw the meter
function drawMeter(count) {
    var canvas = document.getElementById('meter');
    var ctx = canvas.getContext('2d');
    var height = canvas.height;
    var width = canvas.width;

    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // Draw the meter
    ctx.fillStyle = 'blue';
    var meterHeight = (count / 30) * height;
    ctx.fillRect(0, height - meterHeight, width, meterHeight);
}

// Function to update image and status based on count
function updateImage() {
    if (count < 0) {
        picture.src = 'lose.webp'; // Change to the path of your first image
        statusElement.textContent = 'Deep Slumber!';
        showModal('The alarm failed to wake up the dragon, and he fell into a deep slumber. Refresh the page to try again');
        alarm.pause();
        snore.play();
        alarmClockGif.src = 'white.png'
    } else if (count >= 0 && count < 10) {
        picture.src = 'state.webp'; // Change to the path of your second image
        statusElement.textContent = 'Asleep';
    } else if (count >= 10 && count < 20) {
        picture.src = 'state.webp'; // Change to the path of your third image
        statusElement.textContent = 'Drowsy';
    } else if (count >= 20 && count < 30) {
        picture.src = 'state.webp'; // Change to the path of your fourth image
        statusElement.textContent = 'Alert';
    } else if (count >= 30) {
        picture.src = 'win.jpg'; // Change to the path of your fifth image
        statusElement.textContent = 'Awake!';
        showModal('Yay! the dragon woke up, and gave you a key');
        alarm.pause();
        yay.play();
        alarmClockGif.src = 'white.png'
        localStorage.setItem("alarm", "win");
    }
}

// Function to show modal with text and image
function showModal(text) {
    var modal = document.getElementById('modal');
    var modalText = document.getElementById('modal-text');

    // Set text and image content
    modalText.textContent = text;

    // Display modal
    modal.style.display = 'block';
}

// Close modal when clicked outside of it
window.onclick = function(event) {
    var modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Start playing the background sound
audioElement.loop = true;
audioElement.play();
