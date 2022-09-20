<template lang="pug">
	.content_menu
		h1 Políticas de uso de Renti
		div
			p.title_content Los presentes términos, políticas y normas se aplican al acceso y uso de la plataforma de Renti, además de los Términos de Servicio y los Términos de Pago del Servicio.
			el-divider
			p Al publicar contenido en Renti, aceptas cumplir con esta política. Nos reservamos el derecho de eliminar cualquier contenido, total o parcial, que viole esta política, nuestros Términos de servicio, nuestros Estándares de la comunidad, nuestra Política de revisión, o por cualquier otro motivo que sea nuestro exclusivo criterio. En caso de violaciones repetidas o graves, podemos suspender o desactivar permanentemente las cuentas en cuestión. Puedes reportar el contenido directamente ocontactarnos para reportar el contenido que parece violar esta política. El siguiente contenido está prohibido en Renti:
			ul.ul_class
				li
					font-awesome-icon.icon-font(:icon="['fas', 'check']")
					span Contenido creado únicamente con fines publicitarios u otro contenido comercial, incluidos logotipos, enlaces o nombres de compañías
				li
					font-awesome-icon.icon-font(:icon="['fas', 'check']")
					span Spam, contacto no deseado o contenido que se comparte repetidamente de manera disruptiva
				li
					font-awesome-icon.icon-font(:icon="['fas', 'check']")
					span Contenido que respalde o promueva actividades ilegales o dañinas, o que es sexualmente explícito, violento, gráfico, amenazante o acosador
				li
					font-awesome-icon.icon-font(:icon="['fas', 'check']")
					span Contenido discriminatorio (revisa nuestra Política contra la discriminación para más información).
				li
					font-awesome-icon.icon-font(:icon="['fas', 'check']")
					span Intentos de hacerse pasar por otra persona, cuenta o entidad, incluido un representante de Renti
				li
					font-awesome-icon.icon-font(:icon="['fas', 'check']")
					span Contenido que es ilegal o que viola los derechos de otra persona o entidad, incluidos los derechos de propiedad intelectual y de privacidad.
				li
					font-awesome-icon.icon-font(:icon="['fas', 'check']")
					span Contenido que incluye información privada o confidencial de otra persona, incluido contenido que es suficiente para identificar la ubicación de un anuncio
					p Las siguientes son violaciones específicas de políticas para un tipo de contenido:
					ul.ul_class
				li
					font-awesome-icon.icon-font(:icon="['fas', 'check']")
					span Títulos de anuncios
				li
					font-awesome-icon.icon-font(:icon="['fas', 'check']")
					span Títulos de anuncios que incluyen información irrelevante para el tipo, estilo o experiencia del anuncio
				li
					font-awesome-icon.icon-font(:icon="['fas', 'check']")
					span Títulos de anuncios que incluyan símbolos o emojis
				li
					font-awesome-icon.icon-font(:icon="['fas', 'check']")
					span Anuncios o páginas de perfil
				li
					font-awesome-icon.icon-font(:icon="['fas', 'check']")
					span Anuncios y perfiles que proporcionen información fraudulenta, falsa, confusa o engañosa
</template>
<script>
export default {
	layout: 'headerHotels',
}
</script>
<style lang="stylus">
@import '../../assets/style/renti/content_footer.styl';
</style>
