# Ember-data-non-restful-actions

Non-RESTful Actions Mixin for Ember Data Model - shamelessly based on [excellent article by Jeff Jewiss](http://articles.jeffjewiss.com/non-restful-actions-mixin-for-ember-data-model/).

## Installation
* `ember install ember-data-non-restful-actions`

## Usage

Assuming you already have following resource endpoints in your API to access users, and standard Ember Data adapter generating corrects URL addresses for regular CRUD actions:

```
POST /user
GET /user
GET /user/123

...

PUT /user/123/disable      # non-standard member action
POST /user/reset_password  # non-standard collection action
```

Example `User` Ember Data model:

```javascript
import DS from 'ember-data';
import NonRestAction from 'ember-data-non-restful-actions/mixins/non-rest-action';

export default Model.extend(NonRestAction, {
  ...

  disable() {
    return this.nonRestAction('disable', 'PUT')
      .then(response => {
        // example of additionally handling server response directly within model
        this.set('state', 'disabled');
        return response;
      });
  },

  resetPassword(email) {
    return this.nonRestAction('reset_password', 'POST', { email });
  },
});
```

Now you'll be able to call `disable` and `resetPassword` actions on any `User` model instance - by default returning promises of API request responses.

```javascript
// member action
const user = this.store.findRecord('user', 123);
user.resetPassword('i_forgot@my.password'})
  .then(response => {
    // handle server response
  });

// collection action - simply called on model instance without `id`
const dummyUser = this.store.createRecord('user');
dummyUser.resetPassword('i_forgot@my.password')
  .then(response => {
    // handle server response
  });
```

## Version compatibility

Tested on Ember 2.7, 2.8, 2.9 with corresponding Ember Data versions. Expect support for LTS (currently 2.8) and latest minor versions (currently 2.9).

## Alternatives

* [ember-api-actions](https://github.com/mike-north/ember-api-actions/) - requiring additional method to handle response directly in the model - otherwise offering essentially the same functionality.
* [ember-data-actions](https://github.com/davewasmer/ember-data-actions) - doesn't work with Ember 2.0.

## Development

* `git clone git@github.com:bardzusny/ember-data-non-restful-actions.git`
* `cd ember-data-non-restful-actions`
* `npm install`
* `bower install`
* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`
