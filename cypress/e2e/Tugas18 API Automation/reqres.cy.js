describe('API Automation - ReqRes Demo', () => {
  const baseUrl = 'https://demo.reqres.in/api';

  it('TC01 - GET list users (page 1)', () => {
    cy.request('GET', `${baseUrl}/users?page=1`).then((response) => {
      expect(response.status).to.eq(200);

    });
  });

  it('TC02 - GET single user by ID', () => {
    cy.request('GET', `${baseUrl}/users/2`).then((response) => {
      expect(response.status).to.eq(200);
      
      
    });
  });

  it('TC03 - GET delayed response', () => {
    cy.request('GET', `${baseUrl}/users?delay=3`).then((response) => {
      expect(response.status).to.eq(200);

    });
  });

  it('TC04 - GET list colors (unknown)', () => {
    cy.request('GET', `${baseUrl}/unknown`).then((response) => {
      expect(response.status).to.eq(200);

      
    });
  });

  it('TC05 - GET single color by ID', () => {
    cy.request('GET', `${baseUrl}/unknown/2`).then((response) => {
      expect(response.status).to.eq(200);
      
      
    });
  });

  it('TC06 - GET users with pagination (page 2)', () => {
    cy.request('GET', `${baseUrl}/users?page=2`).then((response) => {
      expect(response.status).to.eq(200);
      
    });
  });


  it('TC08 - GET list resources (unknown)', () => {
    cy.request('GET', `${baseUrl}/unknown`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });



  it('TC10 - GET users with delay and pagination', () => {
    cy.request('GET', `${baseUrl}/users?page=2&delay=2`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
