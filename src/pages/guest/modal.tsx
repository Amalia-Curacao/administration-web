import { ReactElement } from "react";
import { Modal } from "react-bootstrap";
import Guest from "../../models/Guest";
import PersonPrefix from "../../models/enums/PersonPrefix";
import Reservation from "../../models/Reservation";
import {default as GuestPage} from "./page";

export default function GuestModal({show, guest, onClose, onSave, onRemove}: {show: boolean, guest: Guest, onClose: VoidFunction, onSave: (g: Guest) => void, onRemove: (g: Guest) => void}): ReactElement {
    const guestPage = GuestPage(guest);
    
    return(<>
        <Modal show={show} onHide={onClose}>
            <Modal.Body style={{borderRadius: "5px 5px 0px 0px"}} className="bg-primary">
                {guestPage.body}
            </Modal.Body>
            <Modal.Footer style={{borderRadius: "0px 0px 5px 5px"}} className="bg-primary">
                <div className="btn-group">
                    <button className="btn btn-secondary hover-danger" onClick={() => {if(guestPage.action() !== undefined) onRemove(guestPage.action()!)}}>Delete</button>
                    <button className="btn btn-secondary hover-success" onClick={() => {if(guestPage.action() !== undefined) onSave(guestPage.action()!)}}>Save</button>
                </div>
            </Modal.Footer>
        </Modal>
    </>);
}

export function CreateGuestModal({show, reservation, onClose, onSave, onRemove}: {show: boolean, reservation: Reservation, onClose: VoidFunction, onSave: (g: Guest) => void, onRemove: (g: Guest) => void}): ReactElement {
    const blankGuest: Guest = {
        // The negative Id ensures that the backend creates a new id automatically when creating a new guest.
        // The -1 at the end ensures that when a guest is added for the first time the id is -1 instead of 0.
        id: -reservation.guests!.length - 1,
        firstName: undefined,
        lastName: undefined,
        prefix: PersonPrefix.Unknown,
        reservationId: reservation.id,
        reservation: reservation,
        note: "",
        age: undefined,
    };
    return(<GuestModal guest={blankGuest} onClose={onClose} show={show} onSave={onSave} onRemove={onRemove}/>);
}