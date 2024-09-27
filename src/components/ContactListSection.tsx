import { alphabet } from "../data/data";
import ContactListInfo from "./ContactListInfo";
import './contactList-info.css'

export default function ContactListSection(){

    return (
        <section className="contactList">
         {alphabet.map((letter) => (
            <ContactListInfo key={letter} letter={letter}/>
        ))}
        </section>
    )
}
