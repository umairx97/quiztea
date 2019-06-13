import {
  GET_ARTICLES,
  GET_USER_COUNT,
  GET_USER_COUNT_GRAPH_DATA,
  GET_QUIZ_COUNT,
  GET_QUIZ_COUNT_GRAPH_DATA,
  GET_COMPLETE_COUNT,
  GET_COMPLETE_COUNT_GRAPH_DATA,
  GET_REQUEST_COUNT,
  GET_REQUEST_COUNT_GRAPH_DATA,
  GET_ARTICLES_SUCCEEDED,
  GET_USER_COUNT_SUCCEEDED,
  GET_USER_COUNT_GRAPH_DATA_SUCCEEDED,
  GET_QUIZ_COUNT_GRAPH_DATA_SUCCEEDED,
  GET_REQUEST_COUNT_GRAPH_DATA_SUCCEEDED,
  GET_QUIZ_COUNT_SUCCEEDED,
  GET_REQUEST_COUNT_SUCCEEDED,
  ON_CHANGE,
  SUBMIT,
  SUBMIT_SUCCEEDED,
} from './constants';

export function getArticles() {
  return {
    type: GET_ARTICLES,
  };
}

export function getUserCount() {
  return{
    type: GET_USER_COUNT,
  };
}

export function getUserCountGraphData() {
  return{
    type: GET_USER_COUNT_GRAPH_DATA,
  };
}

export function getQuizCount() {
  return{
    type: GET_QUIZ_COUNT,
  };
}

export function getQuizCountGraphData() {
  return{
    type: GET_QUIZ_COUNT_GRAPH_DATA,
  };
}

export function getCompleteCount() {
  return{
    type: GET_COMPLETE_COUNT,
  };
}

export function getCompleteCountGraphData() {
  return{
    type: GET_COMPLETE_COUNT_GRAPH_DATA,
  };
}

export function getRequestCount() {
  return{
    type: GET_REQUEST_COUNT,
  };
}

export function getRequestCountGraphData() {
  return{
    type: GET_REQUEST_COUNT_GRAPH_DATA,
  };
}

export function getArticlesSucceeded(articles) {
  return {
    type: GET_ARTICLES_SUCCEEDED,
    articles,
  };
}

export function getUserCountSucceeded(userCount) {
  return {
    type: GET_USER_COUNT_SUCCEEDED,
    userCount,
  };
}

export function getUserCountGraphDataSucceeded(userCountGraphData) {
  return {
    type: GET_USER_COUNT_GRAPH_DATA_SUCCEEDED,
    userCountGraphData,
  };
}

export function getQuizCountSucceeded(quizCount) {
  return {
    type: GET_QUIZ_COUNT_SUCCEEDED,
    quizCount,
  };
}

export function getQuizCountGraphDataSucceeded(quizCountGraphData) {
  return {
    type: GET_QUIZ_COUNT_GRAPH_DATA_SUCCEEDED,
    quizCountGraphData,
  };
}

export function getRequestCountSucceeded(requestCount) {
  return {
    type: GET_REQUEST_COUNT_SUCCEEDED,
    requestCount,
  };
}

export function getRequestCountGraphDataSucceeded(requestCountGraphData) {
  return {
    type: GET_REQUEST_COUNT_GRAPH_DATA_SUCCEEDED,
    requestCountGraphData,
  };
}

export function onChange({ target }) {
  return {
    type: ON_CHANGE,
    value: target.value,
  };
}

export function submit() {
  return {
    type: SUBMIT,
  };
}

export function submitSucceeded() {
  return {
    type: SUBMIT_SUCCEEDED,
  };
}
