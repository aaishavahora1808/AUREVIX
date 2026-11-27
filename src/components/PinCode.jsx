
import React, { useState } from "react";

const GOLD = "#E8C879";
const BG = "#10182B";
const CARD = "#18233A";
const TEXT = "#F7F3E9";
const MUTED = "#B9C2D7";

export default function PinCode({
  booking,
  onBack,
  onPaymentSuccess,
}) {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");

  const handleCodeChange = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    setVerificationCode(digits);
    setError("");
  };

  const handleVerify = () => {
    if (verificationCode.length !== 4) {
      setError("Please enter all 4 digits.");
      return;
    }

    // Demo verification only.
    // This is NOT an actual UPI PIN or real payment.

    onPaymentSuccess?.({
      ...booking,
      paymentStatus: "Demo Payment Successful",
      paymentVerified: true,
    });
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* AUREVIX HEADER */}
        <div style={styles.topBar}>
          <h2 style={styles.logo}>AUREVIX</h2>

          <button
            onClick={onBack}
            style={styles.backButton}
          >
            ← Back
          </button>
        </div>

        {/* MAIN CONTENT */}
        <div style={styles.card}>

          <div style={styles.lockIcon}>
            🔐
          </div>

          <div style={styles.eyebrow}>
            AUREVIX • PAYMENT VERIFICATION
          </div>

          <h1 style={styles.heading}>
            Verify Your Payment
          </h1>

          <p style={styles.description}>
            Enter the 4-digit demo verification code
            to continue with your booking.
          </p>

          {/* BOOKING AMOUNT */}
          <div style={styles.amountBox}>
            <span style={styles.amountLabel}>
              TOTAL BOOKING AMOUNT
            </span>

            <h2 style={styles.amount}>
              ₹{booking?.totalAmount || booking?.amount || 0}
            </h2>
          </div>

          {/* DEMO CODE INPUT */}
          <label style={styles.inputLabel}>
            4-Digit Demo Verification Code
          </label>

          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={verificationCode}
            onChange={(e) =>
              handleCodeChange(e.target.value)
            }
            placeholder="••••"
            style={styles.input}
          />

          {error && (
            <p style={styles.error}>
              {error}
            </p>
          )}

          <p style={styles.warning}>
            Demo screen only. Never enter your real
            UPI PIN here.
          </p>

          {/* VERIFY BUTTON */}
          <button
            onClick={handleVerify}
            style={styles.payButton}
          >
            Verify & Continue
            <span style={{ marginLeft: 8 }}>→</span>
          </button>

          <p style={styles.footerText}>
            Your real UPI PIN should only be entered
            inside your trusted UPI payment app.
          </p>

        </div>
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
    maxWidth: 650,
    margin: "0 auto",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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

  card: {
    background: CARD,
    border: "1px solid rgba(232,200,121,0.25)",
    borderRadius: 20,
    padding: "35px 25px",
    marginTop: 45,
    textAlign: "center",
    boxShadow: "0 15px 45px rgba(0,0,0,0.25)",
  },

  lockIcon: {
    fontSize: 42,
    marginBottom: 18,
  },

  eyebrow: {
    color: GOLD,
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: 700,
  },

  heading: {
    color: GOLD,
    fontSize: "clamp(25px, 5vw, 34px)",
    margin: "14px 0 10px",
  },

  description: {
    color: MUTED,
    fontSize: 14,
    lineHeight: 1.7,
    marginBottom: 28,
  },

  amountBox: {
    background: BG,
    border: "1px solid rgba(232,200,121,0.2)",
    borderRadius: 12,
    padding: 18,
    marginBottom: 28,
  },

  amountLabel: {
    color: MUTED,
    fontSize: 11,
    letterSpacing: 1.5,
  },

  amount: {
    color: GOLD,
    fontSize: 30,
    margin: "10px 0 0",
  },

  inputLabel: {
    display: "block",
    color: TEXT,
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 13,
  },

  input: {
    width: "100%",
    maxWidth: 220,
    boxSizing: "border-box",
    background: BG,
    color: GOLD,
    border: `1px solid ${GOLD}`,
    borderRadius: 12,
    padding: "16px",
    fontSize: 25,
    letterSpacing: 12,
    textAlign: "center",
    outline: "none",
  },

  error: {
    color: "#FF7777",
    fontSize: 13,
    marginTop: 10,
  },

  warning: {
    color: GOLD,
    fontSize: 12,
    lineHeight: 1.6,
    margin: "20px 0",
  },

  payButton: {
    width: "100%",
    background: GOLD,
    color: BG,
    border: 0,
    borderRadius: 10,
    padding: "15px",
    fontSize: 15,
    fontWeight: 800,
    cursor: "pointer",
  },

  footerText: {
    color: MUTED,
    fontSize: 11,
    lineHeight: 1.6,
    margin: "20px 0 0",
  },
};
