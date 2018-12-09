// import React, { Component } from 'react';
// import {observer} from 'mobx-react';
//
// class FeaturesTitles extends Component {
//
//   componentWillMount(){
//
//   }
//
//   render() {
//     return (
//       <div className="FeaturesTitles" style={{width:this.props.width,marginTop:this.props.marginTop}}>
//           {this.props.planFeatures.map((planFeature, key)=>{
//             return(
//               <React.Fragment>
//                 {key===0?null:<hr className="planFeatureSeperator"/>}
//                 <p className="featureName">{planFeature.featureName}</p>
//                 {planFeature.subFeatures?
//                   <React.Fragment>
//                     {planFeature.subFeatures.map((subFeature,key)=>{
//                       return(
//                         <React.Fragment>
//                         <div style={{height:'10px'}}></div>
//                         <p className="featureName subFeature">{subFeature.featureName}</p>
//                         </React.Fragment>
//                       )
//                     })}
//                   </React.Fragment>
//                   :null
//                 }
//               </React.Fragment>
//             )
//           })}
//       </div>
//     );
//   }
// }
//
// export default observer(FeaturesTitles);
