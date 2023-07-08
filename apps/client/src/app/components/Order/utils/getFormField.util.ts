export default function getFormField(form: FormData,field: string): string {
    return form.get(field)?.valueOf().toString() || '';
}