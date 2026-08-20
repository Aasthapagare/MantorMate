import React, { useEffect, useMemo, useState } from "react";
import "../styles/notification.css";

const NOTIFICATION_BASE_URL =
  process.env.REACT_APP_NOTIFICATION_BASE_URL || "http://localhost:8087";

const NOTIFICATION_META = {
  CHAT: {
    title: "New Message",
    icon: "bx-message-dots",
    tone: "chat",
    helper: "Chat inbox",
  },
  MEETING_REQUEST: {
    title: "Meeting Request",
    icon: "bx-calendar-plus",
    tone: "request",
    helper: "Guide action needed",
  },
  MEETING_APPROVED: {
    title: "Meeting Approved",
    icon: "bx-calendar-check",
    tone: "approved",
    helper: "Schedule updated",
  },
  DEFAULT: {
    title: "Notification",
    icon: "bx-bell",
    tone: "default",
    helper: "Recent update",
  },
};

const getNotificationMeta = (type) => NOTIFICATION_META[type] || NOTIFICATION_META.DEFAULT;

const formatCreatedAt = (value) => {
  if (!value) {
    return "Just now";
  }

  return new Date(value).toLocaleString([], {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const NotificationPage = ({ onBack, onNotificationOpen, roleLabel = "Student" }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const buildRequestOptions = (options = {}) => ({
    ...options,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const loadNotifications = async () => {
    if (!userId) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    try {
      setError("");
      const response = await fetch(
        `${NOTIFICATION_BASE_URL}/notifications/${userId}`,
        buildRequestOptions()
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to load notifications");
      }

      const data = await response.json();
      const normalized = Array.isArray(data) ? data : [];
      normalized.sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt));
      setNotifications(normalized);
    } catch (loadError) {
      console.error("Notification load error:", loadError);
      if (loadError instanceof TypeError) {
        setError(
          `Notification service is unavailable at ${NOTIFICATION_BASE_URL}. Start the service or set REACT_APP_NOTIFICATION_BASE_URL to the correct host.`
        );
      } else {
        setError(loadError.message || "Cannot load Notifications.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
    const intervalId = window.setInterval(loadNotifications, 5000);
    return () => window.clearInterval(intervalId);
  }, [userId]);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.seen).length,
    [notifications]
  );

  const meetingCount = useMemo(
    () =>
      notifications.filter((notification) =>
        ["MEETING_REQUEST", "MEETING_APPROVED"].includes(notification.type)
      ).length,
    [notifications]
  );

  const chatCount = useMemo(
    () => notifications.filter((notification) => notification.type === "CHAT").length,
    [notifications]
  );

  const latestNotification = notifications[0];

  const handleNotificationOpen = (notification) => {
    if (typeof onNotificationOpen !== "function") {
      return;
    }

    onNotificationOpen(notification);
  };

  const handleMarkSeen = async (notificationId) => {
    try {
      const response = await fetch(
        `${NOTIFICATION_BASE_URL}/notifications/seen/${notificationId}`,
        buildRequestOptions({
          method: "PUT",
        })
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to mark notification as seen");
      }

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, seen: true }
            : notification
        )
      );
    } catch (markError) {
      console.error("Notification seen error:", markError);
      if (markError instanceof TypeError) {
        setError(
          `Notification service is unavailable at ${NOTIFICATION_BASE_URL}. Start the service or set REACT_APP_NOTIFICATION_BASE_URL to the correct host.`
        );
      } else {
        setError(markError.message || "Cannot update Notification.");
      }
    }
  };

  return (
    <>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />
      <div className="notification-page">
        <header className="notification-topbar">
          <div className="notification-topbar-brand">
            <div className="notification-topbar-logo">
              <i className="bx bxs-graduation"></i>
            </div>
            <div>
              <h2>MentorMate</h2>
              <span>{roleLabel} Notification Center</span>
            </div>
          </div>
          <div className="notification-topbar-badge">
            <i className="bx bx-bell"></i>
            <span>Live alerts</span>
          </div>
        </header>

        <div className="notification-hero">
          <div className="notification-page-header">
            <button className="notification-back-btn" onClick={onBack}>
              <i className="bx bx-arrow-back"></i>
              <span>Back</span>
            </button>
            <div className="notification-page-copy">
              <span className="notification-page-kicker">{roleLabel} Alert Center</span>
              <h1>Notifications</h1>
              <p>
                Chat and Meeting updates.
              </p>
            </div>
            <div className="notification-counter">
              <span>Unread Inbox</span>
              <strong>{unreadCount}</strong>
            </div>
          </div>

          <div className="notification-overview">
            <div className="notification-stat-card">
              <span>Total Unread</span>
              <strong>{unreadCount}</strong>
              <p>Unseen  messages.</p>
            </div>
            <div className="notification-stat-card">
              <span>Messages</span>
              <strong>{chatCount}</strong>
              <p>Unread chat notifications.</p>
            </div>
            <div className="notification-stat-card">
              <span>Meetings</span>
              <strong>{meetingCount}</strong>
              <p>Request aur approval updates.</p>
            </div>
            <div className="notification-stat-card highlight">
              <span>Latest Update</span>
              <strong>
                {latestNotification
                  ? getNotificationMeta(latestNotification.type).title
                  : "No alerts"}
              </strong>
              <p>
                {latestNotification
                  ? formatCreatedAt(latestNotification.createdAt)
                  : "Inbox clear hai."}
              </p>
            </div>
          </div>
        </div>

        {error && <div className="notification-banner error">{error}</div>}

        <div className="notification-list-shell">
          <div className="notification-list-head">
            <div>
              <span className="notification-list-kicker">Recent Activity</span>
              <h2>Your latest alerts</h2>
            </div>
            <div className="notification-list-chip">
              <i className="bx bx-loader-circle"></i>
              <span>Auto refresh 5s</span>
            </div>
          </div>

          {loading ? (
            <div className="notification-empty">
              <i className="bx bx-loader-alt bx-spin"></i>
              <p>Loading notifications...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="notification-empty">
              <i className="bx bx-bell-off"></i>
              <p>No new notifications right now.</p>
            </div>
          ) : (
            <div className="notification-list">
              {notifications.map((notification) => {
                const meta = getNotificationMeta(notification.type);

                return (
                  <div
                    key={notification.id}
                    className={`notification-card ${notification.seen ? "seen" : "unseen"} tone-${meta.tone}`}
                    onClick={() => handleNotificationOpen(notification)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        handleNotificationOpen(notification);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <div className={`notification-card-icon tone-${meta.tone}`}>
                      <i className={`bx ${meta.icon}`}></i>
                    </div>
                    <div className="notification-card-copy">
                      <div className="notification-card-top">
                        <div>
                          <div className="notification-card-title-row">
                            <h3>{meta.title}</h3>
                            {!notification.seen && <span className="notification-unread-dot"></span>}
                          </div>
                          <small>{meta.helper}</small>
                        </div>
                        <span>{formatCreatedAt(notification.createdAt)}</span>
                      </div>
                      <p>{notification.message}</p>
                    </div>
                    <button
                      className="notification-action-btn"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleMarkSeen(notification.id);
                      }}
                      disabled={notification.seen}
                    >
                      {notification.seen ? "Seen" : "Mark Seen"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationPage;
