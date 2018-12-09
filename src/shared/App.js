import React, { Component } from 'react'
import routes from './routes';
import {observer} from 'mobx-react';
import { Route, Link, Redirect, Switch, withRouter } from 'react-router-dom'
import Navbar from './Navbar';
import NoMatch from './NoMatch';
import Loader from './components/Loader/Loader.js';
import Page from './components/Page/Page.js';
import ErrorPage from './components/ErrorPage/ErrorPage.js';
import preferencesStore from './stores/UserPreferencesStore.js';
import languages from './dataSource/languages.json';
import products from './dataSource/products.json';
import pages from './dataSource/pages.json';
import partners from './dataSource/partners.json';
import Intercom from 'react-intercom';

class App extends Component {

  componentWillMount(){
    require('./App.css');
    require('./rightLeftAnimation.css');
    require('./shortRightLeftAnimation.css');
    require('./topBottomAnimation.css');
    require('./fadeAnimation.css');
  }

  checkParamsExistance(link){
    let params = link.split('/');
    params = params.filter(param=>param!=='');
    let orderedParams = [];
      params.map(param=>{
        this.possibilitiesArray().map(possibility=>{
          possibility.arr.map(arrItem=>{
            arrItem.slot===param || (arrItem.country_code && arrItem.country_code.toLowerCase()===param)?
            orderedParams.push({
              param: param,
              order: possibility.order,
              type: possibility.type,
            })
            :
            null
          })
        })
      })

      let allParamsCalssified=false;
      params.length===orderedParams.length?allParamsCalssified=true:allParamsCalssified=false;

      this.possibilitiesArray().map(possibility=>{
        possibility.defaultValue && !orderedParams.filter(orderedParam=>orderedParam.type===possibility.type)[0]?
        orderedParams.push({param: possibility.defaultValue, order: possibility.order, type: possibility.type , defaultValue: true})
        :
        null;
      });

      orderedParams.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0));

      let redirectLink = '';
      orderedParams.map(orderedParam=>{redirectLink=redirectLink+'/'+orderedParam.param});

      if(allParamsCalssified && redirectLink!==link){
        return {
          result: 'redirect',
          redirectLink: redirectLink
        }
      }
      else {
        return {
          result: 'notFound'
        }
      }
  }

  possibilitiesArray(){
    let arr =
    [
      {
        arr: preferencesStore.availableCountries,
        order: 1,
        type: 'country',
        defaultValue: preferencesStore.country_code
      },
      {
        arr: languages,
        order: 2,
        type: 'language',
        defaultValue: preferencesStore.language
      },
      {
        arr: pages,
        order: 3,
        type: 'page'
      },
      {
        arr: products,
        order: 4,
        type: 'product'
      },
      {
        arr: partners,
        order: 5,
        type: 'partner'
      },
      {
        arr: [
          {
            "page":"activate",
            "slot":"activate"
          },
          {
            "page":"plans",
            "slot":"plans"
          }
        ],
        order: 6,
        type: "subpage"
      },
    ];
    return arr;
  }

  render() {
    // console.log('at app.js '+preferencesStore.language);
    // console.log('preferencesStore.language===ar'+preferencesStore.language==='ar');
    // console.log('preferencesStore.language==ar'+preferencesStore.language=='ar');
    // const kkk =preferencesStore.language==='ar'?'rtl':'ltr';

    return (
      <div className='App' dir={preferencesStore.language==='ar'?'rtl':'ltr'}>
      <Intercom appID="raqrpxm0" user={preferencesStore.intercomUser}/>
      {preferencesStore.getCurrentCountryLoading || preferencesStore.getAvailableCountriesLoading ?
        <Loader/>
        :
        <Switch>
          {routes.map(({ path, exact, compProps, hideFooter, component: Component, ...rest }) => (
            <Route key={path} path={path} exact={exact} render={(props) => (
              <Page {...props} {...rest} {...compProps} preferencesStore={preferencesStore}>
                <Component {...props} {...rest} {...compProps} preferencesStore={preferencesStore}/>
              </Page>
            )} />
          ))}
          <Route render={(props) =>
            <React.Fragment>
            {this.checkParamsExistance(props.location.pathname).result==='redirect'?
            <Redirect to={this.checkParamsExistance(props.location.pathname).redirectLink}/>
            :
            <React.Fragment>
            {console.log(this.props)}
            <ErrorPage {...props} preferencesStore={preferencesStore} error={'notfound'}/>
            </React.Fragment>

            }
            </React.Fragment>

          }/>
        </Switch>
      }
      </div>
    )
  }
}

export default withRouter(observer(App))
