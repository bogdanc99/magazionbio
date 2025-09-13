import { useState } from "react"

export default function ProductItem({ product, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(product.title)
  const [price, setPrice] = useState(product.price)

  const handleSave = () => {
    if (!title.trim() || !price) return
    onEdit(product.id, { ...product, title, price })
    setIsEditing(false)
  }

  return (
    <div className="list-group-item d-flex justify-content-between align-items-center">
      {isEditing ? (
        <div className="d-flex gap-2 w-100">
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      ) : (
        <>
          <div>
            <h6 className="mb-1">{product.title}</h6>
            <small>${product.price}</small>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-warning btn-sm"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(product.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  )
}
