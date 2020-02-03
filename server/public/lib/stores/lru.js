let lruTimer = -1;
function lru(store, id, value, max) {
  value.updated = Date.now();
  this.data[store][id] = value;

  if( Object.keys(this.data[store]).length <= max ) return;

  if( lruTimer !== -1 ) clearTimeout(lruTimer);
  lruTimer = setTimeout(() => {
    lruTimer = -1;
    cleanData(store, max);
  }, 100);
}

function cleanData(store, max) {
  let arr = [];
  for( let id in this.data[store] ) {
    arr.push({id, value: this.data[store][id]});
  }

  arr.sort((a, b) => {
    if( a.updated < b.updated ) return 1;
    if( a.updated > b.updated ) return -1;
    return 0;
  });

  let tmp = {}
  arr.slice(0, max)
    .forEach(item => tmp[item.id] = item.value);
  this.data[store] = tmp;
}
