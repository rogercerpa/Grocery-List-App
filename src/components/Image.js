import Cart from "../assets/groceryCart.jpg";

export default function Image() {
  return (
    <div>
      <img
        src={Cart}
        className="p-5 w-150px h-150px rounded-lg"
        alt="groceryImage"
      />
    </div>
  );
}
