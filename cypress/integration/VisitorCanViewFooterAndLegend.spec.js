describe('Visitor can view Footer (and Legend)', () => {

  beforeEach(function () {
    cy.viewport(1366, 542)
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:list_of_posts.json',
      status: 200
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts/3',
      response: 'fixture:view_single_entry.json',
      status: 200
    })
    cy.visit('http://localhost:3000/')
  })

  it('and see logo', () => {
    cy.contains('Being Stockholm')
  })

  it('and click and see sidebar menu', () => {
    cy.get('#menu-sidebar').should('not.be.visible')
    cy.get('#footer-menu-icon').click()
    cy.get('#menu-sidebar').should('be.visible')

    let text = ['About', 'Log in / Sign up', 'Contact', 'Being Stockholm beta', 'FAQs']

    text.forEach(link => {
      cy.get('#menu-sidebar').contains(link)
    })

    cy.get('#footer-menu-icon').click()
    cy.get('#menu-sidebar').should('not.be.visible')
  })

  it('and click and see Legend', () => {
    cy.get('.legend-grid').should('not.be.visible')
    cy.get('#legend').click()
    cy.get('.legend-grid').should('be.visible')
    cy.contains('Newbie at')
    cy.contains('Settled at')
    cy.get('#3').click()
    cy.get('.legend-grid').should('not.be.visible')
  })
})
