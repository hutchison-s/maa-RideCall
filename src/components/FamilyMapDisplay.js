export default function FamilyMapDisplay ({onDoubleClick, filterFunc, data}) {
    return (
        <section className='display' style={{display: 'flex', flexWrap: 'wrap'}}>
          
          {data && data.filter(filterFunc).sort((a, b) => (a.id - b.id)).map(x => (
            <div key={x.id} className='family' onDoubleClick={onDoubleClick}>
              <div className='backFill' style={{width: `${(200 / x.members.length) * (x.members.filter(kid => (kid?.dateCollected === new Date().toDateString())).length)}px`}}></div>
              <div className='familyText'>
                <h2>ID: <span className="idTag">{x.id}</span></h2>
                <h3>Family: {x.lastName}</h3>
              </div>
            </div>
          ))}
      </section>
    )
}

// 