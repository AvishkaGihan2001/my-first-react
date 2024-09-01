/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import ProductType from "../types/ProductType";
import CategoryType from "../types/CategoryType";
import { Link } from "react-router-dom";

function Product() {
  const [product, setProduct] = useState<ProductType[]>([]);
  const [id, setId] = useState<number>(0);
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [categoryID, setCategoryId] = useState<number>(0);

  const [isUpdate, setIsUpdate] = useState<boolean>(false);


  const [categories, setCategories] = useState<CategoryType[]>([]);

  function handleProductName(event: any) {
    setProductName(event.target.value);
  }

  function handleProductDescription(event: any) {
    setProductDescription(event.target.value);
  }

  function handlePrice(event: any) {
    setPrice(event.target.value);
  }

  function handleCategoryID(event: any) {
    setCategoryId(event.target.value);
  }

  async function loadProduct() {
    const apiResponse = await axios.get("http://localhost:8080/product");
    setProduct(apiResponse.data);
    clearForm();
  }

  async function loadCategories() {
    const apiResponse = await axios.get("http://localhost:8080/categories");
    setCategories(apiResponse.data);
  }

  useEffect(function () {
    //action to take
    loadProduct();
    loadCategories();
  }, []);

  function clearForm() {
    setProductName("");
    setProductDescription("");
    setPrice(0);
    setCategoryId(0);
  }

  async function addProduct() {
    const resp = await axios.post("http://localhost:8080/product", {
      name: productName,
      description: productDescription,
      price: price,
      categoryID: categoryID,
    });

    if (resp.status === 201) {
      alert("Product added successfully");
      loadProduct();
      clearForm();
    } else {
      alert("Failed to add product");
    }
  }

  async function getProduct(id: number) {
    const resp = await axios.get("http://localhost:8080/product/" + id);

    setId(resp.data.id);
    setProductName(resp.data.name);
    setProductDescription(resp.data.description);
    setPrice(resp.data.price);
    setCategoryId(resp.data.category.id);
    
    setIsUpdate(true);

  }

  async function updateProduct() {
    const resp = await axios.put("http://localhost:8080/product/" + id, {
      name: productName,
      description: productDescription,
      price: price,
      categoryID: categoryID,
    });

    if (resp.status === 200) {
      alert("Product updated successfully");
      loadProduct();
      clearForm();
    } else {
      alert("Failed to update product");
    }
  }

  function  handleInsertOrUpdate(){
    if(isUpdate){
      updateProduct();
    }else{
      addProduct();
    }
  }

  function handleHeading() {
    if (isUpdate) {
      return "Update Product";
    } else {
      return "Add Product";
    }
  }

  async function deleteProduct(id: number) {
    if (!window.confirm("Are you sure you want to delete this product ?")) {
      return;
    } 
    const resp = await axios.delete("http://localhost:8080/product/" + id);

    if (resp.status === 200) {
      alert("Product deleted successfully");
      loadProduct();
    } else {
      alert("Failed to delete product");
    }
  }

  return (
    <div className="container mx-auto mt-5 mb-5 ml-10 w-[850px]">
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
        Product
      </h1>
      <button
        className=" p-4 mb-5 border border-slate-400 rounded-lg me-3"
        onClick={loadProduct}
      >
        Load Product
      </button>

      <table className="table-auto w-full">
        <thead>
          <tr className="bg-blue-400 text-md font-medium text-slate-650">
            <th className="p-2 w-[50px] text-center">#</th>
            <th className="p-2 w-[200px] text-center">Product Name</th>
            <th className="p-2 w-[200px] text-center">Product Description</th>
            <th className="p-2 w-[150px] text-center">Price</th>
            <th className="p-2 w-[200px] text-center">Category</th>
            <th className="p-2 w-[200px] text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {product.map(function (product) {
            return (
              <tr>
                <td className="p-2 w-[50px] text-center">{product.id}</td>
                <td className="p-2 w-[200px] text-center">{product.name}</td>
                <td className="p-2 w-[200px] text-center">
                  {product.description}
                </td>
                <td className="p-2 w-[150px] text-center">{product.price}</td>
                <td className="p-2 w-[200px] text-center">
                  {product.category.name}
                </td>
                <td className="p-2 w-[200px] text-center">
                  <button
                    className="p-2 border border-green-700 bg-green-300 rounded-lg me-3"
                    onClick={() => getProduct(product.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="p-2 border border-red-700 bg-red-300 rounded-lg"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div>
        <h1 className="text-4xl font-bold underline mb-5 text-blue-500 mt-5">
          {handleHeading()}
        </h1>
        <input
          id="txtProductName"
          className="block w-full p-2 border border-slate-400 rounded-lg text-slate-800 text-md mb-6"
          type="text"
          placeholder="Enter Product Name ?"
          onChange={handleProductName}
          value={productName}
        />
        <input
          id="txtProductDescription"
          className="block w-full p-2 border border-slate-400 rounded-lg text-slate-800 text-md mb-6"
          type="text"
          placeholder="Enter Product Description ?"
          onChange={handleProductDescription}
          value={productDescription}
        />
        <input
          id="txtPrice"
          className="block w-full p-2 border border-slate-400 rounded-lg text-slate-800 text-md mb-6"
          type="number"
          placeholder="Enter Price ?"
          onChange={handlePrice}
          value={price}
        />
        <select
          id="ddlCategory"
          className="block w-full p-2 border border-slate-400 rounded-lg text-slate-800 text-md mb-6"
          onChange={handleCategoryID}
          value={categoryID}
        >
          {categories.map(function (category) {
            return (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>

        <button
          className="mb-5 p-4 border border-blue-500 rounded-lg me-3 text-slate-900 hover:to-blue-600 bg-blue-300"
          onClick={handleInsertOrUpdate}
        >
          {handleHeading()}
        </button>
      </div>
    </div>
  );
}

export default Product;
