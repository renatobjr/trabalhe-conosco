import RuralProducer from "@/schemas/ruralProducer";
import { Model, Optional } from "sequelize";

export interface RuralProducerRepository {
  create: (
    payload: Optional<RuralProducerPayload, keyof RuralProducerPayload>
  ) => Promise<Model>;
  get: (id: string) => Promise<Model | null>;
  update: (
    id: string,
    payload: Optional<RuralProducerPayload, keyof RuralProducerPayload>
  ) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
}

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
      const response = await RuralProducer.create(payload);
      return response;
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
  ): Promise<boolean> => {
    try {
      await RuralProducer.update(payload, {
        where: { id: id },
      });
      return true;
    } catch (error: any) {
      return error;
    }
  },
  remove: async (id: string): Promise<boolean> => {
    try {
      await RuralProducer.destroy({
        where: { id: id },
      });
      return true;
    } catch (error: any) {
      return error;
    }
  },
};

export default ruralProducerRepository;
