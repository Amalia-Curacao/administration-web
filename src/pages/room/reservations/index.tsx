import { Fragment, ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { pages } from "../../../routes";
import { MdBedroomParent } from "react-icons/md";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import "../../../scss/room.table.scss";
import ReservationModal, { CreateReservationModal } from "../../reservation/modal";
import { default as Rooms } from "../table";
import PageLink from "../../../types/PageLink";
import Room from "../../../models/Room";
import Reservation from "../../../models/Reservation";
import axios from "axios";
import { MapAll as MapRooms } from "../../../mapping/room";
import { ToJsonReservation, ToJsonGuest } from "../../../extensions/ToJson";

function Index(): ReactElement {
    const { id } = useParams();
    if(!id) throw new Error("Schedule ID is undefined.");
    const [rooms, setRooms] = useState<Room[]>([]);
    const [modal, setModal] = useState<ReactElement>(<Fragment/>);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/Rooms/Get/" + id)
        .then(async response => {
            setRooms(MapRooms(response.data as Room[]));
        })
        .catch(error => console.log(error));
    }, [id]);

    const navigate = useNavigate();
    const [monthYear, setMonthYear] = useState(new Date());
    
    return(<>
        {modal}
        <div style={{borderRadius:"5px" }} className="p-3 m-3 mb-2 bg-primary d-flex flex-fill flex-row">
            <MonthYearSelector monthYear={monthYear} onChange={onMonthYearSelected}/>
            <button onClick={() => navigate(pages["housekeeper index"].route + "/" + id)} className="btn btn-secondary btn-outline-primary float-end">Housekeeping</button>
        </div>
        <div className="p-3 pb-0 d-flex flex-column flex-fill">
            <Rooms monthYear={monthYear} rooms={rooms} displayGuestNames={true} displayHousekeepingTasks={false} OnCellClick={onCellClick}/>
        </div>
    </>);
    
    function onMonthYearSelected(monthYear: Date): void {
        setMonthYear(monthYear);
    }

    function onCellClick(date: Date, room: Room): void {
        const reservation = (room.reservations ?? []).find(r => (r.checkIn! <= date) && (r.checkOut! >= date));
        if(!reservation){
            setModal(<CreateReservationModal checkIn={date} room={room} rooms={rooms} onSave={onSaveNew} onHide={onHide}/>)
        }
        else{
            setModal(<ReservationModal reservation={reservation} rooms={rooms} onSave={(r) => onSaveExisting(r, reservation)} onHide={onHide}/>)
        }

        function onHide(): void{
            setModal(<Fragment/>);
        }

        function onSaveExisting(newR: Reservation | undefined, oldR: Reservation): void{
            newR ? onUpdate(newR) : onDelete(oldR)

            function onUpdate(reservation: Reservation): void {
                axios.post(process.env.REACT_APP_API_URL + "/Reservations/Edit", ToJsonReservation(reservation)).then(() => {
                    axios.put(process.env.REACT_APP_API_URL + "/Guests/Set/" + reservation.id, reservation.guests!.map(ToJsonGuest))
                    .catch(err => {console.log(err)});
                })
                .then(() => navigate(0))
                .catch(err => {console.log(err)});
            }

            function onDelete(reservation: Reservation): void {
                axios.delete(process.env.REACT_APP_API_URL + "/Reservations/Delete/" + reservation.id)
                .then(() => navigate(0))
                .catch(err => {console.log(err)});
            }
        }

        function onSaveNew(newR: Reservation | undefined): void {
            newR ? onAdd(newR) : console.log("");

            function onAdd(reservation: Reservation): void {
                axios.post(process.env.REACT_APP_API_URL + "/Reservations/Create", ToJsonReservation(reservation))
                .then(response => {
                    reservation.guests!.forEach(guest => {
                        axios.post(process.env.REACT_APP_API_URL + "/Guests/Create", ToJsonGuest({...guest, reservationId: (response.data as Reservation).id}))
                        .catch(err => {console.log(err)});
                    });
                })
                .then(() => navigate(0))
                .catch(err => {console.log(err)});
            }
        }
    }
}

function MonthYearSelector({monthYear, onChange}: {monthYear: Date, onChange: (monthYear: Date) => void }): ReactElement {
    const arrowClass = "me-2 justify-content-center align-content-middle no-decoration bg-primary";
    return(
        <div className="d-flex flex-fill flex-row justify-content-center align-items-center">
            <button className={arrowClass} onClick={() => onChange(new Date(monthYear.getFullYear(), monthYear.getMonth() - 1, 1))}>
                <FaLongArrowAltLeft size={32} className="text-secondary"/>
            </button>
            <h5 className="text-center text-secondary me-2 ms-2">{monthYear.toLocaleString('default', { month: 'long' }) + " " + monthYear.getFullYear()}</h5>
            <button className={arrowClass} onClick={() => onChange(new Date(monthYear.getFullYear(), monthYear.getMonth() + 1, 1))}>
                <FaLongArrowAltRight size={32} className="text-secondary i-l"/>
            </button>
        </div>);
}

export const page: PageLink = {
    icon: <MdBedroomParent/>,
    route: '/room',
    element: <Index/>,
    params: '/:id'
};
