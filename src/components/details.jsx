
import React, { useEffect, useState } from "react";

const GOLD = "#E8C879";
const BACKGROUND = "#10182B";
const TEXT = "#FFFFFF";
const MUTED = "#E0E5EF";

// Actor names ko compare karne ke liye
const normalizeName = (value = "") =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

// Actor photo cache - same actor ki photo baar-baar search nahi hogi
const actorPhotoCache = new Map();

// Wikipedia article se actor ki photo
async function fetchWikipediaActorPhoto(actorName) {
  const name = actorName.trim();

  if (!name) return "";

  try {
    const searchUrl =
      "https://en.wikipedia.org/w/api.php?" +
      new URLSearchParams({
        action: "query",
        list: "search",
        srsearch: name,
        srnamespace: "0",
        srlimit: "8",
        format: "json",
        origin: "*",
      }).toString();

    const response = await fetch(searchUrl);

    if (!response.ok) return "";

    const data = await response.json();
    const results = data.query?.search || [];

    if (!results.length) return "";

    const exactMatch = results.find(
      (page) =>
        normalizeName(page.title) === normalizeName(name)
    );

    const actorMatch = results.find((page) => {
      const title = normalizeName(page.title);
      const actor = normalizeName(name);

      return (
        title === actor ||
        title.startsWith(actor) ||
        title.includes(actor)
      );
    });

    const selectedPage =
      exactMatch || actorMatch || results[0];

    const imageUrl =
      "https://en.wikipedia.org/w/api.php?" +
      new URLSearchParams({
        action: "query",
        prop: "pageimages",
        titles: selectedPage.title,
        piprop: "thumbnail|original",
        pithumbsize: "600",
        format: "json",
        origin: "*",
      }).toString();

    const imageResponse = await fetch(imageUrl);

    if (!imageResponse.ok) return "";

    const imageData = await imageResponse.json();

    const pages = Object.values(
      imageData.query?.pages || {}
    );

    const page = pages[0];

    return (
      page?.original?.source ||
      page?.thumbnail?.source ||
      ""
    );
  } catch (error) {
    console.log("Wikipedia actor photo error:", name, error);
    return "";
  }
}

// Wikimedia Commons par actor ki photo search
async function fetchCommonsActorPhoto(actorName) {
  const name = actorName.trim();

  if (!name) return "";

  try {
    const searchTerms = [
      `${name} actor portrait`,
      `${name} actor`,
    ];

    for (const searchTerm of searchTerms) {
      const searchUrl =
        "https://commons.wikimedia.org/w/api.php?" +
        new URLSearchParams({
          action: "query",
          generator: "search",
          gsrsearch: searchTerm,
          gsrnamespace: "6",
          gsrlimit: "8",
          prop: "imageinfo",
          iiprop: "url",
          iiurlwidth: "600",
          format: "json",
          origin: "*",
        }).toString();

      const response = await fetch(searchUrl);

      if (!response.ok) continue;

      const data = await response.json();

      const pages = Object.values(
        data.query?.pages || {}
      );

      if (!pages.length) continue;

      const normalizedActor = normalizeName(name);

      // Actor name se match karti file ko priority
      const matchingPage = pages.find((page) => {
        const fileName = normalizeName(page.title);

        return fileName.includes(normalizedActor);
      });

      const selectedPage = matchingPage || pages[0];

      const imageInfo = selectedPage.imageinfo?.[0];

      const photo =
        imageInfo?.thumburl ||
        imageInfo?.url ||
        "";

      if (photo) return photo;
    }

    return "";
  } catch (error) {
    console.log("Commons actor photo error:", name, error);
    return "";
  }
}

// Wikipedia aur Commons dono par photo search
async function fetchActorPhoto(actorName) {
  const name = actorName.trim();

  if (!name) return "";

  const cacheKey = normalizeName(name);

  if (actorPhotoCache.has(cacheKey)) {
    return actorPhotoCache.get(cacheKey);
  }

  try {
    // First priority: Wikipedia actor article
    let photo = await fetchWikipediaActorPhoto(name);

    // Second priority: Wikimedia Commons
    if (!photo) {
      photo = await fetchCommonsActorPhoto(name);
    }

    actorPhotoCache.set(cacheKey, photo || "");

    return photo || "";
  } catch (error) {
    console.log("Actor photo loading failed:", name, error);

    actorPhotoCache.set(cacheKey, "");

    return "";
  }
}

