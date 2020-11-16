const KahootController = require('./controller/controller');
const KahootService = require('./service/service');
const KahootRepository = require('./repository/repository');

function initKahootModule(app, io, container) {
  const kahootController = container.get('KahootController');
  kahootController.configureRoutes(app, io);
}

module.exports = {
  initKahootModule,
  KahootController,
  KahootService,
  KahootRepository,
};
