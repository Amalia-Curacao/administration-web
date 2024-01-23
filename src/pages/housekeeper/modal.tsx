import { ReactElement, useEffect, useState } from "react";
import Housekeeper from "../../models/Housekeeper";
import { Modal, ModalBody, ModalFooter } from "react-bootstrap";
import InputField from "../../components/inputField";
import axios from "axios";



export default function HousekeeperModal({housekeeper, show, setShow}: {housekeeper: Housekeeper, show: boolean, setShow: (_: boolean) => void}): ReactElement {    
    

    return(<Modal show={show} onHide={() => setShow(false)}>

    </Modal>)
}

export function CreateHousekeeperModal({scheduleId, show, setShow}: {scheduleId: number, show: boolean, setShow: (_: boolean) => void}): ReactElement {
    const blankHousekeeper: Housekeeper = {
        id: -1,
        firstName: "",
        lastName: "",
        note: "",
        scheduleId: scheduleId,
        schedule: undefined,
        tasks: undefined,  
    };

    return (<HousekeeperModal housekeeper={blankHousekeeper} show={show} setShow={setShow}/>);
}

export function HousekeeperModalFromId({housekeeperId, show, setShow}: {housekeeperId: number, show: boolean, setShow: (_: boolean) => void}): ReactElement {
    const [housekeeper, setHousekeeper] = useState<Housekeeper>();
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/Housekeepers/Get/" + housekeeperId).then((response) => {
            setHousekeeper(response.data as Housekeeper);
        });
    }, [housekeeperId]);

    return (<HousekeeperModal housekeeper={housekeeper!} show={show} setShow={setShow}/>);
}
// TODO make a link to modal, optional