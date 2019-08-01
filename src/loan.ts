/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Facility } from './facility';

export class Loan {

    private _loanId: string;
    private _cusip: string;
    private _name: string;
    private _facilities: Map<string, Facility>;

    public constructor() {
        this._loanId = '';
        this._cusip = '';
        this._name = '';
        this._facilities = new Map<string, Facility>();
    }

    set loanId(id: string) {
        this._loanId = id;
    }

    get loanId(): string {
        return this._loanId;
    }

    set cusip(cusip: string) {
        this._cusip = cusip;
    }

    get cusip(): string {
        return this._cusip;
    }

    set name(name: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    public setFacility(facility: Facility) {
        this._facilities.set(facility.facilityId, facility);
    }

    public toString(): string {
        const loan_obj = Object.create(null);
        loan_obj['LoanId'] = this.loanId;
        loan_obj['Cusip'] = this.cusip;
        loan_obj['Name'] = this.name;
        for (let [key, value] of this._facilities) {
            loan_obj[key] = value.toString();
        }
        return JSON.stringify(loan_obj);
    }

    public fromString(loanStr: string) {
        //console.log('loanStr=' + loanStr);
        const loan_obj = JSON.parse(loanStr);
        this.loanId = loan_obj['LoanId'];
        this.cusip = loan_obj['Cusip'];
        this.name = loan_obj['Name'];
        for (const key of Object.keys(loan_obj)) {
            if (key.startsWith('slf_')) {
                //console.log('Facility[' + key + ']=' + loan_obj[key]);
                const facility = new Facility();
                facility.fromString(loan_obj[key]);
                this.setFacility(facility);
            }
        }
    }

}
