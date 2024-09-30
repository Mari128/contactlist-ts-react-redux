import { alphabet } from "../data/data";
import ContactListInfo from "./ContactListInfo";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {useEffect} from "react";
import {contactSlice} from "../store/reducers/ContactSlice";
import {getContacts} from "../ContactList/contactList";
import './contactList-info.css'

export default function ContactListSection(){
    const dispatch = useAppDispatch()
    let contactList = useAppSelector(state => state.contact.contactList)

    const {initContactList} = contactSlice.actions;

    useEffect(() => {
        dispatch(initContactList(localStorage.getItem("contacts")))
    });

    return (
        <section className="contactList">
            <div className="contact-column">
                {alphabet.slice(0, alphabet.length / 2).map((letter) => (
                    <ContactListInfo key={letter} letter={letter} contacts={getContacts(letter, contactList)}/>
                ))}
            </div>
            <div className="contact-column">
                {alphabet.slice(alphabet.length / 2).map((letter) => (
                    <ContactListInfo key={letter} letter={letter} contacts={getContacts(letter, contactList)}/>
                ))}
            </div>
        </section>
)
}
