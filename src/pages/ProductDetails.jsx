import { useLoaderData } from "react-router-dom";

export default function ProductDetails() {
  const {
    data: { message },
  } = useLoaderData();

  const options = { year: "numeric", month: "long", day: "numeric" };

  return (
    <div className="my-4 flex justify-center items-center">
      <div className="w-1/2 h-3/4">
        <img
          className="w-full h-full object-cover"
          src={message.image}
          alt=""
        />
        <ul>
          <li>Name : {message.name}</li>
          <li>Brand : {message.brand.name}</li>
          <li>Category : {message.category.name}</li>
          <li>Price : ${message.price}</li>
          <li>Rating : {message.ratings}</li>
          <li>
            Last Update :{" "}
            {new Intl.DateTimeFormat("en-US", options).format(
              new Date(message.updatedAt)
            )}
          </li>
          <li>Description : {message.description}</li>
        </ul>
      </div>
    </div>
  );
}
