export default function Modal({
  title,
  message,
  onClose,
  onConfirm,
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  children
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
        {message && <p className="text-gray-700 mb-4">{message}</p>}
        {children && <div className="mb-4">{children}</div>}

        <div className="flex justify-end gap-3">
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-[#9a1c34] text-white hover:bg-[#801329]"
            >
              {cancelText}
            </button>
          )}
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded bg-[#9a1c34] text-white hover:bg-[#801329]"
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

