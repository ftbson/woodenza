import Link from "next/link";

interface CategoryItem {
  id: string;
  title: string;
  slug: string;
  icon: string;
  image: string;
  isLarge?: boolean;
}

const categories: CategoryItem[] = [
  {
    id: "bois-de-chauffage",
    title: "Leña",
    slug: "/bois-de-chauffage",
    icon: "fa-fire",
    image: "/img/cat-bois.jpg",
    isLarge: true,
  },
  {
    id: "granules",
    title: "Pellets",
    slug: "/granules",
    icon: "fa-seedling",
    image: "/img/cat-granules.jpg",
  },
  {
    id: "briquettes",
    title: "Briquetas de madera",
    slug: "/briquettes",
    icon: "fa-cubes",
    image: "/img/cat-briquettes.jpg",
  },
  {
    id: "bois-presse",
    title: "Leña compactada",
    slug: "/bois-presse",
    icon: "fa-layer-group",
    image: "/img/cat-presse.jpg",
  },
  {
    id: "fours",
    title: "Estufas de leña",
    slug: "/fours",
    icon: "fa-dumpster-fire",
    image: "/img/cat-fours.jpg",
  },
];

export default function Categories() {
  return (
    <section className="categories-section" id="categories">
      <div className="categories-container">
        {/* Encabezado de sección */}
        <div className="categories-header">
          <h2 className="categories-title">Nuestras categorías</h2>
          <p className="categories-subtitle">
            Todo para disfrutar de un hogar cálido, con una calidad impecable.
          </p>
          <div className="categories-line"></div>
        </div>

        {/* Cuadrícula de categorías */}
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href="/boutique"
              className={`category-card ${cat.isLarge ? "large-card" : ""}`}
              style={{ backgroundImage: `url(${cat.image})` }}
            >
              <div className="card-overlay"></div>

              <div className="card-content">
                <div className="card-icon-badge">
                  <i className={`fa-solid ${cat.icon}`}></i>
                </div>
                <h3 className="card-title">{cat.title}</h3>

                <div className="card-btn-hover">
                  <span>Descubrir</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}