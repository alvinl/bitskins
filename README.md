
# BitSkins API client

The unofficial [BitSkins](https://bitskins.com/) API client.

## Installation

```
$ npm install alvinl/bitskins
```

## Methods

All of the following methods return a native [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Some methods allow you to pass addtional data via an object when calling the API. See the methods API reference to see which data can be sent.

### Constructor(apiKey, secret)

- `apiKey` - Your BitSkins API key. Can be found in your [settings page](https://bitskins.com/settings)
- `secret` - Your 2FA secret. This is shown to you when enabling 2FA on your account.

Creates a new `BitSkins` instance.

### getAccountBalance()

- [API reference](https://bitskins.com/api#get_account_balance)

Returns your account balance.

### getAllItemPrices()

- [API reference](https://bitskins.com/api#get_all_item_prices)

Returns the entire price database used by Bitskins.

### getMarketData(options)

- [API reference](https://bitskins.com/api#get_price_data_for_items_on_sale)
- `options` - Addtional data to send to the API. 

Returns basic pricing data for up to 250 `market_hash_name`'s that are currently on sale.

##### Example
```js
bitSkins.getMarketData({ names: ['AK-47 | Redline (Field-Tested)'] })
```

### getAccountInventory(options)

- [API reference](https://bitskins.com/api#get_my_inventory)
- `options` - Addtional data to send to the API. 

Returns your account's available inventory on Steam, Bitskins and pending withdrawals.

##### Example
```js
bitSkins.getAccountInventory({ page: 1 })
```

### getInventoryOnSale(options)

- [API reference](https://bitskins.com/api#get_inventory_on_sale)
- `options` - Addtional data to send to the API.

Returns your inventory currently on sale.

##### Example
```js
bitSkins.getInventoryOnSale({ page: 1 })
```

### getResetPriceItems(options)

- [API reference](https://bitskins.com/api#get_reset_price_items)
- `options` - Addtional data to send to the API.

Returns a paginated list of items that need their prices reset.

##### Example
```js
bitSkins.getResetPriceItems({ page: 1 })
```

### getMoneyEvents(getResetPriceItems)

- [API reference](https://bitskins.com/api#get_money_events)
- `options` - Addtional data to send to the API.

Returns historical events that caused changes in your balance.

##### Example
```js
bitSkins.getMoneyEvents({ page: 1 })
```

### requestWithdrawal(options)

- [API reference](https://bitskins.com/api#request_withdrawal)
- `options` - Addtional data to send to the API.

Allows you to request withdrawal of available balance on your BitSkins account.

##### Example
```js
bitSkins.requestWithdrawal({ amount: '20.00', withdrawal_method: 'paypal' })
```

### buyItem(options)

- [API reference](https://bitskins.com/api#buy_item)
- `options` - Addtional data to send to the API.

Allows you to buy an item currently on sale

##### Example
```js
bitSkins.buyItem({ item_ids: ['12342'], prices: ['4.56'] })
```

### sellItem(options)

- [API reference](https://bitskins.com/api#list_item_for_sale)
- `options` - Addtional data to send to the API.

Allows you to list an item for sale.

##### Example
```js
bitSkins.sellItem({ item_ids: ['5672239'], prices: ['2.42'] })
```

### modifySale(options)

- [API reference](https://bitskins.com/api#modify_sale_item)
- `options` - Addtional data to send to the API.

Allows you to change the price(s) of item(s) currently on sale.

##### Example
```js
bitSkins.modifySale({ item_ids: ['782323'], prices: ['1.53'] })
```

### withdrawItem(options)

- [API reference](https://bitskins.com/api#withdraw_item)
- `options` - Addtional data to send to the API.

Lets you delist an active sale item and/or re-attempt an item pending withdrawal.

##### Example
```js
bitSkins.withdrawItem({ item_ids: ['8765678'] })
```

### bumpItem(options)

- [API reference](https://bitskins.com/api#bump_item)
- `options` - Addtional data to send to the API.

Lets you bump items currently listed for $0.3.

##### Example
```js
bitSkins.bumpItem({ item_ids: ['766238249'] })
```

### getBuyHistory(options)

- [API reference](https://bitskins.com/api#get_buy_history)
- `options` - Addtional data to send to the API.

Returns your purchase history.

##### Example
```js
bitSkins.getBuyHistory({ page: 1 })
```

### getSellHistory(options)

- [API reference](https://bitskins.com/api#get_sell_history)
- `options` - Addtional data to send to the API.

Returns your sell history.

##### Example
```js
bitSkins.getSellHistory({ page: 1 })
```

### getItemHistory(options)

- [API reference](https://bitskins.com/api#get_item_history)
- `options` - Addtional data to send to the API.

Returns bought / sold / listed item history.

##### Example
```js
bitSkins.getItemHistory({ page: 1 })
```

### getTradeDetails(options)

- [API reference](https://bitskins.com/api#get_trade_details)
- `options` - Addtional data to send to the API.

Returns info about items trades sent to / from BitSkins

##### Example
```js
bitSkins.getTradeDetails({ trade_token: 'd3bedb77f7430e68', trade_id: 'ddc126dc3cc4e8a2'  })
```
