import { useEffect, useRef, useState } from "react";
import axiosCommon from "../axios/axiosCommon";
import { ProductGrid } from "../components/ProductGrid/ProductGrid";
import { Query } from "../components/Query/Query";

export function Brand() {
  const [prevent, setPrevent] = useState(false);
  const [product, setProduct] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});
  const abortRef = useRef();

  useEffect(() => {
    if (!prevent) {
      setPrevent(true);
      return;
    }
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const signal = abortRef.current.signal;
    axiosCommon()
      .post("/products/filter", filterOptions, { signal })
      .then((res) => {
        setProduct(res.data.message);
      })
      .catch(() => {});
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, [filterOptions]);
  return (
    <div className="flex">
      <Query setFilterOptions={setFilterOptions} />
      <ProductGrid products={product} />
    </div>
  );
}
