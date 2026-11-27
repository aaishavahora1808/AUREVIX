
import React, { useState } from "react";

const GOLD = "#E8C879";
const BG = "#10182B";
const CARD = "#18233A";
const TEXT = "#F7F3E9";
const MUTED = "#B9C2D7";

const rows = ["A", "B", "C", "D", "E"];

const bookedSeats = [
  "A3", "A4", "B2", "B7",
  "C4", "C5", "D1", "D8",
  "E3", "E6"
];

const getSeatPrice = (row) => {
  return ["A", "B", "C"].includes(row) ? 180 : 250;
};

function Seat({ selectedBooking, onBack, onContinue }) {
  const [selectedSeats, setSelectedSeats] = useState(
    selectedBooking?.seats || []
  );

  const toggleSeat = (seatId) => {
    if (bookedSeats.includes(seatId)) return;

    setSelectedSeats((previous) =>
      previous.includes(seatId)
        ? previous.filter((seat) => seat !== seatId)
        : [...previous, seatId]
    );
  };

  const totalAmount = selectedSeats.reduce((total, seat) => {
    return total + getSeatPrice(seat[0]);
  }, 0);

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    if (onContinue) {
      onContinue({
        ...selectedBooking,
        seats: selectedSeats,
        totalAmount: totalAmount
      });
    }
  };

  const seatStyle = (seatId) => {
    const isBooked = bookedSeats.includes(seatId);
    const isSelected = selectedSeats.includes(seatId);

    return {
      width: "38px",
      height: "36px",
      borderRadius: "8px 8px 4px 4px",
      border: isSelected
        ? `2px solid ${GOLD}`
        : isBooked
        ? "1px solid #626A78"
        : "1px solid #36B77A",
      background: isSelected
        ? GOLD
        : isBooked
        ? "#555D6B"
        : "transparent",
      color: isSelected ? BG : isBooked ? "#D0D3D8" : "#54D99A",
      cursor: isBooked ? "not-allowed" : "pointer",
      fontWeight: "bold",
      fontSize: "11px",
      transition: "0.2s"
    };
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BG,
        color: TEXT,
        padding: "30px 20px",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <div style={{ maxWidth: "950px", margin: "auto" }}>

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

        <h1
          style={{
            color: GOLD,
            textAlign: "center",
            fontSize: "32px",
            marginBottom: "8px"
          }}
        >
          Select Your Seats
        </h1>

        <p style={{ color: MUTED, textAlign: "center" }}>
          Choose your preferred seats for the movie
        </p>

        <div
          style={{
            background: CARD,
            borderRadius: "14px",
            padding: "20px",
            marginTop: "25px",
            marginBottom: "25px",
            lineHeight: "1.9"
          }}
        >
          <h3 style={{ color: GOLD, marginTop: 0 }}>
            Booking Details
          </h3>

          <div>
            <strong>Movie:</strong>{" "}
            {selectedBooking?.movie?.title ||
              selectedBooking?.movie ||
              "Selected Movie"}
          </div>

          <div>
            <strong>Theatre:</strong>{" "}
            {selectedBooking?.theatre?.name ||
              selectedBooking?.theatre ||
              "Selected Theatre"}
          </div>

          <div>
            <strong>City:</strong>{" "}
            {selectedBooking?.theatre?.city || "—"}
          </div>

          <div>
            <strong>Date:</strong>{" "}
            {selectedBooking?.date || "—"}
          </div>

          <div>
            <strong>Day:</strong>{" "}
            {selectedBooking?.day || "—"}
          </div>

          <div>
            <strong>Show Time:</strong>{" "}
            {selectedBooking?.time || "—"}
          </div>
        </div>

        <div
          style={{
            background: CARD,
            borderRadius: "16px",
            padding: "25px 12px",
            overflowX: "auto"
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "35px"
            }}
          >
            <div
              style={{
                width: "75%",
                maxWidth: "550px",
                height: "7px",
                background: GOLD,
                borderRadius: "50%",
                margin: "auto",
                boxShadow: `0 5px 18px ${GOLD}55`
              }}
            />

            <p
              style={{
                color: MUTED,
                fontSize: "12px",
                letterSpacing: "4px",
                marginTop: "14px"
              }}
            >
              SCREEN THIS SIDE
            </p>
          </div>

          <div style={{ minWidth: "340px" }}>
            {rows.map((row) => (
              <div
                key={row}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "14px"
                }}
              >
                <strong
                  style={{
                    width: "18px",
                    color: GOLD
                  }}
                >
                  {row}
                </strong>

                <div
                  style={{
                    display: "flex",
                    gap: "7px"
                  }}
                >
                  {Array.from({ length: 8 }, (_, index) => {
                    const seatId = `${row}${index + 1}`;

                    return (
                      <button
                        key={seatId}
                        onClick={() => toggleSeat(seatId)}
                        disabled={bookedSeats.includes(seatId)}
                        style={seatStyle(seatId)}
                        title={
                          bookedSeats.includes(seatId)
                            ? "Booked"
                            : `Select ${seatId}`
                        }
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              flexWrap: "wrap",
              marginTop: "35px"
            }}
          >
            <div style={{ display: "flex", gap: "7px", alignItems: "center" }}>
              <span style={{ width: 14, height: 14, background: "transparent", border: "1px solid #36B77A", borderRadius: 4 }} />
              <span style={{ color: MUTED, fontSize: 12 }}>Available</span>
            </div>

            <div style={{ display: "flex", gap: "7px", alignItems: "center" }}>
              <span style={{ width: 14, height: 14, background: GOLD, borderRadius: 4 }} />
              <span style={{ color: MUTED, fontSize: 12 }}>Selected</span>
            </div>

            <div style={{ display: "flex", gap: "7px", alignItems: "center" }}>
              <span style={{ width: 14, height: 14, background: "#555D6B", borderRadius: 4 }} />
              <span style={{ color: MUTED, fontSize: 12 }}>Booked</span>
            </div>
          </div>
        </div>

        <div
          style={{
            background: CARD,
            borderRadius: "14px",
            padding: "22px",
            marginTop: "25px"
          }}
        >
          <h3 style={{ color: GOLD, marginTop: 0 }}>
            Seat Summary
          </h3>

          <p style={{ color: MUTED }}>
            Selected Seats:{" "}
            <strong style={{ color: TEXT }}>
              {selectedSeats.length > 0
                ? selectedSeats.join(", ")
                : "No seats selected"}
            </strong>
          </p>

          <p style={{ color: MUTED }}>
            Total Seats:{" "}
            <strong style={{ color: TEXT }}>
              {selectedSeats.length}
            </strong>
          </p>

          <p style={{ color: MUTED }}>
            Total Amount:{" "}
            <strong style={{ color: GOLD, fontSize: "23px" }}>
              ₹{totalAmount}
            </strong>
          </p>

          <p style={{ color: MUTED, fontSize: "12px" }}>
            Rows A-C: ₹180 per seat | Rows D-E: ₹250 per seat
          </p>

          <button
            onClick={handleContinue}
            style={{
              width: "100%",
              padding: "15px",
              background: GOLD,
              color: BG,
              border: "none",
              borderRadius: "9px",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "10px"
            }}
          >
            Continue
          </button>
        </div>

      </div>
    </div>
  );
}

const styles = {
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    paddingBottom: 18,
    marginBottom: 25,
    borderBottom: "1px solid rgba(232,200,121,0.2)"
  },

  logo: {
    color: GOLD,
    letterSpacing: 4,
    fontSize: 25,
    fontWeight: 800,
    margin: 0,
    textShadow: "0 0 15px rgba(232,200,121,0.2)"
  },

  backButton: {
    background: "transparent",
    color: GOLD,
    border: `1px solid ${GOLD}`,
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default Seat;
