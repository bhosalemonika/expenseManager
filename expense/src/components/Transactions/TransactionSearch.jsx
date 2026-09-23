import '../../css/TransactionSearch.css'

function TransactionSearch({ value, onChange }) {
  return (
    <input
      className="transaction-search"
      placeholder="⌕   Search merchant or note"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}

export default TransactionSearch
