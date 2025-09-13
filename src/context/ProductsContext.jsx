import { createContext, useContext, useState, useEffect } from "react"
import useLocalStorage from "../hooks/useLocalStorage"

const ProductsContext = createContext()

export function ProductsProvider({ children }) {
  const [useApi, setUseApi] = useState(false)

  // local
  const [localProducts, setLocalProducts] = useLocalStorage("products", [])

  // api
  const [apiProducts, setApiProducts] = useState([])
  const [loading, setLoading] = useState(false)

  // fetch produse din API
  useEffect(() => {
    if (useApi) {
      setLoading(true)
      fetch("http://localhost:5000/products")
        .then((res) => res.json())
        .then((data) => {
          setApiProducts(data)
          setLoading(false)
        })
        .catch((err) => {
          console.error("Eroare API:", err)
          setLoading(false)
        })
    }
  }, [useApi])

  const products = useApi ? apiProducts : localProducts
  const setProducts = useApi ? setApiProducts : setLocalProducts

  return (
    <ProductsContext.Provider
      value={{ products, setProducts, useApi, setUseApi, loading }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  return useContext(ProductsContext)
}
