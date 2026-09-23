import { useState } from "react";
import AppShell from "../components/AppShell";
import {
  buildTransactionNotifications,
  defaultNotificationReads,
  getUnreadNotificationCount,
} from "../data/notificationsData";
import { formatMoney } from "../data/settingsData";
import { useExpenses } from "../hooks/useExpenses";
import { useSettings } from "../hooks/useSettings";
import { useUserStorage } from "../hooks/useUserStorage";
import "../css/Notifications.css";

function formatDate(date) {
  if (!date) return "--";
  const value = String(date).includes("T") ? date : `${date}T00:00:00`;
  const result = new Date(value);
  if (Number.isNaN(result.getTime())) {
    return date;
  }

  return `${result.getDate()}/${result.getMonth() + 1}/${result.getFullYear()}`;
}

function NotificationPage({ setPage }) {
  const { expenses } = useExpenses();
  const [settings] = useSettings();
  const [readNotifications, setReadNotifications] = useUserStorage(
    "notifications",
    defaultNotificationReads,
  );
  const [filter, setFilter] = useState("all");
  const activities = buildTransactionNotifications(expenses);
  const unreadCount = getUnreadNotificationCount(activities, readNotifications);

  const visibleActivities =
    filter === "unread"
      ? activities.filter((activity) => !readNotifications[activity.id])
      : activities;

  function markAsRead(id) {
    setReadNotifications({
      ...readNotifications,
      [id]: true,
    });
  }

  function markAllAsRead() {
    const allRead = {};

    activities.forEach((activity) => {
      allRead[activity.id] = true;
    });

    setReadNotifications(allRead);
  }

  return (
    <AppShell page="notifications" setPage={setPage}>
      <div className="notifications-page">
        <header className="notifications-heading">
          <div>
            <p className="notifications-kicker">Activity center</p>
            <h2>Notifications</h2>
            <p>Keep track of your latest expense activity.</p>
          </div>
          <button
            type="button"
            className="notifications-mark-all"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark all as read
          </button>
        </header>
        <section className="notification-summary-grid">
          <article className="notification-stat-card notification-stat-card-unread">
            <span className="notification-stat-icon notification-stat-icon-unread">
              !
            </span>
            <span>
              <strong>{unreadCount}</strong>
              <small>Unread updates</small>
            </span>
          </article>
          <article className="notification-stat-card">
            <span className="notification-stat-icon notification-stat-icon-recent">
              +
            </span>
            <span>
              <strong>{activities.length}</strong>
              <small>Recent activities</small>
            </span>
          </article>

          <article className="notification-status-card">
            <strong>You're all caught up faster.</strong>

            <p>Review your latest transaction activity here.</p>
          </article>
        </section>

        <section className="notification-activity-panel">
          <header className="notification-panel-head">
            <div>
              <h3>Recent activity</h3>

              <p>Latest updates from your account</p>
            </div>

            <div className="notification-filters">
              <button
                type="button"
                className={
                  filter === "all"
                    ? "notification-filter is-active"
                    : "notification-filter"
                }
                onClick={() => setFilter("all")}
              >
                All
              </button>

              <button
                type="button"
                className={
                  filter === "unread"
                    ? "notification-filter is-active"
                    : "notification-filter"
                }
                onClick={() => setFilter("unread")}
              >
                Unread
                <span className="notification-filter-badge">{unreadCount}</span>
              </button>
            </div>
          </header>

          {visibleActivities.length > 0 ? (
            <ul className="notification-list">
              {visibleActivities.map((activity) => {
                const isRead = Boolean(readNotifications[activity.id]);

                return (
                  <li
                    key={activity.id}
                    className={
                      isRead ? "notification-row is-read" : "notification-row"
                    }
                  >
                    <span
                      className={`notification-activity-icon notification-activity-icon-${activity.type}`}
                    >
                      {activity.income ? "+" : "-"}
                    </span>

                    <span className="notification-activity-copy">
                      <strong>{activity.title}</strong>

                      <small>
                        {activity.merchant}
                        {" · "}
                        {activity.category}
                      </small>
                    </span>

                    <span
                      className={`notification-amount notification-amount-${activity.type}`}
                    >
                      {activity.income ? "+" : "-"}
                      {formatMoney(activity.amount, settings.currency)}
                    </span>

                    <time>{formatDate(activity.date)}</time>

                    {!isRead && (
                      <button
                        type="button"
                        className="notification-read-button"
                        onClick={() => markAsRead(activity.id)}
                      >
                        Mark as read
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="notification-empty-state">
              <strong>No activity to show</strong>
              <p>
                New expenses and income entries will appear here automatically.
              </p>
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}

export default NotificationPage;
