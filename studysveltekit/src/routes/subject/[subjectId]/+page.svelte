<script lang="ts">
	import { page } from '$app/stores';
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import ChatBox from '../../../lib/ChatBox.svelte';
	import FlashcardSection from '../../../lib/FlashcardSection.svelte';

	$: subjectId = $page.params.subjectId;



</script>



<h1 class="mx-auto" id="theSubject">{subjectId}</h1>
<ChatBox  />
<FlashcardSection />


<style>
	h1 {
		margin: 0, auto;
		margin-top: 0.4em;
		margin-bottom: 0.4em;
		margin-left: 0.2em;
	}
</style>