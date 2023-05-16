import { useState } from 'react'
import EditModal from './EditModal'
import FamilyTableRow from './FamilyTableRow'

const blankFam = {
  id: null,
  lastName: null,
  members: [],
  dateCalled: null
}

export default function FamilyTable ({callDev, devData, filterQuery}) {
    const [selectedFam, setSelectedFam] = useState(blankFam)

    function deleteFamily(e) {
      let id = e.target.tagName === "path"
                ? e.target.parentNode.parentNode.parentNode.querySelector(".dataTableId").innerHTML
                : e.target.parentNode.parentNode.querySelector(".dataTableId").innerHTML
        fetch("http://localhost:5000/families/"+id, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=UTF-8'
        }
      })
      .then(res => {
        console.log(res)
        callDev()
      })
      .catch(err => {
        console.log("Error:", err)
      })
    }

    const table = devData.sort((a,b)=>(a.id - b.id)).filter(x => x.lastName.toLowerCase().includes(filterQuery.toLowerCase())).map(fam => (
        <FamilyTableRow key={fam.id} fam={fam} setSelectedFam={setSelectedFam} deleteFamily={deleteFamily} />
      ))
      return (
        <>
          <EditModal callback={callDev} family={selectedFam}/>
          <table className='databaseTable'>
            <thead>
              <tr>
              <th>ID</th>
              <th>Last Name</th>
              <th>Members</th>
              <th>Tools</th>
              </tr>
            </thead>
            <tbody>
              {table}
            </tbody>
          </table>
        </>
      )
}