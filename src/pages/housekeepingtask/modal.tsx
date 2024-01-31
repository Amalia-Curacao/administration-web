import { ReactElement } from "react";
import HousekeepingTask from "../../models/HousekeepingTask";
import Room from "../../models/Room";
import { default as HousekeepingTaskPage } from "./page";
import { Modal } from "react-bootstrap";
import Housekeeper from "../../models/Housekeeper";

interface CreateHousekeepingTaskModalProps {
    date: Date,
    room: Room,
    housekeeper: Housekeeper | undefined,

    onSave: (t: HousekeepingTask | undefined) => void,
    onHide: VoidFunction,
}

export function CreateHousekeepingTaskModal({ date, room, housekeeper, onSave, onHide }: CreateHousekeepingTaskModalProps): ReactElement {
    const blankTask: HousekeepingTask = {
        date: date,
        room: room,
        roomNumber: room.number,
        roomScheduleId: room.scheduleId,
        scheduleId: room.scheduleId,
        type: undefined,
        housekeeper: housekeeper,
        housekeeperId: housekeeper?.id,
        schedule: undefined
    };

    return(<HousekeepingTaskModal task={blankTask} onSave={onSave} onHide={onHide}/>);
}

interface Props{
    task: HousekeepingTask,

    onSave: (t: HousekeepingTask | undefined) => void,
    onHide: VoidFunction,
}

export default function HousekeepingTaskModal({task, onSave, onHide}: Props): ReactElement {
    const page = HousekeepingTaskPage(task);

    const onSaveTask = (): void => {
        const task = page.action();
        if(!task) return;
        onSave(task);
    }

    const onRemoveTask = (): void => {
       onSave(undefined);
    }

    return(<>
        <Modal show={true} onHide={onHide}>
            <Modal.Body style={{borderRadius: "5px 5px 0px 0px"}} className="bg-primary">
                {page.body}
            </Modal.Body>
            <Modal.Footer style={{borderRadius: "0px 0px 5px 5px"}} className="bg-primary">
                <div className="flex flex-fill pe-3 ps-3">
                    <div className="float-end btn-group">
                        <button className="btn btn-secondary hover-danger" onClick={onRemoveTask}>Delete</button>
                        <button className="btn btn-secondary hover-success" onClick={onSaveTask}>Save</button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    </>);
}