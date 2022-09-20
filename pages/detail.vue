<template lang="pug">
	div
		.container-top
			.carousel
				el-button.btn-show-photos(@click="showPhotos") Ver fotos
					viewer(class="viewer" ref="viewer" @inited="inited")
						img(:src="`https://www.apirenti.com/${hotel.image1}`" class="image")
						img(:src="`https://www.apirenti.com/${hotel.image2}`" class="image")
						img(:src="`https://www.apirenti.com/${hotel.image3}`" class="image")
				el-carousel(height="100%")
					el-carousel-item
						el-image.carousel__img(:src="`https://www.apirenti.com/${hotel.image1}`" fit="cover")
					el-carousel-item
						el-image.carousel__img(:src="`https://www.apirenti.com/${hotel.image2}`" fit="cover")
					el-carousel-item
						el-image.carousel__img(:src="`https://www.apirenti.com/${hotel.image3}`" fit="cover")
			.gallery
				el-button(@click="showPhotos") Ver fotos
					viewer(class="viewer" ref="viewer" @inited="inited" :options="{movable: false, zoomable: false, rotatable:false, scalable:false, transition:false, title:false, fullscreen:false}")
						img(:src="`https://www.apirenti.com/${hotel.image1}`" class="image")
						img(:src="`https://www.apirenti.com/${hotel.image2}`" class="image")
						img(:src="`https://www.apirenti.com/${hotel.image3}`" class="image")
				figure.gallery__item.gallery__item--1
					el-image.gallery__img(:src="`https://www.apirenti.com/${hotel.image1}`" fit="cover")
				figure.gallery__item.gallery__item--2
					el-image.gallery__img(:src="`https://www.apirenti.com/${hotel.image2}`" fit="cover")
				figure.gallery__item.gallery__item--3
					el-image.gallery__img(:src="`https://www.apirenti.com/${hotel.image3}`" fit="cover")
			.info-hotel
				el-button Hotel
				h1 {{ hotel.nombre }}
				h3 {{ hotel.direccion }} - {{ hotel.distrito}} - {{ hotel.departamento}}
		.container-middle
			.show-dates
				p Desde S/. {{ tipo_hab[0].tiempo[0].precio}} por noche
				el-button
					a(href="#disponibilidad") Mostrar fechas
			.show-description
				p Sobre el hotel
				p {{ hotel.descripcion }}
			.show-description
				p Mapa
				p Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis
			div.map(id="map")
			.show-description
				p Tipo de habitación
				p Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis
			.type-rooms
				div.container_slider
					el-button.button-left(v-if="tipo_hab.length > 3 || screen < '700'" icon="el-icon-arrow-left" circle @click="left")
					vue-glide.glide(v-if="tipo_hab.length" class="demo"
						ref="slider"
						type="slider"
						bound=true
						rewind=false
						:breakpoints={
							700: {
								perView: 1
							},
							1230: {
								perView: 3
							},
							1600: {
								perView: 4
							}
						}
					)
						vue-glide-slide(v-for="(tipo, index) in tipo_hab" :key="index")
							el-card
								img(v-if="tipo.capacidad_persona === 1" src="../assets/images/type-rooms/Individual.png")
								img(v-if="tipo.capacidad_persona === 2" src="../assets/images/type-rooms/Matrimonial.png")
								img(v-if="tipo.capacidad_persona === 3" src="../assets/images/type-rooms/Familiar.png")
								img(v-if="tipo.capacidad_persona > 3" src="../assets/images/type-rooms/Multiple.png")
								p {{ tipo.nombre }}
								el-input-number(v-if="tipo.disponibilidad > 0" v-model="tipo['count']" :min=0 :max="tipo.disponibilidad" @change="showReserve" size="mini")
								p.withoutDisp(v-if="tipo.disponibilidad === 0") ¡Ya no quedan más!
								el-divider(direction="horizontal")
								p.price-p S/.{{tipo.tiempo[0].precio}}
								div.div-servicios
									.servicios
										.servicios__item(v-for="(servicio, index) in tipo.servicio" :key="index")
											el-tag(effect="plain") {{ servicio.nombre }}
									el-button.verMas-button(@click="verMas(tipo.nombre)") Ver más
					el-dialog(:visible.sync="modalVisible" :modal-append-to-body="false" show-close=true)
						seeMore(:tipo_hab="tipo_hab" :t_hab="t_habitacion")
					el-button.button-right(v-if="tipo_hab.length > 3 || screen < '700'" icon="el-icon-arrow-right" circle @click="right")
				reserveModal.desktop(v-if="screen > '700'" :hotel="hotel" :dataReserve="reserve" :date="date" :data="data" :sumaTotal="sumTotal")
				//- v-if="sum != 0 && screen > '700'"
			.reserved
				el-card.reserved-mobile#reserved-card(v-if="sum != 0 && screen < '700'")
					div
						p ¡RESERVA AHORA!
						p S/. {{ sumTotal }} por {{sumDays}} noches
					el-button.reserveButton(@click="showModal") Reserva
				reserveModal.reserveFit(v-if="screen < '700'" v-show="isModalVisible" @close="closeModal" :hotel="hotel" :dataReserve="reserve" :date="date" :data="data" :sumaTotal="sumTotal")
			#disponibilidad.show-description
				p Disponibilidad
			client-only
				v-calendar(:columns="cols" :attributes="attributes" :min-date='new Date()')

