import { useState } from "react"
import { useCart } from "../context/CartContext"

export default function ProductCard({ product, onAddedToCart }) {
  const { addToCart } = useCart()
  const [showModal, setShowModal] = useState(false)

  const handleAdd = () => {
    addToCart(product)
    if (onAddedToCart) onAddedToCart(product.title)
  }

  const isNew =
    Date.now() - new Date(product.date).getTime() < 20 * 60 * 1000

  return (
    <>
      {/* CARD */}
      <div
        className="card h-100 shadow-sm position-relative"
        style={{ cursor: "pointer" }}
        onClick={() => setShowModal(true)}
      >
        {isNew && (
          <span
            className="badge bg-danger position-absolute top-0 start-0 m-2"
            style={{ fontSize: "0.8rem" }}
          >
            NEW
          </span>
        )}
        {product.image && (
          <img
            src={product.image}
            alt={product.title}
            className="card-img-top bg-white"
            style={{ height: "200px", objectFit: "contain" }}
          />
        )}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text text-muted flex-fill">
            {product.description?.slice(0, 60)}...
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold text-success">{product.price} lei</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleAdd()
              }}
              className="btn btn-outline-success btn-sm"
            >
              Adauga in cos
            </button>
          </div>
        </div>
      </div>

      {/* MODAL detalii */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.7)" }}
          tabIndex="-1"
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{product.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body d-flex flex-column flex-md-row gap-3">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="img-fluid rounded"
                    style={{ maxWidth: "50%" }}
                  />
                )}
                <div>
                  <p>{product.description}</p>
                  <h5 className="text-success">{product.price} lei</h5>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    handleAdd()
                    setShowModal(false)
                  }}
                >
                  Adauga in cos
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Inchide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
