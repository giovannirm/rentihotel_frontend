<template lang="pug">
div.container
	div.main-window
		div.window-img
			nuxt-link(tag="img" :src="logoWindow" to="/")
			p Renti
			p Plataforma de renta de hoteles
		el-card.container-card(padding="8%")
			el-form#form(@submit.prevent="submit")
				h2(style="text-align: center") RENTI
				el-form-item(label="Nombre")
					el-input(v-model="name" name="nombre")
				el-form-item(label="RUC")
					el-input(v-model="ruc" name="ruc")
				el-form-item(label="Direccion")
					el-input(v-model="address" name="direccion")
				el-form-item(label="Descripción")
					el-input(type="textarea" v-model="description" name="descripcion")
				el-form-item(label="Numero de habitaciones")
					el-input(v-model="totalRooms" name="totalhabitacione")
				el-form-item(label="Telefono")
					el-input(v-model="tel" name="telefono")
				el-form-item(label="Celular")
					el-input(v-model="cel" name="celular")
				el-form-item(label="Correo electrónico")
					el-input(v-model="email" name="correoelectronico")
				label Tiene cochera
					input.check(type="checkbox" v-model="garage" name="cochera")
				label Acepta tarjeta
					input.check(type="checkbox" v-model="card" name="tarjeta")
				el-form-item(label="Latitud")
					el-input(v-model="latitud" name="latitud")
				el-form-item(label="Longitud")
					el-input(v-model="longitud" name="longitud")
				el-form-item(label="Pagina web")
					el-input(v-model="webPage" name="webPage")
				el-form-item(label="Facebook")
					el-input(v-model="facebook" name="facebook")
				el-form-item(label="Instagram")
					el-input(v-model="instagram" name="instagram")
				el-form-item(label="Imagen")
				label.custom-file-upload Subir fotos
					input#fileUpload(type="file" accept="image/*" ref="file" multiple name="image" @change="onChange")
				div.preview
					el-image(style="width: 100px; height: 100px" v-for="image in images" :key="image" :src="image")
				label Pais
				select(v-model="pais" name="pais" @change="changeDepartment")
					option(value="" disabled selected) Select your option
					option(v-for="npais in paises" :value="npais.id") {{npais.nombre}}
				label Departamento
					select(v-model="departamento" name="departamento" @change="changeProvincia")
						option(value="" disabled selected) Select your option
						option(v-for="ndep in departments" :value="ndep.id") {{ndep.nombre}}
				label Provincia
					select(v-model="provincia" name="provincia" @change="changeDistrict")
						option(value="" disabled selected) Select your option
						option(v-for="prov in provincias" :value="prov.id") {{prov.nombre}}
				label Distrito
				select(v-model="distrito" name="distrito" value="1")
					option(value="" disabled selected) Select your option
					option(v-for="dis in districts" :value="dis.id") {{dis.nombre}}
				el-button.button-class(@click="submit") Guardar

			el-divider
			div.flex.footer
				el-button Español
				div.flex.footer-image
					img(src="../assets/images/logo-footer.png")
					p 2019 Renti, Inc. All rights reserved.

</template>

<script>
import Axios from "axios";
import store from "../store/index.js";
import { mapGetters } from "vuex";
import logoWindow from "@/assets/images/img-window.png";

