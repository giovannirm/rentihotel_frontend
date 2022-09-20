<template lang="pug">
	.container-valid
		el-card
			img(src="../assets/images/payment.png")
			p TU PAGO SE HA REALIZADO CON ÉXITO
			p Gracias por reservar con Renti. Los detalles y la boleta de su reserva serán enviados al email que registró.
			el-button(@click="toHome") Regresar al home
</template>

<script>
export default {
	layout: 'sinLayout',
	loading: false,
	methods: {
		toHome() {
			this.$router.push('/');
		}
	}
}
</script>

<style lang="stylus">
	@import "../assets/style/renti/global"
	*
		font-family $font-family
	.container-valid
		background-image url('../assets/images/fondo-success.png')
		background-size cover
		background-position center
		height 100vh
		display flex
		justify-content center
		align-items center
		.el-card
			width 100%
			height 100%
			&__body
				height 100%
				display flex
				flex-direction column
				align-items center
				justify-content center
				img
					height 200px
				p:nth-child(2)
					font-weight bold
					font-size 22px
					margin-bottom 2%
					text-align center
				p:nth-child(3)
					font-size 18px
					text-align justify
					margin-bottom 15%
				.el-button
					border 1px solid $renti
					font-size 15px
					font-weight bold
					color white
					background #7b2deb
				.el-button:focus
					color white
					background #7b2deb

				.el-button:hover
					color $renti
					border 1px solid black
					background-color white

	@media only screen and (min-width: 768px)
		.container-valid
			background-color $renti
			.el-card
				width 32%
				height auto
				p:nth-child(3)
					margin-bottom 10%

</style>
