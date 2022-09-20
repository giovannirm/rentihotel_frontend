<template lang="pug">
	#app
		//- Filters(:date_ini="date_ini" :date_fin="date_fin" :data="data")
		.container-filters
			.filters
				v-date-picker(v-model="range" mode='range' :popover="{ visibility: 'click' }" :min-date='new Date(Date.now() - 86400000)' @input="changeConsult")
					el-button(icon="el-icon-date" ) Fechas
						//- el-button.button-filter(slot="reference" icon="el-icon-date") Fechas
				.popover-huesp
					el-popover(placement="bottom" trigger="click")
						.container_qty_people
							label.la Número de adultos
								el-input-number(size="medium" :min="1" v-model="adult" @change="changeConsult")
							label.la Número de niños
								el-input-number(size="medium" :min="0" v-model="child" @change="changeConsult")
						el-button.button-filter(slot="reference" icon="el-icon-user") Huéspedes
				.moneyOrder
					el-popover(placement="bottom" trigger="click")
						div.popover-radio
							el-radio(v-model="radio" label="asc" @change="filterPrice") De menor a mayor
							el-radio(v-model="radio" label="des" @change="filterPrice") De mayor a menor
						el-button.button-filter(slot="reference" icon="el-icon-money") Precio
		.container-body
			.container-body__left
				.container-body__left-column
					.container-body__left-slogan
						img(src="../assets/images/bed.png")
						p Más de 70.000 opciones de alojamiento en todo el Perú
					p Más de 150 alojamientos
				.container-body__left-card(v-for="hotel in paginatedData" :key="hotel.id" )
					el-card
						el-image.image-mobile(:src="hotel.image1" fit="fill")
						el-button.see_details_mobile(type="info" plain @click="showDetail(hotel.id)") Ver detalles
						.info-card
							font-awesome-icon(:icon="['fas', 'ellipsis-v']")
							.info
								.icons
									el-button.recommend
										font-awesome-icon(:icon="['fas', 'gem']")
										span  Recomendado
									.space
										el-button.view(icon="el-icon-view" circle)
										span 250
									.space
										el-button.star(icon="el-icon-star-on" circle)
										span 2.5
								h3 {{ hotel.nombre }}
								p 2 huéspedes - 1 habitación - 1 baño
								p Wifi - Cocina
								p Desde S/. {{ hotel.precio }}
						.img-card
							el-carousel(:autoplay="false" arrow="always" indicator-position="none")
								el-carousel-item
									el-image(:src="hotel.image1" fit="fill")
								el-carousel-item
									el-image(:src="hotel.image2" fit="fill")
								el-carousel-item
									el-image(:src="hotel.image3" fit="fill")
							el-button.see_details(type="info" plain @click="showDetail(hotel.id)") Ver detalles
				.pagination
					el-button(@click="prevPage" :disabled="pageNumber === 0") Anterior
					el-button(@click="nextPage" :disabled="pageNumber >= pageCount-1") Siguiente
			#map
</template>

