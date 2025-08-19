import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const STATUS_STYLES = {
  NUEVO: 'bg-blue-100 text-blue-700',
  'EN PROCESO': 'bg-yellow-100 text-yellow-800',
  ATENDIDO: 'bg-green-100 text-green-700',
  CANCELADO: 'bg-red-100 text-red-700'
}

function Badge({ status }) {
  const cls = STATUS_STYLES[status] || 'bg-gray-100 text-gray-700'
  return <span className={`px-2 py-0.5 text-xs rounded ${cls}`}>{status}</span>
}

export default function BandejaPage() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('TODOS')
  const [items, setItems] = useState([])
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem('solicitudes')
    if (!raw) {
      setItems([])
      return
    }
    try {
      const data = JSON.parse(raw)
      setItems(Array.isArray(data) ? data : [])
    } catch {
      setItems([])
    }
  }, [])

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    return items.filter((it) => {
      const hitQ = !term ||
        it.folio?.toLowerCase().includes(term) ||
        it.nombre?.toLowerCase().includes(term) ||
        it.alcaldia?.toLowerCase().includes(term)
      const hitS = status === 'TODOS' || it.status === status
      return hitQ && hitS
    })
  }, [items, q, status])

  const confirmarEliminar = () => {
    const next = items.filter(i => i.folio !== deleting?.folio)
    setItems(next)
    localStorage.setItem('solicitudes', JSON.stringify(next))
    setDeleting(null)
  }

  return (
    <>
   
      {deleting && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
    <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center shadow-lg">
      <h2 className="text-lg font-bold text-[#9a1c34] ">¿Eliminar solicitud?</h2>
      <p className="text-gray-600 mt-2">
        Esta acción no se puede deshacer. Folio: <strong>{deleting.folio}</strong>
      </p>
      <div className="mt-4 flex justify-center gap-3">
        <button
          onClick={() => setDeleting(null)}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          Cancelar
        </button>
        <button
          onClick={confirmarEliminar}
          className="px-4 py-2 rounded bg-[#9a1c34]  text-white hover:bg-[#9a1c34] "
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
)}


      <section className="w-full">
        <div className="max-w-7xl mx-auto px-6 pt-2">
          {/* Controles */}
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Buscar por folio, nombre o alcaldía..."
                  className="w-72 border rounded px-3 py-2 text-sm"
                />
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="border rounded px-3 py-2 text-sm"
                >
                  <option value="TODOS">Todos los estatus</option>
                  <option value="NUEVO">Nuevo</option>
                  <option value="EN PROCESO">En proceso</option>
                  <option value="ATENDIDO">Atendido</option>
                  <option value="CANCELADO">Cancelado</option>
                </select>
              </div>

              <button
                onClick={() => navigate('/public-request')}
                className="bg-[#9a1c34] text-white px-4 py-2 rounded hover:bg-[#7c1228]"
              >
                + Nueva solicitud
              </button>
            </div>
          </div>

          {/* Grid de tarjetas */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              Sin resultados
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(row => (
                <article key={row.folio} className="bg-white rounded-lg shadow p-4 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{row.folio}</h3>
                      <p className="text-xs text-gray-500">
                        {row.fecha ? new Date(row.fecha).toLocaleDateString() : '—'}
                      </p>
                    </div>
                    <Badge status={row.status} />
                  </div>

                  <div className="text-sm text-gray-800 space-y-1">
                    <p><span className="font-medium">Nombre:</span> {row.nombre || '—'}</p>
                    <p><span className="font-medium">Alcaldía:</span> {row.alcaldia || '—'}</p>
                    <p><span className="font-medium">Tipo:</span> {row.tipo || '—'}</p>
                  </div>

                  <div className="mt-2 flex justify-end gap-2">
                    <button
  onClick={() => navigate(`/detalle/${row.folio}`)}
  className="px-3 py-1.5 border rounded hover:bg-gray-50 text-sm"
>
  Ver
</button>
                   <button
  onClick={() => navigate(`/editar/${row.folio}`)}
  className="px-3 py-1.5 border rounded hover:bg-gray-50 text-sm"
>
  Editar
</button>
                    <button
                      onClick={() => setDeleting(row)}
                      className="px-3 py-1.5 border border-red-300 text-red-700 rounded hover:bg-red-50 text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Botón abajo */}
          <div className="flex justify-center mt-8 mb-2">
            <button
              onClick={() => navigate('/menu-principal')}
              className="px-5 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              ← Regresar al principal
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
