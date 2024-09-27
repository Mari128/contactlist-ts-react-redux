import { useState } from "react";
import {useValidation} from "./useValidation";

export const useInput = (initialValue, inpt) => {
    const [value, setValue] = useState(initialValue)
    const valid = useValidation(value, inpt)

    const onChange = (e) => setValue(e.target.value)

    return {
        value,
        setValue,
        onChange,
        ...valid
    }
}