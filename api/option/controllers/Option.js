'use strict';

/**
 * Option.js controller
 *
 * @description: A set of functions called "actions" for managing `Option`.
 */

module.exports = {

  /**
   * Retrieve option records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.option.search(ctx.query);
    } else {
      return strapi.services.option.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a option record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.option.fetch(ctx.params);
  },

  /**
   * Count option records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.option.count(ctx.query);
  },

  /**
   * Create a/an option record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.option.add(ctx.request.body);
  },

  /**
   * Update a/an option record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.option.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an option record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.option.remove(ctx.params);
  }
};
