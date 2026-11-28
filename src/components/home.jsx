import React, { useState, useEffect } from "react";

const GOLD = "#E8C879";
const BLACK = "#10182B";
const TEXT = "#F7F3E9";
const MUTED = "#B9C2D7";

// CAST DATA
const makeCast = (entries) =>
  entries.split(";").filter(Boolean).map((entry) => {
    const [name, character] = entry.split("|");
    return {
      name: name.trim(),
      character: (character || "").trim(),
      image: "",
    };
  });

const CAST_DATA = {
  // BOLLYWOOD
  Jawan: makeCast("Shah Rukh Khan|Azad Rathore / Vikram Rathore;Nayanthara|Narmada;Vijay Sethupathi|Kalee;Deepika Padukone|Aishwarya"),
  Pathaan: makeCast("Shah Rukh Khan|Pathaan;Deepika Padukone|Rubina;John Abraham|Jim;Dimple Kapadia|Nandini"),
  Animal: makeCast("Ranbir Kapoor|Ranvijay Singh;Rashmika Mandanna|Geetanjali;Anil Kapoor|Balbir Singh;Bobby Deol|Abrar Haque"),
  Dangal: makeCast("Aamir Khan|Mahavir Singh Phogat;Sakshi Tanwar|Daya Kaur;Fatima Sana Shaikh|Geeta Phogat;Sanya Malhotra|Babita Kumari"),
  "3 Idiots": makeCast("Aamir Khan|Rancho;R. Madhavan|Farhan;Sharman Joshi|Raju;Kareena Kapoor|Pia"),
  "KGF Chapter 2": makeCast("Yash|Rocky;Sanjay Dutt|Adheera;Srinidhi Shetty|Reena;Raveena Tandon|Ramika Sen"),
  Brahmastra: makeCast("Ranbir Kapoor|Shiva;Alia Bhatt|Isha;Amitabh Bachchan|Guru;Mouni Roy|Junoon"),
  War: makeCast("Hrithik Roshan|Kabir;Tiger Shroff|Khalid;Vaani Kapoor|Naina"),
  "Tiger 3": makeCast("Salman Khan|Avinash Tiger Singh Rathore;Katrina Kaif|Zoya;Emraan Hashmi|Aatish"),
  "Bajrangi Bhaijaan": makeCast("Salman Khan|Pawan Kumar Chaturvedi;Harshaali Malhotra|Munni;Kareena Kapoor|Rasika;Nawazuddin Siddiqui|Chand Nawab"),
  Pushpa: makeCast("Allu Arjun|Pushpa Raj;Rashmika Mandanna|Srivalli;Fahadh Faasil|Bhanwar Singh Shekhawat"),
  RRR: makeCast("Ram Charan|Alluri Sitarama Raju;N. T. Rama Rao Jr.|Komaram Bheem;Alia Bhatt|Sita;Ajay Devgn|Venkata Rama Raju"),
  Sultan: makeCast("Salman Khan|Sultan Ali Khan;Anushka Sharma|Aarfa;Randeep Hooda|Fateh Singh"),
  "Drishyam 2": makeCast("Ajay Devgn|Vijay Salgaonkar;Akshaye Khanna|Tarun Ahlawat;Tabu|Meera Deshmukh;Shriya Saran|Nandini Salgaonkar"),
  Kantara: makeCast("Rishab Shetty|Shiva;Sapthami Gowda|Leela;Kishore|Murali"),
  Chhaava: makeCast("Vicky Kaushal|Chhatrapati Sambhaji Maharaj;Rashmika Mandanna|Yesubai;Akshaye Khanna|Aurangzeb"),
  "Stree 2": makeCast("Rajkummar Rao|Vicky;Shraddha Kapoor|Stree;Aparshakti Khurana|Bittu;Pankaj Tripathi|Rudra"),
  Fighter: makeCast("Hrithik Roshan|Shamsher Pathania;Deepika Padukone|Minal Rathore;Anil Kapoor|Rakesh Jai Singh"),
  Shershaah: makeCast("Sidharth Malhotra|Captain Vikram Batra;Kiara Advani|Dimple Cheema"),
  "Laapataa Ladies": makeCast("Nitanshi Goel|Phool Kumari;Pratibha Ranta|Jaya;Sparsh Shrivastava|Deepak;Ravi Kishan|Shyam Manohar"),

  // BOLLYWOOD ROMANTIC MOVIES
  Saiyaara: makeCast("Ahaan Panday|Krish Kapoor;Aneet Padda|Vaani Batra"),
  "Aashiqui 2": makeCast("Aditya Roy Kapur|Rahul Jaykar;Shraddha Kapoor|Aarohi Keshav Shirke;Shaad Randhawa|Vivek"),
  "Yeh Jawaani Hai Deewani": makeCast("Ranbir Kapoor|Kabir Thapar;Deepika Padukone|Naina Talwar;Aditya Roy Kapur|Avi;Kalki Koechlin|Aditi"),
  Rockstar: makeCast("Ranbir Kapoor|Janardhan Jakhar / Jordan;Nargis Fakhri|Heer Kaul;Shammi Kapoor|Ustad Jameel Khan"),
  "Jab We Met": makeCast("Shahid Kapoor|Aditya Kashyap;Kareena Kapoor|Geet Dhillon;Tarun Arora|Anshuman"),
  "Sita Ramam": makeCast("Dulquer Salmaan|Lieutenant Ram;Mrunal Thakur|Sita Mahalakshmi;Rashmika Mandanna|Afreen"),
  "Sanam Teri Kasam": makeCast("Harshvardhan Rane|Inder;Mawra Hocane|Saraswati"),
  "Veer-Zaara": makeCast("Shah Rukh Khan|Veer Pratap Singh;Preity Zinta|Zaara Hayaat Khan;Rani Mukerji|Saamiya Siddiqui;Manoj Bajpayee|Razaa"),
  Raanjhanaa: makeCast("Dhanush|Kundan Shankar;Sonam Kapoor|Zoya Haider;Abhay Deol|Akram"),
  Tamasha: makeCast("Ranbir Kapoor|Ved Vardhan Sahni;Deepika Padukone|Tara Maheshwari"),

  // HOLLYWOOD
  Oppenheimer: makeCast("Cillian Murphy|J. Robert Oppenheimer;Emily Blunt|Katherine Oppenheimer;Matt Damon|Leslie Groves;Robert Downey Jr.|Lewis Strauss"),
  Barbie: makeCast("Margot Robbie|Barbie;Ryan Gosling|Ken;America Ferrera|Gloria;Simu Liu|Ken"),
  "Dune: Part Two": makeCast("Timothée Chalamet|Paul Atreides;Zendaya|Chani;Rebecca Ferguson|Lady Jessica;Austin Butler|Feyd-Rautha"),
  "Avatar: The Way of Water": makeCast("Sam Worthington|Jake Sully;Zoe Saldaña|Neytiri;Sigourney Weaver|Kiri;Stephen Lang|Miles Quaritch"),
  "Avengers: Endgame": makeCast("Robert Downey Jr.|Tony Stark;Chris Evans|Steve Rogers;Scarlett Johansson|Natasha Romanoff;Chris Hemsworth|Thor"),
  Titanic: makeCast("Leonardo DiCaprio|Jack Dawson;Kate Winslet|Rose DeWitt Bukater;Billy Zane|Cal Hockley"),
  "The Batman": makeCast("Robert Pattinson|Bruce Wayne;Zoë Kravitz|Selina Kyle;Paul Dano|Edward Nashton;Colin Farrell|Oswald Cobblepot"),
  Joker: makeCast("Joaquin Phoenix|Arthur Fleck;Zazie Beetz|Sophie Dumond;Robert De Niro|Murray Franklin"),
  Interstellar: makeCast("Matthew McConaughey|Cooper;Anne Hathaway|Dr. Amelia Brand;Jessica Chastain|Murph;Michael Caine|Professor Brand"),
  Inception: makeCast("Leonardo DiCaprio|Dom Cobb;Joseph Gordon-Levitt|Arthur;Elliot Page|Ariadne;Tom Hardy|Eames"),
  "Spider-Man: No Way Home": makeCast("Tom Holland|Peter Parker;Zendaya|MJ;Benedict Cumberbatch|Doctor Strange;Jacob Batalon|Ned Leeds"),
  "The Dark Knight": makeCast("Christian Bale|Bruce Wayne;Heath Ledger|Joker;Aaron Eckhart|Harvey Dent;Michael Caine|Alfred"),
  Frozen: makeCast("Kristen Bell|Anna;Idina Menzel|Elsa;Jonathan Groff|Kristoff;Josh Gad|Olaf"),
  "Black Panther": makeCast("Chadwick Boseman|T'Challa;Michael B. Jordan|Erik Killmonger;Lupita Nyong'o|Nakia;Danai Gurira|Okoye"),
  "Doctor Strange": makeCast("Benedict Cumberbatch|Stephen Strange;Chiwetel Ejiofor|Mordo;Rachel McAdams|Christine Palmer;Tilda Swinton|Ancient One"),
  "The Conjuring": makeCast("Vera Farmiga|Lorraine Warren;Patrick Wilson|Ed Warren;Lili Taylor|Carolyn Perron;Ron Livingston|Roger Perron"),
  "Mission Impossible": makeCast("Tom Cruise|Ethan Hunt;Hayley Atwell|Grace;Ving Rhames|Luther Stickell;Simon Pegg|Benji Dunn"),
  "Jurassic World": makeCast("Chris Pratt|Owen Grady;Bryce Dallas Howard|Claire Dearing;Vincent D'Onofrio|Vic Hoskins"),
  "John Wick 4": makeCast("Keanu Reeves|John Wick;Donnie Yen|Caine;Bill Skarsgård|Marquis Vincent de Gramont;Laurence Fishburne|Bowery King"),
  "The Lion King": makeCast("Donald Glover|Simba;Beyoncé|Nala;James Earl Jones|Mufasa;Chiwetel Ejiofor|Scar"),

  // HOLLYWOOD ROMANTIC MOVIES
  "The Notebook": makeCast("Ryan Gosling|Noah Calhoun;Rachel McAdams|Allie Hamilton;James Garner|Older Noah;Gena Rowlands|Older Allie"),
  "Me Before You": makeCast("Emilia Clarke|Louisa Clark;Sam Claflin|William Traynor;Janet McTeer|Camilla Traynor;Charles Dance|Stephen Traynor"),
  "The Fault in Our Stars": makeCast("Shailene Woodley|Hazel Grace Lancaster;Ansel Elgort|Augustus Waters;Nat Wolff|Isaac;Laura Dern|Frannie Lancaster"),
  "La La Land": makeCast("Ryan Gosling|Sebastian Wilder;Emma Stone|Mia Dolan;John Legend|Keith"),
  "Pride & Prejudice": makeCast("Keira Knightley|Elizabeth Bennet;Matthew Macfadyen|Mr. Darcy;Rosamund Pike|Jane Bennet;Donald Sutherland|Mr. Bennet"),
  "The Vow": makeCast("Rachel McAdams|Paige Collins;Channing Tatum|Leo Collins;Sam Neill|Bill Thornton;Jessica Lange|Rita Thornton"),
  "Five Feet Apart": makeCast("Haley Lu Richardson|Stella Grant;Cole Sprouse|Will Newman;Moisés Arias|Poe Ramirez"),
  "Love, Rosie": makeCast("Lily Collins|Rosie Dunne;Sam Claflin|Alex Stewart;Tamsin Egerton|Sally"),
  "10 Things I Hate About You": makeCast("Heath Ledger|Patrick Verona;Julia Stiles|Kat Stratford;Joseph Gordon-Levitt|Cameron James;Larisa Oleynik|Bianca Stratford"),

  // UPCOMING MOVIES
  "Golmaal 5": [],
  "Tumbbad II": makeCast("Sohum Shah|Role TBA;Nawazuddin Siddiqui|Role TBA;Alia Bhatt|Role TBA"),
  "Shakti Shalini": makeCast("Aneet Padda|Role TBA"),
  "Love & War": makeCast("Ranbir Kapoor|Role TBA;Alia Bhatt|Role TBA;Vicky Kaushal|Role TBA"),
  Naagzilla: makeCast("Kartik Aaryan|Role TBA"),
  "Avengers: Doomsday": makeCast("Robert Downey Jr.|Victor von Doom;Chris Evans|Steve Rogers;Chris Hemsworth|Thor;Pedro Pascal|Reed Richards;Paul Rudd|Scott Lang;Anthony Mackie|Sam Wilson;Florence Pugh|Yelena Belova;Vanessa Kirby|Sue Storm;Ebon Moss-Bachrach|Ben Grimm;Wyatt Russell|John Walker;Channing Tatum|Gambit;Simu Liu|Shang-Chi;Ian McKellen|Magneto;Tom Hiddleston|Loki;James Marsden|Cyclops;Patrick Stewart|Professor X;Joseph Quinn|Johnny Storm;Sebastian Stan|Bucky Barnes;David Harbour|Red Guardian;Letitia Wright|Shuri;Lewis Pullman|Sentry;Kelsey Grammer|Beast;Kathryn Newton|Cassie Lang;Danny Ramirez|Joaquin Torres;Winston Duke|M'Baku;Alan Cumming|Nightcrawler;Hannah John-Kamen|Ghost;Rebecca Romijn|Mystique;Mabel Cadena|Namora;Tenoch Huerta|Namor"),
  "Jumanji: Open World": makeCast("Dwayne Johnson|Dr. Smolder Bravestone;Jack Black|Professor Sheldon Oberon;Kevin Hart|Franklin Finbar;Karen Gillan|Ruby Roundhouse;Alex Wolff|Role TBA;Morgan Turner|Role TBA;Ser'Darius Blain|Role TBA;Madison Iseman|Role TBA;Nick Jonas|Role TBA;Danny DeVito|Role TBA"),
  "Spider-Man: Brand New Day": makeCast("Tom Holland|Peter Parker;Zendaya|MJ;Sadie Sink|Role TBA;Jacob Batalon|Ned Leeds;Jon Bernthal|Frank Castle;Florence Pugh|Yelena Belova;Tramell Tillman|Role TBA;Michael Mando|Mac Gargan;Rosario Dawson|Role TBA;Mark Ruffalo|Bruce Banner"),
  "Avengers: Secret Wars": [],
  "The Man with the Bag": [],

  // TV SHOWS
  "Stranger Things": makeCast("Millie Bobby Brown|Eleven;Finn Wolfhard|Mike Wheeler;David Harbour|Jim Hopper;Winona Ryder|Joyce Byers"),
  "Money Heist": makeCast("Úrsula Corberó|Tokyo;Álvaro Morte|The Professor;Pedro Alonso|Berlin;Itziar Ituño|Raquel Murillo"),
  Wednesday: makeCast("Jenna Ortega|Wednesday Addams;Emma Myers|Enid Sinclair;Catherine Zeta-Jones|Morticia Addams;Luis Guzmán|Gomez Addams"),
  "The Witcher": makeCast("Henry Cavill|Geralt of Rivia;Anya Chalotra|Yennefer;Freya Allan|Ciri"),
  "Game of Thrones": makeCast("Emilia Clarke|Daenerys Targaryen;Kit Harington|Jon Snow;Peter Dinklage|Tyrion Lannister;Sophie Turner|Sansa Stark"),
  Dark: makeCast("Louis Hofmann|Jonas Kahnwald;Lisa Vicari|Martha Nielsen;Andreas Pietschmann|The Stranger"),
  "Breaking Bad": makeCast("Bryan Cranston|Walter White;Aaron Paul|Jesse Pinkman;Anna Gunn|Skyler White;Dean Norris|Hank Schrader"),
  "The Last of Us": makeCast("Pedro Pascal|Joel Miller;Bella Ramsey|Ellie Williams;Anna Torv|Tess"),
  "Squid Game": makeCast("Lee Jung-jae|Seong Gi-hun;Park Hae-soo|Cho Sang-woo;Jung Ho-yeon|Kang Sae-byeok"),
  "The Family Man": makeCast("Manoj Bajpayee|Srikant Tiwari;Priyamani|Suchitra Tiwari;Sharib Hashmi|JK Talpade;Ashlesha Thakur|Dhriti Tiwari"),
};

