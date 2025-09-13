import { useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"

export default function ProductForm({ setNotification }) {
  const [products, setProducts] = useLocalStorage("products", [])
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setImage(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !price.trim()) {
      setNotification("Titlul si pretul sunt obligatorii")
      return
    }
    const newProduct = {
      id: Date.now(),
      title,
      price: parseFloat(price),
      image,
      description,
      date: new Date().toISOString()
    }
    setProducts([...products, newProduct])
    setTitle("")
    setPrice("")
    setImage("")
    setDescription("")
    setNotification("Produs adaugat")
  }

  return (
    <form onSubmit={handleSubmit} className="row g-2 mb-4">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          placeholder="Nume produs"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="col-md-3">
        <input
          type="number"
          className="form-control"
          placeholder="Pret (lei)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="col-md-3">
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>
      <div className="col-12">
        <textarea
          className="form-control"
          placeholder="Descriere produs"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-success w-100">
          Adauga produs
        </button>
      </div>
    </form>
  )
}
