import { ReactElement } from "react";
import './scss/layout.scss';
import Navbar from "./components/navbar";

export default function Layout({children}: {children: ReactElement}): ReactElement{
    
    return (<main className="bg-secondary w-100">
        <Navbar/>
        {children}
    </main>);
}