import Cart from "../assets/groceryCart.jpg";

export default function Image() {
  return (
    <div>
      <img src={Cart} className="groceryImage" alt="groceryImage" />
    </div>
  );
}
