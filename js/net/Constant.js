const isOnline = false;
const baseUrl = isOnline ? 'http://platform.smm.cn' : 'http://testplatform.smm.cn';
getToken = () => {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZWxscGhvbmUiOiIxMzE2Mjk3OTM1OCIsImNvbXBhbnlfaWQiOjAsImNvbXBhbnlfc3RhdHVzIjowLCJjcmVhdGVfYXQiOjE1MDE2NDE3OTUsImVtYWlsIjoiIiwiZW5fZW5kX3RpbWUiOjAsImVuX3JlZ2lzdGVyX3N0ZXAiOjEsImVuX3JlZ2lzdGVyX3RpbWUiOjAsImVuX3N0YXJ0X3RpbWUiOjAsImVuX3VzZXJfdHlwZSI6MCwiZW5kX3RpbWUiOjE1MDk3MDI5NDUsImlzX21haWwiOjAsImlzX3Bob25lIjoxLCJsYW5ndWFnZSI6ImFuZHJvaWQiLCJseV9lbmRfdGltZSI6MCwibHlfc3RhcnRfdGltZSI6MCwibHlfdXNlcl90eXBlIjowLCJyZWdpc3Rlcl90aW1lIjoxNDc4MTY0NTc4LCJzIjo2LCJzdGFydF90aW1lIjoxNDc4MTY2OTQ1LCJ1c2VyX2lkIjo3MjAzMTAsInVzZXJfbmFtZSI6IlNNTTE0NzgxNjQ1NzljZCIsInVzZXJfdHlwZSI6MiwienhfZW5kX3RpbWUiOjE1MDI5ODU1OTksInp4X3N0YXJ0X3RpbWUiOjE0OTg4Mzg0MDAsInp4X3VzZXJfdHlwZSI6MX0._SKSpkOye4fYAoxg5uAkQobLdjy3vbIG8kc31nQuNZw';
}
isLogin = () => {
    const token = this.getToken();
    return token && token.length > 0;
}

export {
    isOnline,
    baseUrl,
    getToken,
    isLogin
};