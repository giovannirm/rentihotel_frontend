<template lang="pug">
	div.app#app
		vue-glide.glide(v-if="departments.length" class="demo"
			ref="slider"
			v-model="active"
			type="carousel"
			:breakpoints={
				350: {
					perView: 1
				},
				541: {
					perView: 2
				},
				975: {
					perView: 3
				},
				1230: {
					perView: 4
				},
				1600: {
					perView: 5
				}
			}
			@glide:slide-click="departmentDetail"
		)
			vue-glide-slide(v-for="(slide) in departments" :key="slide.id" :data-glide-index="slide.id" )
				div
					.container-img
						img.el-image(v-model="id_dep" :src="slide.imagen" )
					.div__image
						span.Slide__title {{ slide.nombre }}
						span.Slide__subtitle S/. 45 - promedio por noche
		el-button(icon="el-icon-arrow-right" circle @click="api")
</template>

<script>
import Axios from "axios";
import { Glide, GlideSlide } from "vue-glide-js";
export default {
	name: "Slider",
	// props: ['lista'],
	components: {
		[Glide.name]: Glide,
		[GlideSlide.name]: GlideSlide
	},
	data() {
		return {
			id_dep: "",
			active: 0,
			slides: [0, 1, 2, 3, 4],
			departments: '',
		};
	},

	mounted() {
		this.getDepartments();
	},
	methods: {
		departmentDetail(index) {
			document.getElementsByTagName("body")[0].style.overflow = "visible";
			if (!isNaN(index)) {
				this.$router.push(`/hotels?${index}`);
				// const url = `https://www.apirenti.com/v1/api/hoteles-department/${index}`;
				// this.$axios
				// 	.get(url, {
				// 		headers: {
				// 			Accept: "application/json"
				// 		}
				// 	})
				// 	.then(result => {
				// 		console.log(index);
				// 		console.log(result);
				// 	})
				// 	.catch(error => console.log(error));
			}
		},
		testMount() {
			alert("mounted");
		},
		api() {
			this.$refs.slider.glide.go(">");
		},
		api2() {
			this.$refs.slider.glide.go("<");
		},
		getDepartments() {
			const url = "recommended-list";
			return this.$axios
				.get(url, {
					headers: {
						Accept: "application/json"
					}
				})
				.then(result => {
					this.departments = result.data.slice();
					this.departments.forEach(dep => {
						dep.imagen=`https://www.apirenti.com/media/${dep.imagen}`;
					});
				})
				.catch(error => console.log(error));
		}
	}
};
</script>

<style lang="stylus">
	@import '../assets/style/renti/sliderRecommend.styl';
</style>
