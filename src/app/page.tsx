"use client";

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
  imageUrl: string;
  url: string;
  state: ProduceState;
  purchaser: string;
}

interface ProductListProps {
  products: Product[];
}

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
    <header className={styles.header}>Luis & Ana Garage Sale! 🇪🇸 🗺️</header>

    <h3 className={styles.h3}>
      Luis & Ana are selling some stuff, if you are interested, please contact via WhatsApp.
    </h3>
    <h4 className={styles.h4}>
      Click the product image to see the original items.
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

export default function Home() {
  const typedProducts = products as Product[];

  return (
    <div>
      <Header />

      <ProductList products={typedProducts} />
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

  const goWhatsapp = () => {
    const phoneNumber = "+31626381235";
    const message = `Hey, I'm interested in: ${p.name}!`;
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.product}>
      <a href={p.url} target="_blank" rel="noopener noreferrer">
        <span className={styles.productSpan}>
          <div className={STATE_BADGE_STYLE[p.state]}>
            {STATE_LABEL[p.state]}
          </div>
          <Image
            className={STATE_IMAGE_STYLE[p.state]}
            src={p.imageUrl}
            alt={p.name}
            loading="lazy"
            width={350}
            height={350}
          />
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

      <div
        role="button"
        tabIndex={0}
        onClick={goWhatsapp}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            goWhatsapp();
          }
        }}
        className={styles.boxPrice}
      >
        <span className={styles.price}>{formatPrice(p.price)}</span>
        <div className={styles.box}>
          <Image
            className={styles.icon}
            src="/icon/whatsapp.png"
            alt="WhatsApp"
            width={26}
            height={26}
          />
          <button className={styles.payment}>BUY</button>
        </div>
      </div>
    </div>
  );
};
