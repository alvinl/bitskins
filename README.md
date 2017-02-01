
# BitSkins API client

The unofficial [BitSkins](https://bitskins.com/) API client.

## Installation

```
$ npm install bitskins-api
```

## Example
```js
const BitSkins = require('bitskins-api');
const bitskins = new BitSkins(apiKey, secret);

bitskins.getTradeDetails({ trade_token: 'd3bedb77f7430e68', trade_id: 'ddc126dc3cc4e8a2'  });
bitskins.getMarketData({ names: ['AK-47 | Redline (Field-Tested)'] });
```

## Methods

All of the following methods return a native [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Some methods allow you to pass addtional data via an object when calling the API. See the methods [API reference](https://bitskins.com/api) to see what data can be sent.

### Constructor(apiKey, secret)

- `apiKey` - Your BitSkins API key. Can be found in your [settings page](https://bitskins.com/settings)
- `secret` - Your 2FA secret. This is shown to you when enabling 2FA on your account.

Creates a new `BitSkins` instance.

#### General

| Name                         | Description                                                                               | Reference                                                         |
|------------------------------|-------------------------------------------------------------------------------------------|-------------------------------------------------------------------|
| getAccountBalance()          | Returns your account balance.                                                             | [Link](https://bitskins.com/api#get_account_balance)              |
| getAllItemPrices()           | Returns the entire price database used by Bitskins.                                       | [Link](https://bitskins.com/api#get_all_item_prices)              |
| getMarketData(options)       | Returns basic pricing data for up to 250 `market_hash_name`'s that are currently on sale. | [Link](https://bitskins.com/api#get_price_data_for_items_on_sale) |
| getAccountInventory(options) | Returns your account's available inventory on Steam, Bitskins and pending withdrawals.    | [Link](https://bitskins.com/api#get_my_inventory)                 |
| getInventoryOnSale(options)  | Returns your inventory currently on sale.                                                 | [Link](https://bitskins.com/api#get_inventory_on_sale)            |
| getResetPriceItems(options)  | Returns a paginated list of items that need their prices reset.                           | [Link](https://bitskins.com/api#get_reset_price_items)            |
| getMoneyEvents(options)      | Returns historical events that caused changes in your balance.                            | [Link](https://bitskins.com/api#get_money_events)                 |
| requestWithdrawal(options)   | Allows you to request withdrawal of available balance on your BitSkins account.           | [Link](https://bitskins.com/api#request_withdrawal)               |
| buyItem(options)             | Allows you to buy an item currently on sale.                                              | [Link](https://bitskins.com/api#buy_item)                         |
| sellItem(options)            | Allows you to list an item for sale.                                                      | [Link](https://bitskins.com/api#list_item_for_sale)               |
| modifySale(options)          | Allows you to change the price(s) of item(s) currently on sale.                           | [Link](https://bitskins.com/api#modify_sale_item)                 |
| withdrawItem(options)        | Lets you delist an active sale item and/or re-attempt an item pending withdrawal.         | [Link](https://bitskins.com/api#withdraw_item)                    |
| bumpItem(options)            | Lets you bump items currently listed for a fee.                                           | [Link](https://bitskins.com/api#bump_item)                        |
| getBuyHistory(options)       | Returns your purchase history.                                                            | [Link](https://bitskins.com/api#get_buy_history)                  |
| getSellHistory(options)      | Returns your sell history.                                                                | [Link](https://bitskins.com/api#get_sell_history)                 |
| getItemHistory(options)      | Returns bought / sold / listed item history.                                              | [Link](https://bitskins.com/api#get_item_history)                 |
| getTradeDetails(options)     | Returns info about items trades sent to / from BitSkins                                   | [Link](https://bitskins.com/api#get_trade_details)                |
| getRecentSaleInfo(options)       | Returns recent sales for a given item name.                | [Link](https://bitskins.com/api#get_sales_info)                                                  |

#### Buy orders
| Name                             | Description                                                | Reference                                                                                        |
|----------------------------------|------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| createBuyOrder(options)          | Creates a buy order.                                       | [Link](https://bitskins.com/api_market_buy_orders#create_buy_order)                              |
| getExpectedPlaceInQueue(options) | Returns expected place in queue for a buy order.           | [Link](https://bitskins.com/api_market_buy_orders#get_expected_place_in_queue_for_new_buy_order) |
| cancelBuyOrder(options)          | Cancels a given buy order.                                 | [Link](https://bitskins.com/api_market_buy_orders#cancel_buy_order)                              |
| cancelAllBuyOrders(options)      | Cancels all buy orders for a given item name.              | [Link](https://bitskins.com/api_market_buy_orders#cancel_all_buy_orders)                         |
| getMyBuyOrders(options)          | Returns all buy orders placed.                             | [Link](https://bitskins.com/api_market_buy_orders#get_buy_order_history)                         |
| getMarketBuyOrders(options)      | Returns all market orders on the market.                   | [Link](https://bitskins.com/api_market_buy_orders#get_market_buy_orders)                         |
| summarizeBuyOrders()             | Returns a summary of all market orders.                    | [Link](https://bitskins.com/api_market_buy_orders#summarize_buy_orders)                          |

#### Bitcoin deposits
| Name                              | Description                                  | Reference                                                                    |
|-----------------------------------|----------------------------------------------|------------------------------------------------------------------------------|
| getBitcoinDepositAddress(options) | Returns your accounts bitcoin address.       | [Link](https://bitskins.com/api_bitcoin#get_permanent_deposit_address)       |
| getBitcoinDepositRate(options)    | Returns the current conversion rate.         | [Link](https://bitskins.com/api_bitcoin#get_current_deposit_conversion_rate) |
| createBitcoinDeposit(options)     | Creates a bitcoin deposit.                   | [Link](https://bitskins.com/api_bitcoin#create_bitcoin_payment)              |
| getBitcoinDepositStatus(options)  | Returns the status of your Bitcoin deposits. | [Link](https://bitskins.com/api_bitcoin#get_bitcoin_payment_status)          |

#### Giftable coupons
| Name                     | Description                                | Reference                                                  |
|--------------------------|--------------------------------------------|------------------------------------------------------------|
| createCoupons(options)   | Creates coupons.                           | [Link](https://bitskins.com/api_coupons#create_coupons)    |
| disableCoupons(options)  | Disables given coupons.                    | [Link](https://bitskins.com/api_coupons#disable_coupons)   |
| getCoupons()             | Returns list of coupons created.           | [Link](https://bitskins.com/api_coupons#get_coupons)       |
| getCouponStatus(options) | Returns the status of all coupons created. | [Link](https://bitskins.com/api_coupons#get_coupon_status) |
| redeemCoupon(options)    | Redeems a given coupon.                    | [Link](https://bitskins.com/api_coupons#redeem_coupon)     |
