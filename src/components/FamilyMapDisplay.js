export default function FamilyMapDisplay ({onDoubleClick, filterFunc, data}) {
    return (
        <section className='display' style={{display: 'flex', flexWrap: 'wrap'}}>
          {/* <input type='search' onInput={(e)=>{setSearchQuery(e.target.value)}} placeholder='Search by Name'/> */}
          {data && data.filter(filterFunc).sort((a, b) => (a.id - b.id)).map(x => (
            <div key={x.id} className='family' onDoubleClick={onDoubleClick}>
              <h2>ID: <span className="idTag">{x.id}</span></h2>
              <h3>Family: {x.lastName}</h3>
            </div>
          ))}
      </section>
    )
}