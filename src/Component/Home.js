import { useState, useEffect } from "react";

function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  // fetch the products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://www.omdbapi.com/?apikey=4236b4f6&s=movie"
        );
        const data = await response.json();
        console.log(data);

        if (data.Response === "True") {
          // data.Search holds an array of movie objects
          setProducts(data.Search);
        } else {
          setError(data.Error);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching the products from the backend", error);
        setError("Failed to fetch products.");
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Movies</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.imdbID}
            className="border rounded p-4 text-white hover:shadow-[0_2px_35px_rgba(0,0,0,9.8)] cursor-pointer"
          >
            <h3 className="text-xl mb-2">{product.Title}</h3>
            {product.Poster && product.Poster !== "N/A" && (
              <img
                src={product.Poster}
                alt={product.Title}
                className="w-full h-auto "
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
