
const ConfirmationWindow = ({isOpen, deleteFunction, name}) =>{
    
    
    return (
        <div
          className={`fixed inset-0`}
        >
          <div onClick={isOpen} className="bg-gray-900 opacity-80 -z-50 w-full h-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-md p-8 w-96">
            <button
              className="absolute top-2 right-2 px-2 text-gray-400 hover:bg-primary focus:outline-none"
              onClick={isOpen}
            >
              X
            </button>
            <h5 className="text-lg mb-6 text-center text-gray-900">
              Vous êtes sûr que vous voulez supprimer {name} ?
            </h5>
            <div className="flex justify-center">
              <button
                className="py-2 px-6 rounded bg-primary text-white mr-4"
                onClick={deleteFunction}
              >
                Oui
              </button>
              <button
                className="py-2 px-6 rounded bg-gray-900 text-white"
                onClick={isOpen}
              >
                Non
              </button>
            </div>
          </div>
        </div>
        )
}

export default ConfirmationWindow