import Image from "next/image";
import styles from "./page.module.css";
import products from "./data.json";

enum ProduceState {
  available = "available",
  reserved = "reserved",
  sold = "sold",
  notavailable = "notavailable",
}

interface Product {
  name: string;
  price: number;
  originalPrice: number;
  details: string[];
  imageUrl?: string;
  url: string;
  category: string;
  state: ProduceState;
  purchaser: string;
}

interface ProductListProps {
  products: Product[];
}

const CATEGORY_ORDER = [
  "Furniture",
  "Kitchen & Dining",
  "Small Appliances",
  "Electronics & Smart Home",
  "Home & Cleaning",
  "Wellness & Fitness",
  "Games & Leisure",
];

const groupByCategory = (products: Product[]) => {
  const groups = new Map<string, Product[]>();
  for (const product of products) {
    if (product.state === ProduceState.sold) continue;
    const group = groups.get(product.category) ?? [];
    group.push(product);
    groups.set(product.category, group);
  }
  return CATEGORY_ORDER.map((category) => ({
    category,
    products: groups.get(category) ?? [],
  })).filter((group) => group.products.length > 0);
};

const STATE_LABEL: Record<ProduceState, string> = {
  [ProduceState.available]: "AVAILABLE",
  [ProduceState.reserved]: "RESERVED",
  [ProduceState.sold]: "SOLD",
  [ProduceState.notavailable]: "NOT AVAILABLE",
};

const STATE_BADGE_STYLE: Record<ProduceState, string> = {
  [ProduceState.available]: styles.available,
  [ProduceState.reserved]: styles.reserved,
  [ProduceState.sold]: styles.sold,
  [ProduceState.notavailable]: styles.notavailable,
};

const STATE_IMAGE_STYLE: Record<ProduceState, string> = {
  [ProduceState.available]: styles.productImg,
  [ProduceState.reserved]: styles.productImgFilterReserved,
  [ProduceState.sold]: styles.productImgFilterSold,
  [ProduceState.notavailable]: styles.productImgFilterNotAvailable,
};

const Header = () => (
  <>
    <header className={styles.header}>Luis & Ana Garage Sale! 🇪🇸 ✈️ 🗺️</header>

    <h3 className={styles.h3}>
      Welcome! 👋 We&apos;re relocating and clearing out items from our home in <strong>Rusafa, Valencia</strong>. Everything listed here is available for pickup at our location. Interested in something? Just reach out via WhatsApp!
    </h3>
    <h4 className={styles.h4}>
      📍 <strong>Pickup Location: Rusafa, Valencia</strong> · Click product images to see more details.
    </h4>
  </>
);

const ProductList = ({ products }: ProductListProps) => (
  <div className={styles.container}>
    {products?.map((product, index) => (
      <ProductCard key={index} product={product} />
    ))}
  </div>
);

const CategorySections = ({ products }: ProductListProps) => {
  const soldProducts = products.filter((p) => p.state === ProduceState.sold);

  return (
    <>
      {groupByCategory(products).map(({ category, products: categoryProducts }) => (
        <section key={category}>
          <h2 className={styles.categoryHeading}>{category}</h2>
          <ProductList products={categoryProducts} />
        </section>
      ))}

      {soldProducts.length > 0 && (
        <section>
          <h2 className={styles.categoryHeading}>Sold</h2>
          <ProductList products={soldProducts} />
        </section>
      )}
    </>
  );
};

export default function Home() {
  const typedProducts = products as Product[];

  return (
    <div>
      <Header />

      <CategorySections products={typedProducts} />
    </div>
  );
}

const ProductCard = ({ product }: { product: Product }) => {
  const p = product;
  const formatPrice = (price: number) =>
    price.toLocaleString("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    });
  const discount = Math.round(100 - (p.price / p.originalPrice) * 100);

  const phoneNumber = "+5519992166464";
  const message = `Hey, I'm interested in: ${p.name}!`;
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  return (
    <div className={styles.product}>
      <a href={p.url} target="_blank" rel="noopener noreferrer">
        <span className={styles.productSpan}>
          <div className={STATE_BADGE_STYLE[p.state]}>
            {STATE_LABEL[p.state]}
          </div>
          {p.imageUrl && (
            <Image
              className={STATE_IMAGE_STYLE[p.state]}
              src={p.imageUrl}
              alt={p.name}
              loading="lazy"
              width={350}
              height={350}
            />
          )}
        </span>
      </a>

      <div className={styles.productDetails}>
        <h3>{p.name}</h3>
        {discount > 0 && <span className={styles.discount}>-{discount}%</span>}
        <ul>
          {p.details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.boxPrice}
        aria-label={`Buy ${p.name} via WhatsApp for ${formatPrice(p.price)}`}
      >
        <span className={styles.price}>{formatPrice(p.price)}</span>
        <div className={styles.box}>
          <Image
            className={styles.icon}
            src="/icon/whatsapp.png"
            alt=""
            width={26}
            height={26}
            aria-hidden
          />
          <span className={styles.payment}>BUY</span>
        </div>
      </a>
    </div>
  );
};
