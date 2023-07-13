export default (props: {value: string}) => (
    <textarea
        className="textarea text-info input-ghost resize-none input-bordered w-full mt-3"
        id="pedido"
        name="pedido"
        rows={7}
        readOnly
        value={props.value}
      ></textarea>
)

/*
{/*value={pedido}*/
        /*onChange={handleChange}*/
        /*placeholder={t("form.label_order")}*/