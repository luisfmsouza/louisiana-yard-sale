'use client'

import Image from 'next/image'
import styles from './page.module.css'
import products from './data.json'

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


export default function Home() {
    return (
      <div>
        <header className={styles.header}>
          Venta de Cositas de
          <br />
          Milena & Julian
        </header>
        <h3 className={styles.subtitle}>
          Se aceptan pagos por Nequi, Colpatria, Efectivo o Paypal. Solo Bogota.
          <h4>(Algunas fechas de entrega podrian variar por algunos días)</h4>
          <p>
            Al hacer clic/tocar sobre las imagenes encontrás mas información de
            producto
          </p>
        </h3>
        <ProductList products={products} />
      </div>
    );
  }

const ProductList = (props) => {
  return (
    <div className={styles.container}>
      {props.products?.map((p, i) => (
        <ProductCard key={i} product={p} />
      ))}
    </div>
  );
};

const ProductCard = (props) => {
  const p = props.product;
  const formatPrice = (p) =>
    p.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: "0",
    });
  const discount = Math.round(100 - (p.price / p.originalPrice) * 100);

  const goWhatsapp = () =>
    window.open(
      `https://api.whatsapp.com/send?phone=+573006815916&text=Hola%2C%20estoy interesado en%20${p.name}`,
      "_blank"
    );

  return (
    <div className={styles.product}>
      <a href={p.url} target="_blank">
        {p.state == "sold" ? (
          <span className={styles.productSpan}>
            <div className={styles.sold}>VENDIDO</div>

            <Image
              className={styles.productImgFilterSold}
              src={`/${p.imageUrl}`}
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
            <div className={styles.reserved}>RESERVADO</div>
            <img
              className={styles.productImgFilterReserved}
              src={p.imageUrl}
              loading="lazy"
            />
          </span>
        ) : (
          ""
        )}
        {p.state == "notavailable" ? (
          <span className={styles.productSpan}>
            <div className={styles.notavailable}>NO DISPONIBLE</div>
            <img
              className={styles.productImgFilterNotAvailable}
              src={p.imageUrl}
              loading="lazy"
            />
          </span>
        ) : (
          ""
        )}
        {p.state == "available" ? (
          <span className={styles.productSpan}>
            <div className={styles.available}>DISPONIBLE</div>
            <img className={styles.productImg} src={p.imageUrl} loading="lazy" />
          </span>
        ) : (
          ""
        )}
      </a>
      <div className={styles.productDetails}>
        <h3>{p.name}</h3>
        {discount > 0 && <span className={styles.discount}>-{discount}%</span>}
        <ul>
          {p.details.map((detail) => (
            <li>{detail}</li>
          ))}
        </ul>
      </div>
      <div onClick={goWhatsapp} className={styles.boxPrice}>
        <span className={styles.price}>{formatPrice(p.price)}</span>
        <div className={styles.box}>
          <img className={styles.icon} src="./whatsapp-icon.png" />
          <button className={styles.payment}>Comprar</button>
        </div>
      </div>
    </div>
  );
};

