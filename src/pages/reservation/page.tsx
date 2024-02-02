import { ReactElement } from "react";
import Reservation from "../../models/Reservation";
import "../../scss/reservation.create.scss";
import References from "../../tools/References";
import InputField from "../../components/inputField";
import Room from "../../models/Room";
import BookingSource from "../../models/enums/BookingSource";
import { ToJsonDateOnly, ToJsonTimeOnly } from "../../extensions/ToJson";
import { default as MapTimeOnly } from "../../mapping/timeonly";
import { default as MapDateOnly } from "../../mapping/dateonly";

const references: References = new References();

function Body({reservation}: {reservation: Reservation}): ReactElement {
    return (<>
        <table className="w-100"    >
            <tbody>
                <tr>
                    <td colSpan={1} className="bg-primary text-secondary">
                        <label className="d-flex flex-column w-100">Booking Source
                                <InputField refKey="booking-source" references={references}>
                                    <select onChange={updateBookingSource} ref={references.GetSelect("booking-source")} defaultValue={reservation.bookingSource ? reservation.bookingSource : BookingSource.None } className="form-control">
                                        {Object.values(BookingSource).map((value) => <option key={value} value={value}>{value}</option>)}
                                    </select>
                                </InputField>
                        </label>
                    </td>
                    <td colSpan={1} className="bg-primary text-secondary">
                        <label className="d-flex flex-column w-100">Room number
                                <InputField refKey="room-number" references={references}>
                                    <input onChange={updateRoomNumber} ref={references.GetInput("room-number")} defaultValue={!reservation.roomNumber ? -1 : reservation.roomNumber} type="number" className="form-control"/>
                                </InputField>
                        </label>
                    </td>
                </tr>
                <tr>
                    <td className="bg-primary text-secondary">
                        <label className="w-100">Check In
                            <InputField refKey="check-in" references={references}>
                                <input onChange={updateCheckIn} ref={references.GetInput("check-in")} defaultValue={!reservation.checkIn ? "" : ToJsonDateOnly(reservation.checkIn!)} type="date" className="form-control"/>
                            </InputField>
                        </label>
                    </td>
                    <td className="bg-primary text-secondary">
                        <label className="w-100">Check Out
                            <InputField refKey="check-out" references={references}>
                                <input onChange={updateCheckOut} ref={references.GetInput("check-out")} defaultValue={!reservation.checkOut ? "" : ToJsonDateOnly(reservation.checkOut!)} type="date" className="form-control"/>
                            </InputField>
                        </label>
                    </td>
                </tr>
                <tr>
                    <td className="bg-primary text-secondary">
                        <label className="w-100">Flight Arrival Number
                            <InputField refKey="flight-arrival-number" references={references}>
                                <input onChange={updateFlightArrivalNumber} defaultValue={reservation.flightArrivalNumber ? reservation.flightArrivalNumber : ""} ref={references.GetInput("flight-arrival-number")} type="text" className="form-control"/>
                            </InputField>
                        </label>
                    </td>
                    <td className="bg-primary text-secondary">
                        <label className="w-100">Flight Arrival Time
                            <InputField refKey="flight-arrival-time" references={references}>
                                <input onChange={updateFlightArrivalTime} defaultValue={!reservation.flightArrivalTime ? "" : ToJsonTimeOnly(reservation.flightArrivalTime!).split(':').slice(0, 2).join(':')} ref={references.GetInput("flight-arrival-time")} type="time" className="form-control"/>
                            </InputField>
                        </label>
                    </td>
                </tr>
                <tr>
                    <td className="bg-primary text-secondary text-nowrap">
                        <label className="w-100">Flight Departure Number
                            <InputField refKey="flight-departure-number" references={references}>
                                <input onChange={updateFlightDepartureNumber} defaultValue={reservation.flightDepartureNumber ? reservation.flightDepartureNumber : ""} ref={references.GetInput("flight-departure-number")} type="text" className="form-control"/>
                            </InputField>
                        </label>
                    </td>
                    <td className="bg-primary text-secondary">
                        <label className="w-100">Flight Departure Time
                            <InputField refKey="flight-departure-time" references={references}>
                                <input onChange={updateFlightDepartureTime} defaultValue={!reservation.flightDepartureTime ? "" : ToJsonTimeOnly(reservation.flightDepartureTime!).split(':').slice(0, 2).join(':')} ref={references.GetInput("flight-departure-time")} type="time" className="form-control"/>
                            </InputField>
                        </label>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} className="bg-primary text-secondary">
                        <label className="d-flex flex-column w-100">Remarks
                            <InputField refKey="remarks" references={references}>
                                <textarea onChange={updateRemarks} defaultValue={reservation.remarks ? reservation.remarks : ""} className="form-control" ref={references.GetTextArea("remarks")} />
                            </InputField>
                        </label>
                    </td>
                </tr>
            </tbody>
        </table>
    </>);

    // #region update functions
    function updateBookingSource(): void {
        const input = references.GetSelect("booking-source")!.current?.value!;
        const key = Object.keys(BookingSource).find((key: string) => BookingSource[key as keyof typeof BookingSource] === input);
        if(key !== undefined) reservation.bookingSource = BookingSource[key as keyof typeof BookingSource];
    }

    function updateRoomNumber(): void{
        reservation.roomNumber = parseInt(references.GetInput("room-number")!.current?.value!);
    }

    function updateCheckIn(): void {
        reservation.checkIn = MapDateOnly(references.GetInput("check-in")!.current?.value!);
    }

    function updateCheckOut(): void {
        reservation.checkOut = MapDateOnly(references.GetInput("check-out")!.current?.value!);
    }

    function updateFlightArrivalNumber(): void {
        reservation.flightArrivalNumber = references.GetInput("flight-arrival-number")!.current?.value!;
    }

    function updateFlightDepartureNumber(): void {
        reservation.flightDepartureNumber = references.GetInput("flight-departure-number")!.current?.value!;
    }

    function updateFlightArrivalTime(): void {
        const input = references.GetInput("flight-arrival-time")!.current?.value;
        if(input !== undefined) reservation.flightArrivalTime = MapTimeOnly(input)
    }

    function updateFlightDepartureTime(): void {
        const input = references.GetInput("flight-departure-time")!.current?.value;
        if(input !== undefined) reservation.flightDepartureTime = MapTimeOnly(input)
    }

    function updateRemarks(): void {
        reservation.remarks = references.GetTextArea("remarks")!.current?.value!;
    }
    // #endregion
}

