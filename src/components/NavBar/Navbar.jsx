import { Link } from "react-router-dom";
import "./Navbar.css";
import { useEffect, useRef, useState } from "react";
import axiosCommon from "../../axios/axiosCommon";
export default function Navbar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const abortRef = new useRef();

  useEffect(() => {
    if (search) {
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();
      const signal = abortRef.current.signal;

      axiosCommon()
        .post("/search", { search }, { signal })
        .then((response) => {
          setResults(response.data?.message);
        })
        .catch(() => {});
    }
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, [search]);

  return (
    <nav className="flex justify-between items-center px-2 py-1 bg-slate-100">
      <div className="h-16 w-16">
        <Link to="/">
          <img
            className="h-full w-full rounded-full"
            src="https://www.kindpng.com/picc/m/79-795663_transparent-speedometer-icon-png-circle-twitter-logo-png.png"
            alt=""
          />
        </Link>
      </div>
      <div className="w-1/3 relative">
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          className="border border-slate-400 focus:border-slate-600 w-full p-2 rounded-lg"
          placeholder="search products globally"
        />
        {results.length > 0 && search ? (
          <div className="absolute border searchPopup">
            <ul className="">
              {results.map((result) => {
                return (
                  <li
                    key={result._id}
                    className="bg-slate-300 border border-b-stone-400 hover:bg-gray-200"
                  >
                    <Link
                      className="inline-block h-full w-full p-2"
                      to={`/products/${result._id}`}
                    >
                      {result.name} || {result.brand.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : results.length == 0 && search ? (
          <div className="absolute border searchPopup">
            <ul className="">
              <li className="bg-slate-300 border border-b-orange-400">
                <a className="inline-block h-full w-full p-2">
                  Not Found Any Product 😢
                </a>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
      <div>
        <ul className="flex space-x-2 font-semibold">
          <li className="bg-orange-300 rounded-md hover:bg-orange-600">
            <Link className="inline-block py-2 px-3" to={"/login"}>
              Login
            </Link>
          </li>
          <li className="bg-orange-300 rounded-md hover:bg-orange-600">
            <Link className="inline-block py-2 px-3" to={"/register"}>
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
