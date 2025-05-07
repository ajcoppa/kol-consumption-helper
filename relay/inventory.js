Object.assign(globalThis, require("kolmafia"));

function hasConsumed(itemName, html) {
  itemName = itemName.toLowerCase();
  itemName = itemName.replace("(", "\\(");
  itemName = itemName.replace(")", "\\)");
  itemName = itemName.replace("[", "\\[");
  itemName = itemName.replace("]", "\\]");
  itemName = itemName.replace("?", "\\?");
  regex = new RegExp(">\\s*" + itemName + "(?:\\s*)</a>");
  return html.match(regex) !== null;
}

module.exports.main = () => {
  var pageText = visitUrl();
  var foodAndDrink = Object.keys(getInventory()).filter(itemName =>
    itemType(Item.get(itemName)) == "booze" || itemType(Item.get(itemName)) == "food"
  );
  var consumedItemsResponse = visitUrl("showconsumption.php");
  for (index in foodAndDrink) {
    var itemName = foodAndDrink[index];
    if (!hasConsumed(itemName, consumedItemsResponse)) {
      pageText = pageText.replace(
        `>${itemName}</b>`,
        `style="color: seagreen">${itemName}</b>`
      );
    }
  }
  write(pageText);
};
