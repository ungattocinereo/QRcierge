document.addEventListener('DOMContentLoaded', () => {
    const requestButtons = document.querySelectorAll('.request-btn');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const newRequestBtn = document.getElementById('newRequestBtn');
    
    // Add click event to all request buttons
    requestButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const requestType = button.getAttribute('data-type');
            
            try {
                // Send request to server
                const response = await fetch('/api/requests', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ type: requestType })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // Show confirmation message
                    confirmationMessage.classList.add('show');
                } else {
                    alert('Error: ' + (data.error || 'Failed to send request'));
                }
            } catch (error) {
                console.error('Error sending request:', error);
                alert('Failed to send request. Please try again.');
            }
        });
    });
    
    // Add click event to the new request button
    newRequestBtn.addEventListener('click', () => {
        confirmationMessage.classList.remove('show');
    });
});