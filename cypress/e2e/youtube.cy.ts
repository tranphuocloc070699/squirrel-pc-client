
context("API Youtube Tests", () => {
  it("listTrendingVideo should return a list of video items", () => {
    const params = {
      countryCode: 'VN'
    }
    cy.request({
      method: "GET",
      url: `${Cypress.env('api_server')}/youtube/video/trending`,
      qs:params
    }).then((response) => {
      console.log({response})
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      expect(response.body.length).to.be.greaterThan(0); 
    });
  });

  it("searchByKeyword should return a list of video items", () => {
    const payload = {
      keyword: 'Test',
      size: '20'
    }
    cy.request({
      method: "POST",
      url: `${Cypress.env('api_server')}/youtube/search`,
      body:payload
    }).then((response) => {
      console.log({response})
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      expect(response.body.length).to.be.greaterThan(0); 
    });
  });
});
