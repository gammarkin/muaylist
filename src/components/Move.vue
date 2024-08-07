<script setup>
	import {useRoute} from 'vue-router';
	import {useMoveStore} from '../stores/moveStore';

	import CreateCard from './CreateCard.vue';
	import Button from 'primevue/button';

	const route = useRoute();
	const moveStore = useMoveStore();

	let moveName = '';
	let id = route.params.id;

	const lastIdFromMoves = moveStore.moves.reduce(
		(a, b) => Math.max(a, b.id),
		0
	);

	const isEditPage =
		id < lastIdFromMoves + 1 && moveStore.moves.some((move) => move.id == id);

	if (!id) {
		id = lastIdFromMoves + 1;
	}

	if (isEditPage) {
		// get the bigger id an add one to be the last from arr
		moveName = moveStore.moves.find((m) => m.id == id).name;
	} else {
		moveName = 'Nuevo';
	}

	document.title = `${moveName} golpe`;
</script>

<template>
	<div class="container-flex-center">
		<div class="button-back">
			<Button icon="pi pi-arrow-left" text @click="$router.push('/admin')" />
		</div>

		<CreateCard
			:id="Number(id)"
			backRoute="/admin"
			:buttonType="isCreatePage ? 'create' : 'edit'"
		/>
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

	.button-back {
		position: absolute;
		top: 0;
		left: 0;
		margin: 10px;
	}
</style>
