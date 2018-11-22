import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({

  atoz: computed(function() {

    return Array.apply(null, { length: 26 }).map((x, i) => String.fromCharCode(97 + i).toUpperCase());
  })
});
