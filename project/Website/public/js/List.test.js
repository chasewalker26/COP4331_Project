require('./main');
const buildList = require('./List');

test("updateDatabase is functional",  async () =>
{
  var list = buildList('ListID');
  var data;

  await list.updateDatabase(list.products);
  var dbProductsAfterSave = await pullFromFirebase('ProductList/ListID/');

  if (JSON.stringify(list.products) == JSON.stringify(dbProductsAfterSave))
    data = true;
  else
    data = false;

  expect(data).toBe(true);
})