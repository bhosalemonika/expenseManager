
import { useUserStorage } from "./useUserStorage";

export function useExpenses() {
  const [expenses, setExpenses] = useUserStorage(
    "expenses",
  );

  function addExpense(expense) {
    setExpenses((current) => [
      { ...expense, id: Date.now(), date: new Date().toISOString().slice(0, 10) },
      ...current,
    ]);
  }

  function updateExpense(updatedExpense) {
    setExpenses((current) =>
      current.map((expense) =>
        expense.id === updatedExpense.id
          ? { ...expense, ...updatedExpense, amount: Number(updatedExpense.amount) }
          : expense,
      ),
    );
  }

  function removeExpense(id) {
    setExpenses((current) => current.filter((expense) => expense.id !== id));
  }

  return { expenses, addExpense, updateExpense, removeExpense };
}

