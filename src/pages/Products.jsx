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
  
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [categories,setCategories]=useState([])

  //variabili di stato che determinano i valori della barra di ricerca sort, search, order e prodotti per pagina
  const [search, setSearch] = useState("");
  const [searchParam,setSearchParam] = useState("")//se non separo e uso un button per settarla mi farebbe una chiamata al db ogni volta che search si aggiorna
  const [category,setCategory]=useState("")
  const [orderAD,setOrderAD]=useState("price_DESC")
  const [sort, setSort] = useState();
  const [productsPerPage, setProductsPerPage] = useState(4);
  
  const baseUrl = "http://localhost:3000";
  // paginazione 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState("");
  const [totalResults, setTotalResults] = useState("");
  
   // switch componente card
   const [showCard, setShowCard] = useState(false);
  

  // paginazione - quando si effettua una ricerca resetta la paginazione ad 1
  useEffect(() => {
    setCurrentPage(1); // ← aggiungi questo
  }, [totalPages]);

   // Leggi i parametri dalla URL al primo caricamento

  const handleToggle = () => {
    setShowCard((prev) => !prev);
  };

  // Fetch iniziale
  useEffect(() => {
    //determiniamo la url di partenza perchè ho messo un link da latest e popular dalla home page (funziona tutto per ora)
    const startingUrl = new URLSearchParams(location.search) 
    console.log(startingUrl)
    setSort(startingUrl.get("sort"))
    const Url=`${baseUrl}/products${location.search||""}`
    fetch(Url)
      .then((res) => res.json())
      .then((data) =>{
        setProducts(data.results)
        setTotalPages(data.pages)
        setTotalResults(data.resultCount)
      })
      .catch((err) => console.error(err));
  }, [location.search]);

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
    const newParams = new URLSearchParams();
    if (searchParam) newParams.set("search", searchParam); 
    if (sort) newParams.set("sort", sort);
    if (productsPerPage) newParams.set("rpp", productsPerPage);
    if (category) newParams.set("cat", category);
    if (orderAD) newParams.set("order", orderAD);
    if (currentPage) newParams.set("page", currentPage);
     
   
    
    navigate({ search: newParams.toString() }, { replace: true });
  }, [searchParam, sort, productsPerPage, currentPage, category, orderAD, navigate]);


  if (!products) {
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
                className="form-control me-2 text-black"
                placeholder="Find your products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn" onClick={(e)=> 
                  {
                  e.preventDefault();
                  setSearchParam(search)
                  }
                }>search</button>
            </div>
              
            <div className="col-4  col-lg-2 d-flex">
              <select
                className="form-select mb-2"
                value={sort}
                onChange={(e) => {
                  (e).preventDefault();
                  if (e.target.value==="all") setCategory("") 
                  else if (e.target.value==="category") setCategory("Laptop")
                  setSort(e.target.value)
                  
                }}
              >
                
               
                <option value="all">All products</option>
                <option value="category">Category:</option>
                <option value="latest">Latest arrivals</option>
                <option value="popular">Best seller</option>
              </select>
            </div>
            {
              (sort=="category") &&
            <div className="col-4 col-md-4 col-lg-2 d-flex">
              <select
                className="form-select mb-2"
                
                value={category}
                onChange={(e) => {
                  e.preventDefault();
                  setCategory(e.target.value)
                }}
              >
                
                
                {!categories ? <option value="name">loading....</option>:
                 categories.map((category,index)=>(<option value={category.name} key={index}>{category.name}</option>))}
                
               
              </select>
            </div>
            }
            <div className="col-4 col-lg-2 d-flex">
              <select
                  className="form-select"
                  value={orderAD}
                  onChange={(e) => {
                    e.preventDefault();
                    setOrderAD(e.target.value)}}
                >
                  
                  <option  value={"price_ASC"}>PRICE ASC</option>
                  <option  value={"price_DESC"}>PRICE DESC</option>
                </select>
            </div>
            <div className="col-6 col-lg-2 d-flex">
              
                <select
                  className="form-select"
                  value={productsPerPage}
                  onChange={(e) => setProductsPerPage(Number(e.target.value))}
                >
                  <option >All</option>
                  <option value={4}>4 element</option>
                  <option value={8}>8 element</option>
                  {totalResults>16 && <option value={16}>16 element</option>}
                  {totalResults>32 && <option value={32}>32 element</option>}
                  
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
        {totalResults>0 && <div className="col-12 text-white fw-bold text-center"><span>{totalResults>1 ? `${totalResults} results found` : `${totalResults} result found`}{totalPages>1 && `, ${totalPages} pages`}</span></div>
        }
        <div className="col-12 ps-section my-5">
          <div
            className={`row justify-content-start ${showCard ? "g-3" : "g-3"}`}
          >
              {products ? products.map((product) =>
              showCard ? (
                <ProductList key={product.id} product={product} />
              ) : (
                <div key={product.id} className="col-12 col-md-6 col-lg-3">
                  <ProductCard product={product} />
                </div>
              )
            ) : <h3>Nessun Risultato Trovato</h3>}
                 <div className="col-12 ps-section my-5">

          <div
            className={`row justify-content-start ${showCard ? "g-3" : "g-3"}`}
          >
         {/* paginazione - navigazione */}
        {
          totalPages>1 &&
        <div className="d-flex justify-content-center align-items-center mt-4 gap-3">

          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(currentPage-1)
              }}
            disabled={currentPage === 1}
          >
            ← Prev
          </button>

          <span className="fw-bold text-white">
             {currentPage}/{totalPages}
          </span>

          <button
            className="btn"
            onClick={(e) =>{
              e.preventDefault();
              setCurrentPage(currentPage+1)
            }
            }
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
        }
          </div>
        </div> 
              
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Products;
