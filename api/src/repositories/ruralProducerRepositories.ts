import RuralProducer from "@/schemas/ruralProducer";
import { Model, Optional } from "sequelize";

export interface RuralProducerPayload {
  CPF: string;
  CNPJ: string;
  producer_name: string;
  farm_name: string;
  city: string;
  state: string;
  total_area: number;
  total_area_cultivated: number;
  total_area_forest: number;
  cultures: string[];
}

const ruralProducerRepository = {
  create: async (
    payload: Optional<RuralProducerPayload, keyof RuralProducerPayload>
  ): Promise<Model> => {
    try {
      const result = await RuralProducer.create(payload);
      return result;
    } catch (error: any) {
      return error;
    }
  },

  get: async (id: string): Promise<Model | null> => {
    return await RuralProducer.findByPk(id);
  },

  update: async (
    id: string,
    payload: Optional<RuralProducerPayload, keyof RuralProducerPayload>
  ): Promise<[number]> => {
    try {
      const result = await RuralProducer.update(payload, {
        where: { id: id },
      });

      return result;
    } catch (error: any) {
      return error;
    }
  },

  remove: async (id: string): Promise<number> => {
    try {
      const result = await RuralProducer.destroy({
        where: { id: id },
      });
      return result;
    } catch (error: any) {
      return error;
    }
  },

  countFarms: async (): Promise<number> => {
    return await RuralProducer.count();
  },

  sumTotalArea: async (): Promise<number> => {
    return await RuralProducer.sum("total_area");
  },

  countFarmsByState: async () => {
    return await RuralProducer.count({
      attributes: ["state"],
      group: ["state"],
    });
  },

  countFarmsByCulture: async () => {
    return await RuralProducer.findAll({
      attributes: ["cultures"],
    });
  },

  countFarmsByAreas: async () => {
    return await RuralProducer.findAll({
      attributes: ["total_area", "total_area_cultivated", "total_area_forest"],
    });
  },
};

export default ruralProducerRepository;
