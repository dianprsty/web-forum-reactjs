
describe("Login spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("should display login page correctly", () => {
    cy.get('input[placeholder="Email"]').should("be.visible");
    cy.get('input[placeholder="Password"]').should("be.visible");
    cy.get("button")
      .contains(/^Login$/)
      .should("be.visible");
  });

  it("should display alert when email is empty", () => {
    cy.get('input[placeholder="Password"]').type("passwordrahasia");
    cy.get("button")
      .contains(/^Login$/)
      .click();
    cy.contains("Email wajib diisi").should("be.visible");
  });

  it("should display alert when password is empty", () => {
    cy.get('input[placeholder="Email"]').type("testuser@mail.co");

    cy.get("button")
      .contains(/^Login$/)
      .click();

    cy.contains("Password wajib diisi").should("be.visible");
  });

  it("should display alert when email and password are wrong", () => {
    cy.get('input[placeholder="Email"]').type("testuser@mail.co");
    cy.get('input[placeholder="Password"]').type("wrong_password");

    cy.get("button")
      .contains(/^Login$/)
      .click();
    cy.contains("email or password is wrong").should("be.visible");
  });

  it("should display homepage when email and password are correct", () => {
    cy.get('input[placeholder="Email"]').type("diantest@mail.co");

    cy.get('input[placeholder="Password"]').type("123123");

    cy.get("button")
      .contains(/^Login$/)
      .click();

    cy.get("#profile").should("be.visible");
    cy.get("#profile").click();

    cy.get("button")
      .contains(/^Logout$/)
      .should("be.visible");
  });
});
