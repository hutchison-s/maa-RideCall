import { useState, useEffect } from "react"
import './Caller.css'
import FamilyMapDisplay from "../components/FamilyMapDisplay";
import PageHeader from "../components/PageHeader";

export default function Caller() {
    const [devData, setDevData] = useState([])

    function callDev() {
      fetch("http://localhost:5000/families")
        .then(response => response.json())
        .then(body => {
          setDevData(body)
        })
        .catch((err) => {
          console.log("Couldn't Process Request. Error: "+err)
        })
    }

    async function callRideSubmit(e) {
        e.preventDefault();
        let element = document.getElementById("rideCallInput");
        let id = element.value;
        fetch("http://localhost:5000/families/call/"+id, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
          }
        })
          .then(response => {
            console.log(response)
            element.value = ""
            callDev()
            element.focus()
        })
          .catch(err => {
            console.log(err)
          })
      }
    
      async function undoRide(element) {
        let id = (element.tagName === "div") 
        ? element.querySelector('.idTag').innerHTML
        : element.parentNode.querySelector('.idTag').innerHTML;
          fetch("http://localhost:5000/families/uncall/"+id, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json; charset=UTF-8'
            }
          })
            .then(response => {
              console.log(response);
              callDev();
          })
            .catch(err => {
              console.log(err)
            })
        }
    
    useEffect(()=>{
        callDev()
    }, [])

    return (
        <>
            <PageHeader title="MAA Dismissal Ride Calling" />
            <section className="flexReg" style={{textAlign: 'center'}}>
              <div style={{flex: '1 0 300px', border: '2px solid black', borderRadius: '2rem', padding: '0.5rem', margin: '0.5rem'}}>
                <h2 style={{textDecoration: 'underline'}}>Call Ride</h2>
                <form id="rideCallForm" onSubmit={callRideSubmit} style={{textAlign: 'center'}}>
                  <label style={{display: 'block', marginBottom: '1rem'}} htmlFor="rideCallInput">Ride Number: </label>
                  <input style={{fontSize: 'xx-large', textAlign: 'center', width: '70%', padding: '1rem 0.5rem', borderRadius: '2rem', borderColor: 'red', display: 'block', margin: '1rem auto'}} id="rideCallInput" type='text' pattern='\d*' maxLength='2' name="id" />
                  <button style={{fontSize: 'xx-large', textAlign: 'center', display: 'inline-block', padding: '1rem 2.5rem', borderRadius: '2rem'}} type='submit'>Call</button>
                </form>
              </div>
              <div style={{flex: '1 0 300px', border: '2px solid black', borderRadius: '2rem', padding: '0.5rem', margin: '0.5rem', backgroundColor: 'grey', color: 'white'}}>
                <h2 style={{textDecoration: 'underline'}}>Already Called</h2>
                <FamilyMapDisplay onDoubleClick={(e)=>{undoRide(e.target)}} filterFunc={x => (x.dateCalled === new Date().toDateString())} data={devData} />
              </div>
            </section>
            
            
        </>
    )
}