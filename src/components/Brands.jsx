import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import axiosCommon from "../axios/axiosCommon";
import { Link } from "react-router-dom";

export function Brands() {
  const [brand, setBrand] = useState([]);
  useEffect(() => {
    axiosCommon()
      .get("/brands")
      .then((res) => {
        setBrand(res.data.message);
      });
  }, []);

  return (
    <div className="my-3 bg-slate-300">
      <Marquee>
        {brand.map((item) => (
          <Link
            className="inline-block rounded-md bg-blue-400 p-4 text-4xl mx-3 hover:bg-fuchsia-500"
            to={`/brands/${item.name}`}
            key={item._id}
          >
            {item.name}
          </Link>
        ))}
      </Marquee>
    </div>
  );
}
