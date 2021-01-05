
# dk-api



## Indices

* [Categories](#categories)

  * [Create Category](#1-create-category)
  * [Delete Category](#2-delete-category)
  * [Get Categories](#3-get-categories)
  * [Get Category](#4-get-category)
  * [Update Category](#5-update-category)

* [CategoryStalls](#categorystalls)

  * [Create CategoryStall](#1-create-categorystall)
  * [Delete CategoryStall](#2-delete-categorystall)
  * [Get CategoryStall](#3-get-categorystall)
  * [Get CategoryStalls](#4-get-categorystalls)
  * [Update CategoryStall](#5-update-categorystall)

* [HawkerCentres](#hawkercentres)

  * [Create hawker centre](#1-create-hawker-centre)
  * [Delete hawker centre](#2-delete-hawker-centre)
  * [Get hawker centre](#3-get-hawker-centre)
  * [Get hawker centres](#4-get-hawker-centres)
  * [Update hawker centre](#5-update-hawker-centre)

* [Products](#products)

  * [Create product](#1-create-product)
  * [Delete product](#2-delete-product)
  * [Delete product images](#3-delete-product-images)
  * [Get product](#4-get-product)
  * [Get products](#5-get-products)
  * [Update product](#6-update-product)
  * [Upload product images](#7-upload-product-images)

* [Regions](#regions)

  * [Create region](#1-create-region)
  * [Delete region](#2-delete-region)
  * [Get region](#3-get-region)
  * [Get regions](#4-get-regions)
  * [Update region](#5-update-region)

* [Reviews](#reviews)

  * [Create Review for Stall](#1-create-review-for-stall)
  * [Delete Review](#2-delete-review)
  * [Get Review](#3-get-review)
  * [Get Reviews for Stall](#4-get-reviews-for-stall)
  * [Update Review](#5-update-review)

* [Search](#search)

  * [Search stalls](#1-search-stalls)

* [Stalls](#stalls)

  * [Create stall](#1-create-stall)
  * [Delete stall](#2-delete-stall)
  * [Delete stall images](#3-delete-stall-images)
  * [Get stall](#4-get-stall)
  * [Get stalls](#5-get-stalls)
  * [Update stall](#6-update-stall)
  * [Upload stall images](#7-upload-stall-images)

* [Users](#users)

  * [Login user](#1-login-user)
  * [Register user](#2-register-user)


--------


## Categories



### 1. Create Category



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{server_url}}/categories
```



***Body:***

```js        
{
    "name": "Drinks"
}
```



### 2. Delete Category



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{server_url}}/categories/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



### 3. Get Categories



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{server_url}}/categories
```



### 4. Get Category



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{server_url}}/categories/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



### 5. Update Category



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{server_url}}/categories/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***Body:***

```js        
{
    "name": "Japanese Food"
}
```



## CategoryStalls



### 1. Create CategoryStall



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{server_url}}/categoryStalls
```



***Body:***

```js        
{
    "stallId": "1",
    "categoryId": "1"
}
```



### 2. Delete CategoryStall



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{server_url}}/categoryStalls/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



### 3. Get CategoryStall



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{server_url}}/categoryStalls/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



### 4. Get CategoryStalls



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{server_url}}/categoryStalls
```



### 5. Update CategoryStall



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{server_url}}/categoryStalls/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***Body:***

```js        
{
    "stallId": "1",
    "categoryId": "2"
}
```



## HawkerCentres
Fields needed
- name: string;
- address: string | null;
- regionId: number;



### 1. Create hawker centre



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{server_url}}/hawkercentres
```



***Body:***

```js        
{
    "name": "Fake hawker centre",
    "address": "Fake address",
    "regionId": 1
}
```



***More example Requests/Responses:***


##### I. Example Request: Create hawker centre



***Body:***

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


***Status Code:*** 201

<br>



### 2. Delete hawker centre



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{server_url}}/hawkercentres/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***More example Requests/Responses:***


##### I. Example Request: Delete hawker centre



***Status Code:*** 200

<br>



### 3. Get hawker centre



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{server_url}}/hawkercentres/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***More example Requests/Responses:***


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


***Status Code:*** 200

<br>



### 4. Get hawker centres



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{server_url}}/hawkercentres
```



***More example Requests/Responses:***


##### I. Example Request: Get hawker centres



##### I. Example Response: Get hawker centres
```js
[
    {
        "hawkerCentreId": 1,
        "name": "Yuhua Village Market",
        "address": "254 Jurong East Street 24, Singapore 600254",
        "regionId": 1,
        "createdAt": "2020-12-09T06:26:55.647Z",
        "updatedAt": "2020-12-09T06:29:04.408Z"
    },
    {
        "hawkerCentreId": 2,
        "name": "Fake hawker centre",
        "address": "Fake address",
        "regionId": 1,
        "createdAt": "2020-12-09T06:32:50.473Z",
        "updatedAt": "2020-12-09T06:32:50.473Z"
    }
]
```


***Status Code:*** 201

<br>



### 5. Update hawker centre



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{server_url}}/hawkercentres/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***Body:***

```js        
{
    "name": "Yuhua Village Market"
}
```



***More example Requests/Responses:***


##### I. Example Request: Update hawker centre



***Body:***

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


***Status Code:*** 200

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



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{server_url}}/products
```



***Body:***

```js        
{
    "name": "Duck Rice",
    "stallId": 1,
    "category": "chinese cuisine",
    "description": "duck rice",
    "price": 2.5
}
```



***More example Requests/Responses:***


##### I. Example Request: Create product



***Body:***

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


***Status Code:*** 201

<br>



### 2. Delete product



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{server_url}}/products/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***More example Requests/Responses:***


##### I. Example Request: Delete product



***Status Code:*** 200

<br>



### 3. Delete product images



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{server_url}}/products/:id/delete-images
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***Body:***

```js        
{
    "imageIds": [26]
}
```



### 4. Get product



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{server_url}}/products/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***More example Requests/Responses:***


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


***Status Code:*** 200

<br>



### 5. Get products


Get information of all products. Includes the information of the respective stalls.


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{server_url}}/products
```



***More example Requests/Responses:***


##### I. Example Request: Get products



##### I. Example Response: Get products
```js
[
    {
        "id": 2,
        "name": "Duck Rice",
        "category": "chinese cuisine",
        "description": "duck rice",
        "price": 2.5,
        "stallId": 1,
        "createdAt": "2020-12-09T06:41:47.910Z",
        "updatedAt": "2020-12-09T06:41:47.910Z",
        "Stall": {
            "id": 1,
            "name": "5 Star Chicken Rice Stall",
            "description": "newer description",
            "rating": 4.5,
            "contactNo": "91234567",
            "unitNo": "01-02",
            "hawkerCentreId": 1,
            "createdAt": "2020-12-09T06:37:05.828Z",
            "updatedAt": "2020-12-09T06:37:35.710Z",
            "HawkerCentre": {
                "id": 1,
                "name": "Yuhua Village Market",
                "address": "254 Jurong East Street 24, Singapore 600254",
                "regionId": 1,
                "createdAt": "2020-12-09T06:26:55.647Z",
                "updatedAt": "2020-12-09T06:29:04.408Z"
            }
        }
    },
    {
        "id": 1,
        "name": "Chicken Rice",
        "category": "chinese cuisine",
        "description": "delicious chicken rice",
        "price": 3.8,
        "stallId": 1,
        "createdAt": "2020-12-09T06:40:05.643Z",
        "updatedAt": "2020-12-09T06:40:44.440Z",
        "Stall": {
            "id": 1,
            "name": "5 Star Chicken Rice Stall",
            "description": "newer description",
            "rating": 4.5,
            "contactNo": "91234567",
            "unitNo": "01-02",
            "hawkerCentreId": 1,
            "createdAt": "2020-12-09T06:37:05.828Z",
            "updatedAt": "2020-12-09T06:37:35.710Z",
            "HawkerCentre": {
                "id": 1,
                "name": "Yuhua Village Market",
                "address": "254 Jurong East Street 24, Singapore 600254",
                "regionId": 1,
                "createdAt": "2020-12-09T06:26:55.647Z",
                "updatedAt": "2020-12-09T06:29:04.408Z"
            }
        }
    }
]
```


***Status Code:*** 200

<br>



### 6. Update product



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{server_url}}/products/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***Body:***

```js        
{
    "price": 3.8
}
```



***More example Requests/Responses:***


##### I. Example Request: Update product



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 3 |  |



***Body:***

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


***Status Code:*** 200

<br>



### 7. Upload product images



***Endpoint:***

```bash
Method: POST
Type: FORMDATA
URL: {{server_url}}/products/:id/upload
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 1 |  |



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| images |  |  |



***More example Requests/Responses:***


##### I. Example Request: Upload product images



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 1 |  |



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| images |  |  |



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


***Status Code:*** 200

<br>



## Regions
Fields allowed
- name: string;



### 1. Create region



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{server_url}}/regions
```



***Body:***

```js        
{
    "name": "East"
}
```



***More example Requests/Responses:***


##### I. Example Request: Create region



***Body:***

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


***Status Code:*** 201

<br>



### 2. Delete region



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{server_url}}/regions/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***More example Requests/Responses:***


##### I. Example Request: Delete region



***Status Code:*** 200

<br>



### 3. Get region



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{server_url}}/regions/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***More example Requests/Responses:***


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


***Status Code:*** 200

<br>



### 4. Get regions



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{server_url}}/regions
```



***More example Requests/Responses:***


##### I. Example Request: Get regions



##### I. Example Response: Get regions
```js
[
    {
        "regionId": 1,
        "name": "West",
        "createdAt": "2020-12-09T06:22:44.182Z",
        "updatedAt": "2020-12-09T06:23:07.436Z"
    },
    {
        "regionId": 2,
        "name": "East",
        "createdAt": "2020-12-09T06:23:41.635Z",
        "updatedAt": "2020-12-09T06:23:41.635Z"
    }
]
```


***Status Code:*** 201

<br>



### 5. Update region



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{server_url}}/regions/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***Body:***

```js        
{
    "name": "West"
}
```



***More example Requests/Responses:***


##### I. Example Request: Update region



***Body:***

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


***Status Code:*** 200

<br>



## Reviews



### 1. Create Review for Stall



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{server_url}}/stalls/:id/reviews
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-auth-token | {{token}} |  |



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***Body:***

```js        
{
    "description": "Very Good",
    "rating": 4
}
```



### 2. Delete Review



***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: {{server_url}}/reviews/10
```



### 3. Get Review



***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{server_url}}/reviews/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |


### 4. Get Reviews for Stall



***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{server_url}}/stalls/:id/reviews



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



### 5. Update Review



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{server_url}}/reviews/:id
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-auth-token | {{token}} |  |



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***Body:***

```js        
{
    "description": "Not Very Good",
    "rating": 4,
    "stallId": 1
}
```



## Search



### 1. Search stalls



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{server_url}}/search/:query
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| query |  |  |



## Stalls
Fields allowed:
- name: string;
- description: string | null;
- rating: number | null;
- contactNo: string | null;
- unitNo: string | null;
- hawkerCentreId: number;



### 1. Create stall



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{server_url}}/stalls
```



***Body:***

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



***More example Requests/Responses:***


##### I. Example Request: Create stall



***Body:***

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


***Status Code:*** 201

<br>



### 2. Delete stall



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{server_url}}/stalls/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***More example Requests/Responses:***


##### I. Example Request: Delete stall



***Status Code:*** 200

<br>



### 3. Delete stall images



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{server_url}}/stalls/:id/delete-images
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 4 |  |



***Body:***

```js        
{
    "imageIds": [30]
}
```



### 4. Get stall



***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{server_url}}/stalls/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***More example Requests/Responses:***


##### I. Example Request: Get stall



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



##### I. Example Response: Get stall
```js
[
    {
        "id": 1,
        "name": "5 Star Chicken Rice Stall",
        "description": "newer description",
        "rating": 4.5,
        "contactNo": "91234567",
        "unitNo": "01-02",
        "hawkerCentreId": 1,
        "createdAt": "2020-12-09T06:37:05.828Z",
        "updatedAt": "2020-12-09T06:37:35.710Z",
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
]
```


***Status Code:*** 200

<br>



### 5. Get stalls



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{server_url}}/stalls
```



***More example Requests/Responses:***


##### I. Example Request: Get stalls



##### I. Example Response: Get stalls
```js
[
    {
        "id": 1,
        "name": "5 Star Chicken Rice Stall",
        "description": "newer description",
        "rating": 4.5,
        "contactNo": "91234567",
        "unitNo": "01-02",
        "hawkerCentreId": 1,
        "createdAt": "2020-12-09T06:37:05.828Z",
        "updatedAt": "2020-12-09T06:37:35.710Z",
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
    },
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
]
```


***Status Code:*** 200

<br>



### 6. Update stall



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{server_url}}/stalls/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***Body:***

```js        
{
    "description": "extremely updated description"
}
```



***More example Requests/Responses:***


##### I. Example Request: Update stall



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 1 |  |



***Body:***

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


***Status Code:*** 200

<br>



### 7. Upload stall images



***Endpoint:***

```bash
Method: POST
Type: FORMDATA
URL: {{server_url}}/stalls/:id/upload
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 1 |  |



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| images |  |  |



***More example Requests/Responses:***


##### I. Example Request: Upload stall images



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 1 |  |



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| images |  |  |



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


***Status Code:*** 200

<br>



## Users
Token needs sent in the header with "x-auth-token" as key and the token as value for routes that require authentication.



### 1. Login user



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{server_url}}/login
```



***Body:***

```js        
{
    "email": "fake_email@gmail.com",
    "password": "asdf"
}
```



***More example Requests/Responses:***


##### I. Example Request: Login user



***Body:***

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


***Status Code:*** 201

<br>



### 2. Register user



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{server_url}}/register
```



***Body:***

```js        
{
    "email": "fake_email@gmail.com",
    "password": "asdf"
}
```



***More example Requests/Responses:***


##### I. Example Request: Register user



***Body:***

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


***Status Code:*** 201

<br>



---
[Back to top](#dk-api)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2021-01-06 00:10:40 by [docgen](https://github.com/thedevsaddam/docgen)
