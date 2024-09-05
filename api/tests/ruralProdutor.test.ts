import { describe, test, expect, afterAll } from "@jest/globals";
import request from "supertest";
import api from "../src/index";
import ruralProducerHelper from "../src/helpers/ruralProducerHelper";
import connection from "../src/configs/databaseConnection";
import payload from "./mock/ruralProducerMocking.json";

afterAll(async () => {
  await connection.drop();
  await connection.close();
});

describe("Unit test for Helpers", () => {
  test("Should return true with a valide CPF", () => {
    const cpf = "04405851476";
    const result = ruralProducerHelper.verifyCpf(cpf);

    expect(result).toBe(true);
  });
  test("Should return false with a invalid CPF", () => {
    const cpf = "04405851477";
    const result = ruralProducerHelper.verifyCpf(cpf);

    expect(result).toBe(false);
  });
  test("Should return false with the 00000000000", () => {
    const cpf = "00000000000";
    const result = ruralProducerHelper.verifyCpf(cpf);

    expect(result).toBe(false);
  });
  test("Should return true with a valide CNPJ", () => {
    const cnpj = "10773447000157";
    const result = ruralProducerHelper.verifyCnpj(cnpj);

    expect(result).toBe(true);
  });
  test("Should return false with a invalid CNPJ", () => {
    const cnpj = "14773447000158";
    const result = ruralProducerHelper.verifyCnpj(cnpj);

    expect(result).toBe(false);
  });
  test("Should return true with Total Area is greater than Cultivated Area and Forest Area", () => {
    const total_area = 100;
    const total_area_cultivated = 20;
    const total_area_forest = 30;
    const result = ruralProducerHelper.verifyTotalArea(
      total_area,
      total_area_cultivated,
      total_area_forest
    );

    expect(result).toBe(true);
  });
  test("Should return false with Total Area is less than Cultivated Area and Forest Area", () => {
    const total_area = 100;
    const total_area_cultivated = 80;
    const total_area_forest = 30;
    const result = ruralProducerHelper.verifyTotalArea(
      total_area,
      total_area_cultivated,
      total_area_forest
    );

    expect(result).toBe(false);
  });
});

describe("Integration test for Rural Producer", () => {
  describe("/POST /api/v1/rural-producers", () => {
    test("Should be able to create a new Rural Producer with a valid CPF", async () => {
      const response = await request(api)
        .post("/api/v1/rural-producers")
        .send(payload.createRuralProducerWithValidCnpj);

      expect(response.status).toBe(201);
    });
    test("Should be able to create a new Rural Producer with a valid CNPJ", async () => {
      const response = await request(api)
        .post("/api/v1/rural-producers")
        .send(payload.createRuralProducerWithValidCnpj);

      expect(response.status).toBe(201);
    });
    test("Should be able to create a new Rural Producer with a invalid CPF", async () => {
      const response = await request(api)
        .post("/api/v1/rural-producers")
        .send(payload.createRuralProducerWithInvalidCpf);

      expect(response.status).toBe(400);
    });
    test("Should be able to create a new Rural Producer with a invalid CNPJ", async () => {
      const response = await request(api)
        .post("/api/v1/rural-producers")
        .send(payload.createRuralProducerWithInvalidCnpj);

      expect(response.status).toBe(400);
    });
    test("Should be able to create a new Rural Producer with a invalid Total Area", async () => {
      const response = await request(api)
        .post("/api/v1/rural-producers")
        .send(payload.createRuralProducerWithInvalidTotalArea);

      expect(response.status).toBe(400);
    });
  });

  describe("/GET/:id /api/v1/rural-producers/:id", () => {
    test("Should be able to get a Rural Producer by id", async () => {
      const response = await request(api).get("/api/v1/rural-producers/1");

      expect(response.status).toBe(200);
    });
    test("Should not be able to get a Rural Producer by id", async () => {
      const response = await request(api).get("/api/v1/rural-producers/999");
      const parsedResponse = JSON.parse(response.text);

      expect(response.status).toBe(404);
    });
  });

  describe("/PUT/:id /api/v1/rural-producers/:id", () => {
    test("Should be able to update a Rural Producer by id", async () => {
      const response = await request(api)
        .put("/api/v1/rural-producers/1")
        .send(payload.updateRuralProducerWithValidCpf);

      expect(response.status).toBe(200);
    });
    test("Should not be able to update a Rural Producer by id", async () => {
      const response = await request(api)
        .put("/api/v1/rural-producers/999")
        .send(payload.updateRuralProducerWithValidCpf);

      expect(response.status).toBe(404);
    });
  });

  describe("/DELETE/:id /api/v1/rural-producers/:id", () => {
    test("Should be able to delete a Rural Producer by id", async () => {
      const response = await request(api).delete("/api/v1/rural-producers/1");

      expect(response.status).toBe(200);
    });
    test("Should not be able to delete a Rural Producer by id", async () => {
      const response = await request(api).delete("/api/v1/rural-producers/999");

      expect(response.status).toBe(404);
    });
  });
});
