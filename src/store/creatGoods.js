export function createdNewGoods(data, type) {
  console.log(data);
  let goods = {
    "addTime": Date.now(),
    "buy_limit": 10,
    "can_change_num": type || true,
    "can_delete": type || true,
    "commodity_id": data.commodity_id,
    "product_id":data.product_id,
    "elementsGoods": false,
    "goodsId": data.goods_list[0].goods_id,
    "image_url": data.img_url,
    "is_available": true,
    "is_batched": data.is_batched,
    "is_cos": data.is_cos,
    "itemId": "",
    "num": 1,
    "price": data.goods_list[0].price,
    "product_name": data.name,
    "salePrice": data.goods_list[0].price,
    "sel_status": data.is_sale,
    "short_name": data.name,
    "showType": "buy",
    "sku": "",
    "subtotal": new Number(data.goods_list[0].price).valueOf(),
    "updateTime": Date.now()
  };
  console.log('newGoods', goods);
  return goods;
}
export function addGoods(list, item, num = 1) {
  let money = new Number(item.salePrice) * num;
  item.num += num;
  item.subtotal += money;
  list.totalSelGoods += num;
  list.productMoneySelGoods += money;
  list.total += num;
  console.log(list);
  list.productMoneySelGoods = new Number(list.productMoneySelGoods.toFixed(2)).valueOf();
}
export function updateList(list) {
  let _num = 0,
    num = 0,
    _price = 0,
    price = 0;
  console.log(list)
  list.items.forEach(item => {
    console.log(item)
    _num += item.num;
    _price += new Number(item.price) * item.num;
    if (item.is_available === true) {
      num += item.num;
      price += new Number(item.price) * item.num;
    }
  });
  list.total = _num;
  list.totalSelGoods = num;
  list.totalprice = _price;
  list.productMoneySelGoods = price;
}
