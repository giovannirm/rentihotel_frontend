<template lang="pug">
	.content_menu
		h1 Preguntas frecuentes
		div.content
			font-awesome-icon.icon-font(:icon="['fas', 'check-circle']")
			span.title_content ¡Ayuda! Necesito modificar o cancelar mi reserva.
			p Si reservaste tu viaje con uno de nuestros proveedores desde la web de RENTI, consulta los detalles en cualquier momento en Reservas. Si reservaste fuera de RENTI o te redirigimos a la web del proveedor para completar tu reserva, ponte en contacto directo con este último. ¿No recuerdas el nombre del proveedor? Verifica qué empresa hizo el cargo en el estado de cuenta de tu tarjeta de crédito.
		div.content
			font-awesome-icon.icon-font(:icon="['fas', 'check-circle']")
			span.title_content ¿De dónde sale la clasificación de categoría de los hoteles?
			p Los hoteles, así como algunas agencias de viajes que venden reservas de hotel, nos proporcionan las categorías. RENTI toma toda esa información y te muestra la más precisa. Entendemos que algunos proveedores son más fiables que otros y lo tenemos en cuenta al mostrarte la clasificación.
		div.content
			font-awesome-icon.icon-font(:icon="['fas', 'check-circle']")
			span.title_content ¿Cómo hago para que mi hotel aparezca en RENTI?
			p ¿Quieres asociar tu hotel con nuestra web? Haz clic aquí.
		div.content
			font-awesome-icon.icon-font(:icon="['fas', 'check-circle']")
			span.title_content ¿Dónde encuentro mi confirmación de reserva?
			p Si reservaste con uno de nuestros proveedores en la web de RENTI, encuentra más información en Reservas. Si en cambio reservaste en otra web o te redirigimos de RENTI a otra página para completar la reserva, deberás ponerte en contacto directo con el proveedor. ¿No estás seguro de qué proveedor se trata? Revisa el estado de cuenta de tu tarjeta de crédito para ver qué empresa hizo el cargo.
		div.content
			font-awesome-icon.icon-font(:icon="['fas', 'check-circle']")
			span.title_content ¿Cómo hago para cambiar mi email en la cuenta de RENTI?
			p Visita la página de tu Cuenta para editar tu información personal.
		div.content
			font-awesome-icon.icon-font(:icon="['fas', 'check-circle']")
			span.title_content Quiero modificar algunos detalles de mi cuenta de RENTI, ¿cómo lo hago?
			p ¡Es fácil! Ve a tu Cuenta y adelante.
		div.content
			font-awesome-icon.icon-font(:icon="['fas', 'check-circle']")
			span.title_content ¿Cómo restablezco mi contraseña?
			p En el inicio de sesión, haz clic en el enlace para restablecer la contraseña.
		div.content
			font-awesome-icon.icon-font(:icon="['fas', 'check-circle']")
			span.title_content ¿Cómo hago para cambiar mi email en la cuenta de RENTI?
			p Visita la página de tu Cuenta para editar tu información personal.

</template>
<script>
export default {
	layout: 'headerHotels',
}
</script>
<style lang="stylus">
@import '../../assets/style/renti/content_footer.styl';
</style>
