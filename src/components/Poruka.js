import React from 'react'

const Poruka = ({ poruka, promjenaVaznosti, brisiPoruku }) => {
    const oznaka = poruka.vazno ? "Označi kao nevažno" : "Označi kao važno"
    return (
        <li className="poruka">
            {poruka.sadrzaj}
            <button onClick={promjenaVaznosti}>{oznaka}</button>
            <button onClick={brisiPoruku}>-</button>
        </li>
    )
}

export default Poruka