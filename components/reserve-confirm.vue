<template lang="pug">
.modal-backdrop
	.modal
		.modal-header
			.title DETALLES DE LA RESERVAS
			button(type="button" class="btn-close" @click="close") x
		section.modal-body
			.subtitle
				i(class="el-icon-user-solid")
				span Información del Cliente
			el-divider(direction="horizontal")
			el-card
				form
					.flex
						label Nombre
							el-input(placeholder="Nombre" v-model="infoCliente.nombre")
							div(v-if="submitted && !$v.infoCliente.nombre.required" class="invalid-feedback")
								font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
								span El nombre es requerido
						label Apellido
							el-input(placeholder="Apellido" v-model="infoCliente.apellido")
							div(v-if="submitted && !$v.infoCliente.apellido.required" class="invalid-feedback")
								font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
								span El apellido es requerido
					.flex.flex-end
						label.width-full Tipo de documento
							el-select.width-full(v-model="infoCliente.tipo_documento")
								el-option(v-for="doc in tipo_doc" :value="doc.nombre" :label="doc.nombre")
								//- el-option(value="2" label="Pasaporte") Pasaporte
							div(v-if="submitted && !$v.infoCliente.tipo_documento.required" class="invalid-feedback")
								font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
								span El tipo de documento es requerido
						div.width-full
							el-input(placeholder="Número de documento" @keypress.native="checkKey" v-model="infoCliente.numero_documento")
							div(v-if="submitted && !$v.infoCliente.numero_documento.required" class="invalid-feedback")
									font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
									span El número de documento es requerido
									//- p(v-if="formData.tipo_documento === 'RUC'") RUC requerido con 11 dígitos.
									//- p(v-if="formData.tipo_documento === 'DNI'") DNI requerido con 8 dígitos.
									//- p(v-if="formData.tipo_documento === 'PASAPORTE'") PASAPORTE requerido con 12 dígitos.
					.flex.flex-end
						label.width-full Género
							.flex.column
								el-radio(v-model="infoCliente.genero" v-for="gen in genre" :value="gen.id" :label="gen.id") {{ gen.nombre}}
							div(v-if="submitted && !$v.infoCliente.genero.required " class="invalid-feedback")
								font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
								span Este campo es requerido
						label.width-full Edad
							el-input(placeholder="Edad" @keypress.native="checkKey" v-model="infoCliente.edad")
							div(v-if="submitted && !$v.infoCliente.edad.required" class="invalid-feedback")
								font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
								span La edad es requerida
			.subtitle
				i(class="el-icon-phone")
				span Contacto
			el-divider(direction="horizontal")
			el-card
				form.width-full
					.margin.width-full
						label Email
							el-input(placeholder="Correo electrónico" v-model="infoCliente.correo_electronico")

							div(v-if="submitted && !$v.infoCliente.correo_electronico.required" class="invalid-feedback")
								font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
								span El email es requerido
							div(v-if="submitted && !$v.infoCliente.correo_electronico.email" class="invalid-feedback")
								font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
								span El email es inválido
					.margin.width-full
						label Número de celular
						el-input(placeholder="Número" @keypress.native="checkKey" v-model="infoCliente.celular")
						div(v-if="submitted && !$v.infoCliente.celular.required " class="invalid-feedback")
							font-awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
							span El número de celular es requerido
			.subtitle
				i(class="el-icon-time")
				span Más detalles
			el-divider(direction="horizontal")
			el-card
				form.width-full
					.margin.width-full
						label Hora de llegada
							el-time-select(v-model="horaLlegada" :picker-options="{start: '00:00', step: '01:00',end: '24:00'}" placeholder="Select time")
		.modal-footer.flex
			div Total S/. {{ total }}
			el-button.btnPay(id="btn_pagar" @click="saveClient(infoCliente)") Continuar
</template>
<script>
import { validationMixin } from "vuelidate";

