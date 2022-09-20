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
				div(v-if="valid === true")
					font-awesome-icon.icon(:icon="['fas', 'check-circle']")
					.greeting
						h5.card-title ¡Éxito!
						p.card-text ¡Has verificado exitosamente tu correo electrónico! Por favor haga click en iniciar sesión para acceder a su cuenta en Renti.
					div(v-if="!$v.repeatPassword.sameAsPassword || !$v.password.required || !$v.repeatPassword.required" type="error" class="invalid-name" )
						el-alert(type="error" description="Completa los campos, la contraseña debe contener letras y números." show-icon :closable="false")
					el-form(label-position="top" label-width="100px")
						el-form-item(label="Nueva contraseña")
							el-input(type="password" v-model.trim="$v.password.$model")
						el-form-item(label="Repita la contraseña")
							el-input(type="password" v-model.trim="$v.repeatPassword.$model")

						el-button.button-register(@click="sendPassword") Guardar cambios

				div(v-if="valid === false")
					font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
					.greeting
						h5.card-title ¡Oh no!
						p.card-text El link de validación no es correcto!.

				div(v-if="valid === ''")
					font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
					.greeting
						h5.card-title Cargando...
						p.card-text Espera un momento...
				el-divider
				div.flex.footer
					div.flex.footer-image
						img(src="../../assets/images/logo-footer.png")
						p 2020 Renti, Inc. All rights reserved.
</template>

<script>
import logoWindow from "@/assets/images/img-window.png";
import { required, sameAs } from "vuelidate/lib/validators";

const password = value => {
	if (typeof value === "undefined" || value === null || value === "") {
		return true;
	}
	return /^(?=.*?[a-zA-Z])(?=.*?[0-9])([#?!@$%^&*_.-]*).{6,}$/.test(value);
};
export default {
	name: "send-email",
	data() {
		return {
			logoWindow: logoWindow,
			password: "",
			repeatPassword: "",
			valid: ""
		};
	},
	validations: {
		password: {
			required,
			password
		},
		repeatPassword: {
			required,
			sameAsPassword: sameAs("password")
		}
	},
	mounted() {
		this.dataSend = this.$router.history.current.query;
		this.$axios({
			method: "get",
			url: `https://apirenti.com/v1/api/password/reset/${this.dataSend.team_id}/${this.dataSend.token}`,
			headers: {
				accept: "application/json",
				"Content-Type": "application/json"
			}
		})
			.then(result => {
				this.valid = true;
			})
			.catch(err => {
				this.valid = false;
				// this.$message({
				// 	showClose: true,
				// 	message: "El token es inválido.",
				// 	type: "error",
				// 	duration: 0
				// });
			});
	},
	methods: {
		sendPassword() {
			const data = {
				new_password1: this.password,
				new_password2: this.repeatPassword,
			}
			this.$axios({
				method: "post",
				url: `https://apirenti.com/v1/api/password/reset/${this.dataSend.team_id}/${this.dataSend.token}/done`,
				headers: {
					accept: "application/json",
					"Content-Type": "application/json"
				},
				data: JSON.stringify(data),
			})
				.then(result => {
					// console.log(result);
					// console.log("Correo activado");
					this.$message({
						showClose: true,
						message:
							"Datos guardados correctamente.",
						type: "success",
						duration: 0
					});
					this.$router.replace('/login')
				})
				.catch(err => {
					this.$message({
						showClose: true,
						message: "No se pudo guardar cambios.",
						type: "error",
						duration: 0
					});
				});
		}
	}
};
</script>

<style lang="stylus" scoped>
@import url('https://fonts.googleapis.com/css?family=Be+Vietnam&display=swap" rel="stylesheet')
*
	font-family 'Be Vietnam', sans-serif
.container
	.main-window
		min-height 100vh !important
		display flex
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
				margin-top 7%
				p:nth-child(2)
					font-size 0.8rem
					color #606266
					text-align justify
			.icon
				font-size 70px !important
				// color #67c23a
				color #7b2deb
.el-alert
	margin 2% 0%
.el-card
	height 100vh
	margin 0
	padding 5%
	.el-form
		margin 3% 10%
//fin
	.button-register
		background-color #7B2DEB
		color white
		border-radius 20px
		font-size 13px
		font-family: 'Be Vietnam', sans-serif
		font-weight bold
		align-self center

.container
	background none
	.window-mitad
		display none
	.window-img
		color white
		display flex
		flex-direction column
		align-items center
.footer
	font-size 12px
	display flex
	justify-content center
	align-items center
@media screen and (min-width:764px)
	.container
		.window-mitad
			display block
			background url('../../assets/images/background.png') no-repeat center center fixed
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
