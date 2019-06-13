'use strict';

/**
 * Type.js controller
 *
 * @description: A set of functions called "actions" for managing `Type`.
 */

module.exports = {

  /**
   * Retrieve type records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.type.search(ctx.query);
    } else {
      return strapi.services.type.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a type record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.type.fetch(ctx.params);
  },

  /**
   * Count type records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.type.count(ctx.query);
  },

  /**
   * Create a/an type record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.type.add(ctx.request.body);
  },

  /**
   * Update a/an type record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.type.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an type record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.type.remove(ctx.params);
  }
};
