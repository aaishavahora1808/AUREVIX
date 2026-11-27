
import React, { useEffect, useState } from "react";

const GOLD = "#E8C879";
const BACKGROUND = "#10182B";
const TEXT = "#FFFFFF";
const MUTED = "#E0E5EF";

// ACTOR NAME NORMALIZATION
const normalizeName = (value = "") =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

// CAST FORMAT
const makeCast = (entries) =>
  entries.split(";").filter(Boolean).map((entry) => {
    const [name, ...role] = entry.split("|");
    return {
      name: name.trim(),
      character: role.join("|").trim() || "Role TBA",
      image: "",
    };
  });

// GUJARATI MOVIES CAST DATA
const GUJARATI_CAST_DATA = {
  "Hellaro": makeCast(
    "Shraddha Dangar|Manjhri;Jayesh More|Mulji;Tejal Panchasara|Gomti;Shailesh Prajapati|Mukhi;Maulik Nayak|Bhaglo;Aarjav Trivedi|Arjan;Brinda Trivedi|Kesar;Kaushambi Bhatt|Champa;Niilam Paanchal|Supporting Role;Tarjanee Bhadla|Supporting Role"
  ),

  "Chaal Jeevi Laiye!": makeCast(
    "Siddharth Randeria|Bipin Chandra Parikh;Yash Soni|Aditya;Aarohi Patel|Ketki Mehta;Aruna Irani|Dr. Vadia;Badrish Chhabra|Chai Shop Owner;Jagesh Mukati|Supporting Role;Ankit Panchal|Supporting Role"
  ),

  "Chhello Divas": makeCast(
    "Yash Soni|Nikhil;Malhar Thakar|Vicky;Janki Bodiwala|Pooja;Mitra Gadhvi|Loy;Aarjav Trivedi|Dhulo;Kinjal Rajpriya|Nisha;Rahul Raval|Dev"
  ),

  "Bey Yaar": makeCast(
    "Divyang Thakkar|Chintan;Pratik Gandhi|Tapan;Darshan Jariwala|Jeetu Bhatt;Manoj Joshi|Y.B. Gandhi;Aarti Patel|Supporting Role;Amit Mistry|Supporting Role;Kavin Dave|Supporting Role;Samvedna Suwalka|Supporting Role"
  ),

  "Reva": makeCast(
    "Chetan Dhanani|Karan;Monal Gajjar|Supriya;Prashant Barot|Guptaji;Yatin Karyekar|Shashtriji;Muni Jha|Lawyer;Daya Shankar Pandey|Gandu Fakir;Abhinay Banker|Banga;Feroz Bhagat|Mehta Uncle;Rupa Borgaonkar|Puriya;Atul Mahale|Bittu"
  ),

  "Wrong Side Raju": makeCast(
    "Pratik Gandhi|Raju Ambani;Kimberley Louisa McBeath|Shaily Asher;Asif Basra|Amitabh Shah;Kavi Shastri|Tanmay Shah;Maulik Chauhan|Dhama;Hetal Puniwala|Parth Parikh"
  ),

  "Kevi Rite Jaish": makeCast(
    "Divyang Thakkar|Harish Patel;Veronica Kalpana Gautam|Aayushi Patel;Tom Alter|Uncle Sam;Rakesh Bedi|Daulatram Chainani;Rita Bhaduri|Old Lady;Anang Desai|Ishwarbhai Patel;Abhinay Banker|Raheel;Siddharth Amit Bhavsar|Kevin;Kenneth Desai|Bachubhai Patel;Tejal Panchasara|Bhavna Patel;Jay Upadhyay|Jignesh Patel"
  ),

  "The Good Road": makeCast(
    "Shamji Dhana Kerasia|Pappu;Sonali Kulkarni|Kiran Shroff;Ajay Gehi|David Shroff;Keval Katrodia|Aditya;Poonam Kesar Singh|Poonam;Priyank Upadhyay|Shaukat;Rinkle Karelia|Rinkle"
  ),

  "Chal Man Jeetva Jaiye": makeCast(
    "Karan Bhanushali|Abhishek;Krishna Bharadwaj|Dev Sanghvi;Hemen Chauhan|Viren Sanghvi;Dharmendra Gohil|Vasant Sanghvi;Rudrakshi Gupta|Raseela;Harsh Khurana|Niranjan Sanghvi;Anupama Masand|Guni Bhabhi;Rajeev Mehta|Suryakant Sanghvi;Sheetal Pandya|Supporting Role"
  ),

  "Love Ni Bhavai": makeCast(
    "Malhar Thakar|Sagar;Pratik Gandhi|Aaditya;Aarohi Patel|Antara;Maulik Nayak|Mehul;Aarti Patel|Krishna;Ghanashyam Nayak|Tea Seller;Parth Desai|Chaddi"
  ),

  "Chhello Show": makeCast(
    "Bhavin Rabari|Samay;Bhavesh Shrimali|Fazal;Richa Meena|Baa;Dipen Raval|Bapuji;Shoban Makwa|Badshah;Kishan Parmar|ST;Vijay Mer|Tiku;Rahul Koli|Manu;Vikas Bata|Nano;Tia Sebastien|Leela Mila"
  ),

  "Dhh": makeCast(
    "Naseeruddin Shah|Magician;Kahaan|Gungun;Karan Patel|Kapil;Kuldeep Sodha|Bajrang;Brijendra Kala|Hindi Teacher;Krunal Pandit|Gungun's Father;Archan Trivedi|Dadaji;Sunil Vishrani|Maths Teacher;Mehr Mahajan|Magician's Assistant"
  ),

  "Shu Thayu?": makeCast(
    "Malhar Thakar|Manan;Yash Soni|Neel;Aarjav Trivedi|Viral;Mitra Gadhvi|Chirag;Kinjal Rajpriya|Deepali;Jay Bhatt|Doctor;Mayur Chauhan|Supporting Role;Rahul Raval|Supporting Role"
  ),

  "Golkeri": makeCast(
    "Malhar Thakar|Sahil Sutariya;Manasi Parekh|Harshita;Sachin Khedekar|Mohanbhai Sutariya;Vandana Pathak|Jyotsna Sutariya;Dharmesh Vyas|Jayesh;Pooja Soni|Sadhna;Ashish Kakkad|Tribhuvan"
  ),

  "Fakt Mahilao Maate": makeCast(
    "Amitabh Bachchan|Chintan's Father;Yash Soni|Chintan;Deeksha Joshi|Sneha;Tarjanee Bhadla|Meghna;Pratik Nanda|Ravi;Bhavini Jani|Bhadra Madam;Kalpana Gagdekar|Sarla Parikh;Deep Vaidya|Supporting Role;Om Bhatt|Goggles;Dipika Raval|Jyoti"
  ),

  "Naadi Dosh": makeCast(
    "Yash Soni|Kevin;Janki Bodiwala|Riddhi;Raunaq Kamdar|Kunal;Prashant Barot|Prashant;Ashish Kakkad|Kamlesh;Dipika Raval|Krupa;Kinnal Nayak|Sanjivani;Ravi Gohil|Nishit"
  ),

  "Vash": makeCast(
    "Hiten Kumar|Pratap;Hitu Kanodia|Atharva;Janki Bodiwala|Aarya;Niilam Paanchal|Beena;Aaryan Sanghvi|Ansh"
  ),

  "Jhamkudi": makeCast(
    "Manasi Parekh|Kumud;Viraj Ghelani|Bablo;Sanjay Goradia|Babu Kaka;Ojas Rawal|Ghelchandra;Krunal Pandit|Mansukh Dholkia;Chetan Daiya|Inspector Okyo;Jayesh More|Kalicharan;Bhavini Jani|Veena Waghela;Nisarg Trivedi|Vishwajeet"
  ),

  "Kasoombo": makeCast(
    "Dharmendra Gohil|Dadu Barot;Raunaq Kamdar|Amar;Shraddha Dangar|Sujan;Darshan Pandya|Allauddin Khilji;Monal Gajjar|Roshan;Chetan Dhanani|Arjun;Firoz Irani|Visabha"
  ),

  "Fakt Purusho Maate": makeCast(
    "Yash Soni|Brijesh;Mitra Gadhvi|Kirtan;Esha Kansara|Radhika;Darshan Jariwala|Purshottam Lal;Amitabh Bachchan|Prabhudaas;Aarti Patel|Leela Foi;Hetal Modi|Aruna Ben;Prem Gadhavi|Tantrik Baba;Kamal Joshi|Supporting Role;Jitendra Thakkar|Narrotam Bhai;Pralay Rawal|Sarvottam Bhai;Anurag Prapanna|Uttam Bhai"
  ),

  "Laalo - Krishna Sada Sahaayate": makeCast(
    "Reeva Rachh|Role TBA;Shruhad Goswami|Role TBA;Karan Joshi|Role TBA;Akash Pandya|Special Appearance;Maulik Chauhan|Special Appearance"
  ),

  "Pravas": makeCast(
    "Vishal Thakkar|Role TBA;Jay Pandya|Role TBA;Komal Panchal|Role TBA;Nishma Soni|Role TBA;Pranshu Shah|Role TBA;Harsh Shah|Role TBA;Nayan Chatrariya|Role TBA;Manisha Narkar|Role TBA;Vijay Solanki|Role TBA;Sahil Patel|Role TBA"
  ),

  "Umbarro": makeCast(
    "Vandana Pathak|Role TBA;Kaajal Oza Vaidya|Role TBA;Suchita Trivedi|Role TBA;Deeksha Joshi|Role TBA;Tarjanee Bhadla|Role TBA;Tejal Panchasara|Role TBA;Vineeta M Joshee|Role TBA;Aarjav Trivedi|Role TBA;Sanjay Galsar|Role TBA"
  ),

  "Chaniya Toli": makeCast(
    "Yash Soni|Prakash Mistry;Ragi Jani|Peshawar;Netri Trivedi|Naina;Heena Varde|Role TBA;Chetan Daiya|MLA;Maulik Nayak|Reporter;Vaishakh Rathodd|Role TBA;Jay Bhatt|PI Zala;Nikita Sharma|Sheetal;Sohni Bhatt|Modasa;Janki Bodiwala|Special Appearance"
  ),

  "Misri": makeCast(
    "Raunaq Kamdar|Role TBA;Manasi Parekh|Role TBA;Tiku Talsania|Role TBA;Hitu Kanodia|Role TBA;Archan Trivedi|Role TBA;Beena Shah|Role TBA;Sonali Desai|Role TBA;Sunil Vishrani|Role TBA;Morli Patel|Role TBA;Sandip Prajapat|Role TBA;Prem Gadhavi|Role TBA;Kaushambi Bhatt|Role TBA"
  ),

  "Dusshera": makeCast(
    "Kartik J|Role TBA;Jagdish Italiya|Role TBA;Pauravi Joshi|Role TBA;Unnati Sirsath|Role TBA;Sundaram Prasad|Role TBA;Jitendra Sumra|Role TBA;Yug Italiya|Role TBA;Priti Patel|Role TBA;Hiren Vaidya|Role TBA;Pruthvi Palkar|Role TBA;Aman Savle|Role TBA;Lokesh Swami|Role TBA"
  ),

  "Mara Pappa Superhero": makeCast(
    "Shraddha Dangar|Tejudi;Abhinay Banker|Bhavlo;Revanta Sarabhai|Yash;Priyanka Raja|Devika;Bhavya Sirohi|Kanku;Bhatt Bhushan|Jamburo"
  ),

  "Raado": makeCast(
    "Hiten Kumar|Kamlesh CM;Yash Soni|Karan;Hitu Kanodia|Bhushan;Pratik Nanda|Tushar;Nikita Sharma|Madhvi;Bharat Chawda|Darshan;Tarjanee Bhadla|Aashi;Kuldip Shukla|Dr. Rahul;Garima Bhardwaj|Avni;Mehool Desai|Vinod"
  ),

  "Aum Mangalam Singlem": makeCast(
    "Malhar Thakar|Siddharth;Aarohi Patel|Vaani;Bhamini Oza|Ishita;Tatsat Munshi|Max;Darshan Jariwala|Vaani's Father;Devanshi Joshi|Role TBA;Nisarg Trivedi|Role TBA"
  ),

  "Gandhi & Co.": makeCast(
    "Reyaan Shah|Mintu;Hiranya Zinzuwadia|Mitra;Darshan Jariwala|Bharatbhai;Jayesh More|Parth;Dhruma Mehta|Mintu's Mother;Dhyani Jani|Role TBA"
  ),
};

