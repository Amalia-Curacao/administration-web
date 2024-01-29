import axios from "axios";
import { ReactElement, useState } from "react";
import { Modal } from "react-bootstrap";
import BookingSource from "../../models/BookingSource";
import Guest from "../../models/Guest";
import PersonPrefix from "../../models/PersonPrefix";
import Reservation from "../../models/Reservation";
import Room from "../../models/Room";
import {default as GuestPage} from "../guest/page";
import {default as ReservationPage} from "../reservation/page";

interface CreateReservationModalProps {
    checkIn: Date,
    room: Room,
    rooms: Room[],
    onSave: (r: Reservation | undefined) => void,
    onHide: VoidFunction,
}

export function CreateReservationModal({checkIn, room, rooms, onSave, onHide}: CreateReservationModalProps): ReactElement {
    const blankReservation: Reservation = {
        id: -1,
        checkIn: checkIn,
        checkOut: undefined,
        flightArrivalNumber: undefined,
        flightDepartureNumber: undefined,
        flightArrivalTime: undefined,
        flightDepartureTime: undefined,
        bookingSource: BookingSource.None,
        remarks: "",
        roomNumber: room.number,
        roomType: room.type,
        roomScheduleId: room.scheduleId,
        room: room,
        scheduleId: room.scheduleId,
        schedule: room.schedule,
        guests: []
    };

    return(<ReservationModal reservation={blankReservation} rooms={rooms} onSave={onSave} onHide={onHide}/>);
}

interface Props{
    reservation: Reservation,
    rooms: Room[],
    onSave: (r: Reservation | undefined) => void,
    onHide: VoidFunction,
}

export default function ReservationModal({reservation, onSave, onHide, rooms}: Props): ReactElement {
    const [show, setShow] = useState<boolean>(true);
    const [tempReservation, setTempReservation] = useState<Reservation>({...reservation, guests: reservation.guests ?? []});
    const [showGuest, setShowGuest] = useState<{[index: number]: boolean}>({});
    const reservationPage = ReservationPage(tempReservation, rooms);
    const toReservationModal = (): void => { 
        Object.keys(showGuest).forEach(key => setShowGuest(showGuest => ({...showGuest, [key]: false})));
        setShow(true);
    };
    
    const toGuestModal = (index: number): void => {
        setShow(false);
        setShowGuest(showGuest => ({...showGuest, [index]: true}));
    }

    const onSaveReservation = (): void => {
        const reservation = reservationPage.action();
        if(!reservation) return;
        onSave({...reservation!, guests: tempReservation.guests});
        setShow(false);
    }

    const onRemoveReservation = (): void => {
       onSave(undefined);
       setShow(false);
    }

    const onRemoveGuest = (guest: Guest): void => {
        if(tempReservation.id! > -1) axios.delete(process.env.REACT_APP_API_URL + "/Guests/Delete/" + guest.id);
        setTempReservation({...tempReservation, guests: tempReservation.guests!.filter(p => p.id !== guest.id)});
        toReservationModal();
    }

    const onSaveGuest = (guest: Guest): void => {
        if(!guest) return;
        const guestIndex = tempReservation.guests!.findIndex(p => p.id === guest.id && p.id !== -1);
        const newGuests = guestIndex !== -1 
            ? tempReservation.guests!.map((g, index) => index === guestIndex ? guest : g)
            : [...tempReservation.guests!, guest];
        setTempReservation({...tempReservation, guests: newGuests});
        toReservationModal();
    }

    return(<>
        <Modal show={show} onHide={onHide}>
            <Modal.Body style={{borderRadius: "5px 5px 0px 0px"}} className="bg-primary">
                {reservationPage.body}
            </Modal.Body>
            <Modal.Footer style={{borderRadius: "0px 0px 5px 5px"}} className="bg-primary">
                <div className="flex flex-fill pe-3 ps-3">
                    <div className="float-start btn-group">
                        {tempReservation.guests!.map((p, index) => 
                            <button key={index} className="btn btn-secondary hover-success" onClick={() => toGuestModal(index)}>{p.firstName}</button>)}
                        {tempReservation.guests!.length < 2 
                            ? (<button className="btn btn-secondary hover-success float-start" 
                                onClick={() => toGuestModal(tempReservation.guests!.length)}>Add guest</button>) 
                            : (<></>)}
                    </div>
                    <div className="float-end btn-group">
                        {tempReservation.id! < 0 
                            ? <button className="btn btn-secondary hover-danger" onClick={() => setShow(false)}>Cancel</button> 
                            : <button className="btn btn-secondary hover-danger" onClick={onRemoveReservation}>Delete</button>}
                        <button className="btn btn-secondary hover-success" onClick={onSaveReservation}>Save</button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
        {tempReservation.guests?.map((p, index) => 
            <GuestModal onSave={onSaveGuest} key={index} show={showGuest[index] ?? (showGuest[index] = false)} guest={p} onClose={toReservationModal} onRemove={onRemoveGuest}/>
        )}
        <CreateGuestModal onSave={onSaveGuest} reservation={tempReservation} onClose={toReservationModal} onRemove={onRemoveGuest}
            show={showGuest[tempReservation.guests!.length] ?? (showGuest[tempReservation.guests!.length] = false)}/>
    </>);
}

function GuestModal({show, guest, onClose, onSave, onRemove}: {show: boolean, guest: Guest, onClose: VoidFunction, onSave: (g: Guest) => void, onRemove: (g: Guest) => void}): ReactElement {
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

function CreateGuestModal({show, reservation, onClose, onSave, onRemove}: {show: boolean, reservation: Reservation, onClose: VoidFunction, onSave: (g: Guest) => void, onRemove: (g: Guest) => void}): ReactElement {
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