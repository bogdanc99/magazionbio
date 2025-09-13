import { useState } from "react"
import { useProducts } from "../context/ProductsContext"
import ProductCard from "../components/ProductCard"

export default function IndexPage() {
  const { products, loading } = useProducts()
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState("newest")

  // Toast pentru cos
  const [toast, setToast] = useState({ show: false, message: "" })
  const showToast = (msg) => {
    setToast({ show: true, message: msg })
    setTimeout(() => setToast({ show: false, message: "" }), 3000)
  }

  // Formular contact
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [contactMsg, setContactMsg] = useState("")

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setContactMsg("Mesajul a fost trimis cu succes!")
    setForm({ name: "", email: "", message: "" })
    setTimeout(() => setContactMsg(""), 4000)
  }

  // Filtrare + sortare
  const filtered = products
    .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price
      if (sort === "high") return b.price - a.price
      if (sort === "newest") return new Date(b.date) - new Date(a.date)
      return 0
    })

  return (
    <div>
      {/* HERO */}
      <section
        className="hero d-flex flex-column justify-content-center align-items-center text-white text-center full-bleed"
        style={{
          minHeight: "100vh",
          backgroundImage:
            "url('https://biocorner.ro/blog/wp-content/uploads/2022/06/4.png')",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="bg-dark bg-opacity-50 p-4 rounded">
          <h1 className="display-3 fw-bold">Produse Bio</h1>
          <p className="lead">
            Produse naturale și ecologice, pentru o viață sănătoasă.
          </p>
          <a href="#produse" className="btn btn-success btn-lg mt-3">
            Vezi produsele
          </a>
        </div>
      </section>

      {/* BENEFICII */}
      <section className="py-5 bg-success text-white" id="beneficii">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-4">
              <i className="bi bi-apple fs-1 mb-3 d-block text-white"></i>
              <h5 className="fw-bold">Cele mai bune fructe</h5>
              <p>Recoltate direct din ferme bio certificate.</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-truck fs-1 mb-3 d-block"></i>
              <h5 className="fw-bold">Livrare rapida</h5>
              <p>Produsele ajung rapid, direct la tine acasa.</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-shield-check fs-1 mb-3 d-block"></i>
              <h5 className="fw-bold">Calitate garantata</h5>
              <p>Produse testate si certificate pentru siguranta ta.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUSE */}
      <section id="produse" className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Produse Bio</h2>
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Cauta produse..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <select
                className="form-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="newest">Cele mai noi</option>
                <option value="low">Pret: Mic → Mare</option>
                <option value="high">Pret: Mare → Mic</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p>Se incarca produsele...</p>
          ) : filtered.length === 0 ? (
            <p>Nu s-au gasit produse.</p>
          ) : (
            <div className="row g-4">
              {filtered.map((p) => (
                <div key={p.id} className="col-md-4">
                  <ProductCard product={p} onAddedToCart={showToast} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

     {/* CONTACT */}
<section id="contact" className="py-5 bg-light">
  <hr className="border-light" />
  <div className="container">
    <h2 className="mb-4 text-center">Contacteaza-ne</h2>
    <div className="row g-5">
      {/* Informatii contact */}
      <div className="col-md-5">
        <h5 className="fw-bold mb-3">Informatii utile</h5>
        <p><i className="bi bi-geo-alt-fill text-success"></i>Bucuresti, Romania</p>
        <p><i className="bi bi-telephone-fill text-success"></i> +40 712 345 678</p>
        <p><i className="bi bi-envelope-fill text-success"></i> contact@itschool.ro</p>
        <p><i className="bi bi-clock-fill text-success"></i> Luni - Vineri: 09:00 - 18:00</p>

        {/* Harta */}
        <div className="mt-4">
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.9637499277856!2d26.10253841553577!3d44.42676707910285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff471e1e7b65%3A0x2e2d94a5a1bb28e!2sBucuresti!5e0!3m2!1sen!2sro!4v1670000000000!5m2!1sen!2sro"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Formular contact */}
      <div className="col-md-7">
        <form onSubmit={handleContactSubmit} className="p-4 shadow rounded bg-white">
          <div className="mb-3">
            <label className="form-label">Nume</label>
            <input
              type="text"
              className="form-control"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mesaj</label>
            <textarea
              className="form-control"
              rows="5"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-success w-100">
            Trimite mesajul
          </button>
        </form>

        {contactMsg && (
          <div className="alert alert-success mt-3">{contactMsg}</div>
        )}
      </div>
    </div>
  </div>
</section>


      {/* Toast pentru cos */}
      {toast.show && (
        <div
          className="toast align-items-center text-bg-success border-0 show position-fixed bottom-0 end-0 m-3"
          role="alert"
        >
          <div className="d-flex">
            <div className="toast-body">{toast.message} adaugat in cos!</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={() => setToast({ show: false, message: "" })}
            ></button>
          </div>
        </div>
      )}
    </div>
  )
}
