
import React, { useState } from "react";

import Home from "./components/home";
import Details from "./components/details";
import Theater from "./components/theater";
import Show from "./components/show";
import Seat from "./components/seat";
import Payment from "./components/payment";
import PinCode from "./components/PinCode";
import Confirmation from "./components/confirmation";
import Ticket from "./components/ticket";
import Profile from "./components/profile";
import MovieManagement from "./components/movie-management";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);

  const [pendingPayment, setPendingPayment] = useState(null);

  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [bookingId, setBookingId] = useState("");

  const [currentPage, setCurrentPage] = useState("home");

  // Select Movie
  const handleSelectMovie = (item) => {
    setSelectedItem(item);
    setSelectedTheatre(null);
    setSelectedShow(null);
    setPendingPayment(null);
    setConfirmedBooking(null);
    setBookingId("");
    setCurrentPage("details");
  };

  // Book Now
  const handleBookNow = (item) => {
    setSelectedItem(item || selectedItem);
    setSelectedTheatre(null);
    setSelectedShow(null);
    setPendingPayment(null);
    setCurrentPage("theater");
  };

  // Select Theatre
  const handleSelectTheatre = (theatre) => {
    setSelectedTheatre(theatre);
    setCurrentPage("show");
  };

  // Select Show
  const handleShowContinue = (booking) => {
    setSelectedShow(booking);
    setCurrentPage("seat");
  };

  // Select Seats
  const handleSeatContinue = (booking) => {
    setSelectedShow(booking);
    setCurrentPage("payment");
  };

  // Payment: Open PinCode Page
  const handlePayment = (paymentDetails) => {
    setPendingPayment(paymentDetails);
    setCurrentPage("pincode");
  };

  // Successful Demo Verification
  const handlePaymentSuccess = (verifiedDetails) => {
    const newBookingId = `AUR${Date.now().toString().slice(-8)}`;

    const newBooking = {
      ...pendingPayment,
      ...verifiedDetails,
      paymentStatus: "Demo Payment Successful",
      paymentVerified: true,
    };

    setConfirmedBooking(newBooking);
    setBookingId(newBookingId);

    const movieName =
      newBooking?.movie?.title ||
      newBooking?.movie?.name ||
      newBooking?.movie ||
      "Selected Movie";

    const theatreName =
      newBooking?.theatre?.name ||
      newBooking?.theatre ||
      "Selected Theatre";

    const savedBooking = {
      ...newBooking,
      bookingId: newBookingId,
      movieName,
      theatreName,
    };

    try {
      const oldBookings =
        JSON.parse(localStorage.getItem("aurevixBookings")) || [];

      localStorage.setItem(
        "aurevixBookings",
        JSON.stringify([savedBooking, ...oldBookings])
      );
    } catch (error) {
      console.error("Could not save booking:", error);
    }

    setPendingPayment(null);
    setCurrentPage("confirmation");
  };

  // Back to Home
  const handleGoHome = () => {
    setSelectedItem(null);
    setSelectedTheatre(null);
    setSelectedShow(null);
    setPendingPayment(null);
    setConfirmedBooking(null);
    setBookingId("");
    setCurrentPage("home");
  };

  return (
    <>
      {/* Navigation Buttons */}
      {currentPage !== "profile" &&
        currentPage !== "movie-management" && (
          <div
            style={{
              position: "fixed",
              right: "22px",
              bottom: "22px",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "flex-end",
            }}
          >
            <button
              onClick={() => setCurrentPage("movie-management")}
              style={{
                background: "#18233A",
                color: "#E8C879",
                border: "1px solid #E8C879",
                borderRadius: "30px",
                padding: "13px 19px",
                fontWeight: "bold",
                fontSize: "14px",
                cursor: "pointer",
                boxShadow: "0 5px 20px rgba(0,0,0,0.35)",
              }}
            >
              🎬 Movie Management
            </button>

            <button
              onClick={() => setCurrentPage("profile")}
              style={{
                background: "#E8C879",
                color: "#10182B",
                border: "none",
                borderRadius: "30px",
                padding: "13px 20px",
                fontWeight: "bold",
                fontSize: "14px",
                cursor: "pointer",
                boxShadow: "0 5px 20px rgba(0,0,0,0.35)",
              }}
            >
              👤 My Profile
            </button>
          </div>
        )}

      {/* Home Page */}
      {currentPage === "home" && (
        <Home onSelectItem={handleSelectMovie} />
      )}

      {/* Details Page */}
      {currentPage === "details" && (
        <Details
          item={selectedItem}
          onBack={() => setCurrentPage("home")}
          onBookNow={handleBookNow}
        />
      )}

      {/* Theatre Page */}
      {currentPage === "theater" && (
        <Theater
          selectedMovie={selectedItem}
          onBack={() => setCurrentPage("details")}
          onSelectTheatre={handleSelectTheatre}
        />
      )}

      {/* Show Page */}
      {currentPage === "show" && (
        <Show
          selectedMovie={selectedItem}
          selectedTheatre={selectedTheatre}
          onBack={() => setCurrentPage("theater")}
          onContinue={handleShowContinue}
        />
      )}

      {/* Seat Page */}
      {currentPage === "seat" && (
        <Seat
          selectedBooking={selectedShow}
          onBack={() => setCurrentPage("show")}
          onContinue={handleSeatContinue}
        />
      )}

      {/* Payment Page */}
      {currentPage === "payment" && (
        <Payment
          booking={selectedShow}
          onBack={() => setCurrentPage("seat")}
          onPayment={handlePayment}
        />
      )}

      {/* PIN CODE / DEMO VERIFICATION PAGE */}
      {currentPage === "pincode" && (
        <PinCode
          booking={pendingPayment}
          onBack={() => setCurrentPage("payment")}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* Confirmation Page */}
      {currentPage === "confirmation" && (
        <Confirmation
          booking={confirmedBooking}
          bookingId={bookingId}
          onHome={handleGoHome}
          onViewTicket={() => setCurrentPage("ticket")}
        />
      )}

      {/* Ticket Page */}
      {currentPage === "ticket" && (
        <Ticket
          booking={confirmedBooking}
          bookingId={bookingId}
          onBack={() => setCurrentPage("confirmation")}
          onHome={handleGoHome}
        />
      )}

      {/* Profile Page */}
      {currentPage === "profile" && (
        <Profile onBack={handleGoHome} />
      )}

      {/* Movie Management Page */}
      {currentPage === "movie-management" && (
        <MovieManagement onBack={handleGoHome} />
      )}
    </>
  );
}

export default App;
