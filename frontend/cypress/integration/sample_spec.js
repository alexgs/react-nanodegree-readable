describe('My first test', function () {
    it('works (positive control)', function () {
        expect(1+1).to.equal(2);
    });

    it.skip('works (negative control)', function () {
        expect(1+1).to.equal(3);
    });

    it('visits the Kitchen Sink', function () {
        cy.visit('https://example.cypress.io');
        cy.contains('type').click();
        cy.url().should('include', '/commands/actions');

        cy.get('.action-email')
            .type('emusk@spacex.com')
            .should('have.value', 'emusk@spacex.com');
    });
});
