describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    const anotherUser = {
      name: 'Matti Luukkainen',
      username: 'sara',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', anotherUser)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function () {
    cy.contains('Blogs')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('form').contains('username')
  })


  describe('Login',function() {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'logged-in')
    }) })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })
    it('a new blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('a note created by cypress')
      cy.get('#author').type('superuser')
      cy.get('#url').type('superuser.com')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'another note cypress', author: 'superuser', url: 'hola.com' })
      })

      it('it can show content', function () {
        cy.get('.default').contains('view')
          .click()

        cy.get('.hide').contains('likes:')
      })


      it('user can like it', function () {
        cy.get('.default').contains('view')
          .click()
        cy.get('#numberOfLikes').contains('0')
        cy.get('#likeButton').click()
        cy.get('#numberOfLikes').contains('1')
      })


      it('user can remove it', function () {
        cy.get('.default').contains('view')
          .click()
        cy.get('#removeButton').click()
        cy.get('html').should('not.contain', 'another note cypress')
      })


      it.only('another user cannot remove it', function () {
        cy.get('#logoutButton').click()
        cy.login({ username: 'sara', password: 'sekret' })
        cy.get('.default').contains('view')
          .click()
        // cy.get('#removeButton').click()
        cy.get('.hide').should('not.contain', 'remove')
      })
    })

  })
})


