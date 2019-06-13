/*
 *
 * HomePage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {bindActionCreators, compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import PropTypes from 'prop-types';
import {get, isEmpty, upperFirst} from 'lodash';
import cn from 'classnames';
import Button from 'components/Button';

import {selectPlugins} from 'containers/App/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import validateInput from 'utils/inputsValidations';

import {
  getArticles,
  getQuizCount,
  getQuizCountGraphData,
  getRequestCount,
  getRequestCountGraphData,
  getUserCount,
  getUserCountGraphData,
  onChange,
  submit,
} from './actions';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import {Line} from 'react-chartjs-2';
import {Card, CardBody, CardTitle, Col, Row} from 'reactstrap';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities';
import saga from './saga';
import styles from './styles.scss';

const brandInfo = getStyle('--info');

export class HomePage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  state = { errors: [] };

  async componentDidMount() {
    this.props.getArticles();
    await this.props.getUserCount();
    await this.props.getUserCountGraphData();
    await this.props.getQuizCountGraphData();
    await this.props.getRequestCountGraphData();
    await this.props.getQuizCount();
    await this.props.getRequestCount();
  }

  handleSubmit = e => {
    e.preventDefault();
    const errors = validateInput(this.props.homePage.body.email, { required: true }, 'email');
    this.setState({ errors });

    if (isEmpty(errors)) {
      return this.props.submit();
    }
  };

  showFirstBlock = () =>
    get(this.props.plugins.toJS(), 'content-manager.leftMenuSections.0.links', []).length === 0;

  renderButton = () => {
    const data = this.showFirstBlock()
      ? {
        className: styles.homePageTutorialButton,
        href: 'https://strapi.io/documentation/3.x.x/getting-started/quick-start.html#_3-create-a-content-type',
        id: 'app.components.HomePage.button.quickStart',
        primary: true,
      }
      : {
        className: styles.homePageBlogButton,
        id: 'app.components.HomePage.button.blog',
        href: 'https://blog.strapi.io/',
        primary: false,
      };

    return (
      <a href={data.href} target="_blank">
        <Button className={data.className} primary={data.primary}>
          <FormattedMessage id={data.id} />
        </Button>
      </a>
    );
  };

  render() {
    const { homePage: { userCount, userCountGraphData, quizCountGraphData, requestCountGraphData, quizCount, requestCount } } = this.props;

    const userCountGraphDataChart = {
      labels: ['1', '2', '3', '4'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: brandInfo,
          borderColor: 'rgba(255,255,255,.55)',
          data: userCountGraphData,
        },
      ],
    };
    const quizCountGraphDataChart = {
      labels: ['1', '2', '3', '4'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: brandInfo,
          borderColor: 'rgba(255,255,255,.55)',
          data: quizCountGraphData,
        },
      ],
    };
    const requestCountGraphDataChart = {
      labels: ['1', '2', '3', '4'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: brandInfo,
          borderColor: 'rgba(255,255,255,.55)',
          data: requestCountGraphData,
        },
      ],
    };

    const userCountGraphDataChartOpts = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips
      },
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              color: 'transparent',
              zeroLineColor: 'transparent',
            },
            ticks: {
              fontSize: 2,
              fontColor: 'transparent',
            },

          }],
        yAxes: [
          {
            display: false,
            ticks: {
              display: false,
              min: Math.min.apply(Math, userCountGraphDataChart.datasets[0].data) - 5,
              max: Math.max.apply(Math, userCountGraphDataChart.datasets[0].data) + 5,
            },
          }],
      },
      elements: {
        line: {
          tension: 0.00001,
          borderWidth: 1,
        },
        point: {
          radius: 4,
          hitRadius: 10,
          hoverRadius: 4,
        },
      },
    };
    const quizCountGraphDataChartOpts = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips
      },
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              color: 'transparent',
              zeroLineColor: 'transparent',
            },
            ticks: {
              fontSize: 2,
              fontColor: 'transparent',
            },

          }],
        yAxes: [
          {
            display: false,
            ticks: {
              display: false,
              min: Math.min.apply(Math, quizCountGraphDataChart.datasets[0].data) - 5,
              max: Math.max.apply(Math, quizCountGraphDataChart.datasets[0].data) + 5,
            },
          }],
      },
      elements: {
        line: {
          tension: 0.00001,
          borderWidth: 1,
        },
        point: {
          radius: 4,
          hitRadius: 10,
          hoverRadius: 4,
        },
      },
    };
    const requestCountGraphDataChartOpts = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips
      },
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              color: 'transparent',
              zeroLineColor: 'transparent',
            },
            ticks: {
              fontSize: 2,
              fontColor: 'transparent',
            },

          }],
        yAxes: [
          {
            display: false,
            ticks: {
              display: false,
              min: Math.min.apply(Math, requestCountGraphDataChart.datasets[0].data) - 5,
              max: Math.max.apply(Math, requestCountGraphDataChart.datasets[0].data) + 5,
            },
          }],
      },
      elements: {
        line: {
          tension: 0.00001,
          borderWidth: 1,
        },
        point: {
          radius: 4,
          hitRadius: 10,
          hoverRadius: 4,
        },
      },
    };

    const mainChart = {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Weekly Completes: ',
          backgroundColor: hexToRgba('#63c2de', 10),
          borderColor: brandInfo,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: requestCountGraphData,
        }
      ],
    };

    const mainChartOpts = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips,
        intersect: true,
        mode: 'index',
        position: 'nearest',
        callbacks: {
          labelColor: function(tooltipItem, chart) {
            return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
          }
        }
      },
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
          }],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(1000 / 5),
              max: 1000,
            },
          }],
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    };

    return (
      <div className={cn('container-fluid', styles.containerFluid)}>
        <Helmet title="Home Page" />
        <Row>
          <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <div className="text-value">{userCount}</div>
                <div>Registered Users</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <Line data={userCountGraphDataChart} options={userCountGraphDataChartOpts} height={70} />
              </div>
            </Card>
          </Col>
          <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div className="text-value">{quizCount}</div>
                <div>Active Quizzes</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <Line data={quizCountGraphDataChart} options={quizCountGraphDataChartOpts} height={70} />
              </div>
            </Card>
          </Col>
          <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <div className="text-value">{requestCount}</div>
                <div>Total Requests</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <Line data={requestCountGraphDataChart} options={requestCountGraphDataChartOpts} height={70} />
              </div>
            </Card>
          </Col>
        </Row>
        <Row  style={{ marginTop: 40 + 'px' }}>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col>
                    <Col sm="5">
                      <CardTitle className="mb-0">Reward Request Traffic</CardTitle>
                    </Col>
                  </Col>
                </Row>
                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                  <Line data={mainChart} options={mainChartOpts} height={300} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
    );
  }
}

HomePage.propTypes = {
  getArticles: PropTypes.func.isRequired,
  homePage: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  plugins: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  getUserCount: PropTypes.func.isRequired,
  getQuizCount: PropTypes.func.isRequired,
  getRequestCount: PropTypes.func.isRequired,
  getUserCountGraphData: PropTypes.func.isRequired,
  getQuizCountGraphData: PropTypes.func.isRequired,
  getRequestCountGraphData: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
  plugins: selectPlugins(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getArticles,
      onChange,
      submit,
      getUserCount,
      getUserCountGraphData,
      getQuizCount,
      getQuizCountGraphData,
      getRequestCount,
      getRequestCountGraphData,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

// export default connect(mapDispatchToProps)(HomePage);
export default compose(withReducer, withSaga, withConnect)(HomePage);
