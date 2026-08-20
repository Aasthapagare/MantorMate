import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import FooterIcons from "./FooterIcons";
import "../styles/projectManagement.css";

const API_BASE_URL = "http://localhost:9095";
const MAX_GROUP_MEMBERS = 4;

const STEP_ORDER = [
  "create-group",
  "add-members",
  "select-guides",
  "submit-idea",
  "overview",
];

const emptyMemberInputs = ["", "", ""];

const ProjectManagement = ({ userRole, username, onLogout, onNavigate }) => {
  const role = (userRole || localStorage.getItem("role") || "")
    .toString()
    .trim()
    .toUpperCase();
  const currentUserId = localStorage.getItem("userId") || "";
  const token = localStorage.getItem("token") || "";
  const isGuide = [
    "GUIDE",
    "FACULTY",
    "TEACHER",
    "MENTOR",
    "PROJECT GUIDE",
  ].includes(role);

  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guidesLoading, setGuidesLoading] = useState(false);
  const [groupId, setGroupId] = useState(localStorage.getItem("groupId") || "");
  const [groupDetails, setGroupDetails] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeStep, setActiveStep] = useState("create-group");

  const [createGroupData, setCreateGroupData] = useState({
    groupName: "",
    leaderId: currentUserId,
  });
  const [memberInputs, setMemberInputs] = useState(emptyMemberInputs);
  const [removeMemberId, setRemoveMemberId] = useState("");
  const [guideSelection, setGuideSelection] = useState({
    guideId1: "",
    guideId2: "",
  });
  const [ideaData, setIdeaData] = useState({
    title: "",
    description: "",
  });

  const apiCall = async (url, options = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...(options.body instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(
        message || `Request failed with status ${response.status}`,
      );
    }

    return response;
  };

  const clearFlash = () => {
    setError("");
    setSuccess("");
  };

  const selectedGuideIds = useMemo(
    () =>
      (groupDetails?.preferredGuides || []).map((guide) =>
        String(guide.guideId),
      ),
    [groupDetails],
  );

  const memberDetails = groupDetails?.memberDetails || [];
  const memberCount = memberDetails.length;
  const canAddMoreMembers = Boolean(groupId) && memberCount < MAX_GROUP_MEMBERS;
  const isLeader = Boolean(
    groupDetails && String(groupDetails.leaderId) === String(currentUserId),
  );

  const assignedGuide = useMemo(() => {
    if (!groupDetails?.allocatedGuide?.guideId) {
      return null;
    }

    return (
      guides.find(
        (guide) =>
          String(guide.userId) === String(groupDetails.allocatedGuide.guideId),
      ) || null
    );
  }, [groupDetails, guides]);

  const preferredGuideNames = useMemo(() => {
    return (groupDetails?.preferredGuides || []).map((guide) => {
      const matchedGuide = guides.find(
        (item) => String(item.userId) === String(guide.guideId),
      );
      return {
        ...guide,
        name: matchedGuide?.name || `Guide ${guide.guideId}`,
      };
    });
  }, [groupDetails, guides]);

  const leaderOnlyMembers = memberDetails.filter(
    (member) => String(member.userId) !== String(groupDetails?.leaderId),
  );

  const deriveStep = (details) => {
    if (!details) {
      return "create-group";
    }
    if ((details.members || []).length <= 1) {
      return "add-members";
    }
    if ((details.preferredGuides || []).length < 2) {
      return "select-guides";
    }
    if (!details.projectTitle?.trim() || !details.projectIdea?.trim()) {
      return "submit-idea";
    }
    return "overview";
  };

  const loadGuides = async () => {
    if (isGuide || !token) {
      return;
    }

    setGuidesLoading(true);
    try {
      const response = await apiCall(`${API_BASE_URL}/groups/guides`, {
        method: "GET",
      });
      const data = await response.json();
      setGuides(Array.isArray(data) ? data : []);
    } catch (fetchError) {
      console.error(fetchError);
    } finally {
      setGuidesLoading(false);
    }
  };

  const loadStudentGroupData = async () => {
    if (!currentUserId || isGuide) {
      setLoading(false);
      return;
    }

    setLoading(true);
    clearFlash();

    try {
      const groupIdResponse = await apiCall(
        `${API_BASE_URL}/groups/user/${currentUserId}`,
        { method: "GET" },
      );
      const fetchedGroupId = await groupIdResponse.json();
      localStorage.setItem("groupId", fetchedGroupId);
      setGroupId(String(fetchedGroupId));

      const dashboardResponse = await apiCall(
        `${API_BASE_URL}/groups/${fetchedGroupId}/dashboard`,
        { method: "GET" },
      );
      const dashboard = await dashboardResponse.json();

      setGroupDetails(dashboard);
      setActiveStep(deriveStep(dashboard));
      setGuideSelection({
        guideId1: dashboard.preferredGuides?.[0]?.guideId || "",
        guideId2: dashboard.preferredGuides?.[1]?.guideId || "",
      });
      setIdeaData({
        title: dashboard.projectTitle || "",
        description: dashboard.projectIdea || "",
      });
    } catch (loadError) {
      localStorage.removeItem("groupId");
      setGroupId("");
      setGroupDetails(null);
      setActiveStep("create-group");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGuides();
    loadStudentGroupData();
  }, [currentUserId, isGuide]);

  const handleCreateGroup = async (event) => {
    event.preventDefault();
    clearFlash();

    if (!createGroupData.groupName.trim()) {
      setError("Please enter group name.");
      return;
    }

    if (
      String(createGroupData.leaderId).trim() !== String(currentUserId).trim()
    ) {
      setError("Leader ID must match logged in student ID.");
      return;
    }

    try {
      const response = await apiCall(`${API_BASE_URL}/groups/create`, {
        method: "POST",
        body: JSON.stringify(createGroupData),
      });
      const createdGroup = await response.json();

      localStorage.setItem("groupId", createdGroup.id);
      setGroupId(String(createdGroup.id));
      setSuccess("Group created successfully. Now add members.");
      setCreateGroupData({ groupName: "", leaderId: currentUserId });
      await loadStudentGroupData();
      setActiveStep("add-members");
    } catch (createError) {
      setError(createError.message);
    }
  };

  const handleAddMembers = async (event) => {
    event.preventDefault();
    clearFlash();

    if (!groupId) {
      setError("Create group first.");
      return;
    }

    const uniqueMemberIds = [
      ...new Set(memberInputs.map((value) => value.trim()).filter(Boolean)),
    ];
    if (!uniqueMemberIds.length) {
      setError("Enter at least one member ID");
      return;
    }

    if (uniqueMemberIds.some((value) => value === currentUserId)) {
      setError("Leader already included in group.");
      return;
    }

    const availableSlots = MAX_GROUP_MEMBERS - memberCount;
    if (availableSlots <= 0) {
      setError("Already 4 members in group.");
      return;
    }

    try {
      for (const memberId of uniqueMemberIds.slice(0, availableSlots)) {
        await apiCall(`${API_BASE_URL}/groups/${groupId}/add-member`, {
          method: "POST",
          body: JSON.stringify({ userId: memberId }),
        });
      }

      setMemberInputs(emptyMemberInputs);
      setSuccess("Members added successfully.");
      await loadStudentGroupData();
      setActiveStep("select-guides");
    } catch (addError) {
      setError(addError.message);
    }
  };

  const handleRemoveMember = async (event) => {
    event.preventDefault();
    clearFlash();

    if (!removeMemberId) {
      setError("Select member to remove.");
      return;
    }

    try {
      await apiCall(
        `${API_BASE_URL}/groups/${groupId}/members/${removeMemberId}`,
        {
          method: "DELETE",
        },
      );
      setRemoveMemberId("");
      setSuccess("Member removed successfully.");
      await loadStudentGroupData();
      setActiveStep("overview");
    } catch (removeError) {
      setError(removeError.message);
    }
  };

  const handleSelectGuides = async (event) => {
    event.preventDefault();
    clearFlash();

    if (!guideSelection.guideId1 || !guideSelection.guideId2) {
      setError("Please select 2 guides.");
      return;
    }

    if (guideSelection.guideId1 === guideSelection.guideId2) {
      setError("Both guide should be different.");
      return;
    }

    try {
      await apiCall(`${API_BASE_URL}/groups/${groupId}/select-guides`, {
        method: "POST",
        body: JSON.stringify({
          guideIds: [guideSelection.guideId1, guideSelection.guideId2],
        }),
      });

      setSuccess("Guides selected successfully.");
      await loadStudentGroupData();
      setActiveStep("submit-idea");
    } catch (guideError) {
      setError(guideError.message);
    }
  };

  const handleSubmitIdea = async (event) => {
    event.preventDefault();
    clearFlash();

    if (!ideaData.title.trim() || !ideaData.description.trim()) {
      setError("Idea name and description both required.");
      return;
    }

    try {
      await apiCall(`${API_BASE_URL}/groups/${groupId}/submit-idea`, {
        method: "POST",
        body: JSON.stringify(ideaData),
      });

      setSuccess("Idea submitted successfully.");
      await loadStudentGroupData();
      setActiveStep("overview");
    } catch (ideaError) {
      setError(ideaError.message);
    }
  };

  const renderFlash = () => {
    if (!error && !success) {
      return null;
    }

    return (
      <div
        className={`pm-alert ${error ? "pm-alert-error" : "pm-alert-success"}`}
      >
        {error || success}
      </div>
    );
  };

  const renderStepPills = () => {
    const currentIndex = STEP_ORDER.indexOf(activeStep);

    return (
      <div className="pm-stepper">
        {STEP_ORDER.slice(0, 4).map((step, index) => {
          const isDone =
            currentIndex > index || (activeStep === "overview" && index < 4);
          const isActive = activeStep === step;

          return (
            <div
              key={step}
              className={`pm-step-pill ${isDone ? "done" : ""} ${isActive ? "active" : ""}`}
            >
              <span>{index + 1}</span>
              <strong>{step.replace("-", " ")}</strong>
            </div>
          );
        })}
      </div>
    );
  };

  const renderCreateGroup = () => (
    <div className="pm-card-panel">
      <div className="pm-panel-header">
        <h2>Create Group</h2>
      </div>
      <form className="pm-form" onSubmit={handleCreateGroup}>
        <label>
          Group Name
          <input
            type="text"
            value={createGroupData.groupName}
            onChange={(event) =>
              setCreateGroupData((prev) => ({
                ...prev,
                groupName: event.target.value,
              }))
            }
            placeholder="Enter group name"
          />
        </label>
        <label>
          Leader ID
          <input
            type="text"
            value={createGroupData.leaderId}
            onChange={(event) =>
              setCreateGroupData((prev) => ({
                ...prev,
                leaderId: event.target.value,
              }))
            }
            placeholder="Enter leader ID"
          />
        </label>
        <button type="submit" className="pm-primary-btn">
          Create Group
        </button>
      </form>
    </div>
  );

  const renderAddMembers = () => (
    <div className="pm-card-panel">
      <div className="pm-panel-header">
        <h2>Add Members</h2>
      </div>
      <form className="pm-form" onSubmit={handleAddMembers}>
        {memberInputs.map((value, index) => (
          <label key={`member-${index}`}>
            Member ID {index + 1}
            <input
              type="text"
              value={value}
              onChange={(event) => {
                const nextValues = [...memberInputs];
                nextValues[index] = event.target.value;
                setMemberInputs(nextValues);
              }}
              placeholder="Enter student ID"
            />
          </label>
        ))}
        <div className="pm-inline-note">
          Current members: {memberCount} / {MAX_GROUP_MEMBERS}
        </div>
        <button type="submit" className="pm-primary-btn">
          Add Members
        </button>
      </form>
    </div>
  );

  const renderGuideSelection = () => (
    <div className="pm-card-panel">
      <div className="pm-panel-header">
        <h2>Select 2 Guides</h2>
      </div>
      <form className="pm-form" onSubmit={handleSelectGuides}>
        <label>
          Guide 1
          <select
            value={guideSelection.guideId1}
            onChange={(event) =>
              setGuideSelection((prev) => ({
                ...prev,
                guideId1: event.target.value,
              }))
            }
          >
            <option value="">Select first guide</option>
            {guides.map((guide) => (
              <option key={`guide-1-${guide.userId}`} value={guide.userId}>
                {guide.name || guide.userId} ({guide.userId})
              </option>
            ))}
          </select>
        </label>
        <label>
          Guide 2
          <select
            value={guideSelection.guideId2}
            onChange={(event) =>
              setGuideSelection((prev) => ({
                ...prev,
                guideId2: event.target.value,
              }))
            }
          >
            <option value="">Select second guide</option>
            {guides.map((guide) => (
              <option key={`guide-2-${guide.userId}`} value={guide.userId}>
                {guide.name || guide.userId} ({guide.userId})
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="pm-primary-btn"
          disabled={guidesLoading}
        >
          {guidesLoading ? "Loading Guides..." : "Save Guide Selection"}
        </button>
      </form>
    </div>
  );

  const renderIdeaForm = () => (
    <div className="pm-card-panel">
      <div className="pm-panel-header">
        <h2>Submit Project Idea</h2>
      </div>
      <form className="pm-form" onSubmit={handleSubmitIdea}>
        <label>
          Idea Name
          <input
            type="text"
            value={ideaData.title}
            onChange={(event) =>
              setIdeaData((prev) => ({ ...prev, title: event.target.value }))
            }
            placeholder="Enter idea name"
          />
        </label>
        <label>
          Description
          <textarea
            rows="5"
            value={ideaData.description}
            onChange={(event) =>
              setIdeaData((prev) => ({
                ...prev,
                description: event.target.value,
              }))
            }
            placeholder="Write project description"
          />
        </label>
        <button type="submit" className="pm-primary-btn">
          Submit
        </button>
      </form>
    </div>
  );

  const renderOverview = () => (
    <div className="pm-overview-grid">
      <div className="pm-card-panel">
        <div className="pm-panel-header">
          <h2>Group Details</h2>
        </div>
        <div className="pm-details-list">
          <div>
            <span>Group Name</span>
            <strong>{groupDetails?.groupName || "-"}</strong>
          </div>
          <div>
            <span>Group ID</span>
            <strong>{groupId || "-"}</strong>
          </div>
          <div>
            <span>Leader ID</span>
            <strong>{groupDetails?.leaderId || "-"}</strong>
          </div>
          <div>
            <span>Idea Name</span>
            <strong>{groupDetails?.projectTitle || "Not submitted yet"}</strong>
          </div>
          <div>
            <span>Idea Approved</span>
            <strong>{groupDetails?.ideaStatus || "PENDING"}</strong>
          </div>
          <div>
            <span>Guide Assigned</span>
            <strong>{assignedGuide ? "Yes" : "No"}</strong>
          </div>
          <div>
            <span>Assigned Guide</span>
            <strong>
              {assignedGuide
                ? `${assignedGuide.name || assignedGuide.userId} (${assignedGuide.userId})`
                : "Not assigned yet"}
            </strong>
          </div>
        </div>
      </div>

      <div className="pm-card-panel">
        <div className="pm-panel-header">
          <h2>Members</h2>
          <p>All group members</p>
        </div>
        <div className="pm-chip-list">
          {memberDetails.length ? (
            memberDetails.map((member) => (
              <div className="pm-member-chip" key={member.userId}>
                <strong>{member.name || member.userId}</strong>
                <span>{member.userId}</span>
                <small>
                  {String(member.userId) === String(groupDetails?.leaderId)
                    ? "Leader"
                    : "Member"}
                </small>
              </div>
            ))
          ) : (
            <p>No members found.</p>
          )}
        </div>
      </div>

      <div className="pm-card-panel">
        <div className="pm-panel-header">
          <h2>Selected Guides</h2>
        </div>
        <div className="pm-chip-list">
          {preferredGuideNames.length ? (
            preferredGuideNames.map((guide) => (
              <div
                className="pm-guide-chip"
                key={`${guide.guideId}-${guide.preferenceOrder}`}
              >
                <strong>{guide.name}</strong>
                <span>{guide.guideId}</span>
                <small>Preference {guide.preferenceOrder}</small>
              </div>
            ))
          ) : (
            <p>No guides selected yet.</p>
          )}
        </div>
      </div>

      <div className="pm-card-panel pm-full-width">
        <div className="pm-panel-header">
          <h2>Idea Description</h2>
          <p>{groupDetails?.projectIdea || "Description not submitted yet."}</p>
        </div>
      </div>

      {isLeader && (
        <div className="pm-card-panel">
          <div className="pm-panel-header">
            <h2>Leader Actions</h2>
          </div>

          {canAddMoreMembers && (
            <form className="pm-form" onSubmit={handleAddMembers}>
              <div className="pm-subtitle">Add More Members</div>
              {memberInputs.map((value, index) => (
                <label key={`overview-member-${index}`}>
                  Member ID {index + 1}
                  <input
                    type="text"
                    value={value}
                    onChange={(event) => {
                      const nextValues = [...memberInputs];
                      nextValues[index] = event.target.value;
                      setMemberInputs(nextValues);
                    }}
                    placeholder="Enter student ID"
                  />
                </label>
              ))}
              <button type="submit" className="pm-primary-btn">
                Add Members
              </button>
            </form>
          )}

          <form className="pm-form" onSubmit={handleRemoveMember}>
            <div className="pm-subtitle">Remove Member</div>
            <label>
              Select Member
              <select
                value={removeMemberId}
                onChange={(event) => setRemoveMemberId(event.target.value)}
              >
                <option value="">Choose member</option>
                {leaderOnlyMembers.map((member) => (
                  <option key={`remove-${member.userId}`} value={member.userId}>
                    {member.name || member.userId} ({member.userId})
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="pm-secondary-btn"
              disabled={!leaderOnlyMembers.length}
            >
              Remove Member
            </button>
          </form>
        </div>
      )}
    </div>
  );

  const renderStudentContent = () => {
    if (loading) {
      return (
        <div className="pm-card-panel">
          <p>Loading project management details...</p>
        </div>
      );
    }

    if (!groupId) {
      return renderCreateGroup();
    }

    if (!isLeader) {
      return renderOverview();
    }

    if (activeStep === "add-members") {
      return renderAddMembers();
    }

    if (activeStep === "select-guides") {
      return renderGuideSelection();
    }

    if (activeStep === "submit-idea") {
      return renderIdeaForm();
    }

    return renderOverview();
  };

  return (
    <>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />
      <div className="dashboard-layout">
        <Sidebar
          userRole={role}
          username={username}
          onLogout={onLogout}
          onNavigate={onNavigate}
          currentPage="projectManagement"
        />

        <main className="project-management-page">
          <div className="project-management-wrapper">
            <div className="pm-header">
              <button
                className="back-btn"
                onClick={() => onNavigate?.("dashboard")}
              >
                <i className="bx bx-arrow-back"></i>
                Back
              </button>
              <h1>Student Project Management</h1>
              <p>
                {isGuide
                  ? "Guide view is not part of this student flow."
                  : "Create group, add members, select guides, submit idea,and group overview."}
              </p>
            </div>

            {!isGuide && (!groupId || isLeader) && renderStepPills()}
            {renderFlash()}

            {isGuide ? (
              <div className="pm-card-panel">
                <div className="pm-panel-header">
                  <h2>Guide Portal</h2>
                </div>
              </div>
            ) : (
              renderStudentContent()
            )}
          </div>
        </main>
      </div>

      <FooterIcons
        onOpenChat={() => {
          onNavigate?.("dashboard");
          localStorage.setItem("openChat", "true");
        }}
        onNavigate={onNavigate}
      />
    </>
  );
};

export default ProjectManagement;
