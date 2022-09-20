<template lang="pug">
	.container
		//-No es responsive
		//-quitar header y footer
		.main-window
			.window-mitad
				.window-img
					nuxt-link(tag="img" :src="logoWindow" to="/")
					p Renti
					p Plataforma de renta de hoteles
			el-card.align-content
				font-awesome-icon.icon(:icon="['fas', 'check-circle']")
				.greeting
					p Correo de recuperación de contraseña enviado
					p Se envió un mensaje a tu correo electrónico. Sigue las instrucciones del mensaje para restablecer la contraseña.
				nuxt-link(to="login")
					el-button.button-register Aceptar
				el-divider
				div.flex.footer
					div.flex.footer-image
						img(src="../assets/images/logo-footer.png")
						p 2019 Renti, Inc. All rights reserved.
</template>

<script>
import logoWindow from "@/assets/images/img-window.png";
export default {
	name: "send-email",
	data() {
		return {
			logoWindow: logoWindow,
		};
	}
};
</script>

<style lang="stylus" scoped>
@import '../assets/style/renti/register.styl';
.container
	.main-window
		min-height 100vh !important
		.align-content
			width 100%
			text-align center
			//.window-mitad
			box-shadow none
			border 0
			margin 0
			display flex
			flex-direction column
			justify-content center
			align-items center
			//fin
			.greeting
				p:nth-child(2)
					font-size 0.8rem
					color #606266
					text-align justify
			.icon
				font-size 70px !important
				// color #67c23a
				color #7b2deb

.el-card
	height 100vh
	margin 0

	.el-card__body
		margin auto
		width 70%
		height 100%

//fin
	.button-register
		background-color #7B2DEB
		color white
		border-radius 20px
		font-size 13px
		font-family: 'Be Vietnam', sans-serif
		font-weight bold
		align-self center
//fondo 50%
.container
	background none
	.window-mitad
		display none

@media screen and (min-width:764px)
	.container
		.window-mitad
			display block
			background url('../assets/images/background.png') no-repeat center center fixed
			width: 50%;
			min-height: 100vh;
			display: flex;
			justify-content: center;
			align-items: center;
			background-size cover
			.window-img
				width 30%
		.main-window
			.align-content
				width 50%

</style>