// FIND GUJARATI CAST BY MOVIE TITLE
function getGujaratiCast(title = "") {
  const normalizedTitle = normalizeName(title);

  const matchedTitle = Object.keys(GUJARATI_CAST_DATA).find(
    (movieTitle) =>
      normalizeName(movieTitle) === normalizedTitle
  );

  return matchedTitle
    ? GUJARATI_CAST_DATA[matchedTitle]
    : [];
}

// ACTOR PHOTO CACHE
const actorPhotoCache = new Map();

// WIKIPEDIA ACTOR PHOTO
async function fetchWikipediaActorPhoto(actorName) {
  const name = actorName.trim();

  if (!name) return "";

  try {
    // First try the actor's exact Wikipedia page
    const directUrl =
      "https://en.wikipedia.org/api/rest_v1/page/summary/" +
      encodeURIComponent(name.replace(/ /g, "_"));

    const directResponse = await fetch(directUrl);

    if (directResponse.ok) {
      const directData = await directResponse.json();

      const directImage =
        directData.originalimage?.source ||
        directData.thumbnail?.source ||
        "";

      if (directImage) return directImage;
    }

    // Search Wikipedia if exact page was not found
    const searchUrl =
      "https://en.wikipedia.org/w/api.php?" +
      new URLSearchParams({
        action: "query",
        list: "search",
        srsearch: `"${name}" actor`,
        srnamespace: "0",
        srlimit: "10",
        format: "json",
        origin: "*",
      }).toString();

    const response = await fetch(searchUrl);

    if (!response.ok) return "";

    const data = await response.json();
    const results = data.query?.search || [];

    const normalizedActor = normalizeName(name);

    const selectedPage = results.find(
      (page) =>
        normalizeName(page.title) === normalizedActor
    );

    if (!selectedPage) return "";

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

    return (
      pages[0]?.original?.source ||
      pages[0]?.thumbnail?.source ||
      ""
    );
  } catch (error) {
    console.log("Wikipedia photo error:", name, error);
    return "";
  }
}

