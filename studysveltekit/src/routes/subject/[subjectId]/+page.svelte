<script lang="ts">
	import { page } from '$app/stores';
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import ChatBox from '../../../lib/ChatBox.svelte';

	$: subjectId = $page.params.subjectId;




</script>

<h1 id="theSubject">{subjectId}</h1>

<ChatBox  />
