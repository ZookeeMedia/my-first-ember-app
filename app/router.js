import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {

  this.route('articles', function() {
    this.route('new');
    this.route('edit', { path: '/:articles_id/edit' });
  });

});

export default Router;
