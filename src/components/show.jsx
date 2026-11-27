
import React, { useMemo, useState } from "react";

const GOLD = "#E8C879";
const BG = "#10182B";
const CARD = "#18233A";
const TEXT = "#F7F3E9";
const MUTED = "#B9C2D7";

const schedules = {
  "Shaan Cinema": [
    "10:00 AM",
    "01:30 PM",
    "04:45 PM",
    "08:15 PM",
  ],

  "INOX": [
    "09:45 AM",
    "12:50 PM",
    "04:10 PM",
    "07:40 PM",
  ],

  "R & S Cinemas": [
    "10:30 AM",
    "02:00 PM",
    "05:30 PM",
    "09:00 PM",
  ],

  "Diya Cinema": [
    "11:00 AM",
    "02:15 PM",
    "06:00 PM",
    "09:15 PM",
  ],

  "Connplex Cinema": [
    "09:30 AM",
    "12:45 PM",
    "04:00 PM",
    "07:30 PM",
  ],

  "Cineprime Cinema": [
    "10:15 AM",
    "01:15 PM",
    "04:30 PM",
    "08:00 PM",
  ],

  "Cinepolis - Inorbit Mall": [
    "09:50 AM",
    "01:00 PM",
    "04:20 PM",
    "07:50 PM",
  ],

  "INOX - Reliance": [
    "10:20 AM",
    "01:40 PM",
    "05:00 PM",
    "08:30 PM",
  ],

  "PVR Acropolis": [
    "09:40 AM",
    "12:55 PM",
    "04:15 PM",
    "07:45 PM",
  ],

  "PVR Palladium Mall": [
    "10:00 AM",
    "01:20 PM",
    "04:40 PM",
    "08:10 PM",
  ],

  "Cinepolis - Nexus Ahmedabad One": [
    "09:30 AM",
    "12:40 PM",
    "04:05 PM",
    "07:35 PM",
  ],

  "Rajhans Cinemas - The CBD Mall": [
    "10:15 AM",
    "01:30 PM",
    "04:50 PM",
    "08:20 PM",
  ],

  "INOX - Himalaya Mall": [
    "09:45 AM",
    "01:05 PM",
    "04:25 PM",
    "07:55 PM",
  ],

  "Miraj Cinemas - City Pulse": [
    "10:30 AM",
    "01:45 PM",
    "05:10 PM",
    "08:40 PM",
  ],

  "City Gold - Ashram Road": [
    "10:00 AM",
    "01:10 PM",
    "04:30 PM",
    "08:00 PM",
  ],

  "Rajhans Cinemas": [
    "09:50 AM",
    "01:00 PM",
    "04:30 PM",
    "08:00 PM",
  ],
};

