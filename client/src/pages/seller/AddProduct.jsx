import { assets, categories } from "../../assets/images/assets";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const { axios } = useContext(AppContext);

  const [files, setFiles] = useState(Array(4).fill(null));
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  // --- RE-ADDED: State for dynamic categories ---
  const [catList, setCatList] = useState(categories.map((c) => c.path));
  const [addingCat, setAddingCat] = useState(false);
  const [newCat, setNewCat] = useState("");
  const [catLoading, setCatLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedImages = files.filter(Boolean);
    if (selectedImages.length === 0) {
      return toast.error("Please upload at least one product image.");
    }
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("description", description.trim());
    formData.append("category", category);
    formData.append("price", price);
    formData.append("offerPrice", offerPrice);
    selectedImages.forEach(file => formData.append("image", file));

    try {
      const { data } = await axios.post("/api/product/add-product", formData, { headers: { "Content-Type": "multipart/form-data" } });
      if (data.success) {
        toast.success("Product added successfully!");
        setName(""); setDescription(""); setCategory(""); setPrice(""); setOfferPrice(""); setFiles(Array(4).fill(null));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product.");
    }
  };

  // --- RE-ADDED: Function to add a new category ---
  const addCategory = async () => {
    if (!newCat.trim()) return toast.error("Category name cannot be empty.");
    setCatLoading(true);
    // This is a simplified local-only add. A real app would have a POST /api/category
    setTimeout(() => {
      const formattedCat = newCat.trim();
      if (!catList.includes(formattedCat)) {
        setCatList(prev => [...prev, formattedCat]);
        setCategory(formattedCat);
        toast.success(`Category "${formattedCat}" added.`);
      } else {
        toast.error("Category already exists.");
      }
      setNewCat("");
      setAddingCat(false);
      setCatLoading(false);
    }, 500);
  };

  return (
    <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
      <h1 className="text-xl font-bold text-text-header mb-6">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
        <div>
          <p className="text-base font-medium mb-2">Product Images (up to 4)</p>
          <div className="flex flex-wrap items-center gap-3">
            {files.map((file, index) => (
              <label key={index} htmlFor={`image${index}`} className="cursor-pointer">
                <input onChange={(e) => { const updatedFiles = [...files]; updatedFiles[index] = e.target.files[0]; setFiles(updatedFiles); }} accept="image/*" type="file" id={`image${index}`} hidden />
                <img className="w-24 h-24 object-cover rounded-md border-2 border-dashed border-border hover:border-primary" src={file ? URL.createObjectURL(file) : assets.upload_area} alt="upload" />
              </label>
            ))}
          </div>
        </div>
        
        <InputField label="Product Name" id="product-name" value={name} onChange={(e) => setName(e.target.value)} required />
        <InputField label="Product Description" id="product-description" as="textarea" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write about the product..." />

        {/* --- RE-ADDED: Dynamic Category Field --- */}
        <div>
          <label className="text-base font-medium" htmlFor="category">Category</label>
          <div className="flex items-center gap-2 mt-1">
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full outline-none p-2.5 rounded border border-border focus:ring-2 focus:ring-primary" required>
              <option value="">Select Category</option>
              {catList.map((c, index) => <option value={c} key={index}>{c}</option>)}
            </select>
            <button type="button" onClick={() => setAddingCat(s => !s)} className="px-4 py-2 rounded-md border border-border text-sm hover:bg-light-green whitespace-nowrap">
              {addingCat ? "Cancel" : "+ Add"}
            </button>
          </div>
          {addingCat && (
            <div className="mt-2 flex items-center gap-2">
              <input type="text" value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="New category name" className="w-full outline-none p-2.5 rounded border border-border focus:ring-2 focus:ring-primary" />
              <button type="button" onClick={addCategory} disabled={catLoading} className="px-4 py-2.5 rounded-md bg-primary text-white text-sm disabled:opacity-60 whitespace-nowrap">
                {catLoading ? "Saving..." : "Save"}
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <InputField label="Product Price" id="product-price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="₹0" required />
          <InputField label="Offer Price" id="offer-price" type="number" value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} placeholder="₹0" required />
        </div>
        <button type="submit" className="px-8 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors">ADD PRODUCT</button>
      </form>
    </div>
  );
};

const InputField = ({ as: Component = 'input', label, id, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-base font-medium" htmlFor={id}>{label}</label>
    <Component id={id} className="mt-1 w-full outline-none p-2.5 rounded border border-border focus:ring-2 focus:ring-primary" {...props} />
  </div>
);

export default AddProduct;