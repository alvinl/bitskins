
'use strict';

/**
 * Dependencies
 */

const TOTP    = require('onceler').TOTP,
      qs      = require('querystring'),
      request = require('request');

module.exports = class BitSkins {

  /**
   * Creates a new BitSkins instance
   *
   * @param  {String}  apiKey BitSkins API key
   * @param  {String}  secret 2FA secret key
   * @return {BitSkins}
   */
  constructor(apiKey, secret) {

    this.secret = secret;
    this.apiKey = apiKey;
    this.totp = new TOTP(secret);
    this._req = request.defaults({

      json:    true,
      timeout: 30000,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36' }

    });

  }

  /**
   * Create an API request to BitSkins
   *
   * @param  {String}  method API method
   * @return {Promise}
   */
  _call(method, options) {

    return new Promise((resolve, reject) => {

      /**
       * API endpoint to call
       * @type {String}
       */
      const apiEndpoint = `https://bitskins.com/api/v1/${method}/?api_key=${this.apiKey}&code=${this.totp.now()}%qs`
                          .replace('%qs', options ? `&${qs.stringify(options)}` : '');

      this._req(apiEndpoint, (err, resp, body) => {

        if (err)
          return reject(err);

        else if (body.data && body.data.error_message)
          return reject(new Error(body.data.error_message));

        else if (resp.statusCode !== 200)
          return reject(new Error(`Invalid status code: ${resp.statusCode}`));

        return resolve(body);

      });

    });

  }

  /**
   * Returns the users account balance
   * - https://bitskins.com/api#get_account_balance
   *
   * @return {Promise}
   */
  getAccountBalance() {

    return this._call('get_account_balance');

  }

  /**
   * Returns the entire price database used by Bitskins
   * - https://bitskins.com/api#get_all_item_prices
   *
   * @return {Promise}
   */
  getAllItemPrices() {

    return this._call('get_all_item_prices');

  }

  /**
   * Returns basic pricing data for up to 250 `market_hash_name`'s that are currently on sale.
   * - https://bitskins.com/api#get_price_data_for_items_on_sale
   *
   * @param  {Object} options Call options
   * @return {Promise}
   */
  getMarketData(options) {

    if (options && Array.isArray(options.names))
      options.names = options.names.join(',');

    return this._call('get_price_data_for_items_on_sale', options);

  }

  /**
   * Returns your account's available inventory on Steam, Bitskins and pending withdrawals.
   * - https://bitskins.com/api#get_my_inventory
   *
   * @param  {Object} options Call options
   * @return {Promise}
   */
  getAccountInventory(options) {

    return this._call('get_my_inventory', options);

  }

  /**
   * Returns your inventory currently on sale.
   * - https://bitskins.com/api#get_inventory_on_sale
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  getInventoryOnSale(options) {

    return this._call('get_inventory_on_sale', options);

  }

  /**
   * Returns a paginated list of items that need their prices reset.
   * - https://bitskins.com/api#get_reset_price_items
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  getResetPriceItems(options) {

    return this._call('get_reset_price_items', options);

  }

  /**
   * Returns historical events that caused changes in your balance
   * - https://bitskins.com/api#get_money_events
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  getMoneyEvents(options) {

    return this._call('get_money_events', options);

  }

  /**
   * Allows you to request withdrawal of available balance on your BitSkins account.
   * - https://bitskins.com/api#request_withdrawal
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  requestWithdrawal(options) {

    return this._call('request_withdrawal', options);

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

    return this._call('buy_item', options);

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

    return this._call('list_item_for_sale', options);

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

    return this._call('modify_sale_item', options);

  }

  /**
   * Lets you delist an active sale item and/or re-attempt an item pending withdrawal
   * - https://bitskins.com/api#withdraw_item
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  withdrawItem(options) {

    if (options && Array.isArray(options.item_ids))
      options.item_ids = options.item_ids.join(',');

    return this._call('modify_sale_item', options);

  }

  /**
   * Lets you bump items currently listed for $0.3
   * - https://bitskins.com/api#bump_item
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  bumpItem(options) {

    if (options && Array.isArray(options.item_ids))
      options.item_ids = options.item_ids.join(',');

    return this._call('bump_item', options);

  }

  /**
   * Returns your purchase history
   * - https://bitskins.com/api#get_buy_history
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  getBuyHistory(options) {

    return this._call('get_buy_history', options);

  }

  /**
   * Returns your sell history
   * - https://bitskins.com/api#get_sell_history
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  getSellHistory(options) {

    return this._call('get_sell_history', options);

  }

  /**
   * Returns bought / sold / listed item history
   * - https://bitskins.com/api#get_sell_history
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  getItemHistory(options) {

    return this._call('get_item_history', options);

  }

  /**
   * Returns info about items trades sent to / from BitSkins
   * - https://bitskins.com/api#get_trade_details
   *
   * @param  {Object}  options Call options
   * @return {Promise}
   */
  getTradeDetails(options) {

    return this._call('get_trade_details', options);

  }

};
