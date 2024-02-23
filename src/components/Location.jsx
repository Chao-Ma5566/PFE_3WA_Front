const Location = (props) => {
    const dayList = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
    
    return (
        <div className="pt-24 px-4 md:max-w-[48rem] md:mx-auto">
            <h2 className="text-center mb-12">- Nos Contact -</h2>
            <p className='text-center text-lg mb-4'>Téléphone: 2964155</p>
            <p className='text-center text-lg mb-4'>Email: contact@threebody.com</p>
            <p className='text-center text-lg mb-4'>Téléphone: 2964155</p>
            <p className='text-center text-lg mb-4'>Adress: 14 Rue Albert EJSON, 44300 Nantes</p>
            <div className="flex flex-col-reverse items-center gap-4 pb-4 mt-8 md:flex-row">
                <div className="w-96 flex flex-col items-center">
                    <h2 className="title-categories mb-8">Nos horaires</h2>
                    <table className="table-fixed w-full">
                        <tbody>
                        {dayList.map((item)=>{
                            return(
                            <tr>
                                <td className='text-center'>{item}</td>
                                <td className='text-center'>09h00 - 18h00</td>
                            </tr>
                            )
                        })}
                    </tbody>
                    </table>
                </div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43362.25003709927!2d-1.5550038294259627!3d47.21383063154298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4805ef591f291dcf%3A0x7252fec91b176e24!2sStarbucks-Nantes%20Gare!5e0!3m2!1sfr!2sfr!4v1645293570502!5m2!1sfr!2sfr"
                    width="350" height="300" className='border-0' allowfullscreen="" loading="lazy">
                </iframe>
            </div>
        </div>
    )
}

export default Location
