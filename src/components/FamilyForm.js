export default function FamilyForm({title, onSubmit}) {
    return (
        <>
            <h2>{title}</h2>
            <form onSubmit={onSubmit}>
                <label>ID:
                  <input id='famId' name="id" />
                </label><br></br>
                <label>Last Name:<input id="famName" name='newName' /></label>
                <div>
                  Members:
                  <div className="inputFlex">
                    <label>Child 1:<input className="memberName"/></label>
                    <label>Grade:<input list="gradeOptions" className="memberGrade" /></label>
                  </div>
                  <div className="inputFlex">
                    <label>Child 2:<input className="memberName"/></label>
                    <label>Grade:<input list="gradeOptions" className="memberGrade" /></label>
                  </div>
                  <div className="inputFlex">
                    <label>Child 3:<input className="memberName"/></label>
                    <label>Grade:<input list="gradeOptions" className="memberGrade" /></label>
                  </div>
                  <div className="inputFlex">
                    <label>Child 4:<input className="memberName"/></label>
                    <label>Grade:<input list="gradeOptions" className="memberGrade" /></label>
                  </div>
                </div>
                <button type='Submit'>Submit Changes</button>
            </form>
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
        </>
    )
}