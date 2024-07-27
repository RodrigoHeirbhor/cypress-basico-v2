describe('Central de Atendimento ao Cliente TAT', function() {
  const THREE_SECONDS_IN_MS = 3000

    beforeEach(function() {
      cy.visit('./src/index.html')
    })
      it('verifica o título da aplicação', function() {
    cy.visit('./src/index.html')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
      })

      it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste. teste'

        cy.clock()

        cy.get('#firstName').type('Rodrigo')
        cy.get('#lastName').type('Sá')
        cy.get('#email').type('rodrigoheirbhor@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
  
        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')
      })

      it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.clock()

        cy.get('#firstName').type('Rodrigo')
        cy.get('#lastName').type('Sá')
        cy.get('#email').type('rodrigoheirbhor@gmail')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
      })

     Cypress._.times(3, function() {
      it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value', '')
       })
     })
      it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.clock()

        cy.get('#firstName').type('Rodrigo')
        cy.get('#lastName').type('Sá')
        cy.get('#email').type('rodrigoheirbhor@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
  
        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
      })
  
      it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
          .type('Rodrigo')
          .should('have.value', 'Rodrigo')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('Sá')
          .should('have.value', 'Sá')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('rodrigoheirbhor@gmail.com')
          .should('have.value', 'rodrigoheirbhor@gmail.com')
          .clear()
          .should('have.value', '')
        cy.get('#phone')
          .type('99984584527')
          .should('have.value', '99984584527')
          .clear()
          .should('have.value', '')
      })

      it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.clock()

        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
      })
      it('envia o formulário com sucesso usando um comando customizado', function() {
        cy.clock()

        cy.fillMandatoryFieldsAndSubmit()
  
        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')
      })
      it('seleciona um produto (Blog) por seu texto', function(){
        cy.get('#product')
          .select('Blog')
          .should('have.value', 'blog')
      })
      it('seleciona um produto (Cursos) por seu valor (value)', function() {
        cy.get('#product')
          .select('Cursos')
          .should('have.value', 'cursos')
      })
      it('seleciona um produto (Mentoria) por seu indice', function() {
        cy.get('#product')
          .select(3)
          .should('have.value', 'mentoria')
      })
      it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
      })
      it('Marca o tipo de atendimento "Feedback"', function() {
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
      })
      it('Marca cada tipo de atendimento', function() {
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
      })
      it('Marca ambos os checkboxes, depois desmarca o ultimo', function() {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
      })
        it('Selecione um arquivo da pasta fixtures', function() {
          cy.get('input[type="file"]')
         .should('not.have.value')
         .selectFile('./cypress/fixtures/example.json')
         .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
         })
        })
         it('Seleciona um arquivo simulando drag and drop', function() {
          cy.get('input[type="file"]')
         .should('not.have.value')
         .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
         .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
         })
        })
        it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
          cy.fixture('example.json').as('sampleFile')
          cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input) {
              expect($input[0].files[0].name).to.equal('example.json')
             })
        })
        it('Verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', function() {
          cy.get('#privacy a').should('have.attr', 'target', '_blank')
  
        })
        it('Acessa a pagina da política de privacidade removendo o target e então clicando no link', function() {
          cy.get('#privacy a').click()
            .invoke('removeAttr', 'target')
            .click()
  
          cy.contains('Talking About Testing').should('be.visible')  
        })

        it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function () {
          cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
          cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
        })
        it('preenche a area de texto usando o comando invoke', function() {
          const longText = Cypress._.repeat('013456789', 20)

          cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
        })
        it('faz uma requisição HTTP', function (){
          cy.request('http://127.0.0.1:5500/src/index.html')
            .should(function(response){
              const { status, statusText, body } = response
              expect(status).to.equal(200)
              expect(statusText).to.equal('OK')
              expect(body).to.include('CAC TAT')
            })
        })
        it.only('encontra o gato escondido', function() {
          cy.get('#cat')
            .invoke('show')
            .should('be.visible')
          cy.get('#title')
            .invoke('text', 'CAT TAT')
          cy.get('#subtitle')
            .invoke('text', 'Eu ❤️​🐈​ meu gato Afonso!')

        })
      })