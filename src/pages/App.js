import { useEffect, useState } from "react";
import "./App.css";
import AddModal from "../components/AddModal";
import FamilyTable from "../components/FamilyTable";
import PageHeader from "../components/PageHeader";
import LogoLoader from "../components/LogoLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [familyData, setFamilyData] = useState(null);
  // const [ids, setIDs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [areToolsVisible, setAreToolsVisible] = useState(false)

  function getFamilies() {
    fetch("https://maa-rides-backend.onrender.com/families", {headers: {'Authorization': JSON.parse(sessionStorage.getItem("rideCallKey"))}})
      .then((response) => response.json())
      .then((body) => {
        // const availableIDs = [];
        // for (let x of body) {
        //   availableIDs.push(x.id);
        // }
        // setIDs(availableIDs);
        setFamilyData(body);
      })
      .catch((err) => {
        console.log("Couldn't Process Request. Error: " + err);
      });
  }

  function upGrade() {
    for (const fam of familyData) {
      fetch("https://ride-call-maa.herokuapp.com/families/upgrade/"+fam.id, {headers: {'Authorization': JSON.parse(sessionStorage.getItem("rideCallKey"))}})
        .then(res => res.json())
        .then(body => {
          console.log(body)
        })
        .catch(err => console.log(err))
    }
    getFamilies()
  }

  useEffect(() => {
    getFamilies();
  }, []);

  function upGrade() {
    for (const fam of familyData) {
      fetch("https://maa-rides-backend.onrender.com/families/upgrade/"+fam.id, {headers: {'Authorization': JSON.parse(sessionStorage.getItem("rideCallKey"))}})
        .then(res => res.json())
        .then(body => {
          console.log(body)
        })
        .catch(err => console.log(err))
    }
    setTimeout(getFamilies, 5000)
  }
  function removeBlanks() {
    for (const fam of familyData) {
      if (fam.members.length === 0) {
        fetch("https://maa-rides-backend.onrender.com/families/"+fam.id, {
          method: 'DELETE', 
          headers: {'Authorization': JSON.parse(sessionStorage.getItem("rideCallKey"))}
        })
          .then(res => res.json())
          .then(body => {
            console.log(body)
          })
          .catch(err => console.log(err))
        }
      }
    setTimeout(getFamilies, 5000)
  }

  useEffect(() => {
    getFamilies();
  }, []);

  return (
    <div className="App">
      <PageHeader title="MAA Ride Call Database Management" />
      <section className="flexReg">
        <div id="search" style={{ flex: "100%", textAlign: "center" }}>
          <label htmlFor="nameSearch">Search by Last Name:</label>
          <input
            name="nameSearch"
            type="search"
            onInput={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <br></br>
          <button
            id="addFamButton"
            onClick={() => {
              document.getElementById("addModal").showModal();
            }}
          >
            Add Family
          </button>
          <button id='printBtn'><a href='/print/' target='_blank'><FontAwesomeIcon icon={faPrint} /></a></button>
          <hr></hr>
        </div>
        <AddModal callback={getFamilies} />
        <div className="tableContainer">
          {(familyData && (
            <FamilyTable
              getFamilies={getFamilies}
              familyData={familyData}
              filterQuery={searchQuery}
            />
          )) || <LogoLoader />}
        </div>
      </section>
      <footer>
        <button id='dangerToggle' onClick={()=>{
          setAreToolsVisible(!areToolsVisible)
        }}>Toggle Danger Zone</button>
        <div className={`${!areToolsVisible ? "hidden" : ""} adminWarn`}>
          <h3>!Warning! - Clicking buttons alters database irreversibly - !Warning!</h3>
          <button style={{backgroundColor: 'white', color: 'red', border: '1px solid red', cursor: 'pointer'}} onClick={removeBlanks}>Remove families without students</button>
          <button style={{backgroundColor: 'white', color: 'red', border: '1px solid red', cursor: 'pointer'}} onClick={upGrade}>Advance all students by one grade</button>
        </div>
      </footer>
    </div>
  );
}

export default App;