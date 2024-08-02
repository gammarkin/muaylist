<script setup>
	import Card from 'primevue/card';
	import Badge from 'primevue/badge';
	import Button from 'primevue/button';
	import Dialog from 'primevue/dialog';

	import {ref} from 'vue';
	import {useRouter} from 'vue-router';
	import {useMoveStore} from '../stores/moveStore';

	import classes from '../data/classes';

	const MAX_CHAR_LENGHT = 55;
	const iconCategory = {
		kick: 'https://cdn-icons-png.flaticon.com/512/30/30867.png',
		knee: 'https://cdn-icons-png.flaticon.com/512/3411/3411101.png',
		elbow: 'https://cdn-icons-png.flaticon.com/512/4011/4011597.png',
		other: 'https://cdn-icons-png.flaticon.com/512/15489/15489173.png',
		fist: 'https://i.pinimg.com/originals/91/d1/38/91d138b2728e673eb7aa3ca68367357c.png',

		beginner: 'https://cdn-icons-png.flaticon.com/512/15871/15871836.png',
		intermediate: 'https://cdn-icons-png.flaticon.com/512/2508/2508513.png',
		advanced: 'https://cdn-icons-png.flaticon.com/512/4789/4789546.png',
	};

	const numberOfTimesClicked = ref(0);

	const moveStore = useMoveStore();
	const router = useRouter();

	const navigateToAdmin = () => {
		numberOfTimesClicked.value += 1;

		if (numberOfTimesClicked.value >= 3) {
			return router.push('/admin');
		}
	};

	const showProduct = (product) => {
		moveStore.setSelectedMove(product);

		moveStore.openClose();
	};

	const scrollToSection = (sectionId) => {
		const element = document.getElementById(sectionId);

		if (element) {
			element.scrollIntoView({behavior: 'smooth'});
		}
	};
</script>

<template>
	<div>
		<header class="header">
			<Button
				icon="pi pi-star-fill"
				label="Muay Thai Academy"
				text
				plain
				severity="contrast"
				@click="navigateToAdmin"
			/>

			<div class="flex">
				<Button
					@click="scrollToSection('techniques')"
					label="Techniques"
					text
					plain
					severity="contrast"
				/>
				<Button
					@click="scrollToSection('about')"
					label="About"
					text
					plain
					severity="contrast"
				/>
				<Button
					@click="scrollToSection('classes')"
					label="Classes"
					text
					plain
					severity="contrast"
				/>
				<Button
					@click="scrollToSection('contact')"
					label="Contact"
					text
					severity="contrast"
				/>
			</div>
		</header>

		<main id="techniques" class="flex-column-center main">
			<Badge
				style="margin: 1rem"
				severity="secondary"
				value="Muay Thai Techniques"
			></Badge>

			<p class="h1">Master the Art of Muay Thai</p>

			<p class="h2 color-muted">
				Explore a wide range of Muay Thai techniques and learn from our expert
				instructors.
			</p>

			<div class="cards">
				<Card
					@click="showProduct(move)"
					v-for="move in moveStore.moves"
					class="card"
				>
					<template #header>
						<img
							class="image"
							:alt="move.name + ' image'"
							:src="iconCategory[move.category || 'other']"
						/>
					</template>

					<template #content>
						<p class="name">{{ move.name }}</p>
					</template>

					<template #footer>
						<p class="desc color-muted">
							{{
								move.desc.length > MAX_CHAR_LENGHT
									? move.desc.slice(0, MAX_CHAR_LENGHT) + '...'
									: move.desc
							}}
						</p>
					</template>
				</Card>
			</div>
		</main>

		<section class="about" id="about">
			<div class="about-texts">
				<p class="about-text">About Muay Thai Academy</p>

				<p class="about-desc color-muted">
					At Muay Thai Academy, we are dedicated to preserving the rich
					tradition of Muay Thai while providing world-class training to
					students of all levels.
				</p>
			</div>

			<div class="about-buttons">
				<Button class="mb-1" label="Learn More" severity="contrast" />

				<Button
					label="Join Now"
					severity="secondary"
					style="background-color: hsl(240, 3.2%, 6.1%)"
				/>
			</div>
		</section>

		<section id="classes" class="flex-column-center main">
			<Badge
				style="margin: 1rem"
				severity="secondary"
				value="Muay Thai Classes"
			></Badge>

			<p class="h1">Train with the Best</p>
			<p class="h2 color-muted">
				Our expert instructors will guide you through the fundamentals and
				advanced techniques of Muay Thai.
			</p>

			<div class="cards">
				<Card v-for="classItem in classes" class="card">
					<template #header>
						<img
							class="image"
							:alt="classItem.name + ' image'"
							:src="iconCategory[classItem.category || 'other']"
						/>
					</template>

					<template #content>
						<p class="name">{{ classItem.name }}</p>
					</template>

					<template #footer>
						<p class="desc color-muted">
							{{
								classItem.desc.length > MAX_CHAR_LENGHT
									? classItem.desc.slice(0, MAX_CHAR_LENGHT) + '...'
									: classItem.desc
							}}
						</p>

						<Button
							class="button-classes"
							label="Join Now"
							severity="contrast"
						/>
					</template>
				</Card>
			</div>
		</section>

		<section class="contact" id="contact">
			<p class="h1">Get in Touch</p>

			<p class="h2 color-muted" style="width: 35%">
				Have questions or want to learn more about our Muay Thai classes?
				<a>Contact us</a> today!
			</p>
		</section>
	</div>

	<!-- cards start -->

	<Dialog
		style="
			width: 40%;
			display: flex;
			align-items: center;
			justify-content: center;
		"
		v-model:visible="moveStore.visible"
		modal
	>
		<template #header>
			<img
				class="edit-image"
				:alt="moveStore.selectedMove?.name + ' move'"
				:src="moveStore.selectedMove?.src"
			/>
		</template>

		<div class="d-flex-column">
			<p class="name mb-1">{{ moveStore.selectedMove?.name }}</p>

			<p class="desc wrap">
				{{ moveStore.selectedMove?.desc }}
			</p>
		</div>
	</Dialog>

	<!-- cards end -->
