export default function KidMapDisplay ({room, data}) {

  const filters = {
    'Kindergarten': (x) => {return (x.grade === "K")},
    '1st & 2nd Grade': (x) => {return (x.grade === "1" || x.grade === "2")},
    '3rd & 4th Grade': (x) => {return (x.grade === "3" || x.grade === "4")},
    '5th & 6th Grade': (x) => {return (x.grade === "5" || x.grade === "6")},
    '7th & 8th Grade': (x) => {return (x.grade === "7" || x.grade === "8")},
  }
    function onDoubleClick(e, id, name) {
      e.target.classList.add("collected");
      fetch("https://ride-call-maa.herokuapp.com/families/collect/" + id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
        'Authorization': JSON.parse(sessionStorage.getItem("rideCallKey"))
      },
      body: JSON.stringify({
        name: name,
        date: new Date().toDateString()
      })
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    return (
        <section className='display' style={{display: 'flex', flexWrap: 'wrap'}}>
          {data && data.filter(filters[room]).sort((a, b) => (a.id - b.id)).map(x => (
            <div key={x.name+x.id} className='calledStudent' onDoubleClick={(e) => {onDoubleClick(e, x.id, x.name)}}>
              <h2 className="idTag">{x.id}</h2>
              <h3>{x.name}</h3>
            </div>
          ))}
      </section>
    )
}