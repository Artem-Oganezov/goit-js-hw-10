
import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.form')
const btn = document.querySelector('.btn_create');
const fulfilled = document.querySelector('input[value="fulfilled"]');
const rejected = document.querySelector('input[value="rejected"]');
 
 

form.addEventListener('submit', (eve) => {
    eve.preventDefault();
    const inputDelay = document.querySelector('input[name="delay"]');
    const delay = Number(inputDelay.value);
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (fulfilled.checked) {
                resolve(delay)
            } else if (rejected.checked) {
                reject(delay)
            }
        }, delay);
    });

    promise.then((result) => {
        iziToast.success({
            position: "topRight",
            message: `Fulfilled promise in ${result}ms`,
        });
    }).catch((err) => {
        iziToast.error({
            position: "topRight",
            message: `Rejected promise in ${err}ms`,
        });
    });
});
   
