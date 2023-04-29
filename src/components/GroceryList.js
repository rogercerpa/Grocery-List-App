import { AiFillDelete } from "react-icons/ai";
export default function GroceryList(props) {
  const { groceryItem, handleDelete } = props;

  const productList = groceryItem.map((item) => {
    return (
      <div className="flex flex-row">
        <li className="m-1 shadow-md ..." key={item.id}>
          {item.itemName}
        </li>
        <button className="" onClick={() => handleDelete(item.id)}>
          <AiFillDelete />
        </button>
      </div>
    );
  });

  return (
    <div className="">
      <h1 className="font-bold ...">My list of Products</h1>
      <ul className="list-disc" id="shopping-list">
        {productList}
      </ul>
    </div>
  );
}
