describe("Register test ", () => {
	it("Flujo index to register with bad password", () => {
		cy.visit("/");
		cy.get(".flex_li > :nth-child(1)").click();

		cy.location("pathname").should("eq", "/register");

		cy.get(".el-form > :nth-child(1) > .el-input__inner").type(
			"albaliliana@gmail.com"
		);

		cy.get(":nth-child(2) > :nth-child(1) > .el-input__inner").type(
			"Alba Liliana"
		);

		cy.get(":nth-child(2) > :nth-child(2) > .el-input__inner").type("Yauri");

		cy.get(":nth-child(3) > .el-input__inner").type("qwerty");

		cy.get(".el-date-editor > .el-input__inner").click();
		cy.contains("24").click();

		cy.get(":nth-child(4) > :nth-child(2) > .el-input__inner").select('Perú')

		cy.get(":nth-child(4) > .el-checkbox__input > .el-checkbox__inner").click()

		cy.get(".flex > .el-button").click()

		cy.get(".invalid-feedback > span").invoke("text").should("eq", "La contraseña debe contener números y letras");
	});

	it("Flujo index to register with good password", () => {
		cy.visit("/");
		cy.get(".flex_li > :nth-child(1)").click();

		cy.location("pathname").should("eq", "/register");

		cy.get(".el-form > :nth-child(1) > .el-input__inner").type(
			"albaliliana@gmail.com"
		);

		cy.get(":nth-child(2) > :nth-child(1) > .el-input__inner").type(
			"Alba Liliana"
		);

		cy.get(":nth-child(2) > :nth-child(2) > .el-input__inner").type("Yauri");

		cy.get(":nth-child(3) > .el-input__inner").type("qwerty123");

		cy.get(".el-date-editor > .el-input__inner").click();
		cy.contains("24").click();

		cy.get(":nth-child(4) > :nth-child(2) > .el-input__inner").select('Perú')

		cy.get(":nth-child(4) > .el-checkbox__input > .el-checkbox__inner").click()

		cy.get(".flex > .el-button").click()
	});
});

