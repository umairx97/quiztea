'use strict';

/**
 * Request.js controller
 *
 * @description: A set of functions called "actions" for managing `Request`.
 */

module.exports = {

  /**
   * Retrieve request records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.request.search(ctx.query);
    } else {
      return strapi.services.request.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a request record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.request.fetch(ctx.params);
  },

  /**
   * Count request records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.request.count(ctx.query);
  },

  /**
   * Create a/an request record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.request.add(ctx.request.body);
  },

  /**
   * Update a/an request record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.request.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an request record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.request.remove(ctx.params);
  },

  getWeeklyCountMonth: async (ctx) => {

    let dataWeek1 = await strapi.services.request.getWeekOneCountOfMonth();
    let dataWeek2 = await strapi.services.request.getWeekTwoCountOfMonth();
    let dataWeek3 = await strapi.services.request.getWeekThreeCountOfMonth();
    let dataWeek4 = await strapi.services.request.getWeekFourthCountOfMonth();

    let week1Count = dataWeek1.length;
    let week2Count = dataWeek2.length;
    let week3Count = dataWeek3.length;
    let week4Count = dataWeek4.length;

    let data = [week4Count, week3Count, week2Count, week1Count];

    ctx.send(data);
  },

  createMobileRewardRequest: async (ctx) => {
    return strapi.services.request.addRewardRequest(ctx.request.body);
  }
};
