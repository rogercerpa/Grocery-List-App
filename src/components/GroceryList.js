export default function GroceryList(props) {
  const { groceryItem, handleDelete } = props;

  const productList = groceryItem.map((item) => {
    return (
      <li key={item.id}>
        {item.itemName}
        <button onClick={() => handleDelete(item.id)}>Delete</button>
      </li>
    );
  });

  return (
    <div>
      <h1>My list of Products</h1>
      <ul id="shopping-list">{productList}</ul>
    </div>
  );
}
