document.addEventListener("DOMContentLoaded", function() {
    var deleteLinks = document.querySelectorAll('.delete-link');

    deleteLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var deleteUrl = this.getAttribute('href');

            // Show the popup
            document.querySelector('.popup-overlay').style.display = 'block';
            document.querySelector('.confirmation-popup').style.display = 'block';

            // When the confirm button is clicked, proceed with deletion
            document.getElementById('confirm-delete').onclick = function() {
                window.location.href = deleteUrl;
            };

            // Hide the popup if cancel is clicked
            document.getElementById('cancel-delete').onclick = function() {
                document.querySelector('.popup-overlay').style.display = 'none'; 
                document.querySelector('.confirmation-popup').style.display = 'none';
            };
        });
    });
});