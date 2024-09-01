import axios from "axios";
import { useEffect, useState } from "react";
import CategoryType from "../types/CategoryType";
import { Link } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");

  async function loadCategories() {
    const apiResponse = await axios.get("http://localhost:8080/categories");
    setCategories(apiResponse.data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleCategoryName(event: any) {
    setCategoryName(event.target.value);
  }

  async function addCategory() {
    await axios.post("http://localhost:8080/category", {
      name: categoryName,
    });
    loadCategories();
  }

  useEffect(function () {
    //action to take
    loadCategories();
  }, []);

  return (
    <div className="container mx-auto mt-5 mb-5 ml-10 w-[650px]">
      <nav className="navbar bg-blue-500 p-4 text-white text-2xl font-bold">
        <Link className="mr-4 border-2 border-white p-2" to="/">
          Home
        </Link>
        <Link className="mr-4 border-2 border-white p-2" to="/categories">
          Categories
        </Link>
        <Link className="mr-4 border-2 border-white p-2" to="/product">
          Product
        </Link>
      </nav>
      <h1 className="text-4xl font-bold underline mb-5 mt-5 text-blue-500">
        Category
      </h1>
      <button
        className="mb-5 p-4 border border-slate-400 rounded-lg me-3"
        onClick={loadCategories}
      >
        Load Categories
      </button>

      {categories.map((category) => (
        <h4 className="inline-block p-2 me-3 mb-8 mt-8 border border-slate-300 rounded-lg shadow-lg">
          {category.name}
        </h4>
      ))}

      <div>
        <input
          className="block w-full p-2 border border-slate-400 rounded-lg text-slate-800 text-md mb-6"
          type="text"
          placeholder="Enter Category Name ?"
          onChange={handleCategoryName}
        />
        <button
          className="mb-5 p-4 border border-slate-400 rounded-lg me-3 text-blue-500 hover:to-blue-300"
          onClick={addCategory}
        >
          Add Category
        </button>
      </div>
    </div>
  );
}

export default Categories;
