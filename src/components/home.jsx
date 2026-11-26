
import React, { useState, useEffect } from "react";

const GOLD = "#E8C879";
const BLACK = "#10182B";
const TEXT = "#F7F3E9";
const MUTED = "#B9C2D7";

const movies = [
  // Bollywood - 20
  { title: "Jawan", wiki: "Jawan (film)", category: "Bollywood", year: 2023 },
  { title: "Pathaan", wiki: "Pathaan (film)", category: "Bollywood", year: 2023 },
  { title: "Animal", wiki: "Animal (2023 Indian film)", category: "Bollywood", year: 2023 },
  { title: "Dangal", wiki: "Dangal (film)", category: "Bollywood", year: 2016 },
  { title: "3 Idiots", wiki: "3 Idiots", category: "Bollywood", year: 2009 },
  { title: "KGF Chapter 2", wiki: "K.G.F: Chapter 2", category: "Bollywood", year: 2022 },
  { title: "Brahmastra", wiki: "Brahmastra: Part One – Shiva", category: "Bollywood", year: 2022 },
  { title: "War", wiki: "War (2019 film)", category: "Bollywood", year: 2019 },
  { title: "Tiger 3", wiki: "Tiger 3", category: "Bollywood", year: 2023 },
  { title: "Bajrangi Bhaijaan", wiki: "Bajrangi Bhaijaan", category: "Bollywood", year: 2015 },
  { title: "Pushpa", wiki: "Pushpa: The Rise", category: "Bollywood", year: 2021 },
  { title: "RRR", wiki: "RRR (film)", category: "Bollywood", year: 2022 },
  { title: "Sultan", wiki: "Sultan (2016 film)", category: "Bollywood", year: 2016 },
  { title: "Drishyam 2", wiki: "Drishyam 2", category: "Bollywood", year: 2022 },
  { title: "Kantara", wiki: "Kantara (film)", category: "Bollywood", year: 2022 },
  { title: "Chhaava", wiki: "Chhaava", category: "Bollywood", year: 2025 },
  { title: "Stree 2", wiki: "Stree 2", category: "Bollywood", year: 2024 },
  { title: "Fighter", wiki: "Fighter (2024 film)", category: "Bollywood", year: 2024 },
  { title: "Shershaah", wiki: "Shershaah", category: "Bollywood", year: 2021 },
  { title: "Laapataa Ladies", wiki: "Laapataa Ladies", category: "Bollywood", year: 2024 },

  // Hollywood - 20
  { title: "Oppenheimer", wiki: "Oppenheimer (film)", category: "Hollywood", year: 2023 },
  { title: "Barbie", wiki: "Barbie (film)", category: "Hollywood", year: 2023 },
  { title: "Dune: Part Two", wiki: "Dune: Part Two", category: "Hollywood", year: 2024 },
  { title: "Avatar: The Way of Water", wiki: "Avatar: The Way of Water", category: "Hollywood", year: 2022 },
  { title: "Avengers: Endgame", wiki: "Avengers: Endgame", category: "Hollywood", year: 2019 },
  { title: "Titanic", wiki: "Titanic (1997 film)", category: "Hollywood", year: 1997 },
  { title: "The Batman", wiki: "The Batman (film)", category: "Hollywood", year: 2022 },
  { title: "Joker", wiki: "Joker (2019 film)", category: "Hollywood", year: 2019 },
  { title: "Interstellar", wiki: "Interstellar (film)", category: "Hollywood", year: 2014 },
  { title: "Inception", wiki: "Inception", category: "Hollywood", year: 2010 },
  { title: "Spider-Man: No Way Home", wiki: "Spider-Man: No Way Home", category: "Hollywood", year: 2021 },
  { title: "The Dark Knight", wiki: "The Dark Knight", category: "Hollywood", year: 2008 },
  { title: "Frozen", wiki: "Frozen (2013 film)", category: "Hollywood", year: 2013 },
  { title: "Black Panther", wiki: "Black Panther (film)", category: "Hollywood", year: 2018 },
  { title: "Doctor Strange", wiki: "Doctor Strange (2016 film)", category: "Hollywood", year: 2016 },
  { title: "The Conjuring", wiki: "The Conjuring", category: "Hollywood", year: 2013 },
  { title: "Mission Impossible", wiki: "Mission: Impossible – Dead Reckoning Part One", category: "Hollywood", year: 2023 },
  { title: "Jurassic World", wiki: "Jurassic World", category: "Hollywood", year: 2015 },
  { title: "John Wick 4", wiki: "John Wick: Chapter 4", category: "Hollywood", year: 2023 },
  { title: "The Lion King", wiki: "The Lion King (2019 film)", category: "Hollywood", year: 2019 },
];

