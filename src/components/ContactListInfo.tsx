import {useMemo, useState} from "react";
import {IContact} from "../store/models/IContact";
import {useAppDispatch} from "../hooks/redux";
import {contactSlice} from "../store/reducers/ContactSlice";
import {contactInfo} from "../ContactList/contactList";
import 'font-awesome/css/font-awesome.min.css';
import './contactList-info.css'

interface ContactListInfoProps {
    letter:string;
    contacts: IContact[] | undefined;
}

export default function ContactListInfo ({letter, contacts}:ContactListInfoProps) {
    const dispatch = useAppDispatch()

    const {deleteContact} = contactSlice.actions;

    const count = useMemo(() => {
        return contacts ? contacts.length : 0
    }, [contacts]);

    const [isActive, setIsActive] = useState(false);

    const handleClickShowContacts = () => {
        setIsActive(current => !current)
    };

    const handleDeleteSubmit = (contact:IContact): void => {
        dispatch(deleteContact(contact))
    }

    return (
        <>
        <div className="contact__element">
            <div className="element__letter" data-id={letter} onClick={handleClickShowContacts}>{letter}{count !== 0 && <span className="letter__counter">{count}</span>}</div>
            {contacts?.map((contact) => (
                <div className={isActive ? 'letter__info letter__info_active' : 'letter__info'}
                     style={{whiteSpace: 'pre-wrap'}}>
                    {contactInfo(contact)}
                    <i onClick={() => handleDeleteSubmit(contact)}
                       className="fa fa-times-circle contact__delete"></i>
                </div>
            ))}
        </div>
        </>
    )
}