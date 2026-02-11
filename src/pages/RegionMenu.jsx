import { useParams, Link } from "react-router-dom";
import { menuSections } from "../data/menuData";

import dish7 from "../assets/dish7.jpg";
import dish8 from "../assets/dish8.jpeg";
import dish9 from "../assets/dish9.jpg";
import dish10 from "../assets/dish10.jpg";
import dish11 from "../assets/dish11.jpg";
import dish12 from "../assets/dish12.jpg";
import dish13 from "../assets/dish13.jpg";
import dish14 from "../assets/dish14.jpg";
import dish15 from "../assets/dish15.jpg";
import dish16 from "../assets/dish16.jpg";
import dish17 from "../assets/dish17.jpg";
import dish18 from "../assets/dish18.jpg";
import dish19 from "../assets/dish19.jpg";
import dish20 from "../assets/dish20.jpg";
import dish21 from "../assets/dish21.jpg";
import dish22 from "../assets/dish22.jpg";
import dish23 from "../assets/dish23.jpg";
import dish24 from "../assets/dish24.jpg";
import dish25 from "../assets/dish25.jpg";
import dish26 from "../assets/dish26.jpg";
import dish27 from "../assets/dish27.jpg";
import dish28 from "../assets/dish28.jpg";
import dish29 from "../assets/dish29.jpg";
import dish30 from "../assets/dish30.jpg";
import dish31 from "../assets/dish31.jpg";
import dish32 from "../assets/dish32.jpg";
import dish33 from "../assets/dish33.jpg";
import dish34 from "../assets/dish34.jpg";
import dish35 from "../assets/dish35.jpg";
import dish36 from "../assets/dish36.jpg";
import dish37 from "../assets/dish37.jpg";
import dish38 from "../assets/dish38.jpg";

const dishImages = {
  // North
  "tuwo-kuka": dish26,
  "suya-fura": dish8,
  "masa-taushe": dish9,
  "dambu-nama": dish10,
  "balangu-yaji": dish11,
  danwake: dish28,
  kilishi: dish27,
  "palm-oil-rice": dish35,

  // South
  "jollof-plantain": dish12,
  "banga-starch": dish13,
  "amala-ewedu-south": dish14,
  "yam-garden-egg": dish15,
  "beans-plantain": dish16,
  "edikang-ikong": dish29,
  "afang-fufu": dish30,
  ekpang: dish36,

  // East
  "nsala-yam": dish17,
  abacha: dish7,
  "oha-fufu": dish18,
  nkwobi: dish19,
  ugba: dish20,
  "agbugbu-mmanu": dish33,
  "ji-mmiri-oku": dish34,
  "utara-na-ogbiri": dish37,

  // West
  "tuwo-efo-egusi": dish25,
  "iyan-egusi": dish24,
  "fried-yam-pepper": dish23,
  ofada: dish22,
  "amala-gbegiri": dish21,
  "gbegiri-soup": dish32,
  "efo-riro-eba": dish31,
  adalu: dish38,
};

function RegionMenu({ onAddToCart }) {
  const { regionId } = useParams();

  const section = menuSections.find((s) => s.id === regionId);

  if (!section) {
    return (
      <div>
        <p>Region not found.</p>
        <Link to="/menu" style={{ color: "#2f6b2f" }}>
          ← Back to menu
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/menu" style={{ color: "#2f6b2f", fontSize: "0.9rem" }}>
        ← Back to all regions
      </Link>

      <h2 className="section-title">{section.region} Dishes</h2>
      <p className="section-subtitle">{section.highlight}</p>

      <div className="region-grid-large">
        {section.dishes.map((dish) => {
          const imgSrc = dishImages[dish.id];

          return (
            <article key={dish.id} className="region-card">
              {imgSrc && (
                <img
                  src={imgSrc}
                  alt={dish.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              )}
              <div className="region-card-body">
                <h3 className="region-name">{dish.name}</h3>
                <p className="region-desc">
                  Approx. price: ₦{dish.price.toLocaleString()}
                </p>
                <button
                  type="button"
                  className="btn-primary"
                  style={{ marginTop: "8px" }}
                  onClick={() => onAddToCart(dish)}
                >
                  Add to Cart
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default RegionMenu;


  