// WIKIMEDIA COMMONS ACTOR PHOTO
async function fetchCommonsActorPhoto(actorName) {
  const name = actorName.trim();

  if (!name) return "";

  try {
    const searchTerms = [
      `"${name}"`,
      `${name} portrait`,
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
          gsrlimit: "15",
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

      const normalizedActor = normalizeName(name);

      const matchingPage = pages.find((page) => {
        const fileName = normalizeName(page.title);

        return fileName.includes(normalizedActor);
      });

      if (!matchingPage) continue;

      const photo =
        matchingPage.imageinfo?.[0]?.thumburl ||
        matchingPage.imageinfo?.[0]?.url ||
        "";

      if (photo) return photo;
    }

    return "";
  } catch (error) {
    console.log("Commons photo error:", name, error);
    return "";
  }
}

// GET ACTOR PHOTO
async function fetchActorPhoto(actorName) {
  const name = actorName.trim();

  if (!name) return "";

  const cacheKey = normalizeName(name);

  if (actorPhotoCache.has(cacheKey)) {
    return actorPhotoCache.get(cacheKey);
  }

  try {
    let photo = await fetchWikipediaActorPhoto(name);

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

// FORMAT CAST DATA
function formatCastData(castData) {
  if (typeof castData === "string") {
    castData = castData.split(";").map((entry) => {
      const parts = entry.split("|");

      return {
        name: parts[0]?.trim() || "",
        character:
          parts.slice(1).join("|").trim() || "Role TBA",
      };
    });
  }

  if (!Array.isArray(castData)) return [];

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

// LOAD PHOTOS WITH MAXIMUM 3 REQUESTS AT A TIME
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

  const workers = Array.from(
    { length: Math.min(3, results.length) },
    () => worker()
  );

  await Promise.all(workers);

  return results;
}

// DETAILS PAGE
export default function Details({
  item,
  onBack,
  onBookNow,
}) {
  const [image, setImage] = useState("");
  const [description, setDescription] = useState(
    "Discover the story behind this title."
  );

  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [actors, setActors] = useState([]);
  const [actorsLoading, setActorsLoading] = useState(false);

  // RESET AND LOAD MOVIE DETAILS
  useEffect(() => {
    let cancelled = false;

    async function loadDetails() {
      if (!item) {
        setLoading(false);
        return;
      }

      setImage(
        item.poster ||
        item.image ||
        item.thumbnail ||
        ""
      );

      setDescription(
        item.description ||
        "Discover the story behind this title."
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

        // Keep the poster supplied by Home.jsx.
        // Use Wikipedia image only if no poster exists.
        if (
          !item.poster &&
          !item.image &&
          data.originalimage?.source
        ) {
          setImage(data.originalimage.source);
        } else if (
          !item.poster &&
          !item.image &&
          data.thumbnail?.source
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

      // First use cast received from Home.jsx.
      const receivedCast =
        item.castDetails ||
        item.cast ||
        item.actors ||
        item.starring ||
        [];

      // If Home has no Gujarati cast, use local Gujarati cast data.
      const localGujaratiCast = getGujaratiCast(item.title);

      const selectedCast =
        Array.isArray(receivedCast) && receivedCast.length > 0
          ? receivedCast
          : localGujaratiCast;

      const formattedActors = formatCastData(selectedCast);

      if (cancelled) return;

      // Show actor names and characters immediately.
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

  const category = item.category || item.type || "Movie";

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
                  {/* ACTOR PROFILE PHOTO */}
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
