
import React, { useState } from "react";

const GOLD = "#E8C879";
const BG = "#10182B";
const CARD = "#18233A";
const TEXT = "#F7F3E9";
const MUTED = "#B9C2D7";

const getSavedUser = () => {
  try {
    return JSON.parse(localStorage.getItem("aurevixUser")) || null;
  } catch {
    return null;
  }
};

function Profile({ onBack }) {
  const [user, setUser] = useState(getSavedUser);
  const [mode, setMode] = useState("login");
  const [activeTab, setActiveTab] = useState("profile");
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 14px",
    marginTop: "7px",
    marginBottom: "16px",
    background: "#10182B",
    border: "1px solid #39445A",
    borderRadius: "8px",
    color: TEXT,
    outline: "none",
    fontSize: "14px",
  };

  const buttonStyle = {
    background: GOLD,
    color: BG,
    border: "none",
    borderRadius: "8px",
    padding: "13px 22px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "14px",
  };

  const secondaryButton = {
    background: "transparent",
    color: GOLD,
    border: `1px solid ${GOLD}80`,
    borderRadius: "8px",
    padding: "11px 18px",
    cursor: "pointer",
    fontSize: "14px",
  };

  const saveUser = (newUser) => {
    localStorage.setItem("aurevixUser", JSON.stringify(newUser));
    setUser(newUser);
    setMessage("");
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    const existingUser = getSavedUser();

    if (
      existingUser &&
      existingUser.email.toLowerCase() === email.trim().toLowerCase()
    ) {
      setMessage("This email is already registered. Please login.");
      return;
    }

    const newUser = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      photo: "",
    };

    saveUser(newUser);
    setActiveTab("profile");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser = getSavedUser();

    if (!email.trim() || !password.trim()) {
      setMessage("Please enter your email and password.");
      return;
    }

    if (
      !savedUser ||
      savedUser.email.toLowerCase() !== email.trim().toLowerCase()
    ) {
      setMessage("Account not found. Please sign up first.");
      return;
    }

    // Demo login only. Real password verification needs a backend.
    setUser(savedUser);
    setMessage("");
    setActiveTab("profile");
  };

  const handleProfileSave = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setMessage("Please fill in all profile details.");
      return;
    }

    saveUser({
      ...user,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      photo: photo || user.photo || "",
    });

    setEditing(false);
    setMessage("Profile updated successfully!");
  };

  const startEditing = () => {
    setName(user.name || "");
    setEmail(user.email || "");
    setPhone(user.phone || "");
    setPhoto(user.photo || "");
    setEditing(true);
    setMessage("");
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    setUser(null);
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setPhoto("");
    setMode("login");
    setMessage("You have logged out.");
  };

  const bookings = (() => {
    try {
      return JSON.parse(localStorage.getItem("aurevixBookings")) || [];
    } catch {
      return [];
    }
  })();

  const openTickets = bookings.filter(
    (booking) => booking.bookingId
  );

  const renderAuth = () => (
    <div
      style={{
        maxWidth: "470px",
        margin: "45px auto",
        background: CARD,
        border: `1px solid ${GOLD}55`,
        borderRadius: "18px",
        padding: "30px",
        boxSizing: "border-box",
        boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "25px" }}>
        <div
          style={{
            fontSize: "38px",
            color: GOLD,
            marginBottom: "8px",
          }}
        >
          ◈
        </div>

        <h1
          style={{
            color: GOLD,
            margin: "0 0 10px",
            letterSpacing: "2px",
          }}
        >
          AUREVIX
        </h1>

        <p style={{ color: MUTED, margin: 0 }}>
          {mode === "login"
            ? "Welcome back! Login to your account."
            : "Create your AUREVIX account."}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          background: BG,
          padding: "5px",
          borderRadius: "9px",
          marginBottom: "25px",
        }}
      >
        <button
          onClick={() => {
            setMode("login");
            setMessage("");
          }}
          style={{
            flex: 1,
            padding: "11px",
            border: "none",
            borderRadius: "7px",
            background: mode === "login" ? GOLD : "transparent",
            color: mode === "login" ? BG : MUTED,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <button
          onClick={() => {
            setMode("signup");
            setMessage("");
          }}
          style={{
            flex: 1,
            padding: "11px",
            border: "none",
            borderRadius: "7px",
            background: mode === "signup" ? GOLD : "transparent",
            color: mode === "signup" ? BG : MUTED,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={mode === "login" ? handleLogin : handleSignup}>
        {mode === "signup" && (
          <>
            <label style={{ color: MUTED, fontSize: "14px" }}>
              Full Name
            </label>
            <input
              style={inputStyle}
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label style={{ color: MUTED, fontSize: "14px" }}>
              Mobile Number
            </label>
            <input
              style={inputStyle}
              type="tel"
              placeholder="Enter your mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </>
        )}

        <label style={{ color: MUTED, fontSize: "14px" }}>
          Email Address
        </label>
        <input
          style={inputStyle}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label style={{ color: MUTED, fontSize: "14px" }}>
          Password
        </label>
        <input
          style={inputStyle}
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {message && (
          <p
            style={{
              color: message.includes("successfully") ? GOLD : "#FF9999",
              fontSize: "13px",
              marginTop: "0",
              lineHeight: "1.5",
            }}
          >
            {message}
          </p>
        )}

        <button type="submit" style={{ ...buttonStyle, width: "100%" }}>
          {mode === "login" ? "LOGIN" : "CREATE ACCOUNT"}
        </button>
      </form>

      <p
        style={{
          color: MUTED,
          fontSize: "12px",
          textAlign: "center",
          lineHeight: "1.6",
          marginTop: "20px",
        }}
      >
        Demo account system. Secure authentication will be connected
        with the backend later.
      </p>
    </div>
  );

  const renderProfile = () => (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
          background: CARD,
          border: `1px solid ${GOLD}55`,
          borderRadius: "16px",
          padding: "25px",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            width: "95px",
            height: "95px",
            borderRadius: "50%",
            border: `2px solid ${GOLD}`,
            background: BG,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: GOLD,
            fontSize: "38px",
            flexShrink: 0,
          }}
        >
          {user.photo ? (
            <img
              src={user.photo}
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            (user.name || "U").charAt(0).toUpperCase()
          )}
        </div>

        <div style={{ flex: 1 }}>
          <h2 style={{ color: GOLD, margin: "0 0 8px" }}>
            Welcome, {user.name}!
          </h2>
          <p style={{ color: MUTED, margin: 0, overflowWrap: "anywhere" }}>
            {user.email}
          </p>
        </div>

        <button onClick={handleLogout} style={secondaryButton}>
          Logout
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "22px",
        }}
      >
        {[
          ["profile", "My Profile"],
          ["bookings", "My Bookings"],
          ["tickets", "My Tickets"],
        ].map(([tab, label]) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setEditing(false);
              setMessage("");
            }}
            style={{
              ...secondaryButton,
              background: activeTab === tab ? GOLD : "transparent",
              color: activeTab === tab ? BG : GOLD,
              fontWeight: "bold",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === "profile" && (
        <div
          style={{
            background: CARD,
            border: `1px solid ${GOLD}40`,
            borderRadius: "15px",
            padding: "25px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ color: GOLD, margin: 0 }}>
              Personal Information
            </h2>

            {!editing && (
              <button onClick={startEditing} style={secondaryButton}>
                Edit Profile
              </button>
            )}
          </div>

          {editing ? (
            <form onSubmit={handleProfileSave}>
              <label style={{ color: MUTED, fontSize: "14px" }}>
                Profile Photo
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{
                  ...inputStyle,
                  padding: "10px",
                }}
              />

              {photo && (
                <img
                  src={photo}
                  alt="Preview"
                  style={{
                    width: "85px",
                    height: "85px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    border: `2px solid ${GOLD}`,
                    marginBottom: "18px",
                  }}
                />
              )}

              <label style={{ color: MUTED, fontSize: "14px" }}>
                Full Name
              </label>
              <input
                style={inputStyle}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label style={{ color: MUTED, fontSize: "14px" }}>
                Email Address
              </label>
              <input
                style={inputStyle}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label style={{ color: MUTED, fontSize: "14px" }}>
                Mobile Number
              </label>
              <input
                style={inputStyle}
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              {message && (
                <p style={{ color: GOLD, fontSize: "13px" }}>{message}</p>
              )}

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button type="submit" style={buttonStyle}>
                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setMessage("");
                  }}
                  style={secondaryButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              {[
                ["Full Name", user.name],
                ["Email Address", user.email],
                ["Mobile Number", user.phone || "Not added"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    padding: "16px 0",
                    borderBottom: "1px solid #ffffff15",
                  }}
                >
                  <p
                    style={{
                      color: MUTED,
                      fontSize: "13px",
                      margin: "0 0 7px",
                    }}
                  >
                    {label}
                  </p>
                  <strong style={{ color: TEXT, overflowWrap: "anywhere" }}>
                    {value}
                  </strong>
                </div>
              ))}
            </>
          )}

          {message && !editing && (
            <p style={{ color: GOLD, fontSize: "13px" }}>{message}</p>
          )}
        </div>
      )}

      {activeTab === "bookings" && (
        <div
          style={{
            background: CARD,
            border: `1px solid ${GOLD}40`,
            borderRadius: "15px",
            padding: "25px",
          }}
        >
          <h2 style={{ color: GOLD, marginTop: 0 }}>My Bookings</h2>

          {bookings.length === 0 ? (
            <p style={{ color: MUTED, lineHeight: "1.7" }}>
              You have no bookings yet. Your demo bookings will appear here
              after booking history is connected.
            </p>
          ) : (
            bookings.map((booking, index) => (
              <div
                key={booking.bookingId || index}
                style={{
                  padding: "16px",
                  marginBottom: "12px",
                  background: BG,
                  borderRadius: "10px",
                  border: "1px solid #ffffff15",
                }}
              >
                <strong style={{ color: GOLD }}>
                  {booking.movieName || "Movie"}
                </strong>
                <p style={{ color: MUTED, fontSize: "13px" }}>
                  {booking.theatreName || "Theatre"} · {booking.date || "—"}
                </p>
                <p style={{ color: TEXT, fontSize: "13px" }}>
                  Booking ID: {booking.bookingId || "—"}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "tickets" && (
        <div
          style={{
            background: CARD,
            border: `1px solid ${GOLD}40`,
            borderRadius: "15px",
            padding: "25px",
          }}
        >
          <h2 style={{ color: GOLD, marginTop: 0 }}>My Tickets</h2>

          {openTickets.length === 0 ? (
            <p style={{ color: MUTED, lineHeight: "1.7" }}>
              Your tickets will appear here after a booking is saved.
            </p>
          ) : (
            openTickets.map((booking, index) => (
              <div
                key={booking.bookingId || index}
                style={{
                  padding: "16px",
                  marginBottom: "12px",
                  background: BG,
                  borderRadius: "10px",
                  border: `1px solid ${GOLD}40`,
                }}
              >
                <strong style={{ color: GOLD }}>
                  {booking.movieName || "Movie"}
                </strong>
                <p style={{ color: MUTED, fontSize: "13px" }}>
                  {booking.theatreName || "Theatre"}
                </p>
                <p style={{ color: TEXT, fontSize: "13px" }}>
                  Booking ID: {booking.bookingId}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BG,
        color: TEXT,
        padding: "25px 18px 45px",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "850px", margin: "auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <h1
            style={{
              color: GOLD,
              letterSpacing: "3px",
              fontSize: "25px",
              margin: 0,
            }}
          >
            AUREVIX
          </h1>

          <button onClick={onBack} style={secondaryButton}>
            ← Back to Website
          </button>
        </div>

        <div
          style={{
            textAlign: "center",
            margin: "35px 0 15px",
          }}
        >
          <h1 style={{ color: GOLD, fontSize: "32px", margin: "0 0 10px" }}>
            {user ? "MY ACCOUNT" : "WELCOME"}
          </h1>

          <p style={{ color: MUTED, margin: 0 }}>
            {user
              ? "Manage your profile and bookings"
              : "Login or create your AUREVIX account"}
          </p>
        </div>

        {user ? renderProfile() : renderAuth()}
      </div>
    </div>
  );
}

export default Profile;
