function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] gap-3">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin" aria-hidden="true" />
      <p className="text-sm text-gray-500" role="status">Loading...</p>
    </div>
  )
}

export default LoadingSpinner