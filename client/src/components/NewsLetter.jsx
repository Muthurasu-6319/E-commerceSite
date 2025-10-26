const NewsLetter = () => {
  return (
    <section className="my-16 py-12 bg-background-alt rounded-2xl border border-border">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-text-header">
          Get Exclusive Offers
        </h2>
        <p className="text-base text-text-muted mt-2 mb-8">
          Subscribe to our newsletter for flavorful updates and special discounts delivered to your inbox.
        </p>

        <form
          className="flex flex-col sm:flex-row items-center max-w-lg mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            required
            aria-label="Email Address"
            placeholder="Enter your email address"
            className="flex-1 w-full px-5 py-3 text-base border border-gray-300 rounded-full sm:rounded-r-none outline-none focus:ring-2 focus:ring-primary transition-shadow"
          />
          <button
            type="submit"
            className="w-full sm:w-auto mt-2 sm:mt-0 bg-primary text-white px-6 py-3 text-base font-bold rounded-full sm:rounded-l-none hover:bg-primary-dark transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;