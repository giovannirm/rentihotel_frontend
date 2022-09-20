<template lang="pug">
	header#Nav_header
		div.Nav_header
			.Nav_header_brand_link
				img(:src="logoBlack" @click="toHome")
			.Nav_header_mobile.open
				font-awesome-icon.icon(:icon="['fas', 'bars']" @click="classToggle")
		ul.Nav_container
			//- li.Nav_item(@click="classToggle") Publica tu alojamiento
			//- li.Nav_item(@click="classToggle")
			//- 	nuxt-link(to="/informativo/ayuda" ) Ayuda
			div.flex_li(v-if="$auth.loggedIn")
				li.Nav_item {{ $auth.$state.user.email }}
				li.Nav_item(@click="logout()") Logout
			div.flex_li(v-else)
				li.Nav_item
					nuxt-link(to="/register") Regístrate
				li.Nav_item
					nuxt-link(to="/login") Iniciar sesión
</template>

<script>
import logoBlack from "@/assets/images/logos/logo-buscador.png";
export default {
	name: "NavBar",
	data() {
		return {
			url: "",
			loading: false,
			logoBlack: logoBlack,
			screen: ""
		};
	},
	methods: {
		toHome() {
			this.$router.push('/');
		},
		classToggle() {
			const navs = document.querySelector(".Nav_container");
			navs.classList.toggle("class_open");
			navs.classList.toggle("index");
		},
		async logout() {
			await this.$auth.logout();
		},
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
};
</script>

<style lang="stylus" scoped>
@import url('https://fonts.googleapis.com/css?family=Be+Vietnam&display=swap" rel="stylesheet')
.flex_li
	display flex
	flex-direction column
ul
	margin 0
	padding 0
header
	font-family 'Be Vietnam', sans-serif
	width 100%
	position static
	.Nav_container
		transition height 0.4s ease
		background-color rgba(0, 0, 0, 0.83)
		width 100%
		position absolute
		display flex
		flex-direction column
		justify-content space-between
		height 0
		overflow hidden
		top 67px
		li
			list-style none
			color white
			border-bottom 1px solid #b1b1b7
			padding 0.5rem 1rem 0.5rem 1rem
			cursor pointer
			font-size 13px
			height 52px
			a
				text-decoration none
				color white
	.Nav_header
		width 100%
		padding 0.5rem 1rem 0.5rem 1rem
		display flex
		justify-content space-between
		align-items center
		&_brand_link
				color white
				font-size 15px
				cursor pointer
			img
				width 40px
				cursor pointer
			div
				font-size 14px
				cursor pointer
		&_mobile
			color white
			display flex
			align-items center
			.svg-inline--fa.fa-w-14
				cursor pointer
				font-size 30px
				color black
			.el-input
				width auto
				margin 0 0.5rem 0 0.5rem
				&__inner
					border-radius 15px
					border 1px solid #E4E4E4
					height 40px
					box-shadow 1px 1px 5px 0px #ccc
.class_open
	height 210px !important
.index
	z-index 100
@media screen and (min-width:764px)
	header
		display flex
		justify-content space-between
		.Nav_container
			background transparent
			height auto
			flex-direction row
			width 30rem
			position static
			align-items center
			justify-content flex-end
			li
				border-bottom none
				color black
				&:hover
					border-bottom 2px solid #7B2DEB
					color #7b2deb
				a
					color black
					&:hover
						color #7b2deb
		.Nav_header
			width auto
			.svg-inline--fa.fa-w-14
				display none
	.flex_li
		flex-direction row
		justify-content flex-end

</style>
