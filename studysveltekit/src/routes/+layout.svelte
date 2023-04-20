<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-rocket.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import Languagedropdown from '../lib/languagedropdown.svelte';

	$: sideBarLinks = [];

	const prompt: ModalSettings = {
		type: 'prompt',
		// Data
		title: 'Enter subject',
		body: 'Provide the subject the field below.',
		// Populates the input value and attributes
		value: '',
		valueAttr: { type: 'text', minlength: 3, maxlength: 15, required: true },
		// Returns the updated response value and reloads the page
		response: (r: string) => {
			const projects = JSON.parse(localStorage.getItem('names') || '[]');
			if (r && projects.includes(r)) {
				alert('Project name already exists.');
			} else if (r) {
				projects.push(r);
				localStorage.setItem('names', JSON.stringify(projects));
				sideBarLinks = [...sideBarLinks, r]
			}
		}
	};

	function handleModalClick() {
		modalStore.trigger(prompt);
	}

	function loadSideBar() {
		sideBarLinks = JSON.parse(localStorage.getItem('names')) || [];
		console.log(sideBarLinks);
	}

	onMount(loadSideBar);

	function removeItem(item) {
		const confirmModal = {
			type: 'confirm',
			title: 'Confirm',
			body: 'Are you sure you want to remove this item?',
			response: (r: boolean) => {
				if (r) {
					sideBarLinks = sideBarLinks.filter((i) => i !== item);
					localStorage.setItem('names', JSON.stringify(sideBarLinks));
				}
			}
		};
		modalStore.trigger(confirmModal);
	}


</script>

<Modal />
<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead"
				><h1>
					<span
						class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone"
						>StudyPlanner.</span
					>
				</h1></svelte:fragment
			>

			<svelte:fragment slot="trail"
				><LightSwitch />
				<Languagedropdown />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<div class="h-full border-r border-black">
			<button
				on:click={handleModalClick}
				type="button"
				class="btn variant-filled block mx-auto mb-5"
			>
				<span>Add Subject</span>
			</button>
			<nav class="list-nav">
				<ul>
					{#each sideBarLinks as link}
						<li class="flex flex-row justify-between">
							<a class="flex-initial" href="/subject/{link}">{link}</a><button
								class="flex-initial ml-auto"
								on:click={() => removeItem(link)}>🗑️</button
							>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	</svelte:fragment>

	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
</AppShell>
