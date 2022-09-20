<template lang="pug">
	.body-login
		el-alert(title="Renti" description="Google Play" show-icon)
		div.main-window
			div.window-img
				nuxt-link(tag="img" :src="logoWindow" to="/")
				p Renti
				p Plataforma de renta de hoteles
			el-card
				div.container-card(padding="8%")
					div.greeting
						p Bienvenido a Renti
						p Inicio de sesión
						p ¿Eres un nuevo usuario?
							strong
								nuxt-link(to="/register")  Crear una cuenta
					el-form.form-log(@keyup.native.enter="login(infoUser)")
						el-form-item(label="Dirección de correo electrónico")
							el-input.email(v-model="infoUser.email")
							div(v-if="submitted && !$v.infoUser.email.email")
								font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
								span El email es inválido
							div(v-if="submitted &&  !$v.infoUser.email.required")
								font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
								span El email es requerido
						el-form-item(label="Contraseña")
							el-input.password(show-password v-model="infoUser.password")
							div(v-if="submitted && !$v.infoUser.password.required" class="invalid-feedback")
								font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
								span La contraseña es requerida
						div.forgot-pass.flex
							el-button.button-login(@click="login(infoUser)") Continuar
								i(class="el-icon-right")
							nuxt-link(to="/reset-password" style="width: 100%;")
								label ¿Olvidaste tu contraseña?
					el-divider(content-position="center")
					//- div.button-social
					//- 	el-button.button-width
					//- 		font-awesome-icon.icon(:icon="['fab', 'google']")
					//- 		span Continuar con Google
					//- 	el-button.button-width
					//- 		font-awesome-icon.icon(:icon="['fab', 'facebook-f']")
					//- 		span  Continuar con Facebook
					div.flex.footer
						//- el-button Español
						div.flex.footer-image
							img(src="../assets/images/logo-footer.png")
							p 2020 Renti, Inc. All rights reserved.
</template>

<script>
import Axios from "axios";
import store from "../store/index.js";
import { email, required } from "vuelidate/lib/validators";
import logoWindow from "@/assets/images/img-window.png";

export default {
	name: "login",
	auth: false,
	layout: 'sinLayout',
	data() {
		return {
			logoWindow: logoWindow,
			user: "",
			infoUser: {
				email: "",
				password: ""
			},
			submitted: false,
		};
	},
	validations: {
		infoUser: {
			email: { required, email },
			password: { required }
		}
	},
	methods: {
		login(info) {
			this.submitted = true;
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}
			this.$auth.loginWith("local", { data: info }).then(response => {
				this.$nuxt.$router.replace('/');
				// this.$nuxt.$router.back()
				this.$store.dispatch("SET_USER", info);
			});
		},
	}
};
</script>

<style lang="stylus" scoped>
@import '../assets/style/renti/login.styl';
</style>
