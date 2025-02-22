import React, { useEffect, useCallback, useState } from 'react';
import Quagga from 'quagga';
import { QrCodeIcon } from "@heroicons/react/24/outline";

const BarcodeScanner = ({ onProductFound }) => {
  const [isQuaggaRunning, setIsQuaggaRunning] = useState(false);

  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  const handleBarcodeDetected = useCallback(async (data) => {
    if (data && data.codeResult) {
      const barcode = data.codeResult.code;
      const productName = await fetchProductData(barcode);
      if (productName) {
        onProductFound(productName);
      } else {
        console.warn("Product not found for barcode:", barcode);
      }
      if (isQuaggaRunning) {
        Quagga.stop();
        setIsQuaggaRunning(false);
      }
    }
  }, [onProductFound, isQuaggaRunning]);

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

  const startScanner = () => {
    if (!isMobileDevice()) {
      alert("Barcode scanning is only available on mobile devices.");
      return;
    }

    Quagga.init({
      inputStream: {
        type: "LiveStream",
        constraints: {
          width: 640,
          height: 480,
          facingMode: "environment"
        }
      },
      decoder: {
        readers: ["ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader", "upc_e_reader"]
      },
    }, (err) => {
      if (err) {
        console.error("Error initializing Quagga:", err);
        return;
      }
      Quagga.start();
      setIsQuaggaRunning(true);
    });

    Quagga.onDetected(handleBarcodeDetected);
  };

  useEffect(() => {
    return () => {
      if (isQuaggaRunning) {
        Quagga.stop();
        Quagga.offDetected(handleBarcodeDetected);
        setIsQuaggaRunning(false);
      }
    };
  }, [handleBarcodeDetected, isQuaggaRunning]);

  return (
    <button 
      onClick={startScanner} 
      className="flex items-center justify-center p-2 bg-gray-200 rounded hover:bg-gray-300"
      aria-label="Start Barcode Scanner"
    >
      <QrCodeIcon className="h-6 w-6 text-gray-500" />
    </button>
  );
}

export default BarcodeScanner;
