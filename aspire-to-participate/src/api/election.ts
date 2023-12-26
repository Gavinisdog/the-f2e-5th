import axios from "@/services/axios";
import { AxiosError } from "axios";
import { Ref, ref, watchEffect } from "vue";

import theme from "@/assets/data/theme.json";
import colors from "@/assets/data/color.json";

const getAreaCode = (data: any) => {
  return `${data.prv_code}_${data.city_code}_${data.area_code}_${data.dept_code}_${data.li_code}`;
};

const uniqueArray = (list: Array<any>) => {
  return list.reduce((previous, current) => {
    if (!previous.includes(current)) {
      previous.push(current);
    }
    return previous;
  }, []);
};

const getCandidateData = (tickets: Array<any> = []): Array<any> => {
  const candidateList = uniqueArray(tickets.map((data) => data.cand_no));
  return candidateList.map((candidateNo: any) => {
    const president = tickets.find(
      (data) => data.cand_no === candidateNo && data.is_vice !== "Y"
    );
    const vicePresident = tickets.find(
      (data) => data.cand_no === candidateNo && data.is_vice === "Y"
    );
    return {
      candidateNo,
      areaCode: getAreaCode(president),
      areaName: president.area_name,
      presidentName: president.cand_name,
      vicePresidentName: vicePresident.cand_name,
      partyName: president.party_name,
      partyCode: president.party_code,
      ticketQty: president.ticket_num,
      ticketPercent: president.ticket_percent,
    };
  });
};

const getTicketsData = (cities: Array<any>, cityTickets: Array<any>) => {
  const cityTicketsList = cities.map((city) => {
    const areaCode = getAreaCode(city);
    const areaName = city.area_name;
    const tickets = cityTickets.filter((ticketBox) => ticketBox.area_name === areaName);
    const winner = tickets.sort((a, b) => {
      return b.ticket_num - a.ticket_num;
    })[0];
    const winnerColor = colors?.find((party) => party.party_name === winner.party_name)
      ?.color_code;
    return {
      areaCode,
      areaName,
      winnerParty: winner.party_name,
      winnerColor,
    };
  });
  return cityTicketsList;
};

export const getElectionData = () => {
  // 選舉年份
  const themeId: Ref<string> = ref(theme[0].theme_items[0].theme_id);
  const cities: Ref<Array<any>> = ref([]);
  const districts: Ref<Array<any>> = ref([]);
  const lanes: Ref<Array<any>> = ref([]);
  const selectedCityId: Ref<string> = ref("");
  const selectedDistrictId: Ref<string> = ref("");
  const selectedLaneId: Ref<string> = ref("");
  const nationTickets: Ref<Array<any>> = ref([]);
  const cityTickets: Ref<Array<any>> = ref([]);
  const districtTickets: Ref<Array<any>> = ref([]);
  const laneTickets: Ref<Array<any>> = ref([]);
  const nationCandidateData: Ref<Array<any>> = ref([]);
  const cityCandidateData: Ref<Array<any>> = ref([]);
  const districtCandidateData: Ref<Array<any>> = ref([]);
  const laneCandidateData: Ref<Array<any>> = ref([]);
  const cityTicketsData: Ref<Array<any>> = ref([]);
  const districtTicketsData: Ref<Array<any>> = ref([]);
  const laneTicketsData: Ref<Array<any>> = ref([]);

  const resetSelectedId = () => {
    selectedCityId.value = "";
    selectedDistrictId.value = "";
    selectedLaneId.value = "";
  };
  watchEffect(async (): Promise<any> => {
    const response = await axios.get<any>(
      `/areas/ELC/P0/00/${themeId.value}/C/00_000_00_000_0000.json`
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

  watchEffect(async (): Promise<any> => {
    if (!themeId.value) return;
    const response = await axios.get<any>(
      `/tickets/ELC/P0/00/${themeId.value}/N/00_000_00_000_0000.json`
    );
    if (!(response instanceof AxiosError)) {
      // 年度全國得票
      nationTickets.value = response.data["00_000_00_000_0000"];
      nationCandidateData.value = getCandidateData(nationTickets.value);
    } else {
      console.log(response);
      resetSelectedId();
    }

    const reply = await axios.get<any>(
      `/tickets/ELC/P0/00/${themeId.value}/C/00_000_00_000_0000.json`
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

  watchEffect(async (): Promise<any> => {
    if (!themeId.value || !selectedCityId.value) return;
    const response = await axios.get<any>(
      `/areas/ELC/P0/00/${themeId.value}/D/${selectedCityId.value}.json`
    );
    if (!(response instanceof AxiosError)) {
      districts.value = response.data[selectedCityId.value];
      selectedDistrictId.value = getAreaCode(districts.value[0]);
    } else {
      console.log(response);
      resetSelectedId();
    }

    const reply = await axios.get<any>(
      `/tickets/ELC/P0/00/${themeId.value}/D/${selectedCityId.value}.json`
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

  watchEffect(async (): Promise<any> => {
    if (!themeId.value || !selectedCityId.value || !selectedDistrictId.value) return;
    const response = await axios.get<any>(
      `/areas/ELC/P0/00/${themeId.value}/L/${selectedCityId.value}.json`
    );
    if (!(response instanceof AxiosError)) {
      lanes.value = response.data[selectedDistrictId.value];
    } else {
      console.log(response);
      resetSelectedId();
    }

    const reply = await axios.get<any>(
      `/tickets/ELC/P0/00/${themeId.value}/L/${selectedCityId.value}.json`
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
    themeId,
    cities,
    districts,
    lanes,
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
