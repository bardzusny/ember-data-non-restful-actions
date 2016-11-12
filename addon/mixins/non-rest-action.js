import Ember from 'ember';

const { get, Mixin } = Ember;

export default Mixin.create({
  nonRestAction(action, method, data) {
    const { modelName } = this.constructor;
    const adapter = this.store.adapterFor(modelName);

    return adapter.ajax(this.getActionUrl(action, adapter), method, { data });
  },

  getActionUrl(action, adapter) {
    const { modelName } = this.constructor;
    const id = get(this, 'id');

    return `${adapter.buildURL(modelName, id)}/${action}`;
  },
});
