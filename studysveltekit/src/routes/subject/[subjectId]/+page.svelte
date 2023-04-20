<script lang="ts">
	import { page } from '$app/stores';
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import ChatBox from '../../../lib/ChatBox.svelte';

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
	}

	function handleKeyPress(event) {
		if (event.key === 'Enter') {
			sendMessage();
		}
	}

	//tutorial to make chat working : https://www.youtube.com/watch?v=uT7Y_W2GYxY

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
	{ name: 'AIBOT', message: 'testing it out' },
	{ name: 'user', message: 'testing it out too' },
];

// Check if chatContent contains an object with name 'user'


 $: fetch('http://localhost:8000/', {
  method: 'POST', // or any other HTTP method
  headers: {
    'Content-Type': 'application/json' // or other appropriate headers
  },
  body: JSON.stringify({ chatContent }) // convert chatContent to JSON string and pass as request body
})
.then((response) => {
  // Handle response from backend
  if (response.ok) {
    // Handle success
    console.log('Data sent successfully');
  } else {
    // Handle error
    console.error('Error sending data:', response.statusText);
  }
})
.catch((error) => {
  // Handle fetch error
  console.error('Error sending data:', error);
});



</script>

<h1>{subjectId}</h1>


<ChatBox/>
