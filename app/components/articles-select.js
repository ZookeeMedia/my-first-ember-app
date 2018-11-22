import Component from '@ember/component';

export default Component.extend({

  tagName: 'select',
  classNames: ['form-control'],
  articles: null,

  change(event) {
    const selectedArticleId = event.target.value;
    const selectedArticle = this.articles.find((record) => record.id === selectedArticleId);

    this.sendAction('action', selectedArticle);
  }
});
