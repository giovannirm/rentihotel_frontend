<template lang="pug">
	div
		HeaderBlack
		nuxt
		Footer
</template>

<script>
import HeaderBlack from '~/components/Layouts/HeaderBlack.vue';
import Footer from '~/components/Layouts/Footer.vue';

export default {
	components:{
		HeaderBlack,
		Footer,
	},
}
</script>

<style>

</style>
