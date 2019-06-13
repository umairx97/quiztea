/**
 *
 * HomePage reducer
 */

import { fromJS, List, Map } from 'immutable';

import { GET_ARTICLES_SUCCEEDED, GET_USER_COUNT_SUCCEEDED, GET_QUIZ_COUNT_GRAPH_DATA_SUCCEEDED, GET_REQUEST_COUNT_GRAPH_DATA_SUCCEEDED, GET_USER_COUNT_GRAPH_DATA_SUCCEEDED, GET_QUIZ_COUNT_SUCCEEDED, GET_REQUEST_COUNT_SUCCEEDED, ON_CHANGE, SUBMIT_SUCCEEDED } from './constants';

const initialState = fromJS({
  articles: List([
    {content: '', title: '', link: ''},
    {content: '', title: '', link: ''},
  ]),
  body: Map({
    email: '',
  }),
  userCount: 0,
  quizCount: 0,
  requestCount: 0,
  userCountGraphData: [0, 0, 0, 0],
  quizCountGraphData: [0, 0, 0, 0],
  requestCountGraphData: [0, 0, 0, 0]
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLES_SUCCEEDED:
      return state.update('articles', () => List(action.articles));
    case GET_USER_COUNT_SUCCEEDED:
      return state.update('userCount', () => action.userCount);
    case GET_USER_COUNT_GRAPH_DATA_SUCCEEDED:
      return state.update('userCountGraphData', () => action.userCountGraphData);
    case GET_QUIZ_COUNT_SUCCEEDED:
      return state.update('quizCount', () => action.quizCount);
    case GET_QUIZ_COUNT_GRAPH_DATA_SUCCEEDED:
      return state.update('quizCountGraphData', () => action.quizCountGraphData);
    case GET_REQUEST_COUNT_GRAPH_DATA_SUCCEEDED:
      return state.update('requestCountGraphData', () => action.requestCountGraphData);
    case GET_REQUEST_COUNT_SUCCEEDED:
      return state.update('requestCount', () => action.requestCount);
    case ON_CHANGE:
      return state.updateIn(['body', 'email'], () => action.value);
    case SUBMIT_SUCCEEDED:
      return state.updateIn(['body', 'email'], () => '');
    default:
      return state;
  }
}

export default homePageReducer;
