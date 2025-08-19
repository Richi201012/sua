export default function Recomendaciones() {
  return (
    <div className="bg-yellow-50 p-4 rounded-md text-sm text-gray-800">
      <p className="font-semibold">Recomendaciones:</p>
      <ul className="list-disc ml-6 mt-1 space-y-1">
        <li>Verifica que la imagen se vea clara</li>
        <li>Si son varias hojas deben ir agrupadas en un solo archivo PDF</li>
        <li>Solo se aceptan formatos PDF</li>
        <li>El peso máximo del documento es de 10MB</li>
      </ul>
    </div>
  )
}
