import { Link } from "react-router-dom";
export function ProductGrid({ products }) {
  if (!products) {
    return null;
  }
  return (
    <div className="flex-1">
      <div className="px-3 grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 text-lg place-self-center">
        {products.map((product) => {
          return (
            <div key={product._id}>
              <img
                className="w-full h-60 object-cover"
                src={product.image}
                alt={product.name}
              />
              <ul className="space-y-2">
                <li>{product.name}</li>
                <li>{product.brand.name}</li>
                <li>${product.price}</li>
                <li>{product.ratings}</li>
                <li className="text-right">
                  <Link
                    className=" inline-block bg-blue-500 p-2 rounded-md"
                    to={`/products/${product._id}`}
                  >
                    View Details
                  </Link>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
