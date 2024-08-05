<script setup>
	import {ref} from 'vue';
	import {useRouter} from 'vue-router';
	import {useToast} from 'primevue/usetoast';

	import SelectButton from 'primevue/selectbutton';
	import FloatLabel from 'primevue/floatlabel';
	import FileUpload from 'primevue/fileupload';
	import InputText from 'primevue/inputtext';
	import DataTable from 'primevue/datatable';
	import Textarea from 'primevue/textarea';
	import Divider from 'primevue/divider';
	import Button from 'primevue/button';
	import Column from 'primevue/column';
	import Dialog from 'primevue/dialog';
	import Toast from 'primevue/toast';

	import {useMoveStore} from '../stores/moveStore';

	document.title = 'Admin list';

	const moveStore = useMoveStore();
	const router = useRouter();

	const toast = useToast();

	const createDefaultMove = () => ({
		id: moveStore.moves.length + 1,
		src: '',
		name: '',
		desc: '',
		category: '',
	});

	const options = ref(['fist', 'kick', 'knee', 'elbow', 'other']);

	const handleImageError = (event) => {
		const fallbackImage =
			'https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg';
		event.target.src = fallbackImage;
	};

	const newMove = ref(createDefaultMove());
	const triedToSave = ref(false);

	const goToMoveId = (product) => {
		router.push(`admin/move/${product.data?.id}`);
	};

	const showCreate = () => {
		newMove.value = createDefaultMove();
		triedToSave.value = false;

		moveStore.openCloseCreate();
	};

	const create = () => {
		triedToSave.value = true;

		if (Object.values(newMove.value).some((value) => !value))
			// checks if some value is empty
			return toast.add({
				severity: 'error',
				summary: 'Error',
				detail:
					'Por favor, complete todos los campos antes de crear un nuevo movimiento.',
				life: 3000,
			});

		moveStore.addMove(newMove.value);

		showCreate();
	};

	const changeToLanding = () => {
		router.push('/');
	};

	const customBase64Uploader = async (event) => {
		const file = event.files[0];
		const reader = new FileReader();
		let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

		reader.readAsDataURL(blob);

		reader.onloadend = function () {
			const base64data = reader.result;

			newMove.value.src = base64data;
		};
	};
</script>

<template>
	<div class="d-flex-column">
		<div class="container-flex-between">
			<Button
				:onClick="showCreate"
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

		<!-- create card start -->
		<Dialog v-model:visible="moveStore.createVisible" modal>
			<div class="d-flex-column">
				<label class="mb-1" for="src">Imagen</label>

				<div class="d-flex-column">
					<div>
						<Toast />

						<FileUpload
							mode="basic"
							name="demo[]"
							@uploader="customBase64Uploader"
							accept="image/*"
							:maxFileSize="1000000"
							customUpload
							auto
							style="width: 100%"
							chooseLabel="Eligir"
						/>
					</div>

					<Divider layout="horizontal" class="flex md:hidden"
						><b>OR</b>
					</Divider>

					<div class="container-flex-between">
						<InputText
							placeholder="Inserta la URL de la imagen"
							type="text"
							class="mb-1"
							v-model="newMove.src"
							id="src"
							:invalid="!newMove.src && triedToSave"
						>
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
			</div>

			<div class="d-flex-column">
				<FloatLabel class="my-1">
					<InputText
						placeholder="Insert move name here"
						id="name"
						type="text"
						v-model="newMove.name"
						:invalid="!newMove.name && triedToSave"
						>{{ moveStore.selectedMove?.name }}
					</InputText>
					<label for="name">Nombre del golpe</label>
				</FloatLabel>

				<FloatLabel class="my-1">
					<Textarea
						placeholder="Insert move Description here"
						id="desc"
						v-model="newMove.desc"
						rows="5"
						cols="30"
						:invalid="!newMove.desc && triedToSave"
					>
						{{ newMove.desc }}
					</Textarea>
					<label for="desc">descripción del golpe</label>
				</FloatLabel>

				<label class="mb-1" for="cat">Categoría</label>
				<SelectButton
					:options="options"
					:invalid="!newMove.category && triedToSave"
					v-model="newMove.category"
					aria-labelledby="basic"
				/>
			</div>

			<template #footer>
				<div class="flex gap-4 mt-1">
					<Button label="Guardar" class="m-1" :onClick="create" />
				</div>
			</template>
		</Dialog>

		<!-- create end -->
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
	.d-flex-column {
		display: flex;
		flex-direction: column;
	}
</style>
