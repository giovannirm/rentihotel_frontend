describe("Pagina hoteles", () => {
	it("open Show Photos", () => {
		cy.visit("http://localhost:3000/detail?id=1&data=%7B%22fecha_fin%22%3A%222020%2F05%2F01%22,%22fecha_ini%22%3A%222020%2F05%2F02%22,%22n_huespedes%22%3A%7B%22adult%22%3A2,%22child%22%3A0%7D%7D");
		cy.get('.gallery > .el-button').click();
		cy.get('.viewer-canvas').invoke('show').should('be.visible')
		// Cerrar modal
		cy.get('.viewer-button').click();
		cy.get('.viewer-canvas').should('not.be.visible')
	});

	it("open modal reserve", () => {
		cy.visit("http://localhost:3000/detail?id=1&data=%7B%22fecha_fin%22%3A%222020%2F05%2F01%22,%22fecha_ini%22%3A%222020%2F05%2F02%22,%22n_huespedes%22%3A%7B%22adult%22%3A2,%22child%22%3A0%7D%7D");
		cy.get('.glide__slide--active > .el-card > .el-card__body > .el-input-number > .el-input-number__increase').click();
		cy.get('.reserve').invoke('show').should('be.visible')

		cy.get('[data-glide-index="1"] > .el-card > .el-card__body > .el-input-number > .el-input-number__increase').click();
		cy.get(':nth-child(2) > .el-table_2_column_6').should('be.visible')
	});

	it("open confirm reserve modal", () => {
		cy.visit("http://localhost:3000/detail?id=1&data=%7B%22fecha_fin%22%3A%222020%2F05%2F01%22,%22fecha_ini%22%3A%222020%2F05%2F02%22,%22n_huespedes%22%3A%7B%22adult%22%3A2,%22child%22%3A0%7D%7D");
		cy.get('.glide__slide--active > .el-card > .el-card__body > .el-input-number > .el-input-number__increase').click();
		cy.get('.reserve').invoke('show').should('be.visible')

		cy.get('[data-glide-index="1"] > .el-card > .el-card__body > .el-input-number > .el-input-number__increase').click();
		cy.get(':nth-child(2) > .el-table_2_column_6').should('be.visible')

		cy.get('.reserved_button').click();

		cy.get('.modal-backdrop').should('be.visible')
	});
});
