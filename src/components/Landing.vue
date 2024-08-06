<script setup>
	import Card from 'primevue/card';
	import Badge from 'primevue/badge';
	import Button from 'primevue/button';
	import Dialog from 'primevue/dialog';
	import Toolbar from 'primevue/toolbar';
	import InputText from 'primevue/inputtext';
	import SelectButton from 'primevue/selectbutton';

	import {ref} from 'vue';
	import {useRouter} from 'vue-router';
	import {useMoveStore} from '../stores/moveStore';

	import classes from '../data/classes';

	document.title = 'Muay thai academy';

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

	const search = ref('');
	const category = ref({name: 'todos', value: 'all'});

	const options = ref([
		{
			value: 'all',
			name: 'todos',
		},
		{
			value: 'fist',
			name: 'puño',
		},
		{
			value: 'kick',
			name: 'patada',
		},
		{
			value: 'knee',
			name: 'rodilla',
		},
		{
			value: 'elbow',
			name: 'codo',
		},
		{
			value: 'other',
			name: 'otros',
		},
	]);

	const navigateToAdmin = () => {
		numberOfTimesClicked.value += 1;

		if (numberOfTimesClicked.value >= 3) {
			return router.push('/admin');
		}
	};

	const getMoves = () => moveStore.moves;

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
					label="Técnicas"
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
					label="Clases"
					text
					plain
					severity="contrast"
				/>
				<Button
					@click="scrollToSection('contact')"
					label="Contacto"
					text
					severity="contrast"
				/>
			</div>
		</header>

		<main id="techniques" class="flex-column-center main">
			<Badge
				style="margin: 1rem"
				severity="secondary"
				value="Técnicas de Muay Thai"
			></Badge>

			<p class="h1">Domina el Arte del Muay Thai</p>

			<p class="h2 color-muted">
				Nuestros instructores expertos te guiarán a través de los fundamentos y
				las técnicas avanzadas del Muay Thai.
			</p>

			<Toolbar>
				<template #center>
					<i class="pi pi-search" />

					<InputText
						type="text"
						v-model="search"
						class="mx-1"
						placeholder="Golpe"
					/>
				</template>

				<template #end>
					<SelectButton
						:options="options"
						v-model="category"
						aria-labelledby="basic"
						optionLabel="name"
						@error="category = options[0]"
					/>
				</template>
			</Toolbar>

			<div class="cards">
				<Card
					@click="showProduct(move)"
					v-for="move in getMoves().filter((move) => {
						if (!search && (!category || category.value === 'all')) {
							return true;
						}

						if (search && (!category || category.value === 'all')) {
							return (
								move.name.toLowerCase().includes(search.toLowerCase()) ||
								move.desc.toLowerCase().includes(search.toLowerCase())
							);
						}

						if (category.value && !search) {
							return move.category === category.value;
						}

						return (
							move.category === category.value &&
							(move.name.toLowerCase().includes(search.toLowerCase()) ||
								move.desc.toLowerCase().includes(search.toLowerCase()))
						);
					})"
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
				<p class="about-text">Acerca de la Academia de Muay Thai</p>

				<p class="about-desc color-muted">
					En la Academia de Muay Thai, estamos dedicados a preservar la rica
					tradición del Muay Thai mientras ofrecemos entrenamiento de clase
					mundial a estudiantes de todos los niveles.
				</p>
			</div>

			<div class="about-buttons">
				<Button class="mb-1" label="Aprende más" severity="contrast" />

				<Button
					label="Únete ahora"
					severity="secondary"
					style="background-color: hsl(240, 3.2%, 6.1%)"
				/>
			</div>
		</section>

		<section id="classes" class="flex-column-center classes">
			<Badge
				style="margin: 1rem"
				severity="secondary"
				value="Clases de Muay Thai"
			></Badge>

			<p class="h1">Entrena con los Mejores</p>
			<p class="h2 color-muted">
				Nuestros instructores expertos te guiarán a través de los fundamentos y
				las técnicas avanzadas del Muay Thai.
			</p>

			<div class="cards-class">
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
							{{ classItem.desc }}
						</p>

						<Button
							class="button-classes"
							label="Aprende más"
							severity="contrast"
						/>
					</template>
				</Card>
			</div>
		</section>

		<section class="contact" id="contact">
			<p class="h1">Ponte en Contacto</p>

			<p class="h2 color-muted" style="width: 35%">
				¿Tienes preguntas o quieres saber más sobre nuestras clases de Muay
				Thai?
				<a class="mouse-over">¡Contáctanos</a> hoy!
			</p>
		</section>
	</div>

	<!-- cards start -->

	<Dialog
		:header="moveStore.selectedMove?.name"
		v-model:visible="moveStore.visible"
		modal
		style="width: 30%"
	>
		<img
			class="edit-image"
			:alt="moveStore.selectedMove?.name + ' move'"
			:src="moveStore.selectedMove?.src"
		/>

		<p class="wrap">
			{{ moveStore.selectedMove?.desc }}
		</p>
	</Dialog>

	<!-- cards end -->
</template>

<style scoped>
	body {
		-ms-overflow-style: none; /* for Internet Explorer, Edge */
		scrollbar-width: none; /* for Firefox */
		overflow-y: scroll;
	}

	body::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
	.wrap {
		display: flex;
		flex-wrap: wrap;
		margin: 2rem 0rem;
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
	.cards-class {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		width: 66%;
	}

	.flex {
		display: flex;
	}

	.flex-column-center {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 99vw;
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
		display: flex;
		flex-direction: column;
		align-items: center;
		height: auto;
		min-height: 100vh;
		padding-top: 6rem;
	}

	.cards {
		display: flex;
		align-items: flex-start;
		justify-content: center;
		flex-wrap: wrap;
		width: 66%;
		margin-top: 1.5rem;
		flex-grow: 1;
	}
	.classes {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
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
		min-height: 15rem;
	}

	.card:hover {
		transform: scale(1.05);
		transition: all 1 ease;
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
	.edit-image {
		max-width: 35rem;
		width: 100%;
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

	.mx-1 {
		margin: 0rem 1rem;
	}
	.mouse-over:hover {
		cursor: pointer;
	}
</style>
