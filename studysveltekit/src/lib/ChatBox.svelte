<script lang="ts">
	import { page } from '$app/stores';
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';

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



<div id="cardcontainer" class="card p-4">
	<div id="chatcontainer" class="card p-4" style="overflow-y: scroll;">
		<div class="flex items-start mb-4">
			<div id="chatbubble" class="flex flex-col">
				{#each chatContent as msg}
					{#if msg.name === 'AIBOT'}
						<div class="flex items-start mb-4">
							<div class="flex-shrink-0 mr-2">
								<img
									class="h-10 w-10 rounded-full"
									src="https://i.pravatar.cc/"
									alt="Profile Picture"
								/>
							</div>
							<div class="bg-gray-200 dark:bg-gray-700 rounded-lg py-2 px-4 shadow-md">
								<p class="text-sm font-medium text-gray-900 dark:text-gray-100">John Doe</p>
								<p class="text-sm text-gray-700 dark:text-gray-300">{msg.message}</p>
							</div>
						</div>
					{:else if msg.name === 'user'}
						<div class="flex items-start mb-4">
							<div class="flex-grow" />
							<div class="bg-gray-200 dark:bg-gray-700 rounded-lg py-2 px-4 shadow-md text-right">
								<p class="text-sm font-medium text-gray-900 dark:text-gray-100">You</p>
								<p class="text-sm text-gray-700 dark:text-gray-300">{msg.message}</p>
								<button
									on:click={handleModalSubmit}
									type="button"
									class="btn-icon variant-filled ml-2 mt-2">💾</button
								>
							</div>
							<div class="flex-shrink-0 ml-2">
								<img
									class="h-10 w-10 rounded-full"
									src="https://i.pravatar.cc/"
									alt="Profile Picture"
								/>
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>

	<div class="flex flex-row">
		<textarea
			class="textarea flex-item"
			rows="4"
			placeholder="Chat"
			bind:value={message}
			on:keypress={handleKeyPress}
		/>
		<button type="button" class="btn btn-xl variant-filled flex-item" on:click={sendMessage}
			>Send</button
		>
	</div>
	<div class="mt-5">
		<FileDropzone name="files" />
	</div>
	<div>
		<dl class="list-dl">
			<div>
				<span class="badge bg-primary-500">📼</span>
				<span class="flex-auto">
					<dt>Title</dt>
					<dd>Description</dd>
				</span>
				<span class="badge bg-primary-500">📖</span>
				<span class="flex-auto">
					<dt>Title</dt>
					<dd>Description</dd>
				</span>
				<span class="badge bg-primary-500">📖</span>
				<span class="flex-auto">
					<dt>Title</dt>
					<dd>Description</dd>
				</span>
			</div>
		</dl>
	</div>
	<div />
</div>

<style>
	#cardcontainer {
		max-width: 90%;
		margin: 0 auto;
	}

	#chatcontainer {
		max-width: 99%;
		margin: 0 auto;
		min-height: 43vh;
		max-height: 43vh;
		margin-bottom: 1.8em;
	}

	#chatbubble {
		min-width: 100%;
	}

	h1 {
		margin: 0 auto;
	}
</style>
