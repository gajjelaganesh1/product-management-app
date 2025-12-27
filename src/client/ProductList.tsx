import { useState } from "react";
import { Product } from "./App";

type Props = {
  products: Product[];
  onEdit: (p: Product) => void;
};

export default function ProductList({ products, onEdit }: Props) {
  const [view, setView] = useState<"list" | "grid">("list");

  return (
    <div className="list-section">
      <div className="list-header">
        <h3>Products</h3>
        <button onClick={() => setView(view === "list" ? "grid" : "list")}>
          {view === "list" ? "Grid View" : "Table View"}
        </button>
      </div>

      {view === "list" ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.category}</td>
                <td>{p.stock}</td>
                <td>
                  <button onClick={() => onEdit(p)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="card-grid">
          {products.map(p => (
            <div key={p.id} className="product-card">
              <strong>{p.name}</strong>
              <p>₹{p.price}</p>
              <p>{p.category}</p>
              <button onClick={() => onEdit(p)}>Edit</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
