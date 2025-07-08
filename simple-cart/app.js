// Shopping list array
const shoppingList = [];

// Add an item to the shopping list
// Parameters:
// - itemName: the name of the item
// - itemPrice: the price of the item
function addItem(itemName, itemPrice) {
  const added = shoppingList.push({ name: itemName, price: itemPrice });
  if (added) {
    console.log("Item successfully added");
  } else {
    console.log("Failed to add item");
  }
  return added;
}

// Display all items in the shopping list with total price
// It lists all items and sums up the total cost
function displayItems() {
  const itemData = shoppingList.map(
    (item, index) => `${index + 1}. ${item.name}: Rp${item.price}`
  );

  const totalPrice = shoppingList.reduce((acc, val) => acc + val.price, 0);

  if (itemData.length > 0) {
    console.log("Shopping List:\n" + itemData.join("\n"));
    console.log("Total Price: Rp" + totalPrice);
  } else {
    console.log("No items added yet");
  }
}

// Display items with a price greater than Rp 10,000
// Useful for showing more expensive items only
function displayExpensiveItems() {
  const expensiveItems = shoppingList
    .filter((item) => item.price > 10000)
    .map((item) => `- ${item.name}: Rp${item.price}`);
  console.log("Expensive Items (Rp > 10000):\n" + expensiveItems.join("\n"));
}

// Remove an item from the shopping list by name
// If the item is found, it is removed from the list
function removeItem(itemName) {
  const index = shoppingList.findIndex((item) => item.name === itemName);
  if (index !== -1) {
    shoppingList.splice(index, 1);
    console.log("Successfully removed " + itemName);
  } else {
    console.log("Could not find " + itemName);
  }
}

// Search for an item by name
// Displays the item if found, or a not-found message
function searchItem(itemName) {
  const item = shoppingList.find((item) => item.name === itemName);
  if (item) {
    console.log(`Item found:\n Name: ${item.name}\n Price: Rp${item.price}\n`);
  } else {
    console.log("Could not find " + itemName);
  }
}

function updateItem(itemName, newItemName, newItemPrice) {
  const index = shoppingList.findIndex((item) => item.name === itemName);
  if (index !== -1) {
    shoppingList[index].name = newItemName;
    shoppingList[index].price = newItemPrice;
    console.log(
      `Item "${itemName}" successfully updated to "${newItemName}" with price Rp${newItemPrice}`
    );
  } else {
    console.log(`Item "${itemName}" not found. Cannot update.`);
  }
}

function sortItemsByPrice(key, order = "asc") {
  const sorted = shoppingList.sort((a, b) => {
    return order === "asc" ? a.harga - b.harga : b.harga - a.harga;
  });
}

function sortItemsByName(key, order = "asc") {
  const sorted = shoppingList.sort((a, b) => {
    return order === "asc"
      ? a.nama.localeCompare(b.name)
      : b.nama.localeCompare(a.name);
  });
}

// Example usage
addItem("Candy", 19000);
addItem("Food", 9000);
displayItems();
displayExpensiveItems();
searchItem("Candy");
removeItem("Food");
displayItems();
