<script setup>
	import {ref} from 'vue';
	import {useRoute, useRouter} from 'vue-router';
	import {useMoveStore} from '../stores/moveStore';
	import {useToast} from 'primevue/usetoast';

	import Toast from 'primevue/toast';
	import Button from 'primevue/button';
	import Dialog from 'primevue/dialog';
	import Divider from 'primevue/divider';
	import Textarea from 'primevue/textarea';
	import InputText from 'primevue/inputtext';
	import FileUpload from 'primevue/fileupload';

	const route = useRoute();
	const router = useRouter();
	const moveStore = useMoveStore();
	const toast = useToast();

	const openEditImage = ref(false);

	const id = route.params.id;
	const move = moveStore.moves.find((m) => m.id == id); // intentionally bad check

	document.title = `${move.name} golpe`;

	const handleImageError = (event) => {
		const fallbackImage =
			'https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg';
		event.target.src = fallbackImage;
	};

	const gotoAdmin = () => {
		router.push('/admin');
	};

	const save = (move) => {
		if (Object.values(move).some((value) => !value))
			// checks if some value is empty
			return toast.add({
				severity: 'error',
				summary: 'Error',
				detail:
					'Por favor, complete todos los campos antes de guardar el movimiento.',
				life: 3000,
			});

		moveStore.editMove(move);

		gotoAdmin();
	};

	const remove = (id) => {
		moveStore.removeMoveById(+id);

		gotoAdmin();
	};

	const openCloseEditImage = () => {
		openEditImage.value = !openEditImage.value;
	};

	const customBase64Uploader = async (event) => {
		const file = event.files[0];
		const reader = new FileReader();
		let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

		reader.readAsDataURL(blob);

		reader.onloadend = function () {
			const base64data = reader.result;

			move.src = base64data;
		};

		toast.add({
			severity: 'info',
			summary: 'Success',
			detail: 'File Uploaded',
			life: 3000,
		});

		openCloseEditImage();
	};
</script>

<template>
	<div class="container-flex-center">
		<img
			class="edit-image"
			:alt="move?.name + ' move'"
			:src="move.src"
			@error="handleImageError"
			@click="openCloseEditImage"
		/>

		<Toast />

		<Dialog v-model:visible="openEditImage" modal>
			<div class="container-flex-between d-flex-column">
				<div class="container-flex-between">
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
					>
						<template #empty>
							<p>Drag and drop files to here to upload.</p>
						</template>
					</FileUpload>
				</div>

				<Divider layout="horizontal" class="flex md:hidden"><b>OR</b> </Divider>

				<InputText
					class="mx-1"
					type="text"
					v-model="move.src"
					:invalid="!move.src"
					>{{ move?.src }}</InputText
				>
			</div>

			<template #footer>
				<div class="flex gap-4 mt-1">
					<Button label="Guardar" class="m-1" @click="openCloseEditImage" />
				</div>
			</template>
		</Dialog>

		<div class="d-flex-column">
			<InputText type="text" v-model="move.name" :invalid="!move.name"
				>{{ move?.name }}
			</InputText>

			<Textarea :invalid="!move.desc" v-model="move.desc" rows="5" cols="30">
				{{ move?.desc }}
			</Textarea>
		</div>

		<div class="flex gap-4 mt-1">
			<Button label="Guardar" @click="save(move)" />

			<Button
				label="Eliminar"
				severity="danger"
				@click="remove(id)"
				class="mx-1"
			/>

			<Button label="Volver" severity="info" @click="$router.push('/admin')" />
		</div>
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
		margin: 1rem 0;
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
