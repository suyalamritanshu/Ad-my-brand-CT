describe('E2E Test for MyComponent', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('should fill out the form and submit successfully', () => {
        // Fill out the form fields
        cy.get('.szh-menu-button').click(); // Click on the user input field
        // cy.get('.szh-menu__item').select('Leanne Graham');
        cy.get('#menuButton li:nth-child(2)').click();

        cy.get('#title').type('Test Title');
        cy.get('#desc').type('Test Description');

        // Interact with UsersComponent (you may need to adapt this based on your actual component)

        // Select a user (assuming UsersComponent allows you to select a user)
        cy.get('#submit_Btn').click();

        // Submit the form

        // Assert success message is displayed
        cy.contains('Hey! Data sent').should('exist');
    });

    it('should show validation errors for all empty fields', () => {
        // Try to submit the form without filling out the fields
        cy.get('#submit_Btn').click();

        // Assert validation error messages are displayed
        cy.contains('No user, title, description found').should('exist');
        //   cy.contains('Validation Error: Please enter description').should('exist');
        //   cy.contains('Validation Error: Please select user').should('exist');
    });

    it('should show validation errors for title field', () => {
        // Try to submit the form without filling out the fields
        cy.get('.szh-menu-button').click();
        cy.get('#menuButton li:nth-child(2)').click();
        cy.get('#submit_Btn').click();

        // Assert validation error messages are displayed
        cy.contains('Validation Error: Please enter title').should('exist');
        //   cy.contains('Validation Error: Please enter description').should('exist');
        //   cy.contains('Validation Error: Please select user').should('exist');
    });
    it('should show validation errors for description field', () => {
        // Try to submit the form without filling out the fields
        cy.get('.szh-menu-button').click();
        cy.get('#menuButton li:nth-child(2)').click();
        cy.get('#title').type('Test Title');
        cy.get('#submit_Btn').click();

        // Assert validation error messages are displayed
        cy.contains('Validation Error: Please enter description').should('exist');
        //   cy.contains('Validation Error: Please enter description').should('exist');
        //   cy.contains('Validation Error: Please select user').should('exist');
    });


    // Add more test cases as needed
});