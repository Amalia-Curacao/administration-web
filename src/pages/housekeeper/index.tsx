import axios from "axios";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Housekeeper from "../../models/Housekeeper";
import Row, { CreateRow } from "./row";
import PageLink from "../../types/PageLink";
import { pages } from "../../routes";

function Body(): ReactElement {
    const {id} = useParams();
    if(!id) throw new Error("Schedule ID is undefined.");
    const navigate = useNavigate();
    const [housekeepers, setHousekeepers] = useState<Housekeeper[]>([]);
    const [modifying, setModifying] = useState<Housekeeper | undefined>(undefined);
    const [createRow, setCreateRow] = useState<ReactElement>(<></>);
    
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/Housekeepers/GetAll/" + id)
        .then(response => {
            setHousekeepers(response.data as Housekeeper[]);
        })
        .catch(error => console.log(error));
    }, [id]);

    return <>
        <div className="d-flex p-3 d-row bg-primary">
            <h1 className="text-secondary">Housekeepers</h1>
        </div>
        <div className="d-flex">
            <table className="w-100">
                <thead>
                    <tr>
                        <th>
                            <span className="ms-3">
                                First Name
                            </span>
                        </th>
                        <th>
                            <span className="ms-3">
                                Last Name
                            </span>
                        </th>
                        <th>
                            <span className="ms-3">
                                Note
                            </span>
                        </th>
                        <th>
                            <div className="d-flex flex-row float-end pe-3">
                                <div className="pe-1">
                                    <button onClick={displayCreateRow} className="btn btn-outline-success">
                                        Add
                                    </button>
                                </div>
                                <button onClick={allHousekeepingTasks} className="btn btn-outline-warning">
                                    All
                                </button>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {createRow}
                    {housekeepers.map((h, index) => 
                        <Row key={h.id} index={index} housekeeper={h} readOnly={isReadonly(h)} onEdit={() => onEdit(h)} onSave={(h: Housekeeper) => editHousekeeper(h)} onDelete={() => onDelete(h)}/>)}
                </tbody>
            </table>
        </div>
    </>;

    function onEdit(h: Housekeeper): boolean {
        if(modifying === undefined) {
            setModifying(h);
            return true;
        }
        return false;
    }

    function editHousekeeper(housekeeper: Housekeeper): void {
        setHousekeepers(housekeepers.map(h => h.id === housekeeper.id ? housekeeper : h));
        setModifying(undefined);
    }

    function onDelete(housekeeper: Housekeeper): void {
        setHousekeepers(housekeepers.filter(h => h.id !== housekeeper.id));
    }

    function isReadonly(housekeeper: Housekeeper): boolean{
        if(modifying === undefined) return true;
        return modifying.id !== housekeeper.id;
    }

    function displayCreateRow(): void {
        setCreateRow(<CreateRow scheduleId={parseInt(id!)} onSave={addHousekeeper} onReturn={hideCreateRow}/>);

        function addHousekeeper(housekeeper: Housekeeper): void {
            setHousekeepers([...housekeepers, {...housekeeper}]);
            hideCreateRow();
        }

        function hideCreateRow(): void {
            setCreateRow(<Fragment/>);
        }
    }
    
    function allHousekeepingTasks(): void {  
        navigate(pages["housekeeping tasks"].route + "/" + id);
    }
}

export const page: PageLink = {
    route: "/housekeepers",
    element: <Body/>,
    icon: <Fragment/>,
    params: "/:id",
};