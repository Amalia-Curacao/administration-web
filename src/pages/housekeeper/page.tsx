import { ReactElement } from "react";
import User from "../../models/User";
import References from "../../tools/References";
import InputField from "../../components/inputField";

const references = new References();

function Body({housekeeper}: {housekeeper: User}): ReactElement {
    return(<table className="w-100">
        <tbody>
            <tr>
                <td colSpan={1} className="bg-primary text-secondary">
                    <label className="w-100"> First Name
                        <InputField refKey={"first-name"} references={references}>
                            <input onChange={onUpdateFirstName} ref={references.GetInput("first-name")} type="text" defaultValue={housekeeper.firstName ?? ""} className="form-control"/>
                        </InputField>
                    </label>
                </td>
                <td colSpan={1} className="bg-primary text-secondary">
                    <label className="w-100"> Last Name
                        <InputField refKey={"last-name"} references={references}>
                            <input onChange={onUpdateLastName} ref={references.GetInput("last-name")} type="text" defaultValue={housekeeper.lastName ?? ""} className="form-control"/>
                        </InputField>
                    </label>
                </td>
            </tr>
            <tr>
                <td colSpan={2} className="bg-primary text-secondary">
                    <label className="w-100"> Note 
                        <InputField refKey={"note"} references={references}>
                            <textarea onChange={onUpdateNote} ref={references.GetTextArea("note")} defaultValue={housekeeper.note ?? ""} className="form-control"/>
                        </InputField>
                    </label>
                </td>
            </tr>
        </tbody>
    </table>);

    function onUpdateFirstName(): void {
        housekeeper.firstName = references.GetInput("first-name").current!.value;
    }
    function onUpdateLastName(): void {
        housekeeper.lastName = references.GetInput("last-name").current!.value;
    }
    function onUpdateNote(): void {
        housekeeper.note = references.GetTextArea("note").current!.value;
    }

}

function Action(housekeeper: User): User | undefined {
    const newHousekeeper: User = {
        id: housekeeper.id,
        auth0: housekeeper.auth0,
        firstName: references.GetInput("first-name").current!.value,
        lastName: references.GetInput("last-name").current!.value,
        note: references.GetTextArea("note").current!.value,
        invites: undefined,
        tasks: undefined,
    };
    return (Validate(newHousekeeper) ? newHousekeeper : undefined);
}

function Validate(housekeeper: User): boolean {
    let isValid = true;

    if(housekeeper.firstName !== undefined || housekeeper.firstName === "") {
        references.GetSpan("first-name-validation")!.current!.innerText = "Required";
        references.GetDiv("first-name-wrapper")!.current!.classList.add("border-danger");
        isValid = false;
    }

    return isValid;
}

export default function Page(housekeeper: User): {body: ReactElement, action: () => User | undefined} {
    if(!housekeeper.id) throw new Error("Housekeeper must have an id");
    return({body: <Body housekeeper={housekeeper}/>, action: () => Action(housekeeper)});
}