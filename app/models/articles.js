import { notEmpty } from '@ember/object/computed';
import DS from 'ember-data';
import Faker from 'faker';

export default DS.Model.extend({

  title: DS.attr('string'),
  content: DS.attr('string'),

  isValid: notEmpty('title'),

  randomize() {
    this.set('title', Faker.company.companyName() + ' Articles');
    this.set('content', Faker._content());
    return this;
  },

});
