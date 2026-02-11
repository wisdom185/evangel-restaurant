import { Link } from "react-router-dom";
import { menuSections } from "../data/menuData";

function Menu() {
  return (
    <div>
      <h2 className="section-title">Our Nigerian Menu</h2>
      <p className="section-subtitle">
        Choose a region to explore dishes prepared for Evangel University
        students and staff.
      </p>

      <div className="region-grid">
        {menuSections.map((section) => (
          <Link
            key={section.id}
            to={`/menu/${section.id}`}
            style={{ textDecoration: "none" }}
          >
            <article className="region-card">
              <div className="region-card-body">
                <h3 className="region-name">{section.region}</h3>
                <p className="region-desc">{section.highlight}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Menu;
