<template lang="pug">
	.reserve
		h3 {{ hotel.nombre }}
		el-divider
		p Fechas
			DatePicker(:date_ini="date[0]" :date_fin="date[1]")
		p Huéspedes
		el-popover(placement="bottom" trigger="click")
			div.container_qty_people
				label.la Número de adultos
					el-input-number(size="mini" v-model="data.n_huespedes.adult" :min="1")
				label.la Número de niños
					el-input-number(size="mini" :min="0" v-model="data.n_huespedes.child")
			el-button.button-qty-people(slot="reference") {{ data.n_huespedes.adult }} adultos, {{ data.n_huespedes.child }} niños
		p(v-if="sumaTotal > 0") Habitaciones
		p.pReserve(v-else) ¡RESERVA YA!
		.reserve-detail__body(v-if="sumaTotal > 0")
			el-table(:data="dataReserve")
				el-table-column(prop="tipo_hab" label='Cant' width="60")
				el-table-column(label='Tipo' width="60")
					slot(slot-scope="scope")
						el-image(:src="scope.row.image" min-width="70" height="80")
				el-table-column(prop="precio" label='Precio' width="70")
				el-table-column(prop="noches" label='Días' width="55")
				el-table-column(prop="total" label='Total' width="55")
		p.montoTotal(v-if="sumaTotal>0") Monto total: S/. {{ sumaTotal}}
		el-button.reserved_button(v-if="sumaTotal>0" @click="showModal") RESERVAR
		modal(v-show="isModalVisible" @close="closeModal" :total="sumaTotal" :reserva="sumaTotal" :hotel="hotel" :data="data" :dataReserve="dataReserve")
</template>

<script>
import DatePicker from "../DatePicker/datePicker";
import modal from "../reserve-confirm";

export default {
	props: ["hotel", "dataReserve", "date", "data", "sumaTotal"],
	components: {
		DatePicker,
		modal
	},
	name: "reserveModal",
	data() {
		return {
			screen: "",
			isModalVisible: false
		};
	},
	computed: {
		totalHuespedes() {
			return (
				parseInt(this.data.n_huespedes.adult) +
				parseInt(this.data.n_huespedes.child)
			);
		}
	},
	mounted() {
		this.screen = window.screen.width;
		window.addEventListener("resize", () => {
			this.screen = window.innerWidth;
		});
	},
	watch: {
		sumaTotal: function(newVal, oldVal) {
			// watch it
		}
	},
	methods: {
		showModal() {
			this.isModalVisible = true;
			document.documentElement.style.overflow = "hidden";
			document.body.scroll = "no";
		},
		closeModal() {
			this.isModalVisible = false;
		}
	}
};
</script>

<style lang="stylus">
@import "../../assets/style/renti/reserveModal.styl"
</style>

<style lang="stylus" scoped>
@import url('https://fonts.googleapis.com/css?family=Be+Vietnam&display=swap" rel="stylesheet')

	/deep/ .form__date
		margin-top 5%
		border 1px solid #c5c2c2 !important
	/deep/ .el-popper[x-placement^=bottom]
		width 70%
	/deep/ .button-qty-people
		height 50px
		font-size 15px
		font-family 'Be Vietnam', sans-serif
</style>
