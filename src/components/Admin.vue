<script setup>
	import {useRouter} from 'vue-router';

	import DataTable from 'primevue/datatable';

	import Button from 'primevue/button';
	import Column from 'primevue/column';

	import {useMoveStore} from '../stores/moveStore';

	document.title = 'Admin list';

	const moveStore = useMoveStore();
	const router = useRouter();

	const goToMoveId = (product) => {
		router.push(`admin/move/${product.data?.id}`);
	};

	const goToNewMove = () => {
		router.push(
			`admin/move/${moveStore.moves.reduce((a, b) => Math.max(a, b.id), 0) + 1}`
		);
	};

	const changeToLanding = () => {
		router.push('/');
	};
</script>

<template>
	<div class="d-flex-column">
		<div class="container-flex-between">
			<Button
				:onClick="goToNewMove"
				label="+"
				class="btn-small container-flex-center"
				severity="info"
			/>

			<Button
				icon="pi pi-user"
				severity="info"
				rounded
				outlined
				aria-label="User"
				label="Move to user view"
				class="mx-1"
				@click="changeToLanding"
			/>
		</div>

		<DataTable
			selectionMode="single"
			size="large"
			:value="moveStore.moves.sort((a, b) => a.id - b.id)"
			tableStyle="width: 100vw"
			@row-click="goToMoveId"
		>
			<Column field="id" header="Id"></Column>
			<Column field="name" header="Nombre"></Column>
			<Column field="desc" header="Descripción"></Column>
		</DataTable>
	</div>
</template>

<style scoped>
	.container-flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.container-flex-between {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.mx-1 {
		margin: 0rem 1rem;
	}
	.btn-small {
		width: 2%;
		margin: 1rem 0.4rem;
	}
	.d-flex-column {
		display: flex;
		flex-direction: column;
	}
</style>
