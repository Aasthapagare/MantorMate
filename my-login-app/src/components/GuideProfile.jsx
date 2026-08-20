import React, { useEffect, useMemo, useState } from "react";
import GuideSidebar from "./GuideSidebar";
import "../styles/profile.css";
import "../styles/guideFixed.css";
import { getCurrentUserDetails } from "../services/adminService";

const GuideProfile = ({ onBack, onNavigate, onLogout, userRole, username }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "default",
  );
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("guideProfileImage") || null,
  );
  const [profileData, setProfileData] = useState({
    fullName: username || localStorage.getItem("name") || "Guide User",
    department: "MentorMate Guide",
    guideId: localStorage.getItem("userId") || "N/A",
    email: "N/A",
    designation: userRole || localStorage.getItem("role") || "GUIDE",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const storedGuideName =
    username || localStorage.getItem("name") || "Guide User";
  const storedGuideRole = userRole || localStorage.getItem("role") || "GUIDE";
  const storedGuideId = localStorage.getItem("userId") || "";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const loadGuideProfile = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const user = await getCurrentUserDetails(userId);
        setProfileData({
          fullName:
            user?.name ||
            username ||
            localStorage.getItem("name") ||
            "Guide User",
          department: "MentorMate Guide",
          guideId: user?.userId || userId,
          email: user?.email || "N/A",
          designation:
            user?.role || userRole || localStorage.getItem("role") || "GUIDE",
        });
      } catch (error) {
        setLoadError("Unable to load latest guide details.");
      } finally {
        setIsLoading(false);
      }
    };

    loadGuideProfile();
  }, [userRole, username]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    setShowThemeDropdown(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const image = loadEvent.target?.result;
      setProfileImage(image);
      localStorage.setItem("guideProfileImage", image);
    };
    reader.readAsDataURL(file);
  };

  const profileSummary = useMemo(() => {
    const roleValue = String(
      profileData?.designation || storedGuideRole || "GUIDE",
    )
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return [
      { label: "Full Name", value: profileData?.fullName || storedGuideName },
      { label: "Email ID", value: profileData?.email || "Not available" },
      {
        label: "Guide ID",
        value: profileData?.guideId || storedGuideId || "Not available",
      },
      { label: "Role", value: roleValue },
      {
        label: "Department",
        value: profileData?.department || "MentorMate Guide",
      },
      { label: "Account Status", value: "Active guide account" },
    ];
  }, [profileData, storedGuideId, storedGuideName, storedGuideRole]);

  return (
    <>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />
      <div className="dashboard-wrapper">
        <header className="dashboard-header">
          <div className="header-left">
            <div className="logo-container">
              <div className="logo-circle">
                <i className="bx bxs-graduation"></i>
              </div>
              <h1 className="project-name">MentorMate</h1>
            </div>
          </div>
          <div className="header-right">
            <div className="theme-selector">
              <button
                className="theme-btn"
                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
              >
                <i className="bx bx-palette"></i>
                <span>Theme</span>
              </button>
              {showThemeDropdown && (
                <div className="theme-dropdown">
                  <button
                    className={theme === "light" ? "active" : ""}
                    onClick={() => handleThemeChange("light")}
                  >
                    <i className="bx bx-sun"></i> Light
                  </button>
                  <button
                    className={theme === "dark" ? "active" : ""}
                    onClick={() => handleThemeChange("dark")}
                  >
                    <i className="bx bx-moon"></i> Dark
                  </button>
                  <button
                    className={theme === "default" ? "active" : ""}
                    onClick={() => handleThemeChange("default")}
                  >
                    <i className="bx bx-brush"></i> Default
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="dashboard-container">
          <GuideSidebar
            userRole={userRole || profileData.designation}
            username={username || profileData.fullName}
            onLogout={onLogout}
            onNavigate={onNavigate}
            currentView="profile"
          />

          <main className="dashboard-content">
            <div className="profile-page-content">
              {loadError && (
                <div className="profile-status-banner">{loadError}</div>
              )}

              <section className="profile-hero-card">
                <div className="profile-hero-copy">
                  <span className="profile-kicker">Guide Profile</span>
                  <h2>{profileData?.fullName || storedGuideName}</h2>
                  <p>Your current guide account information is shown here.</p>
                </div>
                <div className="profile-hero-badge">
                  <span>
                    {String(
                      profileData?.designation || storedGuideRole || "GUIDE",
                    ).toUpperCase()}
                  </span>
                </div>
              </section>

              <div className="profile-top-section">
                <div className="profile-info-card">
                  <div className="profile-picture-section">
                    <div className="profile-pic-large">
                      {profileImage ? (
                        <img src={profileImage} alt="Guide profile" />
                      ) : (
                        <i className="bx bx-user"></i>
                      )}
                    </div>

                    <label
                      htmlFor="guide-profile-pic-upload"
                      className="upload-pic-btn"
                    >
                      <i className="bx bx-camera"></i>
                      Change Photo
                    </label>
                    <input
                      id="guide-profile-pic-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                    />
                  </div>

                  <div className="bio-section">
                    <h3 className="bio-title">Profile Details</h3>
                    {isLoading ? (
                      <div className="profile-loading-state">
                        <i className="bx bx-loader-alt bx-spin"></i>
                        <span>Loading profile...</span>
                      </div>
                    ) : (
                      profileSummary.map((item) => (
                        <div className="bio-item" key={item.label}>
                          <span className="bio-label">{item.label}</span>
                          <span className="bio-value">{item.value}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="profile-actions-card">
                  <div className="profile-readonly-card">
                    <div className="profile-readonly-head">
                      <i className="bx bx-shield-quarter"></i>
                      <div>
                        <h3>Static View</h3>
                        <p></p>
                      </div>
                    </div>
                    <div className="profile-readonly-list">
                      <div className="profile-readonly-item">
                        <span>Display Name</span>
                        <strong>
                          {profileData?.fullName || storedGuideName}
                        </strong>
                      </div>
                      <div className="profile-readonly-item">
                        <span>Guide ID</span>
                        <strong>
                          {profileData?.guideId ||
                            storedGuideId ||
                            "Not available"}
                        </strong>
                      </div>
                      <div className="profile-readonly-item">
                        <span>Registered Email</span>
                        <strong>{profileData?.email || "Not available"}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="profile-note-card">
                    <h3>Note</h3>
                    <p>
                      This page is read only. Guide account details are being
                      shown from the current login session.
                    </p>
                  </div>
                </div>
              </div>

              <section className="achievements-section">
                <div className="section-header">
                  <h2 className="section-title">Account Overview</h2>
                  <button
                    className="upload-pic-btn"
                    onClick={onBack}
                    type="button"
                  >
                    <i className="bx bx-arrow-back"></i>
                    Back to Dashboard
                  </button>
                </div>

                <div className="profile-overview-grid">
                  {profileSummary.map((item) => (
                    <div key={item.label} className="profile-overview-card">
                      <span>{item.label}</span>
                      <strong>{isLoading ? "Loading..." : item.value}</strong>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default GuideProfile;
