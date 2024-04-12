import { ReactElement } from "react";
import { VscSignOut } from "react-icons/vsc";
import useAuthentication from "../authentication/useAuthentication";
import { GrSchedules } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { pages } from "../routes";

const iconStyle = {fontSize: "20px"};

export default function Navbar(): ReactElement {
    
    return (<nav className={`navbar bg-primary d-flex flex-column justify-content-between`}>
        <div className="container-fluid ">
            <ScheduleIndex/>
            <SignOut/>
        </div>
    </nav>);
}

function ScheduleIndex () {
    const nav = useNavigate();
    
    return (<button className="btn text-secondary" onClick={() => nav(pages["schedule index"].route)}>
        <GrSchedules style={iconStyle}/>
    </button>)
}

function SignOut () {
    const { signOut } = useAuthentication();
    return (<button className="btn text-secondary" onClick={() => signOut()}>
        <VscSignOut style={iconStyle}/>
    </button>)
}
