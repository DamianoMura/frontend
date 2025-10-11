import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductList from "../components/ProductList";
import "../styles/Products.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripHorizontal,
  faListUl,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

function Products() {
  const [products, setProducts] = useState([]);
  const [params, setParams] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [searchParam,setSearchParam] = useState("")
  const [categories,setCategories]=useState([])
  const [category,setCategory]=useState("")
  const [orderAD,setOrderAD]=useState("DESC")
  const baseUrl = "http://localhost:3000";
  // paginazione
  const [currentPage, setCurrentPage] = useState("");
  const [productsPerPage, setProductsPerPage] = useState("");
  

  const navigate = useNavigate();
  const location = useLocation();

  // paginazione - quando si effettua una ricerca resetta la paginazione ad 1
  useEffect(() => {
    setCurrentPage(1); // ← aggiungi questo
  }, [search, sort]);

   // Leggi i parametri dalla URL al primo caricamento
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setParams(params)
    
  }, [location.search]);

  // switch componente card
  const [showCard, setShowCard] = useState(false);

  const handleToggle = () => {
    setShowCard((prev) => !prev);
  };

  // Fetch iniziale
  useEffect(() => {
    setParams(location.search)
    fetch(`${baseUrl}/products?${params}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, [params]);

    // carichiamo la lista delle categorie
  useEffect(()=>{
    fetch(`${baseUrl}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.error(err));
  },[])
  
  useEffect(() => {
    
    if (searchParam) params.set("search", searchParam); 
    if (sort) params.set("sort", sort);
    if (productsPerPage) params.set("rpp", productsPerPage);
    if (category) params.set("cat", category);
    if (orderAD) params.set("order", orderAD);
    setParams()
    
  }, [searchParam, sort, productsPerPage,currentPage, products, orderAD]);


  if (products.length === 0) {
    return <div className="container loading">Loading...</div>;
  }

  return (
    <div id="products" className="container-fluid hn-main">
      <div className="row justify-content-center d-flex hn-sections-container">
        <form role="search">
          <div className="row g-1">
            <div className="col-12 d-flex">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Find your products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn" onClick={()=> 
                  {
                  setSearchParam(search)
                  }
                }>search</button>
            </div>
              
            <div className="col-4  col-lg-2 d-flex">
              <select
                className="form-select mb-2"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                
                <option value="">Sort by...</option>
                <option value="price">Price</option>
                <option value="latest">Latest arrivals</option>
                <option value="popular">Best seller</option>
              </select>
            </div>
            <div className="col-4 col-md-4 col-lg-2 d-flex">
              <select
                className="form-select mb-2"
                
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                
                <option value="">search by Categories</option>
                {!categories ? <option value="name">loading....</option>:
                 categories.map((category,index)=>(<option value={category.name} key={index}>{category.name}</option>))}
                
               
              </select>
            </div>
            <div className="col-4 col-lg-2 d-flex">
              <select
                  className="form-select"
                  value={orderAD}
                  onChange={(e) => setOrderAD(e.target.value)}
                >
                  
                  <option  value={"ASC"}>ASC</option>
                  <option  value={"DESC"}>DESC</option>
                </select>
            </div>
            <div className="col-6 col-lg-2 d-flex">
              
                <select
                  className="form-select"
                  value={productsPerPage}
                  onChange={(e) => setProductsPerPage(Number(e.target.value))}
                >
                  <option value={products.length-1}>All</option>
                  <option value={4}>4 element</option>
                  <option value={8}>8 element</option>
                  <option value={16}>16 element</option>
                  <option value={32}>32 element</option>
                </select>
            </div>
            <div className="col-6 d-flex flex-row-reverse">
              <button type="button" className="btn" onClick={handleToggle}>
                <FontAwesomeIcon
                  icon={showCard ? faGripHorizontal : faListUl}
                />
              </button>
            </div>
              
            
          </div>
        </form>
      </div>

      <div className="row">
        <div className="col-12 ps-section my-5">
          <div
            className={`row justify-content-start ${showCard ? "g-3" : "g-3"}`}
          >
            {!products? <span>nothing to show</span>  : products.map((product) =>
              showCard ? (
                <ProductList key={product.id} product={product} />
              ) : (
                <div key={product.id} className="col-12 col-md-6 col-lg-3">
                  <ProductCard product={product} />
                </div>
              )
            )}
          </div>
        </div>
        {/* paginazione - navigazione */}
        {/* <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
          <button
            className="btn"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ← Prev
          </button>

          <span className="fw-bold text-white">
            Pagina {currentPage} di {totalPages}
          </span>

          <button
            className="btn"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default Products;
