require('./main');
const buildList = require('./List');

test("getProducts is functional", async () =>
{
  var list = buildList('ListID');
  var data;

  await list.getProducts();
  var dbProducts = await pullFromFirebase('ProductList/' + list.listID + '/');

  if (JSON.stringify(list.products) == JSON.stringify(dbProducts))
    data = true;
  else
    data = false;

  expect(data).toBe(true);
})

test("updateDatabase is functional",  async () =>
{
  var list = buildList('ListID');
  var data;

  await list.getProducts();
  await list.updateDatabase(list.products);
  var dbProductsAfterSave = await pullFromFirebase('ProductList/' + list.listID + '/');

  if (JSON.stringify(list.products) == JSON.stringify(dbProductsAfterSave))
    data = true;
  else
    data = false;

  expect(data).toBe(true);
})