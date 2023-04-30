<script>
</script>

<div id="cardcontainer" class="card p-4 flex justify-center">
	<div id="cardsection" class="card p-4">
		<div>
			<div class="flip-card">
				<div class="flip-card-inner">
					<div class="flip-card-front">
						<p class="title">FLIP CARD</p>
						<p>Hover Me</p>
					</div>
					<div class="flip-card-back">
						<p class="title">BACK</p>
						<p>Leave Me</p>
					</div>
				</div>

				<div class="card p-4 mt-10">
					<div class="flex justify-center">
						<!-- Add this div with classes -->
						<div id="buttons" class="btn-group variant-filled">
							<button class="btn-group variant-ghost-primary [&>*+*]:border-red-500"
								>Again 1 Min</button
							>
							<button class="btn-group variant-ghost-primary [&>*+*]:border-red-500"
								>Hard 6 Min</button
							>
							<button class="btn-group variant-ghost-primary [&>*+*]:border-red-500"
								>Good 10 Min</button
							>
							<button class="btn-group variant-ghost-primary [&>*+*]:border-red-500"
								>Easy 4 Days</button
							>
						</div>
					</div>
				</div>
				<div class="  mt-5">
					<button type="button" class="btn variant-filled-warning">
						<span>Delete Card</span>
					</button>
				</div>
			</div>
		</div>
	</div>

	<div id="addflascardsection" class="card p-4">
		<h2>add a flashcard</h2>
		<label class="label">
			<span>Input</span>
			<input class="input" type="text" placeholder="Input" />
		</label>

		<label class="label">
			<span>Textarea</span>
			<textarea
				class="textarea"
				rows="4"
				placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit."
			/>
		</label>

		<a href="/" class="btn variant-filled">
			<span>Add Card</span>
		</a>
	</div>

	<div id="saved_cards" class="card p-4">
		<nav class="list-nav">
			<h2>Saved Cards</h2>
			<ul>
				<li>
					<a id="element" href="/elements/lists">
						<span class="badge bg-primary-500">💀</span>
						<span class="flex-auto">Skeleton</span>
					</a>
					<a href="/elements/lists">
						<span class="badge bg-primary-500">💀</span>
						<span class="flex-auto">Skeleton</span>
					</a>
					<a href="/elements/lists">
						<span class="badge bg-primary-500">💀</span>
						<span class="flex-auto">Skeleton</span>
					</a>
				</li>
				<!-- ... -->
			</ul>
		</nav>
	</div>
</div>

<style>
	#addflascardsection {
		min-width: 30%;
	}

	#cardsection {
		min-width: 40%;
		
	}

	#saved_cards {
		overflow: auto;
		max-height: 70vh;
		min-width: 30%;
	}

	#cardcontainer {
		max-width: 90%;
		margin: 0 auto;
		margin-top: 10vh;
		min-height: 70vh;
		max-height: 70vh;
		margin-bottom: 10vh;
		min-width: 90%;
	}

	.flip-card {
		background-color: transparent;
		min-width: 100%;
		max-width: 100%;
		height: 43vh;
		perspective: 1000px;
		font-family: sans-serif;
	}

	.title {
		font-size: 1.5em;
		font-weight: 900;
		text-align: center;
		margin: 0;
	}

	.flip-card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 0.8s;
		transform-style: preserve-3d;
	}

	.flip-card:hover .flip-card-inner {
		transform: rotateY(180deg);
	}

	.flip-card-front,
	.flip-card-back {
		box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.2);
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		height: 100%;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		border: 1px solid coral;
		border-radius: 1rem;
	}

	.flip-card-front {
		background: linear-gradient(
			120deg,
			rgb(247, 243, 239) 60%,
			rgb(243, 242, 242) 88%,
			rgb(238, 234, 233) 40%,
			rgba(212, 197, 192, 0.603) 48%
		);
		color: coral;
	}

	.flip-card-back {
		background: linear-gradient(
			120deg,
			rgb(230, 223, 220) 30%,
			rgb(219, 214, 212) 88%,
			rgb(230, 227, 224) 40%,
			rgb(221, 211, 207) 78%
		);
		color: rgb(51, 36, 36);
		transform: rotateY(180deg);
	}
</style>