function Action(reservation: Reservation, rooms: Room[]): Reservation | undefined {
    const reservationToAdd: Reservation = {
        id: reservation.id,
        checkIn: MapDateOnly(references.GetInput("check-in")!.current?.value!),
        checkOut: MapDateOnly(references.GetInput("check-out")!.current?.value!),
        flightArrivalNumber: references.GetInput("flight-arrival-number")!.current?.value!,
        flightDepartureNumber: references.GetInput("flight-departure-number")!.current?.value!,
        flightArrivalTime: MapTimeOnly(references.GetInput("flight-arrival-time")!.current?.value),
        flightDepartureTime: MapTimeOnly(references.GetInput("flight-departure-time")!.current?.value),
        bookingSource: BookingSource[references.GetSelect("booking-source")!.current?.value! as keyof typeof BookingSource],
        remarks: references.GetInput("remarks")!.current?.value!,

        scheduleId: reservation.scheduleId,
        roomNumber: parseInt(references.GetInput("room-number")!.current?.value!),
        schedule: undefined,

        roomType: reservation.roomType,
        roomScheduleId: reservation.roomScheduleId,
        room: undefined,
        guests: reservation.guests ?? []
    };
    return Validate(reservationToAdd, rooms) ? reservationToAdd : undefined;
}

function Validate(reservation: Reservation, rooms: Room[]): boolean {
    let isValid: boolean = true;
    const room = rooms.find(r => r.number === reservation.roomNumber);

    const nullErrorMessage: string = "Required";
    if(!reservation.checkIn || isNaN(reservation.checkIn!.valueOf())) {
        references.GetSpan("check-in-validation")!.current!.innerText = nullErrorMessage;
        references.GetDiv("check-in-wrapper")!.current!.classList.add("border-danger");
        isValid = false;
    };
    if(!reservation.checkOut || isNaN(reservation.checkOut!.valueOf())) {
        references.GetSpan("check-out-validation")!.current!.innerText = nullErrorMessage;
        references.GetDiv("check-out-wrapper")!.current!.classList.add("border-danger");
        isValid = false;
    };
    if(!reservation.roomNumber || isNaN(reservation.roomNumber!)) {
        references.GetSpan("room-number-validation")!.current!.innerText = nullErrorMessage;
        references.GetDiv("room-number-wrapper")!.current!.classList.add("border-danger");
        isValid = false;
    };
    if(room === undefined) {
        references.GetSpan("room-number-validation")!.current!.innerText = "Room number is not valid.";
        references.GetDiv("room-number-wrapper")!.current!.classList.add("border-danger");
        isValid = false;
    };

    if(reservation.checkIn! > reservation.checkOut!) {
        references.GetSpan("check-in-validation")!.current!.innerText = "Check in cannot be after check out.";
        references.GetDiv("check-in-wrapper")!.current!.classList.add("border-danger");
        isValid = false;
    };
    
    if(!CanFit(reservation, room!)) {
        references.GetSpan("room-number-validation")!.current!.innerText = room?.type?.toString() + " is already occupied.";
        references.GetDiv("room-number-wrapper")!.current!.classList.add("border-danger");
        isValid = false;
    };

    return (isValid);
}

function CanFit(reservation: Reservation, room: Room): boolean {
    if(!room.reservations) { console.log("rooms reservations is undefined."); return false; };
    if(room.reservations.length === 0) return true;
    const reservations = room.reservations.filter(r => r.id !== reservation.id);
    if(reservations.length === 0) return true;

    return reservations.every(r => (reservation.checkIn! >= r.checkOut! || reservation.checkOut! <= r.checkIn!));
}

export default function Page(reservation: Reservation, rooms: Room[]): {body: ReactElement, action: () => Reservation | undefined} {
    if(!reservation.scheduleId) throw new Error("Reservation scheduleId is undefined");
    if(!reservation.roomScheduleId) throw new Error("Reservation roomScheduleId is undefined");
    if(!reservation.roomType) throw new Error("Reservation roomType is undefined");
    if(!rooms) throw new Error("Rooms is undefined");
    if(rooms.length === 0) throw new Error("Rooms is empty");

    return ({
        body: <Body reservation={reservation}/>, 
        action: () => Action(reservation, rooms)
    });
}

