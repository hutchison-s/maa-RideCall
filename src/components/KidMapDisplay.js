export default function KidMapDisplay ({onDoubleClick, room, data}) {

  const filters = {
    'Kindergarten': (x) => {return (x.grade === "K")},
    '1st & 2nd Grade': (x) => {return (x.grade === "1" || x.grade === "2")},
    '3rd & 4th Grade': (x) => {return (x.grade === "3" || x.grade === "4")},
    '5th & 6th Grade': (x) => {return (x.grade === "5" || x.grade === "6")},
    '7th & 8th Grade': (x) => {return (x.grade === "7" || x.grade === "8")},
  }

    return (
        <section className='display' style={{display: 'flex', flexWrap: 'wrap'}}>
          {/* <input type='search' onInput={(e)=>{setSearchQuery(e.target.value)}} placeholder='Search by Name'/> */}
          {data && data.filter(filters[room]).sort((a, b) => (a.id - b.id)).map(x => (
            <div key={x.name+x.id} className='family' onDoubleClick={onDoubleClick}>
              <h2 className="idTag">{x.id}</h2>
              <h3>{x.name}</h3>
            </div>
          ))}
      </section>
    )
}