</template>

<style scoped>
	/* hide scrollbar but allow scrolling */
	body {
		-ms-overflow-style: none; /* for Internet Explorer, Edge */
		scrollbar-width: none; /* for Firefox */
		overflow-y: scroll;
	}

	body::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
	.header {
		width: 100vw;
		height: 4rem;

		display: flex;
		align-items: center;
		justify-content: space-around;

		padding: 0 1rem;
		box-sizing: border-box;

		position: fixed;
		z-index: 1;

		background-color: #1c1b22;
	}
	.flex {
		display: flex;
	}
	.flex-column-center {
		display: flex;
		flex-direction: column;

		align-items: center;
		justify-content: center;
	}
	.h1 {
		letter-spacing: -0.05em;
		font-family: 'Manrope', sans-serif;
		font-weight: 700;
		line-height: 1;
		font-size: 3rem;
		margin: 0;
	}
	.h2 {
		font-family: 'Manrope', sans-serif;
		font-size: 1.25rem;
		line-height: 1.625;
	}
	.main {
		height: 115vh;

		display: flex;
		align-items: center;
		justify-content: center;
	}
	.cards {
		display: flex;
		align-items: center;
		justify-content: center;

		margin: 1.5rem;

		flex-wrap: wrap;
		width: 66%;
	}
	.card {
		width: 20rem;

		margin: 1.5rem;
		padding: 1.2rem;

		overflow: hidden;
		cursor: pointer;

		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		text-align: center;

		border: hsl(240, 7.1%, 22%) 1px solid;

		font-family: 'Manrope', sans-serif;
	}
	.card:hover {
		transform: scale(1.05);
		transition: ease-out;
	}
	.image {
		width: 4rem;
		height: 4rem;
		padding: 1rem;

		border-radius: 9999px;

		color: hsl(0, 0%, 0%);
		background-color: hsl(0, 0%, 90.2%);

		border-width: 0;
		border-style: solid;
		box-sizing: border-box;
	}
	.desc {
		margin: 0;
		padding: 0;

		box-sizing: border-box;
		border-width: 0;
		border-style: solid;
	}

	.name {
		margin: 0;
		padding: 0;

		font-weight: 700;
		font-size: 1.25rem;
		line-height: 1.75rem;
	}
	.color-muted {
		color: hsl(60, 5.3%, 85.1%);
	}
	.content {
		padding: 0;
	}

	.edit-image {
		max-width: 35rem;
	}
	.d-flex-column {
		display: flex;
		flex-direction: column;
	}
	.mb-1 {
		margin-bottom: 1rem;
	}
	.about {
		display: flex;
		align-items: center;
		justify-content: space-evenly;

		background-color: #3d3d43;
		padding-top: 8rem;
		padding-bottom: 8rem;
	}
	.about-texts {
		font-family: 'Manrope', sans-serif;
	}
	.about-text {
		font-size: 2.25rem;
		line-height: 1.25;

		letter-spacing: -0.05em;
		font-weight: 700;
		margin: 0;
	}
	.about-desc {
		margin: 1rem 0rem;
		line-height: 1.625;

		font-size: 1.25rem;
		max-width: 600px;
	}
	.about-buttons {
		display: flex;
		flex-direction: column;

		width: 35vw;
	}
	.contact {
		display: flex;
		flex-direction: column;

		background-color: #3d3d43;
		padding: 8rem 10rem;
	}
	.button-classes {
		margin-top: 4rem;

		display: flex;
		align-items: start;
	}
</style>
