export default interface FormFieldPropsI {
    type: string;
    id: string;
    name: string;
    content: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
}