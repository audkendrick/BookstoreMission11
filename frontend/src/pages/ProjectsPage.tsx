import CartSummary from "../components/CartSummary";
import CategoryFilter from "../components/CategoryFilter";
import ProjectList from "../components/ProjectList";
import { useState } from "react";
import WelcomeBand from "../components/WelcomeBanner";

function ProjectsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(30); // Default max price

  return (
    <div className="container mt-4">
      <CartSummary />
      <WelcomeBand />
      <div className="row">
        <div className="col-md-3">
          <h5>Filter by Category</h5>
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
          {/* Price Filter */}
          <div className="mt-4">
            <h5>Filter by Price</h5>
            <label htmlFor="priceRange" className="form-label">
              Max Price: ${maxPrice}
            </label>
            <input
              type="range"
              className="form-range"
              id="priceRange"
              min="0"
              max="30"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="col-md-9">
          <ProjectList
            selectedCategories={selectedCategories}
            maxPrice={maxPrice}
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;
