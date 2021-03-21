# dk-api

## Indices

- [Categories](#categories)

  - [Create category](#1-create-category)
  - [Delete category](#2-delete-category)
  - [Get categories](#3-get-categories)
  - [Get category](#4-get-category)
  - [Update category](#5-update-category)

- [CategoryStalls](#categorystalls)

  - [Create categorystall](#1-create-categorystall)
  - [Delete categorystall](#2-delete-categorystall)
  - [Get categorystall](#3-get-categorystall)
  - [Get categorystalls](#4-get-categorystalls)
  - [Update categorystall](#5-update-categorystall)

- [Favourites](#favourites)

  - [Create favourite for stall](#1-create-favourite-for-stall)
  - [Delete favourite](#2-delete-favourite)
  - [Delete favourite from stall](#3-delete-favourite-from-stall)
  - [Get favourites](#4-get-favourites)

- [HawkerCentres](#hawkercentres)

  - [Create hawker centre](#1-create-hawker-centre)
  - [Delete hawker centre](#2-delete-hawker-centre)
  - [Get hawker centre](#3-get-hawker-centre)
  - [Get hawker centres](#4-get-hawker-centres)
  - [Update hawker centre](#5-update-hawker-centre)

- [Products](#products)

  - [Create product](#1-create-product)
  - [Delete product](#2-delete-product)
  - [Delete product images](#3-delete-product-images)
  - [Get product](#4-get-product)
  - [Get products](#5-get-products)
  - [Update product](#6-update-product)
  - [Upload product images](#7-upload-product-images)

- [Regions](#regions)

  - [Create region](#1-create-region)
  - [Delete region](#2-delete-region)
  - [Get region](#3-get-region)
  - [Get regions](#4-get-regions)
  - [Update region](#5-update-region)

- [Reset](#reset)

  - [Reset database](#1-reset-database)

- [Reviews](#reviews)

  - [Create review for stall](#1-create-review-for-stall)
  - [Delete review](#2-delete-review)
  - [Get review](#3-get-review)
  - [Get reviews for stall](#4-get-reviews-for-stall)
  - [Update review](#5-update-review)

- [Search](#search)

* [SecurityQuestions](#securityquestions)

  - [Create SecurityQuestion](#1-create-securityquestion)
  - [Create SecurityQuestion Copy](#2-create-securityquestion-copy)
  - [Delete SecurityQuestions](#3-delete-securityquestions)
  - [Get Active SecurityQuestions](#4-get-active-securityquestions)
  - [Get All SecurityQuestions](#5-get-all-securityquestions)
  - [Get SecurityQuestion](#6-get-securityquestion)

* [Stalls](#stalls)

  - [Bulk Destroy stalls](#1-bulk-destroy-stalls)
  - [Create stall](#2-create-stall)
  - [Delete stall](#3-delete-stall)
  - [Delete stall images](#4-delete-stall-images)
  - [Get stall](#5-get-stall)
  - [Get stalls](#6-get-stalls)
  - [Import stalls CSV](#7-import-stalls-csv)
  - [Update stall](#8-update-stall)
  - [Upload stall images](#9-upload-stall-images)

* [UserAnswers](#useranswers)

  - [Create User Answer](#1-create-user-answer)
  - [Delete User Answer](#2-delete-user-answer)
  - [Validate User Answers](#3-validate-user-answers)

  * [Bulk Destroy stalls](#1-bulk-destroy-stalls)
  * [Create stall](#2-create-stall)
  * [Delete stall](#3-delete-stall)
  * [Delete stall images](#4-delete-stall-images)
  * [Get stall](#5-get-stall)
  * [Get stalls](#6-get-stalls)
  * [Update stall](#7-update-stall)
  * [Upload stall images](#8-upload-stall-images)

  - [Get user by email](#1-get-user-by-email)
  - [Get users](#2-get-users)
  - [Login user](#3-login-user)
  - [Register admin](#4-register-admin)
  - [Register user](#5-register-user)
  - [Update other user](#6-update-other-user)
  - [Update user](#7-update-user)

  * [Get users](#1-get-users)
  * [Login user](#2-login-user)
  * [Register admin](#3-register-admin)
  * [Register user](#4-register-user)
  * [Update other user](#5-update-other-user)
  * [Update user](#6-update-user)

---

## Categories

### 1. Create category

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{server_url}}/categories
```

**_Body:_**

```js
{
    "name": "Drinks"
}
```

### 2. Delete category

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{server_url}}/categories/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

### 3. Get categories

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{server_url}}/categories
```

### 4. Get category

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{server_url}}/categories/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

### 5. Update category

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{server_url}}/categories/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

**_Body:_**

```js
{
    "name": "Japanese Food"
}
```

## CategoryStalls

### 1. Create categorystall

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{server_url}}/categoryStalls
```

**_Body:_**

```js
{
    "stallId": "1",
    "categoryId": "1"
}
```

### 2. Delete categorystall

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{server_url}}/categoryStalls/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

### 3. Get categorystall

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{server_url}}/categoryStalls/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

### 4. Get categorystalls

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{server_url}}/categoryStalls
```

### 5. Update categorystall

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{server_url}}/categoryStalls/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

**_Body:_**

```js
{
    "stallId": "1",
    "categoryId": "2"
}
```

## Favourites

### 1. Create favourite for stall

**_Endpoint:_**

```bash
Method: POST
Type:
URL: {{server_url}}/stalls/:id/favourites
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 3     |             |

### 2. Delete favourite

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{server_url}}/favourites/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 8     |             |

### 3. Delete favourite from stall

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{server_url}}/stalls/:id/favourites
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 3     |             |

### 4. Get favourites

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{server_url}}/favourites
```

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

**_Headers:_**

| Key          | Value     | Description |
| ------------ | --------- | ----------- |
| x-auth-token | {{token}} |             |

**_Body:_**

```js
{
    "name": "Fake hawker centre",
    "address": "Fake address",
    "regionId": 1,
    "bus": "9, 12, 21",
    "mrt": "Bugis MRT Station"
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
    "hawkerCentreId": 1,
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
    "stallId": 10,
    "category": "chinese cuisine",
    "description": "duck rice",
    "price": 2.5
}
```

**_More example Requests/Responses:_**

##### I. Example Request: Create product

**_Body:_**

```js
{
    "name": "Duck Rice",
    "stallId": 1,
    "category": "chinese cuisine",
    "description": "duck rice",
    "price": 2.5
}
```

##### I. Example Response: Create product

```js
{
    "id": 3,
    "name": "Duck Rice",
    "category": "chinese cuisine",
    "description": "duck rice",
    "price": 2.5,
    "stallId": 1,
    "createdAt": "2020-12-16T09:28:29.783Z",
    "updatedAt": "2020-12-16T09:28:29.783Z",
    "Images": [],
    "Stall": {
        "id": 1,
        "name": "fav stall",
        "description": null,
        "rating": null,
        "contactNo": null,
        "unitNo": null,
        "hawkerCentreId": 1,
        "createdAt": "2020-12-16T06:53:15.271Z",
        "updatedAt": "2020-12-16T06:53:15.271Z",
        "HawkerCentre": {
            "id": 1,
            "name": "fav hawker centre",
            "address": "asdf",
            "regionId": 2,
            "createdAt": "2020-12-16T06:52:38.182Z",
            "updatedAt": "2020-12-16T06:52:38.182Z"
        }
    }
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

### 3. Delete product images

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{server_url}}/products/:id/delete-images
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

**_Body:_**

```js
{
    "imageIds": [26]
}
```

### 4. Get product

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
    "stallId": 1,
    "createdAt": "2020-12-09T06:40:05.643Z",
    "updatedAt": "2020-12-09T06:40:44.440Z"
}
```

**_Status Code:_** 200

<br>

### 5. Get products

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

### 6. Update product

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

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 3     |             |

**_Body:_**

```js
{
    "price": 3.8
}
```

##### I. Example Response: Update product

```js
{
    "id": 3,
    "name": "Duck Rice",
    "category": "chinese cuisine",
    "description": "duck rice",
    "price": 3.8,
    "stallId": 1,
    "createdAt": "2020-12-16T09:28:29.783Z",
    "updatedAt": "2020-12-16T09:28:55.954Z",
    "Images": [],
    "Stall": {
        "id": 1,
        "name": "fav stall",
        "description": null,
        "rating": null,
        "contactNo": null,
        "unitNo": null,
        "hawkerCentreId": 1,
        "createdAt": "2020-12-16T06:53:15.271Z",
        "updatedAt": "2020-12-16T06:53:15.271Z",
        "HawkerCentre": {
            "id": 1,
            "name": "fav hawker centre",
            "address": "asdf",
            "regionId": 2,
            "createdAt": "2020-12-16T06:52:38.182Z",
            "updatedAt": "2020-12-16T06:52:38.182Z"
        }
    }
}
```

**_Status Code:_** 200

<br>

### 7. Upload product images

**_Endpoint:_**

```bash
Method: POST
Type: FORMDATA
URL: {{server_url}}/products/:id/upload
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 16    |             |

**_Body:_**

| Key    | Value | Description |
| ------ | ----- | ----------- |
| images |       |             |

**_More example Requests/Responses:_**

##### I. Example Request: Upload product images

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     |             |

**_Body:_**

| Key    | Value | Description |
| ------ | ----- | ----------- |
| images |       |             |

##### I. Example Response: Upload product images

```js
{
    "id": 1,
    "name": "Duck Rice",
    "category": "chinese cuisine",
    "description": "duck rice",
    "price": 2.5,
    "stallId": 1,
    "createdAt": "2020-12-16T09:10:24.065Z",
    "updatedAt": "2020-12-16T09:10:24.065Z",
    "Images": [
        {
            "id": 6,
            "downloadUrl": "https://storage.googleapis.com/test-bucket-2314/da21d345-950e-4aca-9a96-ccbb3b8ab5e5.jpeg"
        }
    ],
    "Stall": {
        "id": 1,
        "name": "fav stall",
        "description": null,
        "rating": null,
        "contactNo": null,
        "unitNo": null,
        "hawkerCentreId": 1,
        "createdAt": "2020-12-16T06:53:15.271Z",
        "updatedAt": "2020-12-16T06:53:15.271Z",
        "HawkerCentre": {
            "id": 1,
            "name": "fav hawker centre",
            "address": "asdf",
            "regionId": 2,
            "createdAt": "2020-12-16T06:52:38.182Z",
            "updatedAt": "2020-12-16T06:52:38.182Z"
        }
    }
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

## Reset

### 1. Reset database

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{server_url}}/reset/
```

## Reviews

### 1. Create review for stall

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{server_url}}/stalls/:id/reviews
```

**_Headers:_**

| Key          | Value     | Description |
| ------------ | --------- | ----------- |
| x-auth-token | {{token}} |             |

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 15    |             |

**_Body:_**

```js
{
    "description": "Very Good",
    "rating": 4
}
```

### 2. Delete review

**_Endpoint:_**

```bash
Method: DELETE
Type: RAW
URL: {{server_url}}/reviews/10
```

### 3. Get review

**_Endpoint:_**

```bash
Method: GET
Type: RAW
URL: {{server_url}}/reviews/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

### 4. Get reviews for stall

**_Endpoint:_**

```bash
Method: GET
Type: RAW
URL: {{server_url}}/stalls/:id/reviews
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

### 5. Update review

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{server_url}}/reviews/:id
```

**_Headers:_**

| Key          | Value     | Description |
| ------------ | --------- | ----------- |
| x-auth-token | {{token}} |             |

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

**_Body:_**

```js
{
    "description": "Not Very Good",
    "rating": 4,
    "stallId": 1
}
```

## Search

### 1. Search stalls

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{server_url}}/search/:query
```

**_Query params:_**

| Key      | Value | Description |
| -------- | ----- | ----------- |
| limit    | 3     |             |
| page     | 1     |             |
| category | 1,2   |             |
| region   | 2,4   |             |

**_URL variables:_**

| Key   | Value | Description |
| ----- | ----- | ----------- |
| query | adam  |             |

## SecurityQuestions

### 1. Create SecurityQuestion

Requires admin token

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{server_url}}/securityQuestions
```

**_Body:_**

```js
{
    "content": "What is the name of your primary school?",
    "isActive": "true"
}
```

### 2. Create SecurityQuestion Copy

Requires admin token

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{server_url}}/securityQuestions/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     |             |

**_Body:_**

```js
{
    "content": "What is the name of your primary school?",
    "isActive": "false"
}
```

### 3. Delete SecurityQuestions

Request will only be successful if there is no current user using this question

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{server_url}}/securityQuestions/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     |             |

### 4. Get Active SecurityQuestions

Requires admin token

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{server_url}}/securityQuestions
```

### 5. Get All SecurityQuestions

Requires admin token

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{server_url}}/securityQuestions/all
```

### 6. Get SecurityQuestion

Requires admin token

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{server_url}}/securityQuestions/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     |             |

## Stalls

Fields allowed:

- name: string;
- description: string | null;
- rating: number | null;
- contactNo: string | null;
- unitNo: string | null;
- hawkerCentreId: number;

### 1. Bulk Destroy stalls

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{server_url}}/stalls/bulkDestroy
```

**_Body:_**

```js
{
    "ids": [18, 19]
}
```

### 2. Create stall

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{server_url}}/stalls
```

**_Body:_**

```js
{
    "name": "3rd chicken Rice Stall",
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
    "name": "3rd chicken Rice Stall",
    "description": "some description",
    "rating": 1.5,
    "contactNo": "97654321",
    "unitNo": "01-03",
    "hawkerCentreId": 1
}
```

##### I. Example Response: Create stall

```js
{
    "id": 4,
    "name": "3rd chicken Rice Stall",
    "description": "some description",
    "rating": 1.5,
    "contactNo": "97654321",
    "unitNo": "01-03",
    "hawkerCentreId": 1,
    "createdAt": "2020-12-10T07:40:42.437Z",
    "updatedAt": "2020-12-10T07:40:42.437Z",
    "Products": [],
    "HawkerCentre": {
        "id": 1,
        "name": "Yuhua Village Market",
        "address": "254 Jurong East Street 24, Singapore 600254",
        "regionId": 1,
        "createdAt": "2020-12-09T06:26:55.647Z",
        "updatedAt": "2020-12-09T06:29:04.408Z",
        "Region": {
            "id": 1,
            "name": "West",
            "createdAt": "2020-12-09T06:22:44.182Z",
            "updatedAt": "2020-12-09T06:23:07.436Z"
        }
    }
}
```

**_Status Code:_** 201

<br>

### 3. Delete stall

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{server_url}}/stalls/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 10    |             |

**_More example Requests/Responses:_**

##### I. Example Request: Delete stall

**_Status Code:_** 200

<br>

### 4. Delete stall images

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{server_url}}/stalls/:id/delete-images
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 4     |             |

**_Body:_**

```js
{
    "imageIds": [30]
}
```

### 5. Get stall

**_Endpoint:_**

```bash
Method: GET
Type: RAW
URL: {{server_url}}/stalls/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

**_More example Requests/Responses:_**

##### I. Example Request: Get stall

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

##### I. Example Response: Get stall

```js
[
  {
    id: 1,
    name: '5 Star Chicken Rice Stall',
    description: 'newer description',
    rating: 4.5,
    contactNo: '91234567',
    unitNo: '01-02',
    hawkerCentreId: 1,
    createdAt: '2020-12-09T06:37:05.828Z',
    updatedAt: '2020-12-09T06:37:35.710Z',
    Products: [
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
      },
    ],
    HawkerCentre: {
      id: 1,
      name: 'Yuhua Village Market',
      address: '254 Jurong East Street 24, Singapore 600254',
      regionId: 1,
      createdAt: '2020-12-09T06:26:55.647Z',
      updatedAt: '2020-12-09T06:29:04.408Z',
      Region: {
        id: 1,
        name: 'West',
        createdAt: '2020-12-09T06:22:44.182Z',
        updatedAt: '2020-12-09T06:23:07.436Z',
      },
    },
  },
];
```

**_Status Code:_** 200

<br>

### 6. Get stalls

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{server_url}}/stalls
```

**_Query params:_**

| Key   | Value | Description |
| ----- | ----- | ----------- |
| limit | 3     |             |
| page  | 1     |             |

**_More example Requests/Responses:_**

##### I. Example Request: Get stalls

##### I. Example Response: Get stalls

```js
[
  {
    id: 1,
    name: '5 Star Chicken Rice Stall',
    description: 'newer description',
    rating: 4.5,
    contactNo: '91234567',
    unitNo: '01-02',
    hawkerCentreId: 1,
    createdAt: '2020-12-09T06:37:05.828Z',
    updatedAt: '2020-12-09T06:37:35.710Z',
    Products: [
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
      },
    ],
    HawkerCentre: {
      id: 1,
      name: 'Yuhua Village Market',
      address: '254 Jurong East Street 24, Singapore 600254',
      regionId: 1,
      createdAt: '2020-12-09T06:26:55.647Z',
      updatedAt: '2020-12-09T06:29:04.408Z',
      Region: {
        id: 1,
        name: 'West',
        createdAt: '2020-12-09T06:22:44.182Z',
        updatedAt: '2020-12-09T06:23:07.436Z',
      },
    },
  },
  {
    id: 4,
    name: '3rd chicken Rice Stall',
    description: 'some description',
    rating: 1.5,
    contactNo: '97654321',
    unitNo: '01-03',
    hawkerCentreId: 1,
    createdAt: '2020-12-10T07:40:42.437Z',
    updatedAt: '2020-12-10T07:40:42.437Z',
    Products: [],
    HawkerCentre: {
      id: 1,
      name: 'Yuhua Village Market',
      address: '254 Jurong East Street 24, Singapore 600254',
      regionId: 1,
      createdAt: '2020-12-09T06:26:55.647Z',
      updatedAt: '2020-12-09T06:29:04.408Z',
      Region: {
        id: 1,
        name: 'West',
        createdAt: '2020-12-09T06:22:44.182Z',
        updatedAt: '2020-12-09T06:23:07.436Z',
      },
    },
  },
];
```

**_Status Code:_** 200

<br>

### 7. Import stalls CSV

**_Endpoint:_**

```bash
Method: POST
Type: FORMDATA
URL: {{server_url}}/stalls/import
```

**_Body:_**

| Key  | Value | Description |
| ---- | ----- | ----------- |
| file |       |             |

### 8. Update stall

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
    "description": "extremely updated description"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: Update stall

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     |             |

**_Body:_**

```js
{
    "description": "extremely updated description"
}
```

##### I. Example Response: Update stall

```js
{
    "id": 1,
    "name": "5 Star Chicken Rice Stall",
    "description": "extremely updated description",
    "rating": 4.5,
    "contactNo": "91234567",
    "unitNo": "01-02",
    "hawkerCentreId": 1,
    "createdAt": "2020-12-09T06:37:05.828Z",
    "updatedAt": "2020-12-10T07:52:16.327Z",
    "Products": [
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
    ],
    "HawkerCentre": {
        "id": 1,
        "name": "Yuhua Village Market",
        "address": "254 Jurong East Street 24, Singapore 600254",
        "regionId": 1,
        "createdAt": "2020-12-09T06:26:55.647Z",
        "updatedAt": "2020-12-09T06:29:04.408Z",
        "Region": {
            "id": 1,
            "name": "West",
            "createdAt": "2020-12-09T06:22:44.182Z",
            "updatedAt": "2020-12-09T06:23:07.436Z"
        }
    }
}
```

**_Status Code:_** 200

<br>

### 9. Upload stall images

**_Endpoint:_**

```bash
Method: POST
Type: FORMDATA
URL: {{server_url}}/stalls/:id/upload
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 16    |             |

**_Body:_**

| Key    | Value | Description |
| ------ | ----- | ----------- |
| images |       |             |

**_More example Requests/Responses:_**

##### I. Example Request: Upload stall images

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     |             |

**_Body:_**

| Key    | Value | Description |
| ------ | ----- | ----------- |
| images |       |             |

##### I. Example Response: Upload stall images

```js
{
    "id": 1,
    "name": "fav stall",
    "description": null,
    "rating": null,
    "contactNo": null,
    "unitNo": null,
    "hawkerCentreId": 1,
    "createdAt": "2020-12-16T06:53:15.271Z",
    "updatedAt": "2020-12-16T06:53:15.271Z",
    "Products": [
        {
            "id": 1,
            "name": "Duck Rice",
            "category": "chinese cuisine",
            "description": "duck rice",
            "price": 2.5,
            "image": "http://image_url",
            "stallId": 1,
            "createdAt": "2020-12-16T09:10:24.065Z",
            "updatedAt": "2020-12-16T09:10:24.065Z"
        }
    ],
    "Images": [
        {
            "id": 2,
            "downloadUrl": "https://storage.googleapis.com/test-bucket-2314/258fb451-c4a8-4804-839b-09401438fb6d.jpeg"
        }
    ],
    "HawkerCentre": {
        "id": 1,
        "name": "fav hawker centre",
        "address": "asdf",
        "regionId": 2,
        "createdAt": "2020-12-16T06:52:38.182Z",
        "updatedAt": "2020-12-16T06:52:38.182Z",
        "Region": {
            "id": 2,
            "name": "North",
            "createdAt": "2020-12-16T06:52:03.192Z",
            "updatedAt": "2020-12-16T06:52:03.192Z"
        }
    }
}
```

**_Status Code:_** 200

<br>

## UserAnswers

### 1. Create User Answer

Requires admin token

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{server_url}}/userAnswers
```

**_Body:_**

```js
{
    "content": "My dog name is Scooby",
    "userId": 2,
    "securityQuestionId": 1
}
```

### 2. Delete User Answer

Requires admin token

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{server_url}}/userAnswers/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  |       |             |

### 3. Validate User Answers

Requires admin token

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{server_url}}/userAnswers/validate
```

**_Body:_**

```js
{
    "userId": 1,
    "questionAnswerSet": [
        {
            "questionId": 1,
             "answer": "My name is Goofy"
        },
        {
            "questionId": 2,
             "answer": "My name is Donald"
        },
        {
            "questionId": 3,
             "answer": "My name is Mickey"
        }

    ]
}
```

## Users

Token needs sent in the header with "x-auth-token" as key and the token as value for routes that require authentication.

Fields allowed:

- email: string;
- username: string;
- password: string;
- role: one of [admin, user]; (default is 'user' if 'role' value is not sent with the request)

### 1. Get user by email

Requires admin token

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{server_url}}/users/email
```

**_Query params:_**

| Key   | Value                | Description |
| ----- | -------------------- | ----------- |
| email | fake_email@gmail.com |             |

### 2. Get users

Requires admin token

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{server_url}}/users
```

### 3. Login user

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{server_url}}/login
```

**_Body:_**

```js
{
    "email": "fake_email@gmail.com",
    "password": "asdf"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: Login user

**_Body:_**

```js
{
    "email": "fake_email@gmail.com",
    "password": "asdf"
}
```

##### I. Example Response: Login user

```js
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA4Mzg4ODIwLCJleHAiOjE2MDg5OTM2MjB9.O6nzVJFmMG-bwOWWPjqMw_Ebt7pr9Csmc2A0AXeWruY"
}
```

**_Status Code:_** 201

<br>

### 4. Register admin

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{server_url}}/register-admin
```

**_Body:_**

```js
{
    "email": "fake_admin_@gmail.com",
    "username": "fake_username",
    "password": "asdf"
}
```

### 5. Register user

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{server_url}}/register
```

**_Body:_**

```js
{
    "email": "fake_email@gmail.com",
    "username": "fake_username",
    "password": "asdf"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: Register user

**_Body:_**

```js
{
    "email": "fake_email@gmail.com",
    "password": "asdf"
}
```

##### I. Example Response: Register user

```js
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA4Mzg3MzE2LCJleHAiOjE2MDg5OTIxMTZ9.HTTRAhau8_we-HlJsRqsJgtBcYmDFROnlLSfgKomNfQ"
}
```

**_Status Code:_** 201

<br>

### 6. Update other user

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{server_url}}/users/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 18    |             |

**_Body:_**

```js
{
    "username": "updated_fake_email@gmail.com",
    "role": "admin",
    "password": "password"
}
```

### 7. Update user

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{server_url}}/updateUser
```

**_Headers:_**

| Key | Value | Description |
| --- | ----- | ----------- |
|     |       |             |

**_Body:_**

```js
{
    "username": "hello",
    "password": "password"
}
```

---

[Back to top](#dk-api)

> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2021-03-20 23:19:58 by [docgen](https://github.com/thedevsaddam/docgen)
