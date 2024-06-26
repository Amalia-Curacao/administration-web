import { ReactElement, useEffect, useRef, useState } from "react";
import InputField from "../../components/inputField";
import HousekeepingTask from "../../models/HousekeepingTask";
import References from "../../tools/References";
import HousekeepingTaskType from "../../models/enums/HousekeepingTaskType";
import User from "../../models/User";
import HousekeepersApi from "../../api/housekeepers";
import useAuthentication from "../../authentication/useAuthentication";

const references = new References();

function Body({task}: {task: HousekeepingTask}): ReactElement {
    const { getAccessToken } = useAuthentication();
    const [housekeepers, setHousekeepers] = useState<User[]>([]);
    const housekeepersApi = useRef<HousekeepersApi>();
    useEffect(() => {
        getAccessToken()
            .then(token => { housekeepersApi.current = new HousekeepersApi(token); })
            .then(() => {
                if(!housekeepersApi.current) return;
                housekeepersApi.current.get(task.roomScheduleId!)
                    .then(setHousekeepers)
                    .catch(error => console.log(error));
            });
    }, [task.roomScheduleId, setHousekeepers, getAccessToken]);
    
    return(<table className="w-100">
        <tbody>
            <tr>
                <td colSpan={2} className="bg-primary text-secondary">
                    <label className="w-100"> Type
                        <InputField refKey={"type"} references={references}>
                            <select onChange={onUpdateType} ref={references.GetSelect("type")} defaultValue={task.type ?? HousekeepingTaskType.None} className="form-control">
                                {Object.values(HousekeepingTaskType).map((value) => <option key={value} value={value}>{value}</option>)}
                            </select>
                        </InputField>
                    </label>
                </td>
            </tr>
            <tr>
                <td colSpan={2} className="bg-primary text-secondary">
                    <label className="w-100"> Housekeeper 
                        <InputField refKey={"housekeeper"} references={references}>
                            <select onChange={onUpdateHousekeeper} ref={references.GetSelect("housekeeper")} className="form-control">
                                {housekeepers.map(h => <option selected={h.id === task.housekeeperId} key={h.id} value={h.id}>{h.firstName} {h.lastName}</option>)}
                            </select>
                        </InputField>
                    </label>
                </td>
            </tr>
        </tbody>
    </table>);

    function onUpdateType(): void {
        const input = references.GetSelect("type")!.current?.value!;
        const key = Object.keys(HousekeepingTaskType).find((key: string) => HousekeepingTaskType[key as keyof typeof HousekeepingTaskType] === input);
        if(key !== undefined) task.type = HousekeepingTaskType[key as keyof typeof HousekeepingTaskType];
    }
    
    function onUpdateHousekeeper(): void {
        const input = references.GetSelect("housekeeper")!.current?.value!;
        task.housekeeperId = parseInt(input);
    }

}

function Action(task: HousekeepingTask): HousekeepingTask | undefined {
    const newTask: HousekeepingTask = {
        date: task.date,
        type: task.type,
        
        housekeeperId: parseInt(references.GetSelect("housekeeper")!.current?.value!),
        housekeeper: task.housekeeper,
        
        roomNumber: task.roomNumber,
        roomScheduleId: task.roomScheduleId,
        room: task.room,
    };
    return (Validate(newTask) ? newTask : undefined);
}

function Validate(task: HousekeepingTask): boolean {
    let isValid = true;

    if(task.type === undefined || task.type === HousekeepingTaskType.None) {
        references.GetSpan("type-validation")!.current!.innerText = "Required";
        references.GetDiv("type-wrapper")!.current!.classList.add("border-danger");
        isValid = false;
    }
    if(task.housekeeperId === undefined || task.housekeeperId <= -1) {
        references.GetSpan("housekeeper-validation")!.current!.innerText = "Required";
        references.GetDiv("housekeeper-wrapper")!.current!.classList.add("border-danger");
        isValid = false;
    }

    return isValid;
}

export default function Page(task: HousekeepingTask): { body: ReactElement, action: () => HousekeepingTask | undefined } {
    if(!task.date) throw new Error("Date is undefined.");
    if(!task.roomNumber) throw new Error("Room number is undefined.");
    if(!task.roomScheduleId) throw new Error("Room schedule ID is undefined.");

    return({body: <Body task={task}/>, action: () => Action(task)});
}