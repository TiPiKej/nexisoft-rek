import dayjs from "dayjs";
import { useState } from "react";

function useInput(defaultValue) {
    const [ value, setValue ] = useState(defaultValue);
    const [ error, setError ] = useState(false);

    function onChange(e) {
        setValue(e.target.value);
    }
    
    return {
        value,
        setValue,
        setError,
        bindValue: {
            value,
            onChange,
            error,
        }
    };
}

function useDatepicker(defaultValue, format) {
    const [ value, setValue ] = useState(defaultValue);

    function onChange(e) {
        setValue(e);
    }

    return {
        value: dayjs(value).format(format ?? "YYYY-MM-DD"),
        setValue,
        bindValue: {
            value,
            onChange,
        }
    };
}

function useSelect(defaultValue) {
    const [ value, setValue ] = useState(defaultValue);

    function onChange(e) {
        setValue(e.target.value);
    }

    return {
        value,
        setValue,
        bindValue: {
            value,
            onChange,
        }
    };
}

export {
    useInput,
    useDatepicker,
    useSelect,
}
