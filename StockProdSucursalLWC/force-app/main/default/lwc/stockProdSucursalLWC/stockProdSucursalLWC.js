import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getServiceData from '@salesforce/apex/StockProductSucursal.callStockproductService';

import BUTTON_SERVICE_LABEL from '@salesforce/label/c.ButtonStockProductServiceLabel';
import MODAL_TITLE from '@salesforce/label/c.ModalTitleStockProductLabel';

const columns = [       
    { label: 'Nombre Sucursal', fieldName: 'nombreSucursal'},
    { label: 'Sucursal', fieldName: 'sucursal'},
    { label: 'Stock', fieldName: 'stock'},
    { label: 'Unidad', fieldName: 'unidad'},
];

export default class StockProdSucursalLWC extends LightningElement {
    @api recordId;
    label = {
        buttonLabel : BUTTON_SERVICE_LABEL,
        modalTitle : MODAL_TITLE
    };
    columns = columns;
    serviceData = []; 
    isModalOpen = false;
    showSpinner = false;


    openModal(){
        this.isModalOpen = true;
        this.showSpinner = true;
        getServiceData({ recordId: this.recordId}).then(
            result => {
                this.serviceData = result;
                this.showSpinner = false; 
            })
            .catch(error => {
                this.toastMessage('Error', error.body.message, 'error');
                this.showSpinner = false;
                this.isModalOpen = false;
            }
        );
    }

    closeModal(){
        this.isModalOpen = false;
        serviceData = [];
    }

    toastMessage(title, message, variant){
        const toastEvent = new ShowToastEvent({ title, message, variant });
        this.dispatchEvent(toastEvent);
    }
}
