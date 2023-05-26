import Cart from "../assets/groceryCart.jpg";

export default function Image() {
  return (
    <div className="flex items-center">
      <img
        src={Cart}
        className="p-5 w-150px h-150px rounded-lg"
        alt="groceryImage"
      />
    </div>
  );
}
