'use strict';

/**
 * Reward.js controller
 *
 * @description: A set of functions called "actions" for managing `Reward`.
 */

module.exports = {

  /**
   * Retrieve reward records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.reward.search(ctx.query);
    } else {
      return strapi.services.reward.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a reward record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.reward.fetch(ctx.params);
  },

  /**
   * Count reward records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.reward.count(ctx.query);
  },

  /**
   * Create a/an reward record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.reward.add(ctx.request.body);
  },

  /**
   * Update a/an reward record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.reward.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an reward record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.reward.remove(ctx.params);
  },

  getMobileRewards: async () => {
    return strapi.services.reward.getRewards();
  }
};
