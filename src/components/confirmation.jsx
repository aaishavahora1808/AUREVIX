import React from "react";

const GOLD = "#E8C879";
const BG = "#10182B";
const CARD = "#18233A";
const TEXT = "#F7F3E9";
const MUTED = "#B9C2D7";

function Confirmation({ booking, bookingId, onHome, onViewTicket }) {
  const movieName =
    booking?.movie?.title ||
    booking?.movie?.name ||
    booking?.movie ||
    "Selected Movie";

  const theatreName =
    booking?.theatre?.name ||
    booking?.theatre ||
    "Selected Theatre";

  const cityName = booking?.theatre?.city || "—";

  const seats = Array.isArray(booking?.seats)
    ? booking.seats.join(", ")
    : "—";

  const totalAmount = booking?.totalAmount || 0;

  const details = [
    ["Movie", movieName],
    ["Theatre", theatreName],
    ["City", cityName],
    ["Date", booking?.date || "—"],
    ["Day", booking?.day || "—"],
    ["Show Time", booking?.time || "—"],
    ["Selected Seats", seats],
    ["Payment Method", booking?.paymentMethod || "—"],
    ["Total Amount", `₹${totalAmount}`],
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BG,
        color: TEXT,
        padding: "35px 18px",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "750px",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "85px",
            height: "85px",
            borderRadius: "50%",
            border: `2px solid ${GOLD}`,
            color: GOLD,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "48px",
            margin: "10px auto 22px",
            boxShadow: `0 0 25px ${GOLD}35`,
          }}
        >
          ✓
        </div>

        <h1 style={{ color: GOLD, fontSize: "34px", margin: "0 0 12px" }}>
          Booking Confirmed!
        </h1>

        <p
          style={{
            color: MUTED,
            fontSize: "16px",
            lineHeight: "1.6",
            marginBottom: "30px",
          }}
        >
          Your demo booking details are ready.
          <br />
          Thank you for choosing AUREVIX!
        </p>

        <div
          style={{
            background: CARD,
            border: `1px solid ${GOLD}55`,
            borderRadius: "18px",
            padding: "28px",
            textAlign: "left",
            boxShadow: "0 12px 35px rgba(0,0,0,0.25)",
          }}
        >
          <div
            style={{
              textAlign: "center",
              borderBottom: "1px solid #ffffff20",
              paddingBottom: "20px",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                color: GOLD,
                margin: "0 0 10px",
                fontSize: "23px",
                letterSpacing: "2px",
              }}
            >
              AUREVIX
            </h2>

            <p style={{ color: MUTED, margin: 0, fontSize: "14px" }}>
              Booking Reference
            </p>

            <h3
              style={{
                color: TEXT,
                margin: "8px 0 0",
                fontSize: "20px",
                letterSpacing: "1px",
              }}
            >
              {bookingId || "AUREVIX-DEMO"}
            </h3>
          </div>

          <h3 style={{ color: GOLD, marginTop: 0, marginBottom: "20px" }}>
            Booking Details
          </h3>

          {details.map(([label, value]) => (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "15px",
                padding: "12px 0",
                borderBottom: "1px solid #ffffff12",
              }}
            >
              <span style={{ color: MUTED, fontSize: "14px", flex: "1" }}>
                {label}
              </span>

              <span
                style={{
                  color: label === "Total Amount" ? GOLD : TEXT,
                  fontWeight: "bold",
                  fontSize: "14px",
                  textAlign: "right",
                  flex: "1.3",
                  overflowWrap: "anywhere",
                }}
              >
                {value}
              </span>
            </div>
          ))}

          <div
            style={{
              marginTop: "22px",
              padding: "13px",
              background: "#E8C87915",
              border: `1px solid ${GOLD}55`,
              borderRadius: "10px",
              color: GOLD,
              textAlign: "center",
              fontSize: "13px",
              lineHeight: "1.6",
            }}
          >
            Demo booking confirmation. No real payment has been processed.
            A payment gateway will be connected later.
          </div>
        </div>

        <button
          onClick={onViewTicket}
          style={{
            marginTop: "28px",
            padding: "15px 35px",
            background: GOLD,
            color: BG,
            border: "none",
            borderRadius: "9px",
            fontSize: "15px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          View Ticket →
        </button>

        <div>
          <button
            onClick={onHome}
            style={{
              marginTop: "15px",
              padding: "12px 25px",
              background: "transparent",
              color: GOLD,
              border: `1px solid ${GOLD}70`,
              borderRadius: "9px",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;