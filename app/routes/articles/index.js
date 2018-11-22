import Route from '@ember/routing/route';

export default Route.extend({

  queryParams: {
    limit: { refreshModel: true },
    letter: { refreshModel: true }
  },

  model(params) {

    if (params.limit === 'all') {
      return this.store.findAll('articles');
    }

    return this.store.query('articles', {
      orderBy: 'title',
      startAt: params.letter,
      endAt: params.letter+"\uf8ff"
    });
  },

  actions: {

    deleteArticle(articles) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        articles.destroyRecord();
      }
    }
  }

});
