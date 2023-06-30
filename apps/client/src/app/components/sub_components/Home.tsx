// Home.tsx
import React from 'react';
import img from 'apps/client/src/assets/img/p_2.png';
import {useTranslation} from "react-i18next";

function Home() {
  const [t] = useTranslation("global");
  return (
    <>
      <div className="w-full">
        <h1 className="text-2xl my-5 font-bold"> {t("home.h1")}</h1>
        <hr />

        <p className="text-start p-4 my-2 text-lg">
        {t("home.msj")}
        </p>
        <br />
      </div>

      <div className=" p-5 mb-2">
        <img className="w-full lazamania" src={img} alt="Los Pollos Hermanos" />
      </div>

      <div className=" items-center border rounded mt-5 bg-neutral text-neutral-content">
        <div className="items-center rounded-box p-3 grid-flow-col">
          <p>Foot Fast - Los Pollos Hermanos. 🐣</p>
        </div>
      </div>
    </>
  );
}

export default Home;
