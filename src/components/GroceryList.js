import { AiFillDelete } from "react-icons/ai";
export default function GroceryList(props) {
  const { groceryItem, handleDelete } = props;

  const productList = groceryItem.map((item) => {
    return (
      <div className=" flex flex-row justify-center shrink-0 justify-between rounded-md  bg-sky-500/100">
        <li className="m-1 shadow-md font-bold p-1.5" key={item.id}>
          {item.itemName}
        </li>
        <button className="p-1.5" onClick={() => handleDelete(item.id)}>
          <AiFillDelete />
        </button>
      </div>
    );
  });

  return (
    <div className="">
      <h1 className="font-extrabold p-3">My list of Products</h1>
      <ul className="flex flex-col gap-1 list-none" id="shopping-list">
        {productList}
      </ul>
    </div>
  );
}
