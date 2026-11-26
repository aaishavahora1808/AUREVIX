
import React, { useEffect, useState } from "react";

const GOLD = "#E8C879";
const BACKGROUND = "#10182B";
const TEXT = "#F5F2E9";
const MUTED = "#B7C0D3";

export default function Details({ item, onBack, onBookNow }) {
  const [image, setImage] = useState(
    item?.poster || item?.image || item?.thumbnail || ""
  );

  const [description, setDescription] = useState(
    item?.description || "Discover the story behind this title."
  );

  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [actors, setActors] = useState([]);
  const [castLoading, setCastLoading] = useState(false);

  // MOVIE DETAILS LOADING
  useEffect(() => {
    let cancelled = false;

    async function loadDetails() {
      if (!item) {
        setLoading(false);
        return;
      }

      setImage(item.poster || item.image || item.thumbnail || "");
      setDescription(
        item.description || "Discover the story behind this title."
      );
      setLoading(true);

      const wikiTitle = item.wiki || item.title;

      if (!wikiTitle) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
            wikiTitle.replace(/ /g, "_")
          )}`
        );

        if (!response.ok) {
          throw new Error("Movie information not available");
        }

        const data = await response.json();

        if (cancelled) return;

        if (data.originalimage?.source) {
          setImage(data.originalimage.source);
        } else if (
          data.thumbnail?.source &&
          !item.poster &&
          !item.image
        ) {
          setImage(data.thumbnail.source);
        }

        if (data.extract) {
          setDescription(data.extract);
        }
      } catch (error) {
        console.log("Details loading:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadDetails();

    return () => {
      cancelled = true;
    };
  }, [item]);

  // ACTORS AND THEIR PHOTOS
  useEffect(() => {
    let cancelled = false;

    async function loadActors() {
      if (!item) {
        setActors([]);
        return;
      }

      let castData =
        item.castDetails ||
        item.cast ||
        item.actors ||
        item.starring ||
        [];

      if (typeof castData === "string") {
        castData = castData.split(",").map((name) => ({
          name: name.trim(),
        }));
      }

      if (!Array.isArray(castData)) {
        castData = [];
      }

      if (castData.length === 0) {
        setActors([]);
        return;
      }

      setCastLoading(true);

      const formattedActors = castData.map((actor) => {
        if (typeof actor === "string") {
          return {
            name: actor,
            character: "Actor",
            image: "",
          };
        }

        return {
          name:
            actor.name ||
            actor.actor ||
            actor.title ||
            "Actor",

          character:
            actor.character ||
            actor.role ||
            actor.characterName ||
            "Actor",

          image:
            actor.image ||
            actor.photo ||
            actor.profileImage ||
            actor.profile ||
            "",
        };
      });

      const actorsWithPhotos = await Promise.all(
        formattedActors.map(async (actor) => {
          if (actor.image) {
            return actor;
          }

          try {
            const response = await fetch(
              `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
                actor.name.replace(/ /g, "_")
              )}`
            );

            if (!response.ok) {
              return actor;
            }

            const data = await response.json();

            return {
              ...actor,
              image:
                data.originalimage?.source ||
                data.thumbnail?.source ||
                "",
            };
          } catch (error) {
            return actor;
          }
        })
      );

      if (!cancelled) {
        setActors(actorsWithPhotos);
        setCastLoading(false);
      }
    }

    loadActors();

    return () => {
      cancelled = true;
    };
  }, [item]);

  if (!item) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: BACKGROUND,
          color: TEXT,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        Movie details not found.

        <button
          onClick={onBack}
          style={{
            background: GOLD,
            color: BACKGROUND,
            border: "none",
            padding: "10px 20px",
            borderRadius: "7px",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  const category = item.type || item.category || "Movie";

  const buttonStyle = {
    padding: "13px 25px",
    borderRadius: "7px",
    border: "none",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BACKGROUND,
        color: TEXT,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* TOP NAVIGATION */}
      <nav
        style={{
          height: "70px",
          padding: "0 5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(232,200,121,0.2)",
          position: "relative",
          zIndex: 5,
        }}
      >
        <h2
          style={{
            color: GOLD,
            letterSpacing: "4px",
            margin: 0,
          }}
        >
          AUREVIX
        </h2>

        <button
          onClick={onBack}
          style={{
            background: "transparent",
            border: `1px solid ${GOLD}`,
            color: GOLD,
            padding: "10px 18px",
            borderRadius: "7px",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
      </nav>

      {/* MOVIE HERO SECTION */}
      <section
        style={{
          minHeight: "570px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          padding: "55px 7%",
          backgroundImage: image
            ? `linear-gradient(90deg, rgba(10,15,28,0.98) 0%, rgba(10,15,28,0.85) 43%, rgba(10,15,28,0.25) 100%), linear-gradient(0deg, ${BACKGROUND}, transparent 45%), url("${image}")`
            : `linear-gradient(135deg, #10182B, #263653)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          style={{
            maxWidth: "620px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <p
            style={{
              color: GOLD,
              letterSpacing: "3px",
              fontSize: "13px",
              fontWeight: "bold",
            }}
          >
            {category.toUpperCase()}
          </p>

          <h1
            style={{
              fontSize: "clamp(35px, 6vw, 65px)",
              lineHeight: 1.1,
              margin: "15px 0",
              textTransform: "uppercase",
              textShadow: "0 3px 15px rgba(0,0,0,0.6)",
            }}
          >
            {item.title}
          </h1>

          <p
            style={{
              color: MUTED,
              fontSize: "15px",
              lineHeight: 1.8,
              maxWidth: "560px",
            }}
          >
            {loading
              ? "Loading movie information..."
              : description}
          </p>

          {item.year && (
            <p style={{ color: GOLD }}>
              {item.year}
            </p>
          )}

          <div
            style={{
              display: "flex",
              gap: "13px",
              flexWrap: "wrap",
              marginTop: "25px",
            }}
          >
            <button
              style={{
                ...buttonStyle,
                background: GOLD,
                color: BACKGROUND,
              }}
              onClick={() => {
                alert("Play feature will be connected later.");
              }}
            >
              ▶ Play
            </button>

            <button
              style={{
                ...buttonStyle,
                background: GOLD,
                color: BACKGROUND,
                boxShadow: "0 4px 18px rgba(232,200,121,0.22)",
              }}
              onClick={() => onBookNow && onBookNow(item)}
            >
              🎟 Book Now
            </button>

            <button
              style={{
                ...buttonStyle,
                background: "rgba(255,255,255,0.15)",
                color: TEXT,
                border: "1px solid rgba(255,255,255,0.3)",
              }}
              onClick={() => setShowMore(!showMore)}
            >
              ⓘ {showMore ? "Less Info" : "More Info"}
            </button>
          </div>
        </div>
      </section>

      {/* MORE INFORMATION */}
      {showMore && (
        <section
          style={{
            padding: "35px 7%",
            background: "#172238",
          }}
        >
          <h2 style={{ color: GOLD }}>
            About {item.title}
          </h2>

          <p
            style={{
              color: MUTED,
              lineHeight: 1.8,
              maxWidth: "850px",
            }}
          >
            {description}
          </p>

          <p style={{ color: TEXT }}>
            Category: {category}
          </p>

          {item.year && (
            <p style={{ color: TEXT }}>
              Year: {item.year}
            </p>
          )}
        </section>
      )}

      {/* ABOUT SECTION */}
      <section
        style={{
          padding: "45px 7%",
          background: BACKGROUND,
        }}
      >
        <h2 style={{ color: GOLD }}>
          About This Title
        </h2>

        <p
          style={{
            color: MUTED,
            lineHeight: 1.8,
            maxWidth: "850px",
          }}
        >
          {description}
        </p>
      </section>

      {/* CAST AND ACTORS SECTION */}
      <section
        style={{
          padding: "45px 7%",
          background: "#121D32",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "30px",
          }}
        >
          <h2
            style={{
              color: GOLD,
              margin: 0,
              fontSize: "28px",
              borderLeft: `4px solid ${GOLD}`,
              paddingLeft: "14px",
            }}
          >
            Cast & Actors
          </h2>

          <span
            style={{
              color: MUTED,
              fontSize: "13px",
            }}
          >
            {actors.length} Cast Members
          </span>
        </div>

        {castLoading ? (
          <p style={{ color: MUTED }}>
            Loading actors and their photos...
          </p>
        ) : actors.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(155px, 1fr))",
              gap: "22px",
            }}
          >
            {actors.map((actor, index) => (
              <div
                key={index}
                style={{
                  background: "#1A2942",
                  border: "1px solid rgba(232,200,121,0.25)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  textAlign: "center",
                  transition: "0.3s",
                }}
              >
                {actor.image ? (
                  <img
                    src={actor.image}
                    alt={actor.name}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextSibling.style.display = "flex";
                    }}
                    style={{
                      width: "100%",
                      height: "210px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : null}

                <div
                  style={{
                    width: "100%",
                    height: "210px",
                    display: actor.image ? "none" : "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "linear-gradient(135deg, #263653, #10182B)",
                    color: GOLD,
                    fontSize: "42px",
                    fontWeight: "bold",
                  }}
                >
                  {actor.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>

                <div style={{ padding: "14px 8px 18px" }}>
                  <h3
                    style={{
                      color: TEXT,
                      fontSize: "15px",
                      margin: "0 0 7px",
                    }}
                  >
                    {actor.name}
                  </h3>

                  <p
                    style={{
                      color: GOLD,
                      fontSize: "12px",
                      margin: 0,
                    }}
                  >
                    {actor.character}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              background: "#1A2942",
              border: "1px solid rgba(232,200,121,0.2)",
              borderRadius: "10px",
              padding: "25px",
              color: MUTED,
              lineHeight: 1.8,
            }}
          >
            Cast information is not available for this title yet.
            Add actor names to the movie data to display their
            photos and character names here.
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "25px",
          textAlign: "center",
          color: MUTED,
          borderTop: "1px solid rgba(232,200,121,0.2)",
        }}
      >
        <h2
          style={{
            color: GOLD,
            letterSpacing: "4px",
          }}
        >
          AUREVIX
        </h2>

        © 2026 AUREVIX. All Rights Reserved.
      </footer>
    </div>
  );
}
