import makeRequest from '../helpers/api/makeRequest';
export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };
  getApiData = async () => {
    const shopifyDomain = window.Shopify.shop;
    const apiUrl = `${process.env.HOST}/client-api/notifications?shopifyDomain=${shopifyDomain}`;
    const {notifications, settings} = await makeRequest(apiUrl);
    return {notifications, settings};
  };
}
