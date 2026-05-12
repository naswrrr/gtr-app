export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-surface">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-surface-dark border-t-primary"></div>
        <p className="text-lg font-medium text-navy">Memuat halaman...</p>
      </div>
    </div>
  );
}
