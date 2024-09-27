import './contactList-info.css'
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {contactSlice} from "../store/reducers/ContactSlice";

interface ContactListInfoProps {
    letter:string;
}

export default function ContactListInfo ({letter}:ContactListInfoProps) {
    const dispatch = useAppDispatch();
    const count = useAppSelector(state => state.contact.count);

    const countContacts = () => {
        dispatch(contactSlice.actions.getContact(letter))
        return count;
    }

    return (
        <>
        <div className="contact__element">
            <div className="element__letter" data-id={letter}>{letter}</div>
            {/*{countContacts() !== 0 && <span>{count}</span>}*/}
            {countContacts()}
        </div>
        </>
    )
}