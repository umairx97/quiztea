'use strict';

/**
 * Request.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all requests.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('request', params);
    // Select field to populate.
    const populate = Request.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Request
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(filters.populate || populate);
  },

  /**
   * Promise to fetch a/an request.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Request.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Request
      .findOne(_.pick(params, _.keys(Request.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count requests.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('request', params);

    return Request
      .countDocuments()
      .where(filters.where);
  },

  /**
   * Promise to add a/an request.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Request.associations.map(ast => ast.alias));
    const data = _.omit(values, Request.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Request.create(data);

    // Create relational data and return the entry.
    return Request.updateRelations({ _id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an request.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Request.associations.map(a => a.alias));
    const data = _.omit(values, Request.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Request.updateOne(params, data, { multi: true });

    // Update relational data and return the entry.
    return Request.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an request.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Request.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Request
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Request.associations.map(async association => {
        if (!association.via || !data._id) {
          return true;
        }

        const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
        const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

        // Retrieve model.
        const model = association.plugin ?
          strapi.plugins[association.plugin].models[association.model || association.collection] :
          strapi.models[association.model || association.collection];

        return model.update(search, update, { multi: true });
      })
    );

    return data;
  },

  /**
   * Promise to search a/an request.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('request', params);
    // Select field to populate.
    const populate = Request.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Request.attributes).reduce((acc, curr) => {
      switch (Request.attributes[curr].type) {
        case 'integer':
        case 'float':
        case 'decimal':
          if (!_.isNaN(_.toNumber(params._q))) {
            return acc.concat({ [curr]: params._q });
          }

          return acc;
        case 'string':
        case 'text':
        case 'password':
          return acc.concat({ [curr]: { $regex: params._q, $options: 'i' } });
        case 'boolean':
          if (params._q === 'true' || params._q === 'false') {
            return acc.concat({ [curr]: params._q === 'true' });
          }

          return acc;
        default:
          return acc;
      }
    }, []);

    return Request
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  addRewardRequest: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Request.associations.map(ast => ast.alias));
    const data = _.omit(values, Request.associations.map(ast => ast.alias));

    data.requestedDate = new Date();

    // Create entry with no-relational data.
    const entry = await Request.create(data);

    // Create relational data and return the entry.
    return Request.updateRelations({ _id: entry.id, values: relations });
  },

  getWeekOneCountOfMonth: () => {

    let weekOne = new Date();
    weekOne.setDate(weekOne.getDate()-7);

    const paramWeekOne = { 'requestedDate_gte': weekOne, 'requestedDate_lte': new Date() };

    const filters = strapi.utils.models.convertParams('request', paramWeekOne);

    const result = Request
      .find()
      .where(filters.where);

    return result;
  },

  getWeekTwoCountOfMonth: () => {

    let weekOne = new Date();
    weekOne.setDate(weekOne.getDate()-7);

    let weekTwo = new Date();
    weekTwo.setDate(weekTwo.getDate()-14);

    const paramWeekTwo = { 'requestedDate_gte': weekTwo, 'requestedDate_lte': weekOne };

    const filters = strapi.utils.models.convertParams('request', paramWeekTwo);

    const result = Request
      .find()
      .where(filters.where);

    return result;
  },

  getWeekThreeCountOfMonth: () => {

    let weekOne = new Date();
    weekOne.setDate(weekOne.getDate()-14);

    let weekTwo = new Date();
    weekTwo.setDate(weekTwo.getDate()-21);

    const paramWeekTwo = { 'requestedDate_gte': weekTwo, 'requestedDate_lte': weekOne };

    const filters = strapi.utils.models.convertParams('request', paramWeekTwo);

    const result = Request
      .find()
      .where(filters.where);

    return result;
  },

  getWeekFourthCountOfMonth: () => {

    let weekOne = new Date();
    weekOne.setDate(weekOne.getDate()-21);

    let weekTwo = new Date();
    weekTwo.setDate(weekTwo.getDate()-28);

    const paramWeekTwo = { 'requestedDate_gte': weekTwo, 'requestedDate_lte': weekOne };

    const filters = strapi.utils.models.convertParams('request', paramWeekTwo);

    const result = Request
      .find()
      .where(filters.where);

    return result;
  }
};
