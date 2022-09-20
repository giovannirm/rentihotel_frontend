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
							input.el-input__inner(type="text" v-model="$v.email.$model")
							div(v-if="submitted || $v.email.$error" class="invalid-feedback")
								div(v-if="!$v.email.email")
									font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
									span El email es inválido
								div(v-if="!$v.email.required")
									font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
									span El email es requerido
						.align-vertical
							label Nombres
								input.el-input__inner(v-model="$v.first_name.$model" @keydown="checkKey")
								div(v-if="submitted || $v.first_name.$error" class="invalid-feedback")
									div(v-if="!$v.first_name.required")
										font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
										span El nombre es requerido
							label Apellidos
								input.el-input__inner(v-model="$v.last_name.$model" @keydown="checkKey")
								div(v-if="submitted || $v.last_name.$error" class="invalid-feedback")
									div(v-if="!$v.last_name.required" class="invalid-feedback")
										font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
										span El apellido es requerido
						label Contraseña
							input.el-input__inner(type="password" v-model="$v.password.$model")
							div(v-if="submitted || $v.password.$error" class="invalid-feedback")
								div(v-if="!$v.password.required" class="invalid-feedback")
									font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
									span La contraseña es requerida
								div(v-if="!$v.password.minLength" class="invalid-feedback")
									font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
									span La contraseña debe tener mínimo 6 caracteres
								div(v-if="!$v.password.password" class="invalid-feedback")
									font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
									span La contraseña debe contener números y letras
						.align-vertical
							label Fecha de nacimiento
								el-date-picker(type="date" v-model="$v.birth_date.$model" format="dd/MM/yyyy" value-format="yyyy-MM-dd")
								div(v-if="submitted || $v.birth_date.$error" class="invalid-feedback")
									div(v-if="!$v.birth_date.required" class="invalid-feedback")
										font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
										span La fecha es requerida
							label País
								select.el-input__inner(v-model="$v.pais.$model")
									option(value="" disabled selected) Seleccione país
									option(v-for="pais in paises" :value="pais.id") {{pais.nombre}}
								div(v-if="submitted || $v.pais.$error" class="invalid-feedback")
									div(v-if="!$v.pais.required" class="invalid-feedback")
										font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
										span El país es requerido
						.flex.bottom-form
							p Renti puede mantener informado con correos electronicos personalizados sobre nuestros servicios. Consulta nuestra Politica de privacidad para conocer más detalles o eliminar tu cuenta
							el-checkbox Deseo que me contacten por correo electrónico
							p Al hacer click en Crear cuenta, reconozco que he leido y aceptado las Condiciones de uso y la Politica de privacidad
							el-checkbox(v-model="$v.terminos.$model") Acepto los términos y Condiciones
							div(v-if="submitted || $v.terminos.$error" class="invalid-feedback")
								div(v-if="!$v.terminos.sameAs" class="invalid-feedback")
									font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
									span Debe aceptar los términos y condiciones
							el-button.button-register(@click="register" :disabled="$v.$invalid") Crear cuenta
				el-divider
				.flex.footer
					.flex.footer-image
						img(src="../../assets/images/logo-footer.png")
						p 2020 Renti, Inc. All rights reserved.

</template>

<script>
import {
	email,
	required,
	sameAs,
	helpers,
	alphaNum,
	minLength
} from "vuelidate/lib/validators";
import logoWindow from "@/assets/images/img-window.png";

// const alphanumeric = value => {
// 	if (typeof value === "undefined" || value === null || value === "") {
// 		return true;
// 	}
// 	return /^[[a-zA-Z]+[0-9_.-]*[@]{1}[a-z]+[.]{1}[a-z]+$/.test(value);
// };

const password = value => {
	if (typeof value === "undefined" || value === null || value === "") {
		return true;
	}
	return /^(?=.*?[a-zA-Z])(?=.*?[0-9])([#?!@$%^&*_.-]*).{6,}$/.test(value);
};

export default {
	name: "register",
	auth: false,
	layout: "sinLayout",
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
			tipo_usuario: "CLIENTE",
			terminos: "",
			submitted: false
		};
	},
	validations: {
		email: { required, email },
		password: { required, minLength: minLength(6), password },
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
					console.log(result);
					this.paises = result.data.slice();
				})
				.catch(err => {
					console.log(err);
				});
		},
		register() {
			this.submitted = true;

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

			const URL = "https://apirenti.com/v1/api/account/register";
			// this.$v.$touch();
			// if (this.$v.$invalid) {
			// 	return;
			// }

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
					this.$message({
						showClose: true,
						message:
							"Se le enviará un correo de verificación de cuenta a su email.",
						type: "success",
						duration: 0
					});
					this.$router.push("/login");
				})
				.catch(err => {
					// console.log(err);
					console.log(err.response.data.email);
					if (err.response.data.email) {
						this.$message({
							showClose: true,
							message: err.response.data.email[0],
							type: "error",
							duration: 0
						});
					} else {
						this.$message({
							showClose: true,
							message: 'Los datos no son correctos',
							type: "error",
							duration: 0
						});
					}
				});
		}
	}
};
</script>

<style lang="stylus" scoped>
@import '../../assets/style/renti/register.styl';
</style>

<style lang="stylus" scoped>
.container
	background url('../../assets/images/background.png') no-repeat center center fixed
	background-size cover
</style>
