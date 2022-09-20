describe("Search hotel empty data", () => {
	it("Flujo datos vacios", () => {
		cy.visit("/");
		cy.get(".button-search").click();
		cy.get(".invalid-name > .el-alert").invoke("text").should("eq", "Completa los campos");
	});
});

describe("Search hotel", () => {
	it("Flujo search hotel", () => {
		cy.visit("/");
		cy.get(".el-select > .el-input > .el-input__inner")
			.type("puno", {
				force: true
			})
			.invoke("val")
			.should("deep.equal", "puno");

		cy.get(":nth-child(2) > .option").click();

		cy.get(".el-select > .el-input > .el-input__inner")
			.invoke("val")
			.should("deep.equal", "Puno");

		cy.get(":nth-child(1) > .el-date-editor > .el-input__inner").type("2020/05/01");
		cy.get(":nth-child(3) > .el-date-editor > .el-input__inner").type("2020/05/03");

		cy.get(".form__send").click();

		cy.get(":nth-child(1) > .el-input-number > .el-input-number__increase > .el-icon-plus").click();

		cy.get(".button-search").click();
	});
})
