import TransactionSearch from './TransactionSearch'
import '../../css/TransactionFilter.css'

function TransactionFilter({ search, onSearchChange, period, onPeriodChange, category, onCategoryChange, categories, onDownload }) {
  return (
    <div className="filter-row">
      <TransactionSearch value={search} onChange={onSearchChange} />
      <select value={period} onChange={(event) => onPeriodChange(event.target.value)}   className="period-select">
        <option value="all">All Time</option>
        <option value="30">Last 30 Days</option>
        <option value="90">Last 90 Days</option>
      </select>
      <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <button className="outline-button" onClick={onDownload}>⇩ Download CSV</button>
    </div>
  )
}

export default TransactionFilter
