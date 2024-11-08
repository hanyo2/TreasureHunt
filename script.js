     // Retrieve the message from localStorage
     var quiz = localStorage.getItem("quiz");
     var tile = localStorage.getItem("tile");
     var alarm = localStorage.getItem("alarm");

     //localStorage.removeItem("quiz"); 
     //localStorage.removeItem("tile"); 
     //localStorage.removeItem("alarm"); 

     // Function to display modal
     function showModal(message) {
         const modalOverlay = document.createElement('div');
         modalOverlay.classList.add('modal-overlay');
         const modal = document.createElement('div');
         modal.classList.add('modal');
         const modalContent = document.createElement('div');
         modalContent.classList.add('modal-content');
         const modalText = document.createElement('p');
         modalText.textContent = message;
         modalContent.appendChild(modalText);
         modal.appendChild(modalContent);
         modalOverlay.appendChild(modal);
         document.body.appendChild(modalOverlay);
     }

     window.onclick = function(event) {
 var modal = document.getElementById('modal');
 if (event.target == modal) {
     modal.style.display = 'none';
 }
}
if (alarm) {
    document.querySelector(".game1 .gameDescription").textContent = "Wake Up Ruth!🗝️";
}
 if (tile) {
    document.querySelector(".game3 .gameDescription").textContent = "Tile Match Trouble🗝️";
}
 if (quiz) {
    document.querySelector(".game2 .gameDescription").textContent = "Quintessential Quiz🗝️";
}

     // Event listener for "CLAIM YOUR TREASURE" link
     document.querySelector(".adoptLink").addEventListener("click", function (event) {
         if (!(quiz && tile && alarm)) {
             // If conditions are not met, display modal and prevent default link behavior
             document.querySelector(".adoptLink").textContent = "Not Enough Keys!";
             event.preventDefault(); // Prevent link from navigating to href
         }
     }); 