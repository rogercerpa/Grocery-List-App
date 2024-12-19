import React, { useEffect, useCallback } from 'react';
import Quagga from 'quagga';
import { QrCodeIcon } from "@heroicons/react/24/outline";

const BarcodeScanner = ({ onProductFound }) => {
  const handleBarcodeDetected = useCallback(async (data) => {
    if (data && data.codeResult) {
      const barcode = data.codeResult.code;
      const productName = await fetchProductData(barcode);
      if (productName) {
        onProductFound(productName);
      }
      Quagga.stop();
    }
  }, [onProductFound]);

  const fetchProductData = async (barcode) => {
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      const data = await response.json();
      if (data.status === 1) {
        return data.product.product_name;
      } else {
        console.error("Product not found!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  };

  const startScanner = () => {
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
    });

    Quagga.onDetected(handleBarcodeDetected);
  };

  useEffect(() => {
    return () => {
      if (Quagga) {
        Quagga.stop();
        Quagga.offDetected(handleBarcodeDetected);
      }
    };
  }, [handleBarcodeDetected]);

  return (
    <button onClick={startScanner} className="flex items-center justify-center p-2 bg-gray-200 rounded hover:bg-gray-300">
      <QrCodeIcon className="h-6 w-6 text-gray-500" />
    </button>
  );
}

export default BarcodeScanner;
