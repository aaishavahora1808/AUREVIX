
import React, { useState } from "react";

const GOLD = "#E8C879";
const BG = "#10182B";
const CARD = "#18233A";
const TEXT = "#F7F3E9";
const MUTED = "#B9C2D7";

function Payment({ booking, onBack, onPayment }) {
  const [selectedMethod, setSelectedMethod] = useState("UPI");

  const methods = [
    {
      name: "UPI",
      detail: "Google Pay, PhonePe, Paytm"
    },
    {
      name: "Credit Card",
      detail: "Pay using your credit card"
    },
    {
      name: "Debit Card",
      detail: "Pay using your debit card"
    },
    {
      name: "Net Banking",
      detail: "Pay through your bank"
    },
    {
      name: "Wallet",
      detail: "Pay using your digital wallet"
    }
  ];

  const handlePayment = () => {
    if (!selectedMethod) {
      alert("Please select a payment method.");
      return;
    }

    // Open PinCode page instead of confirming ticket directly.
    if (onPayment) {
      onPayment({
        ...booking,
        paymentMethod: selectedMethod
      });
    }
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
      <div
        style={{
          maxWidth: "750px",
          margin: "auto"
        }}
      >

        {/* AUREVIX LOGO AND BACK BUTTON */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
            paddingBottom: "18px",
            marginBottom: "25px",
            borderBottom: "1px solid rgba(232,200,121,0.2)"
          }}
        >
          <h2
            style={{
              color: GOLD,
              letterSpacing: "4px",
              fontSize: "25px",
              fontWeight: 800,
              margin: 0,
              textShadow: "0 0 15px rgba(232,200,121,0.2)"
            }}
          >
            AUREVIX
          </h2>

          <button
            onClick={onBack}
            style={{
              background: "transparent",
              color: GOLD,
              border: `1px solid ${GOLD}`,
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            ← Back to Seats
          </button>
        </div>

        {/* Page Heading */}

        <h1
          style={{
            color: GOLD,
            textAlign: "center",
            fontSize: "32px",
            marginBottom: "8px"
          }}
        >
          Payment
        </h1>

        <p
          style={{
            color: MUTED,
            textAlign: "center"
          }}
        >
          Choose your preferred payment method
        </p>

        {/* Booking Summary */}

        <div
          style={{
            background: CARD,
            padding: "22px",
            borderRadius: "14px",
            marginTop: "28px",
            lineHeight: "1.9"
          }}
        >
          <h3
            style={{
              color: GOLD,
              marginTop: 0
            }}
          >
            Booking Summary
          </h3>

          <p>
            <strong>Movie:</strong>{" "}
            {booking?.movie?.title ||
              booking?.movie ||
              "Selected Movie"}
          </p>

          <p>
            <strong>Theatre:</strong>{" "}
            {booking?.theatre?.name ||
              booking?.theatre ||
              "Selected Theatre"}
          </p>

          <p>
            <strong>City:</strong>{" "}
            {booking?.theatre?.city || "—"}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {booking?.date || "—"}
          </p>

          <p>
            <strong>Show Time:</strong>{" "}
            {booking?.time || "—"}
          </p>

          <p>
            <strong>Selected Seats:</strong>{" "}
            {booking?.seats?.join(", ") || "—"}
          </p>

          <div
            style={{
              borderTop: "1px solid #39445A",
              marginTop: "15px",
              paddingTop: "15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <strong>Total Amount</strong>

            <strong
              style={{
                color: GOLD,
                fontSize: "25px"
              }}
            >
              ₹{booking?.totalAmount || 0}
            </strong>
          </div>
        </div>

        {/* Payment Methods */}

        <div
          style={{
            background: CARD,
            padding: "22px",
            borderRadius: "14px",
            marginTop: "22px"
          }}
        >
          <h3
            style={{
              color: GOLD,
              marginTop: 0
            }}
          >
            Select Payment Method
          </h3>

          <div
            style={{
              display: "grid",
              gap: "12px"
            }}
          >
            {methods.map((method) => {
              const active =
                selectedMethod === method.name;

              return (
                <button
                  key={method.name}
                  onClick={() =>
                    setSelectedMethod(method.name)
                  }
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textAlign: "left",
                    padding: "16px",
                    borderRadius: "10px",
                    border: active
                      ? `2px solid ${GOLD}`
                      : "1px solid #39445A",
                    background: active
                      ? "#29334A"
                      : "transparent",
                    color: TEXT,
                    cursor: "pointer"
                  }}
                >
                  <span>
                    <strong>{method.name}</strong>

                    <br />

                    <span
                      style={{
                        color: MUTED,
                        fontSize: "12px"
                      }}
                    >
                      {method.detail}
                    </span>
                  </span>

                  <span
                    style={{
                      color: active ? GOLD : MUTED,
                      fontSize: "20px"
                    }}
                  >
                    {active ? "●" : "○"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Pay Button */}

          <button
            onClick={handlePayment}
            style={{
              width: "100%",
              padding: "16px",
              marginTop: "25px",
              background: GOLD,
              color: BG,
              border: "none",
              borderRadius: "9px",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            Continue to Verification
            ₹{booking?.totalAmount || 0}
          </button>

          <p
            style={{
              color: MUTED,
              fontSize: "11px",
              textAlign: "center",
              marginBottom: 0,
              marginTop: "14px"
            }}
          >
            Demo payment screen. No real payment
            will be processed.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Payment;
