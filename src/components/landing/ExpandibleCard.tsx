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
    title: "Apoyo en el desarrollo laboral y talento humano",
    src: "https://img.freepik.com/vector-gratis/crecimiento-economico_24877-49231.jpg",
    ctaText: "Ver",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          En nuestra organización, nos comprometemos a apoyar el crecimiento
          profesional de nuestros afiliados a través de convenios estratégicos
          con instituciones públicas y privadas. Ofrecemos asesoramiento
          personalizado, capacitaciones especializadas y oportunidades de
          certificación para potenciar el desarrollo laboral y el talento humano
          de nuestra comunidad.
        </p>
      );
    },
  },
  {
    description: "Jurídico",
    title: "Apoyo jurídico Laboral, Familiar, Mercantil y Penal.",
    src: "https://enfoque-estrategico.com/wp-content/uploads/2022/12/marco-juridico-mexico.jpeg",
    ctaText: "Ver",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Nuestros afiliados cuentan con acceso a asesoría jurídica gratuita* en
          diversas áreas del derecho, incluyendo asuntos laborales, familiares,
          mercantiles y penales. Nuestro equipo de abogados especializados está
          comprometido a brindar orientación y apoyo legal para ayudar a
          nuestros miembros a navegar por desafíos legales y proteger sus
          derechos. *Aplican algunas restricciones.
        </p>
      );
    },
  },

  {
    description: "(Descuento con agencias funerarias)",
    title: "Apoyo en servicio funerario.",
    src: "https://greentology.life/wp-content/uploads/2024/02/cuidar-la-salud.jpeg",
    ctaText: "Ver",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Apoyo económico cubierto por el SITS, depende de la aportación mensual
          y el número de agremiados. Apoyo para: Agremiado, Cónyuge, Hijos y
          Padres del Agremiado.
        </p>
      );
    },
  },
  {
    description: "Familiar",
    title: "Apoyo en seguro de autos.",
    src: "https://img.freepik.com/free-vector/cartoon-pride-day-family-collection_23-2148927316.jpg",
    ctaText: "ver",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Servicio cubierto por aseguradoras en convenio con el SITS, obteniendo
          un 30% de descuento en el trámite total.
        </p>
      );
    },
  },
  {
    description: "Seguro de Vida",
    title: "Apoyo en Educación.",
    src: "https://olelife.com/wp-content/uploads/2021/11/Ole-Life-_-Seguro-de-vida-1200x675.jpg",
    ctaText: "Ver",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Servicio cubierto por convenio con el SITS, obteniendo un 30% de
          descuento con instituciones. • Preparatoria. • Licenciatura. •
          Maestría. • Doctorado.
        </p>
      );
    },
  },
  {
    description: "Directorio de Descuentos.",
    title: "Programa de Nutrición y Psicología.",
    src: "https://cdn.shopify.com/s/files/1/0229/0839/files/Blog_Banner.jpg?2814",
    ctaText: "Ver",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Servicio cubierto por el SITS, programa que brinda asesoría y revisión
          por especialistas en el tema, con la finalidad de ayudar a cada
          compañero que así lo necesite.
        </p>
      );
    },
  },
  {
    description: "Becas Educativas",
    title: "Programa de Asistencia Médica.",
    src: "https://s.yimg.com/ny/api/res/1.2/BLyCSLYszu3OpxhkbcLpAA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQyNw--/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-images/2019-10/adfac2b0-f774-11e9-97bf-9bd32ebc95bd",
    ctaText: "Ver",
    ctaLink: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    content: () => {
      return (
        <p>
          Servicio cubierto por el SITS, programa que brinda revisión, consulta
          médica por especialistas, con la finalidad de ayudar a cada compañero
          que así lo necesite.
        </p>
      );
    },
  },
  {
    description: "Convenios Estrategicos",
    title: "Apoyo en Tramite de Licencias de Conducción.",
    src: "https://images.ctfassets.net/q8ats8vjtyuf/3NpYhqSN0nDUQZfaQmtdDz/abcd21ba62f1d4cd628d19cfc741cf97/alianzas-estrategicas-empresas.jpg",
    ctaText: "Ver",
    ctaLink: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    content: () => {
      return (
        <p>
          Servicio cubierto por Dependencias e Instituciones Públicas y Privadas
          de acuerdo con el convenio firmado por el SITS. LICENCIAS FEDERALES
          20% (Descuento en Tramite Total) ASESORIA. CURSO. APTO MEDICO TRAMITE
          ANTE DEPENDENCIA.
        </p>
      );
    },
  },
  {
    description: "Asesoría de Vivienda",
    title: "Apoyo en Medicamento.",
    src: "https://img1.wsimg.com/isteam/ip/6a53e45a-bb45-4815-9966-560df901960e/1488233817-4089.jpg",
    ctaText: "Ver",
    ctaLink: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    content: () => {
      return (
        <p>
          Descuento en medicamento Genérico, Marca y Similar. *aplica
          restricciones
        </p>
      );
    },
  },
  {
    description: "Asesoría gratuita",
    title: " Apoyo en boletos de autobús.",
    src: "https://cdn-3.expansion.mx/dims4/default/a6a3d5e/2147483647/strip/true/crop/1800x942+0+0/resize/1800x942!/format/webp/quality/80/?url=https%3A%2F%2Fcdn-3.expansion.mx%2Ff3%2F4a%2Fe0fe4c6248c0bfe218afa443657a%2Fmodalidad-40-imss-2024.jpg",
    ctaText: "Ver",
    ctaLink: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    content: () => {
      return (
        <p>
          Descuento en la compra de boletos de autobús. *aplica restricciones
        </p>
      );
    },
  },
  {
    description: "Ayuda económica",
    title: "Apoyo en Boiler Sola",
    src: "https://bruno.com.mx/wp-content/uploads/2021/05/morir-cuesta-caro-01.png",
    ctaText: "Ver",
    ctaLink: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    content: () => {
      return (
        <p>
          Descuento en la compra de boiler solar. • 10 tubos. • 15 tubos. • 20
          tubos. *aplica restricciones
        </p>
      );
    },
  },
  {
    description: "Ayuda económica",
    title: "Apoyo en Escuela de manejo.",
    src: "https://bruno.com.mx/wp-content/uploads/2021/05/morir-cuesta-caro-01.png",
    ctaText: "Ver",
    ctaLink: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    content: () => {
      return (
        <p>
          Servicio brindado por escuelas de manejo en autotransporte federal.
          20% descuento en el servicio total.
        </p>
      );
    },
  },
  {
    description: "",
    title: "Programa de seguro de Vida",
    src: "https://bruno.com.mx/wp-content/uploads/2021/05/morir-cuesta-caro-01.png",
    ctaText: "Ver",
    ctaLink: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    content: () => {
      return (
        <p>
          Servicio brindado por aseguradoras. *Aportación extra a la cuota
          mensual. Depende: 1.- Monto asegurado. 2.- Edad del agremiado.
          Contrato elaborado entre agremiado y aseguradora.
        </p>
      );
    },
  },

  {
    description: "",
    title: "Asesoría para tramitar un plan de pensión y modalidad 40",
    src: "https://bruno.com.mx/wp-content/uploads/2021/05/morir-cuesta-caro-01.png",
    ctaText: "Ver",
    ctaLink: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    content: () => {
      return (
        <p>
          Nuestro sindicato ofrece asesoría profesional para que nuestros
          afiliados tengan la mejor pensión posible con su salario promedio o
          con financiamiento de la modalidad 40.
        </p>
      );
    },
  },

  {
    description: "",
    title: "Asesoría para vivienda",
    src: "https://bruno.com.mx/wp-content/uploads/2021/05/morir-cuesta-caro-01.png",
    ctaText: "Ver",
    ctaLink: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    content: () => {
      return (
        <p>
          Apoyamos a nuestros afiliados con asesoría y cálculo de puntos
          disponibles para vivienda, y en la tramitación de crédito; así como en
          los tramites de recuperación de aportaciones de vivienda y créditos
          para ampliación y mejora de vivienda; asegurando que haya continuidad
          en las aportaciones del IMSS para tener acceso a estos beneficios.
        </p>
      );
    },
  },

  {
    description: "",
    title: "Apoyo en Servicio Automotriz.",
    src: "https://bruno.com.mx/wp-content/uploads/2021/05/morir-cuesta-caro-01.png",
    ctaText: "Ver",
    ctaLink: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    content: () => {
      return (
        <p>
          Servicio mecánico por talleres certificados y establecidos legalmente.
          Convenio de descuento firmado por el SITS.
        </p>
      );
    },
  },
];
