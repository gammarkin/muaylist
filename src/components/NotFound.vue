<script setup>
	import {useRouter} from 'vue-router';

	import Button from 'primevue/button';

	const router = useRouter();

	const goToHome = () => {
		router.push('/');
	};
</script>

<template>
	<div class="container">
		<p class="h1">404</p>

		<p class="h2">Page not found</p>

		<Button class="mt-5" severity="info" text="" @click="goToHome"
			>Go back to Home</Button
		>
	</div>
</template>

<style scoped>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		width: 100vw;
		height: 100vh;
	}
	.h1 {
		font-size: 15rem;
		margin: 0;
	}
	.h2 {
		font-size: 3rem;
		margin: 0;
		text-shadow: 1px 1px 2px red, 0 0 1em blue, 0 0 0.2em blue;
	}
	.mt-5 {
		margin-top: 5rem;
	}
</style>
