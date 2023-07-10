import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchBox() {
    return (
        <div className='border-b-2 w-fit '>
            <FontAwesomeIcon size='lg' icon={faSearch}/>
            <input placeholder='Buscar cliente...' type="text" name="" id="" className='text-lg mx-2 active:outline-none focus:outline-none hover:outline-none' />
        </div>
    );
}