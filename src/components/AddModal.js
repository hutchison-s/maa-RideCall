import './AddModal.css';
export default function AddModal({callback}) {
  
  function addFamily(e) {
    e.preventDefault();
    const names = Array.from(e.target.querySelectorAll(".memberName"));
    const grades = Array.from(e.target.querySelectorAll(".memberGrade"));
    let lastName = e.target.famName.value;
    let id = e.target.id.value;
    const updatedFam = {
      id: id,
      lastName: lastName,
      members: [],
      dateCalled: ""
    }
    for (let i = 0; i < 4; i++) {
      names[i].value !== "" && updatedFam.members.push({name: names[i].value, grade: grades[i].value === "K" ? "K" : parseInt(grades[i].value, 10)})
    }
    fetch("https://ride-call-maa.herokuapp.com/families/add", {
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

    return (
        <dialog id="addModal">
            <h2 className='formTitle'>Add a Family:</h2>
            <form method='dialog' onSubmit={addFamily} onClose={()=>{document.getElementById("addModal").reset()}}>
                <label className='bold'>ID:
                  <input id='famId' name="id" maxLength='3'/>
                </label>
                <label className='bold'>Last Name:<input id="famName" name='famName' /></label>
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
            }} id='addModalCancel'>X</div>
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