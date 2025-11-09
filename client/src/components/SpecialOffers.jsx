import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";
import { useMemo } from "react";

const SpecialOffers = () => {
  const { products } = useAppContext();

  // Logic to find products with the biggest discount
  const offerProducts = useMemo(() => {
    return products
      .filter((product) => product.inStock && product.price > product.offerPrice)
      .sort((a, b) => {
        const discountA = (a.price - a.offerPrice) / a.price;
        const discountB = (b.price - b.offerPrice) / b.price;
        return discountB - discountA; // Sort by highest discount percentage
      })
      .slice(0, 5); // Show top 5 deals
  }, [products]);

  if (offerProducts.length === 0) {
    return null; // Don't show the section if there are no offers
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-text-header">
          Deals of the Week
        </h2>
        <p className="text-base text-text-muted mt-2">
          Grab these amazing offers before they're gone!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {offerProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;