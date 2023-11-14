import { useContext } from "react";
import { FilterContext } from "../contexts/FilterContext";
type SelectProps = {
    options: { name: string }[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = ({ options, onChange }: SelectProps) => {
    const filterContext = useContext(FilterContext);
    return (
    <select onChange={onChange} value={filterContext}>
        <option value="all">All</option>
        {options.map((option, i) => (
            <option key={i} value={option.name}>
                {option.name}
            </option>
        ))}
    </select>
)}

export default Select;