</template>
<script>
import { Glide, GlideSlide } from "vue-glide-js";
import reserveModal from "@/components/ReserveDetail/reserveModal";
import seeMore from "@/components/ReserveDetail/seeMore";

export default {
	layout: 'headerHome',
	components: {
		reserveModal,
		seeMore,
		[Glide.name]: Glide,
		[GlideSlide.name]: GlideSlide
	},
	data() {
		return {
			isModalVisible: false,
			screen: "",
			reserve: [],
			sum: 0,
			modalVisible: false,
			dialogVisible: false,
			dialog: false,
			t_habitacion: "",
			colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
			attributes: [
				{
					highlight: {
						color: "purple"
					},
					dates: { start: new Date("02-25-2020"), end: new Date("02-30-2020") }
				}
			]
		};
	},
	async asyncData(context) {
		const url = context.route.fullPath;
		const id = url.substring(url.indexOf("id") + 3, url.indexOf("&"));
		const dataComplex = JSON.parse(
			decodeURIComponent(url.substring(url.lastIndexOf("data") + 5, url.length))
		);

		const d_ini = JSON.parse(context.route.query.data).fecha_ini.split('/').join('-')
		const d_fin = JSON.parse(context.route.query.data).fecha_fin.split('/').join('-')

		const reqHotel = await context.$axios.get(`hotels/${id}?initial_date=${d_ini}&final_date=${d_fin}`);
		return {
			hotel: reqHotel.data,
			data: dataComplex,
			tipo_hab: reqHotel.data.tipo_habitacion
		};
	},
	created() {
		this.tipo_hab.forEach(tipo => {
			tipo[`count`] = 0;
		});
	},
	computed: {
		cols() {
			return process.client
				? this.$screens({ default: 1, sm: 1, md: 2, lg: 3, xl: 3 })
				: null;
		},
		date() {
			return [new Date(this.data.fecha_fin), new Date(this.data.fecha_ini)];
		},
		sumTotal() {
			return this.reserve.reduce(
				(accumulator, currentValue) => accumulator + currentValue["total"],
				0
			);
		},
		sumDays() {
			const oneDay = 24 * 60 * 60 * 1000;
			const firstDate = new Date(this.data.fecha_ini);
			const secondDate = new Date(this.data.fecha_fin);
			return Math.round(Math.abs((firstDate - secondDate) / oneDay));
		}
	},
	mounted() {
		this.initMap();
		document.body.click();
		this.screen = window.screen.width;
		window.addEventListener("resize", () => {
			this.screen = window.innerWidth;
		});
	},
	methods: {
		showModal() {
			this.isModalVisible = true;
			document.getElementById("reserved-card").style.display = "none";
		},
		closeModal() {
			this.isModalVisible = false;
			document.getElementById("reserved-card").style.display = "block";
		},
		showReserve() {
			this.sum = this.tipo_hab.reduce((a, b) => a + (b["count"] || 0), 0);
			const oneDay = 24 * 60 * 60 * 1000;
			const firstDate = new Date(this.data.fecha_ini);
			const secondDate = new Date(this.data.fecha_fin);

			const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
			this.reserve = [];
			for (let i = 0; i < this.tipo_hab.length; i++) {
				const objReser = {
					nombre: this.tipo_hab[i].nombre,
					tipo_hab: this.tipo_hab[i].id,
					precio: this.tipo_hab[i].tiempo[0].precio,
					noches: diffDays,
					total:
						this.tipo_hab[i].count * this.tipo_hab[i].tiempo[0].precio * diffDays,
					image: require("../assets/images/type-rooms/Individual.png"),
					count: this.tipo_hab[i].count,
					tiempo: this.tipo_hab[i].tiempo[0].id
				};
				this.reserve.push(objReser);
			}

			this.reserve = this.reserve.filter(r => r.total !== 0);
		},
		inited(viewer) {
			this.$viewer = viewer;
		},
		showPhotos() {
			this.$viewer.view(2);
		},
		initMap() {
			const place = {
				lat: parseFloat(this.hotel.latitud),
				lng: parseFloat(this.hotel.longitud)
			};
			const map = new google.maps.Map(document.getElementById("map"), {
				zoom: 18,
				center: place
			});
			const marker = new google.maps.Marker({ position: place, map: map });
		},
		right() {
			this.$refs.slider.glide.go(">");
		},
		left() {
			this.$refs.slider.glide.go("<");
		},
		verMas(val) {
			this.modalVisible = true;
			this.t_habitacion = val;
		}
	}
};
</script>

<style lang="stylus" scoped>
	nav
		background-color red
</style>

<style lang="stylus">
@import '../assets/style/renti/hotelDetail.styl';
</style>


