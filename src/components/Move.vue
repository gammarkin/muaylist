<script setup>
	import {useRoute} from 'vue-router';
	import {useMoveStore} from '../stores/moveStore';

	import CreateCard from './CreateCard.vue';

	const route = useRoute();
	const moveStore = useMoveStore();

	const id = route.params.id;

	let moveName = '';

	if (id < moveStore.moves.length + 1) {
		moveName = moveStore.moves.find((m) => m.id == id).name;
	} else {
		moveName = 'Nuevo';
	}

	document.title = `${moveName} golpe`;
</script>

<template>
	<div class="container-flex-center">
		<CreateCard />
	</div>
</template>

<style scoped>
	.container-flex-center {
		display: flex;
		justify-content: center;
		align-items: center;

		flex-direction: column;

		width: 100vw;
		height: 100vh;
	}
</style>
