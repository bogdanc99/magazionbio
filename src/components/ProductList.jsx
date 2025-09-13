import { useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import ProductItem from "./ProductItem"

export default function ProductList({ setNotification }) {
  const [products, setProducts] = useLocalStorage("products", [])
  const [filter, setFilter] = useState("")
  const [sort, setSort] = useState("date")

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id))
    setNotification("Product deleted")
  }

  const handleEdit = (id, updated) => {
    setProducts(products.map((p) => (p.id === id ? updated : p)))
    setNotification("Product updated")
  }

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(filter.toLowerCase())
  )

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price") return a.price - b.price
    return new Date(b.date) - new Date(a.date)
  })

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Filter products"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <select
          className="form-select w-25"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="date">Newest</option>
          <option value="price">Price</option>
        </select>
      </div>
      <div className="list-group">
        {sorted.map((p) => (
          <ProductItem
            key={p.id}
            product={p}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  )
}
