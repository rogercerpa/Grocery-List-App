import React from 'react';
import Quagga from 'quagga';
import { QrCodeIcon } from "@heroicons/react/24/outline";

const BarcodeScanner = ({ onProductFound }) => {
  
  // const startScanner = () => {
  //   Quagga.init({
  //   inputStream: {
  //   type: "LiveStream",
  //   constraints: {
  //   width: 640,
  //   height: 480,
  //   facingMode: "environment"
  //   }
  //   },
  //   decoder: {
  //   readers: ["ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader", "upc_e_reader"]
  //   },
  //   }, (err) => {
  //   if (err) {
  //   console.error(err);
  //   return;
  //   }
  //   Quagga.start();
  //   });
    
  //   Quagga.onDetected(handleBarcodeDetected);
  //   };
    
  //   const handleBarcodeDetected = async (data) => {
  //   if (data && data.codeResult) {
  //   const barcode = data.codeResult.code;
  //   const productName = await fetchProductData(barcode);
  //   if (productName) {
  //   onProductFound(productName);
  //   }
  //   } else {
  //   return;
  //   }
    
  //   Quagga.stop();
  //   };
  

  // const fetchProductData = async (barcode) => {
  //   try {
  //     const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
  //     const data = await response.json();
  //     if (data.status === 1) {
  //       return data.product.product_name;
  //     } else {
  //       console.error("Product not found!");
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Error fetching product:", error);
  //     return null;
  //   }
  // };

  // React.useEffect(() => {
  //   return () => {
  //     Quagga.stop();
  //   };
  // }, []);

  return (
    <button 
    // onClick={startScanner}
      className=""
    >
      <QrCodeIcon  className="h-6 w-6 text-gray-500"/>
    </button>
  );
}

export default BarcodeScanner;
