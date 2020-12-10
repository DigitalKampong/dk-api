# dk-api

## Indices

- [HawkerCentres](#hawkercentres)

  - [Create hawker centre](#1-create-hawker-centre)
  - [Delete hawker centre](#2-delete-hawker-centre)
  - [Get hawker centre](#3-get-hawker-centre)
  - [Get hawker centres](#4-get-hawker-centres)
  - [Update hawker centre](#5-update-hawker-centre)

- [Products](#products)

  - [Create product](#1-create-product)
  - [Delete product](#2-delete-product)
  - [Get product](#3-get-product)
  - [Get products](#4-get-products)
  - [Update product](#5-update-product)

- [Regions](#regions)

  - [Create region](#1-create-region)
  - [Delete region](#2-delete-region)
  - [Get region](#3-get-region)
  - [Get regions](#4-get-regions)
  - [Update region](#5-update-region)

- [Stalls](#stalls)

  - [Create stall](#1-create-stall)
  - [Delete stall](#2-delete-stall)
  - [Get stall](#3-get-stall)
  - [Get stalls](#4-get-stalls)
  - [Update stall](#5-update-stall)

---

## HawkerCentres

Fields needed

- name: string;
- address: string | null;
- regionId: number;

### 1. Create hawker centre

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{server_url}}/hawkercentres
```

**_Body:_**

```js
{
    "name": "Fake hawker centre",
    "address": "Fake address",
    "regionId": 1
}
```

**_More example Requests/Responses:_**

##### I. Example Request: Create hawker centre

**_Body:_**

```js
{
    "name": "Yuhua Village Market and Food Centre",
    "address": "254 Jurong East Street 24, Singapore 600254",
    "regionId": 1
}
```

##### I. Example Response: Create hawker centre

```js
{
    "id": 1,
    "name": "Yuhua Village Market and Food Centre",
    "address": "254 Jurong East Street 24, Singapore 600254",
    "regionId": 1,
    "updatedAt": "2020-12-09T06:26:55.647Z",
    "createdAt": "2020-12-09T06:26:55.647Z"
}
```

**_Status Code:_** 201

<br>

### 2. Delete hawker centre

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{server_url}}/hawkercentres/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

**_More example Requests/Responses:_**

##### I. Example Request: Delete hawker centre

**_Status Code:_** 200

<br>

### 3. Get hawker centre

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{server_url}}/hawkercentres/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

**_More example Requests/Responses:_**

##### I. Example Request: Get hawker centre

##### I. Example Response: Get hawker centre

```js
{
    "id": 1,
    "name": "Yuhua Village Market",
    "address": "254 Jurong East Street 24, Singapore 600254",
    "regionId": 1,
    "createdAt": "2020-12-09T06:26:55.647Z",
    "updatedAt": "2020-12-09T06:29:04.408Z"
}
```

**_Status Code:_** 200

<br>

### 4. Get hawker centres

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{server_url}}/hawkercentres
```

**_More example Requests/Responses:_**

##### I. Example Request: Get hawker centres

##### I. Example Response: Get hawker centres

```js
[
  {
    hawkerCentreId: 1,
    name: 'Yuhua Village Market',
    address: '254 Jurong East Street 24, Singapore 600254',
    regionId: 1,
    createdAt: '2020-12-09T06:26:55.647Z',
    updatedAt: '2020-12-09T06:29:04.408Z',
  },
  {
    hawkerCentreId: 2,
    name: 'Fake hawker centre',
    address: 'Fake address',
    regionId: 1,
    createdAt: '2020-12-09T06:32:50.473Z',
    updatedAt: '2020-12-09T06:32:50.473Z',
  },
];
```

**_Status Code:_** 201

<br>

### 5. Update hawker centre

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{server_url}}/hawkercentres/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

**_Body:_**

```js
{
    "name": "Yuhua Village Market"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: Update hawker centre

**_Body:_**

```js
{
    "name": "Yuhua Village Market"
}
```

##### I. Example Response: Update hawker centre

```js
{
    "id": 1,
    "name": "Yuhua Village Market",
    "address": "254 Jurong East Street 24, Singapore 600254",
    "regionId": 1,
    "createdAt": "2020-12-09T06:26:55.647Z",
    "updatedAt": "2020-12-09T06:29:04.408Z"
}
```

**_Status Code:_** 200

<br>

## Products

Fields allowed

- name: string;
- category: string | null;
- description: string | null;
- price: number | null;
- image: string | null;
- stallId: number;

### 1. Create product

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{server_url}}/products
```

**_Body:_**

```js
{
    "name": "Duck Rice",
    "stallId": 1,
    "category": "chinese cuisine",
    "description": "duck rice",
    "price": 2.5,
    "image": "http://image_url"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: Create product

**_Body:_**

```js
{
    "name": "Chicken Rice",
    "stallId": 1,
    "category": "chinese cuisine",
    "description": "delicious chicken rice",
    "price": 3.5,
    "image": "http://image_url"
}
```

##### I. Example Response: Create product

```js
{
    "id": 1,
    "name": "Chicken Rice",
    "stallId": 1,
    "category": "chinese cuisine",
    "description": "delicious chicken rice",
    "price": 3.5,
    "image": "http://image_url",
    "updatedAt": "2020-12-09T06:40:05.643Z",
    "createdAt": "2020-12-09T06:40:05.643Z"
}
```

**_Status Code:_** 201

<br>

### 2. Delete product

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{server_url}}/products/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

**_More example Requests/Responses:_**

##### I. Example Request: Delete product

**_Status Code:_** 200

<br>

### 3. Get product

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{server_url}}/products/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

**_More example Requests/Responses:_**

##### I. Example Request: Get product

##### I. Example Response: Get product

```js
{
    "id": 1,
    "name": "Chicken Rice",
    "category": "chinese cuisine",
    "description": "delicious chicken rice",
    "price": 3.8,
    "image": "http://image_url",
    "stallId": 1,
    "createdAt": "2020-12-09T06:40:05.643Z",
    "updatedAt": "2020-12-09T06:40:44.440Z"
}
```

**_Status Code:_** 200

<br>

### 4. Get products

Get information of all products. Includes the information of the respective stalls.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{server_url}}/products
```

**_More example Requests/Responses:_**

##### I. Example Request: Get products

##### I. Example Response: Get products

```js
[
  {
    id: 2,
    name: 'Duck Rice',
    category: 'chinese cuisine',
    description: 'duck rice',
    price: 2.5,
    image: 'http://image_url',
    stallId: 1,
    createdAt: '2020-12-09T06:41:47.910Z',
    updatedAt: '2020-12-09T06:41:47.910Z',
    Stall: {
      id: 1,
      name: '5 Star Chicken Rice Stall',
      description: 'newer description',
      rating: 4.5,
      contactNo: '91234567',
      unitNo: '01-02',
      hawkerCentreId: 1,
      createdAt: '2020-12-09T06:37:05.828Z',
      updatedAt: '2020-12-09T06:37:35.710Z',
      HawkerCentre: {
        id: 1,
        name: 'Yuhua Village Market',
        address: '254 Jurong East Street 24, Singapore 600254',
        regionId: 1,
        createdAt: '2020-12-09T06:26:55.647Z',
        updatedAt: '2020-12-09T06:29:04.408Z',
      },
    },
  },
  {
    id: 1,
    name: 'Chicken Rice',
    category: 'chinese cuisine',
    description: 'delicious chicken rice',
    price: 3.8,
    image: 'http://image_url',
    stallId: 1,
    createdAt: '2020-12-09T06:40:05.643Z',
    updatedAt: '2020-12-09T06:40:44.440Z',
    Stall: {
      id: 1,
      name: '5 Star Chicken Rice Stall',
      description: 'newer description',
      rating: 4.5,
      contactNo: '91234567',
      unitNo: '01-02',
      hawkerCentreId: 1,
      createdAt: '2020-12-09T06:37:05.828Z',
      updatedAt: '2020-12-09T06:37:35.710Z',
      HawkerCentre: {
        id: 1,
        name: 'Yuhua Village Market',
        address: '254 Jurong East Street 24, Singapore 600254',
        regionId: 1,
        createdAt: '2020-12-09T06:26:55.647Z',
        updatedAt: '2020-12-09T06:29:04.408Z',
      },
    },
  },
];
```

**_Status Code:_** 200

<br>

### 5. Update product

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{server_url}}/products/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

**_Body:_**

```js
{
    "price": 3.8
}
```

**_More example Requests/Responses:_**

##### I. Example Request: Update product

**_Body:_**

```js
{
    "price": 3.8
}
```

##### I. Example Response: Update product

```js
{
    "id": 1,
    "name": "Chicken Rice",
    "category": "chinese cuisine",
    "description": "delicious chicken rice",
    "price": 3.8,
    "image": "http://image_url",
    "stallId": 1,
    "createdAt": "2020-12-09T06:40:05.643Z",
    "updatedAt": "2020-12-09T06:40:44.440Z"
}
```

**_Status Code:_** 200

<br>

## Regions

Fields allowed

- name: string;

### 1. Create region

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{server_url}}/regions
```

**_Body:_**

```js
{
    "name": "East"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: Create region

**_Body:_**

```js
{
    "name": "North"
}
```

##### I. Example Response: Create region

```js
{
    "id": 1,
    "name": "North",
    "updatedAt": "2020-12-09T06:22:44.182Z",
    "createdAt": "2020-12-09T06:22:44.182Z"
}
```

**_Status Code:_** 201

<br>

### 2. Delete region

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{server_url}}/regions/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

**_More example Requests/Responses:_**

##### I. Example Request: Delete region

**_Status Code:_** 200

<br>

### 3. Get region

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{server_url}}/regions/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

**_More example Requests/Responses:_**

##### I. Example Request: Get region

##### I. Example Response: Get region

```js
{
    "regionId": 1,
    "name": "West",
    "createdAt": "2020-12-09T06:22:44.182Z",
    "updatedAt": "2020-12-09T06:23:07.436Z"
}
```

**_Status Code:_** 200

<br>

### 4. Get regions

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{server_url}}/regions
```

**_More example Requests/Responses:_**

##### I. Example Request: Get regions

##### I. Example Response: Get regions

```js
[
  {
    regionId: 1,
    name: 'West',
    createdAt: '2020-12-09T06:22:44.182Z',
    updatedAt: '2020-12-09T06:23:07.436Z',
  },
  {
    regionId: 2,
    name: 'East',
    createdAt: '2020-12-09T06:23:41.635Z',
    updatedAt: '2020-12-09T06:23:41.635Z',
  },
];
```

**_Status Code:_** 201

<br>

### 5. Update region

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{server_url}}/regions/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

**_Body:_**

```js
{
    "name": "West"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: Update region

**_Body:_**

```js
{
    "name": "West"
}
```

##### I. Example Response: Update region

```js
{
    "id": 1,
    "name": "West",
    "createdAt": "2020-12-09T06:22:44.182Z",
    "updatedAt": "2020-12-09T06:23:07.436Z"
}
```

**_Status Code:_** 200

<br>

## Stalls

Fields allowed:

- name: string;
- description: string | null;
- rating: number | null;
- contactNo: string | null;
- unitNo: string | null;
- hawkerCentreId: number;

### 1. Create stall

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{server_url}}/stalls
```

**_Body:_**

```js
{
    "name": "2nd chicken Rice Stall",
    "description": "some description",
    "rating": 1.5,
    "contactNo": "97654321",
    "unitNo": "01-03",
    "hawkerCentreId": 1
}
```

**_More example Requests/Responses:_**

##### I. Example Request: Create stall

**_Body:_**

```js
{
    "name": "5 Star Chicken Rice Stall",
    "description": "some description",
    "rating": 4.5,
    "contactNo": "91234567",
    "unitNo": "01-02",
    "hawkerCentreId": 1
}
```

##### I. Example Response: Create stall

```js
{
    "id": 1,
    "name": "5 Star Chicken Rice Stall",
    "description": "some description",
    "rating": 4.5,
    "contactNo": "91234567",
    "unitNo": "01-02",
    "hawkerCentreId": 1,
    "updatedAt": "2020-12-09T06:37:05.828Z",
    "createdAt": "2020-12-09T06:37:05.828Z"
}
```

**_Status Code:_** 201

<br>

### 2. Delete stall

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{server_url}}/stalls/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

**_More example Requests/Responses:_**

##### I. Example Request: Delete stall

**_Status Code:_** 200

<br>

### 3. Get stall

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{server_url}}/stalls/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

**_More example Requests/Responses:_**

##### I. Example Request: Get stall

##### I. Example Response: Get stall

```js
{
    "stallId": 1,
    "name": "5 Star Chicken Rice Stall",
    "description": "newer description",
    "rating": 4.5,
    "contactNo": "91234567",
    "unitNo": "01-02",
    "hawkerCentreId": 1,
    "createdAt": "2020-12-09T06:37:05.828Z",
    "updatedAt": "2020-12-09T06:37:35.710Z"
}
```

**_Status Code:_** 200

<br>

### 4. Get stalls

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{server_url}}/stalls
```

**_More example Requests/Responses:_**

##### I. Example Request: Get stalls

##### I. Example Response: Get stalls

```js
[
  {
    stallId: 1,
    name: '5 Star Chicken Rice Stall',
    description: 'newer description',
    rating: 4.5,
    contactNo: '91234567',
    unitNo: '01-02',
    hawkerCentreId: 1,
    createdAt: '2020-12-09T06:37:05.828Z',
    updatedAt: '2020-12-09T06:37:35.710Z',
  },
  {
    stallId: 2,
    name: '2nd chicken Rice Stall',
    description: 'some description',
    rating: 1.5,
    contactNo: '97654321',
    unitNo: '01-03',
    hawkerCentreId: 1,
    createdAt: '2020-12-09T06:38:06.634Z',
    updatedAt: '2020-12-09T06:38:06.634Z',
  },
];
```

**_Status Code:_** 201

<br>

### 5. Update stall

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{server_url}}/stalls/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

**_Body:_**

```js
{
    "description": "newer description"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: Update stall

**_Body:_**

```js
{
    "description": "newer description"
}
```

##### I. Example Response: Update stall

```js
{
    "id": 1,
    "name": "5 Star Chicken Rice Stall",
    "description": "newer description",
    "rating": 4.5,
    "contactNo": "91234567",
    "unitNo": "01-02",
    "hawkerCentreId": 1,
    "createdAt": "2020-12-09T06:37:05.828Z",
    "updatedAt": "2020-12-09T06:37:35.710Z"
}
```

**_Status Code:_** 200

<br>

---

[Back to top](#dk-api)

> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2020-12-09 15:11:05 by [docgen](https://github.com/thedevsaddam/docgen)
