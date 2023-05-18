import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'

export default function FamilyTableRow({fam, setSelectedFam, deleteFamily}) {
    return (
        <tr className='dataTableRow'>
          <td className='dataTableId'>{fam.id}</td>
          <td>{fam.lastName}</td>
          <td className='tableCell'>
            <table>{fam.members.map((kid, i) => (
              <tbody key={i}><tr ><td>{kid.name} - Grade: {kid.grade}</td></tr></tbody>)
            )}</table>
          </td>
          <td className='cellFlex'>
            <FontAwesomeIcon icon={faPenToSquare} onClick={(e)=>{
                setSelectedFam(fam)
                document.getElementById("editModal").showModal()
                }
                }/>
            <FontAwesomeIcon icon={faTrashCan} onClick={deleteFamily}/>
          </td>
        </tr>
    )
}