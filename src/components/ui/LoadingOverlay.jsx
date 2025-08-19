export default function LoadingOverlay({ text }) {
  return (
    <div className="fixed inset-0 z-60 flex flex-col items-center justify-center backdrop-blur-sm bg-white/30">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#9a1c34] mb-4"></div>
      <p className="text-[#9a1c34] text-lg font-semibold">{text}</p>
    </div>
  )
}
