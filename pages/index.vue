<template lang="pug">
	.container-home
		.div-one
			p Reserva un alojamiento y disfruta
			.form
				div(v-if="submitted && (!$v.nameHotel.required || !$v.date_first.required || !$v.date_last.required)" type="error" class="invalid-name" )
					el-alert.alert-one(type="error" description="Completa los campos" show-icon :closable="false")
				template
					el-select(v-model="nameHotel" clearable filterable remote reserve-keyword placeholder="Busca un lugar de aventuras" :remote-method="remoteMethod" no-data-text=" ")
						el-option(v-for="(item,i) in option" :key="i" :label="item.label.nombre" :value="item")
							.option
								img(:src="item.image")
								.option__label
									p {{item.label.nombre}}
									p {{item.label.descripcion}}
				DatePicker(@setCheckIn="checkIn" @setCheckOut="checkOut" )
				.form__send
					el-popover(placement="bottom" trigger="click")
						div.container_qty_people
							label.la Número de adultos
								el-input-number(size="medium" :min="1" v-model="adulto")
							label.la Número de niños
								el-input-number(size="medium" :min="0" v-model="niño")
						el-button.button-qty-people(slot="reference") {{ this.adulto }} adultos, {{ this.niño }} niños
					el-button.button-search(@click="showFilterHotel") Buscar
		.div-social
			el-alert(closable=true)
				div
					p Bienvenido a Renti
					p Encuentra los alojamientos más cómodos escogidas cuidadosamente por ti.
				div
					el-button(icon="el-icon-user" round @click="$router.push('/register')") Regístrate
					//- el-button(circle)
					//- 	font-awesome-icon.icon(:icon="['fab', 'facebook-f' ]")
					//- el-button(circle)
					//- 	font-awesome-icon.icon(:icon="['fab', 'google']")
		//- .div-alert
			el-alert(closable=true)
				p.alert {{ cookies }}
				.alert-button
					el-button.black Aceptar
					el-button.white Preferencias de cookies //
		.div-two
			h4 Recomendados para ti
			h5 Disfruta de los mejores alojamientos dentro de Perú a precios muy accesibles y cómodos.
			Slider.div-two__Slider
</template>

<script>
import Slider from "@/components/SliderRecommend.vue";
import DatePicker from "../components/DatePicker/datePicker";
import store from "../store/index.js";
import { required } from "vuelidate/lib/validators";

export default {
	auth: false,
	layout: "headerHome",
	components: {
		DatePicker,
		Slider
	},
	data() {
		return {
			recommendList: "",
			cookies: `Utilizamos cookies para ayudar a personalizar el contenido, adaptar	y medir los anuncios, y proporcionar una
			experiencia más segura. Al navegar por el sitio, aceptas el uso de cookies para recopilar información dentro y fuera de Renti. Lee
			nuestra Política de Cookies para obtener más información o accede a las preferencias de cookies para administrar tu configuración.`,
			list: [],
			date_first: "",
			date_last: "",
			submitted: false,
			nameHotel: {},
			adulto: "1",
			niño: "0",
			place: ""
		};
	},
	validations: {
		nameHotel: { required },
		date_first: { required },
		date_last: { required }
	},
	// async asyncData(context) {
	// 	const departmentList = await context.$axios.get("/recommended-list");
	// 	return { recommendList: departmentList.data };
	// },
	computed: {
		option: function() {
			const array = new Array();
			this.list.forEach(item => {
				let obj = {};
				obj = {
					label: { nombre: item.p_nombre, descripcion: item.p_description },
					value: item,
					image:
						item.p_campo !== "id"
							? require("../assets/images/select-index/marker.png")
							: "https://cdn3.iconfinder.com/data/icons/hotel-line-set-1/100/hotel_line_icon-42-128.png"
				};
				array.push(new Object(obj));
			});
			return array;
		}
	},
	methods: {
		checkIn(date) {
			this.date_first = date;
		},
		checkOut(date) {
			this.date_last = date;
		},
		async remoteMethod(query, cb) {
			// alert('aaaa')
			if (query !== "") {
			const url = `https://www.apirenti.com/v1/api/hotels/search?words=${query}`;
			const result = await this.$axios.get(url, {
				headers: {
					Accept: "application/json"
				}
			});
				this.list = result.data
			} else {
				this.list = [];
			}
		},
		showFilterHotel() {
			this.submitted = true;
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}
			const data = {
				id_busqueda: this.nameHotel.value.id,
				fecha_fin: this.date_last,
				fecha_ini: this.date_first,
				n_huespedes: {
					adult: parseInt(this.adulto),
					child: parseInt(this.niño)
				},
				nombre_campo: this.nameHotel.value.p_campo,
				departamento: this.nameHotel.value.p_departamento
			};
			const dataSend = encodeURIComponent(JSON.stringify(data));
			this.$router.push(`/hotels?${dataSend}`);
		}
	}
};
</script>

<style lang="stylus">
@import '../assets/style/renti/home.styl';
</style>

<style lang="stylus" scoped>
.svg-inline--fa.fa-w-14
	color white !important
.el-popper[x-placement^=bottom]
	width 90%
</style>
