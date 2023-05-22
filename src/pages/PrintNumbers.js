import { useState, useEffect } from "react"
import './PrintNumbers.css'

export default function PrintNumbers({filter}) {
    const [familyData, setFamilyData] = useState([])

    useEffect(()=>{
        getFamilies();
        setTimeout(window.print, 1000)
    }, [])

    function getFamilies() {
        fetch("https://maa-rides-backend.onrender.com/families", {headers: {'Authorization': JSON.parse(sessionStorage.getItem("rideCallKey"))}})
          .then((response) => response.json())
          .then((body) => {
            setFamilyData(body);
          })
          .catch((err) => {
            console.log("Couldn't Process Request. Error: " + err);
          });
      }

    return (
        <>
            {familyData && familyData.sort((a,b)=>(a.id - b.id)).map(fam => (
                <>
                <section className='halfPage' key={fam.id}>
                    <h1 className="halfPageNumber">{fam.id}</h1>
                    <div className='cornerLogo'></div>
                </section>
                <section className='halfPage' key={fam.id+"second"}>
                    <h1 className="halfPageNumber">{fam.id}</h1>
                    <div className='cornerLogo'></div>
                </section>
                </>
            ))}
        </>
    )
}