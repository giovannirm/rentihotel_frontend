<template lang="pug">
	.container
		el-alert(title="Renti" description="Google Play" show-icon)
		.main-window
			.window-img
				nuxt-link(tag="img" :src="logoWindow" to="/")
				p Renti
				p Plataforma de renta de hoteles
			el-card.align-content
				.greeting
					p Confirma tu correo electrónico
					p Gracias por elegir Renti, para que tu registro sea exitoso sólo tienes que confirmar tu correo electrónico.
				nuxt-link(to="login")
					el-button.button-register Confirmar mi correo
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
	name: "register",
	layout: 'sinLayout',
	data() {
		return {
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
			submitted: false
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
		this.getCountry();
	},
	methods: {
		checkKey(e) {
			if (/\d/.test(e.key)) {
				e.preventDefault();
				e.stopPropagation();
			}
		},
		getCountry() {
			const URL = "https://apirenti.com/v1/paises/";
			this.$axios({
				method: "get",
				url: URL,
				headers: {
					accept: "application/json",
					"Content-Type": "application/json"
				}
			})
				.then(result => {
					this.paises = result.data.slice();
				})
				.catch(err => {
					console.log(err);
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
@import '../assets/style/renti/register.styl';
.main-window
	min-height 100vh
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
</style>
