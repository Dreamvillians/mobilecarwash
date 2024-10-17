/* BOOK/CONTACT US (#4) */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('.slides-form');
  const submitButton = form.querySelector('button'); // Select the submit button
  // Add a submit event listener to the form
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    // Disable the button and show a loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Booking...'; // Change the button text
    // Create a new FormData object from the form element
    const formData = new FormData(form);
    // Send an AJAX POST request using Fetch API
    fetch('ajax-email.php', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json()) // Assuming `ajax-email.php` returns a JSON response
    .then(data => {
      if (data.success) {
        // Success message and reset the form
        submitButton.textContent = 'Done!';
        submitButton.classList.add('message-sent');
        alert('Your booking has been successfully sent!'); // Optionally show a success alert
        form.reset(); // Reset form fields
      } else {
        // Handle errors
        alert('There was a problem with your booking. Please try again.');
        submitButton.textContent = 'Book Now'; // Reset the button text
      }
    })
    .catch(error => {
      // Handle network errors or other issues
      console.error('Error:', error);
      alert('There was an error submitting the form. Please try again.');
      submitButton.textContent = 'Book Now'; // Reset the button text
    })
    .finally(() => {
      // Re-enable the button after submission is complete
      submitButton.disabled = false;
    });
  });
});