// BOLLYWOOD + HOLLYWOOD MOVIES
const movies = [
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

  { title: "Oppenheimer", wiki: "Oppenheimer (film)", category: "Hollywood", year: 2023 },
  { title: "Barbie", wiki: "Barbie (film)", category: "Hollywood", year: 2023 },
  { title: "Dune: Part Two", wiki: "Dune: Part Two", category: "Hollywood", year: 2024 },
  { title: "Avatar: The Way of Water", wiki: "Avatar: The Way of Water", category: "Hollywood", year: 2022 },
  { title: "Avengers: Endgame", wiki: "Avengers: Endgame", category: "Hollywood", year: 2019 },
  { title: "Titanic", wiki: "Titanic (1997 film)", category: "Hollywood", year: 1997, genre: "Romance" },
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

// 19 NEW ROMANTIC MOVIES
const romanticMovies = [
  { title: "Saiyaara", wiki: "Saiyaara (film)", category: "Bollywood", year: 2025, genre: "Romance" },
  { title: "Aashiqui 2", wiki: "Aashiqui 2", category: "Bollywood", year: 2013, genre: "Romance" },
  { title: "Yeh Jawaani Hai Deewani", wiki: "Yeh Jawaani Hai Deewani", category: "Bollywood", year: 2013, genre: "Romance" },
  { title: "Rockstar", wiki: "Rockstar (2011 film)", category: "Bollywood", year: 2011, genre: "Romance" },
  { title: "Jab We Met", wiki: "Jab We Met", category: "Bollywood", year: 2007, genre: "Romance" },
  { title: "Sita Ramam", wiki: "Sita Ramam", category: "Bollywood", year: 2022, genre: "Romance" },
  { title: "Sanam Teri Kasam", wiki: "Sanam Teri Kasam (2016 film)", category: "Bollywood", year: 2016, genre: "Romance" },
  { title: "Veer-Zaara", wiki: "Veer-Zaara", category: "Bollywood", year: 2004, genre: "Romance" },
  { title: "Raanjhanaa", wiki: "Raanjhanaa", category: "Bollywood", year: 2013, genre: "Romance" },
  { title: "Tamasha", wiki: "Tamasha (2015 film)", category: "Bollywood", year: 2015, genre: "Romance" },

  { title: "The Notebook", wiki: "The Notebook (2004 film)", category: "Hollywood", year: 2004, genre: "Romance" },
  { title: "Me Before You", wiki: "Me Before You (film)", category: "Hollywood", year: 2016, genre: "Romance" },
  { title: "The Fault in Our Stars", wiki: "The Fault in Our Stars (film)", category: "Hollywood", year: 2014, genre: "Romance" },
  { title: "La La Land", wiki: "La La Land", category: "Hollywood", year: 2016, genre: "Romance" },
  { title: "Pride & Prejudice", wiki: "Pride & Prejudice (2005 film)", category: "Hollywood", year: 2005, genre: "Romance" },
  { title: "The Vow", wiki: "The Vow (2012 film)", category: "Hollywood", year: 2012, genre: "Romance" },
  { title: "Five Feet Apart", wiki: "Five Feet Apart", category: "Hollywood", year: 2019, genre: "Romance" },
  { title: "Love, Rosie", wiki: "Love, Rosie", category: "Hollywood", year: 2014, genre: "Romance" },
  { title: "10 Things I Hate About You", wiki: "10 Things I Hate About You", category: "Hollywood", year: 1999, genre: "Romance" },
];

// 30 GUJARATI MOVIES
const gujaratiMovies = [
  { title: "Hellaro", wiki: "Hellaro", category: "Gujarati", year: 2019 },
  { title: "Chaal Jeevi Laiye!", wiki: "Chaal Jeevi Laiye", category: "Gujarati", year: 2019 },
  { title: "Chhello Divas", wiki: "Chhello Divas", category: "Gujarati", year: 2015 },
  { title: "Bey Yaar", wiki: "Bey Yaar", category: "Gujarati", year: 2014 },
  { title: "Reva", wiki: "Reva (film)", category: "Gujarati", year: 2018 },
  { title: "Wrong Side Raju", wiki: "Wrong Side Raju", category: "Gujarati", year: 2016 },
  { title: "Kevi Rite Jaish", wiki: "Kevi Rite Jaish", category: "Gujarati", year: 2012 },
  { title: "The Good Road", wiki: "The Good Road", category: "Gujarati", year: 2013 },
  { title: "Chal Man Jeetva Jaiye", wiki: "Chal Man Jeetva Jaiye", category: "Gujarati", year: 2017 },
  { title: "Love Ni Bhavai", wiki: "Love Ni Bhavai", category: "Gujarati", year: 2017 },
  { title: "Chhello Show", wiki: "Last Film Show", category: "Gujarati", year: 2021 },
  { title: "Dhh", wiki: "Dhh", category: "Gujarati", year: 2018 },
  { title: "Shu Thayu?", wiki: "Shu Thayu?", category: "Gujarati", year: 2018 },
  { title: "Golkeri", wiki: "Golkeri", category: "Gujarati", year: 2020 },
  { title: "Fakt Mahilao Maate", wiki: "Fakt Mahilao Maate", category: "Gujarati", year: 2022 },
  { title: "Naadi Dosh", wiki: "Naadi Dosh", category: "Gujarati", year: 2022 },
  { title: "Vash", wiki: "Vash (film)", category: "Gujarati", year: 2023 },
  { title: "Jhamkudi", wiki: "Jhamkudi", category: "Gujarati", year: 2024 },
  { title: "Kasoombo", wiki: "Kasoombo", category: "Gujarati", year: 2024 },
  { title: "Fakt Purusho Maate", wiki: "Fakt Purusho Maate", category: "Gujarati", year: 2024 },
  { title: "Laalo - Krishna Sada Sahaayate", wiki: "Laalo - Krishna Sada Sahaayate", category: "Gujarati", year: 2025 },
  { title: "Pravas", wiki: "Pravas", category: "Gujarati", year: 2025 },
  { title: "Umbarro", wiki: "Umbarro", category: "Gujarati", year: 2025 },
  { title: "Chaniya Toli", wiki: "Chaniya Toli", category: "Gujarati", year: 2025 },
  { title: "Misri", wiki: "Misri", category: "Gujarati", year: 2025 },
  { title: "Dusshera", wiki: "Dusshera", category: "Gujarati", year: 2025 },
  { title: "Mara Pappa Superhero", wiki: "Mara Pappa Superhero", category: "Gujarati", year: 2021 },
  { title: "Raado", wiki: "Raado", category: "Gujarati", year: 2022 },
  { title: "Aum Mangalam Singlem", wiki: "Aum Mangalam Singlem", category: "Gujarati", year: 2022 },
  { title: "Gandhi & Co.", wiki: "Gandhi & Co.", category: "Gujarati", year: 2023 },
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

// KING और DADA हटाए गए हैं
// उनकी जगह Love & War और Naagzilla जोड़े गए हैं
const upcoming = [
  { title: "Golmaal 5", wiki: "Golmaal 5", category: "Bollywood", year: 2027 },
  { title: "Tumbbad II", wiki: "Tumbbad 2", category: "Bollywood", year: 2027 },
  { title: "Shakti Shalini", wiki: "Shakti Shalini", category: "Bollywood", year: 2027 },
  { title: "Love & War", wiki: "Love and War (upcoming film)", category: "Bollywood", year: 2027 },
  { title: "Naagzilla", wiki: "Naagzilla", category: "Bollywood", year: 2027 },
  { title: "Avengers: Doomsday", wiki: "Avengers: Doomsday", category: "Hollywood", year: 2026 },
  { title: "Jumanji: Open World", wiki: "Jumanji: Open World", category: "Hollywood", year: 2026 },
  { title: "Spider-Man: Brand New Day", wiki: "Spider-Man: Brand New Day", category: "Hollywood", year: 2026 },
  { title: "Avengers: Secret Wars", wiki: "Avengers: Secret Wars", category: "Hollywood", year: 2027 },
  { title: "The Man with the Bag", wiki: "The Man with the Bag", category: "Hollywood", year: 2026 },
].map((item) => ({ ...item, type: "Coming Soon" }));

const trendingMovies = upcoming.map((item) => ({
  ...item,
  badge: "TRENDING",
}));

const allMovies = [
  ...movies.map((item) => ({ ...item, type: "Movie" })),
  ...romanticMovies.map((item) => ({ ...item, type: "Movie" })),
  ...gujaratiMovies.map((item) => ({ ...item, type: "Movie" })),
];

const allContent = [...allMovies, ...shows];

// POSTER SYSTEM
const posterCache = new Map();

const normalizeTitle = (value = "") =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

const POSTER_ALIASES = {
  "Love & War": {
    search: [
      "Love and War 2027 Ranbir Kapoor Alia Bhatt",
      "Love & War Sanjay Leela Bhansali"
    ],
    match: ["Love & War", "Love and War"]
  },
  Naagzilla: {
    search: [
      "Naagzilla 2027 Kartik Aaryan",
      "Naagzilla movie poster"
    ],
    match: ["Naagzilla", "Naagzilla: Naag Lok Ka Pehla Kaand"]
  },
};

async function fetchPoster(item) {
  const isObject = typeof item === "object";
  const title = isObject ? item.title : item;
  const wiki = isObject ? item.wiki : "";
  const year = isObject ? item.year : null;
  const type = isObject && item.type === "TV Show" ? "series" : "movie";
  const cacheKey = `${type}-${title}-${year || ""}`;

  if (posterCache.has(cacheKey)) {
    return posterCache.get(cacheKey);
  }

  const special = POSTER_ALIASES[title];

  const searchTerms = [
    ...(special?.search || []),
    title,
    wiki,
  ].filter(Boolean);

  const uniqueSearchTerms = [...new Set(searchTerms)];

  const acceptedTitles = [
    title,
    wiki,
    ...(special?.match || []),
  ]
    .filter(Boolean)
    .map(normalizeTitle);

  try {
    for (const searchTerm of uniqueSearchTerms) {
      const url = `https://api.streamx.qzz.io/search?q=${encodeURIComponent(searchTerm)}&type=${type}`;
      const response = await fetch(url);

      if (!response.ok) continue;

      const data = await response.json();
      const results = Array.isArray(data.metas) ? data.metas : [];

      const exactMatches = results.filter((result) => {
        const resultTitle = result.title || result.name || "";
        return acceptedTitles.includes(normalizeTitle(resultTitle));
      });

      let matchingItem = exactMatches.find((result) => {
        if (!year) return true;

        const resultYear = String(
          result.releaseInfo || result.year || ""
        ).slice(0, 4);

        return resultYear === String(year);
      });

      if (!matchingItem) {
        matchingItem = exactMatches[0];
      }

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

// POSTER CARD
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
          width: "100%",
          background: BLACK,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
              objectPosition: "center center",
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
          {item.badge ||
            (item.type === "Coming Soon"
              ? "UPCOMING"
              : (item.category || "MOVIE").toUpperCase())}
        </span>
      </div>

      <div style={{ padding: compact ? 10 : 14 }}>
        <h3
          style={{
            color: TEXT,
            margin: "0 0 7px",
            fontSize: compact ? 13 : 16,
            minHeight: compact ? 32 : "auto",
          }}
        >
          {item.title}
        </h3>

        <p style={{ color: MUTED, margin: "0 0 12px", fontSize: 11 }}>
          {item.year ? `${item.year} • ` : ""}
          {item.type}
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

// HERO BANNER
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
        <p
          style={{
            color: GOLD,
            fontWeight: 900,
            letterSpacing: 3,
            margin: "0 0 12px",
          }}
        >
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

        <p
          style={{
            color: "#F1E8D5",
            fontSize: 16,
            lineHeight: 1.6,
            maxWidth: 430,
          }}
        >
          Discover the next big cinematic experience. Coming soon in theatres.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 22,
            flexWrap: "wrap",
          }}
        >
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
              background:
                active === index ? GOLD : "rgba(255,255,255,.45)",
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

  const [selectedMovieCategory, setSelectedMovieCategory] =
    useState("Romantic");

  const [selectedRomanticCategory, setSelectedRomanticCategory] =
    useState("");

  const [selectedItem, setSelectedItem] = useState(null);
  const [authMode, setAuthMode] = useState(null);
  const [authMessage, setAuthMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const goTo = (name) => {
    setPage(name);
    setSearch("");
    setSelectedMovieCategory("Romantic");
    setSelectedRomanticCategory("");
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
    const matchedCastKey = Object.keys(CAST_DATA).find(
      (title) => normalizeTitle(title) === normalizeTitle(item.title)
    );

    const selectedWithCast = {
      ...item,
      castDetails:
        CAST_DATA[item.title] ||
        CAST_DATA[matchedCastKey] ||
        item.castDetails ||
        [],
    };

    if (onSelectItem) onSelectItem(selectedWithCast);
    else setSelectedItem(selectedWithCast);
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

  const backButton = () => (
    <button
      onClick={() => goTo("Home")}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 17px",
        marginBottom: 22,
        background: "rgba(232,200,121,0.08)",
        border: `1px solid ${GOLD}`,
        borderRadius: 25,
        color: GOLD,
        fontSize: 13,
        fontWeight: 800,
        cursor: "pointer",
        transition: "all 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = GOLD;
        e.currentTarget.style.color = BLACK;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(232,200,121,0.08)";
        e.currentTarget.style.color = GOLD;
      }}
    >
      <span style={{ fontSize: 17, lineHeight: 1 }}>←</span>
      Back to Home
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

  const filteredGujarati = gujaratiMovies.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  // ROMANTIC MOVIE FILTER
  // Titanic existing Hollywood list से आता है, इसलिए duplicate नहीं होगा।
  const allRomanticMovies = [
    ...romanticMovies,
    movies.find((item) => item.title === "Titanic"),
  ].filter(Boolean).map((item) => ({
    ...item,
    type: "Movie",
    genre: "Romance",
  }));

  const filteredRomanticMovies = allRomanticMovies.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase().trim());

    const matchesRomanticCategory =
      !selectedRomanticCategory ||
      item.category === selectedRomanticCategory;

    return matchesSearch && matchesRomanticCategory;
  });

  // HOME SEARCH CATEGORY FILTER
  const homeSearchResults = (() => {
    if (selectedMovieCategory === "Romantic") {
      return filteredRomanticMovies;
    }

    return allMovies.filter((item) => {
      const matchesCategory = item.category === selectedMovieCategory;

      const matchesSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      return matchesCategory && matchesSearch;
    });
  })();

  const navItems = [
    "Home",
    "Movies",
    "Romantic",
    "Bollywood",
    "Hollywood",
    "Gujarati",
    "TV Shows",
    "Coming Soon",
    "About",
    "Contact",
  ];

  // SEARCH BOX
  const searchBox = (placeholder) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "min(100%, 380px)",
        boxSizing: "border-box",
        padding: "0 14px",
        marginBottom: 28,
        background: "#1B2741",
        border: "1px solid rgba(232,200,121,0.4)",
        borderRadius: 30,
        boxShadow: "0 5px 18px rgba(0,0,0,0.18)",
      }}
    >
      <span
        style={{
          color: GOLD,
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
      </span>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        style={{
          width: "100%",
          minWidth: 0,
          padding: "11px 0",
          background: "transparent",
          border: "none",
          outline: "none",
          color: "#FFFFFF",
          fontSize: 13,
        }}
      />

      {search && (
        <button
          onClick={() => setSearch("")}
          aria-label="Clear search"
          style={{
            background: "transparent",
            border: "none",
            color: MUTED,
            fontSize: 19,
            cursor: "pointer",
            padding: 0,
            flexShrink: 0,
          }}
        >
          ×
        </button>
      )}
    </div>
  );

  // HOME SEARCH CATEGORIES
  const homeSearchCategories = [
    "Romantic",
    "Bollywood",
    "Hollywood",
    "Gujarati",
  ];

  const openAuth = (mode) => {
    setAuthMessage("");
    setShowPassword(false);
    setAuthMode(mode);
  };

  // ROMANTIC CATEGORY BUTTONS
  const romanticFilterButton = (label, value) => {
    const isActive = selectedRomanticCategory === value;

    return (
      <button
        key={label}
        onClick={() => setSelectedRomanticCategory(value)}
        style={{
          padding: "10px 19px",
          borderRadius: 25,
          border: isActive
            ? `1px solid ${GOLD}`
            : "1px solid rgba(232,200,121,0.35)",
          background: isActive
            ? `linear-gradient(120deg,#F5E4B2,${GOLD})`
            : "rgba(255,255,255,0.04)",
          color: isActive ? BLACK : "#E5E9F2",
          fontSize: 12,
          fontWeight: 800,
          cursor: "pointer",
          whiteSpace: "nowrap",
          transition: "all 0.25s ease",
        }}
      >
        {label}
      </button>
    );
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
                    document
                      .getElementById(item.toLowerCase())
                      ?.scrollIntoView({ behavior: "smooth" });
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

          {/* HOME SEARCH BAR + MAIN CATEGORY BUTTONS */}
          <section
            style={{
              padding: "22px 6% 25px",
              background: "#080D18",
              borderBottom: "1px solid rgba(232,200,121,0.12)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 18,
                flexWrap: "wrap",
                maxWidth: 1100,
                margin: "0 auto",
              }}
            >
              {/* HOME SEARCH INPUT */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "min(100%, 340px)",
                  minWidth: 230,
                  boxSizing: "border-box",
                  padding: "0 15px",
                  background: "#1B2741",
                  border: "1px solid rgba(232,200,121,0.4)",
                  borderRadius: 30,
                  boxShadow: "0 5px 18px rgba(0,0,0,0.18)",
                }}
              >
                <span
                  style={{
                    color: GOLD,
                    fontSize: 19,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4-4" />
                  </svg>
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={
                    selectedMovieCategory === "Romantic"
                      ? "Search romantic movies..."
                      : "Search movies..."
                  }
                  aria-label="Search movies"
                  style={{
                    width: "100%",
                    minWidth: 0,
                    padding: "12px 0",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#FFFFFF",
                    fontSize: 13,
                  }}
                />

                {search && (
                  <button
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: MUTED,
                      fontSize: 19,
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    ×
                  </button>
                )}
              </div>

              {/* HOME PAGE MAIN CATEGORY BUTTONS */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 9,
                  flexWrap: "wrap",
                }}
              >
                {homeSearchCategories.map((category) => {
                  const isActive = selectedMovieCategory === category;

                  return (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedMovieCategory(category);
                        setSelectedRomanticCategory("");
                      }}
                      style={{
                        padding: "10px 17px",
                        borderRadius: 25,
                        border: isActive
                          ? `1px solid ${GOLD}`
                          : "1px solid rgba(232,200,121,0.3)",
                        background: isActive
                          ? `linear-gradient(120deg,#F5E4B2,${GOLD})`
                          : "rgba(255,255,255,0.04)",
                        color: isActive ? BLACK : "#E5E9F2",
                        fontSize: 12,
                        fontWeight: 800,
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                        boxShadow: isActive
                          ? "0 5px 16px rgba(232,200,121,0.18)"
                          : "none",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {category === "Romantic" ? "♥ Romantic" : category}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* HOME PAGE SEARCH RESULTS */}
            <div style={{ maxWidth: 1200, margin: "30px auto 0" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                <h2
                  style={{
                    ...headingStyle,
                    margin: 0,
                    fontSize: 23,
                  }}
                >
                  {search.trim()
                    ? `${selectedMovieCategory} Search Results`
                    : selectedMovieCategory === "Romantic"
                      ? "Romantic Movies"
                      : selectedMovieCategory}
                </h2>

                <span style={{ color: MUTED, fontSize: 12 }}>
                  {homeSearchResults.length} Movies Found
                </span>
              </div>

              {/* NOTE:
                  Home Page पर Romantic के नीचे Bollywood/Hollywood
                  के extra filter buttons नहीं दिखाए जाते।
                  ये filters केवल Romantic Movies page पर हैं।
              */}

              {renderGrid(homeSearchResults)}
            </div>
          </section>

          {/* TRENDING */}
          <section
            style={{
              ...sectionStyle,
              paddingTop: 25,
              paddingBottom: 28,
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
                🔥 Trending Movies
              </h2>
              {viewAllButton("Trending", "Coming Soon")}
            </div>

            {renderHorizontal(trendingMovies)}
          </section>

          {/* ROMANTIC MOVIES SECTION */}
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
                ❤️ Romantic Movies
              </h2>
              {viewAllButton("Romantic", "Romantic")}
            </div>

            {renderHorizontal(allRomanticMovies)}
          </section>

          {/* HOLLYWOOD UPCOMING */}
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
              trendingMovies.filter(
                (item) => item.category === "Hollywood"
              )
            )}
          </section>

          {/* BOLLYWOOD */}
          <section
            style={{
              ...sectionStyle,
              paddingTop: 25,
              paddingBottom: 28,
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
                🎬 Bollywood Movies
              </h2>
              {viewAllButton("Bollywood", "Bollywood")}
            </div>

            {renderHorizontal(
              allMovies.filter(
                (item) => item.category === "Bollywood"
              )
            )}
          </section>

          {/* GUJARATI MOVIES */}
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
                🎞 Gujarati Movies
              </h2>
              {viewAllButton("Gujarati", "Gujarati")}
            </div>

            {renderHorizontal(gujaratiMovies)}
          </section>

          {/* TV SHOWS */}
          <section
            style={{
              ...sectionStyle,
              paddingTop: 25,
              paddingBottom: 28,
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
                📺 Popular TV Shows
              </h2>
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

            <p
              style={{
                color: MUTED,
                lineHeight: 1.9,
                maxWidth: 850,
              }}
            >
              AUREVIX is your destination for discovering movies and TV shows.
              Explore Bollywood, Hollywood and Gujarati movie collections,
              find upcoming releases and enjoy a cinematic experience in one place.
            </p>
          </section>

          {/* CONTACT */}
          <section id="contact" style={sectionStyle}>
            <h2 style={headingStyle}>Contact Us</h2>

            <p style={{ color: MUTED }}>
              Have a question or suggestion? Contact the AUREVIX team.
            </p>

            <p style={{ color: GOLD }}>
              Email: support@aurevix.com
            </p>
          </section>
        </>
      )}

      {/* ALL MOVIES PAGE */}
      {page === "Movies" && (
        <main style={sectionStyle}>
          {backButton()}

          <h1 style={{ color: GOLD, fontSize: 38 }}>
            Explore All Movies
          </h1>

          <p style={{ color: MUTED, marginBottom: 30 }}>
            Explore Bollywood, Hollywood and Gujarati movies.
          </p>

          {searchBox("Search movies...")}

          <h2 style={headingStyle}>Bollywood Movies</h2>
          {renderGrid(
            filteredMovies.filter(
              (item) => item.category === "Bollywood"
            )
          )}

          <h2 style={{ ...headingStyle, marginTop: 50 }}>
            Hollywood Movies
          </h2>
          {renderGrid(
            filteredMovies.filter(
              (item) => item.category === "Hollywood"
            )
          )}

          <h2 style={{ ...headingStyle, marginTop: 50 }}>
            Gujarati Movies
          </h2>
          {renderGrid(
            filteredMovies.filter(
              (item) => item.category === "Gujarati"
            )
          )}
        </main>
      )}

      {/* ROMANTIC MOVIES PAGE */}
      {page === "Romantic" && (
        <main style={sectionStyle}>
          {backButton()}

          <h1 style={{ color: GOLD, fontSize: 38 }}>
            ❤️ Romantic Movies
          </h1>

          <p style={{ color: MUTED, marginBottom: 25 }}>
            Explore the best romantic movies from Bollywood and Hollywood.
          </p>

          {/* SEARCH BAR + BOLLYWOOD / HOLLYWOOD FILTERS */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 28,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "min(100%, 380px)",
                boxSizing: "border-box",
                padding: "0 14px",
                background: "#1B2741",
                border: "1px solid rgba(232,200,121,0.4)",
                borderRadius: 30,
                boxShadow: "0 5px 18px rgba(0,0,0,0.18)",
              }}
            >
              <span
                style={{
                  color: GOLD,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
                </svg>
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search romantic movies..."
                aria-label="Search romantic movies"
                style={{
                  width: "100%",
                  minWidth: 0,
                  padding: "12px 0",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#FFFFFF",
                  fontSize: 13,
                }}
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: MUTED,
                    fontSize: 19,
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  ×
                </button>
              )}
            </div>

            {romanticFilterButton("Bollywood", "Bollywood")}
            {romanticFilterButton("Hollywood", "Hollywood")}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <h2 style={{ ...headingStyle, margin: 0 }}>
              {selectedRomanticCategory
                ? `${selectedRomanticCategory} Romantic Movies`
                : "All Romantic Movies"}
            </h2>

            <span style={{ color: MUTED, fontSize: 12 }}>
              {filteredRomanticMovies.length} Movies Found
            </span>
          </div>

          {renderGrid(filteredRomanticMovies)}
        </main>
      )}

      {/* BOLLYWOOD PAGE */}
      {page === "Bollywood" && (
        <main style={sectionStyle}>
          {backButton()}

          <h1 style={{ color: GOLD, fontSize: 38 }}>
            All Bollywood Movies
          </h1>

          <p style={{ color: MUTED, marginBottom: 30 }}>
            Explore all Bollywood movies.
          </p>

          {searchBox("Search Bollywood movies...")}

          {renderGrid(
            filteredMovies.filter(
              (item) => item.category === "Bollywood"
            )
          )}
        </main>
      )}

      {/* HOLLYWOOD PAGE */}
      {page === "Hollywood" && (
        <main style={sectionStyle}>
          {backButton()}

          <h1 style={{ color: GOLD, fontSize: 38 }}>
            All Hollywood Movies
          </h1>

          <p style={{ color: MUTED, marginBottom: 30 }}>
            Explore all Hollywood movies.
          </p>

          {searchBox("Search Hollywood movies...")}

          {renderGrid(
            filteredMovies.filter(
              (item) => item.category === "Hollywood"
            )
          )}

          <h2 style={{ ...headingStyle, marginTop: 45 }}>
            Coming Soon in Hollywood
          </h2>

          {renderGrid(
            filteredUpcoming.filter(
              (item) => item.category === "Hollywood"
            )
          )}
        </main>
      )}

      {/* GUJARATI PAGE */}
      {page === "Gujarati" && (
        <main style={sectionStyle}>
          {backButton()}

          <h1 style={{ color: GOLD, fontSize: 38 }}>
            Gujarati Movies
          </h1>

          <p style={{ color: MUTED, marginBottom: 30 }}>
            Explore popular Gujarati cinema, family dramas, comedy,
            thriller and more.
          </p>

          {searchBox("Search Gujarati movies...")}

          {renderGrid(filteredGujarati)}
        </main>
      )}

      {/* TV SHOWS PAGE */}
      {page === "TV Shows" && (
        <main style={sectionStyle}>
          {backButton()}

          <h1 style={{ color: GOLD, fontSize: 38 }}>
            TV Shows
          </h1>

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
          {backButton()}

          <h1 style={{ color: GOLD, fontSize: 38 }}>
            Trending & Coming Soon
          </h1>

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
              {authMode === "login"
                ? "Welcome Back"
                : "Create Your Account"}
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
                  const confirmPassword =
                    form.elements.confirmPassword.value;

                  if (password !== confirmPassword) {
                    setAuthMessage(
                      "Passwords do not match. Please try again."
                    );
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
                  onChange={(e) =>
                    setShowPassword(e.target.checked)
                  }
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
                {authMode === "login"
                  ? "Sign In"
                  : "Create Account"}
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
                onClick={() =>
                  openAuth(
                    authMode === "login" ? "register" : "login"
                  )
                }
                style={{
                  color: GOLD,
                  border: "none",
                  background: "transparent",
                  fontWeight: 800,
                  cursor: "pointer",
                  marginLeft: 5,
                }}
              >
                {authMode === "login"
                  ? "Create account"
                  : "Log in"}
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
            <h2 style={{ color: GOLD }}>
              {selectedItem.title}
            </h2>

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
        <h2 style={{ color: GOLD, letterSpacing: 4 }}>
          AUREVIX.
        </h2>

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