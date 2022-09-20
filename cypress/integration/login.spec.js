describe("Login test ", () => {
	it("Flujo index to login", () => {
		cy.visit("/");
		cy.get(".flex_li > :nth-child(2)").click();

		cy.location("pathname").should("eq", "/login");

		cy.get(".email")
			.type("admin@renti.com")
			.get(".password")
			.type("123456");

		cy.get(".forgot-pass > .el-button").click();

		cy.location("pathname").should("eq", "/");
		cy.get(".flex_li > :nth-child(1)")
			.invoke("text")
			.should("eq", "admin@renti.com");
	});
});
