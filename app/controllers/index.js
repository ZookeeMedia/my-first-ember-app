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
