import { assets } from "../assets/images/assets";
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
      className="group bg-background-alt border border-border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 w-full mx-auto cursor-pointer flex flex-col overflow-hidden"
    >
      {/* Product Image */}
      <div className="relative w-full h-48 sm:h-56 overflow-hidden">
        <img
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={getImageUrl(product.image[0])}
          alt={product.name}
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
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
          <div className="flex flex-col">
            <p className="text-gray-400 text-sm line-through">{formatVND(product.price)}</p>
            <p className="text-primary text-lg font-bold">
              {formatVND(product.offerPrice)}
            </p>
          </div>

          <div onClick={handleCartInteraction}>
            {itemQuantity === 0 ? (
              <button
                onClick={() => addToCart(product._id)}
                className="flex items-center justify-center w-10 h-10 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Add to cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-primary text-white rounded-full h-10 px-2">
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="w-6 h-6 flex items-center justify-center text-lg font-bold"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="text-sm font-bold w-4 text-center">{itemQuantity}</span>
                <button
                  onClick={() => addToCart(product._id)}
                  className="w-6 h-6 flex items-center justify-center text-lg font-bold"
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