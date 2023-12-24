import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Response } from 'superagent';

import { App, app }  from '../app';
import Team from '../database/models/TeamModel';
import mockTeams from './mocks/team'
import HTTPCodes from '../Interfaces/HTTPCodes';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando sucesso /teams', () => {
  beforeEach(async () => {
    sinon
    .stub(Team, 'findAll')
    .resolves(mockTeams as Team[])
  })

  afterEach(() => {
    (Team.findAll as sinon.SinonStub).restore();
  })

  let chaiHttpResponse: Response;

  it('Testando sucesso get /teams', async () => {

    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(HTTPCodes.OK);
    expect(chaiHttpResponse.body).to.be.deep.equal(mockTeams)
  });  
})

describe('Testando falha por erro desconhecido /teams', () => {
  beforeEach(async () => {
    sinon
    .stub(Team, 'findAll')
    .throws(new Error())
  })

  afterEach(() => {
    (Team.findAll as sinon.SinonStub).restore();
  })

  let chaiHttpResponse: Response;

  it('Testando falha no get /teams', async () => {

    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(HTTPCodes.INTERNAL_ERROR);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Something went wrong'})
  });  
})

describe('Testando sucesso /teams/:id', async () => {
    let chaiHttpResponse: Response;

    beforeEach(async () => {
      sinon
        .stub(Team, 'findByPk')
        .resolves(mockTeams[0] as Team)
    })

    afterEach(() => {
      (Team.findByPk as sinon.SinonStub).restore();
    })

    it('Testando get /teams/:id', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/teams/1');

      expect(chaiHttpResponse.status).to.be.equal(HTTPCodes.OK);
      expect(chaiHttpResponse.body).to.be.deep.equal(mockTeams[0])
  });
})

describe('Testando falha /teams/:id', async () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Team, 'findByPk')
      .resolves(undefined)
  })

  afterEach(() => {
    (Team.findByPk as sinon.SinonStub).restore();
  })

  it('Testando get falhando /teams/:id', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1');

    expect(chaiHttpResponse.status).to.be.equal(HTTPCodes.NOT_FOUND);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Team not found' })
  });
  it('should log a message when starting the server', () => {
    const consoleSpy = sinon.spy(console, 'log');
    const PORT = 3000;
  
    const myApp = new App();
    myApp.start(PORT);
  
    sinon.assert.calledWith(consoleSpy, `Running on port ${PORT}`);
    consoleSpy.restore();
  });
});