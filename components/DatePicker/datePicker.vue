<template lang="pug">
	.form__date
		.form__date-container
			.datePick#datePick
			el-date-picker(type="date"
				v-model="date_first"
				format="yyyy/MM/dd"
				value-format="yyyy/MM/dd"
				:picker-options="pickerOptionsIni"
				@input="captureDataIni")
		el-divider( direction="vertical")
		.form__date-container
			.datePick#datePick2
			el-date-picker(type="date"
				v-model="date_last"
				format="yyyy/MM/dd"
				value-format="yyyy/MM/dd"
				:picker-options="pickerOptions"
				@input="captureDataFin")
</template>

<script>
export default {
	props: ["date_ini", "date_fin"],
	name: "datePicker",
	data() {
		var vm = this;
		return {
			date_first: this.date_ini,
			// || new Date().toJSON().slice(0,10).split('-').join('/'),
			date_last: this.date_fin,
			// || new Date(Date.now() + 24 * 60 * 60 * 1000).toJSON().slice(0,10).split('-').join('/') ,
			pickerOptionsIni: {
				disabledDate(time) {
					return time.getTime() < new Date(Date.now() - 86400000);
				}
			},
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() < new Date(vm.date_first);
				}
			}
		};
	},
	mounted() {
		this.captureDataIni(this.date_first);
		this.captureDataFin(this.date_last);
	},
	methods: {
		getCheckIn() {
			this.$emit("setCheckIn", this.date_first);
		},
		getCheckOut() {
			this.$emit("setCheckOut", this.date_last);
		},
		captureDates(date, text) {
			if (date !== undefined && date !== null) {
				const arrayDate = new Date(date)
					.toISOString()
					.split("T")[0]
					.split("-");
				const months = [
					"Ene",
					"Feb",
					"Mar",
					"Abr",
					"May",
					"Jun",
					"Jul",
					"Ago",
					"Set",
					"Oct",
					"Nov",
					"Dic"
				];
				const weekday = [
					"Domingo",
					"Lunes",
					"Martes",
					"Miércoles",
					"Jueves",
					"Viernes",
					"Sábado"
				];
				months.forEach((month, index) => {
					if (index + 1 == arrayDate[1]) arrayDate[1] = month;
				});
				const getDate = new Date(date);
				const day = weekday[getDate.getDay()];
				return `
				<div class="date__div1">
						<span class="day_style">${arrayDate[2]}</span>
						<div class="date__div2">
							<span>${arrayDate[1]} ${arrayDate[0]}</span>
							<span> ${day} </span>
						</div>
					</div>`;
			} else {
				return `
				<div class="flex">
					<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
						width="48" height="35"
						viewBox="0 0 172 172"
						style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g><path d="M17.91667,136.16667v-86h136.16667v86c0,7.88333 -6.45,14.33333 -14.33333,14.33333h-107.5c-7.88333,0 -14.33333,-6.45 -14.33333,-14.33333z" fill="#e9e1e1"></path><path d="M154.08333,35.83333v21.5h-136.16667v-21.5c0,-7.88333 6.45,-14.33333 14.33333,-14.33333h107.5c7.88333,0 14.33333,6.45 14.33333,14.33333z" fill="#7b2bed"></path><path d="M118.25,25.08333c-5.93706,0 -10.75,4.81294 -10.75,10.75c0,5.93706 4.81294,10.75 10.75,10.75c5.93706,0 10.75,-4.81294 10.75,-10.75c0,-5.93706 -4.81294,-10.75 -10.75,-10.75zM53.75,25.08333c-5.93706,0 -10.75,4.81294 -10.75,10.75c0,5.93706 4.81294,10.75 10.75,10.75c5.93706,0 10.75,-4.81294 10.75,-10.75c0,-5.93706 -4.81294,-10.75 -10.75,-10.75z" fill="#9a58f3"></path><path d="M118.25,10.75c-3.94167,0 -7.16667,3.225 -7.16667,7.16667v17.91667c0,3.94167 3.225,7.16667 7.16667,7.16667c3.94167,0 7.16667,-3.225 7.16667,-7.16667v-17.91667c0,-3.94167 -3.225,-7.16667 -7.16667,-7.16667zM53.75,10.75c-3.94167,0 -7.16667,3.225 -7.16667,7.16667v17.91667c0,3.94167 3.225,7.16667 7.16667,7.16667c3.94167,0 7.16667,-3.225 7.16667,-7.16667v-17.91667c0,-3.94167 -3.225,-7.16667 -7.16667,-7.16667z" fill="#b0bec5"></path><g fill="#90a4ae"><path d="M46.58333,71.66667h14.33333v14.33333h-14.33333zM68.08333,71.66667h14.33333v14.33333h-14.33333zM89.58333,71.66667h14.33333v14.33333h-14.33333zM111.08333,71.66667h14.33333v14.33333h-14.33333zM46.58333,93.16667h14.33333v14.33333h-14.33333zM68.08333,93.16667h14.33333v14.33333h-14.33333zM89.58333,93.16667h14.33333v14.33333h-14.33333zM111.08333,93.16667h14.33333v14.33333h-14.33333zM46.58333,114.66667h14.33333v14.33333h-14.33333zM68.08333,114.66667h14.33333v14.33333h-14.33333zM89.58333,114.66667h14.33333v14.33333h-14.33333zM111.08333,114.66667h14.33333v14.33333h-14.33333z"></path></g></g></g></svg>
					<span class="text"> ${text} </span>
				</div>`;
			}
		},
		captureDataIni(date_ini) {
			this.getCheckIn();
			if (date_ini > this.date_last) {
				this.captureDataFin(undefined)
			}

			document.getElementById("datePick").innerHTML = this.captureDates(
				date_ini,
				"Llegada"
			);
		},
		captureDataFin(date_fin) {
			this.getCheckOut();
			document.getElementById("datePick2").innerHTML = this.captureDates(
				date_fin,
				"Salida"
			);
		}
	}
};
</script>
<style lang="stylus">
@import '../../assets/style/renti/datePicker.styl';
</style>