import {
	email,
	required,
	numeric,
	maxLength,
	minLength
} from "vuelidate/lib/validators";
import axios from "axios";
if (process.browser) {
	window.Culqi.options({
		style: {
			maincolor: "#7b2deb",
			buttontext: "#ffffff",
			maintext: "#4A4A4A",
			desctext: "#4A4A4A"
		}
	});
}
export default {
	name: "modal",
	props: ["total", "reserva", "hotel", "data", "dataReserve"],

	data() {
		return {
			drawer: false,
			direction: "rtl",
			sumTotal: 0,
			horaLlegada: "",
			tipo_doc: "",
			genre: "",
			infoCliente: {
				nombre: "",
				apellido: "",
				genero: "",
				edad: "",
				tipo_documento: "",
				numero_documento: "",
				correo_electronico: "",
				celular: "",
				tipo_cliente: 0
			},
			submitted: false
		};
	},
	validations() {
		return {
			infoCliente: {
				nombre: { required },
				apellido: { required },
				genero: { required },
				edad: { required },
				tipo_documento: { required },
				numero_documento: {
					required,
					numeric
					// max:
					// 	this.infoCliente.tipo_documento === "RUC"
					// 		? maxLength(11)
					// 		: false || this.infoCliente.tipo_documento === "DNI"
					// 		? maxLength(8)
					// 		: false || this.infoCliente.tipo_documento === "PASAPORTE"
					// 		? maxLength(12)
					// 		: false,
					// min:
					// 	this.infoCliente.tipo_documento === "RUC"
					// 		? minLength(11)
					// 		: false || this.infoCliente.tipo_documento === "DNI"
					// 		? minLength(8)
					// 		: false || this.infoCliente.tipo_documento === "PASAPORTE"
					// 		? maxLength(12)
					// 		: false
				},
				// numero_documento: { required },
				correo_electronico: { required, email },
				celular: { required }
			}
		};
	},
	async mounted() {
		window.Culqi.publicKey = "pk_test_WCE5GkhLtV9oLJwa";
		this.tipo_doc = await this.getParameters("TIPO_DOCUMENTO");
		this.genre = await this.getParameters("GENERO");
		// document.getElementById("btn_pagar").addEventListener("click", function(e) {
		// 	// this.saveClient(this.infoCliente)
		// 	window.Culqi.open();
		// 	e.preventDefault();
		// });
	},
	watch: {
		total: function(newVal, oldVal) {
			window.Culqi.settings({
				title: "RENTI",
				currency: "PEN",
				description: "Pago de alojamiento",
				amount: newVal * 100
			});
		}
	},
	methods: {
		checkKey(e) {
			if (/^[A-Za-z]+$/.test(e.key)) {
				e.preventDefault();
				e.stopPropagation();
			}
		},
		validateState(name) {
			const { $dirty, $error } = this.$v.infoCliente[name];
			return $dirty ? !$error : null;
		},
		close() {
			this.$emit("close");
			document.documentElement.style.overflow = "scroll";
			document.body.scroll = "yes";
		},
		async getParameters(group) {
			const result = await this.$axios({
				method: "get",
				url: `https://apirenti.com/v1/api/parameters?group=${group}`,
				headers: {
					accept: "application/json",
					"Content-Type": "application/json"
				}
			});
			return result.data;
		},
		async saveClient(info) {
			this.submitted = true;

			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}
			const customer = await this.$axios({
				method: "post",
				url: "register-customer",
				headers: {
					accept: "application/json",
					"Content-Type": "application/json"
				},
				data: info
			});
			// .then(response => {
			// 	console.log("nuevo cliente", response);
			// 	this.saveReserve(response.data.id, response.data.correo_electronico);
			// })
			// .catch(error => alert(error));
			const reservaDetalle = [];
			this.$props.dataReserve.forEach(res => {
				const obj = {
					tipo_habitacion: res.tipo_hab,
					precio_total: res.total,
					cantidad: res.count,
					tiempo: res.tiempo
				};
				reservaDetalle.push(obj);
			});
			const reserva = {
				reserva_detalle: reservaDetalle,
				fecha_ingreso: this.$props.data.fecha_ini.split("/").join("-"),
				fecha_salida: this.$props.data.fecha_fin.split("/").join("-"),
				hora_llegada: this.horaLlegada,
				estado_reserva: "PENDIENTE",
				cantidad_adulto: this.$props.data.n_huespedes.adult,
				cantidad_nino: this.$props.data.n_huespedes.child,
				subtotal: this.$props.total,
				igv: 0,
				precio_total: this.$props.total,
				tipo_pago: "1",
				adelanto: 0,
				registro_cliente: customer.data.id,
				hotel: this.$props.hotel.id
			};
			// const self = this;
			const reservaReq = await this.$axios({
				method: "post",
				url: "reservations",
				headers: {
					accept: "application/json",
					"Content-Type": "application/json"
				},
				data: JSON.stringify(reserva)
			});


			console.log(reservaReq.data)
			console.log(customer.data)
			console.log("ANT")
			window.Culqi.open();
			console.log("DES")

			if (process.browser || process.BROWSER_BUILD) {
				window.culqi = async function() {
					if (window.Culqi.token) {
						var token = window.Culqi.token.id;
						$nuxt.$loading.start();
						const a = await axios({
							method: "post",
							url: "https://apirenti.com/v1/culqi/charges",
							headers: {
								accept: "application/json",
								"Content-Type": "application/json"
							},
							data: {
								charge: {
									amount: reservaReq.data.precio_total * 100,
									currency_code: "PEN",
									descripcion: "renta hotel",
									installments: 0,
									source_id: token,
									email: customer.data.correo_electronico
								},
								reservation: reservaReq.data.id,
								customer_registration: customer.data.id
							}
						}).catch(error => console.log(error));
						if (a.data.message === "ok") {
							$nuxt.$router.replace("/successReserve");
							$nuxt.$loading.finish();
						}
					} else {
						alert(window.Culqi.token.user_message);
					}
				};
			}
			// .then(response => {
			// 	console.log(response);
			// 	console.log("culqi open");
			// 	window.Culqi.open();
			// 	this.culqiFunction(
			// 		response.data.precio_total,
			// 		email,
			// 		response.data.id,
			// 		cliente
			// 	);
			// })
			// .catch(error => alert(error));
		}
		// culqiFunction(mount, email, id, cliente) {
		// 	if (process.browser || process.BROWSER_BUILD) {
		// 		window.culqi = async function() {
		// 			if (window.Culqi.token) {
		// 				var token = window.Culqi.token.id;
		// 				const a = await axios({
		// 					method: "post",
		// 					url: "https://apirenti.com/v1/culqi/charges",
		// 					headers: {
		// 						accept: "application/json",
		// 						"Content-Type": "application/json"
		// 					},
		// 					data: {
		// 						charge: {
		// 							amount: mount * 100,
		// 							currency_code: "PEN",
		// 							descripcion: "renta hotel",
		// 							installments: 0,
		// 							source_id: token,
		// 							email: email
		// 						},
		// 						reservation: id,
		// 						customer_registration: cliente
		// 					}
		// 				});

		// 				console.log("culqi", a);
		// 				if (a.data.message === "ok") {
		// 					$nuxt.$router.replace("/successReserve");
		// 				}

		// 				// .then(res => {
		// 				// 	// if (res.data.message === "ok") {
		// 				// 	// 	self.$router.push(`/successReserve`);
		// 				// 	// }
		// 				// 	console.log(res)
		// 				// });
		// 			} else {
		// 				alert(window.Culqi.token.user_message);
		// 			}
		// 		};
		// 	}
		// },

		// saveReserve(cliente, email) {
		// 	const reservaDetalle = [];
		// 	this.$props.dataReserve.forEach(res => {
		// 		const obj = {
		// 			tipo_habitacion: res.tipo_hab,
		// 			precio_unitario: res.precio
		// 		};
		// 		reservaDetalle.push(obj);
		// 	});
		// 	const reserva = {
		// 		reserva_detalle: reservaDetalle,
		// 		fecha_ingreso: this.$props.data.fecha_ini.split("/").join("-"),
		// 		fecha_salida: this.$props.data.fecha_fin.split("/").join("-"),
		// 		hora_llegada: this.horaLlegada,
		// 		estado_reserva: "pendiente",
		// 		cantidad_adulto: this.$props.data.n_huespedes.adult,
		// 		cantidad_nino: this.$props.data.n_huespedes.child,
		// 		subtotal: this.$props.total,
		// 		igv: 0,
		// 		precio_total: this.$props.total,
		// 		tipo_pago: "1",
		// 		adelanto: 0,
		// 		registro_cliente: cliente,
		// 		hotel: this.$props.hotel.id
		// 	};
		// 	const self = this;
		// 	this.$axios({
		// 		method: "post",
		// 		url: "reservation",
		// 		headers: {
		// 			accept: "application/json",
		// 			"Content-Type": "application/json"
		// 		},
		// 		data: JSON.stringify(reserva)
		// 	})
		// 		.then(response => {
		// 			console.log(response);
		// 			console.log("culqi open");
		// 			window.Culqi.open();
		// 			this.culqiFunction(
		// 				response.data.precio_total,
		// 				email,
		// 				response.data.id,
		// 				cliente
		// 			);
		// 		})
		// 		.catch(error => alert(error));
		// }
	}
};
</script>
<style lang="stylus" scoped>
@import url('https://fonts.googleapis.com/css?family=Be+Vietnam&display=swap" rel="stylesheet')
*
	font-family 'Be Vietnam', sans-serif
	.column
		flex-direction column
		align-items baseline
	.invalid-feedback
		font-size 9px
		color red
	.width-full
		width 100%
	.el-card
		margin 0% 2% 3%
		cursor auto !important
		height auto !important
	::placeholder
		font-family 'Be Vietnam', sans-serif
		font-size 10px
	.flex-end
		align-items flex-end
	.flex
		display flex
		margin-bottom 5%
	.margin
		margin-bottom 5%
	.title
		display flex
		font-size 20px
	.subtitle
		i
			background #2dd1eb
			border-radius 50%
			font-size 20px
			padding 5px
			color white
			margin-right 7px
		span
			font-family 'Be Vietnam', sans-serif !important
			font-weight bold
			font-size 15px
			color #4a4a4a

	.modal-backdrop
		position fixed
		top 0
		bottom 0
		left 0
		right 0
		background-color rgba(0, 0, 0, 0.54)
		display flex
		justify-content center
		align-items center
		z-index 1000

		.modal
			background #FFFFFF
			box-shadow 2px 2px 20px 1px
			overflow-x auto
			display flex
			flex-direction column
			height 100vh
			width 100vh

			/deep/ .el-input__inner
				width 95% !important
				border none
				border-bottom 1px solid #515054 !important
				border-radius 0
			/deep/ .el-input__inner:focus
				border-bottom 1px solid #7b2deb !important
		.modal-header
			padding 15px
			display flex

		.modal-header
			border-bottom 1px solid #eeeeee
			color white
			justify-content space-between
			background-color #7b2deb


		.modal-footer
			width 100%
			background-color white
			height 77px
			border-top 1px solid #eeeeee
			justify-content space-between
			align-items center
			position fixed
			padding 0 2%
			bottom 0
			margin 0
			.btnPay
				background-color aquamarine
				color black
				font-weight bold

		.modal-body
			position relative
			padding 20px
			margin-bottom 13%

			label
				font-size 12px
				color #838383

		.btn-close
			border none
			font-size 20px
			cursor pointer
			font-weight bold
			color white
			background transparent

@media screen and (min-width:764px)
	.modal-backdrop
		.modal
				position fixed
				right 0
				width 40%
		.modal-footer
			width inherit
			height 10%
			background-color white
			bottom 0
			margin 0
</style>
