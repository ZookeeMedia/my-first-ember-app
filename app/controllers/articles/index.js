import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({

  queryParams: ['filter', 'limit', 'letter'],
  filter: '',
  letter: '',
  limit: 'all',

  limitAll: equal('limit', 'all'),

  filteredList: computed('model.@each.title', 'filter', function() {

    console.log('this.model', this.model );
    let results = this.model;
    const query = this.filter;

    if (query) {
      const regexString = '(' + query.split(' ').join(')+.*(') + ')+.*';
      const regex = new RegExp(regexString, 'ig');

      results = results.filter((item) => item.get('title').match(regex));
    }

    return results.sortBy('title');
  })
});
