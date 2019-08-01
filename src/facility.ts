/*
 * SPDX-License-Identifier: Apache-2.0
 */

export enum FacilityType {
    UNDEF = 'UNDEF',
    LETTER_OF_CREDIT = 'LETTER_OF_CREDIT',
    SWING_LINE = 'SWING_LINE',
    TERM_LOAN = 'TERM_LOAN'
}

export class Facility {

    private _facilityId: string;
    private _facilityType: FacilityType;
    private _amount: number;
    private _lenderPercents: Map<string, number>;

    public constructor() {
        this._facilityId = '';
        this._facilityType = FacilityType.UNDEF;
        this._amount = 0;
        this._lenderPercents = new Map<string, number>();
    }

    set facilityId(id: string) {
        this._facilityId = id;
    }

    get facilityId(): string {
        return this._facilityId;
    }

    set facilityType(type: FacilityType) {
        this._facilityType = type;
    }

    get facilityType(): FacilityType {
        return this._facilityType;
    }

    set amount(amount: number) {
        this._amount = amount;
    }

    get amount(): number {
        return this._amount;
    }

    public setLender(lenderId: string, lenderPercent: number) {
        this._lenderPercents.set(lenderId, lenderPercent);
    }

    public toString(): string {
        const facility_obj = Object.create(null);
        facility_obj['FacilityId'] = this.facilityId;
        facility_obj['FacilityType'] = this.facilityType;
        facility_obj['Amount'] = this.amount;
        for (let [key, value] of this._lenderPercents) {
            facility_obj[key] = value;
        }
        return JSON.stringify(facility_obj);
    }

    public fromString(facilityStr: string) {
        //console.log('facilityStr=' + facilityStr)
        const facility_obj = JSON.parse(facilityStr);
        this.facilityId = facility_obj['FacilityId'];
        this.facilityType = facility_obj['FacilityType'];
        this.amount = facility_obj['Amount'];
        for (const key of Object.keys(facility_obj)) {
            //console.log('Participant[' + key + ']=' + facility_obj[key]);
            if (key.startsWith('slp_')) {
                this.setLender(key, facility_obj[key]);
            }
        }
    }
}
