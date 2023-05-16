import NavBar from "./NavBar";
import './PageHeader.css'

export default function PageHeader({title}) {
    return (
        <header id="pageHeader">
            <NavBar />
            <h1 id="pageTitle">{title}</h1>
            <img src="./logo.png" alt="Mustang Logo" width='60px'/>
        </header>
    )
}