export default {
	name: "form-hotel",

	data() {
		return {
			logoWindow: logoWindow,
			districts: [],
			paises: [],
			departments: [],
			provincias: [],
			name: "",
			ruc: "",
			address: "",
			description: "",
			totalRooms: "",
			tel: "",
			cel: "",
			email: "",
			garage: "",
			card: "",
			latitud: "",
			longitud: "",
			webPage: "",
			facebook: "",
			instagram: "",
			departamento: "",
			pais: "",
			provincia: "",
			distrito: "",
			files: [],
			images: []
		};
	},
	mounted() {
		this.getCountry();
	},
	methods: {
		requestPlace(url) {
			const token = this.$store.getters.getToken;
			return this.$axios
				.get(url, {
					headers: {
						Accept: "application/json",
						Authorization: `Bearer ${token}`
					}
				})
		},
		changeDistrict() {
			const url = `https://apirenti.com/v1/api/filter-distrito/${this.provincia}`;
			this.requestPlace(url)
				.then(response => {
					this.districts = response.data.slice();
				})
				.catch(error => console.log(error));
		},
		changeProvincia() {
			const url = `https://apirenti.com/v1/api/filter-provincia/${this.departamento}`;
			this.requestPlace(url)
				.then(response => {
					this.provincias = response.data.slice();
				})
				.catch(error => console.log(error));
		},
		changeDepartment() {
			const url = `https://apirenti.com/v1/api/filter-departamento/${this.pais}`;
			this.requestPlace(url)
				.then(response => {
					this.departments = response.data.slice();
				})
				.catch(error => console.log(error));
		},
		getCountry() {
			const url = 'https://apirenti.com/v1/paises/';
			this.requestPlace(url)
				.then(response => {
					this.paises = response.data.slice();
				})
				.catch(error => console.log(error));
		},
		submit(event) {
			const ins = document.getElementById("fileUpload").files.length;
			const garage = document.getElementsByClassName("check").length;

			const form = document.getElementById("form");

			const formData = new FormData(form);
			for (let x = 0; x < ins; x++) {
				formData.append(
					`image${x + 1}`,
					document.getElementById("fileUpload").files[x]
				);
			}

			for (let i = 0; i < garage; i++) {
				formData.append(
					document.getElementsByClassName("check")[i].name,
					document.getElementsByClassName("check")[i].checked
				);
			}
			for (var value of formData.values()) {
				// console.log("-", value);
			}

			this.$axios
				.post("https://apirenti.com/v1/api/hotel", formData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				})
				.then(response => console.log(response))
				.catch(error => console.log(error));
		},
		onChange(event) {
			for (var i = 0; i < this.$refs.file.files.length; i++) {
				let file = this.$refs.file.files[i];
				this.files.push(file);
				const fileUrl = URL.createObjectURL(file);
				this.images.push(fileUrl);
			}
		}
	}
};
</script>

<style lang="stylus" scoped>
@import url('https://fonts.googleapis.com/css?family=Be+Vietnam&display=swap" rel="stylesheet')
html,body
	min-height 100vh

	.container
		margin 0 auto
		height 100%
		display flex
		flex-direction column
		justify-content center
		align-items center

		.main-window
			width 100%
		.flex
			display flex
		.window-img
			display none

		.custom-file-upload
			border 1px solid #ccc
			padding 5px 12px
			cursor pointer
			font-size 11px

		.el-form-item
			margin 0
		input[type="file"]
			display none
		.preview
			margin 3% 0% 3% 0%
		.button-class
			color white
			background-color #7B2DEB
			width 100%
			margin 0
			border-radius 20px
			font-size 15px
			margin-bottom 2%
			font-family 'Be Vietnam', sans-serif
			font-weight bold

		.footer
				flex-direction column
				align-items center
				.el-button
					font-family 'Be Vietnam', sans-serif
					font-weight bold
					border-radius 20px
					font-size 11px
				.footer-image
					align-items center
					margin-top 5%
					p
						font-size 11px
						font-family 'Be Vietnam', sans-serif
						font-weight 400

	@media screen and (min-width:764px)
		.container
			background url('../assets/images/background.png') no-repeat center center fixed
			background-size cover
			display flex
			justify-content space-around

			.main-window
				width 100%
				display flex
				justify-content space-around
				align-items center

				.window-img
					display inline
					width 13%
					p:nth-child(2)
						color white
						font-size 27px
					p:nth-child(3)
						color white
						font-size 12px

				.container-card
					padding 2% 2% 0 2%
					.button-social
						display flex
						flex-direction column
						margin-bottom 0
						.button-width
							font-size 12px

			.footer
				flex-direction row-reverse
				justify-content space-around
				font-family: 'Be Vietnam', sans-serif
				font-weight 400
				.el-button
					font-family: 'Be Vietnam', sans-serif
					font-weight bold
					border-radius 20px
					font-size 11px
				.footer-image
					align-items center
					margin 0
					p
						font-size 11px
</style>