const formatDate = (date) =>
  date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function Show({
  selectedMovie,
  selectedTheatre,
  onBack,
  onContinue,
}) {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(
    today.toISOString().slice(0, 10)
  );

  const [selectedTime, setSelectedTime] = useState("");

  const movieTitle =
    selectedMovie?.title ||
    selectedMovie?.name ||
    selectedMovie?.movieName ||
    "Selected Movie";

  const theatreName =
    selectedTheatre?.name ||
    selectedTheatre?.theatreName ||
    "Selected Theatre";

  const times = useMemo(
    () =>
      schedules[theatreName] || [
        "10:00 AM",
        "01:30 PM",
        "04:45 PM",
        "08:15 PM",
      ],
    [theatreName]
  );

  const dateObject = new Date(
    `${selectedDate}T00:00:00`
  );

  const continueBooking = () => {
    if (!selectedTime) {
      alert("Please select a show time first.");
      return;
    }

    const booking = {
      movie: selectedMovie,
      theatre: selectedTheatre,
      date: selectedDate,
      day: formatDate(dateObject),
      time: selectedTime,
    };

    if (onContinue) {
      onContinue(booking);
    } else {
      alert(
        "Show selected. Seat availability page will be connected next."
      );
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* AUREVIX LOGO AND BACK BUTTON */}
        <div style={styles.topBar}>
          <h2 style={styles.logo}>
            AUREVIX
          </h2>

          <button
            onClick={onBack}
            style={styles.backButton}
          >
            ← Back to Theatres
          </button>
        </div>

        <header style={styles.header}>
          <div style={styles.eyebrow}>
            AUREVIX • SHOW SELECTION
          </div>

          <h1 style={styles.heading}>
            Select Date & Show Time
          </h1>

          <p style={styles.subheading}>
            Choose your preferred show for the selected movie.
          </p>
        </header>

        <section style={styles.moviePanel}>
          <div style={styles.movieIcon}>
            ▶
          </div>

          <div>
            <div style={styles.smallLabel}>
              SELECTED MOVIE
            </div>

            <h2 style={styles.movieName}>
              {movieTitle}
            </h2>

            <p style={styles.theatreText}>
              {theatreName}
              {selectedTheatre?.city
                ? ` • ${selectedTheatre.city}`
                : ""}
            </p>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionTitle}>
            01 / SELECT DATE
          </div>

          <input
            type="date"
            min={today.toISOString().slice(0, 10)}
            value={selectedDate}
            onChange={(event) => {
              setSelectedDate(event.target.value);
              setSelectedTime("");
            }}
            style={styles.dateInput}
          />

          <div style={styles.dateCaption}>
            {formatDate(dateObject)}
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionTitle}>
            02 / SELECT SHOW TIME
          </div>

          <p style={styles.helper}>
            Available show timings for {theatreName}
          </p>

          <div style={styles.timeGrid}>
            {times.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                style={{
                  ...styles.timeButton,
                  ...(selectedTime === time
                    ? styles.timeButtonActive
                    : {}),
                }}
              >
                {time}
              </button>
            ))}
          </div>
        </section>

        {selectedTime && (
          <div style={styles.selectedSummary}>
            <div>
              <div style={styles.smallLabel}>
                YOUR SELECTED SHOW
              </div>

              <strong>
                {selectedDate} • {selectedTime}
              </strong>
            </div>

            <span
              style={{
                color: GOLD,
                fontSize: 22,
              }}
            >
              ✓
            </span>
          </div>
        )}

        <button
          onClick={continueBooking}
          disabled={!selectedTime}
          style={{
            ...styles.continueButton,
            opacity: selectedTime ? 1 : 0.5,
            cursor: selectedTime
              ? "pointer"
              : "not-allowed",
          }}
        >
          Continue
          <span style={{ marginLeft: 8 }}>
            →
          </span>
        </button>

        <p style={styles.demoNote}>
          Note: These are sample show timings for the website
          demo, not live theatre schedules.
        </p>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: BG,
    color: TEXT,
    padding: "30px 18px 60px",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    maxWidth: 900,
    margin: "0 auto",
  },

  // AUREVIX TOP NAVIGATION
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    paddingBottom: 18,
    borderBottom: "1px solid rgba(232,200,121,0.2)",
  },

  logo: {
    color: GOLD,
    letterSpacing: 4,
    fontSize: 25,
    fontWeight: 800,
    margin: 0,
    textShadow: "0 0 15px rgba(232,200,121,0.2)",
  },

  backButton: {
    background: "transparent",
    border: `1px solid ${GOLD}`,
    color: GOLD,
    borderRadius: 9,
    padding: "10px 16px",
    cursor: "pointer",
  },

  header: {
    textAlign: "center",
    margin: "32px 0",
  },

  eyebrow: {
    color: GOLD,
    letterSpacing: 3,
    fontSize: 11,
    fontWeight: 700,
  },

  heading: {
    color: GOLD,
    fontSize: "clamp(28px, 5vw, 42px)",
    margin: "12px 0 8px",
  },

  subheading: {
    color: MUTED,
    margin: 0,
    fontSize: 14,
  },

  moviePanel: {
    display: "flex",
    alignItems: "center",
    gap: 18,
    padding: 22,
    background: CARD,
    border: "1px solid rgba(232,200,121,0.25)",
    borderRadius: 15,
    marginBottom: 28,
  },

  movieIcon: {
    width: 54,
    height: 54,
    flexShrink: 0,
    display: "grid",
    placeItems: "center",
    background: "rgba(232,200,121,0.13)",
    color: GOLD,
    borderRadius: 12,
    fontSize: 22,
  },

  smallLabel: {
    color: GOLD,
    fontSize: 10,
    letterSpacing: 1.8,
    fontWeight: 700,
  },

  movieName: {
    margin: "6px 0",
    fontSize: 22,
  },

  theatreText: {
    color: MUTED,
    margin: 0,
    fontSize: 13,
  },

  section: {
    background: CARD,
    border: "1px solid rgba(232,200,121,0.16)",
    borderRadius: 15,
    padding: 22,
    marginBottom: 18,
  },

  sectionTitle: {
    color: GOLD,
    fontSize: 12,
    letterSpacing: 1.7,
    fontWeight: 700,
  },

  dateInput: {
    display: "block",
    marginTop: 16,
    width: "100%",
    maxWidth: 300,
    boxSizing: "border-box",
    background: BG,
    color: TEXT,
    border: "1px solid #46516A",
    borderRadius: 9,
    padding: 13,
    fontSize: 15,
  },

  dateCaption: {
    color: MUTED,
    marginTop: 10,
    fontSize: 13,
  },

  helper: {
    color: MUTED,
    fontSize: 13,
    margin: "10px 0 16px",
  },

  timeGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(125px, 1fr))",
    gap: 12,
  },

  timeButton: {
    background: BG,
    color: TEXT,
    border: "1px solid #46516A",
    borderRadius: 9,
    padding: "14px 10px",
    cursor: "pointer",
    fontWeight: 600,
  },

  timeButtonActive: {
    background: GOLD,
    color: BG,
    borderColor: GOLD,
    boxShadow: "0 0 0 2px rgba(232,200,121,0.18)",
  },

  selectedSummary: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgba(232,200,121,0.1)",
    border: "1px solid rgba(232,200,121,0.35)",
    borderRadius: 12,
    padding: 17,
    margin: "22px 0",
  },

  continueButton: {
    width: "100%",
    background: GOLD,
    color: BG,
    border: 0,
    borderRadius: 10,
    padding: 16,
    fontWeight: 800,
    fontSize: 15,
    marginTop: 6,
  },

  demoNote: {
    textAlign: "center",
    color: MUTED,
    fontSize: 11,
    marginTop: 18,
  },
};
