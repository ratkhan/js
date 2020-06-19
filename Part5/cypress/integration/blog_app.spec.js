describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset');
        const user = {
            name: 'Luke Skywalker',
            username: 'lSkywalker',
            password: 'obiwan'
        };

        cy.request('POST', 'http://localhost:3001/api/users', user);
        cy.visit('http://localhost:3000');

    });

    it('login fails with wrong password', function() {
        cy.contains('login').click();
        cy.get('#loginField').type('lSkywalker');
        cy.get('#passwordField').type('obiwan2');
        cy.get('#login-button').click();

        cy.contains('Could not log in');
    });


    it('front page can be opened', function() {
        cy.contains('login');
    });

    describe('when logged in', function() {
        beforeEach(function () {
            cy.contains('login').click();
            cy.get('#loginField').type('lSkywalker');
            cy.get('#passwordField').type('obiwan');
            cy.get('#login-button').click();
        });

        it('a new blog can be created', function() {
            cy.contains('Add Blog').click();
            cy.get('#titleField').type('newTestBlog');
            cy.get('#authorField').type('Cypress');
            cy.get('#urlField').type('localhost');
            cy.contains('Save').click();

            cy.contains('Cypress');
        });

        it('you can find a certain blog', function() {
            cy.contains('Add Blog').click();
            cy.get('#titleField').type('newTestBlog');
            cy.get('#authorField').type('Cypress');
            cy.get('#urlField').type('localhost');
            cy.contains('Save').click();
            cy.contains('newTestBlog');


        });



    });
});
