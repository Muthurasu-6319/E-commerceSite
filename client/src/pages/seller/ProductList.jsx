import { useState, useEffect, useMemo } from "react";
import { formatVND } from "../../utils/currency";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import { getImageUrl } from "../../utils/config";

const ProductList = () => {
  const { products, fetchProducts, axios } = useAppContext();
  const [query, setQuery] = useState("");
  // --- RE-ADDED: State for editing ---
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => { fetchProducts() }, []);

  const filteredProducts = useMemo(() => {
    if (!query) return products;
    return products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  }, [products, query]);

  const startEdit = (product) => {
    setEditingProduct(product._id);
    setFormData({
      name: product.name,
      category: product.category,
      offerPrice: product.offerPrice
    });
  };
  
  const saveEdit = async (id) => {
    try {
      const { data } = await axios.put(`/api/product/update/${id}`, formData);
      if (data.success) {
        toast.success("Product updated!");
        setEditingProduct(null);
        fetchProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed.");
    }
  };
  
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product permanently?")) return;
    try {
      const { data } = await axios.delete(`/api/product/${id}`);
      if (data.success) {
        toast.success("Product deleted.");
        fetchProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed.");
    }
  };

  const toggleStock = async (productId, currentStock) => {
    try {
      const { data } = await axios.post("/api/product/stock", { productId, inStock: !currentStock });
      if (data.success) {
        toast.success("Stock status updated.");
        fetchProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update stock.");
    }
  };

  return (
    <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Product List ({filteredProducts.length})</h1>
        <input type="text" placeholder="Search..." value={query} onChange={e => setQuery(e.target.value)} className="w-64 px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-primary"/>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs text-text-muted uppercase bg-light-green">
            <tr>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3 text-center">In Stock</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center gap-3">
                  <img src={getImageUrl(product.image[0])} alt={product.name} className="w-12 h-12 rounded-md"/>
                  {editingProduct === product._id ? (
                    <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="border p-1 rounded"/>
                  ) : (
                    <span className="font-medium">{product.name}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingProduct === product._id ? (
                    <input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="border p-1 rounded"/>
                  ) : (
                    product.category
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingProduct === product._id ? (
                    <input type="number" value={formData.offerPrice} onChange={e => setFormData({...formData, offerPrice: e.target.value})} className="border p-1 rounded w-24"/>
                  ) : (
                    formatVND(product.offerPrice)
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input onChange={() => toggleStock(product._id, product.inStock)} checked={product.inStock} type="checkbox" className="sr-only peer"/>
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-full"></div>
                  </label>
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  {editingProduct === product._id ? (
                    <>
                      <button onClick={() => saveEdit(product._id)} className="font-medium text-primary hover:underline">Save</button>
                      <button onClick={() => setEditingProduct(null)} className="font-medium text-gray-500 hover:underline">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(product)} className="font-medium text-blue-500 hover:underline">Edit</button>
                      <button onClick={() => deleteProduct(product._id)} className="font-medium text-red-500 hover:underline">Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredProducts.length === 0 && <p className="text-center text-text-muted py-10">No products found.</p>}
    </div>
  );
};

export default ProductList;