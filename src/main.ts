import { Loan } from './loan';
import { FacilityType, Facility } from './facility';

function createLoan(loanId: string, cusip: string, name: string): Loan {
    const facility_a = new Facility();
    facility_a.facilityId = 'slf_a';
    facility_a.facilityType = FacilityType.TERM_LOAN;
    facility_a.amount = 1000000000;
    facility_a.setLender('slp_1', 30);
    facility_a.setLender('slp_2', 30);
    facility_a.setLender('slp_3', 40);

    const facility_b = new Facility();
    facility_b.facilityId = 'slf_b';
    facility_b.facilityType = FacilityType.SWING_LINE;
    facility_b.amount = 200000000;
    facility_b.setLender('slp_1', 50);
    facility_b.setLender('slp_2', 50);

    const facility_c = new Facility();
    facility_c.facilityId = 'slf_c';
    facility_c.facilityType = FacilityType.LETTER_OF_CREDIT;
    facility_c.amount = 250000000;
    facility_c.setLender('slp_1', 50);
    facility_c.setLender('slp_2', 50);

    const loan = new Loan();
    loan.loanId = loanId;
    loan.cusip = cusip;
    loan.name = name;
    loan.setFacility(facility_a);
    loan.setFacility(facility_b);
    loan.setFacility(facility_c);

    return loan;
}

function createLoanFromString(loanStr: string): Loan {
    const loan = new Loan();
    loan.fromString(loanStr);
    return loan;
}

const loan = createLoan('SyncLoan456', '123456789', 'Test loan #456');
const loan_str = loan.toString();
console.log('Loan=' + loan_str);

let loan_str2 = "{\"FacilityA\":\"{\\\"FacilityId\\\":\\\"FacilityA\\\",\\\"Amount\\\":1000000000,\\\"Lender1\\\":30,\\\"Lender2\\\":30,\\\"Lender3\\\":40}\",\"FacilityB\":\"{\\\"FacilityId\\\":\\\"FacilityB\\\",\\\"Amount\\\":200000000,\\\"Lender1\\\":50,\\\"Lender2\\\":50}\",\"LoanId\":\"SyncLoan456\"}";
const re = /\\\\\\/gi;
//loan_str2 = loan_str2.replace(re, '\\'); // Replace "\\\" with "\".
const loan2 = createLoanFromString(loan_str);
console.log('Loan2=' + loan2.toString());