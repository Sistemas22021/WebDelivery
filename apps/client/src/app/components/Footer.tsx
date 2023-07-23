import logo from '../../assets/img/p_2.png';
import platillos from '../../assets/img/platillos2.png';
import {useTranslation} from "react-i18next";


export const Footer = () => {
const [translator] = useTranslation("global");

  return (
    <>
      <div className="quit w-full  text-neutral  bg-info"></div>
      <br />
      <div className="bg-warning grid place-content-center containert">
        <div className=" place-items-center platillos">
          <p className="font-bold mb-5 text-neutral text-xl"> {translator("footer.foot")} </p>
          <img src={platillos} alt="platillos" />
        </div>
        <div className="wave"></div>
      </div>

      <footer className="footer z-40 footer-center p-2 bg-neutral text-base-content rounded">
        <div className="grid grid-flow-col mt-1 gap-4">
          {/*<a className="link link-hover">{translator("navbar.home")}</a>
          <a className="link link-hover">{translator("navbar.products")}</a>
          <a className="link link-hover">{translator("navbar.contact")}</a> */}

        </div>
        <div>
          <div className="grid grid-flow-col gap-4">
            <img className="w-56" src={logo} alt="Pollos_Hermanos" />
          </div>
        </div>
        <div>
          <p> {translator("footer.copyr")}  © 2023 - UDONE - VENEZUELA ❤️ </p>
          <p>  Ha sido revisada la ejecucion del pipeline </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
