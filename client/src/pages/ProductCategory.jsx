import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { useMemo } from "react";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  // Filter products based on category from URL
  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) => product.inStock && product.category.toLowerCase() === category.toLowerCase()
    );
  }, [products, category]);
  
  // Capitalize the first letter of the category for the title
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="py-16 md:py-24">
       <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-header mb-4">
            {categoryTitle}
          </h1>
          <p className="text-lg text-text-body max-w-3xl mx-auto">
            Explore our curated selection of {categoryTitle.toLowerCase()}.
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-background-alt rounded-lg border border-border">
            <h3 className="text-xl font-semibold text-text-header">No Products Found</h3>
            <p className="text-text-muted mt-2">There are currently no products available in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCategory;