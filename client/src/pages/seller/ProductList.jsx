import { useState, useEffect, useMemo, useCallback } from "react";
import { formatVND } from "../../utils/currency";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import { getImageUrl } from "../../utils/config";

// --- 1. ProductEditModal Component ---
const ProductEditModal = ({ product, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    offerPrice: 0,
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Effect to load product data when modal opens
  useEffect(() => {
    if (product && isOpen) {
      setFormData({
        name: product.name,
        category: product.category,
        offerPrice: product.offerPrice,
      });
      setImageFile(null); // Reset file state
      setPreviewUrl(getImageUrl(product.image[0])); // Set current image preview
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create local URL for preview
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare data for the API call (using FormData for file upload support)
    const updateData = new FormData();
    updateData.append("name", formData.name);
    updateData.append("category", formData.category);
    updateData.append("offerPrice", formData.offerPrice);
    
    if (imageFile) {
      updateData.append("image", imageFile);
    }
    
    onSave(product._id, updateData);
  };

  // Simple Modal Backdrop and Structure (using basic Tailwind classes)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100">
        
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">Edit Product: {product.name}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl leading-none">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Image Section */}
          <div className="flex flex-col items-center space-y-3">
            <img 
              src={previewUrl || getImageUrl(product.image[0])} 
              alt="Product Preview" 
              className="w-32 h-32 object-cover rounded-lg border border-gray-200 shadow-md"
            />
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                <input 
                    type="file" 
                    onChange={handleImageChange} 
                    className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-primary file:text-white
                                hover:file:bg-primary/90 cursor-pointer"
                />
                {imageFile && <p className="text-xs text-gray-500 mt-1">New file selected: {imageFile.name}</p>}
                {!imageFile && <p className="text-xs text-gray-500 mt-1">Keep the input empty to retain the current image.</p>}
            </div>
          </div>
          
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Category Input */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Price Input */}
          <div>
            <label htmlFor="offerPrice" className="block text-sm font-medium text-gray-700">Offer Price (VND)</label>
            <input
              type="number"
              id="offerPrice"
              name="offerPrice"
              value={formData.offerPrice}
              onChange={handleChange}
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="flex justify-end pt-4 space-x-3 border-t mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition shadow"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// --- 2. ProductList Main Component ---
const ProductList = () => {
  const { products, fetchProducts, axios } = useAppContext();
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!query) return products;
    return products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  }, [products, query]);

  // Handlers for Modal Control
  const openEditModal = useCallback((product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const closeEditModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }, []);

  // Save function passed to the Modal
  const handleSave = async (id, updateData) => {
    try {
      // Note: updateData is already a FormData object passed from the modal
      const { data } = await axios.put(`/api/product/update/${id}`, updateData, {
        headers: {
          // Axios automatically sets boundary for FormData, but explicitly setting content-type is sometimes safer
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (data.success) {
        toast.success("Product updated successfully!");
        closeEditModal();
        fetchProducts(); // Refresh list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed. Check console for details.");
      console.error(error);
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
    <>
      <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Product List ({filteredProducts.length})</h1>
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-64 px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-primary"
          />
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
                    <img src={getImageUrl(product.image[0])} alt={product.name} className="w-12 h-12 rounded-md object-cover"/>
                    <span className="font-medium">{product.name}</span>
                  </td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">{formatVND(product.offerPrice)}</td>
                  <td className="px-6 py-4 text-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input onChange={() => toggleStock(product._id, product.inStock)} checked={product.inStock} type="checkbox" className="sr-only peer"/>
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-full"></div>
                    </label>
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button onClick={() => openEditModal(product)} className="font-medium text-blue-500 hover:underline">Edit</button>
                    <button onClick={() => deleteProduct(product._id)} className="font-medium text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredProducts.length === 0 && <p className="text-center text-text-muted py-10">No products found.</p>}
      </div>
      
      {/* Modal Component */}
      <ProductEditModal 
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={closeEditModal}
        onSave={handleSave}
      />
    </>
  );
};

export default ProductList;