// Cast data ko ek format mein convert karna
function formatCastData(castData) {
  if (typeof castData === "string") {
    castData = castData
      .split(";")
      .map((entry) => {
        const parts = entry.split("|");

        return {
          name: parts[0]?.trim() || "",
          character: parts.slice(1).join("|").trim() || "Role TBA",
        };
      });
  }

  if (!Array.isArray(castData)) {
    return [];
  }

  return castData
    .map((actor) => {
      if (typeof actor === "string") {
        return {
          name: actor.trim(),
          character: "Actor",
          image: "",
        };
      }

      return {
        name:
          actor.name ||
          actor.actor ||
          actor.title ||
          "",

        character:
          actor.character ||
          actor.role ||
          actor.characterName ||
          "Role TBA",

        image:
          actor.image ||
          actor.photo ||
          actor.profileImage ||
          actor.profile ||
          "",
      };
    })
    .filter((actor) => actor.name);
}

// Photo requests ko limited rakhta hai
async function loadActorPhotos(actorList, isCancelled) {
  const results = [...actorList];

  let currentIndex = 0;

  async function worker() {
    while (currentIndex < results.length) {
      if (isCancelled()) return;

      const index = currentIndex;
      currentIndex += 1;

      const actor = results[index];

      if (!actor.image) {
        const photo = await fetchActorPhoto(actor.name);

        if (isCancelled()) return;

        results[index] = {
          ...actor,
          image: photo,
        };
      }
    }
  }

  // Ek samay par maximum 3 actor photos search hongi
  const workers = Array.from(
    { length: Math.min(3, results.length) },
    () => worker()
  );

  await Promise.all(workers);

  return results;
}

