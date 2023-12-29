import axios from "@/services/axios";
import { AxiosError } from "axios";
import { Ref, ref, watchEffect } from "vue";

import theme from "@/assets/data/theme.json";
import colors from "@/assets/data/color.json";

import type { Location, Ticket, CandidatePair, CandidateWinner } from "@/types";

const getAreaCode = (data?: Location) => {
  return `${data?.prv_code}_${data?.city_code}_${data?.area_code}_${data?.dept_code}_${data?.li_code}`;
};

const uniqueArray = (list: Array<any>) => {
  return list.reduce((previous, current) => {
    if (!previous.includes(current)) {
      previous.push(current);
    }
    return previous;
  }, []);
};

const getCandidateData = (tickets: Array<Ticket>): Array<CandidatePair> => {
  const candidateList = uniqueArray(tickets.map((data) => data.cand_no));
  const candidatePair = candidateList.map((candidateNo: number) => {
    const president = tickets.find(
      (data) => data.cand_no === candidateNo && data.is_vice !== "Y"
    );
    const vicePresident = tickets.find(
      (data) => data.cand_no === candidateNo && data.is_vice === "Y"
    );
    return {
      candidateNo,
      areaCode: getAreaCode(president) || "",
      areaName: president?.area_name || "",
      presidentName: president?.cand_name || "",
      vicePresidentName: vicePresident?.cand_name || "",
      partyName: president?.party_name || "",
      partyCode: president?.party_code || 0,
      partyColor: colors.find((party) => party.party_name === president?.party_name),
      ticketQty: president?.ticket_num || 0,
      ticketPercent: president?.ticket_percent || 0,
    };
  });
  return candidatePair;
};

const getTicketsData = (cities: Array<Location>, cityTickets: Array<Ticket>) => {
  const cityWinner = cities.map((city) => {
    const areaCode = getAreaCode(city);
    const areaName = city.area_name;
    const tickets = cityTickets.filter((ticketBox) => ticketBox.area_name === areaName);
    const winner = tickets.sort((a, b) => {
      return b.ticket_num - a.ticket_num;
    })[0];
    const winnerColor =
      colors.find((party) => party.party_name === winner.party_name)?.color_code || "ccc";
    return {
      areaCode,
      areaName,
      winnerParty: winner.party_name,
      winnerColor,
    };
  });
  return cityWinner;
};

export const getElectionData = () => {
  // 選舉年份
  const themes = theme[0].theme_items;
  const cities: Ref<Array<Location>> = ref([]);
  const districts: Ref<Array<Location>> = ref([]);
  const lanes: Ref<Array<Location>> = ref([]);
  const selectedThemeId: Ref<string> = ref(theme[0].theme_items[0].theme_id);
  const selectedCityId: Ref<string> = ref("");
  const selectedDistrictId: Ref<string> = ref("");
  const selectedLaneId: Ref<string> = ref("");
  const nationTickets: Ref<Array<Ticket>> = ref([]);
  const cityTickets: Ref<Array<Ticket>> = ref([]);
  const districtTickets: Ref<Array<Ticket>> = ref([]);
  const laneTickets: Ref<Array<Ticket>> = ref([]);
  const nationCandidateData: Ref<Array<CandidatePair>> = ref([]);
  const cityCandidateData: Ref<Array<CandidatePair>> = ref([]);
  const districtCandidateData: Ref<Array<CandidatePair>> = ref([]);
  const laneCandidateData: Ref<Array<CandidatePair>> = ref([]);
  const cityTicketsData: Ref<Array<CandidateWinner>> = ref([]);
  const districtTicketsData: Ref<Array<CandidateWinner>> = ref([]);
  const laneTicketsData: Ref<Array<CandidateWinner>> = ref([]);

  const resetSelectedId = () => {
    selectedCityId.value = "";
    selectedDistrictId.value = "";
    selectedLaneId.value = "";
  };
  watchEffect(async () => {
    const response = await axios.get(
      `/areas/ELC/P0/00/${selectedThemeId.value}/C/00_000_00_000_0000.json`
    );
    if (!(response instanceof AxiosError)) {
      cities.value = [];
      // 縣市行政區
      cities.value = response.data["00_000_00_000_0000"];
    } else {
      console.log(response);
      resetSelectedId();
    }
  });

  watchEffect(async () => {
    if (!selectedThemeId.value) return;
    const response = await axios.get(
      `/tickets/ELC/P0/00/${selectedThemeId.value}/N/00_000_00_000_0000.json`
    );
    if (!(response instanceof AxiosError)) {
      // 年度全國得票
      nationTickets.value = response.data["00_000_00_000_0000"];
      nationCandidateData.value = getCandidateData(nationTickets.value);
    } else {
      console.log(response);
      resetSelectedId();
    }

    const reply = await axios.get(
      `/tickets/ELC/P0/00/${selectedThemeId.value}/C/00_000_00_000_0000.json`
    );
    if (!(reply instanceof AxiosError)) {
      // 年度全行政區得票
      cityTickets.value = reply.data["00_000_00_000_0000"];
      cityCandidateData.value = getCandidateData(cityTickets.value);
      cityTicketsData.value = getTicketsData(cities.value, cityTickets.value);
    } else {
      console.log(reply);
      resetSelectedId();
    }
  });

  watchEffect(async () => {
    if (!selectedThemeId.value || !selectedCityId.value) return;
    const response = await axios.get(
      `/areas/ELC/P0/00/${selectedThemeId.value}/D/${selectedCityId.value}.json`
    );
    if (!(response instanceof AxiosError)) {
      districts.value = response.data[selectedCityId.value];
      selectedDistrictId.value = getAreaCode(districts.value[0]);
    } else {
      console.log(response);
      resetSelectedId();
    }

    const reply = await axios.get(
      `/tickets/ELC/P0/00/${selectedThemeId.value}/D/${selectedCityId.value}.json`
    );
    if (!(reply instanceof AxiosError)) {
      districtTickets.value = reply.data[selectedCityId.value];
      districtCandidateData.value = getCandidateData(districtTickets.value);
      districtTicketsData.value = getTicketsData(districts.value, districtTickets.value);
    } else {
      console.log(reply);
      resetSelectedId();
    }
  });

  watchEffect(async () => {
    if (!selectedThemeId.value || !selectedCityId.value || !selectedDistrictId.value)
      return;
    const response = await axios.get(
      `/areas/ELC/P0/00/${selectedThemeId.value}/L/${selectedCityId.value}.json`
    );
    if (!(response instanceof AxiosError)) {
      lanes.value = response.data[selectedDistrictId.value];
    } else {
      console.log(response);
      resetSelectedId();
    }

    const reply = await axios.get(
      `/tickets/ELC/P0/00/${selectedThemeId.value}/L/${selectedCityId.value}.json`
    );
    if (!(reply instanceof AxiosError)) {
      laneTickets.value = reply.data[selectedDistrictId.value];
      laneCandidateData.value = getCandidateData(laneTickets.value);
      laneTicketsData.value = getTicketsData(lanes.value, laneTickets.value);
    } else {
      console.log(reply);
      resetSelectedId();
    }
  });

  return {
    themes,
    cities,
    districts,
    lanes,
    selectedThemeId,
    selectedCityId,
    selectedDistrictId,
    selectedLaneId,
    nationTickets,
    cityTickets,
    districtTickets,
    laneTickets,
    nationCandidateData,
    cityCandidateData,
    districtCandidateData,
    laneCandidateData,
    cityTicketsData,
    districtTicketsData,
    laneTicketsData,
    resetSelectedId,
  };
};
