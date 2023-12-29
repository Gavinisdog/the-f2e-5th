export interface Location {
  area_code: string;
  area_name: string;
  city_code: string;
  dept_code: string;
  li_code: string;
  prv_code: string;
  ris_area_code: string;
  ris_city_code: string;
  ris_dept_code: string;
  ris_prv_code: string;
}

export interface Ticket extends Location {
  cand_birthyear: string;
  cand_edu: string;
  cand_id: number;
  cand_name: string;
  cand_no: number;
  cand_sex: string;
  is_current: string;
  is_vice: string;
  is_victor: string;
  party_code: number;
  party_name: string;
  tbox_no: string;
  ticket_num: number;
  ticket_percent: number;
}

export interface CandidatePair {
  areaCode: string;
  areaName: string;
  candidateNo: number;
  partyCode: number;
  partyName: string;
  presidentName: string;
  ticketPercent: number;
  ticketQty: number;
  vicePresidentName: string;
}

export interface CandidateWinner {
  areaCode: string;
  areaName: string;
  winnerParty: string;
  winnerColor: string;
}
