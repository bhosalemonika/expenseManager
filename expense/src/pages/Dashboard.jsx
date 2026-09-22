import AppShell from "../components/AppShell";
import StatCard from "../components/Dashboard/StatCard";
import SpendingChart from "../components/Dashboard/SpendingChart";
import RecentTransactions from "../components/Dashboard/RecentTransactions";
import { defaultCategories, mergeCategories } from "../data/categoryData";
import { useExpenses } from "../hooks/useExpenses";
import { useUserStorage } from "../hooks/useUserStorage";
import "../css/Dashboard.css";

const editKey = "expense-manager-editing-expense";

function Dashboard({ setPage }) {
  const { expenses, removeExpense } = useExpenses();
  const [categories] = useUserStorage(
    "categories",
    defaultCategories,
  );
  const allCategories = mergeCategories(
    defaultCategories,
    categories,
    expenses.map((expense) => expense.category),
  );
  const visibleCategories = allCategories.slice(0, 4);

  function editExpense(expense) {
    localStorage.setItem(editKey, JSON.stringify(expense));
    setPage("expense");
  }

  return (
    <AppShell page="dashboard" setPage={setPage}>
      <div className="dashboard-page">
        <div className="page-heading">
        </div>
        <div className="stat-grid">
          {visibleCategories.map((category) => (
            <StatCard key={category.name} category={category} expenses={expenses} />
          ))}
        </div>
        <SpendingChart expenses={expenses} />
        <RecentTransactions
          categories={allCategories}
          expenses={expenses}
          onEdit={editExpense}
          onRemove={removeExpense}
          onViewAll={() => setPage("transactions")}
        />
      </div>
    </AppShell>
  );
}

export default Dashboard;
