import './EditModal.css';
import { useEffect } from 'react';

export default function EditModal({callback, family}) {
  
  function editFamily(e) {
    e.preventDefault();
    const names = Array.from(e.target.querySelectorAll(".memberName"));
    const grades = Array.from(e.target.querySelectorAll(".memberGrade"));
    let lastName = e.target.famName.value;
    let id = e.target.id.value;
    const updatedFam = {
      id: id,
      lastName: lastName,
      members: []
    }
    for (let i = 0; i < 4; i++) {
      names[i].value != "" && updatedFam.members.push({name: names[i].value, grade: grades[i].value === "K" ? "K" : parseInt(grades[i].value, 10)})
    }
    fetch("http://localhost:5000/families/update/"+id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(updatedFam)
    })
      .then(res => {
        console.log(res)
        e.target.reset()
        callback()
        e.target.parentNode.close()
      })
      .catch(err => {
        console.log("Error:", err)
      })
  }
  useEffect(()=>{
    document.getElementById("editfamId").value = family.id;
    document.getElementById("editfamName").value = family.lastName;
    const names = Array.from(document.querySelectorAll("#editModal .memberName"))
    const grades = Array.from(document.querySelectorAll("#editModal .memberGrade"))
    for (let i=0; i<family.members.length; i++) {
      names[i].value = family.members[i].name;
      grades[i].value = family.members[i].grade;
    }
  }, [family])

    return (
        <dialog id="editModal">
            <h2 className='formTitle'>Edit a Family:</h2>
            <form method='dialog' onSubmit={editFamily} onClose={()=>{document.getElementById("editModal").reset()}}>
                <label className='bold'>ID:
                  <input id='editfamId' name="id" maxLength='3'/>
                </label>
                <label className='bold'>Last Name:<input id="editfamName" name='famName' /></label>
                <div className='membersBox'>
                  <span className='bold'>Members:</span>
                  <div className="inputFlex">
                    <label>Child 1:<input className="memberName"/></label>
                    <label>Grade:<input list="gradeOptions" className="memberGrade" maxLength='1'/></label>
                  </div>
                  <div className="inputFlex">
                    <label>Child 2:<input className="memberName"/></label>
                    <label>Grade:<input list="gradeOptions" className="memberGrade" maxLength='1'/></label>
                  </div>
                  <div className="inputFlex">
                    <label>Child 3:<input className="memberName"/></label>
                    <label>Grade:<input list="gradeOptions" className="memberGrade" maxLength='1'/></label>
                  </div>
                  <div className="inputFlex">
                    <label>Child 4:<input className="memberName"/></label>
                    <label>Grade:<input list="gradeOptions" className="memberGrade" maxLength='1'/></label>
                  </div>
                </div>
                <button type='submit' formMethod='dialog'>Submit Changes</button>
            </form>
            <div onClick={(e)=>{
              e.preventDefault();
              e.target.parentNode.close()
              console.log("closed:",e.target.parentNode)
            }} id='editModalCancel'>X</div>
            <small className='hint'>Press ESC to cancel and close window.</small>
            <datalist id="gradeOptions">
              <option value='K'/>
              <option value='1'/>
              <option value='2'/>
              <option value='3'/>
              <option value='4'/>
              <option value='5'/>
              <option value='6'/>
              <option value='7'/>
              <option value='8'/>
            </datalist>
        </dialog>
    )
}