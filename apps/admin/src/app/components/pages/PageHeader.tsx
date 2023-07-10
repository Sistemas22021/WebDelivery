import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PageHeader(props: { header: string, icon: IconDefinition }) {
    return (
        <div className='border-b-2 h-16 flex flex-row' >
            <div className='flex flex-col justify-center flex-1 px-6'>
                <h1 className='text-2xl font-bold flex gap-3' >
                    <FontAwesomeIcon size='lg' icon={faBars} />
                    <span>{props.header}</span>
                </h1>
            </div>
            <div className='flex flex-col justify-center px-4'>
                <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden">
                    <FontAwesomeIcon icon={faBars} />
                </label>
            </div>
        </div>
    )

}