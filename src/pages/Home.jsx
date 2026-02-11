   //import with react to access image files from the assets folder that contains the images used  
import { useEffect, useState } from "react";
import dish1 from "../assets/dish1.jpg";
import dish2 from "../assets/dish2.jpg";
import dish3 from "../assets/dish3.jpg";
import dish4 from "../assets/dish4.jpg";
import dish5 from "../assets/dish5.jpg";
import dish6 from "../assets/dish6.jpg";
import dish7 from "../assets/dish7.jpg";


const slides = [
  { src: dish6, label: "Eastern Special – Fufu & Vegetable Soup", region: "East" },
  { src: dish3, label: "South‑South Delight – Afang with Swallow", region: "South" },
  { src: dish4, label: "Rich Nigerian Stew – Mixed Proteins", region: "South" },
  { src: dish2, label: "Grilled Fish & Plantain – Coastal Style", region: "South" },
  { src: dish1, label: "Party Jollof & Sides – Across Nigeria", region: "West" },
  { src: dish5, label: "Spicy Meat in Sauce – Northern Flavor", region: "North" },
];

  //regional specialty  area
const regions = [
  {
    name: "Northern Cuisine",
    img: dish6,
    desc: "Tuwo, Miyan Kuka, Suya and more northern classics.",
  },
  {
    name: "Southern Delights",
    img: dish4,
    desc: "Banga, Afang, Edikang Ikong and coastal dishes.",
  },
  {
    name: "Eastern Flavors",
    img: dish7,
    desc: "Ofe Nsala, Oha soup, Abacha and nkwobi.",
  },
  {
    name: "Western Tastes",
    img: dish1, // changed from dish5 to dish7
    desc: "Amala, Efo Riro, Ofada rice and party jollof.",
  },
];


function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // simple auto‑slide every 4 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(id);
  }, []);

  const currentSlide = slides[currentIndex];

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1 className="hero-title">Welcome to Evangel University Restaurant</h1>
          <p className="hero-subtitle">
            Experience authentic Nigerian meals from the North, South, East and
            West—freshly prepared for Evangel University Akaze students and
            staff.
          </p>

          <div className="hero-cta">
            <a href="/menu">
              <button type="button" className="btn-primary">
                Explore Menu
              </button>
            </a>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img
            key={currentSlide.src}
            src={currentSlide.src}
            alt={currentSlide.label}
            className="hero-image"
          />
          <div className="hero-badge">
            {currentSlide.region} • {currentSlide.label}
          </div>
        </div>
      </section>

      <section>
        <h2 className="section-title">Regional Specialties</h2>
        <p className="section-subtitle">
          A quick taste of signature dishes from each part of Nigeria.
        </p>

        <div className="region-grid">
          {regions.map((region) => (
            <article key={region.name} className="region-card">
              <img src={region.img} alt={region.name} />
              <div className="region-card-body">
                <h3 className="region-name">{region.name}</h3>
                <p className="region-desc">{region.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;


