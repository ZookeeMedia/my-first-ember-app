import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    return this.store.createRecord('articles');
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('title', 'Create a new articles');
    controller.set('buttonLabel', 'Create');
  },

  renderTemplate() {
    this.render('articles/form');
  },

  actions: {

    saveArticle(newArticles) {
      newArticles.save().then(() => this.transitionTo('articles'));
    },

    willTransition() {
      this.controller.get('model').rollbackAttributes();
    }
  }
});
