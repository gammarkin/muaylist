<script setup>
	import {ref} from 'vue';

	import InputText from 'primevue/inputtext';
	import DataTable from 'primevue/datatable';
	import Textarea from 'primevue/textarea';
	import Button from 'primevue/button';
	import Column from 'primevue/column';
	import Dialog from 'primevue/dialog';

	import {useMoveStore} from './stores/moveStore';

	const moveStore = useMoveStore();

	const createDefaultMove = () => ({
		id: moveStore.moves.length + 1,
		src: '',
		name: '',
		desc: '',
	});

	const handleImageError = (event) => {
		const fallbackImage =
			'https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg';
		event.target.src = fallbackImage;
	};

	const newMove = ref(createDefaultMove());

	const showProduct = (product) => {
		newMove.value = {...newMove.value, ...product.data};

		moveStore.setSelectedMove(product.data);
		moveStore.openClose();
	};

	const showCreate = () => {
		newMove.value = createDefaultMove();

		moveStore.openCloseCreate();
	};

	const create = () => {
		moveStore.addMove(newMove.value);
	};
</script>

<template>
	<div class="d-flex-column">
		<Button
			:onClick="showCreate"
			label="+"
			class="btn-small container-flex-center"
			severity="info"
		/>

		<DataTable
			selectionMode="single"
			size="large"
			:value="moveStore.moves"
			tableStyle="width: 100vw"
			@row-click="showProduct"
		>
			<Column field="id" header="Id"></Column>
			<Column field="name" header="Name"></Column>
			<Column field="desc" header="Description"></Column>
		</DataTable>

		<!-- create card start -->
		<Dialog v-model:visible="moveStore.createVisible" modal>
			<div class="d-flex-column">
				<label class="mb-1" for="src">src</label>

				<div class="container-flex-between">
					<InputText type="text" class="mb-1" v-model="newMove.src" id="src">
						{{ newMove?.name }}
					</InputText>

					<img
						@error="handleImageError"
						:alt="newMove?.name"
						:src="newMove?.src"
						class="mx-1 w-50"
					/>
				</div>
			</div>

			<div class="d-flex-column">
				<label class="mb-1" for="name">name</label>

				<InputText
					id="name"
					type="text"
					v-model="newMove.name"
					:invalid="newMove.name === null"
					>{{ moveStore.selectedMove?.name }}
				</InputText>

				<label class="my-1" for="desc">description</label>

				<Textarea id="desc" v-model="newMove.desc" rows="5" cols="30">
					{{ newMove.desc }}
				</Textarea>
			</div>

			<template #footer>
				<div class="flex gap-4 mt-1">
					<Button label="Guardar" class="m-1" :onClick="create" />
				</div>
			</template>
		</Dialog>

		<!-- create end -->

		<!-- edit and delete cards start -->
		<Dialog v-model:visible="moveStore.visible" modal>
			<template #header>
				<img
					class="edit-image"
					:alt="moveStore.selectedMove?.name + ' move'"
					:src="newMove.src"
					@click="moveStore.openCloseChangeImage"
					@error="handleImageError"
				/>

				<InputText
					class="mx-1"
					v-if="moveStore.editImage"
					type="text"
					v-model="newMove.src"
					:invalid="newMove.src == ''"
					>{{ moveStore.selectedMove?.src }}</InputText
				>
			</template>

			<div class="d-flex-column">
				<InputText
					type="text"
					v-model="newMove.name"
					:invalid="newMove.name == ''"
					>{{ moveStore.selectedMove?.name }}
				</InputText>

				<Textarea v-model="newMove.desc" rows="5" cols="30">
					{{ moveStore.selectedMove?.desc }}
				</Textarea>
			</div>

			<template #footer>
				<div class="flex gap-4 mt-1">
					<Button
						label="Guardar"
						class="mx-1"
						@click="moveStore.editMove(newMove)"
					/>

					<Button
						label="Eliminar"
						severity="danger"
						:onclick="moveStore.removeMoveById"
					/>
				</div>
			</template>
		</Dialog>

		<!-- edit and delete cards end -->
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
	.m-1 {
		margin: 1rem;
	}
	.mx-1 {
		margin: 0rem 1rem;
	}
	.mb-1 {
		margin-bottom: 1rem;
	}
	.mt-1 {
		margin-top: 1rem;
	}
	.my-1 {
		margin: 1rem 0rem;
	}
	.w-50 {
		width: 50px;
	}
	.btn-small {
		width: 2%;
		margin: 1rem 0.4rem;
	}
	.edit-image {
		max-width: 35rem;
	}

	.edit-image:hover {
		cursor: pointer;
	}

	.d-flex-column {
		display: flex;
		flex-direction: column;
	}
</style>
