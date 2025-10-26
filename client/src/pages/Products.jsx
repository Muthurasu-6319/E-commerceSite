import { useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/AppContext.jsx";

const Products = () => {
  const { products, searchQuery } = useAppContext();
  
  // Memoize categories to prevent recalculation on every render
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category || 'Uncategorized'))];
    return ['All', ...uniqueCategories.sort()];
  }, [products]);

  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter products based on category and search query
  const filteredProducts = useMemo(() => {
    let list = products.filter(p => p.inStock);

    if (selectedCategory !== 'All') {
      list = list.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      list = list.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    return list;
  }, [products, searchQuery, selectedCategory]);

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-header mb-4">
            Our Products
          </h1>
          <p className="text-lg text-text-body max-w-3xl mx-auto">
            Browse our collection of authentic, homemade spices and health mixes.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 lg:w-72">
            <h2 className="text-xl font-bold text-text-header mb-4">Categories</h2>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category}>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors text-base ${
                      selectedCategory === category
                        ? 'bg-primary text-white font-semibold'
                        : 'text-text-body hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
          
          {/* Products Grid */}
          <main className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-background-alt rounded-lg border border-border">
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