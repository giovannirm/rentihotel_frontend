<template lang="pug">
	div.container
		el-table(:data="users" style="width: 80%" stripe)
			el-table-column(label="Nombre")
				template(slot-scope="scope")
					el-input(v-model="scope.row.first_name")
			el-table-column(label="Last name")
				template(slot-scope="scope")
					el-input(v-model="scope.row.last_name")
			el-table-column(label="Email")
				template(slot-scope="scope")
					el-input(v-model="scope.row.email")
			el-table-column(label="botones")
				template(slot-scope="scope")
					el-button(v-on:click="eliminarUser(scope.row.id)" type="danger") Eliminar
					el-button(v-on:click="editUser(scope.row.id)" type="warning") Editar
</template>

<script>
import Axios from "axios";
import { mapGetters } from "vuex";

export default {
	name: "login",

	data() {
		return {
			users: []
		};
	},

	mounted() {
		const token = this.$store.getters.getToken;
		const URL = "https://apirenti.com/v1/api/users";

		this.$axios({
			method: "GET",
			url: URL,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => {
				this.users = res.data.slice();
			})
			.catch(err => {
				alert("Wrong email/password");
				console.log(err);
			});
	},
	methods: {
		showUsers() {
			const token = this.$store.getters.getToken;
			const URL = "https://apirenti.com/v1/api/users";

			this.$axios({
				method: "GET",
				url: URL,
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				}
			})
				.then(res => {
					this.users = res.data.slice();
				})
				.catch(err => {
					alert("Wrong email/password");
					console.log(err);
				});
		},
		eliminarUser(id) {
			const token = this.$store.getters.getToken;
			const URL = `https://apirenti.com/v1/api/user/${id}`;

			this.$axios({
				method: "DELETE",
				url: URL,
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				}
			})
				.then(res => {
					console.log(res);
					this.showUsers();
				})
				.catch(err => {
					alert("No se eliminó");
					// eslint-disable-next-line
					console.log(err);
				});
		},

		editUser(id) {
			// console.log(id);
		}
	}
};
</script>

<style scoped lang="stylus"></style>
