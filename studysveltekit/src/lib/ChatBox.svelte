<script lang="ts">
	import { page } from '$app/stores';
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';

	let lastMessageFromChat = [];
	let message = '';
	$: chatContent = [];
	let scrollToDiv: HTMLDivElement

	async function handleClick() {
		const response = await fetch('/api/Langchain', {
			method: 'POST',
			body: JSON.stringify({ message: lastMessageFromChat[0], source: $page.params.subjectId })
		});

		if (response.ok) {
			const data = await response.json();
			console.log(data);

			chatContent.push(data);
			console.log(chatContent);
			const getLocalStorageAPI = localStorage.getItem(subjectId);
			const getlocalStorageAPIToArray = JSON.parse(getLocalStorageAPI || '[]');
			getlocalStorageAPIToArray.push(data);
			const localStorageAPItoString = JSON.stringify(getlocalStorageAPIToArray);
			localStorage.setItem(subjectId, localStorageAPItoString);
			chatContent = [...chatContent];
			scrollToBotton()
		}
	}


	function scrollToBotton() {
		setTimeout(function () {
			scrollToDiv.scrollIntoView({
				behavior: 'smooth', block: 'end', inline: 'nearest'
			})
		}, 100)
	} 

	// Get subjectId from $page.params.subjectId
	let subjectId = '';
	$: {
		subjectId = $page.params.subjectId;
	}

	// Function to send message
	function sendMessage() {
		const messageObj = {
			name: 'user',
			message: message
		};
		const getLocalChat = localStorage.getItem(subjectId);
		const getlocalChatToArray = JSON.parse(getLocalChat || '[]');
		getlocalChatToArray.push(messageObj);
		const setArraytoString = JSON.stringify(getlocalChatToArray);
		localStorage.setItem(subjectId, setArraytoString);
		message = '';
		chatContent = [...chatContent];
	}

	// Handle key press event
	function handleKeyPress(event) {
		if (event.key === 'Enter') {
			sendMessage();
		getLastChatMessage();
		lastMessageFromChat.unshift(getLastChatMessage().message);
		handleClick();
		scrollToBotton()
		}
	}

	// Modal settings
	const confirm: ModalSettings = {
		type: 'confirm',
		// Data
		title: 'Please Confirm',
		body: 'Save your question & AI response as a flashcard?',
		// TRUE if confirm pressed, FALSE if cancel pressed
		response: (r: boolean) => console.log('response:', r)
	};

	// Handle modal submit
	function handleModalSubmit() {
		modalStore.trigger(confirm);
	}

	// Get chat content from local storage and update chatContent array
	$: {
		const chatConentfromLocal = localStorage.getItem(subjectId);
		const chatConentfromLocaltoArray = JSON.parse(chatConentfromLocal || '[]');
		chatContent = chatConentfromLocaltoArray;
		console.log(chatContent);
	}

	function getLastChatMessage() {
		const items = localStorage.getItem(subjectId);
		const itemsstringified = JSON.parse(items);
		const lastItem = itemsstringified[itemsstringified.length - 1];

		if (lastItem.name === 'user') {
			return lastItem;
		}
	}

	
	function runBothFunctions() {
		sendMessage();
		getLastChatMessage();
		lastMessageFromChat.unshift(getLastChatMessage().message);
		handleClick();
		scrollToBotton()
	}
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
				<div class="" bind:this={scrollToDiv}></div>
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
		<button type="button" class="btn btn-xl variant-filled flex-item" on:click={runBothFunctions}
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
		overflow-y: scroll;
  scroll-behavior: smooth;
  scroll-margin-top: 9999px;
	}

	#chatbubble {
		min-width: 100%;
	}

	h1 {
		margin: 0 auto;
	}
</style>
