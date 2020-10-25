import React, { useState, useEffect } from 'react'
import Poruka from './components/Poruka'
import Footer from './components/Footer'
import porukeServer from './services/poruke'

const App = (props) => {
  //const { poruke } = props
  const [poruke, postaviPoruke] = useState([])
  const [unosPoruke, postaviUnos] = useState("...unesi poruku")
  const [ispisiSve, postaviIspis] = useState(true)

  useEffect(() => {
    console.log("Effect hook");
    porukeServer
      .dohvatiSve()
      .then(pocPoruke => {
        console.log("Podaci su učitani");
        postaviPoruke(pocPoruke)
      })
  }, [])

  console.log("Renderirano je", poruke.length, "objekata")

  const porukeZaIspis = ispisiSve ? poruke : poruke.filter(p => p.vazno === true)

  const novaPoruka = (e) => {
    e.preventDefault()
    console.log("Klik", e.target);
    const noviObjekt = {
      sadrzaj: unosPoruke,
      datum: new Date().toISOString(),
      vazno: Math.random() > 0.5
    }
    porukeServer
      .stvori(noviObjekt)
      .then((response) => {
        console.log(response)
        postaviPoruke(poruke.concat(response.data))
        postaviUnos('')
      })

  }
  const promjenaUnosa = (e) => {
    console.log(e.target.value);
    postaviUnos(e.target.value)
  }

  const promjenaVaznostiPoruke = (id) => {
    const poruka = poruke.find(p => p.id === id)
    const novaPoruka = {
      ...poruka,
      vazno: !poruka.vazno
    }
    porukeServer
      .osvjezi(id, novaPoruka)
      .then((response) => {
        console.log(response);
        postaviPoruke(poruke.map(p => p.id !== id ? p : response.data))
      })
  }
  const brisiPoruku = (id) => {
    porukeServer
      .brisi(id)
      .then(response => {
        console.log(response);
        postaviPoruke(poruke.filter(p => p.id !== id))
      })
  }

  return (
    <div>
      <h1>Poruke</h1>
      <div>
        <button onClick={() => postaviIspis(!ispisiSve)}>
          Prikaži {ispisiSve ? "samo važne" : "sve"}
        </button>
      </div>
      <ul>
        {porukeZaIspis.map(p =>
          <Poruka
            key={p.id}
            poruka={p}
            brisiPoruku={() => brisiPoruku(p.id)}
            promjenaVaznosti={() => promjenaVaznostiPoruke(p.id)} />
        )}
      </ul>
      <form onSubmit={novaPoruka}>
        <input value={unosPoruke} onChange={promjenaUnosa} />
        <button type="submit">Spremi</button>
      </form>
      <Footer />
    </div>
  )
}

export default App