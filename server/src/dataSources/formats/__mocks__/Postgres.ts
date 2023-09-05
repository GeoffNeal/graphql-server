import { readCSV } from "../../../utils/csv";
jest.mock("../../../utils/csv");

const Postgres = jest.fn((type: EntityType) => ({
  read: () => ({ err: null, res: readCSV(type) }),
}));

export default Postgres;
