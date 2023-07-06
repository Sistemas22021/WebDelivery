import { ChangeEvent, useState } from "react";
import FormFieldPropsI from "./interfaces/FormFieldProps.interface";

export default function FormField(prop: FormFieldPropsI) {

    const [value, setValue] = useState<string>('');

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    return (
        <div className="form-control w-full ">
            <label className="label" htmlFor="nombre">
                <span className="label-text text-info">{prop.content}</span>
            </label>
            <input
            type={prop.type}
            id={prop.id}
            name={prop.name}
            placeholder={prop.placeholder}
            className="input shadow-lg input-ghost w-full"
            onChange={onChangeHandler}
            disabled={prop.disabled}
            value={value}
            />
        </div>
    )
}