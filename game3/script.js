
const imageUrls = ['alien.jpg', 'skeleton.webp', 'werewolf.jpg'];


let maleoTilesClicked = 0;


let totalTiles = 0;


let totalMaleoTiles = 0;

let currentGame = 1
var lose = new Audio('lose.mp3');
var win = new Audio('win.mp3'); 
var flip = new Audio('flip.mp3');
var shuffle = new Audio('shuffle.mp3'); 
var chill = new Audio('chill.mp3'); 


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
    
}


function revealPicture(element) {
    element.style.pointerEvents = 'none';
    flip.play(); 
    const imageUrl = element.getAttribute('data-image-url');
    element.style.backgroundImage = `url(${imageUrl})`;
    element.removeEventListener('click', revealPicture);

    if (currentGame == 1)
    {
        if (imageUrl === 'alien.jpg') {
            maleoTilesClicked++;
            if (maleoTilesClicked   === totalMaleoTiles *2) {
                revealAllTiles();
            }
        }
        else
        {
            makeTilesUnclickable();
            console.log("tiles uncliak"); 
            showModal('Oh no! you clicked on an incorrect tile and lost the game ⁭ ⁭ refresh the page to try again!'); 
            chill.pause(); 
            lose.play();
        }
    }
    else if (currentGame == 2)
    {
        if (imageUrl === 'werewolf.jpg') {
            maleoTilesClicked++;
            if (maleoTilesClicked   === totalMaleoTiles *2) {
                revealAllTiles();
            }
        }
        else
        {
            makeTilesUnclickable();
            console.log("tiles uncliak"); 
            showModal('Oh no! you clicked on an incorrect tile and lost the game ⁭ ⁭ refresh the page to try again!'); 
            chill.pause(); 
            lose.play();
        }
    }
    else if (currentGame == 3)
    {
        if (imageUrl === 'skeleton.webp') {
            maleoTilesClicked++;
            if (maleoTilesClicked   === totalMaleoTiles *2) {
                revealAllTiles();
            }
        }
        else
        {
            makeTilesUnclickable();
            console.log("tiles uncliak"); 
            showModal('Oh no! you clicked on an incorrect tile and lost the game ⁭ ⁭ refresh the page to try again!'); 
            chill.pause(); 
            lose.play();
        }
    }

    console.log('maleoClicked: ' + maleoTilesClicked);
    console.log('totalMaleo: ' + totalMaleoTiles);
    console.log('totalTiles: ' + totalTiles);
}


function revealAllTiles() {
    gridItems.forEach((item) => {
        
        const imageUrl = item.getAttribute('data-image-url');
        item.style.backgroundImage = `url(${imageUrl})`;
        item.removeEventListener('click', revealPicture);
    });
    
    
    if (currentGame < 4) {
        totalMaleoTiles = 0; 
        currentGame++; 

        const shuffledUrls = shuffleArray([...imageUrls, ...imageUrls]);
        shuffle.play(); 
    
        gridItems.forEach((item, index) => {
            item.style.pointerEvents = 'none';
    
            const imageUrl = shuffledUrls[index % shuffledUrls.length];
            item.style.backgroundImage = `url(${imageUrl})`;
            item.setAttribute('data-image-url', imageUrl);
            if (currentGame == 2) {
                if (imageUrl === 'werewolf.jpg') {
                    totalMaleoTiles++; 
                }
            } else if (currentGame == 3) {
                if (imageUrl === 'skeleton.webp') {
                    totalMaleoTiles++;
                }
            }
        });

     
        maleoTilesClicked = 0;

        updateTextBelow(); 

  
        setTimeout(() => {
            gridItems.forEach((item) => {
                item.style.backgroundImage = 'none'; 
                item.style.pointerEvents = 'auto';
            });
        }, 3000);
    }
    
    if (currentGame == 4) {
        showModal('Hurray! you matched all the tiles, and in doing so, acquired a key! 🗝️'); 
        console.log("end the game now ")
        win.play(); 
        chill.pause(); 
        localStorage.setItem("tile", "win");
    }
    console.log(currentGame);
}



const gridItems = document.querySelectorAll('.grid-item');


const shuffledUrls = shuffleArray([...imageUrls, ...imageUrls]);


gridItems.forEach((item, index) => {
    item.style.pointerEvents = 'none';
    const imageUrl = shuffledUrls[index % shuffledUrls.length];
    item.style.backgroundImage = `url(${imageUrl})`; 
    item.setAttribute('data-image-url', imageUrl); 
    if (imageUrl === 'alien.jpg') {
        totalMaleoTiles++; 
    }
    totalTiles++; 
});


gridItems.forEach((item) => {
    item.addEventListener('click', function () {
        revealPicture(this);
    });
});



showModal("All of these tiles are mixed up, and its up to you to fix them! Follow the instructions on the bottom grey bar to figure out which tiles you're supposed to click on. The tiles will reveal themselves for 3 seconds, after which they'll become hidden, and you'll have to click on the ones that match the instructions at the bottom. be careful though, if you click the wrong tile, its Game Over! Click anywhere outside to begin");


function startGameTimer() {
    chill.play();
    chill.loop = true; 

    setTimeout(() => {
        gridItems.forEach((item) => {
            item.style.backgroundImage = 'none'; 
            item.style.pointerEvents = 'auto';
        });
    }, 3000);
}


window.onclick = function(event) {
    const modal = document.querySelector('.modal');
    if (event.target == modal) {
        modal.style.display = 'none';
        startGameTimer(); 
    }
};

window.addEventListener('click', function(event) {
    const modal = document.querySelector('.modal');
    if (event.target === modal) {
        modal.style.display = 'none';
        startGameTimer(); 
    }
});


function updateTextBelow() {
    const textBelow = document.querySelector('#textBelow');

    if(currentGame == 1)
    {
    textBelow.textContent = 'Click on Alien tiles';
    }
    else if (currentGame == 2)
    {
    textBelow.textContent = 'Click on Werewolf tiles';
    }
    else if (currentGame == 3)
    {
    textBelow.textContent = 'Click the Skeleton tiles';
    }   
  
}

updateTextBelow(); 

function makeTilesClickable() {
    gridItems.forEach((item) => {
        item.style.pointerEvents = 'auto';
    });
    tilesClickable = true;
}

function makeTilesUnclickable() {
    gridItems.forEach((item) => {
        item.style.pointerEvents = 'none';
    });
    tilesClickable = false;
}

function showModal(message) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    const modalText = document.createElement('p');
    modalText.textContent = message;
    modalContent.appendChild(modalText);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

window.onclick = function(event) {
    var modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

