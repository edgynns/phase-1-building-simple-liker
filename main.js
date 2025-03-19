// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener('DOMContentLoaded', () => {
  // Ensure modal has hidden class
  const modal = document.getElementById('modal');
  if (modal) {
    modal.classList.add('hidden');
  }
  
  // Select all like glyphs (heart elements)
  const hearts = document.querySelectorAll('.like-glyph');
  
  // Add click event listeners to each heart
  hearts.forEach(heart => {
    heart.addEventListener('click', function(e) {
      // Prevent default behavior if it's in a link
      e.preventDefault();
      
      // If the heart is already activated (full), change it back to empty
      if (this.classList.contains('activated-heart')) {
        this.textContent = EMPTY_HEART;
        this.classList.remove('activated-heart');
      } 
      // If the heart is empty, make a server request
      else {
        // Call the server
        mimicServerCall()
          .then(() => {
            // On success, fill the heart
            this.textContent = FULL_HEART;
            this.classList.add('activated-heart');
          })
          .catch(error => {
            // On failure, show the error modal
            const modalMessage = document.getElementById('modal-message');
            modalMessage.textContent = error;
            modal.classList.remove('hidden');
            
            // Hide the modal after 3 seconds
            setTimeout(() => {
              modal.classList.add('hidden');
            }, 3000);
          });
      }
    });
  });
});