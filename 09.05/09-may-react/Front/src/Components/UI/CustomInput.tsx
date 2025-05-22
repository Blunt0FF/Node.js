interface ICustomInputProps {
    label: string
    onHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
    name?: string
    placeholder?: string
}

function CustomInput(props: ICustomInputProps) {
    const {label, value, onHandleChange, name, placeholder} = props
    return (
        <div className="form__field">
            <label htmlFor="">{label}</label>
            <input type="text" value={value} onChange={onHandleChange} name={name} placeholder={placeholder} />
        </div>
    )
}

export default CustomInput