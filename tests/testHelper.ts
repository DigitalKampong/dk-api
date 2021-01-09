/*
{
    "id": 1,
    "name": "Selera Rasa Nasi Lemak",
    "description": "Serving traditional Nasi Lemak since 1998, when The Undertaker threw Mankind off Hell In A Cell, and plummeted 16 ft through an announcer's table.",
    "contactNo": "97654321",
    "unitNo": "#01-02",
    "hawkerCentreId": 1,
    "createdAt": "2021-01-08T09:41:06.684Z",
    "updatedAt": "2021-01-08T09:41:06.684Z",
    "Products": [
        {
            "id": 1,
            "name": "Nasi Lemak",
            "description": "Egg, fish, chicken wing and chili with rice.",
            "price": 2.5,
            "stallId": 1,
            "createdAt": "2021-01-08T09:41:06.710Z",
            "updatedAt": "2021-01-08T09:41:06.710Z"
        },
        {
            "id": 2,
            "name": "Mee Rebus",
            "description": "Egg, gravy, beansprout with yellow noodle.",
            "price": 3,
            "stallId": 1,
            "createdAt": "2021-01-08T09:41:06.710Z",
            "updatedAt": "2021-01-08T09:41:06.710Z"
        }
    ],
    "Images": [],
    "HawkerCentre": {
        "id": 1,
        "name": "Adam Food Centre",
        "address": "2, Adam Road, S(289876)",
        "regionId": 4,
        "latLng": "",
        "createdAt": "2021-01-08T09:41:06.651Z",
        "updatedAt": "2021-01-08T09:41:06.651Z",
        "Region": {
            "id": 4,
            "name": "Central",
            "createdAt": "2021-01-08T09:41:06.624Z",
            "updatedAt": "2021-01-08T09:41:06.624Z"
        }
    },
    "Reviews": [],
    "Categories": [
      "Malay", "Chinese", "India"
    ],
    "rating": 0
}
*/

// import '../src/models';
// import Stall from '../src/models/Stall';
import cloneDeep from 'lodash.clonedeep';
// import { Model } from 'sequelize';

// // const format = ['id', 'Products'];
// const format = {
//   id: null,
//   name: null,
//   Products: [{ id: null, price: null }],
//   Categories: [
//     {
//       id: null,
//       name: null,
//     },
//   ],
//   HawkerCentre: {
//     name: null,
//     Region: {
//       name: null,
//     },
//   },
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function genJsonResp(obj: any, model: Model) {
  for (const key in obj) {
    const val = model.get(key);

    if (obj[key] === null) {
      obj[key] = val;
    } else if (Array.isArray(obj[key])) {
      const baseObj = obj[key][0];

      // We assume val is an Array since obj[key] is an Array. We recursively create each new resp in the array.
      const vals: Model[] = val as Model[];
      const results = vals.map(val => {
        return genJsonResp(cloneDeep(baseObj), val as Model);
      });

      obj[key] = results;
    } else {
      obj[key] = genJsonResp(obj[key], val as Model);
    }
  }

  return obj;
}

// (async function () {
//   const stall = await Stall.findByPk(1, { include: { all: true, nested: true } });
//   // console.log(stall!.get());
//   // console.log(stall);
//   console.log(genJsonResp(format, stall!));
// })();