<script>
import Filters from "../components/Filters/filters.vue";
import { mapGetters } from "vuex";
export default {
	auth: false,
	layout: 'headerHotels',
	components: {
		Filters
	},
	data() {
		return {
			pageNumber: 0,
			size: 1,
			ran: "",
			radio: "",
			adult: "",
			child: "",
			latitudes: [],
			hoteles: [],
			value: 4.2,
			page: 1,
			location: [],
			date_ini: "",
			date_fin: "",
			huespedes: "",
			data: {},
			isLoading: true
		};
	},
	computed: {
		pageCount() {
			let l = this.hoteles.length,
				s = this.size;
			return Math.ceil(l / s);
		},
		paginatedData() {
			const start = this.pageNumber * this.size,
				end = start + this.size;
			return this.hoteles.slice(start, end);
		},
		range: {
			set(newValue) {
				this.ran = newValue;
			},
			get() {
				// console.log('this date ini', this.date_ini)
				// let checkIn = this.date_ini.split("/");
				// checkIn = `${checkIn[1]}-${checkIn[2]}-${checkIn[0]}`;
				// let checkOut = this.date_fin.split("/");
				// checkOut = `${checkOut[1]}-${checkOut[2]}-${checkOut[0]}`;
				return {
					start: new Date(this.date_ini),
					end: new Date(this.date_fin)
				};
			}
		}
	},
	methods: {
		nextPage() {
			this.pageNumber++;
		},
		prevPage() {
			this.pageNumber--;
		},
		changeConsult() {
			const dataToSend = {
			fecha_ini: new Date(this.range.start).toISOString().split("T")[0],
			fecha_fin: new Date(this.range.end).toISOString().split("T")[0],
			n_huespedes: parseInt(this.child + this.adult),
			};

			// const URL = "https://www.apirenti.com/v1/api/search-hotels";
			// this.$axios({
			// 	method: "POST",
			// 	url: URL,
			// 	headers: {
			// 		Accept: "application/json",
			// 		"Content-Type": "application/json"
			// 	},
			// 	data: JSON.stringify(data)
			// })
			// 	.then(res => {
			// 		console.log(res, "ressd");
			// 		this.hoteles = res.data;
			// 		this.hoteles.forEach(hotel => {
			// 			hotel.image1 = `https://www.apirenti.com/media/${hotel.image1}`;
			// 			hotel.image2 = `https://www.apirenti.com/media/${hotel.image2}`;
			// 			hotel.image3 = `https://www.apirenti.com/media/${hotel.image3}`;
			// 			this.location.push({
			// 				latitud: hotel.latitud,
			// 				longitud: hotel.longitud
			// 			});
			// 		});
			// 		this.total = this.hoteles.length;
			// 		this.showMap();
			// 	})
			// 	.catch(err => {
			// 		console.log(err);
			// 	});
		},
		filterPrice() {
			if (this.radio === "asc") {
				this.hoteles.sort((x, y) => x.precio - y.precio);
			} else {
				this.hoteles.sort((x, y) => y.precio - x.precio);
			}
		},
		showMap() {
			this.latitudes = this.hoteles.map(hotel => {
				return { latitud: hotel.latitud, longitud: hotel.longitud };
			});
		},
		showDetail(index) {
			document.getElementsByTagName("body")[0].style.overflow = "visible";
			const data = {
				fecha_ini: this.date_fin,
				fecha_fin: this.date_ini,
				n_huespedes: this.huespedes
			};
			const dataSend = encodeURIComponent(JSON.stringify(data));
			// holarenti.com
			// localhost:3000
			window.open(`http://localhost:3000/detail?id=${index}&data=${dataSend}`);
		},
		getHotels() {
			const url = window.location.href;
			const id = url.substring(url.lastIndexOf("?") + 1, url.length);

			if (id.length < 5) {
				const urlRequest = `hoteles?department=${id}`;
				this.$axios
					.get(urlRequest, {
						headers: {
							Accept: "application/json"
						}
					})
					.then(result => {
						this.hoteles = result.data;
						this.hoteles.forEach(hotel => {
							hotel.image1 = `https://www.apirenti.com/media/${hotel.image1}`;
							hotel.image2 = `https://www.apirenti.com/media/${hotel.image2}`;
							hotel.image3 = `https://www.apirenti.com/media/${hotel.image3}`;
							this.location.push({
								latitud: hotel.latitud,
								longitud: hotel.longitud
							});
							this.showMap();
						});
					})
					.catch(error => console.log(error));
			} else {

				let data = decodeURIComponent(id);
				this.data = JSON.parse(data);
				this.date_ini = this.data.fecha_ini;
				this.date_fin = this.data.fecha_fin;
				this.huespedes = this.data.n_huespedes;
				this.adult = this.data.n_huespedes.adult;
				this.child = this.data.n_huespedes.child;

				data = JSON.parse(data);
				data["n_huespedes"] =
					parseInt(data.n_huespedes.adult) + parseInt(data.n_huespedes.child);
				data["fecha_ini"] = this.data.fecha_ini.split('/').join('-')
				data["fecha_fin"] = this.data.fecha_fin.split('/').join('-')
				const URL = "https://www.apirenti.com/v1/api/hotels/search";
				this.$axios({
					method: "POST",
					url: URL,
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json"
					},
					data: JSON.stringify(data)
				})
					.then(res => {
						this.hoteles = res.data;
						this.hoteles.forEach(hotel => {
							hotel.image1 = `https://www.apirenti.com/media/${hotel.image1}`;
							hotel.image2 = `https://www.apirenti.com/media/${hotel.image2}`;
							hotel.image3 = `https://www.apirenti.com/media/${hotel.image3}`;
							this.location.push({
								latitud: hotel.latitud,
								longitud: hotel.longitud
							});
						});
						this.total = this.hoteles.length;
						this.showMap();
					})
					.catch(err => {
						console.log(err);
					});
			}
		},
		showMap() {
			var markerIcon = {
				// https://holarenti.com/_nuxt/img/7437d71.png
				// http://www.clker.com/cliparts/8/i/q/y/M/P/google-maps-icon-blank-md.png
				url: require("../assets/images/marker.png"),
				scaledSize: new google.maps.Size(55, 55),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(32, 15),
				labelOrigin: new google.maps.Point(25, 25)
			};

			const map = new google.maps.Map(document.getElementById("map"), {
				zoom: 13,
				center: new google.maps.LatLng(
					this.hoteles[0].latitud,
					this.hoteles[0].longitud
				),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});

			const infowindow = new google.maps.InfoWindow({ maxWidth: 250 });

			let marker, i;
			let content = "";
			for (i = 0; i < this.hoteles.length; i++) {
				const precio = Math.round(this.hoteles[i].precio);
				marker = new google.maps.Marker({
					map: map,
					animation: google.maps.Animation.DROP,
					position: new google.maps.LatLng(
						this.hoteles[i].latitud,
						this.hoteles[i].longitud
					),
					icon: markerIcon,
					label: {
						text: `S/. ${precio}`,
						color: "#7b2deb",
						fontSize: "15px",
						fontWeight: "bold"
					}
				});
				content = `
					<div class="scrollFix">
						<img src="${this.hoteles[i].image1}" fit="fill"/>
						<div class="infoDiv">
							<p class="tittle">${this.hoteles[i].nombre}</p>
							<p class="price">S/. ${this.hoteles[i].precio} por noche</p>
							<button><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
								width="15" height="15" viewBox="0 0 172 172"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#7b2deb"><path d="M86,28.66667c-57.33333,0 -78.83333,57.33333 -78.83333,57.33333c0,0 21.5,57.33333 78.83333,57.33333c57.33333,0 78.83333,-57.33333 78.83333,-57.33333c0,0 -21.5,-57.33333 -78.83333,-57.33333zM86,43c37.81133,0 56.93626,30.58084 63.12826,42.97201c-6.19917,12.30517 -25.46742,43.02799 -63.12826,43.02799c-37.81133,0 -56.93626,-30.58084 -63.12826,-42.97201c6.20633,-12.30517 25.46742,-43.02799 63.12826,-43.02799zM86,57.33333c-15.83117,0 -28.66667,12.8355 -28.66667,28.66667c0,15.83117 12.8355,28.66667 28.66667,28.66667c15.83117,0 28.66667,-12.8355 28.66667,-28.66667c0,-15.83117 -12.8355,-28.66667 -28.66667,-28.66667zM86,71.66667c7.91917,0 14.33333,6.41417 14.33333,14.33333c0,7.91917 -6.41417,14.33333 -14.33333,14.33333c-7.91917,0 -14.33333,-6.41417 -14.33333,-14.33333c0,-7.91917 6.41417,-14.33333 14.33333,-14.33333z"></path></g></g></svg></button>
								<span>327</span>
							<button><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
								width="15" height="15" viewBox="0 0 172 172"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ff911e"><path d="M35.088,167.184c-0.688,0 -1.376,-0.344 -2.064,-0.688c-1.032,-0.688 -1.72,-2.408 -1.376,-3.784l15.136,-56.416l-45.408,-36.808c-1.376,-0.688 -1.72,-2.408 -1.376,-3.784c0.344,-1.376 1.72,-2.408 3.096,-2.408l58.48,-3.096l20.984,-54.696c0.688,-1.032 2.064,-2.064 3.44,-2.064c1.376,0 2.752,1.032 3.096,2.064l20.984,54.696l58.48,3.096c1.376,0 2.752,1.032 3.096,2.408c0.344,1.376 0,2.752 -1.032,3.784l-45.408,36.808l15.136,56.416c0.344,1.376 0,2.752 -1.376,3.784c-1.032,0.688 -2.752,1.032 -3.784,0l-49.192,-31.648l-49.192,31.648c-0.688,0.688 -1.032,0.688 -1.72,0.688z"></path></g></g></svg></button>
								<span>3.5</span>
						</div>
					</div>
				`;

				google.maps.event.addListener(
					marker,
					"click",
					(function(marker, content) {
						return function() {
							infowindow.setContent(content);
							infowindow.open(map, marker);
						};
					})(marker, content)
				);
			}
		}
	},
	mounted() {
		this.getHotels(this.page);
	}
};
</script>

<style lang="stylus">
@import '../assets/style/renti/listHotels.styl';
</style>

<style lang="stylus" scoped>
.svg-inline--fa.fa-w-14
	color black !important
</style>
