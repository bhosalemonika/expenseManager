import {
  actionIcons,
  getCategoryIconSrc,
  getCategoryName,
} from "../../data/categoryData";
import { formatMoney } from "../../data/settingsData";
import { useSettings } from "../../hooks/useSettings";
import "../../css/ExpenseTable.css";

function getCategoryClass(category) {
  if (category === "Food & Dining") return "food";
  if (category === "Education") return "education";
  if (category === "Income") return "income-category";
  if (category === "Housing") return "housing";
  if (category === "Groceries") return "groceries";
  if (category === "Entertainment") return "entertainment";
  if (category === "Transport") return "transport";
  if (category === "Shopping") return "shopping";

  return "default-category";
}

function ExpenseTable({ categories = [], expenses, onRemove, onEdit }) {
  const [settings] = useSettings();

  return (
    <div className="table-wrap">
      <table className="expense-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Merchant / Details</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => {
            const categoryDetails = categories.find(
              (category) =>
                getCategoryName(category).toLowerCase() ===
                expense.category.toLowerCase(),
            );

            return (
              <tr key={expense.id}>
                <td>{expense.date}</td>

                <td>
                  <div className="merchant-cell">
                    <img
                      src={getCategoryIconSrc(
                        categoryDetails || expense.category,
                      )}
                      alt=""
                    />

                    <b>{expense.title}</b>
                  </div>
                </td>

                <td>
                  <span
                    className={`category-cell ${getCategoryClass(expense.category)}`}
                  >
                    {expense.category}
                  </span>
                </td>

                <td className={expense.income ? "income" : "expense-amount"}>
                  {expense.income ? "+" : "-"}
                  {formatMoney(expense.amount, settings.currency)}
                </td>

                <td>
                  <div className="action-buttons">
                    {onEdit && (
                      <button
                        type="button"
                        className="icon-button"
                        onClick={() => onEdit(expense)}
                        aria-label={`Edit ${expense.title}`}
                      >
                        <img src={actionIcons.edit} alt="Edit" />
                      </button>
                    )}

                    {onRemove && (
                      <button
                        type="button"
                        className="icon-button"
                        onClick={() => onRemove(expense.id)}
                        aria-label={`Delete ${expense.title}`}
                      >
                        <img src={actionIcons.delete} alt="Delete" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;
