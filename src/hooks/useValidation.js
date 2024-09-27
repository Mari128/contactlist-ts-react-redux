import {useEffect, useState} from "react";

export const useValidation = (value, inpt) => {
    const [error, setError] = useState('');

    useEffect(() => { setError(validate(value, inpt, config))}, [inpt, value])

    return {error}
}
const validate = (value, inpt, validations) => {
    const error = validations.find(validation => !validation.validate(value, inpt));
    if (error) {
        return error.message;
    }

    return '';
};

const pattern=/^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/;

const config = [
    { message: 'Обязательное поле', validate: value => Boolean(value) },
    { message: 'Длина поля не меньше 2 символов', validate: (value, inpt) => inpt !== 'phoneNumber' ? value.length >= 2 : true},
    { message: 'Некорректное значение! Введите номер в формате +7/8 xxx xxx xx xx', validate: (value, inpt) => inpt === 'phoneNumber' ? pattern.test(value) : true},
];