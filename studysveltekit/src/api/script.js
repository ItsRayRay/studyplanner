const data = { myString: 'Hello from SvelteKit!' };

fetch('http://localhost:8000/api/data', {
  method: 'POST', // or any other HTTP method
  headers: {
    'Content-Type': 'application/json', // or other appropriate headers
  },
  body: JSON.stringify(data), // convert data to JSON string
})
.then(response => {
  // Handle response from backend
  if (response.ok) {
    // Handle success
    console.log('Data sent successfully');
  } else {
    // Handle error
    console.error('Error sending data:', response.statusText);
  }
})
.catch(error => {
  // Handle fetch error
  console.error('Error sending data:', error);
});