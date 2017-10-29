
'use strict';

/**
 * Dependencies
 */

const request = require('request-promise'),
      base32  = require('thirty-two'),
      totp    = require('notp').totp;

module.exports = class BitSkins {

  /**
   * Creates a new BitSkins instance
   *
   * @param  {String}   apiKey  API key
   * @param  {String}   totpKey TOTP key
   * @param  {String=}   appId  App ID (defaults to CS:GO if not specified)
   * @return {BitSkins}         BitSkins instance
   */
  constructor(apiKey, totpKey, appId) {

    this.totpKey = totpKey;
    this.apiKey = apiKey;
    this.appId = appId;

    this._req = request.defaults({

      baseUrl: 'https://bitskins.com/api/v1/',
      method:  'POST',
      json:    true

    });

  }

  /**
   * Sends request to API
   *
   * @param  {String}  method  API method
   * @param  {Object}  options Optional API paramters
   * @return {Promise}
   */
  _callAPI(method, options) {

    /**
     * POST payload
     * @type {Object}
     */
    var body = Object.assign({ code:    totp.gen(base32.decode(this.totpKey)),
                                 api_key: this.apiKey },
                               options);

    if (typeof this.appId !== 'undefined')
    {
        body.app_id = this.appId;
    }

    return this._req(method, { body: body });

  }

  /**
   * Returns the users account balance
   * - https://bitskins.com/api#get_account_balance
   *
   * @return {Promise}
   */
  getAccountBalance() {

    return this._callAPI('get_account_balance');

  }

  /**
   * Returns the entire price database used by Bitskins
   * - https://bitskins.com/api#get_all_item_prices
   *
   * @return {Promise}
   */
  getAllItemPrices() {

    return this._callAPI('get_all_item_prices');

  }

  /**
   * Returns basic pricing data for up to 250 `market_hash_name`'s that are
   * currently on sale.
   * - https://bitskins.com/api#get_price_data_for_items_on_sale
   *
   * @param  {Object} options Call options
   * @return {Promise}
   */
  getMarketData(options) {

    if (options && Array.isArray(options.names))
      options.names = options.names.join(',');

    return this._callAPI('get_price_data_for_items_on_sale', options);

  }

  /**
   * Returns your account's available inventory on Steam, Bitskins and
   * pending withdrawals.
   * - https://bitskins.com/api#get_my_inventory
   *
   * @param  {Object} options Call options
   * @return {Promise}
   */
  getAccountInventory(options) {

    return this._callAPI('get_my_inventory', options);

  }

  /**
   * Returns your inventory currently on sale.
   * - https://bitskins.com/api#get_inventory_on_sale
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  getInventoryOnSale(options) {

    return this._callAPI('get_inventory_on_sale', options);

  }

  /**
   * Returns a paginated list of items that need their prices reset.
   * - https://bitskins.com/api#get_reset_price_items
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  getResetPriceItems(options) {

    return this._callAPI('get_reset_price_items', options);

  }

  /**
   * Returns historical events that caused changes in your balance
   * - https://bitskins.com/api#get_money_events
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  getMoneyEvents(options) {

    return this._callAPI('get_money_events', options);

  }

  /**
   * Allows you to request withdrawal of available balance on your BitSkins
   * account.
   * - https://bitskins.com/api#request_withdrawal
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  requestWithdrawal(options) {

    return this._callAPI('request_withdrawal', options);

  }

  /**
   * Allows you to buy the item currently on sale
   * - https://bitskins.com/api#buy_item
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  buyItem(options) {

    if (options && Array.isArray(options.item_ids))
      options.item_ids = options.item_ids.join(',');

    if (options && Array.isArray(options.prices))
      options.prices = options.prices.join(',');

    return this._callAPI('buy_item', options);

  }

  /**
   * Allows you to list an item for sale
   * - https://bitskins.com/api#list_item_for_sale
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  sellItem(options) {

    if (options && Array.isArray(options.item_ids))
      options.item_ids = options.item_ids.join(',');

    if (options && Array.isArray(options.prices))
      options.prices = options.prices.join(',');

    return this._callAPI('list_item_for_sale', options);

  }

  /**
   * Allows you to change the price(s) of item(s) currently on sale
   * - https://bitskins.com/api#modify_sale_item
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  modifySale(options) {

    if (options && Array.isArray(options.item_ids))
      options.item_ids = options.item_ids.join(',');

    if (options && Array.isArray(options.prices))
      options.prices = options.prices.join(',');

    return this._callAPI('modify_sale_item', options);

  }

  /**
   * Lets you delist an active sale item and/or re-attempt an item pending
   * withdrawal
   * - https://bitskins.com/api#withdraw_item
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  withdrawItem(options) {

    if (options && Array.isArray(options.item_ids))
      options.item_ids = options.item_ids.join(',');

    return this._callAPI('withdraw_item', options);

  }

  /**
   * Lets you bump items currently listed for a fee
   * - https://bitskins.com/api#bump_item
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  bumpItem(options) {

    if (options && Array.isArray(options.item_ids))
      options.item_ids = options.item_ids.join(',');

    return this._callAPI('bump_item', options);

  }

  /**
   * Returns your purchase history
   * - https://bitskins.com/api#get_buy_history
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  getBuyHistory(options) {

    return this._callAPI('get_buy_history', options);

  }

  /**
   * Returns your sell history
   * - https://bitskins.com/api#get_sell_history
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  getSellHistory(options) {

    return this._callAPI('get_sell_history', options);

  }

  /**
   * Returns bought / sold / listed item history
   * - https://bitskins.com/api#get_item_history
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  getItemHistory(options) {

    return this._callAPI('get_item_history', options);

  }

  /**
   * Returns info about items trades sent to / from BitSkins
   * - https://bitskins.com/api#get_trade_details
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  getTradeDetails(options) {

    return this._callAPI('get_trade_details', options);

  }

  /**
   * Returns recent sales for a given item name
   * - https://bitskins.com/api#get_sales_info
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  getRecentSaleInfo(options) {

    return this._callAPI('get_sales_info', options);

  }


  /**
   * Creates a buy order
   * - https://bitskins.com/api_market_buy_orders#create_buy_order
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  createBuyOrder(options) {

    return this._callAPI('create_buy_order', options);

  }

  /**
   * Returns expected place in queue for a buy order
   * - https://bitskins.com/api_market_buy_orders#get_expected_place_in_queue_for_new_buy_order
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  getExpectedPlaceInQueue(options) {

    return this._callAPI('get_expected_place_in_queue_for_new_buy_order',
                          options);

  }

  /**
   * Cancels a given buy order
   * - https://bitskins.com/api_market_buy_orders#cancel_buy_order
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  cancelBuyOrder(options) {

    return this._callAPI('cancel_buy_order', options);

  }

  /**
   * Cancels all buy orders for a given item name
   * - https://bitskins.com/api_market_buy_orders#cancel_all_buy_orders
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  cancelAllBuyOrders(options) {

    return this._callAPI('cancel_all_buy_orders', options);

  }

  /**
   * Returns all buy orders placed
   * - https://bitskins.com/api_market_buy_orders#get_buy_order_history
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  getMyBuyOrders(options) {

    return this._callAPI('get_buy_order_history', options);

  }

  /**
   * Returns all market orders on the market
   * - https://bitskins.com/api_market_buy_orders#get_market_buy_orders
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  getMarketBuyOrders(options) {

    return this._callAPI('get_market_buy_orders', options);

  }

  /**
   * Returns a summary of all market orders
   * - https://bitskins.com/api_market_buy_orders#summarize_buy_orders
   *
   * @return {Promise}
   */
  summarizeBuyOrders() {

    return this._callAPI('summarize_buy_orders');

  }

  /**
   * Returns your accounts bitcoin address
   * - https://bitskins.com/api_bitcoin#get_permanent_deposit_address
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  getBitcoinDepositAddress(options) {

    return this._callAPI('get_permanent_deposit_address', options);

  }

  /**
   * Returns the current conversion rate
   * - https://bitskins.com/api_bitcoin#get_current_deposit_conversion_rate
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  getBitcoinDepositRate(options) {

    return this._callAPI('get_current_deposit_conversion_rate', options);

  }

  /**
   * Creates a bitcoin deposit
   * - https://bitskins.com/api_bitcoin#create_bitcoin_payment
   *
   * @param  {Object}  Call options
   * @return {Promise}
   */
  createBitcoinDeposit(options) {

    return this._callAPI('create_bitcoin_payment', options);

  }

  /**
   * Returns the status of your Bitcoin deposits
   * - https://bitskins.com/api_bitcoin#get_bitcoin_payment_status
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  getBitcoinDepositStatus(options) {

    return this._callAPI('get_bitcoin_payment_status', options);

  }

  /**
   * Creates coupons
   * - https://bitskins.com/api_coupons#create_coupons
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  createCoupons(options) {

    return this._callAPI('create_coupons', options);

  }

  /**
   * Disables given coupons
   * - https://bitskins.com/api_coupons#disable_coupons
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  disableCoupons(options) {

    if (options && Array.isArray(options.coupon_codes))
      options.coupon_codes = options.coupon_codes.join(',');

    return this._callAPI('disable_coupons', options);

  }

  /**
   * Returns list of coupons created
   * - https://bitskins.com/api_coupons#get_coupons
   *
   * @return {Promise}
   */
  getCoupons() {

    return this._callAPI('get_coupons');

  }

  /**
   * Returns the status of all coupons created
   * - https://bitskins.com/api_coupons#get_coupon_status
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  getCouponStatus(options) {

    if (options && Array.isArray(options.coupon_codes))
      options.coupon_codes = options.coupon_codes.join(',');

    return this._callAPI('get_coupon_status', options);

  }

  /**
   * Redeems a given coupon
   * - https://bitskins.com/api_coupons#redeem_coupon
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  redeemCoupon(options) {

    return this._callAPI('redeem_coupon', options);

  }

};
