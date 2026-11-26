
import React, { useState } from "react";

const GOLD = "#E8C879";
const BG = "#10182B";
const CARD = "#18233A";
const TEXT = "#F7F3E9";
const MUTED = "#B9C2D7";

const STORAGE_KEY = "aurevixManagedMovies";

const getMovies = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

function MovieManagement({ onBack }) {
  const [movies, setMovies] = useState(getMovies);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const emptyForm = {
    title: "",
    category: "Bollywood",
    year: "",
    language: "",
    poster: "",
    description: "",
  };

  const [form, setForm] = useState(emptyForm);

  const saveMovies = (updatedMovies) => {
    setMovies(updatedMovies);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMovies));
  };

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px",
    marginTop: "7px",
    marginBottom: "17px",
    background: BG,
    color: TEXT,
    border: "1px solid #46516A",
    borderRadius: "8px",
    outline: "none",
    fontSize: "14px",
  };

  const primaryButton = {
    background: GOLD,
    color: BG,
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const secondaryButton = {
    background: "transparent",
    color: GOLD,
    border: `1px solid ${GOLD}80`,
    padding: "10px 17px",
    borderRadius: "8px",
    cursor: "pointer",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
    setMessage("");
  };

  const openEditForm = (movie) => {
    setForm({
      title: movie.title || "",
      category: movie.category || "Bollywood",
      year: movie.year || "",
      language: movie.language || "",
      poster: movie.poster || "",
      description: movie.description || "",
    });

    setEditingId(movie.id);
    setShowForm(true);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setMessage("Please enter the movie title.");
      return;
    }

    const movieData = {
      ...form,
      title: form.title.trim(),
      year: form.year.trim(),
      language: form.language.trim(),
      poster: form.poster.trim(),
      description: form.description.trim(),
    };

    if (editingId !== null) {
      const updatedMovies = movies.map((movie) =>
        movie.id === editingId
          ? { ...movie, ...movieData }
          : movie
      );

      saveMovies(updatedMovies);
      setMessage("Movie updated successfully!");
    } else {
      const newMovie = {
        id: Date.now(),
        ...movieData,
      };

      saveMovies([newMovie, ...movies]);
      setMessage("Movie added successfully!");
    }

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this movie?"
    );

    if (!confirmed) return;

    saveMovies(movies.filter((movie) => movie.id !== id));
    setMessage("Movie deleted successfully!");
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BG,
        color: TEXT,
        padding: "30px 18px 50px",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1150px", margin: "auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <h1
            style={{
              color: GOLD,
              letterSpacing: "3px",
              margin: 0,
              fontSize: "25px",
            }}
          >
            AUREVIX
          </h1>

          <button onClick={onBack} style={secondaryButton}>
            ← Back to Website
          </button>
        </div>

        <div style={{ margin: "38px 0 25px" }}>
          <p
            style={{
              color: GOLD,
              letterSpacing: "3px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            ADMIN PANEL
          </p>

          <h1 style={{ fontSize: "32px", margin: "8px 0" }}>
            Movie Management
          </h1>

          <p style={{ color: MUTED, margin: 0 }}>
            Add, view, update and delete your movie details.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "15px",
            marginBottom: "28px",
          }}
        >
          {[
            ["Total Movies", movies.length],
            [
              "Bollywood",
              movies.filter((m) => m.category === "Bollywood").length,
            ],
            [
              "Hollywood",
              movies.filter((m) => m.category === "Hollywood").length,
            ],
            [
              "Other",
              movies.filter(
                (m) =>
                  m.category !== "Bollywood" &&
                  m.category !== "Hollywood"
              ).length,
            ],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                background: CARD,
                border: `1px solid ${GOLD}40`,
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              <p style={{ color: MUTED, margin: "0 0 10px", fontSize: "13px" }}>
                {label}
              </p>
              <h2 style={{ color: GOLD, margin: 0, fontSize: "28px" }}>
                {value}
              </h2>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
            marginBottom: "22px",
          }}
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search movies..."
            style={{
              ...inputStyle,
              maxWidth: "350px",
              margin: 0,
            }}
          />

          <button onClick={openAddForm} style={primaryButton}>
            + Add New Movie
          </button>
        </div>

        {message && (
          <p
            style={{
              color: GOLD,
              background: "#E8C87915",
              padding: "12px 15px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            {message}
          </p>
        )}

        {showForm && (
          <div
            style={{
              background: CARD,
              border: `1px solid ${GOLD}70`,
              borderRadius: "15px",
              padding: "25px",
              marginBottom: "30px",
            }}
          >
            <h2 style={{ color: GOLD, marginTop: 0 }}>
              {editingId !== null ? "Update Movie" : "Add New Movie"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "0 20px",
                }}
              >
                <div>
                  <label style={{ color: MUTED, fontSize: "14px" }}>
                    Movie Title *
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter movie name"
                    style={inputStyle}
                    required
                  />
                </div>

                <div>
                  <label style={{ color: MUTED, fontSize: "14px" }}>
                    Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    style={inputStyle}
                  >
                    <option value="Bollywood">Bollywood</option>
                    <option value="Hollywood">Hollywood</option>
                    <option value="TV Show">TV Show</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ color: MUTED, fontSize: "14px" }}>
                    Release Year
                  </label>
                  <input
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    placeholder="e.g. 2026"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ color: MUTED, fontSize: "14px" }}>
                    Language
                  </label>
                  <input
                    name="language"
                    value={form.language}
                    onChange={handleChange}
                    placeholder="e.g. Hindi"
                    style={inputStyle}
                  />
                </div>
              </div>

              <label style={{ color: MUTED, fontSize: "14px" }}>
                Poster Image URL
              </label>
              <input
                name="poster"
                value={form.poster}
                onChange={handleChange}
                placeholder="Paste poster image URL"
                style={inputStyle}
              />

              <label style={{ color: MUTED, fontSize: "14px" }}>
                Movie Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Write movie details..."
                rows={4}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                }}
              />

              {form.poster && (
                <div style={{ marginBottom: "18px" }}>
                  <p style={{ color: MUTED, fontSize: "13px" }}>
                    Poster Preview
                  </p>
                  <img
                    src={form.poster}
                    alt="Movie poster preview"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    style={{
                      width: "120px",
                      height: "165px",
                      objectFit: "cover",
                      borderRadius: "9px",
                    }}
                  />
                </div>
              )}

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button type="submit" style={primaryButton}>
                  {editingId !== null ? "Update Movie" : "Save Movie"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setForm(emptyForm);
                    setMessage("");
                  }}
                  style={secondaryButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <h2 style={{ color: GOLD, marginBottom: "18px" }}>
          All Managed Movies ({filteredMovies.length})
        </h2>

        {filteredMovies.length === 0 ? (
          <div
            style={{
              background: CARD,
              border: "1px dashed #66718A",
              borderRadius: "14px",
              padding: "45px 20px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "42px", marginBottom: "12px" }}>🎬</div>
            <h3 style={{ color: TEXT, margin: "0 0 10px" }}>
              No Movies Found
            </h3>
            <p style={{ color: MUTED, margin: 0 }}>
              Add your first movie using the Add New Movie button.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                style={{
                  background: CARD,
                  border: `1px solid ${GOLD}35`,
                  borderRadius: "13px",
                  overflow: "hidden",
                }}
              >
                {movie.poster ? (
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    style={{
                      width: "100%",
                      height: "240px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: "180px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#10182B",
                      fontSize: "45px",
                    }}
                  >
                    🎬
                  </div>
                )}

                <div style={{ padding: "16px" }}>
                  <span
                    style={{
                      color: GOLD,
                      fontSize: "11px",
                      letterSpacing: "1px",
                    }}
                  >
                    {movie.category}
                  </span>

                  <h3
                    style={{
                      color: TEXT,
                      margin: "8px 0",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {movie.title}
                  </h3>

                  <p
                    style={{
                      color: MUTED,
                      fontSize: "13px",
                      margin: "0 0 15px",
                    }}
                  >
                    {movie.year || "Year not added"}
                    {movie.language ? ` · ${movie.language}` : ""}
                  </p>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => openEditForm(movie)}
                      style={{
                        ...secondaryButton,
                        flex: 1,
                        padding: "9px 5px",
                      }}
                    >
                      Update
                    </button>

                    <button
                      onClick={() => handleDelete(movie.id)}
                      style={{
                        flex: 1,
                        background: "#7E3038",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "8px",
                        padding: "9px 5px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>

                  {movie.description && (
                    <details style={{ marginTop: "13px", color: MUTED }}>
                      <summary style={{ cursor: "pointer", fontSize: "13px" }}>
                        View Description
                      </summary>
                      <p style={{ fontSize: "13px", lineHeight: "1.6" }}>
                        {movie.description}
                      </p>
                    </details>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieManagement;
