import { categories } from "../assets/images/assets";
import { useAppContext } from "../context/AppContext";

const Category = () => {
  const { navigate } = useAppContext();

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-text-header">
          Explore Our Range
        </h2>
        <p className="text-base text-text-muted mt-2">
          Handpicked ingredients, crafted with care.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-5">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group cursor-pointer flex flex-col items-center justify-start text-center"
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              window.scrollTo(0, 0);
            }}
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-3 rounded-full bg-background-alt border-2 border-transparent group-hover:border-accent-dark transition-all duration-300 p-2">
              <img
                src={category.image}
                alt={category.text}
                className="max-h-full max-w-full object-contain transform transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <p className="text-sm sm:text-base font-semibold text-text-header group-hover:text-primary transition-colors">
              {category.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;