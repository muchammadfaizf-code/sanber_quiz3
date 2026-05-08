describe('API Automation - Escuelajs Categories', () => {
  const baseUrl = 'https://api.escuelajs.co/api/v1/categories';
  let createdCategory = {}; // akan menyimpan id, name, slug

  before(() => {
    // Create category sekali di awal
    cy.request('POST', baseUrl, {
      name: 'Category Faiz Init',
      image: 'https://placeimg.com/640/480/any'
    }).then((response) => {
      expect(response.status).to.eq(201);
      createdCategory = {
        id: response.body.id,
        name: response.body.name,
        slug: response.body.slug
      };
      cy.log(`Created category: ${JSON.stringify(createdCategory)}`);
    });
  });

  it('TC01 - GET all categories', () => {
    cy.request('GET', baseUrl).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.length).to.be.greaterThan(0);
    });
  });

  it('TC02 - GET single category by ID (from const)', () => {
    cy.request('GET', `${baseUrl}/${createdCategory.id}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', createdCategory.id);
      expect(response.body).to.have.property('name', createdCategory.name);
    });
  });

  it('TC03 - GET category by slug (from const)', () => {
    cy.request('GET', `${baseUrl}/slug/${createdCategory.slug}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.slug).to.eq(createdCategory.slug);
    });
  });

  it('TC04 - PUT update category (from const)', () => {
    cy.request('PUT', `${baseUrl}/${createdCategory.id}`, {
      name: 'Updated Category Faiz',
      image: 'https://placeimg.com/640/480/tech'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq('Updated Category Faiz');
    });
  });

  // it('TC05 - PATCH update category (from const)', () => {
  //   cy.request('PATCH', `${baseUrl}/${createdCategory.id}`, {
  //     image: 'https://placeimg.com/640/480/nature'
  //   }).then((response) => {
  //     expect(response.status).to.eq(200);
  //     expect(response.body.image).to.include('nature');
  //   });
  // });

  it('TC06 - DELETE category (from const)', () => {
    cy.request('DELETE', `${baseUrl}/${createdCategory.id}`).then((delRes) => {
      expect(delRes.status).to.eq(200);
    });
  });

    it('TC08 - GET products by category', () => {
    cy.request('GET', `${baseUrl}/4/products`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

});
