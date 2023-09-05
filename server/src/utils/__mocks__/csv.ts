export const readCSV = jest.fn((type: EntityType = "product"): Entity[] =>
  type === "product"
    ? [
        {
          vin: "1C6RR6LT9DS578427",
          make: "Landrover",
          model: "Evoque",
          colour: "White",
          price: 52000,
        },
        {
          vin: "1G6DP567X50115827",
          make: "Jaguar",
          model: "XE",
          colour: "Black",
          price: 43000,
        },
      ]
    : [
        {
          forename: "Osman",
          surname: "Ahmed",
          email: "drosmanahmed@pharmaceuticalsglobal.org",
          contact_number: "+91719548839",
          postcode: "396210",
        },
        {
          forename: "Dominic",
          surname: "Sutton",
          email: "dominic.sutton@rockar.com",
          contact_number: "+44 (0) 7950 244 036",
          postcode: "W12 7SL",
        },
      ]
);
