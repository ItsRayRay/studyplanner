
<script>
	function handleBackend() {
		async function fetchData() {
  try {
    const response = await fetch('http://127.0.0.1:8000');
    const data = await response.json();
    console.log(data); // {"Ping": "Pong"}
    // You can now use the 'data' object to update your SvelteKit component's state and display the response in your front-end UI
  } catch (error) {
    console.error(error);
  }
}

fetchData();
	}

</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1>Let's get cracking bones!</h1>
		<p>Start by exploring:</p>
		<ul>
			<li><code>/src/routes/+layout.svelte</code> - barebones layout, the CSS import order is critical!</li>
			<li><code>/src/app.postcss</code> - minimal css to make the page full screen, may not be relevant for your project</li>
			<li><code>/src/routes/+page.svelte</code> - this page, you can replace the contents</li>

			<button on:click={handleBackend}> click me </button>
		</ul>
	</div>
</div>
