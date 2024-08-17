import React, { useEffect, useState } from "react";
import { Range } from "react-range";
import axiosCommon from "../../axios/axiosCommon";

export function Query({ setFilterOptions }) {
  const [values, setValues] = useState([0, 500]);
  const [sortOption, setSortOption] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleBrandChange = (event) => {
    const { name, checked } = event.target;
    setSelectedBrands((prevBrands) =>
      checked
        ? [...prevBrands, name]
        : prevBrands.filter((brand) => brand !== name)
    );
  };

  const handleCategoryChange = (event) => {
    const { name, checked } = event.target;
    setSelectedCategories((prevCategories) =>
      checked
        ? [...prevCategories, name]
        : prevCategories.filter((category) => category !== name)
    );
  };
  useEffect(() => {
    async function fetchData() {
      const getBrands = await axiosCommon().get("/brands");
      const getCategories = await axiosCommon().get("/category");
      setBrand(getBrands.data.message);
      setCategory(getCategories.data.message);
    }
    fetchData();
  }, []);
  useEffect(() => {
    setFilterOptions({
      sortOption,
      selectedBrands,
      selectedCategories,
      values,
    });
  }, [values, sortOption, selectedBrands, selectedCategories]);
  return (
    <>
      <div className="w-60 bg-slate-200 p-2">
        <div className="flex flex-col text-lg">
          <h2 className="text-center text-2xl font-semibold">Sort</h2>
          <label htmlFor="low-to-high">
            <input
              className="mr-1"
              type="radio"
              name="sort"
              id="low-to-high"
              value="lth"
              checked={sortOption == "lth"}
              onChange={handleSortChange}
            />
            Low to High
          </label>
          <label htmlFor="high-to-low">
            <input
              className="mr-1"
              type="radio"
              name="sort"
              id="high-to-low"
              value="htl"
              checked={sortOption == "htl"}
              onChange={handleSortChange}
            />
            High to Low
          </label>
          <label htmlFor="newest">
            <input
              className="mr-1"
              type="radio"
              name="sort"
              id="newest"
              value="newest"
              checked={sortOption == "newest"}
              onChange={handleSortChange}
            />
            Newest
          </label>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-center">Filter</h2>
          <div>
            <p className="text-lg font-medium">Brand Name</p>
            {brand.map((item) => {
              return (
                <React.Fragment key={item._id}>
                  <label htmlFor={item.name}>
                    <input
                      className="mr-1"
                      type="checkbox"
                      id={item.name}
                      name={item.name}
                      onChange={handleBrandChange}
                    />
                    {item.name}
                  </label>
                  <br />
                </React.Fragment>
              );
            })}
          </div>
          <div>
            <p className="text-lg font-medium">Category Name</p>
            {category.map((item) => {
              return (
                <React.Fragment key={item._id}>
                  <label htmlFor={item.name}>
                    <input
                      className="mr-1"
                      type="checkbox"
                      id={item.name}
                      name={item.name}
                      onChange={handleCategoryChange}
                    />
                    {item.name}
                  </label>
                  <br />
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <div className="sm:mt-2 mt-0">
          <h2 className="text-center text-2xl font-semibold mb-2">Price</h2>
          <Range
            label="Select Price Range"
            step={5}
            min={0}
            max={1000}
            values={values}
            onChange={(values) => setValues(values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "6px",
                  width: "100%",
                  backgroundColor: "#ccc",
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                key={props.key}
                style={{
                  ...props.style,
                  height: "10px",
                  width: "10px",
                  backgroundColor: "#999",
                }}
              />
            )}
          />
          <p className="text-center">
            ${values[0]} - ${values[1]}
          </p>
        </div>
      </div>
    </>
  );
}
