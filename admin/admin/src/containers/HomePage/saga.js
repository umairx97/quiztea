import 'whatwg-fetch';
import { dropRight, take } from 'lodash';
import removeMd from 'remove-markdown';
import {
  all,
  call,
  fork,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import request from 'utils/request';
import { getArticlesSucceeded, submitSucceeded, getUserCountSucceeded, getUserCountGraphDataSucceeded, getRequestCountGraphDataSucceeded, getQuizCountSucceeded, getQuizCountGraphDataSucceeded, getRequestCountSucceeded } from './actions';
import { GET_ARTICLES, GET_USER_COUNT, GET_USER_COUNT_GRAPH_DATA, GET_QUIZ_COUNT_GRAPH_DATA, GET_REQUEST_COUNT_GRAPH_DATA, GET_QUIZ_COUNT, GET_REQUEST_COUNT, SUBMIT } from './constants';
import { makeSelectBody } from './selectors';

function* getArticles() {
  try {
    const articles = yield call(fetchArticles);
    const posts = articles.posts.reduce((acc, curr) => {
      // Limit to 200 characters and remove last word.
      const content = dropRight(take(removeMd(curr.markdown), 250).join('').split(' ')).join(' ');

      acc.push({
        title: curr.title,
        link: curr.slug,
        content: `${content} [...]`,
      });

      return acc;
    }, []);

    yield put(getArticlesSucceeded(posts));
  } catch(err) {
    // Silent
  }
}

function* getUserCount() {
  try {
    const userCount = yield call(request, strapi.backendURL + '/users-permissions/users/count', { method: 'GET' });

    yield put(getUserCountSucceeded(userCount));
  } catch(err) {
    // Silent
  }
}

function* getUserCountGraphData() {
  try {
    const userCountGraphData = yield call(request, strapi.backendURL + '/users-permissions/users/getweeklyusercountofmonth', { method: 'GET' });
    yield put(getUserCountGraphDataSucceeded(userCountGraphData));
  } catch(err) {
    // Silent
  }
}

function* getTotalQuizzes() {
  try {
    const quizCount = yield call(request, strapi.backendURL + '/quizzes/count', { method: 'GET' });

    yield put(getQuizCountSucceeded(quizCount));
  } catch(err) {
    // Silent
  }
}

function* getQuizCountGraphData() {
  try {
    const quizCountGraphData = yield call(request, strapi.backendURL + '/mobile/quizzesdata', { method: 'GET' });
    yield put(getQuizCountGraphDataSucceeded(quizCountGraphData));
  } catch(err) {
    // Silent
  }
}

function* getRequestCountGraphData() {
  try {
    const requestCountGraphData = yield call(request, strapi.backendURL + '/mobile/requestsdata', { method: 'GET' });
    yield put(getRequestCountGraphDataSucceeded(requestCountGraphData));
  } catch(err) {
    // Silent
  }
}

function* getRequestCount() {
  try {
    const requestCount = yield call(request, strapi.backendURL + '/requests/count', { method: 'GET' });

    yield put(getRequestCountSucceeded(requestCount));
  } catch(err) {
    // Silent
  }
}

function* submit() {
  try {
    const body = yield select(makeSelectBody());
    yield call(request, 'https://analytics.strapi.io/register', { method: 'POST', body });
  } catch(err) {
    // silent
  } finally {
    strapi.notification.success('HomePage.notification.newsLetter.success');
    yield put(submitSucceeded());
  }
}

function* defaultSaga() {
  yield all([
    fork(takeLatest, SUBMIT, submit),
    fork(takeLatest, GET_ARTICLES, getArticles),
    fork(takeLatest, GET_USER_COUNT, getUserCount),
    fork(takeLatest, GET_USER_COUNT_GRAPH_DATA, getUserCountGraphData),
    fork(takeLatest, GET_QUIZ_COUNT_GRAPH_DATA, getQuizCountGraphData),
    fork(takeLatest, GET_REQUEST_COUNT_GRAPH_DATA, getRequestCountGraphData),
    fork(takeLatest, GET_QUIZ_COUNT, getTotalQuizzes),
    fork(takeLatest, GET_REQUEST_COUNT, getRequestCount),
  ]);
}


function fetchArticles() {
  return fetch('https://blog.strapi.io/ghost/api/v0.1/posts/?client_id=ghost-frontend&client_secret=1f260788b4ec&limit=2', {})
    .then(resp => {
      return resp.json ? resp.json() : resp;
    });
}
export default defaultSaga;
