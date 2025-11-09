import { useAppContext } from "../context/AppContext";
import { formatVND } from "../utils/currency";
import { getImageUrl } from "../utils/config";

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, cartItems, navigate } = useAppContext();

  if (!product) return null;

  const handleCardClick = () => {
    navigate(`/product/${product.category.toLowerCase()}/${product._id}`);
    window.scrollTo(0, 0);
  };

  const handleCartInteraction = (e) => {
    e.stopPropagation(); // Prevent card click when interacting with cart buttons
  };

  const itemQuantity = cartItems?.[product._id] || 0;

  return (
    <div
      onClick={handleCardClick}
      className="group bg-surface border border-border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 w-full mx-auto cursor-pointer flex flex-col overflow-hidden"
    >
      {/* Product Image */}
      <div className="relative w-full h-48 sm:h-56 overflow-hidden">
        <img
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={getImageUrl(product.image[0])}
          alt={product.name}
          loading="lazy"
        />
        {/* Restyled Discount Badge */}
        <div className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full">
          - {Math.round(((product.price - product.offerPrice) / product.price) * 100)}%
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <p className="text-text-muted text-xs uppercase tracking-wide">{product.category}</p>
          <h3 className="font-bold text-text-header text-base truncate mt-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="mt-4 flex items-end justify-between">
          {/* Price Section */}
          <div className="flex flex-col">
            <p className="text-text-muted text-sm line-through">{formatVND(product.price)}</p>
            <p className="text-primary text-lg font-bold">
              {formatVND(product.offerPrice)}
            </p>
          </div>

          {/* Add to Cart / Quantity Counter */}
          <div onClick={handleCartInteraction}>
            {itemQuantity === 0 ? (
              // New "Add" button for better user experience
              <button
                onClick={() => addToCart(product._id)}
                className="px-5 py-2 bg-accent text-white text-sm font-bold rounded-full hover:bg-accent-dark transition-colors"
                aria-label="Add to cart"
              >
                Add
              </button>
            ) : (
              // Restyled Quantity Counter
              <div className="flex items-center gap-2 bg-primary text-white rounded-full h-10 px-2 shadow-sm">
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="w-7 h-7 flex items-center justify-center text-lg font-bold rounded-full hover:bg-primary-dark transition-colors"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="text-sm font-bold w-4 text-center">{itemQuantity}</span>
                <button
                  onClick={() => addToCart(product._id)}
                  className="w-7 h-7 flex items-center justify-center text-lg font-bold rounded-full hover:bg-primary-dark transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;