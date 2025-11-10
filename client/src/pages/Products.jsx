import { useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/AppContext.jsx";

const Products = () => {
  const { products, searchQuery } = useAppContext();
  
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category || 'Uncategorized'))];
    return ['All', ...uniqueCategories.sort()];
  }, [products]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('featured'); // New state for sorting

  // Main logic for filtering and sorting
  const filteredAndSortedProducts = useMemo(() => {
    let list = products.filter(p => p.inStock);

    // 1. Filter by Category
    if (selectedCategory !== 'All') {
      list = list.filter(p => p.category === selectedCategory);
    }

    // 2. Filter by Search Query
    if (searchQuery) {
      list = list.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // 3. Sort the list
    switch (sortOption) {
      case 'price-asc':
        list.sort((a, b) => a.offerPrice - b.offerPrice);
        break;
      case 'price-desc':
        list.sort((a, b) => b.offerPrice - a.offerPrice);
        break;
      case 'name-asc':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default: // 'featured' or any other case
        // You can add a specific logic for featured products later
        break;
    }

    return list;
  }, [products, searchQuery, selectedCategory, sortOption]);

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-header mb-4">
            Shop Fresh & Organic
          </h1>
          <p className="text-lg text-text-body max-w-3xl mx-auto">
            Discover our wide range of authentic grocery products.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Left Sidebar: Filters */}
          <aside className="lg:col-span-1 bg-surface p-6 rounded-xl shadow-md border border-border h-fit sticky top-24">
            <h2 className="text-xl font-bold text-text-header mb-4 border-b pb-2">Filters</h2>
            
            {/* Category Filter */}
            <div className="mb-6">
                <h3 className="font-semibold text-text-header mb-3">Categories</h3>
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category}>
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-4 py-2 rounded-md transition-colors text-base ${
                          selectedCategory === category
                            ? 'bg-primary text-white font-semibold'
                            : 'text-text-body hover:bg-light-green'
                        }`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
            </div>
          </aside>
          
          {/* Right Side: Products Grid */}
          <main className="lg:col-span-3">
            {/* Toolbar: Product Count and Sorting Dropdown */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 bg-surface rounded-lg border border-border">
                <p className="text-text-muted font-medium">
                    Showing <span className="text-text-header font-bold">{filteredAndSortedProducts.length}</span> products
                </p>
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="mt-2 sm:mt-0 border border-border p-2 rounded-md text-sm outline-none focus:ring-2 focus:ring-primary"
                >
                    <option value="featured">Sort by: Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                </select>
            </div>
            
            {/* Products Grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-surface rounded-lg border border-border">
                <h3 className="text-xl font-semibold text-text-header">No Products Found</h3>
                <p className="text-text-muted mt-2">Try adjusting your filters or search query.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;