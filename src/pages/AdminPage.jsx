import { useState, useEffect } from "react"
import { useProducts } from "../context/ProductsContext"

export default function AdminPage() {
  const { products, setProducts, useApi, setUseApi, loading } = useProducts()

  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [editProduct, setEditProduct] = useState(null)

  // Toast
  const [toast, setToast] = useState({ show: false, message: "", type: "success" })
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000)
  }

  // Reincarcare API
  const reloadFromApi = () => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => showToast("Eroare la incarcare din API", "danger"))
  }

  useEffect(() => {
    if (useApi) reloadFromApi()
  }, [useApi])

  const handleImageUpload = (e, callback) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => callback(reader.result)
    reader.readAsDataURL(file)
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!title.trim() || !price.trim()) {
      showToast("Completeaza numele si pretul!", "danger")
      return
    }

    const newProduct = {
      id: Date.now(),
      title,
      price: parseFloat(price),
      description,
      image,
      date: new Date().toISOString(),
    }

    if (useApi) {
      await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      })
      reloadFromApi()
    } else {
      setProducts([...products, newProduct])
    }

    setTitle("")
    setPrice("")
    setDescription("")
    setImage("")
    showToast("Produs adaugat cu succes!")
  }

  const handleDelete = async (id) => {
    if (useApi) {
      await fetch(`http://localhost:5000/products/${id}`, { method: "DELETE" })
      reloadFromApi()
    } else {
      setProducts(products.filter((p) => p.id !== id))
    }
    showToast("Produs sters cu succes!", "warning")
  }

  const openEdit = (p) => setEditProduct({ ...p })

  const saveEdit = async (e) => {
    e.preventDefault()
    if (useApi) {
      await fetch(`http://localhost:5000/products/${editProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editProduct),
      })
      reloadFromApi()
    } else {
      setProducts(products.map((p) => (p.id === editProduct.id ? editProduct : p)))
    }
    setEditProduct(null)
    showToast("Produs modificat cu succes!", "info")
  }

  if (loading) return <p>Se incarca produsele...</p>

  return (
    <div className="container py-5">
      <h2 className="mb-4">Administrare produse</h2>

      {/* Switch API */}
      <div className="form-check form-switch mb-4">
        <input
          className="form-check-input"
          type="checkbox"
          id="apiSwitch"
          checked={useApi}
          onChange={(e) => setUseApi(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="apiSwitch">
          Foloseste JSON Server (db.json)
        </label>
      </div>

      {/* Formular adaugare */}
      <form onSubmit={handleAdd} className="row g-2 mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Nume produs"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="col-md-2">
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
            onChange={(e) => handleImageUpload(e, setImage)}
          />
        </div>
        <div className="col-md-3">
          <button type="submit" className="btn btn-success w-100">
            Adauga produs
          </button>
        </div>
        <div className="col-12">
          <textarea
            className="form-control"
            placeholder="Descriere"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {image && (
          <div className="col-12">
            <img
              src={image}
              alt="preview"
              className="img-thumbnail"
              style={{ maxWidth: "160px" }}
            />
          </div>
        )}
      </form>

      {/* Lista produse */}
      <ul className="list-group">
        {products.map((p) => (
          <li
            key={p.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center gap-3">
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  className="rounded"
                  style={{ width: "56px", height: "56px", objectFit: "cover" }}
                />
              )}
              <div>
                <div className="fw-semibold">{p.title}</div>
                <small className="text-muted">{p.price} lei</small>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-warning btn-sm"
                onClick={() => openEdit(p)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(p.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal editare */}
      {editProduct && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.7)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editare produs</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditProduct(null)}
                ></button>
              </div>
              <form onSubmit={saveEdit}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nume produs"
                        value={editProduct.title}
                        onChange={(e) =>
                          setEditProduct({ ...editProduct, title: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Pret (lei)"
                        value={editProduct.price}
                        onChange={(e) =>
                          setEditProduct({ ...editProduct, price: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-12">
                      <textarea
                        className="form-control"
                        placeholder="Descriere"
                        value={editProduct.description || ""}
                        onChange={(e) =>
                          setEditProduct({
                            ...editProduct,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-8">
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageUpload(e, (img) =>
                            setEditProduct({ ...editProduct, image: img })
                          )
                        }
                      />
                    </div>
                    <div className="col-md-4 d-flex align-items-center">
                      {editProduct.image && (
                        <img
                          src={editProduct.image}
                          alt="preview"
                          className="img-thumbnail ms-md-auto"
                          style={{ maxWidth: "140px" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditProduct(null)}
                  >
                    Anuleaza
                  </button>
                  <button type="submit" className="btn btn-success">
                    Salveaza
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast.show && (
        <div
          className={`toast align-items-center text-bg-${toast.type} border-0 show position-fixed bottom-0 end-0 m-3`}
          role="alert"
        >
          <div className="d-flex">
            <div className="toast-body">{toast.message}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={() => setToast({ show: false, message: "", type: "success" })}
            ></button>
          </div>
        </div>
      )}
    </div>
  )
}
