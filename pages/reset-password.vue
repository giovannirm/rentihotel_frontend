<template lang="pug">
	//-no es responsive
	//-quitar header y footer
	.container
		el-alert(title="Renti" description="Google Play" show-icon)
		.main-window
			.window-img
				nuxt-link(tag="img" :src="logoWindow" to="/")
				p Renti
				p Plataforma de renta de hoteles
			el-card.align-content
				.greeting
					p Restablecer contraseña
					p Introduce la dirección de correo electrónico con la que creaste tu cuenta en Renti y te enviaremos un email con las instrucciones a seguir para generar tu nueva contraseña.
					el-form(@keyup.native.enter	="update")
						el-form-item(label="Dirección de correo electrónico")
							el-input(v-model="email")
							div(v-if="submitted && $v.email.$error" class="invalid-feedback")
								div(v-if="!$v.email.email")
									font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
									span El email es inválido
								div(v-if="!$v.email.required")
									font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
									span El email es requerido
				//- nuxt-link(to="/login")
				el-button.button-register(@click="update") Aceptar
				el-divider
				div.flex.footer
					div.flex.footer-image
						img(src="../assets/images/logo-footer.png")
						p 2019 Renti, Inc. All rights reserved.

</template>

<script>
import { email, required, sameAs } from "vuelidate/lib/validators";
import logoWindow from "@/assets/images/img-window.png";

export default {
	name: "update",
	data() {
		return {
			logoWindow: logoWindow,
			email: "",
			submitted: false
		};
	},
	validations: {
		email: { required, email }
	},
	methods: {
		update() {
			const data = {
				email: this.email,
			}
			this.submitted = true;
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			} else {
				this.$axios({
					method: "post",
					url: '/password/reset',
					headers: {
						accept: "application/json",
						"Content-Type": "application/json"
					},
					data: JSON.stringify(data),
				})
					.then(result => {
						if(result.status === 200) {
							this.$router.push("/send-email");
						}
					})
					.catch(err => {
						console.error(err);
					});
			}
		}
	}
};
</script>

<style lang="stylus">
@import '../assets/style/renti/register.styl';
// header
// 	display none
html
	min-height 100vh
	display flex
	flex-direction column
	.container
		display flex
		flex 1
		background url('../assets/images/background.png') no-repeat center center fixed
		background-size cover
	.main-window
		.align-content
			text-align center
			.greeting
				p:nth-child(2)
					font-size 0.8rem
					color #606266
					text-align justify
				.el-form
					&-item__label
						font-size 0.8rem
		.el-card
			box-shadow none
	.button-register
		background-color #7B2DEB
		color white
		border-radius 20px
		font-size 13px
		font-family: 'Be Vietnam', sans-serif
		font-weight bold
		align-self center
@media screen and (min-width:764px)
	.main-window
		min-height 100vh
</style>
