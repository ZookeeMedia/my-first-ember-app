import { computed } from '@ember/object';
import { match, not, equal } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({

  headerMessage: 'My First Ember App',
  responseMessage: '',
  emailAddress: '',

  isValid: match('emailAddress', /^.+@.+\..+$/),
  isDisabled: not('isValid'),

  actions: {

    saveInvitation() {
      const email = this.emailAddress;

      const newInvitation = this.store.createRecord('invitation', {
        email: email
      });

      newInvitation.save().then((response) => {
        this.set('responseMessage', `Thank you! We saved your email address with the following id: ${response.get('id')}`);
        this.set('emailAddress', '');
      });

    }
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
      // One of the best regular expression website: http://www.regexr.com/
      // Split the query at spaces and join them to get like this: /(word1)+.*(word2)+.*(word3)+.*/ig
      const regexString = '(' + query.split(' ').join(')+.*(') + ')+.*';
      // i: case insensitive, g: global
      const regex = new RegExp(regexString, 'ig');

      results = results.filter((item) => item.get('title').match(regex));
    }

    return results.sortBy('title');
  })

});
