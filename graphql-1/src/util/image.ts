import React from "react";

export const generateBase64FromImage = (imageFile: Blob) => {
  const reader = new FileReader();
  const promise = new Promise((resolve, reject) => {

      reader.onload = (e) => {
        if (e.target !== null) {

          resolve(e.target.result)};
        }
        reader.onerror = err => reject(err);
  });

  reader.readAsDataURL(imageFile);
  return promise;
};
