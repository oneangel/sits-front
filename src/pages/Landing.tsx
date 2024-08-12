import Header from "@/components/landing/Header";
import img1 from "@/assets/images/img1landing.png";
import teamsits from "@/assets/images/teamsits.png";
import dashboard from "@/assets/images/dashboard.png";
import l2 from "@/assets/images/l2.png";
import { Button } from "@/components/ui/button";
import { ContainerScroll } from "../components/ui/container-scroll-animation.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Footer from "@/components/landing/Footer.tsx";
import { beneficios } from "../const/benefits.ts";
import ExpandableCardDemo from "@/components/landing/ExpandibleCard.tsx";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  return (
    <>
      {/* nav bar */}
      <Header />
      {/* Section 1 */}
      <div
        id="home"
        className=" bg-gradient-to-br from-yellow-400 to-amber-500 max-w-screen-2xl w-full h-[650px] mx-auto md:mt-32 md:rounded-t-[50px] md:rounded-bl-[50px] md:rounded-br-[320px] flex-row flex"
      >
        <div className="mx-auto my-auto xl:w-1/3 pl-14">
          <h2 className="text-4xl font-bold text-white md:text-6xl">
            Fuerza sindical en Norteamérica
          </h2>
          <p className="text-white mt-9 ">
            Somos un sindicato nacional que brinda herramientas de calidad y
            beneficios tangibles para trabajadores y sus familias.
          </p>
          <div className="flex flex-row gap-5 mt-10">
            <Button onClick={() => navigate("/login")} className="h-12 text-white transition bg-red-400 w-28 hover:scale-105 hover:bg-red-500">Comenzar</Button>
            <Button onClick={() => navigate("/register")} className="h-12 transition bg-transparent border border-white hover:bg-white w-28 hover:scale-105">
              Registrarse
            </Button>
          </div>
        </div>
        <div className="flex w-2/3">
          <img
            src={img1}
            alt=""
            className="mx-auto my-auto h-[550px] hidden xl:block"
          />
        </div>
      </div>

      {/* Section 2 */}
      <div
        id="news"
        className="#news max-w-screen-xl mx-auto mt-20 lg:flex lg:flex-row mb-20"
      >
        {/* Titulo */}
        <div className="px-10 mb-10 lg:w-1/3">
          <h3 className="text-5xl font-bold"><span className="text-yellow-400">Valores</span> y Alcances</h3>
          <p className="text-lg mt-3 text-[#626479]">
            Nuestro sindicato ofrece beneficios integrales y económicos, como
            apoyo laboral, acceso a vivienda, asistencia médica y representación
            legal gratuita.
          </p>
        </div>
        {/* Carrusel de Beneficios */}
        <div className="p-16 mx-auto my-auto md:p-20 lg:p-0">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-3xl"
          >
            <CarouselContent>
              {beneficios.map((beneficio, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="h-[200px]">
                      <CardHeader>
                        <CardTitle
                          className={`truncate ${
                            index >= beneficios.length - 4
                              ? ""
                              : "text-yellow-400"
                          }`}
                        >
                          {beneficio.titulo}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex items-center justify-center h-full -mt-5 overflow-hidden">
                        <p className="overflow-y-auto text-lg">
                          {beneficio.descripcion}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* Section 3 */}
      <div id="us" className="#us w-full py-20 bg-[#FFF7EE]">
        <div className="grid h-full max-w-screen-xl mx-auto lg:grid-cols-3">
          <div className="flex items-center justify-center w-full col-span-1 mx-20 lg:mx-0">
            <img src={teamsits} alt="img" className="" />
          </div>
          <div className="flex flex-col items-center justify-center col-span-2 mx-20">
            <h3 className="text-3xl font-bold md:text-5xl">
              Nuestra <span className="text-yellow-400">Visión</span> y Nuestra
              <span className="text-[#FF8906]"> Misión</span>
            </h3>
            <p className="text-base md:text-lg text-[#626479] mt-7">
              Nuestra visión es ser un sindicato nacional reconocido por apoyar
              el bienestar laboral en México y el T-MEC. Nuestra misión es
              ofrecer beneficios económicos significativos y apoyar a las
              empresas en salud, seguridad, y aspectos jurídicos y familiares.
            </p>
          </div>
        </div>
      </div>

      {/* section 4 */}
      <div className="mx-10 mt-20 md:mx-20">
        <h3 className="my-10 text-3xl font-bold text-center md:text-5xl">
          Nuestros <span className="text-yellow-400">Beneficios</span>
        </h3>
        <ExpandableCardDemo />
      </div>

      {/* Section 5 */}
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Impulsa tu futuro <br />
                <span className="text-4xl md:text-[5rem] font-bold mt-1 leading-none">
                  Únete a nuestro sindicato
                </span>
              </h1>
            </>
          }
        >
          <img
            src={dashboard}
            alt="hero"
            style={{
              maxWidth: "100%", // Para mantener reactividad
              borderRadius: "16px", // Estilo redondeo
              objectFit: "cover", // Recorta la imagen para llenar el contenedor
              width: "1400",
              height: "720", // Mantiene la proporción
            }}
            draggable={false}
          />
        </ContainerScroll>
      </div>

      {/* Section 6 */}
      <div className="max-w-screen-xl bg-gradient-to-br from-yellow-400 to-amber-500 py-20 mx-auto rounded-[48px] mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1 mx-4 my-auto text-white md:col-span-2 md:mx-20">
          <h2 className="text-3xl font-bold md:text-5xl">
            Asesoría gratuita para Plan de Pensión y Modalidad 40
          </h2>
          <p className="mt-4 text-base md:text-lg md:mt-7">
            Nuestro Sindicato ofrece asesoría profesional para que los
            trabajadores obtengan la mejor pensión posible, manteniendo su
            calidad de vida, ya sea con su salario promedio o mediante la
            Modalidad 40.
          </p>
        </div>
        <div className="flex items-center justify-center col-span-1">
          <img
            src={l2}
            alt="Descripción de la imagen"
            className="h-auto max-w-full"
          />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Landing;
