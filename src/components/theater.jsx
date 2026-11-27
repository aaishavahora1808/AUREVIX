import React, { useMemo, useState } from "react";

const GOLD = "#E8C879";
const BG = "#10182B";
const CARD = "#18233A";
const TEXT = "#F7F3E9";
const MUTED = "#B9C2D7";

const theatreData = {
  Anand: [
    "Shaan Cinema",
    "INOX",
    "R & S Cinemas",
    "Diya Cinema",
  ],

  Vadodara: [
    "Connplex Cinema",
    "Cineprime Cinema",
    "Cinepolis - Inorbit Mall",
    "INOX - Reliance",
  ],

  Ahmedabad: [
    "PVR Acropolis",
    "PVR Palladium Mall",
    "Cinepolis - Nexus Ahmedabad One",
    "Rajhans Cinemas - The CBD Mall",
    "INOX - Himalaya Mall",
    "Miraj Cinemas - City Pulse",
    "City Gold - Ashram Road",
  ],

  Surat: [
    "Rajhans Cinemas",
  ],
};

export default function Theater({
  selectedMovie,
  onBack,
  onSelectTheatre,
}) {
  const cities = Object.keys(theatreData);

  const [selectedCity, setSelectedCity] = useState("Anand");

  const theatres = useMemo(
    () => theatreData[selectedCity] || [],
    [selectedCity]
  );

  const movieTitle =
    selectedMovie?.title ||
    selectedMovie?.name ||
    selectedMovie?.movieName ||
    "Selected Movie";

  const chooseTheatre = (name) => {
    // Theatre page only selects a theatre.
    // Show timings are on the next page.

    onSelectTheatre?.({
      name,
      city: selectedCity,
      id: `${selectedCity}-${name}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-"),
    });
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
            ← Back
          </button>
        </div>

        <div style={styles.header}>
          <div style={styles.eyebrow}>
            AUREVIX • BOOK YOUR EXPERIENCE
          </div>

          <h1 style={styles.heading}>
            Choose Your Theatre
          </h1>

          <p style={styles.subheading}>
            Select a cinema for{" "}
            <strong style={{ color: GOLD }}>
              {movieTitle}
            </strong>
          </p>
        </div>

        <div style={styles.cityPanel}>
          <div style={styles.sectionLabel}>
            SELECT CITY
          </div>

          <div style={styles.cityRow}>
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                style={{
                  ...styles.cityButton,
                  ...(selectedCity === city
                    ? styles.cityButtonActive
                    : {}),
                }}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.sectionHeader}>
          <div>
            <div style={styles.sectionLabel}>
              AVAILABLE CINEMAS
            </div>

            <h2 style={styles.cityHeading}>
              {selectedCity}
            </h2>
          </div>

          <span style={styles.count}>
            {theatres.length} THEATRES
          </span>
        </div>

        <div style={styles.theatreGrid}>
          {theatres.map((name) => (
            <div
              key={name}
              style={styles.theatreCard}
            >
              <div style={styles.cinemaIcon}>
                ▣
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={styles.theatreName}>
                  {name}
                </h3>

                <p style={styles.theatreCity}>
                  {selectedCity}
                </p>
              </div>

              <button
                onClick={() => chooseTheatre(name)}
                style={styles.selectButton}
              >
                Select Theatre
                <span style={{ marginLeft: 7 }}>
                  →
                </span>
              </button>
            </div>
          ))}
        </div>

        <p style={styles.note}>
          Show dates and timings will appear on the
          next page after you select a theatre.
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
    padding: "32px 18px 60px",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    maxWidth: 1100,
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
    padding: "10px 17px",
    cursor: "pointer",
    fontSize: 14,
  },

  header: {
    textAlign: "center",
    margin: "34px 0 30px",
  },

  eyebrow: {
    color: GOLD,
    letterSpacing: 3,
    fontSize: 11,
    fontWeight: 700,
  },

  heading: {
    color: GOLD,
    fontSize: "clamp(30px, 5vw, 46px)",
    margin: "12px 0 8px",
  },

  subheading: {
    color: MUTED,
    margin: 0,
    fontSize: 15,
  },

  cityPanel: {
    background: CARD,
    border: "1px solid rgba(232,200,121,0.2)",
    borderRadius: 16,
    padding: 22,
    marginBottom: 34,
  },

  sectionLabel: {
    color: GOLD,
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: 700,
  },

  cityRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 15,
  },

  cityButton: {
    background: BG,
    color: TEXT,
    border: "1px solid #39445B",
    borderRadius: 9,
    padding: "11px 20px",
    cursor: "pointer",
  },

  cityButtonActive: {
    background: GOLD,
    color: BG,
    borderColor: GOLD,
    fontWeight: 700,
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    gap: 12,
    marginBottom: 16,
  },

  cityHeading: {
    margin: "7px 0 0",
    fontSize: 25,
    color: GOLD,
  },

  count: {
    color: MUTED,
    fontSize: 11,
    letterSpacing: 1,
  },

  theatreGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 15,
  },

  theatreCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 14,
    background: CARD,
    border: "1px solid rgba(232,200,121,0.18)",
    borderRadius: 14,
    padding: 20,
  },

  cinemaIcon: {
    width: 42,
    height: 42,
    display: "grid",
    placeItems: "center",
    color: GOLD,
    background: "rgba(232,200,121,0.12)",
    borderRadius: 10,
    fontSize: 22,
  },

  theatreName: {
    margin: 0,
    fontSize: 18,
    color: GOLD,
  },

  theatreCity: {
    color: MUTED,
    margin: "6px 0 0",
    fontSize: 13,
  },

  selectButton: {
    width: "100%",
    background: GOLD,
    color: BG,
    border: 0,
    borderRadius: 9,
    padding: "12px 14px",
    fontWeight: 700,
    cursor: "pointer",
  },

  note: {
    color: MUTED,
    textAlign: "center",
    fontSize: 13,
    marginTop: 28,
  },
};