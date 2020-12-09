
# DK API



## Indices

* [HawkerCentres](#hawkercentres)

  * [Delete hawker centre detail from the database](#1-delete-hawker-centre-detail-from-the-database)
  * [Get hawker centre details from the database](#2-get-hawker-centre-details-from-the-database)
  * [Get hawker centres from the database](#3-get-hawker-centres-from-the-database)
  * [Post hawker centre details to the database](#4-post-hawker-centre-details-to-the-database)
  * [Put hawker centre details into the database](#5-put-hawker-centre-details-into-the-database)

* [Products](#products)

  * [Delete product details from the database](#1-delete-product-details-from-the-database)
  * [Get product details from the database](#2-get-product-details-from-the-database)
  * [Get products from the database](#3-get-products-from-the-database)
  * [Post product details to the database](#4-post-product-details-to-the-database)
  * [Put product details into the database](#5-put-product-details-into-the-database)

* [Regions](#regions)

  * [Delete region details from the database](#1-delete-region-details-from-the-database)
  * [Get region details from the database](#2-get-region-details-from-the-database)
  * [Get regions from the database](#3-get-regions-from-the-database)
  * [Post region details to the database](#4-post-region-details-to-the-database)
  * [Put region details into the database](#5-put-region-details-into-the-database)

* [Stalls](#stalls)

  * [Delete stall details from the database](#1-delete-stall-details-from-the-database)
  * [Get stall details from the database](#2-get-stall-details-from-the-database)
  * [Get stalls from the database](#3-get-stalls-from-the-database)
  * [Post stall details to the database](#4-post-stall-details-to-the-database)
  * [Put product details into the database](#5-put-product-details-into-the-database-1)


--------


## HawkerCentres



### 1. Delete hawker centre detail from the database



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: https://dk-api-21.herokuapp.com/hawkercentres/:hawkerCentreId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| hawkerCentreId |  |  |



### 2. Get hawker centre details from the database



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://dk-api-21.herokuapp.com/hawkercentres/:hawkerCentreId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| hawkerCentreId |  |  |



### 3. Get hawker centres from the database



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://dk-api-21.herokuapp.com/hawkercentres
```



### 4. Post hawker centre details to the database



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://dk-api-21.herokuapp.com/hawkercentres
```



***Body:***

```js        
{
    "name": "Adam Food Centre",
    "address": "<string>",
    "regionId": 5
}
```



### 5. Put hawker centre details into the database



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://dk-api-21.herokuapp.com/hawkercentres/:hawkerCentreId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| hawkerCentreId |  |  |



***Body:***

```js        
{
    "name": "<string>",
    "address": "<string>",
    "regionId": "<integer>"
}
```



## Products



### 1. Delete product details from the database



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: https://dk-api-21.herokuapp.com/products/:productId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| productId |  |  |



### 2. Get product details from the database



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://dk-api-21.herokuapp.com/products/:productId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| productId |  |  |



### 3. Get products from the database


Get information of all products. Includes the information of the respective stalls.


***Endpoint:***

```bash
Method: GET
Type: 
URL: https://dk-api-21.herokuapp.com/products
```



### 4. Post product details to the database



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://dk-api-21.herokuapp.com/products
```



***Body:***

```js        
{
    "name": "Chicken Rice",
    "stallId": 1,
    "category": "<string>",
    "description": "<string>",
    "price": "<double>",
    "image": "<string>"
}
```



### 5. Put product details into the database



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://dk-api-21.herokuapp.com/products/:productId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| productId |  |  |



***Body:***

```js        
{
    "name": "<string>",
    "category": "<string>",
    "description": "<string>",
    "price": "<double>",
    "image": "<string>",
    "stallId": "<integer>"
}
```



## Regions



### 1. Delete region details from the database



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: https://dk-api-21.herokuapp.com/regions/:regionId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| regionId |  |  |



### 2. Get region details from the database



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://dk-api-21.herokuapp.com/regions/:regionId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| regionId |  |  |



### 3. Get regions from the database



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://dk-api-21.herokuapp.com/regions
```



### 4. Post region details to the database



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://dk-api-21.herokuapp.com/regions
```



***Body:***

```js        
{
    "name": "North"
}
```



### 5. Put region details into the database



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://dk-api-21.herokuapp.com/regions/:regionId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| regionId |  |  |



***Body:***

```js        
{
    "name": "<string>"
}
```



## Stalls



### 1. Delete stall details from the database



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: https://dk-api-21.herokuapp.com/stalls/:stallId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| stallId |  |  |



### 2. Get stall details from the database



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://dk-api-21.herokuapp.com/stalls/:stallId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| stallId |  |  |



### 3. Get stalls from the database



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://dk-api-21.herokuapp.com/stalls
```



### 4. Post stall details to the database



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://dk-api-21.herokuapp.com/stalls
```



***Body:***

```js        
{
    "name": "5 Star Chicken Rice Stall",
    "description": "<string>",
    "rating": "<double>",
    "contactNo": "<integer>",
    "unitNo": "<string>",
    "hawkerCentreId": 2
}
```



### 5. Put product details into the database



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://dk-api-21.herokuapp.com/stalls/:stallId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| stallId |  |  |



***Body:***

```js        
{
    "name": "<string>",
    "description": "<string>",
    "rating": "<double>",
    "contactNo": "<integer>",
    "unitNo": "<string>",
    "hawkerCentreId": "<integer>"
}
```



---
[Back to top](#dk-api)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2020-12-07 17:54:52 by [docgen](https://github.com/thedevsaddam/docgen)
