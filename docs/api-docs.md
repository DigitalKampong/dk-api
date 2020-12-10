
# dk-api



## Indices

* [HawkerCentres](#hawkercentres)

  * [Create hawker centre](#1-create-hawker-centre)
  * [Delete hawker centre](#2-delete-hawker-centre)
  * [Get hawker centre](#3-get-hawker-centre)
  * [Get hawker centres](#4-get-hawker-centres)
  * [Update hawker centre](#5-update-hawker-centre)

* [Products](#products)

  * [Create product](#1-create-product)
  * [Delete product](#2-delete-product)
  * [Get product](#3-get-product)
  * [Get products](#4-get-products)
  * [Update product](#5-update-product)

* [Regions](#regions)

  * [Create region](#1-create-region)
  * [Delete region](#2-delete-region)
  * [Get region](#3-get-region)
  * [Get regions](#4-get-regions)
  * [Update region](#5-update-region)

* [Stalls](#stalls)

  * [Create stall](#1-create-stall)
  * [Delete stall](#2-delete-stall)
  * [Get stall](#3-get-stall)
  * [Get stalls](#4-get-stalls)
  * [Update stall](#5-update-stall)


--------


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
    "price": 2.5,
    "image": "http://image_url"
}
```



***More example Requests/Responses:***


##### I. Example Request: Create product



***Body:***

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



### 3. Get product



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
    "image": "http://image_url",
    "stallId": 1,
    "createdAt": "2020-12-09T06:40:05.643Z",
    "updatedAt": "2020-12-09T06:40:44.440Z"
}
```


***Status Code:*** 200

<br>



### 4. Get products


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
        "image": "http://image_url",
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
        "image": "http://image_url",
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



### 5. Update product



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



***Body:***

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
    "name": "2nd chicken Rice Stall",
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



### 3. Get stall



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{server_url}}/stalls/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***More example Requests/Responses:***


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


***Status Code:*** 200

<br>



### 4. Get stalls



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
        "stallId": 1,
        "name": "5 Star Chicken Rice Stall",
        "description": "newer description",
        "rating": 4.5,
        "contactNo": "91234567",
        "unitNo": "01-02",
        "hawkerCentreId": 1,
        "createdAt": "2020-12-09T06:37:05.828Z",
        "updatedAt": "2020-12-09T06:37:35.710Z"
    },
    {
        "stallId": 2,
        "name": "2nd chicken Rice Stall",
        "description": "some description",
        "rating": 1.5,
        "contactNo": "97654321",
        "unitNo": "01-03",
        "hawkerCentreId": 1,
        "createdAt": "2020-12-09T06:38:06.634Z",
        "updatedAt": "2020-12-09T06:38:06.634Z"
    }
]
```


***Status Code:*** 201

<br>



### 5. Update stall



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
    "description": "newer description"
}
```



***More example Requests/Responses:***


##### I. Example Request: Update stall



***Body:***

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


***Status Code:*** 200

<br>



---
[Back to top](#dk-api)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2020-12-09 15:11:05 by [docgen](https://github.com/thedevsaddam/docgen)
