// import Page from './components/Page/Page.js';
import MainPage from './components/MainPage/MainPage.js';
import ProductPage from './components/ProductPage/ProductPage.js';
import Plans from './components/Plans/Plans.js';
import APIPage from './components/APIPage/APIPage.js';
import SupportPage from './components/SupportPage/SupportPage.js';
import AboutPage from './components/AboutPage/AboutPage.js';
import JobsPage from './components/JobsPage/JobsPage.js';
import ActivatePage from './components/ActivatePage/ActivatePage.js';
import IframePage from './components/IframePage/IframePage.js';
import ErrorPage from './components/ErrorPage/ErrorPage.js';
import ActivatePayment from './components/ActivatePaymentPage/ActivatePaymentPage.js';
import languages from './dataSource/languages.json';
import products from './dataSource/products.json';
import pages from './dataSource/pages.json';
import partners from './dataSource/partners.json';
import plans from './dataSource/plans.json';
import metaTags from './dataSource/metaTags.json';

import { fetchPopularRepos } from './api'

let countries = [{"ID":"132","country_code":"KW","country_name_english":"Kuwait","country_name_arabic":"الكويت","country_flag_url":"http://img.gotapnow.com/web/countryflag/Kuwait.png","international_code":"965","businessTypeAllowed":"all"},{"ID":"17","country_code":"BH","country_name_english":"Bahrain","country_name_arabic":"البحرين","country_flag_url":"http://img.gotapnow.com/web/countryflag/Bahrain.png","international_code":"973","businessTypeAllowed":"all"},{"ID":"70","country_code":"EG","country_name_english":"Egypt","country_name_arabic":"مصر","country_flag_url":"http://img.gotapnow.com/web/countryflag/Egypt.png","international_code":"20","businessTypeAllowed":"all"},{"ID":"124","country_code":"JO","country_name_english":"Jordan","country_name_arabic":"الأردن","country_flag_url":"http://img.gotapnow.com/web/countryflag/Jordan.png","international_code":"962","businessTypeAllowed":"all"},{"ID":"136","country_code":"LB","country_name_english":"Lebanon","country_name_arabic":"لبنان","country_flag_url":"http://img.gotapnow.com/web/countryflag/Lebanon.png","international_code":"961","businessTypeAllowed":"all"},{"ID":"184","country_code":"OM","country_name_english":"Oman","country_name_arabic":"عمان","country_flag_url":"http://img.gotapnow.com/web/countryflag/Oman.png","international_code":"968","businessTypeAllowed":"all"},{"ID":"199","country_code":"QA","country_name_english":"Qatar","country_name_arabic":"قطر","country_flag_url":"http://img.gotapnow.com/web/countryflag/Qatar.png","international_code":"974","businessTypeAllowed":"all"},{"ID":"212","country_code":"SA","country_name_english":"Saudi Arabia","country_name_arabic":"المملكة العربية السعودية","country_flag_url":"http://img.gotapnow.com/web/countryflag/Saudi Arabia.png","international_code":"966","businessTypeAllowed":"all"},{"ID":"253","country_code":"AE","country_name_english":"United Arab Emirates","country_name_arabic":"الإمارات","country_flag_url":"http://img.gotapnow.com/web/countryflag/United Arab Emirates.png","international_code":"971","businessTypeAllowed":"all"}];

function getMetaTag(pageName,windowLocationHref){
  let result = metaTags.filter(item=>item.pageTemplate.toLowerCase()===pageName.toLowerCase() && windowLocationHref.indexOf(item.link)>-1);
  return result[0];
}

let routes = [];

countries.map(country=>{
  languages.map(language=>{
    routes.push(
        {
          path: '/'+country.country_code.toLowerCase()+'/'+language.slot,
          exact: true,
          component: MainPage,
          metaTag: getMetaTag('mainPage', '/'+country.country_code.toLowerCase()+'/'+language.slot),
          compProps: {
            country: country.country_code.toLowerCase(),
            language: language.slot
          }
        }
      )
    pages.map(page=>{
      routes.push(
          {
            path: '/'+country.country_code.toLowerCase()+'/'+language.slot+'/'+page.slot,
            exact: true,
            component: page.slot==='support'?SupportPage:page.slot==='api'?APIPage:page.slot==='about'?AboutPage:page.slot==='jobs'?JobsPage:page.slot==='developers'?IframePage:page.slot==='activate-payment'?ActivatePayment:null,
            metaTag: getMetaTag(page.slot, '/'+country.country_code.toLowerCase()+'/'+language.slot+'/'+page.slot),
            compProps: {
              country: country.country_code.toLowerCase(),
              language: language.slot,
              page: page.slot
            },
            hideFooter: page.slot==='developers'?true:false,
            noItemsHeader: page.slot==='activate-payment'?true:false,
            noItemsFooter: page.slot==='activate-payment'?true:false
          }
        )
    })
  })
})

languages.map(language=>{
  products.map(product=>{
    product.countries.map(country=>{
      routes.push(
          {
            path: '/'+country.toLowerCase()+'/'+language.slot+'/'+product.slot,
            exact: true,
            component: ProductPage,
            metaTag: getMetaTag('productPage', '/'+country.toLowerCase()+'/'+language.slot+'/'+product.slot),
            compProps: {
              country: country.toLowerCase(),
              language: language.slot,
              product: product.slot
            }
          }
        )
        product.subPages.map(subPage=>{
          routes.push(
              {
                path: '/'+country.toLowerCase()+'/'+language.slot+'/'+product.slot+'/'+subPage.slot,
                exact: true,
                component: subPage.slot==='activate'?ActivatePage:subPage.slot==='plans'?Plans:null,
                compProps: {
                  country: country.toLowerCase(),
                  language: language.slot,
                  product: product.slot,
                  plans: plans
                },
                headerSpacePC: subPage.slot==='plans'?true:false,
                noItemsHeader: subPage.slot==='activate'?true:false,
                noItemsFooter: subPage.slot==='activate'?true:false
              }
            )
        })
    })
  })
})

languages.map(language=>{
  partners.map(partner=>{
    partner.countries.map(country=>{
      routes.push(
        {
          path: '/'+country.toLowerCase()+'/'+language.slot+'/'+partner.slot,
          exact: true,
          component: MainPage,
          metaTag: getMetaTag('mainPageWithPartner', '/'+country.toLowerCase()+'/'+language.slot+'/'+partner.slot),
          compProps: {
            country: country.toLowerCase(),
            language: language.slot,
            partner: partner.slot
          }
        }
      )
      partner.products.map(product=>{
          routes.push(
            {
              path: '/'+country.toLowerCase()+'/'+language.slot+'/'+product.slot+'/'+partner.slot,
              exact: true,
              component: ProductPage,
              metaTag: getMetaTag('productPageWithPartner', '/'+country.toLowerCase()+'/'+language.slot+'/'+product.slot+'/'+partner.slot),
              compProps: {
                country: country.toLowerCase(),
                language: language.slot,
                product: product.slot,
                partner: partner.slot
              }
            }
          )
        })
    })
  })
})


export default routes
