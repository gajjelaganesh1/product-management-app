import { useEffect, useState } from "react";
import { Product } from "./App";

type Props = {
  editing: Product | null;
  onSave: (p: Product) => void;
  onCancel: () => void;
};

const empty: Product = {
  id: 0,
  name: "",
  price: 0,
  category: "",
  stock: 0,
  description: "",
  createdAt: "",
  isActive: true,
  tags: [],
};

export default function ProductForm({ editing, onSave, onCancel }: Props) {
  const [form, setForm] = useState<Product>(empty);

  useEffect(() => {
    setForm(editing ?? empty);
  }, [editing]);

  return (
    <div className="form-card">
      <h4>{editing ? "Edit Product" : "Add Product"}</h4>

      <input
        autoFocus
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={e => setForm({ ...form, price: +e.target.value })}
      />

      <input
        placeholder="Category"
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
      />

      <input
        type="number"
        placeholder="Stock"
        value={form.stock}
        onChange={e => setForm({ ...form, stock: +e.target.value })}
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />

      <div className="form-actions">
        <button
          onClick={() =>
            onSave({
              ...form,
              id: editing ? form.id : Date.now(),
              createdAt: editing
                ? form.createdAt
                : new Date().toISOString(),
            })
          }
        >
          Save
        </button>
        <button className="secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
