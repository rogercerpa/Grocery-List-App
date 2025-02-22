import React, { useEffect, useCallback, useState } from 'react';
import Quagga from 'quagga';
import { QrCodeIcon } from "@heroicons/react/24/outline";

const BarcodeScanner = ({ onProductFound }) => {
  const [isQuaggaRunning, setIsQuaggaRunning] = useState(false);

  const handleBarcodeDetected = useCallback(
    async (data) => {
      if (data?.codeResult?.code) {
        const barcode = data.codeResult.code;
        const productName = await fetchProductData(barcode);
        if (productName) {
          onProductFound(productName);
        } else {
          console.warn("Product not found for barcode:", barcode);
        }
        stopScanner();
      }
    },
    [onProductFound]
  );

  const fetchProductData = async (barcode) => {
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      const data = await response.json();
      if (data.status === 1) {
        return data.product.product_name;
      } else {
        console.warn("Product not found!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  };

  const stopScanner = () => {
    if (isQuaggaRunning) {
      Quagga.stop();
      Quagga.offDetected(handleBarcodeDetected);
      setIsQuaggaRunning(false);
    }
  };

  const startScanner = async () => {
    // Check if already running
    if (isQuaggaRunning) {
      stopScanner();
      return;
    }

    // Request camera permission
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      stream.getTracks().forEach(track => track.stop()); // Stop the stream after permission check
    } catch (err) {
      alert("Camera access denied or unavailable. Please allow camera permissions.");
      console.error("Camera permission error:", err);
      return;
    }

    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: document.querySelector('#scanner-container'), // Ensure there's a target
          constraints: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: "environment", // Rear camera, with fallback
          },
        },
        decoder: {
          readers: ["ean_reader", "ean_8_reader", "code_39_reader", "codabar_reader", "upc_reader", "upc_e_reader"],
        },
      },
      (err) => {
        if (err) {
          console.error("Quagga initialization failed:", err);
          alert("Failed to start barcode scanner. Check console for details.");
          return;
        }
        Quagga.start();
        setIsQuaggaRunning(true);
      }
    );

    Quagga.onDetected(handleBarcodeDetected);
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div>
      <button
        onClick={startScanner}
        className="flex items-center justify-center p-1 bg-gray-200 rounded hover:bg-gray-300 w-6 h-6"
        aria-label="Start Barcode Scanner"
      >
        <QrCodeIcon className="h-4 w-4 text-gray-500" />
      </button>
      {isQuaggaRunning && (
        <div id="scanner-container" className="fixed inset-0 z-50 bg-black">
          <button
            onClick={stopScanner}
            className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