const shows = [
  { title: "Stranger Things", wiki: "Stranger Things", year: 2016 },
  { title: "Money Heist", wiki: "Money Heist", year: 2017 },
  { title: "Wednesday", wiki: "Wednesday (TV series)", year: 2022 },
  { title: "The Witcher", wiki: "The Witcher (TV series)", year: 2019 },
  { title: "Game of Thrones", wiki: "Game of Thrones", year: 2011 },
  { title: "Dark", wiki: "Dark (TV series)", year: 2017 },
  { title: "Breaking Bad", wiki: "Breaking Bad", year: 2008 },
  { title: "The Last of Us", wiki: "The Last of Us (TV series)", year: 2023 },
  { title: "Squid Game", wiki: "Squid Game", year: 2021 },
  { title: "The Family Man", wiki: "The Family Man (Indian TV series)", year: 2019 },
].map((show) => ({ ...show, category: "TV Show", type: "TV Show" }));

const upcoming = [
  { title: "King", wiki: "King (upcoming film)", category: "Bollywood" },
  { title: "Golmaal 5", wiki: "Golmaal 5", category: "Bollywood" },
  { title: "Tumbbad II", wiki: "Tumbbad 2", category: "Bollywood" },
  { title: "Shakti Shalini", wiki: "Shakti Shalini", category: "Bollywood" },
  {
    title: "Dada - The Sourav Ganguli Story",
    wiki: "Dada: The Sourav Ganguly Story",
    category: "Bollywood",
  },
  { title: "Avengers: Doomsday", wiki: "Avengers: Doomsday", category: "Hollywood" },
  { title: "Jumanji: Open World", wiki: "Jumanji: Open World", category: "Hollywood" },
  {
    title: "Spider-Man: Brand New Day",
    wiki: "Spider-Man: Brand New Day",
    category: "Hollywood",
  },
  { title: "Avengers: Secret Wars", wiki: "Avengers: Secret Wars", category: "Hollywood" },
  { title: "The Man with the Bag", wiki: "The Man with the Bag", category: "Hollywood" },
].map((item) => ({ ...item, type: "Coming Soon" }));

const trendingMovies = upcoming.map((item) => ({
  ...item,
  badge: "TRENDING",
}));

const allMovies = movies.map((item) => ({ ...item, type: "Movie" }));
const allContent = [...allMovies, ...shows];

// POSTER SYSTEM
const posterCache = new Map();

const normalizeTitle = (value = "") =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

async function fetchPoster(item) {
  const isObject = typeof item === "object";
  const title = isObject ? item.title : item;
  const wiki = isObject ? item.wiki : "";
  const year = isObject ? item.year : null;

  const type =
    isObject && item.type === "TV Show"
      ? "series"
      : "movie";

  const cacheKey = `${type}-${title}-${year || ""}`;

  if (posterCache.has(cacheKey)) {
    return posterCache.get(cacheKey);
  }

  const searchTerms = [...new Set([title, wiki].filter(Boolean))];

  try {
    for (const searchTerm of searchTerms) {
      const url = `https://api.streamx.qzz.io/search?q=${encodeURIComponent(
        searchTerm
      )}&type=${type}`;

      const response = await fetch(url);

      if (!response.ok) continue;

      const data = await response.json();
      const results = Array.isArray(data.metas) ? data.metas : [];

      const exactMatches = results.filter((result) => {
        const resultTitle = result.title || result.name || "";

        return (
          normalizeTitle(resultTitle) === normalizeTitle(title) ||
          normalizeTitle(resultTitle) === normalizeTitle(wiki)
        );
      });

      const matchingItem =
        exactMatches.find((result) => {
          if (!year) return true;

          const resultYear = String(
            result.releaseInfo || result.year || ""
          ).slice(0, 4);

          return resultYear === String(year);
        }) || exactMatches[0];

      if (matchingItem?.poster) {
        posterCache.set(cacheKey, matchingItem.poster);
        return matchingItem.poster;
      }
    }

    posterCache.set(cacheKey, null);
    return null;
  } catch (error) {
    console.error("Poster loading error:", title, error);
    return null;
  }
}

