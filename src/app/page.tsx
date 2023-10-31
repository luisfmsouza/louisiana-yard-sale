"use client";

import Image from "next/image";
import styles from "./page.module.css";
import products from "./data.json";

// export default function Home() {
//   return (
//     <main className={styles.main}>
//       <div className={styles.description}>
//         <p>
//           Get started by editing&nbsp;
//           <code className={styles.code}>src/app/page.tsx</code>
//         </p>
//         <div>
//           <a
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{' '}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className={styles.vercelLogo}
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className={styles.center}>
//         <Image
//           className={styles.logo}
//           src="/next.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={37}
//           priority
//         />
//       </div>

//       <div className={styles.grid}>
//         <a
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2>
//             Docs <span>-&gt;</span>
//           </h2>
//           <p>Find in-depth information about Next.js features and API.</p>
//         </a>

//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2>
//             Learn <span>-&gt;</span>
//           </h2>
//           <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2>
//             Templates <span>-&gt;</span>
//           </h2>
//           <p>Explore the Next.js 13 playground.</p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2>
//             Deploy <span>-&gt;</span>
//           </h2>
//           <p>
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   )
// }

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

const Header = () => (
  <>
    <header className={styles.header}>Luis & Ana Garage Sale! 🇳🇱 ✈️ 🗺️</header>

    <h3 className={styles.h3}>
      Raki is selling some of his humans stuff, if you are interested in
      something, please contact via WhatsApp.
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
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    return window.open(url, "_blank");
  };

  return (
    <div className={styles.product}>
      <a href={p.url} target="_blank">
        {p.state == "sold" ? (
          <span className={styles.productSpan}>
            <div className={styles.sold}>SOLD</div>

            <Image
              className={styles.productImgFilterSold}
              src={p.imageUrl}
              alt={p.name}
              loading="lazy"
              width={350}
              height={350}
            />
          </span>
        ) : (
          ""
        )}
        {p.state == "reserved" ? (
          <span className={styles.productSpan}>
            <div className={styles.reserved}>RESERVED</div>
            <Image
              className={styles.productImgFilterReserved}
              src={p.imageUrl}
              alt={p.name}
              loading="lazy"
              width={350}
              height={350}
            />
          </span>
        ) : (
          ""
        )}
        {p.state == "notavailable" ? (
          <span className={styles.productSpan}>
            <div className={styles.notavailable}>NOT AVAILABLE</div>
            <Image
              className={styles.productImgFilterNotAvailable}
              src={p.imageUrl}
              alt={p.name}
              loading="lazy"
              width={350}
              height={350}
            />
          </span>
        ) : (
          ""
        )}
        {p.state == "available" ? (
          <span className={styles.productSpan}>
            <div className={styles.available}>AVAILABLE</div>
            <Image
              className={styles.productImg}
              src={p.imageUrl}
              alt={p.name}
              loading="lazy"
              width={350}
              height={350}
            />
          </span>
        ) : (
          ""
        )}
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

      <div onClick={goWhatsapp} className={styles.boxPrice}>
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
