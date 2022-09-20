describe("Pagina hoteles", () => {
	it("Paginacion", () => {
		cy.visit("/hotels?%7B%22id_busqueda%22%3A1,%22fecha_fin%22%3A%222020%2F05%2F02%22,%22fecha_ini%22%3A%222020%2F05%2F01%22,%22n_huespedes%22%3A%7B%22adult%22%3A2,%22child%22%3A0%7D,%22nombre_campo%22%3A%22departamento_id%22,%22departamento%22%3A1%7D");
		cy.get("h3").invoke("text").should("eq", "GHL HOTEL LAGO TITICACA PUNO");

		cy.get(".pagination > :nth-child(2)").click();
		cy.get("h3").invoke("text").should("eq", "Hotel Hacienda Plaza de Armas");
	});

	it("Order price", () => {
		cy.visit("/hotels?%7B%22id_busqueda%22%3A1,%22fecha_fin%22%3A%222020%2F05%2F02%22,%22fecha_ini%22%3A%222020%2F05%2F01%22,%22n_huespedes%22%3A%7B%22adult%22%3A2,%22child%22%3A0%7D,%22nombre_campo%22%3A%22departamento_id%22,%22departamento%22%3A1%7D");
		cy.get(".moneyOrder").click();
		// De menor a mayor
		cy.get(":nth-child(1) > .el-radio__input > .el-radio__inner").click();
		cy.get(".info p:nth-child(5)").invoke("text").should("eq", "Desde S/. 80.00")

		// De mayor a menor
		cy.get(":nth-child(2) > .el-radio__input > .el-radio__inner").click();
		cy.get(".info p:nth-child(5)").invoke("text").should("eq", "Desde S/. 100.00")
	});

	// it("Open detail page", () => {
	// 	cy.visit("/hotels?%7B%22id_busqueda%22%3A1,%22fecha_fin%22%3A%222020%2F05%2F02%22,%22fecha_ini%22%3A%222020%2F05%2F01%22,%22n_huespedes%22%3A%7B%22adult%22%3A2,%22child%22%3A0%7D,%22nombre_campo%22%3A%22departamento_id%22,%22departamento%22%3A1%7D");
	// 	cy.get('.img-card > .el-button').click();

	// });
});
