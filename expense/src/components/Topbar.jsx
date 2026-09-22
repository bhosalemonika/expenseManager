import { actionIcons } from "../data/categoryData";
import searchIcon from "../assets/icon/searchIcon.png";
import "../css/Topbar.css";

function Topbar({ onSearch }) {
  return (
    <header className="topbar">
      <div className="search-box">
        <img src={searchIcon} alt="" />
        <input
          aria-label="Search"
          placeholder="Search transactions, categories..."
          onChange={(event) => onSearch?.(event.target.value)}
        />
      </div>
      <div className="topbar-actions">
        <img src={actionIcons.notification} alt="Notifications" className="not-icon"/>
        <img className="avatar" src={actionIcons.profile} alt="" />
      </div>
    </header>
  );
}

export default Topbar;
