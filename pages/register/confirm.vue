<template lang="pug">
	.container
		.main-window(v-if="valid === true")
			.window-img
				nuxt-link(tag="img" :src="logoWindow" to="/")
				p Renti
				p Plataforma de renta de hoteles
			el-card.align-content
				.greeting
					p Confirmación de correo exitosa
					p Gracias por elegir a Renti para reservar, para iniciar sesión haz click en el botón y encuentra los alojamientos más cómodos escogidos por tí.
				el-button.button-register(@click="goRoute('login')") Iniciar sesión
				el-divider
				div.flex.footer
					div.flex.footer-image
						img(src="../../assets/images/logo-footer.png")
						p 2020 Renti, Inc. All rights reserved.
		.main-window(v-if="valid===false")
			.window-img
				nuxt-link(tag="img" :src="logoWindow" to="/")
				p Renti
				p Plataforma de renta de hoteles
			el-card.align-content
				.greeting
					p Error en la confirmación de correo
					p El link de activación es inválido, vuelve a intentarlo!
				el-button.button-register(@click="goRoute('')") Regresar al inicio
				el-divider
				div.flex.footer
					div.flex.footer-image
						img(src="../../assets/images/logo-footer.png")
						p 2020 Renti, Inc. All rights reserved.
</template>

<script>
import { email, required, sameAs } from "vuelidate/lib/validators";
import logoWindow from "@/assets/images/img-window.png";
export default {
	name: "register",
	data() {
		return {
			mensaje: '',
			dataSend: '',
			logoWindow: logoWindow,
			paises: [],
			email: "",
			password: "",
			first_name: "",
			last_name: "",
			birth_date: "",
			pais: "",
			tipo_usuario: "",
			terminos: "",
			submitted: false,
			valid:'',
		};
	},
	validations: {
		email: { required, email },
		password: { required },
		first_name: { required },
		last_name: { required },
		birth_date: { required },
		pais: { required },
		terminos: {
			sameAs: sameAs(() => true)
		}
	},
	mounted() {

		this.confirmar();
	},

	methods: {
		checkKey(e) {
			if (/\d/.test(e.key)) {
				e.preventDefault();
				e.stopPropagation();
			}
		},
		goRoute(path) {
			this.$router.replace(`/${path}`)
		},
		confirmar() {
			this.dataSend = this.$router.history.current.query;
			this.$axios({
				method: "get",
				url: `https://apirenti.com/v1/api/account/activate/${this.dataSend.user_id}/${this.dataSend.token}`,
				headers: {
					accept: "application/json",
					"Content-Type": "application/json"
				},
			})
				.then(result => {
					this.valid = true;
				})
				.catch(err => {
					this.valid=false;

					// this.$message({
					// 	showClose: true,
					// 	message:
					// 		"El token es inválido.",
					// 	type: "error",
					// 	duration: 0
					// });

				});
		},
		register() {
			this.submitted = true;
			// stop here if form is invalid
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}
			const {
				email,
				password,
				first_name,
				last_name,
				birth_date,
				pais,
				tipo_usuario
			} = this;
			const data = JSON.stringify({
				email,
				password,
				first_name,
				last_name,
				birth_date,
				pais,
				tipo_usuario
			});
			const URL = "https://apirenti.com/v1/api/users/";
			this.$axios({
				method: "post",
				url: URL,
				headers: {
					accept: "application/json",
					"Content-Type": "application/json"
				},
				data: data
			})
				.then(res => {
					this.$router.push("/login");
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
};
</script>

<style lang="stylus" scoped>
@import '../../assets/style/renti/register.styl';
.container
	background url('../../assets/images/background.png') no-repeat center center fixed
	background-size cover
.main-window
	min-height 100vh
	display flex
	align-items center
	.align-content
		text-align center
		.greeting
			p:nth-child(2)
				font-size 0.8rem
				color #606266
				text-align justify
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
		height 50vh
		display flex
		align-items center
</style>
