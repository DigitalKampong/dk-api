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
        {
            "id": 4,
            "name": "Malay",
            "createdAt": "2021-01-08T09:41:06.675Z",
            "updatedAt": "2021-01-08T09:41:06.675Z",
            "CategoryStalls": {
                "createdAt": "2021-01-08T09:41:06.695Z",
                "updatedAt": "2021-01-08T09:41:06.695Z",
                "stallId": 1,
                "categoryId": 4
            }
        }
    ],
    "rating": 0
}
*/

// import '../src/models';
import Stall from '../src/models/Stall';

// const format = ['id', 'Products'];
const format = {
  id: null,
  name: null,
  Products: [{ id: null, price: null }],
  Categories: [
    {
      id: null,
      name: null,
    },
  ],
  HawkerCentre: {
    name: null,
  },
};
// const clazzNames = ['Products'];

function genJson(fields: any, stall: Stall) {

  // for (const key of fields) {
  //   console.log(stall.get(key, { plain: true }));
  // }

  for (const key in fields) {
    fields[key] = stall.get(key);
  }

  return JSON.stringify({});
}

(async function () {
  const stall = await Stall.findByPk(1, { include: [Stall.associations.Products] });
  genJson(format, stall!);
  // console.log(stall);
})();
