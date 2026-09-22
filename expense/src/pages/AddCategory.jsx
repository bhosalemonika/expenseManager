import AppShell from "../components/AppShell";
import CategoryForm from "../components/AddCategory/CategoryForm";
import { defaultCategories, getCategoryName } from "../data/categoryData";
import { useUserStorage } from "../hooks/useUserStorage";
import "../css/AddCategory.css";

function AddCategory({ setPage }) {
  const [categories, setCategories] = useUserStorage(
    "categories",
    defaultCategories,
  );

  function handleSave(category) {
    setCategories((current) => {
      const categoryName = getCategoryName(category).toLowerCase();
      const currentCategories = Array.isArray(current) ? current : [];
      const withoutDuplicate = currentCategories.filter(
        (item) => getCategoryName(item).toLowerCase() !== categoryName,
      );

      return [...withoutDuplicate, category];
    });
    setPage("categories");
  }

  return (
    <AppShell page="categories" setPage={setPage}>
      <div className="add-category-page">
      <button
        className="back-link"
        type="button"
        onClick={() => setPage("categories")}
      >
        ← Back to Categories
      </button>
      <div className="category-heading">
        <h2>Add New Category</h2>
        <p>
          Define a new spending bucket to keep your scholarship and savings
          organized.
        </p>
      </div>
      <CategoryForm
        existingCategories={categories}
        onSave={handleSave}
        onCancel={() => setPage("categories")}
      />
      </div>
    </AppShell>
  );
}

export default AddCategory;
