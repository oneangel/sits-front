"use client";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useNavigate } from "react-router-dom";

export default function ExpandableCardDemo() {
  const navigate = useNavigate();

  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 w-full h-full bg-black/20"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="absolute flex items-center justify-center w-6 h-6 bg-white rounded-full top-2 right-2 lg:hidden"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  src={active.src}
                  alt={active.title}
                  className="object-cover object-top w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg"
                />
              </motion.div>

              <div>
                <div className="flex items-start justify-between p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    className="px-4 py-3 text-sm font-bold text-white bg-yellow-400 rounded-full"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="relative px-4 pt-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="grid grid-cols-1 gap-4 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="flex flex-col justify-between p-8 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-200 rounded-xl"
          >
            <div className="flex flex-col gap-4 md:flex-row">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  src={card.src}
                  alt={card.title}
                  className="object-cover object-top w-40 h-40 rounded-lg md:h-14 md:w-14"
                />
              </motion.div>
              <div className="flex-1">
                {" "}
                {/* Add this flex-1 class to take up remaining space */}
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-left text-neutral-800 dark:text-neutral-200 md:text-left"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-left text-neutral-600 dark:text-neutral-400 md:text-left"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <div className="flex justify-end mt-4 md:mt-0">
              <motion.button
                layoutId={`button-${card.title}-${id}`}
                className="w-20 px-4 py-2 text-sm font-bold text-black bg-gray-100 rounded-full hover:bg-primary hover:text-white"
              >
                {card.ctaText}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Económico",
    title: "Beneficio Económico",
    src: "https://img.freepik.com/vector-gratis/crecimiento-economico_24877-49231.jpg",
    ctaText: "Ver",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          La Caja de Ahorro Mutualista con más flexibilidad en México y adaptada
          a la necesidad de cada Empresa afiliada; con beneficio económico para
          todos los trabajadores afiliados, ganando intereses por los préstamos
          otorgados con sus propios recursos y con tres tipos de préstamos para
          todos los trabajadores. Sin revisar buró y sin aval, de acuerdo a la
          capacidad de cada trabajador y de acuerdo a la ley; sin costo de
          impuestos y con transparencia en la información y con acceso a estados
          de Cuenta de Ahorro y Préstamos en una terminal pública con seguridad
          en el acceso.
        </p>
      );
    },
  },
  {
    description: "Jurídico",
    title: "Esquema Jurídico",
    src: "https://enfoque-estrategico.com/wp-content/uploads/2022/12/marco-juridico-mexico.jpeg",
    ctaText: "Ver",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Todo afiliado a nuestro Sindicato tiene el derecho a ser representado
          en problemas Mercantiles, Civiles, Penal y Familiar y sin costo por
          Asesoria legal, gracias a nuestro equipo de abogados en todas las
          ramas del derecho.
        </p>
      );
    },
  },

  {
    description: "Salud",
    title: "Salud",
    src: "https://greentology.life/wp-content/uploads/2024/02/cuidar-la-salud.jpeg",
    ctaText: "Ver",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Contamos con convenios de colaboración con Empresas dedicadas a todo
          tipo de problemas de Salud con descuentos preferenciales.
        </p>
      );
    },
  },
  {
    description: "Familiar",
    title: "Familiar",
    src: "https://img.freepik.com/free-vector/cartoon-pride-day-family-collection_23-2148927316.jpg",
    ctaText: "ver",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Apoyamos a todos nuestros afiliados con asesoría de Psicólogos y
          abogados en problemas familiares, drogadicción, feminicidio, violencia
          familiar y apoyo económico mediante subsidio para enfermedades
          crónicas.
        </p>
      );
    },
  },
  {
    description: "Seguro de Vida",
    title: "Seguro de Vida",
    src: "https://olelife.com/wp-content/uploads/2021/11/Ole-Life-_-Seguro-de-vida-1200x675.jpg",
    ctaText: "Ver",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          De acuerdo a cada uno de nuestros contratos laborales procuramos
          establecer un seguro de vida de acuerdo a la cuota sindical, siendo
          este seguro de vida solventado de manera directa por nuestro
          sindicato, en donde la cobertura se define con respecto a la
          negociación de afiliados.
        </p>
      );
    },
  },
  {
    description: "Directorio de Descuentos.",
    title: "Descuentos",
    src: "https://cdn.shopify.com/s/files/1/0229/0839/files/Blog_Banner.jpg?2814",
    ctaText: "Ver",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          En cada Estado y Municipio nos comprometemos a establecer convenios
          diferenciales y reales con todo tipo de consumo inmediato; y lo puede
          hacer valer nuestros afiliados presentando la credencial del
          Sindicato, cuyo costo es negociada con cada Empresa al momento de la
          negociación del contrato colectivo.
        </p>
      );
    },
  },
  {
    description: "Becas Educativas",
    title: "Becas",
    src: "https://s.yimg.com/ny/api/res/1.2/BLyCSLYszu3OpxhkbcLpAA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQyNw--/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-images/2019-10/adfac2b0-f774-11e9-97bf-9bd32ebc95bd",
    ctaText: "Ver",
    ctaLink: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    content: () => {
      return (
        <p>
          Nuestro Sindicato esta comprometido con la Educación en todos los
          niveles, y se compromete con las Empresas afiliadas a destinar un
          pordcentaje de la cuota sindical para establecer un programa de becas
          de acuerdo a la situación económica y calificaciones de los hijos de
          nuestros trabajadores afiliados.
        </p>
      );
    },
  },
  {
    description: "Convenios Estrategicos",
    title: "Convenios Estrategicos",
    src: "https://images.ctfassets.net/q8ats8vjtyuf/3NpYhqSN0nDUQZfaQmtdDz/abcd21ba62f1d4cd628d19cfc741cf97/alianzas-estrategicas-empresas.jpg",
    ctaText: "Ver",
    ctaLink: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    content: () => {
      return (
        <p>
          Nuestro Sindicato consciente en ser la mejor opción de la sindicación
          en México, Estados Unidos y Canada; se compromete a establecer
          convenios estratégicos, que generen una mejor calidad de vida para los
          trabajadores y sus familias en el sector Educativo, Salud, Recreativo
          y Cultural; de acuerdo a la necesidad de cada Estado y Municipio.
        </p>
      );
    },
  },
  {
    description: "Asesoría de Vivienda",
    title: "Asesoría de Vivienda",
    src: "https://img1.wsimg.com/isteam/ip/6a53e45a-bb45-4815-9966-560df901960e/1488233817-4089.jpg",
    ctaText: "Ver",
    ctaLink: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    content: () => {
      return (
        <p>
          Apoyamos a nuestros afiliados con asesoría y cálculo de puntos
          disponibles para vivienda, y en la tramitación de su crédito; así como
          en los trámites de recuperación de aportaciones de vivienda y créditos
          para ampliación y mejora de vivienda; asegurando que haya continuidad
          en las aportaciones del IMSS para tener acceso a estos beneficios.
        </p>
      );
    },
  },
  {
    description: "Asesoría gratuita",
    title: "Modalidad 40",
    src: "https://cdn-3.expansion.mx/dims4/default/a6a3d5e/2147483647/strip/true/crop/1800x942+0+0/resize/1800x942!/format/webp/quality/80/?url=https%3A%2F%2Fcdn-3.expansion.mx%2Ff3%2F4a%2Fe0fe4c6248c0bfe218afa443657a%2Fmodalidad-40-imss-2024.jpg",
    ctaText: "Ver",
    ctaLink: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    content: () => {
      return (
        <p>
          Conscientes de que los trabajadores han trabajado 42 años o más,
          algunos con un salario promedio bajo y requieren continuar con su
          calidad de vida familiar; nuestro Sindicato ofrece asesoría
          profesional para que nuestros afiliados tengan la mejor pensión
          posible con su salario promedio o con financiamiento de la modalidad
          40
        </p>
      );
    },
  },
  {
    description: "Ayuda económica",
    title: "Gastos Funerarios",
    src: "https://bruno.com.mx/wp-content/uploads/2021/05/morir-cuesta-caro-01.png",
    ctaText: "Ver",
    ctaLink: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    content: () => {
      return (
        <p>
          Nuestro Sindicato esta consciente de las dificultades por las que pasa
          nuestros afiliados en caso de fallecimiento o Incapacidad Total
          Permanente; así como el probable fallecimiento de su conyuge o pareja
          en concubinato y los hijos que dependen de nuestro afiliado, es por
          esto que ofrece una ayuda económica para este tipo de contingencia con
          entrega inmediata de la la misma mediante una cuota mensual baja;
          gracias a que la ayuda no es a través de ninguna empresa
          especializada, sino a través de esta aportación simbólica; misma que
          puede ser cubierta con la misma cuota sindical de cuerdo al contrato
          colectivo y número de afiliados.
        </p>
      );
    },
  },
];
