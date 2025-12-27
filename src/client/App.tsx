import { useEffect, useRef, useState } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import "../index.css";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  createdAt: string;
  isActive: boolean;
  tags: string[];
};

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setFiltered(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setFiltered(
        search
          ? products.filter(p =>
              p.name.toLowerCase().includes(search.toLowerCase())
            )
          : products
      );
    }, 400);
    return () => clearTimeout(t);
  }, [search, products]);

  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showForm]);

  const saveProduct = (p: Product) => {
    setProducts(prev =>
      prev.some(x => x.id === p.id)
        ? prev.map(x => (x.id === p.id ? p : x))
        : [...prev, p]
    );
    setEditing(null);
    setShowForm(false);
  };

  if (loading) return <p className="loading">Loading…</p>;

  return (
    <div className="app-container">
      <h2>Product Management</h2>

      <div className="search-row">
        <input
          placeholder="Search products…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button>Search</button>
      </div>

      <ProductList
        products={filtered}
        onEdit={p => {
          setEditing(p);
          setShowForm(true);
        }}
      />

      <div className="add-section">
        <button
          className="add-btn"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          + Add Product
        </button>
      </div>

      {showForm && (
        <div ref={formRef}>
          <ProductForm
            editing={editing}
            onSave={saveProduct}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}
    </div>
  );
}
