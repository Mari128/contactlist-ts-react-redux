export interface IContact {
    name: string;
    jobTitle: string;
    phoneNumber: string;
}

export function equalsContact (contact1: IContact, contact2: IContact): boolean {
    return contact1.name === contact2.name && contact1.jobTitle === contact2.jobTitle && contact1.phoneNumber === contact2.phoneNumber;
}