const inputStyle = {
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  marginTop: 8,
  padding: "14px 15px",
  borderRadius: 12,
  outline: "none",
  color: "#FFFFFF",
  fontSize: 14,
  background: "rgba(7,13,27,0.65)",
  border: "1px solid rgba(190,202,229,0.25)",
};

const labelStyle = {
  display: "block",
  color: "#DCE2F0",
  fontSize: 13,
  fontWeight: 700,
  margin: "14px 0",
};

function PosterCard({ item, onSelect, compact = false }) {
  const [poster, setPoster] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    setPoster(null);
    setLoaded(false);

    fetchPoster(item).then((image) => {
      if (active) {
        setPoster(image);
        setLoaded(true);
      }
    });

    return () => {
      active = false;
    };
  }, [item]);

  return (
    <div
      onClick={() => onSelect(item)}
      style={{
        background: "linear-gradient(145deg,#263858,#18243D)",
        border: "1px solid rgba(232,200,121,0.18)",
        borderRadius: 18,
        overflow: "hidden",
        transition: "0.3s",
        boxShadow: "0 12px 30px rgba(0,0,0,0.22)",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-7px)";
        e.currentTarget.style.borderColor = GOLD;
        e.currentTarget.style.boxShadow = "0 18px 38px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "rgba(232,200,121,0.18)";
        e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.22)";
      }}
    >
      <div
        style={{
          height: compact ? 185 : 250,
          background: "linear-gradient(145deg,#39466F,#17213A)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {poster ? (
          <img
            src={poster}
            alt={`${item.title} poster`}
            loading="lazy"
            onError={() => setPoster(null)}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 15,
              textAlign: "center",
              color: GOLD,
              fontSize: 21,
              fontWeight: 800,
            }}
          >
            {loaded ? item.title : "Loading poster..."}
          </div>
        )}

        <span
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: GOLD,
            color: BLACK,
            borderRadius: 6,
            padding: "6px 9px",
            fontSize: 10,
            fontWeight: 800,
          }}
        >
          {item.badge || (item.type === "Coming Soon" ? "UPCOMING" : item.category.toUpperCase())}
        </span>
      </div>

      <div style={{ padding: compact ? 10 : 14 }}>
        <h3 style={{ color: TEXT, margin: "0 0 7px", fontSize: compact ? 13 : 16, minHeight: compact ? 32 : "auto" }}>
          {item.title}
        </h3>
        <p style={{ color: MUTED, margin: "0 0 12px", fontSize: 11 }}>
          {item.year ? `${item.year} • ` : ""}{item.type}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(item);
          }}
          style={{
            width: "100%",
            padding: 11,
            background: `linear-gradient(110deg,#F4E4B6,${GOLD})`,
            border: "none",
            borderRadius: 8,
            color: BLACK,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          {item.type === "Coming Soon" ? "Coming Soon" : "Book Now"}
        </button>
      </div>
    </div>
  );
}

