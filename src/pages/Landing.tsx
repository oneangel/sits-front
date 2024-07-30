import Header from "@/components/landing/Header";
import img1 from "@/assets/images/img1landing.png";
import shield from "@/assets/images/shield.png";
import deposit from "@/assets/images/deposit.png";
import money from "@/assets/images/money.png";
import teamsits from "@/assets/images/teamsits.png";
import l2 from "@/assets/images/l2.png";
import sits from "@/assets/images/sits.png";
import { Button } from "@/components/ui/button";
import Card from "@/components/landing/Card";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <>
      {/* nav bar */}
      <Header />
      {/* Section 1 */}
      <div className="bg-gradient-to-br from-yellow-400 to-amber-500 max-w-screen-2xl w-full h-[650px] mx-auto mt-9 rounded-t-[50px] rounded-bl-[50px] rounded-br-[320px] flex-row flex">
        <div className="w-1/3 my-auto pl-14">
          <h2 className="text-6xl font-bold text-white w-[540px]">
            Fuerza sindical en Norteamérica
          </h2>
          <p className="text-white mt-9 w-[500px]">
            Somos un sindicato nacional que brinda herramientas de calidad y
            beneficios tangibles para trabajadores y sus familias.
          </p>
          <div className="flex flex-row gap-5 mt-10">
            <Button className="h-12 bg-red-400 w-28">Comenzar</Button>
            <Button className="h-12 bg-transparent border border-white w-28">
              Registrarse
            </Button>
          </div>
        </div>
        <div className="flex w-2/3">
          <img src={img1} alt="" className="mx-auto my-auto h-[550px]" />
        </div>
      </div>

      {/* Section 2 */}
      <div className="max-w-screen-xl mx-auto h-[500px] mt-20 flex flex-row">
        {/* Titulo */}
        <div className="w-1/3">
          <h3 className="w-[350px] text-5xl font-bold">
            Fuerza sindical en Norteamérica
          </h3>
          <p className="w-[330px] text-lg mt-3 text-[#626479]">
            Nuestro sindicato ofrece beneficios integrales y económicos, como
            apoyo laboral, acceso a vivienda, asistencia médica y representación
            legal gratuita.
          </p>
        </div>
        {/* Cards */}
        <div className="grid w-2/3 grid-cols-3 gap-9">
          <Card
            imgSrc={shield}
            altText="Escudo"
            text="Nuestro sindicato brinda apoyo integral"
          />
          <Card
            imgSrc={deposit}
            altText="Depósito"
            text="Caja de Ahorro flexible y accesible"
            className="mt-12"
          />
          <Card
            imgSrc={money}
            altText="Dinero"
            text="Nuestro sindicato brinda apoyo integral"
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className="w-full h-[570px] bg-[#FFF7EE]">
        <div className="grid h-full max-w-screen-xl grid-cols-3 mx-auto">
          <div className="flex items-center justify-center w-full col-span-1">
            <img src={teamsits} alt="img" className="" />
          </div>
          <div className="flex flex-col items-center justify-center col-span-2">
            <h3 className="text-5xl font-bold w-[560px]">
              Nuestra <span className="text-yellow-400">Visión</span> y Nuestra
              <span className="text-[#FF8906]"> Misión</span>
            </h3>
            <p className="w-[560px] text-lg text-[#626479] mt-7">
              Nuestra visión es ser un sindicato nacional reconocido por apoyar
              el bienestar laboral en México y el T-MEC. Nuestra misión es
              ofrecer beneficios económicos significativos y apoyar a las
              empresas en salud, seguridad, y aspectos jurídicos y familiares.
            </p>
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div className="w-full max-w-screen-xl bg-gradient-to-br from-yellow-400 to-amber-500 h-[370px] mx-auto rounded-[48px] mt-20 grid grid-cols-3">
        <div className="flex col-span-1 mx-auto my-auto">
          <img src={l2} alt="" className="h-[247px]" />
        </div>
        <div className="col-span-2 my-auto text-white mr-52">
          <h2 className="text-5xl font-bold">
            Asesoría gratuita para Plan de Pensión y Modalidad 40
          </h2>
          <p className="text-lg mt-7">
            Nuestro Sindicato ofrece asesoría profesional para que los
            trabajadores obtengan la mejor pensión posible, manteniendo su
            calidad de vida, ya sea con su salario promedio o mediante la
            Modalidad 40.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-[#0F0E17] h-[400px] mt-20 grid grid-cols-4 px-20 py-14">
        <div className="flex flex-col justify-between col-span-1">
          <img src={sits} alt="" className="size-20" />
          <p className="text-white">© SITS todos los derechos reservados</p>
        </div>
        <div className="flex flex-col col-span-1 gap-1">
          <h3 className="text-lg font-semibold text-white">Plataforma</h3>
          <a href="" className="text-base text-white">
            Inicio
          </a>
          <a href="" className="text-base text-white">
            Novedades
          </a>
          <a href="" className="text-base text-white">
            Nosotros
          </a>
        </div>
        <div className="flex flex-col col-span-1 gap-1">
          <h3 className="text-lg font-semibold text-white">Ayuda</h3>
          <a href="" className="text-base text-white">
            Preguntas frecuentes
          </a>
        </div>
        <div className="flex flex-col col-span-1 gap-1">
          <h3 className="text-lg font-semibold text-white">Contacto</h3>
          <a href="" className="text-base text-white">
            Tel. (618)-300-8913
          </a>
          <a href="" className="w-48 text-base text-white">
            Calle Hilario Moreno #404 Col. Azteca 
          </a>
        </div>
      </div>
    </>
  );
}

export default Landing;
