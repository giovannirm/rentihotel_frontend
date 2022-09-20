<template lang="pug">
	nav.Footer(v-if="url !== 'login' && url!== 'register' && url!== 'send-email' && url!== 'payReserve'")
		.Footer__flex
			#button-down1.button_down.el-icon-arrow-down(@click="classToggle")
			ul.parent.Footer__Item Renti
				.child.Footer__Item__List
						//- li Empleo
						//- li Noticias
						nuxt-link(to="/informativo/politicas")
							li Políticas
						nuxt-link(to="/informativo/ayuda")
							li Ayuda
						//- li Accesibilidad
		.Footer__flex
			#button-down2.el-icon-arrow-down(@click="classToggle")
			ul.parent.Footer__Item Descubre Renti
				.child.Footer__Item__List
					nuxt-link(to="/informativo/confianza")
						li Confianza y seguridad
					//- li Crédito de viajero
					//- li Viajes de trabajo
					//- li Actividades
		.Footer__flex
			#button-down3.el-icon-arrow-down(@click="classToggle")
			ul.parent.Footer__Item Hospedaje
				.child.Footer__Item__List
					nuxt-link(to="/informativo/razones")
						li Razones para hospedar
					//- li Hospitalidad
					//- li Crédito del viajero
					//- li Publica tu alojamiento
					//- li Organiza una experiencia
					//- li Abrir alojamiento
		.Footer__flex__center
			#button-down4.el-icon-arrow-down(@click="classToggle")
			ul.parent.Footer__Item
				.Footer__social
					font-awesome-icon.icon(:icon="['fab', 'facebook-f' ]")
					font-awesome-icon.icon(:icon="['fab', 'facebook-messenger' ]")
					//- font-awesome-icon.icon(:icon="['fab', 'whatsapp' ]")
					font-awesome-icon.icon(:icon="['fab', 'instagram' ]")
				.child.Footer__Item__List
					nuxt-link(to="/informativo/condiciones")
						li Condiciones
					nuxt-link(to="/informativo/privacidad")
						li Privacidad
					nuxt-link(to="/informativo/mapa")
						li Mapa del sitio
</template>

<script>
// import informativo from "@/components/informativo";
export default {
	name: 'Footer',
	// components: {
	// 	informativo
  	// },
	data() {
		return {
			url: '',
			// modalVisible: false,
		}
	},
	methods: {
		classToggle(event) {
			const button = document.querySelector(`#${event.target.id} ~ .parent > .child`)
			button.classList.toggle('Footer__ToggleShow');
		}
	},
	watch: {
		"$route.name": {
			handler: function(search) {
				this.url = search;
			},
			deep: true,
			immediate: true
		}
	}
}
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Be+Vietnam&display=swap" rel="stylesheet')
.Footer
	background-color #252432
	padding 16px
	color white
	font-family 'Be Vietnam', sans-serif
	display flex
	flex-direction column
	// position absolute
	// width 100%
	// bottom 0
	&__Item
		font-size 16px
		padding 0
		&__List
			display none
			li
				list-style none
				color #979797
				font-size 13px
				width max-content
				margin-left 10px
				text-decoration none
			a
				text-decoration none
	&__ToggleShow
		display block
	&__flex
		display flex
		flex-direction row-reverse
		align-items baseline
		justify-content space-between
		margin 3% 10% 0 10%
		&__center
			display flex
			flex-direction row-reverse
			align-items baseline
			margin 10% 10% 5% 10%
			justify-content space-evenly
	&__social
		display flex
		justify-content space-evenly
		margin 5% 15% 5% 15%
		font-size 20px
		.icon
			margin-right 30%

@media only screen and (min-width: 768px)
	.Footer
		display flex
		flex-direction row
		justify-content center
		padding 2% 7% 8% 7%
		padding-top: 5%
		justify-content space-evenly
		.el-icon-arrow-down
			display none
		&__Item__List
			display block
			margin-top 10px
			li
				margin 0
		&__Item
			font-size 16px
		&__social
			margin 0
			font-size 16px
		&__flex
			margin 0
			&__center
				margin 0

</style>
