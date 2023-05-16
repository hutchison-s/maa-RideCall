import {useEffect, useState} from 'react';
import './App.css'
import AddModal from '../components/AddModal';
import FamilyTable from '../components/FamilyTable';
import PageHeader from '../components/PageHeader';
import LogoLoader from '../components/LogoLoader';

function App() {
  const [devData, setDevData] = useState(null);
  const [ids, setIDs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  function callDev() {
    fetch("http://localhost:5000/families")
      .then(response => response.json())
      .then(body => {
        const availableIDs = []
        for (let x of body) {
          availableIDs.push(x.id)
        }
        setIDs(availableIDs)
        setDevData(body)
      })
      .catch((err) => {
        console.log("Couldn't Process Request. Error: "+err)
      })
  }

  useEffect(()=>{
    callDev()
  }, [])

  return (
    <div className="App">
      <PageHeader title='MAA Ride Call Database Management' />
      <section className='flexReg'>
        <div id='search' style={{flex: '100%', textAlign: 'center'}}>
          <label htmlFor='nameSearch'>Search by Last Name:</label>
          <input name='nameSearch' type='search' onInput={(e)=>{setSearchQuery(e.target.value)}} />
          <br></br>
          <button id='addFamButton' onClick={()=>{document.getElementById("addModal").showModal()}}>Add Family</button>
          <hr></hr>
        </div>
        <AddModal callback={callDev} />
        <div className='tableContainer'>
          
        {devData && <FamilyTable callDev={callDev} devData={devData} filterQuery={searchQuery}/> || <LogoLoader />}
        </div>
      </section>
    </div>
  );
}

export default App;
