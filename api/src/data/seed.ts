import connection from "@/configs/databaseConnection";
import RuralProducer from "@/schemas/ruralProducer";
import producers from "./producers.json";

const seed = async () => {
  producers.forEach(async (producer) => {
    await RuralProducer.create({
      CPF: producer.CPF,
      CNPJ: producer.CNPJ,
      producer_name: producer.producer_name,
      farm_name: producer.farm_name,
      city: producer.city,
      state: producer.state,
      total_area: producer.total_area,
      total_area_cultivated: producer.total_area_cultivated,
      total_area_forest: producer.total_area_forest,
      cultures: producer.cultures,
    });
  });

  // eslint-disable-next-line no-console
  console.log("[✔] Rural Producer has been created successfully.");
};

export default seed;
