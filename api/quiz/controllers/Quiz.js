'use strict';

/**
 * Quiz.js controller
 *
 * @description: A set of functions called "actions" for managing `Quiz`.
 */

module.exports = {

  /**
   * Retrieve quiz records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.quiz.search(ctx.query);
    } else {
      return strapi.services.quiz.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a quiz record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.quiz.fetch(ctx.params);
  },

  /**
   * Count quiz records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.quiz.count(ctx.query);
  },

  /**
   * Create a/an quiz record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.quiz.add(ctx.request.body);
  },

  /**
   * Update a/an quiz record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.quiz.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an quiz record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.quiz.remove(ctx.params);
  },

  getMobileQuizzes: async () => {
    return strapi.services.quiz.getActiveQuizzes();
  },

  getWeeklyCountMonth: async (ctx) => {

    let dataWeek1 = await strapi.services.quiz.getWeekOneCountOfMonth();
    let dataWeek2 = await strapi.services.quiz.getWeekTwoCountOfMonth();
    let dataWeek3 = await strapi.services.quiz.getWeekThreeCountOfMonth();
    let dataWeek4 = await strapi.services.quiz.getWeekFourthCountOfMonth();

    let week1Count = dataWeek1.length;
    let week2Count = dataWeek2.length;
    let week3Count = dataWeek3.length;
    let week4Count = dataWeek4.length;

    let data = [week4Count, week3Count, week2Count, week1Count];

    ctx.send(data);
  },

  getMobileQuiz: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.quiz.getActiveQuiz(ctx.params);
  }
};
