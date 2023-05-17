import { useEffect, useState } from "react";
import "./App.css";
import AddModal from "../components/AddModal";
import FamilyTable from "../components/FamilyTable";
import PageHeader from "../components/PageHeader";
import LogoLoader from "../components/LogoLoader";

function App() {
  const [familyData, setFamilyData] = useState(null);
  // const [ids, setIDs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  function getFamilies() {
    fetch("https://ride-call-maa.herokuapp.com/families")
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
    </div>
  );
}

export default App;
