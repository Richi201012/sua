export default function FileUploader({ archivo, isLoading, onChange, disabled }) {
  return (
    <div className="border border-gray-300 rounded p-4 flex justify-between items-center">
      <span className="font-semibold">Documento de solicitud</span>
      <div className="flex items-center gap-2">
        <label
          htmlFor="fileUpload"
          className={`bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded cursor-pointer flex items-center gap-1 ${
            disabled ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          📤 Cargar
        </label>
        <input
          id="fileUpload"
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={onChange}
          disabled={disabled}
        />
        {isLoading ? (
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="animate-spin h-5 w-5 text-[#9a1c34]" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <span>Cargando PDF...</span>
          </div>
        ) : (
          archivo && <span className="text-sm text-gray-700 truncate max-w-[240px]">{archivo.name}</span>
        )}
      </div>
    </div>
  )
}
