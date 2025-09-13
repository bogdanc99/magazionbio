import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { ThemeProvider, useTheme } from "./context/ThemeContext"
import { CartProvider, useCart } from "./context/CartContext"
import { ProductsProvider } from "./context/ProductsContext"
import IndexPage from "./pages/IndexPage"
import AdminPage from "./pages/AdminPage"
import CartPage from "./pages/CartPage"

function Navbar() {
  const { cart } = useCart()
  const { theme, setTheme } = useTheme()

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm px-3">
      <Link className="navbar-brand fw-bold text-success d-flex align-items-center" to="/">
        <i className="bi bi-flower3 me-2"></i> Magazin Bio
      </Link>
      <div className="collapse navbar-collapse show">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link text-success fw-semibold" to="/">
              Produse
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link text-success fw-semibold" href="/admin">
              Admin
            </a>
          </li>
        </ul>
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <i className="bi bi-moon"></i> : <i className="bi bi-sun"></i>}
          </button>
          <Link className="btn btn-success text-white position-relative" to="/cart">
            <i className="bi bi-cart"></i> Cos
            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="bg-success text-white mt-auto pt-5">
      <div className="container">
        <div className="row text-center text-md-start">
          <div className="col-md-4 mb-3">
            <h5>Despre noi</h5>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque aperiam inventore ullam voluptatibus. Aliquid ab repudiandae ipsam quibusdam
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Link-uri rapide</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">Acasa</a></li>
              <li><a href="#produse" className="text-white text-decoration-none">Produse</a></li>
              <li><a href="/admin" className="text-white text-decoration-none">Admin</a></li>
      
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Contact</h5>
            <p>Email: contact@itschool.ro</p>
            <p>Telefon: +40 123 456 789</p>
            <p>Adresa: Bucuresti, Romania</p>
          </div>
        </div>
        <hr className="border-light" />
        <div className="text-center pb-3">
          <small>© 2025 Magazin Bio</small>
        </div>
      </div>
    </footer>
  )
}


export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <ProductsProvider>
          <Router>
            <div className="d-flex flex-column min-vh-100">
              <Navbar />
              <main className="flex-fill pb-5">
                <Routes>
                  <Route path="/" element={<IndexPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/cart" element={<CartPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </ProductsProvider>
      </CartProvider>
    </ThemeProvider>
  )
}
