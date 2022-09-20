<template lang="pug">
	.content_menu
		h1 Mapa de sitio
		ol
			nuxt-link(to="/")
				li INICIO
				ol
					nuxt-link(to="/login")
						li Login
						ol
							nuxt-link(to="/reset-password")
								li Restablecer contraseña
					nuxt-link(to="/register")
						li Registro
			nuxt-link(to="/")
				li Políticas de uso de Renti
			nuxt-link(to="/")
				li Confianza y seguridad
			nuxt-link(to="/")
				li Razones para hospedar
			nuxt-link(to="/")
				li Condiciones
			nuxt-link(to="/")
				li Ayuda
</template>
<script>
export default {
	layout: 'headerHotels',
}
</script>
<style lang="stylus">
@import '../../assets/style/renti/content_footer.styl';
</style>
