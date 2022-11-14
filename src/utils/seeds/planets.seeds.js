const mongoose = require("mongoose");
const Planet = require("../../api/planets/planets.model");
require("dotenv").config();
const planets = [
  {
    name: "Venus",
    image: "https://www.pngall.com/wp-content/uploads/11/Venus-PNG-Photo.png",
    title: "Want to visit the planet of love?",
    description:
      "Enhance your love life by visiting this planet with your other half, where you can get the best erotic & sensual experiences. We offer sensual activities so you can practice where you can connect your mind, souls & body. ",
    distance: "Distance: 1 month",
    gravity: "Gravity: too heavy",
    price: "$2Mn per person",
  },
  {
    name: "Mercury",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b9/3D_Mercury.png",
    title: "Want to visit the planet of communication,logic, youth?",
    description:
      "Increase your youthfulness, comunication skills & your logical abilities by activiting the superpowers of Mercury by staying there. We offer various activities, coaching to ehance these qualities for calculation, mind programing for speed in logic & bio hacking for youthfulness ",
    distance: "Distance: 1 month",
    gravity: "Gravity: 3.7 m/s2",
    price: "$3Mn",
  },
  {
    name: "Moon",
    image: "https://www.freeiconspng.com/thumbs/moon-png/moon-png-no-background-15.png",
    title: "The most sensual & emotional planet ",
    description:
      "Learn to control your emotions with our exclusive meditation programmes where you can get the superpowers of the great moon which will enhance your personality to become more sensual,atractive & charismatic. ",
    distance: "Distance: 1 day & a Half",
    gravity: "Gravity: 1.62 m/s2",
    price: "$1Mn",
    moon: true,
  },
  {
    name: "Mars",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/3D_Mars.png",
    title: "The planet of discipline,focus & physical strenght",
    description:
      "We offer special training for physical & mental strenght so yo can stay focused longer hours. We accomplish this by giving you a dopamine reset & removing all distractions from your life also physical training so you can add more muscle to your physique & boost your testosterone.",
    distance: "Distance: 1 month",
    gravity: "Gravity: 3.72 m/s2",
    price: "$4Mn",
  },
  {
    name: "Jupiter",
    image: "https://www.pngplay.com/wp-content/uploads/13/Jupiter-PNG-Pic-Background.png",
    title: "Want to visit the Planet of Wisdom",
    description:
      "Achieve high levels of wisdom from the cosmos & the planet Jupiter itself. We offer wisdom beyond the materialistic world of what life is & for why we are here",
    distance: "Distance: 16 years",
    gravity: "Gravity: 4.79 m/s2",
    price: "$9Mn",
  },
  {
    name: "Saturn",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Saturnx.png/1200px-Saturnx.png",
    title: "The Planet of Karma",
    description:
      "We offer to remove all your miseries & sorrows by helping you clear you karma in life & paying back any karmic debt you might have left.",
    distance: "Distance: 18 years",
    gravity: "Gravity: 10.44 m/s2",
    price: "$8M",
  },
  {
    name: "Uranus",
    image: "https://www.pngmart.com/files/22/Uranus-PNG-Transparent.png",
    title: "Want to visit Uranus",
    description:
      "This is the planet of Chaos, individuality & innovation. Here you can come to either destroy from the roots your ideas or create them from the roots & growing them.",
    distance: "Distance: 4 months",
    gravity: "Gravity: 8.87 m/s2",
    price: "$9Mn",
  },
  {
    name: "Neptune",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/da/3D_Neptune.png",
    title: "Wan to visit Neptune? the blue pill",
    description:
      "We offer Special blue pills so you can a blue skin tone & camuflage within the planet itself",
    distance: "Distance: 8 months",
    gravity: "Gravity: 11.5 m/s2",
    price: "2Mn",
  },
  {
    name: "Pluto",
    image: "https://cdn.pixabay.com/photo/2017/04/04/14/26/pluto-2201446_960_720.png",
    title: "Want to visit the furthest planet of the Solar Sistem",
    description:
      "Visit the furthest planet of the Solar Sistem e & get your life to the furthest realms.",
    distance: "Distance: 98 years",
    gravity: "Gravity: 0,62 m/s2",
    price: "$9Mn",
  },
  {
    name: "Europa",
    image: "https://www.transparentpng.com/thumb/planet/colorful-planet-png-images-free-1QAjqO.png",
    title: "Want to visit Saturns Moon?",
    description: "Visit Saturn's moon to get a great view of the planet of Karma",
    distance: "Distance: 2 months",
    gravity: "Gravity: 1.31 m/s2",
    price: "$50Mm",
    moon: true,
  },
  {
    name: "Titan",
    image: "https://www.pngall.com/wp-content/uploads/13/Mars-PNG-Photo.png",
    title: "The biggest Moon of Saturn",
    description:
      "The name says it all Titan, the biggest moon that orbits the Saturn where you can get a clear view of Saturn itself. The planet has a very rocky surface which might make it difficult to walk on it.",
    distance: "Distance: 2 months",
    gravity: "Gravity:1.35 m/s2",
    price: "$5Mn",
    moon: true,
  },
];

mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    const allPlanets = await Planet.find().lean();

    if (!allPlanets.length) {
      console.log("[seed]: No estoy encontrando los cuadros ... ");
    } else {
      console.log(`[seed]: Encontrados ${allPlanets.length} cuadros.`);
      await Planet.collection.drop();
      console.log("[seed]: Colección Paintings eliminada correctamente");
    }
  })
  .catch((error) => console.log("[seed]: Error eliminando la colección -->", error))
  .then(async () => {
    await Planet.insertMany(planets);
    console.log("[seed]: Nuevos cuadros añadidos con éxito");
  })
  .catch((error) => console.log("[seed]: Error añadiendo los cuadros", error))
  .finally(() => mongoose.disconnect());
