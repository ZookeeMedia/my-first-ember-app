import { notEmpty } from '@ember/object/computed';
import DS from 'ember-data';

export default DS.Model.extend({

  title: DS.attr('string'),
  content: DS.attr('string'),

  isValid: notEmpty('title'),

  randomize() {
    this.set('title', ' Articles');
    this.set('content', '');
    return this;
  },

});
