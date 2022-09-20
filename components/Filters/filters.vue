<template lang="pug">
	.container-filters
		.filters
			v-date-picker(v-model="range" mode='range' :popover="{ visibility: 'click' }")
				el-button(icon="el-icon-date" ) Fechas
					//- el-button.button-filter(slot="reference" icon="el-icon-date") Fechas
			.popover-huesp
				el-popover(placement="bottom" trigger="click")
					.container_qty_people
						label.la Número de adultos
							el-input-number(size="medium" :min="1" v-model="adult")
						label.la Número de niños
							el-input-number(size="medium" :min="0" v-model="child")
					el-button.button-filter(slot="reference" icon="el-icon-user") Huéspedes
			.moneyOrder
				el-popover(placement="bottom" trigger="click")
					div.popover-radio
						el-radio(v-model="radio" label="1") Ascendente
						el-radio(v-model="radio" label="2") Descendente
					el-button.button-filter(slot="reference" icon="el-icon-money") Precio
</template>

<script>
import DatePicker from "../DatePicker/datePicker.vue";
export default {
	props: ["date_ini", "date_fin", "data"],
	components: {
		DatePicker
	},
	data() {
		return {
			radio: '1',
			chil: '',
			// range: {
			// 	start: new Date("02-04-2020"), end: new Date("02-06-2020")
			// }
		};
	},
	computed: {
		range() {
			let checkIn = this.$props.date_ini.split('/');
			checkIn = `${checkIn[1]}-${checkIn[2]}-${checkIn[0]}`
			let checkOut = this.$props.date_fin.split('/');
			checkOut = `${checkOut[1]}-${checkOut[2]}-${checkOut[0]}`
			return {
				start: new Date(checkIn), end: new Date(checkOut)
			}
		},
		child: {
			set: function(newValue) {
				this.chil = newValue;
			},
			get:function () {
				return Object.keys(this.$props.data).length === 0 ? 0 : this.$props.data.n_huespedes.child;
			}
		},
		adult() {
			return Object.keys(this.$props.data).length === 0 ? 0 : this.$props.data.n_huespedes.adult;
		}
	},
	mounted() {
		this.date_checkIn = this.$props.date_ini;
		this.date_checkOut = this.$props.date_fin;
	},
	methods: {
		checkIn(date) {
			this.date_checkIn = date;
		},
		checkOut(date) {
			this.date_checkOut = date;
		}
	}
};
</script>

<style lang="stylus">
.moneyOrder
		/deep/ .el-popper[x-placement^="bottom"]
			width 50% !important
	.popover-radio
		display flex
		flex-direction column
.container-filters
	width 100%
	display flex
	justify-content space-between
	padding 0.5% 2% 0.5% 2%
	background-color #F0F0F0
	border 1px solid #97979724
	align-items center
.filters
	width 100%
	display flex
	justify-content space-between
.button-filter
	font-family 'Be Vietnam', sans-serif
	border-radius 20px
	font-size 12px
	background-color transparent
.vc-grid-container[data-v-3ca35a05]
	overflow hidden
.vc-text-gray-900
	color #7B2DEB !important
	width 100%
	border none
.vc-rounded-lg
	box-shadow 0px 4px 4px 3px #00000038
.vc-svg-icon[data-v-5572e632]
	stroke white
	stroke-width 3px
	border none
	border-radius 40px
	height 25px
	width 25px
	background-color #7b2deb
.vc-bg-blue-200
	background-color #7b2deb7d
.vc-bg-blue-600
	background-color #7b2deb !important

.container_qty_people
	display flex
	flex-direction column
	.la
		display flex
		justify-content space-between
		align-items center
		font-family 'Be Vietnam', sans-serif
		margin-bottom 5%
		font-size 12px
		.el-input-number--medium
			width 118px
		.el-input--medium .el-input__inner
			border none
		.el-input-number__decrease, .el-input-number__increase
			background-color #ffffff
			color #7b2deb
			border none
			border-radius 12px
			border 1px solid #7b2deb

.vc-arrows-container
	z-index 2 !important
.vc-day-content[data-v-47ef1cd6]
	font-family 'Be Vietnam', sans-serif !important
	// border-radius 6px !important
.vc-rounded-full
	border-radius 6px !important
.vc-day[data-v-47ef1cd6]
	width 77% !important
.vc-highlights[data-v-47ef1cd6]
	border-radius 6px
	border none
.vc-text-gray-600
	color white !important
.vc-bg-purple-600
	background-color #7B2DEB
.vc-bg-purple-200
	background-color #7b2deb75
.vc-text-purple-900
	color white !important
	border none !important
.vc-day-content[data-v-47ef1cd6]
	border 1px solid #7b2deb21
.vc-title[data-v-d137fa42]
	text-transform capitalize
	font-family 'Be Vietnam', sans-serif
	font-size 16px

.vc-text-gray-400
	color #CACACA
	background-color #F0F0F0
	border 1px solid #70707021 !important
.el-radio__input.is-checked .el-radio__inner
	border-color #7B2DEB
	background #7B2DEB
.el-radio__input.is-checked+.el-radio__label
	color #7B2DEB
.el-button
	&:active
	&:visited
	&:link
	&:focus
		color #7B2DEB
		border-color #7B2DEB

@media screen and (min-width:764px)
	.filters
		width auto
		.popover-huesp
			margin 0 0.8rem 0 0.8rem
	// .el-popper[x-placement^="bottom"]
	// 	width 30%
</style>

<style lang="stylus" scoped>

	.el-popper[x-placement^="bottom"]
		width 80%
</style>