function HeroBanner({ onExplore, onComing }) {
  const slides = trendingMovies.slice(0, 5);
  const [active, setActive] = useState(0);
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    let live = true;
    setPoster(null);

    fetchPoster(slides[active]).then((image) => {
      if (live) setPoster(image);
    });

    return () => {
      live = false;
    };
  }, [active]);

  const movie = slides[active];

  return (
    <section
      style={{
        minHeight: 330,
        position: "relative",
        display: "flex",
        alignItems: "center",
        padding: "55px 6%",
        overflow: "hidden",
        background: poster
          ? `linear-gradient(90deg,rgba(5,7,13,.98) 0%,rgba(5,7,13,.82) 48%,rgba(5,7,13,.28) 100%),url("${poster}") center 28% / cover`
          : "radial-gradient(circle at 75% 45%,#674523 0%,#1B1B22 35%,#05070D 78%)",
        borderBottom: "1px solid rgba(232,200,121,.35)",
        transition: "background 0.5s ease",
      }}
    >
      <div style={{ maxWidth: 560, position: "relative", zIndex: 1 }}>
        <p style={{ color: GOLD, fontWeight: 900, letterSpacing: 3, margin: "0 0 12px" }}>
          AUREVIX • FEATURED
        </p>

        <h1
          style={{
            color: "#FFF4D6",
            fontSize: "clamp(34px,5vw,60px)",
            lineHeight: 1.05,
            margin: "0 0 14px",
            textShadow: "0 3px 20px #000",
          }}
        >
          {movie.title}
        </h1>

        <p style={{ color: "#F1E8D5", fontSize: 16, lineHeight: 1.6, maxWidth: 430 }}>
          Discover the next big cinematic experience. Coming soon in theatres.
        </p>

        <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
          <button
            onClick={() => onComing(movie)}
            style={{
              background: `linear-gradient(120deg,#F5E4B2,${GOLD})`,
              color: BLACK,
              border: "none",
              padding: "13px 23px",
              borderRadius: 30,
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            View Movie
          </button>

          <button
            onClick={onExplore}
            style={{
              background: "rgba(0,0,0,.35)",
              color: "#FFF1CC",
              border: `1px solid ${GOLD}`,
              padding: "13px 23px",
              borderRadius: 30,
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Explore Movies
          </button>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 18,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 9,
        }}
      >
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            aria-label={`Show ${slide.title}`}
            onClick={() => setActive(index)}
            style={{
              width: active === index ? 24 : 8,
              height: 8,
              borderRadius: 20,
              border: "none",
              background: active === index ? GOLD : "rgba(255,255,255,.45)",
              cursor: "pointer",
              transition: "all .25s",
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default function Home({ onSelectItem }) {
  const [page, setPage] = useState("Home");
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [authMode, setAuthMode] = useState(null);
  const [authMessage, setAuthMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const goTo = (name) => {
    setPage(name);
    setSearch("");
    setSelectedItem(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const headingStyle = {
    color: GOLD,
    fontSize: 28,
    marginBottom: 22,
    borderLeft: `4px solid ${GOLD}`,
    paddingLeft: 13,
  };

  const sectionStyle = { padding: "45px 6%" };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(165px,1fr))",
    gap: 20,
  };

  const selectItem = (item) => {
    if (onSelectItem) {
      onSelectItem(item);
    } else {
      setSelectedItem(item);
    }
  };

  const renderGrid = (items) =>
    items.length ? (
      <div style={gridStyle}>
        {items.map((item) => (
          <PosterCard
            key={item.title}
            item={item}
            onSelect={selectItem}
          />
        ))}
      </div>
    ) : (
      <p style={{ color: MUTED }}>No results found.</p>
    );

  const renderHorizontal = (items) =>
    items.length ? (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5,minmax(0,1fr))",
          gap: 14,
          overflowX: "auto",
          paddingBottom: 12,
        }}
      >
        {items.slice(0, 5).map((item) => (
          <div key={item.title} style={{ minWidth: 125 }}>
            <PosterCard
              compact
              item={item}
              onSelect={selectItem}
            />
          </div>
        ))}
      </div>
    ) : (
      <p style={{ color: MUTED }}>No results found.</p>
    );

  const viewAllButton = (label, target) => (
    <button
      onClick={() => goTo(target)}
      style={{
        background: "transparent",
        border: "none",
        color: GOLD,
        fontWeight: 800,
        cursor: "pointer",
        fontSize: 13,
      }}
    >
      {label} View All →
    </button>
  );

  const filteredHome = allContent.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredMovies = allMovies.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredShows = shows.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredUpcoming = upcoming.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const navItems = ["Home", "Movies", "TV Shows", "Coming Soon", "About", "Contact"];

  const searchBox = (placeholder) => (
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%",
        boxSizing: "border-box",
        padding: 15,
        marginBottom: 30,
        background: "#1B2741",
        border: "1px solid rgba(232,200,121,0.35)",
        borderRadius: 10,
        color: "#fff",
        fontSize: 15,
        outline: "none",
      }}
    />
  );

  const openAuth = (mode) => {
    setAuthMessage("");
    setShowPassword(false);
    setAuthMode(mode);
  };

  return (
    <div
      style={{
        background: BLACK,
        color: "#fff",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* NAVBAR */}
      <header
        style={{
          background: "rgba(13,21,39,0.96)",
          borderBottom: "1px solid rgba(232,200,121,0.22)",
          padding: "18px 6%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 15,
          position: "sticky",
          top: 0,
          zIndex: 20,
          backdropFilter: "blur(15px)",
          boxShadow: "0 12px 35px rgba(0,0,0,0.18)",
        }}
      >
        <div
          onClick={() => goTo("Home")}
          style={{
            color: GOLD,
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: 3,
            cursor: "pointer",
          }}
        >
          AUREVIX<span style={{ color: "#fff" }}>.</span>
        </div>

        <nav style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {navItems.map((item) => (
            <span
              key={item}
              onClick={() => {
                if (item === "About" || item === "Contact") {
                  setPage("Home");
                  setTimeout(() => {
                    document.getElementById(item.toLowerCase())?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }, 100);
                } else {
                  goTo(item);
                }
              }}
              style={{
                cursor: "pointer",
                color: page === item ? GOLD : "#DDE3F1",
                fontSize: 14,
                fontWeight: page === item ? 800 : 500,
              }}
            >
              {item}
            </span>
          ))}
        </nav>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            onClick={() => openAuth("login")}
            style={{
              color: "#F4E8C8",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(232,200,121,0.55)",
              padding: "11px 19px",
              borderRadius: 30,
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Log In
          </button>

          <button
            onClick={() => openAuth("register")}
            style={{
              color: BLACK,
              background: "linear-gradient(120deg,#F5E4B2,#D9B65D)",
              border: "1px solid #F0D99A",
              padding: "11px 19px",
              borderRadius: 30,
              fontWeight: 900,
              cursor: "pointer",
              boxShadow: "0 7px 22px rgba(217,182,93,0.18)",
            }}
          >
            Join AUREVIX
          </button>
        </div>
      </header>

      {/* HOME PAGE */}
      {page === "Home" && (
        <>
          <HeroBanner
            onExplore={() => goTo("Movies")}
            onComing={(item) => selectItem(item)}
          />

          {/* SEARCH BAR */}
          <section style={{ padding: "22px 6% 8px", background: "#080D18" }}>
            {searchBox("Search movies and TV shows...")}

            {search && (
              <>
                <h2 style={headingStyle}>Search Results</h2>
                {renderGrid(filteredHome)}
              </>
            )}
          </section>

          {/* TRENDING MOVIES */}
          <section style={{ ...sectionStyle, paddingTop: 25, paddingBottom: 28 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <h2 style={{ ...headingStyle, margin: 0 }}>🔥 Trending Movies</h2>
              {viewAllButton("Trending", "Coming Soon")}
            </div>

            {renderHorizontal(trendingMovies)}
          </section>

          {/* HOLLYWOOD MOVIES */}
          <section
            style={{
              ...sectionStyle,
              paddingTop: 25,
              paddingBottom: 28,
              background: "#0B1220",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <h2 style={{ ...headingStyle, margin: 0 }}>
                ⭐ Coming Soon in Hollywood
              </h2>
              {viewAllButton("Hollywood", "Hollywood")}
            </div>

            {renderHorizontal(
              trendingMovies.filter((item) => item.category === "Hollywood")
            )}
          </section>

          {/* BOLLYWOOD MOVIES */}
          <section style={{ ...sectionStyle, paddingTop: 25, paddingBottom: 28 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <h2 style={{ ...headingStyle, margin: 0 }}>🎬 Bollywood Movies</h2>
              {viewAllButton("Bollywood", "Bollywood")}
            </div>

            {renderHorizontal(
              allMovies.filter((item) => item.category === "Bollywood")
            )}
          </section>

          {/* TV SHOWS */}
          <section
            style={{
              ...sectionStyle,
              paddingTop: 25,
              paddingBottom: 28,
              background: "#0B1220",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <h2 style={{ ...headingStyle, margin: 0 }}>📺 Popular TV Shows</h2>
              {viewAllButton("TV Shows", "TV Shows")}
            </div>

            {renderHorizontal(shows)}
          </section>

          {/* MOVIE NIGHT BANNER */}
          <section
            style={{
              ...sectionStyle,
              background: "linear-gradient(100deg,#253354,#17213A)",
              textAlign: "center",
            }}
          >
            <h2 style={{ color: GOLD, fontSize: 30 }}>
              YOUR NEXT MOVIE NIGHT STARTS HERE
            </h2>

            <p style={{ color: "#D0D6E5" }}>
              Find your favourites and enjoy the ultimate cinematic experience.
            </p>

            <button
              onClick={() => goTo("Movies")}
              style={{
                background: GOLD,
                color: BLACK,
                padding: "13px 25px",
                border: "none",
                borderRadius: 8,
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Browse All Movies
            </button>
          </section>

          {/* ABOUT */}
          <section id="about" style={sectionStyle}>
            <h2 style={headingStyle}>About AUREVIX</h2>

            <p style={{ color: MUTED, lineHeight: 1.9, maxWidth: 850 }}>
              AUREVIX is your destination for discovering movies and TV shows.
              Explore Bollywood and Hollywood collections, find upcoming
              releases and enjoy a cinematic experience in one place.
            </p>
          </section>

          {/* CONTACT */}
          <section id="contact" style={sectionStyle}>
            <h2 style={headingStyle}>Contact Us</h2>

            <p style={{ color: MUTED }}>
              Have a question or suggestion? Contact the AUREVIX team.
            </p>

            <p style={{ color: GOLD }}>Email: support@aurevix.com</p>
          </section>
        </>
      )}

      {/* ALL MOVIES PAGE */}
      {page === "Movies" && (
        <main style={sectionStyle}>
          <h1 style={{ color: GOLD, fontSize: 38 }}>Explore All Movies</h1>

          <p style={{ color: MUTED, marginBottom: 30 }}>
            Explore all Bollywood and Hollywood movies.
          </p>

          {searchBox("Search movies...")}

          <h2 style={headingStyle}>Bollywood Movies</h2>

          {renderGrid(
            filteredMovies.filter((item) => item.category === "Bollywood")
          )}

          <h2 style={{ ...headingStyle, marginTop: 50 }}>Hollywood Movies</h2>

          {renderGrid(
            filteredMovies.filter((item) => item.category === "Hollywood")
          )}
        </main>
      )}

      {/* ALL BOLLYWOOD MOVIES PAGE */}
      {page === "Bollywood" && (
        <main style={sectionStyle}>
          <h1 style={{ color: GOLD, fontSize: 38 }}>All Bollywood Movies</h1>

          <p style={{ color: MUTED, marginBottom: 30 }}>
            Explore all Bollywood movies.
          </p>

          {searchBox("Search Bollywood movies...")}

          {renderGrid(
            filteredMovies.filter((item) => item.category === "Bollywood")
          )}
        </main>
      )}

      {/* ALL HOLLYWOOD MOVIES PAGE */}
      {page === "Hollywood" && (
        <main style={sectionStyle}>
          <h1 style={{ color: GOLD, fontSize: 38 }}>All Hollywood Movies</h1>

          <p style={{ color: MUTED, marginBottom: 30 }}>
            Explore all Hollywood movies.
          </p>

          {searchBox("Search Hollywood movies...")}

          {renderGrid(
            filteredMovies.filter((item) => item.category === "Hollywood")
          )}

          <h2 style={{ ...headingStyle, marginTop: 45 }}>
            Coming Soon in Hollywood
          </h2>

          {renderGrid(
            filteredUpcoming.filter((item) => item.category === "Hollywood")
          )}
        </main>
      )}

      {/* TV SHOWS PAGE */}
      {page === "TV Shows" && (
        <main style={sectionStyle}>
          <h1 style={{ color: GOLD, fontSize: 38 }}>TV Shows</h1>

          <p style={{ color: MUTED, marginBottom: 30 }}>
            Explore popular TV shows.
          </p>

          {searchBox("Search TV shows...")}

          {renderGrid(filteredShows)}
        </main>
      )}

      {/* COMING SOON PAGE */}
      {page === "Coming Soon" && (
        <main style={sectionStyle}>
          <h1 style={{ color: GOLD, fontSize: 38 }}>Trending & Coming Soon</h1>

          <p style={{ color: MUTED, marginBottom: 30 }}>
            Explore all upcoming Bollywood and Hollywood movies.
          </p>

          {searchBox("Search upcoming releases...")}

          {renderGrid(filteredUpcoming)}
        </main>
      )}

      {/* LOGIN / REGISTER MODAL */}
      {authMode && (
        <div
          onClick={() => {
            setAuthMode(null);
            setAuthMessage("");
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(4,8,18,0.82)",
            backdropFilter: "blur(12px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              background:
                "radial-gradient(circle at top right,rgba(90,103,158,0.35),transparent 42%),linear-gradient(145deg,#202D4A,#111A2E)",
              border: "1px solid rgba(232,200,121,0.4)",
              borderRadius: 24,
              padding: 32,
              maxWidth: 450,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              color: TEXT,
              boxShadow: "0 28px 90px rgba(0,0,0,0.55)",
            }}
          >
            <button
              type="button"
              onClick={() => {
                setAuthMode(null);
                setAuthMessage("");
              }}
              aria-label="Close"
              style={{
                position: "absolute",
                top: 12,
                right: 17,
                background: "transparent",
                color: "#D9DFF0",
                border: "none",
                fontSize: 28,
                cursor: "pointer",
              }}
            >
              ×
            </button>

            <p
              style={{
                color: GOLD,
                fontSize: 10,
                letterSpacing: 2,
                fontWeight: 800,
              }}
            >
              WELCOME TO YOUR CINEMATIC UNIVERSE
            </p>

            <h2 style={{ color: TEXT, fontSize: 29, margin: "10px 0" }}>
              {authMode === "login" ? "Welcome Back" : "Create Your Account"}
            </h2>

            <p
              style={{
                color: MUTED,
                lineHeight: 1.6,
                fontSize: 13,
                marginBottom: 22,
              }}
            >
              {authMode === "login"
                ? "Sign in to continue your AUREVIX experience."
                : "Create your AUREVIX profile and make every movie night special."}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();

                const form = e.currentTarget;
                const password = form.elements.password.value;

                if (authMode === "register") {
                  const confirmPassword = form.elements.confirmPassword.value;

                  if (password !== confirmPassword) {
                    setAuthMessage("Passwords do not match. Please try again.");
                    return;
                  }

                  setAuthMessage(
                    "Your registration details are ready! Account creation will be connected later."
                  );
                } else {
                  setAuthMessage(
                    "Your login details are ready! Sign-in will be connected later."
                  );
                }
              }}
            >
              {authMode === "register" && (
                <>
                  <label style={labelStyle}>
                    Full Name

                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      autoComplete="name"
                      required
                      style={inputStyle}
                    />
                  </label>

                  <label style={labelStyle}>
                    Phone Number

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      autoComplete="tel"
                      pattern="[0-9+() -]{8,20}"
                      title="Please enter a valid phone number"
                      required
                      style={inputStyle}
                    />
                  </label>
                </>
              )}

              <label style={labelStyle}>
                Email Address

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  autoComplete="email"
                  required
                  style={inputStyle}
                />
              </label>

              <label style={labelStyle}>
                Password

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder={
                    authMode === "login"
                      ? "Enter your password"
                      : "Create a password"
                  }
                  autoComplete={
                    authMode === "login"
                      ? "current-password"
                      : "new-password"
                  }
                  minLength="6"
                  required
                  style={inputStyle}
                />
              </label>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: MUTED,
                  fontSize: 12,
                  margin: "5px 0 14px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                />
                Show password
              </label>

              {authMode === "register" && (
                <label style={labelStyle}>
                  Confirm Password

                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    minLength="6"
                    required
                    style={inputStyle}
                  />
                </label>
              )}

              {authMessage && (
                <div
                  style={{
                    padding: 12,
                    margin: "12px 0",
                    borderRadius: 10,
                    fontSize: 12,
                    lineHeight: 1.5,
                    color: authMessage.startsWith("Passwords")
                      ? "#FFD9D9"
                      : "#D9F5E4",
                    background: authMessage.startsWith("Passwords")
                      ? "rgba(190,65,65,0.16)"
                      : "rgba(57,145,99,0.16)",
                    border: authMessage.startsWith("Passwords")
                      ? "1px solid rgba(240,120,120,0.3)"
                      : "1px solid rgba(103,207,151,0.3)",
                  }}
                >
                  {authMessage}
                </div>
              )}

              <button
                type="submit"
                style={{
                  width: "100%",
                  marginTop: 12,
                  padding: 15,
                  border: "none",
                  borderRadius: 12,
                  color: BLACK,
                  fontWeight: 900,
                  cursor: "pointer",
                  background: "linear-gradient(110deg,#F4E4B6,#D9B65D)",
                  fontSize: 14,
                }}
              >
                {authMode === "login" ? "Sign In" : "Create Account"}
              </button>
            </form>

            <div
              style={{
                textAlign: "center",
                color: MUTED,
                fontSize: 12,
                marginTop: 20,
              }}
            >
              {authMode === "login"
                ? "New to AUREVIX?"
                : "Already have an account?"}

              <button
                type="button"
                onClick={() => {
                  openAuth(authMode === "login" ? "register" : "login");
                }}
                style={{
                  color: GOLD,
                  border: "none",
                  background: "transparent",
                  fontWeight: 800,
                  cursor: "pointer",
                  marginLeft: 5,
                }}
              >
                {authMode === "login" ? "Create account" : "Log in"}
              </button>
            </div>

            <p
              style={{
                color: "#7886A6",
                textAlign: "center",
                fontSize: 9,
                letterSpacing: 2,
                marginTop: 25,
              }}
            >
              AUREVIX • MOVIES • SERIES • EXPERIENCES
            </p>
          </div>
        </div>
      )}

      {/* MOVIE DETAILS POPUP - FALLBACK */}
      {selectedItem && !onSelectItem && (
        <div
          onClick={() => setSelectedItem(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: "rgba(0,0,0,0.82)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#1B2741",
              border: `1px solid ${GOLD}`,
              borderRadius: 18,
              padding: 30,
              maxWidth: 400,
              width: "100%",
              textAlign: "center",
            }}
          >
            <h2 style={{ color: GOLD }}>{selectedItem.title}</h2>

            <p style={{ color: "#ccc" }}>
              {selectedItem.type === "Coming Soon"
                ? "This title is coming soon!"
                : "Booking functionality will be connected in the next step."}
            </p>

            <button
              onClick={() => setSelectedItem(null)}
              style={{
                background: GOLD,
                border: "none",
                padding: "10px 25px",
                borderRadius: 8,
                fontWeight: 800,
                cursor: "pointer",
                color: BLACK,
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer
        style={{
          background: "#0B1222",
          borderTop: "1px solid rgba(232,200,121,0.22)",
          padding: "35px 6%",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: GOLD, letterSpacing: 4 }}>AUREVIX.</h2>

        <p style={{ color: "#9AA5BD", fontSize: 13 }}>
          Your Cinematic Universe • Movies • TV Shows • Entertainment
        </p>

        <p style={{ color: "#7886A6", fontSize: 12 }}>
          © 2026 AUREVIX. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
