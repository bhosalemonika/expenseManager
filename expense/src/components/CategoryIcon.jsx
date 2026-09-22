import '../css/CategoryIcon.css'

function CategoryIcon({ icon, selected, onSelect }) {
  return (
    <button
      type="button"
      className={selected ? "category-icon selected" : "category-icon"}
      onClick={() => onSelect(icon.id)}
      aria-label={`Choose ${icon.label} icon`}
    >
      <img src={icon.src} alt="" />
    </button>
  );
}

export default CategoryIcon;