export default function Details({
  item,
  onBack,
  onBookNow,
}) {
  const [image, setImage] = useState(
    item?.poster || item?.image || item?.thumbnail || ""
  );

  const [description, setDescription] = useState(
    item?.description || "Discover the story behind this title."
  );

  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [actors, setActors] = useState([]);
  const [actorsLoading, setActorsLoading] = useState(false);

  // LOAD MOVIE DETAILS
  useEffect(() => {
    let cancelled = false;

    async function loadDetails() {
      if (!item) {
        setLoading(false);
        return;
      }

      setImage(
        item.poster || item.image || item.thumbnail || ""
      );

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

  // LOAD CAST AND ACTOR PHOTOS
  useEffect(() => {
    let cancelled = false;

    async function loadActors() {
      if (!item) {
        setActors([]);
        setActorsLoading(false);
        return;
      }

      setActors([]);
      setActorsLoading(true);

      const castData =
        item.castDetails ||
        item.cast ||
        item.actors ||
        item.starring ||
        [];

      const formattedActors = formatCastData(castData);

      if (cancelled) return;

      // Names aur character names pehle hi show honge
      setActors(formattedActors);

      if (!formattedActors.length) {
        setActorsLoading(false);
        return;
      }

      try {
        const actorsWithPhotos = await loadActorPhotos(
          formattedActors,
          () => cancelled
        );

        if (!cancelled) {
          setActors(actorsWithPhotos);
        }
      } catch (error) {
        console.log("Actor loading error:", error);
      } finally {
        if (!cancelled) {
          setActorsLoading(false);
        }
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
          gap: 20,
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
            borderRadius: 7,
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
    borderRadius: 7,
    border: "none",
    fontSize: 15,
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
          height: 70,
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
            letterSpacing: 4,
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
            borderRadius: 7,
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
      </nav>

      {/* MOVIE HERO SECTION */}
      <section
        style={{
          minHeight: 570,
          position: "relative",
          display: "flex",
          alignItems: "center",
          padding: "55px 7%",
          backgroundImage: image
            ? `linear-gradient(90deg, rgba(10,15,28,0.98) 0%, rgba(10,15,28,0.85) 43%, rgba(10,15,28,0.25) 100%), linear-gradient(0deg, ${BACKGROUND}, transparent 45%), url("${image}")`
            : "linear-gradient(135deg, #10182B, #263653)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div style={{ maxWidth: 620, position: "relative", zIndex: 2 }}>
          <p
            style={{
              color: GOLD,
              letterSpacing: 3,
              fontSize: 13,
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
              color: GOLD,
              textShadow: "0 3px 15px rgba(0,0,0,0.6)",
            }}
          >
            {item.title}
          </h1>

          <p
            style={{
              color: MUTED,
              fontSize: 15,
              lineHeight: 1.8,
              maxWidth: 560,
            }}
          >
            {loading
              ? "Loading movie information..."
              : description}
          </p>

          {item.year && (
            <p style={{ color: GOLD }}>{item.year}</p>
          )}

          <div
            style={{
              display: "flex",
              gap: 13,
              flexWrap: "wrap",
              marginTop: 25,
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
          <h2 style={{ color: GOLD }}>About {item.title}</h2>

          <p
            style={{
              color: MUTED,
              lineHeight: 1.8,
              maxWidth: 850,
            }}
          >
            {description}
          </p>

          <p style={{ color: TEXT }}>Category: {category}</p>

          {item.year && (
            <p style={{ color: TEXT }}>Year: {item.year}</p>
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
        <h2 style={{ color: GOLD }}>About This Title</h2>

        <p
          style={{
            color: MUTED,
            lineHeight: 1.8,
            maxWidth: 850,
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
            gap: 10,
            marginBottom: 30,
          }}
        >
          <h2
            style={{
              color: GOLD,
              margin: 0,
              fontSize: 28,
              borderLeft: `4px solid ${GOLD}`,
              paddingLeft: 14,
            }}
          >
            Cast & Actors
          </h2>

          <span style={{ color: MUTED, fontSize: 13 }}>
            {actors.length} Cast Members
          </span>
        </div>

        {actors.length > 0 ? (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(150px, 1fr))",
                gap: 25,
              }}
            >
              {actors.map((actor, index) => (
                <div
                  key={`${actor.name}-${index}`}
                  style={{
                    background: "#1A2942",
                    border: "1px solid rgba(232,200,121,0.25)",
                    borderRadius: 14,
                    padding: "22px 12px 18px",
                    textAlign: "center",
                    transition: "0.3s",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {/* CIRCULAR ACTOR PHOTO */}
                  <div
                    style={{
                      width: 112,
                      height: 112,
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: `3px solid ${GOLD}`,
                      boxShadow: "0 0 18px rgba(232,200,121,0.2)",
                      marginBottom: 15,
                      background:
                        "linear-gradient(135deg, #263653, #10182B)",
                      flexShrink: 0,
                      position: "relative",
                    }}
                  >
                    {actor.image && (
                      <img
                        src={actor.image}
                        alt={`${actor.name} profile`}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";

                          const fallback =
                            e.currentTarget.parentElement?.querySelector(
                              ".actor-fallback"
                            );

                          if (fallback) {
                            fallback.style.display = "flex";
                          }
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center top",
                          display: "block",
                        }}
                      />
                    )}

                    <div
                      className="actor-fallback"
                      style={{
                        width: "100%",
                        height: "100%",
                        display: actor.image ? "none" : "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: GOLD,
                        fontSize: 34,
                        fontWeight: "bold",
                      }}
                    >
                      {actor.name
                        .split(" ")
                        .filter(Boolean)
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                  </div>

                  <h3
                    style={{
                      color: TEXT,
                      fontSize: 15,
                      margin: "0 0 7px",
                      lineHeight: 1.4,
                    }}
                  >
                    {actor.name}
                  </h3>

                  <p
                    style={{
                      color: GOLD,
                      fontSize: 12,
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {actor.character}
                  </p>
                </div>
              ))}
            </div>

            {actorsLoading && (
              <p
                style={{
                  color: MUTED,
                  textAlign: "center",
                  marginTop: 25,
                  fontSize: 13,
                }}
              >
                Loading actor profile photos...
              </p>
            )}
          </>
        ) : (
          <div
            style={{
              background: "#1A2942",
              border: "1px solid rgba(232,200,121,0.2)",
              borderRadius: 10,
              padding: 25,
              color: MUTED,
              lineHeight: 1.8,
            }}
          >
            Cast information is not available for this title yet.
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: 25,
          textAlign: "center",
          color: MUTED,
          borderTop: "1px solid rgba(232,200,121,0.2)",
        }}
      >
        <h2 style={{ color: GOLD, letterSpacing: 4 }}>
          AUREVIX
        </h2>

        © 2026 AUREVIX. All Rights Reserved.
      </footer>
    </div>
  );
}
