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





$: subjectId = $page.params.subjectId;



let message = '';

function sendMessage() {
  const messageObj = {
    name: 'user',
    message: message
  };
  chatContent.push(messageObj);
  chatContent = [...chatContent];
  message = '';
  const chatContentToString = JSON.stringify(chatContent)
  console.log(chatContentToString)

}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}


const confirm: ModalSettings = {
  type: 'confirm',
  // Data
  title: 'Please Confirm',
  body: 'Save your question & AI response as a flashcard?',
  // TRUE if confirm pressed, FALSE if cancel pressed
  response: (r: boolean) => console.log('response:', r)
};

function handleModalSubmit() {
  modalStore.trigger(confirm);
}

let chatContent = [
{ name: 'AIBOT', message: 'Hello' },
{ name: 'user', message: 'World' },
];



