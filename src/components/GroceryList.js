export default function GroceryList(props) {
  const productName = props.groceryItem;

  const productList = productName.map((item) => {
    return <li key={item.id}>{item.itemName}</li>;
  });

  return (
    <div>
      <h1>My list of Products</h1>
      <ul id="shopping-list">{productList}</ul>
    </div>
  );
}
