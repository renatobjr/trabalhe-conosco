import { Handler } from "express";
import ruralProducerRepository from "@/repositories/ruralProducerRepositories";
import dataGraphsHelper from "@/helpers/dataGraphsHelper";
import { HttpStatusCode } from "@/common/HttpStatusCode";
import { HttpStatusMessage } from "@/common/HttpStatusMessage";

const getData: Handler = async (req, res) => {
  try {
    const totalFarms = await ruralProducerRepository.countFarms();
    const totalArea = await ruralProducerRepository.sumTotalArea();
    const totalFarmsByState = await ruralProducerRepository.countFarmsByState();
    const totalFarmsByCulture = await ruralProducerRepository
      .countFarmsByCulture()
      .then((cultures) => {
        return dataGraphsHelper.calculateCulturesData(cultures);
      });

    const totalFarmsByArea = await ruralProducerRepository
      .countFarmsByAreas()
      .then((areas) => {
        return dataGraphsHelper.calculateAreasData(areas, totalArea);
      });

    res.success(HttpStatusCode.OK, {
      data: {
        totalFarms: totalFarms,
        totalArea: totalArea,
        totalFarmsByState: totalFarmsByState,
        totalFarmsByCulture: totalFarmsByCulture,
        totalFarmsByArea: totalFarmsByArea,
      },
    });
  } catch (error: any) {
    res.error(HttpStatusCode.BAD_REQUEST, {
      code: HttpStatusMessage.BAD_REQUEST,
      details: error,
    });
  }
};

export default {
  getData,
};
