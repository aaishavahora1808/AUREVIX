
import React from "react";

const GOLD = "#E8C879";
const BG = "#10182B";
const CARD = "#18233A";
const TEXT = "#F7F3E9";
const MUTED = "#B9C2D7";

function Ticket({ booking, bookingId, onBack, onHome }) {
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

  const ticketDetails = [
    ["Theatre", theatreName],
    ["City", cityName],
    ["Date", booking?.date || "—"],
    ["Day", booking?.day || "—"],
    ["Show Time", booking?.time || "—"],
    ["Seats", seats],
    ["Payment Method", booking?.paymentMethod || "—"],
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BG,
        color: TEXT,
        padding: "35px 18px",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "720px", margin: "auto" }}>

        {/* AUREVIX LOGO AND BACK BUTTON */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
            paddingBottom: "18px",
            marginBottom: "25px",
            borderBottom: "1px solid rgba(232,200,121,0.2)",
          }}
        >
          <h2
            style={{
              color: GOLD,
              letterSpacing: "4px",
              fontSize: "25px",
              fontWeight: 800,
              margin: 0,
              textShadow: "0 0 15px rgba(232,200,121,0.2)",
            }}
          >
            AUREVIX
          </h2>

          <button
            onClick={onBack}
            style={{
              background: "transparent",
              color: GOLD,
              border: `1px solid ${GOLD}70`,
              padding: "10px 18px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            ← Back to Confirmation
          </button>
        </div>

        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <h1
            style={{
              color: GOLD,
              fontSize: "32px",
              margin: "0 0 10px",
              letterSpacing: "2px",
            }}
          >
            YOUR MOVIE TICKET
          </h1>

          <p style={{ color: MUTED, margin: 0 }}>
            Your AUREVIX booking details
          </p>
        </div>

        <div
          style={{
            background: CARD,
            border: `1px solid ${GOLD}70`,
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #273653, #18233A)",
              padding: "25px 22px",
              textAlign: "center",
              borderBottom: `1px dashed ${GOLD}80`,
            }}
          >
            <h2
              style={{
                color: GOLD,
                margin: "0 0 12px",
                fontSize: "25px",
                letterSpacing: "3px",
              }}
            >
              AUREVIX
            </h2>

            <h1
              style={{
                color: TEXT,
                fontSize: "27px",
                margin: "0 0 10px",
                overflowWrap: "anywhere",
              }}
            >
              {movieName}
            </h1>

            <p
              style={{
                color: MUTED,
                margin: 0,
                fontSize: "14px",
              }}
            >
              MOVIE ADMISSION TICKET
            </p>
          </div>

          <div style={{ padding: "25px 24px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "22px",
              }}
            >
              <div>
                <p style={{ color: MUTED, fontSize: "12px", margin: "0 0 6px" }}>
                  BOOKING ID
                </p>
                <strong style={{ color: GOLD, fontSize: "17px" }}>
                  {bookingId || "AUREVIX-DEMO"}
                </strong>
              </div>

              <div style={{ textAlign: "right" }}>
                <p style={{ color: MUTED, fontSize: "12px", margin: "0 0 6px" }}>
                  BOOKING STATUS
                </p>
                <strong style={{ color: GOLD, fontSize: "15px" }}>
                  DEMO CONFIRMED
                </strong>
              </div>
            </div>

            <div
              style={{
                borderTop: "1px solid #ffffff20",
                borderBottom: "1px solid #ffffff20",
                padding: "12px 0",
                marginBottom: "12px",
              }}
            >
              {ticketDetails.map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "15px",
                    padding: "11px 0",
                  }}
                >
                  <span style={{ color: MUTED, fontSize: "14px" }}>
                    {label}
                  </span>

                  <strong
                    style={{
                      color: TEXT,
                      fontSize: "14px",
                      textAlign: "right",
                      maxWidth: "60%",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {value}
                  </strong>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 0",
                gap: "12px",
              }}
            >
              <strong style={{ color: MUTED, fontSize: "15px" }}>
                TOTAL AMOUNT
              </strong>

              <strong style={{ color: GOLD, fontSize: "25px" }}>
                ₹{totalAmount}
              </strong>
            </div>

            <div
              style={{
                borderTop: `1px dashed ${GOLD}80`,
                paddingTop: "22px",
                marginTop: "10px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "125px",
                  height: "125px",
                  margin: "0 auto 12px",
                  background: "#F7F3E9",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "2px dashed #18233A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    color: "#18233A",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  QR CODE
                  <br />
                  PLACEHOLDER
                </div>
              </div>

              <p
                style={{
                  color: MUTED,
                  fontSize: "12px",
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                This is a demo ticket. The QR code and actual ticket
                verification will be connected with the backend later.
              </p>
            </div>
          </div>

          <div
            style={{
              background: "#111B2E",
              padding: "15px",
              textAlign: "center",
              color: GOLD,
              fontSize: "13px",
              letterSpacing: "1px",
            }}
          >
            THANK YOU FOR BOOKING WITH AUREVIX
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginTop: "25px",
          }}
        >
          <button
            onClick={onHome}
            style={{
              background: GOLD,
              color: BG,
              border: "none",
              padding: "14px 25px",
              borderRadius: "9px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
