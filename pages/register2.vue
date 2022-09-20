<template lang="pug">
	.container
		el-alert(title="Renti" description="Google Play" show-icon)
		.main-window
			.window-img
				nuxt-link(tag="img" :src="logoWindow" to="/")
				p Renti
				p Plataforma de renta de hoteles
			el-card
				.greeting
					p Crear una cuenta
					p ¿Ya tienes una cuenta?
						nuxt-link(to="/login")  Iniciar sesión
				.register
					el-form.form-register(@keyup.native.enter="register")
						label Dirección de correo electrónico
							input.el-input__inner(type="text" v-model="email")
							div(v-if="submitted && $v.email.$error" class="invalid-feedback")
								div(v-if="!$v.email.email")
									font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
									span El email es inválido
								div(v-if="!$v.email.required")
									font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
									span El email es requerido
						.align-vertical
							label Nombres
								input.el-input__inner(v-model="first_name" @keydown="checkKey")
								div(v-if="submitted && !$v.first_name.required" class="invalid-feedback")
									font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
									span El nombre es requerido
							label Apellidos
								input.el-input__inner(v-model="last_name" @keydown="checkKey")
								div(v-if="submitted && !$v.last_name.required" class="invalid-feedback")
									font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
									span El apellido es requerido
						label Contraseña
							input.el-input__inner(type="password" v-model="password")
							div(v-if="submitted && !$v.password.required" class="invalid-feedback")
								font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
								span La contraseña es requerida
							div(v-if="submitted && !$v.password.minLength" class="invalid-feedback")
								font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
								span La contraseña debe tener mínimo 6 caracteres
							div(v-if="submitted && !$v.password.password" class="invalid-feedback")
								font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
								span La contraseña debe contener números y letras
						.align-vertical
							label Fecha de nacimiento
								el-date-picker(type="date" v-model="birth_date" format="yyyy/MM/dd" value-format="yyyy-MM-dd")
								div(v-if="submitted && !$v.birth_date.required" class="invalid-feedback")
									font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
									span La fecha es requerida
							label País
								select.el-input__inner(v-model="pais")
									option(value="" disabled selected) Seleccione país
									option(v-for="pais in paises" :value="pais.id") {{pais.nombre}}
								div(v-if="submitted && !$v.pais.required" class="invalid-feedback")
									font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
									span El país es requerido
						.flex.bottom-form
							p Renti puede mantener informado con correos electronicos personalizados sobre nuestros servicios. Consulta nuestra Politica de privacidad para conocer más detalles o eliminar tu cuenta
							el-checkbox Deseo que me contacten por correo electrónico
							p Al hacer click en Crear cuenta, reconozco que he leido y aceptado las Condiciones de uso y la Politica de privacidad
							el-checkbox(v-model="terminos") Acepto los términos y Condiciones
							div(v-if="submitted && !$v.terminos.sameAs" class="invalid-feedback")
								font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
								span Debe aceptar los términos y condiciones
							el-button.button-register(@click="register") Crear cuenta
				el-divider
				.flex.footer
					.flex.footer-image
						img(src="../assets/images/logo-footer.png")
						p 2019 Renti, Inc. All rights reserved.

</template>

<script>
import { email, required, sameAs,  helpers, alphaNum, minLength } from "vuelidate/lib/validators";
import logoWindow from "@/assets/images/img-window.png";

const alphanumeric = (value) => {
	if (typeof value === 'undefined' || value === null || value === '') {
		return true
	}
	return /^[[a-zA-Z]+[0-9_.-]*[@]{1}[a-z]+[.]{1}[a-z]+$/.test(value)
}

const password = (value) => {
	if (typeof value === 'undefined' || value === null || value === '') {
		return true
	}
	return /^(?=.*?[a-zA-Z])(?=.*?[0-9])([#?!@$%^&*_.-]*).{6,}$/.test(value)
}

export default {
	name: "register",
	auth: false,
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
			tipo_usuario: null,
			terminos: "",
			submitted: false
		};
	},
	validations: {
		email: { required, email, alphanumeric },
		password: { required, minLength: minLength(6), password},
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
			const URL = "paises";
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
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}
			const { email, password, first_name, last_name, birth_date, pais, tipo_usuario } = this;
			const data = JSON.stringify({ email, password, first_name, last_name, birth_date, pais, tipo_usuario });
			const URL = "https://apirenti.com/v1/api/account/register";
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
</style>
