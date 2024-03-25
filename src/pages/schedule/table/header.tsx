import { ReactElement } from "react";

interface TableHeaderProps {
    setCreating: (isCreating: boolean) => void;
    isCreating: boolean;
}

export default function TableHeader({setCreating, isCreating}: TableHeaderProps): ReactElement {
    return (<thead className="h4">
        <tr className="bg-secondary">
            <th className="table-bordered bg-secondary">
                <span className="text-dark">
                    Id
                </span>
            </th>
            <th className="table-bordered bg-secondary">
                <span className="text-dark">
                    Name
                </span>
            </th>
            <th className="table-bordered bg-secondary">
                <span className="text-dark">
                    Role
                </span>
            </th>
            <th className="bg-secondary">
                <button hidden={isCreating} onClick={() => setCreating(true)} className="btn btn-outline-success float-end">
                    Add
                </button>
            </th>
        </tr>
    </thead>);
}