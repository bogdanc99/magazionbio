import { useCart } from "../context/CartContext"

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart()
  const total = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
    0
  )

  return (
    <div className="container py-5">
      <h2 className="mb-4">Cosul de cumparaturi</h2>
      {cart.length === 0 ? (
        <p>Cosul este gol.</p>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            <ul className="list-group mb-3">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center gap-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
                        className="rounded"
                      />
                    )}
                    <div>
                      <div className="fw-semibold">{item.title}</div>
                      <div className="text-success">
                        {Number(item.price).toFixed(2)} lei
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      style={{ width: "80px" }}
                      value={item.quantity || 1}
                      onChange={(e) => updateQuantity(item.id, e.target.value)}
                    />
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Sterge
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total</h5>
                <p className="card-text fs-4 fw-bold">{total.toFixed(2)} lei</p>
                <button className="btn btn-outline-danger w-100 mb-2" onClick={clearCart}>
                  Goleste cosul
                </button>
                <button className="btn btn-success w-100">Finalizeaza comanda</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
