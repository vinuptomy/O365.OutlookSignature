function asyncGeneratorStep(e,t,r,a,n,s,o){try{var c=e[s](o),i=c.value}catch(e){return void r(e)}c.done?t(i):Promise.resolve(i).then(a,n)}function _asyncToGenerator(e){return function(){var t=this,r=arguments;return new Promise((function(a,n){var s=e.apply(t,r);function o(e){asyncGeneratorStep(s,a,n,o,c,"next",e)}function c(e){asyncGeneratorStep(s,a,n,o,c,"throw",e)}o(void 0)}))}}var documentHelper=require("./documentHelper"),fallbackAuthHelper=require("./fallbackAuthHelper"),sso=require("office-addin-sso"),retryGetAccessToken=0;export function getGraphData(){return _getGraphData.apply(this,arguments)}function _getGraphData(){return(_getGraphData=_asyncToGenerator(regeneratorRuntime.mark((function e(){var t,r,a,n,s;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,OfficeRuntime.auth.getAccessToken({allowSignInPrompt:!0});case 3:return t=e.sent,e.next=6,sso.getGraphToken(t);case 6:if(!(r=e.sent).claims){e.next=12;break}return e.next=10,OfficeRuntime.auth.getAccessToken({authChallenge:r.claims});case 10:a=e.sent,r=sso.getGraphToken(a);case 12:if(!r.error){e.next=16;break}handleAADErrors(r),e.next=26;break;case 16:return e.next=18,sso.makeGraphApiCall(r.access_token);case 18:return n=e.sent,documentHelper.writeDataToOfficeDocument(n),e.next=22,sso.makeGraphApiCallSP(r.access_token);case 22:s=e.sent,console.log(s),documentHelper.writeOfficeTimeData(s),sso.showMessage("Your data has been added to the document.");case 26:e.next=31;break;case 28:e.prev=28,e.t0=e.catch(0),e.t0.code?sso.handleClientSideErrors(e.t0)&&fallbackAuthHelper.dialogFallback():sso.showMessage("EXCEPTION: "+JSON.stringify(e.t0));case 31:case"end":return e.stop()}}),e,null,[[0,28]])})))).apply(this,arguments)}function handleAADErrors(e){-1!==e.error_description.indexOf("AADSTS500133")&&retryGetAccessToken<=0?(retryGetAccessToken++,getGraphData()):fallbackAuthHelper.dialogFallback()}