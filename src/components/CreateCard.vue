<script setup>
	import SelectButton from 'primevue/selectbutton';
	import FloatLabel from 'primevue/floatlabel';
	import FileUpload from 'primevue/fileupload';
	import InputText from 'primevue/inputtext';
	import Textarea from 'primevue/textarea';
	import Divider from 'primevue/divider';
	import Toast from 'primevue/toast';
	import ConfirmPopup from 'primevue/confirmpopup';

	import {ref} from 'vue';
	import {useToast} from 'primevue/usetoast';
	import {useConfirm} from 'primevue/useconfirm';
	import {useRouter} from 'vue-router';

	import Button from 'primevue/button';

	import {useMoveStore} from '../stores/moveStore';

	import options from '../data/options';
	import {getDefaultMove} from '../data/moves';

	const props = defineProps({
		id: Number,
		backRoute: String,
		buttonType: String,
	});

	const moveStore = useMoveStore();
	const confirm = useConfirm();
	const router = useRouter();
	const toast = useToast();

	const id = props.id;
	const nextMoveId = moveStore.moves.reduce((a, b) => Math.max(a, b.id), 0) + 1; // get the bigger id an add one to be the last from arr
	const isCreatePage =
		id >= nextMoveId && !moveStore.moves.some((move) => move.id == id); // if false, is edit.

	let foundMove = {};

	if (!isCreatePage) {
		const move = moveStore.moves.find((move) => move.id == id);

		foundMove = JSON.parse(
			JSON.stringify({
				...move,
				category: options.find((option) => option.value === move.category),
			})
		);
	}

	const createDefaultMove = () =>
		JSON.parse(JSON.stringify(getDefaultMove(nextMoveId)));

	const goBack = () => {
		router.push(props.backRoute);
	};

	const handleImageError = (event) => {
		const fallbackImage =
			'https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg';

		event.target.src = fallbackImage;
	};

	const newMove = ref(isCreatePage ? createDefaultMove() : foundMove);
	const triedToSave = ref(false);

	const save = (move) => {
		triedToSave.value = true;

		if (Object.values(move).some((value) => !value))
			// checks if some value is empty
			return toast.add({
				severity: 'error',
				summary: 'Error',
				detail:
					'Por favor, complete todos los campos antes de crear un nuevo movimiento.',
				life: 3000,
			});

		moveStore.editMove(move);

		goBack();
	};

	const customBase64Uploader = async (event) => {
		const file = event.files[0];
		const reader = new FileReader();
		let blob = await fetch(file.objectURL).then((r) => r.blob());

		reader.readAsDataURL(blob);

		reader.onloadend = function () {
			const base64data = reader.result;

			newMove.value.src = base64data;
		};

		toast.add({
			severity: 'info',
			summary: 'Success',
			detail: 'File Uploaded',
			life: 3000,
		});
	};

	const remove = (id) => {
		moveStore.removeMoveById(+id);

		goBack();
	};

	const confirmDelete = (event) => {
		confirm.require({
			target: event.currentTarget,
			message: 'Do you want to delete this record?',
			icon: 'pi pi-info-circle',
			rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
			acceptClass: 'p-button-danger p-button-sm',
			rejectLabel: 'Cancel',
			acceptLabel: 'Delete',
			accept: () => {
				toast.add({
					severity: 'info',
					summary: 'Confirmed',
					detail: 'Record deleted',
					life: 3000,
				});

				remove(id);
			},
			reject: () => {
				toast.add({
					severity: 'error',
					summary: 'Rejected',
					detail: 'You have rejected',
					life: 3000,
				});
			},
		});
	};
</script>

<template>
	<div class="container">
		<Toast />
		<ConfirmPopup />

		<div class="d-flex-column">
			<label class="mb-1" for="src">Imagen</label>
			<div class="d-flex-column">
				<div>
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
				<Divider layout="horizontal" class="flex md:hidden"><b>OR</b> </Divider>
				<div class="container-flex-between">
					<InputText
						placeholder="Inserta la URL de la imagen"
						type="text"
						class="mb-1"
						v-model="newMove.src"
						id="src"
						:invalid="!newMove.src && triedToSave"
					/>
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
				/>
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
				/>
				<label for="desc">descripción del golpe</label>
			</FloatLabel>

			<label class="mb-1" for="cat">Categoría</label>

			<!-- to remove the all option for create -->
			<SelectButton
				:options="options.filter((option) => option.value !== 'all')"
				:invalid="!newMove.category && triedToSave"
				v-model="newMove.category"
				aria-labelledby="basic"
				optionLabel="name"
			/>
		</div>

		<!-- button for create -->
		<div
			v-if="props.buttonType === 'create'"
			class="mt-1 container-flex-between"
		>
			<Button label="Guardar" class="my-1" @click="save(newMove)" />
			<Button
				class="flex-grow mx-1"
				label="Cancelar"
				severity="info"
				@click="$router.push('/admin')"
			/>
		</div>

		<!-- buttons for edit -->
		<div v-if="props.buttonType === 'edit'" class="mt-2 btn-containers">
			<Button class="flex-grow" label="Guardar" @click="save(newMove)" />
			<Button
				@click="confirmDelete($event)"
				label="Eliminar"
				severity="danger"
				class="mx-1 flex-grow"
			/>
			<Button
				class="flex-grow"
				label="Deshacer"
				severity="info"
				@click="$router.push('/admin')"
			/>
		</div>
	</div>
</template>

<style scoped>
	.container-flex-between {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.btn-containers {
		width: 100%;
		display: flex;
	}
	.flex-grow {
		margin: 0 5px;
		flex-grow: 1;
		flex-basis: 0;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
	}
	.mt-2 {
		margin-top: 2rem;
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
	.d-flex-column {
		display: flex;
		flex-direction: column;
	}
	#desc {
		width: 93%;
	}
</style>
