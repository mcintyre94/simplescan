import { useEffect, useRef, useState } from "react"
import QrScanner from 'qr-scanner';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>()
  const [qrScanner, setQrScanner] = useState<QrScanner | undefined>(undefined)
  const [scannedUrl, setScannedUrl] = useState('')
  const [isScanning, setIsScanning] = useState(false)

  useEffect(() => {
    const qrScanner = new QrScanner(
      videoRef.current,
      result => {
        qrScanner.stop();
        setIsScanning(false);
        setScannedUrl(result.data);
      },
      {
        returnDetailedScanResult: true,
        highlightCodeOutline: true,
        highlightScanRegion: true,
      },
    );

    setQrScanner(qrScanner)
  }, [])

  async function startScanning() {
    if (!qrScanner) return;
    await qrScanner.start();
    setIsScanning(true);
  }

  function cancelScanning() {
    if (!qrScanner) return;
    qrScanner.stop();
    setIsScanning(false);
    setScannedUrl('');
  }

  const scannedUrlColour = isScanning ? 'text-gray-500' : 'text-white'

  return (
    <div className="max-w-5xl p-4 mx-auto ">
      <main className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
          SimpleScan
        </h1>

        <video ref={videoRef} />

        <button
          type="button"
          className="inline-flex items-center px-4 py-2 text-base font-medium text-black bg-blue-300 border border-transparent rounded-md w-fit hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={isScanning ? cancelScanning : startScanning}
        >
          {isScanning ? 'Cancel' : 'Scan!'}
        </button>

        <p className={`text-lg ${scannedUrlColour}`}>{scannedUrl}</p>
      </main>
    </div >
  )
}
