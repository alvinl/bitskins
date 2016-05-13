
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

#### Example
```js
bitSkins.getMarketData({ names: ['AK-47 | Redline (Field-Tested)'] })
```

### getAccountInventory()

- [API reference](https://bitskins.com/api#get_my_inventory)

Returns your account's available inventory on Steam, Bitskins and pending withdrawals.
