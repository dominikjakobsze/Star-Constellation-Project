# Api Documentation
---
## GET /stars

### Request
**Method**: *GET* <br />
**URL**: */stars* <br />
**Parameters**: *None* <br />
**Request Body**: *None* <br />

### Response
**Status Code**: *200 OK* <br />
**Body**: *None* <br />
**status_code**: *The status code of the response.*<br />
**stars_array**: *An array of star objects.*<br />
**message**: *A message indicating the result of the fetch.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />

```json 
{
    "status_code": 200,
    "stars_array": [
        {
            "id": 1,
            "name": "Star 1",
            "description": "Description of Star 1",
            "isOn": true,
            "isShine": true,
            "linkToImage": "/uploads/1.jpg",
            "createdAt": "2022-01-01T00:00:00.000Z",
            "updatedAt": "2022-01-01T00:00:00.000Z"
        },
        {
            "id": 2,
            "name": "Star 2",
            "description": "Description of Star 2",
            "isOn": false,
            "isShine": false,
            "linkToImage": "/uploads/2.jpg",
            "createdAt": "2022-01-01T00:00:00.000Z",
            "updatedAt": "2022-01-01T00:00:00.000Z"
        }
    ],
    "message": "All stars",
    "error": false
}
```

**Status Code**: *500 Internal Server Error*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 500,
    "message": "All stars",
    "error": true
}
```

---
## POST /stars

### Request
**Method**: *POST*<br />
**URL**: */stars*<br />
**Parameters**: *None*<br />
**Request Body**:<br />
>:warning:<br />
> **property_name:** name **|** **type:** string **|** **required:** true **|** **description:** the name of the star<br />
> **property_name:** description **|** **type:** string **|** **required:** true **|** **description:** the description of the star.<br />
> **property_name:** image **|** **type:** file **|** **required:** true **|** **description:** the image file of the star.<br />
>:warning:<br />

### Response
**Status Code**: *201 Created*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**star**: *The newly created star object.*<br />
**message**: *A message indicating the result of the fetch.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />

```json 
{
    "status_code": 201,
    "star": {
        "id": 1,
        "name": "Star 1",
        "description": "Description of Star 1",
        "isOn": false,
        "isShine": false,
        "linkToImage": "/uploads/1.jpg",
        "createdAt": "2022-01-01T00:00:00.000Z",
        "updatedAt": "2022-01-01T00:00:00.000Z"
    },
    "message": "Star created",
    "error": false
}
```

**Status Code**: *400 Bad Request*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 400,
    "message": "Please provide name, description and image",
    "error": true
}
```

**Status Code**: *500 Internal Server Error*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 500,
    "message": "Error creating star",
    "error": true
}
```
---
## PATCH /stars/:id

### Request
**Method**: *PATCH*<br />
**URL**: */stars/:id*<br />
**Parameters**:<br />
>:warning:<br />
> **property_name:** id **|** **type:** integer **|** **required:** true **|** **description:** the ID of the star to update<br />
>:warning:<br />

**Request Body**:<br />
>:warning:<br />
>**property_name:** name | **type:** string | **required:** false | **description:** the new name of the star.<br />
>**property_name:** description | **type:** string | **required:** false | **description:** the new description of the star.<br />
>**property_name:** isShine | **type:** boolean | **required:** false | **description:** whether the star should shine or not.<br />
>**property_name:** isOn | **type:** boolean | **required:** false | **description:** whether the star should be turned on or off.<br />
>**property_name:** image | **type:** file | **required:** false | **description:** the new image file of the star.<br />
>:warning:<br />

### Response
**Status Code**: *200 OK*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**star**: *The updated star object.*<br />
**message**: *A message indicating the result of the fetch.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json 
{
    "status_code": 200,
    "star": {
        "id": 1,
        "name": "Star 1",
        "description": "Description of Star 1",
        "isOn": false,
        "isShine": false,
        "linkToImage": "/uploads/1.jpg",
        "createdAt": "2022-01-01T00:00:00.000Z",
        "updatedAt": "2022-01-02T00:00:00.000Z"
    },
    "message": "Star with ID 1 updated",
    "error": false
}
```
**Status Code**: *404 Not Found*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 404,
    "message": "Star not found",
    "error": true
}
```
**Status Code**: *400 Bad Request*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 400,
    "message": "Bad request",
    "error": true
}
```
**Status Code**: *500 Internal Server Error*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 500,
    "message": "Error updating star",
    "error": true
}
```

---
## GET /stars/:id

### Request
**Method**: *GET*<br />
**URL**: */stars/:id*<br />
**Parameters**:<br />
>:warning:<br />
> **property_name:** id **|** **type:** integer **|** **required:** true **|** **description:** the ID of the star to retrieve<br />
>:warning:<br />

**Request Body**: *None*<br />

### Response
**Status Code**: *200 OK*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**star**: *The star object with the specified ID.*<br />
**message**: *A message indicating the result of the fetch.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json 
{
    "status_code": 200,
    "star": {
        "id": 1,
        "name": "Star 1",
        "description": "Description of Star 1",
        "isOn": false,
        "isShine": false,
        "linkToImage": "/uploads/1.jpg",
        "createdAt": "2022-01-01T00:00:00.000Z",
        "updatedAt": "2022-01-02T00:00:00.000Z"
    },
    "message": "Star with ID 1",
    "error": false
}
```
**Status Code**: *404 Not Found*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 404,
    "message": "Star not found",
    "error": true
}
```
**Status Code**: *500 Internal Server Error*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 500,
    "message": "Error getting star",
    "error": true
}
```

---
## DELETE /stars/:id

### Request
**Method**: *DELETE*<br />
**URL**: */stars/:id*<br />
**Parameters**:<br />
>:warning:<br />
> **property_name:** id **|** **type:** integer **|** **required:** true **|** **description:** the ID of the star to retrieve<br />
>:warning:<br />

**Request Body**: *None*<br />

### Response
**Status Code**: *200 OK*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**star**: *The star object with the specified ID.*<br />
**message**: *A message indicating the result of the fetch.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json 
{
    "status_code": 200,
    "message": "Star with ID 1 deleted",
    "error": false
}
```
**Status Code**: *404 Not Found*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 404,
    "message": "Star not found",
    "error": true
}
```
**Status Code**: *400 Bad Request*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 400,
    "message": "Bad request",
    "error": true
}
```
**Status Code**: *500 Internal Server Error*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 500,
    "message": "Error deleting star",
    "error": true
}
```

---
## GET /constellations

### Request
**Method**: *GET*<br />
**URL**: */constellations*<br />
**Parameters**: *None*<br />
**Request Body**: *None*<br />

### Response
**Status Code**: *200 OK*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**constellations_array**: *The star object with the specified ID.*<br />
**message**: *A message indicating the result of the fetch.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json 
{
    "status_code": 200,
    "constellations_array": [
        {
            "id": 1,
            "name": "Andromeda",
            "description": "The Chained Maiden",
            "stars": [
                {
                    "id": 1,
                    "name": "Star 1",
                    "description": "Description of Star 1",
                    "isOn": false,
                    "isShine": false,
                    "linkToImage": "/uploads/1.jpg",
                    "createdAt": "2022-01-01T00:00:00.000Z",
                    "updatedAt": "2022-01-02T00:00:00.000Z"
                }
            ],
            "createdAt": "2022-01-01T00:00:00.000Z",
            "updatedAt": "2022-01-02T00:00:00.000Z"
        },
        {
            "id": 2,
            "name": "Aquila",
            "description": "The Eagle",
            "stars": [
                {
                    "id": 2,
                    "name": "Star 2",
                    "description": "Description of Star 2",
                    "isOn": true,
                    "isShine": true,
                    "linkToImage": "/uploads/2.jpg",
                    "createdAt": "2022-01-01T00:00:00.000Z",
                    "updatedAt": "2022-01-02T00:00:00.000Z"
                }
            ],
            "createdAt": "2022-01-01T00:00:00.000Z",
            "updatedAt": "2022-01-02T00:00:00.000Z"
        }
    ],
    "message": "All constellations",
    "error": false
}
```
**Status Code**: *500 Internal Server Error*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 500,
    "message": "All constellations",
    "error": true
}
```

---
## POST /constellations

### Request
**Method**: *POST*<br />
**URL**: */constellations*<br />
**Parameters**: *None*<br />
**Request Body**:<br />
>:warning:<br />
> **property_name:** name **|** **type:** string **|** **required:** true **|** **description:** the name of the constellation.<br />
> **property_name:** description **|** **type:** string **|** **required:** true **|** **description:** the description of the constellation.<br />
> **property_name:** image **|** **type:** file **|** **required:** true **|** **description:** the image file of the constellation.<br />
>:warning:<br />

### Response
**Status Code**: *201 Created*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**constellation**: *The newly created constellation object.*<br />
**message**: *A message indicating the result of the fetch.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />

```json 
{
    "status_code": 201,
    "constellation": {
        "id": 1,
        "name": "Orion",
        "description": "A prominent constellation located on the celestial equator.",
        "isOn": false,
        "isShine": false,
        "linkToImage": "/uploads/orion.jpg",
        "createdAt": "2023-04-30T12:00:00.000Z",
        "updatedAt": "2023-04-30T12:00:00.000Z"
    },
    "message": "Constellation created",
    "error": false
}
```

**Status Code**: *400 Bad Request*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 400,
    "message": "Please provide name, description and image",
    "error": true
}
```

**Status Code**: *500 Internal Server Error*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 500,
    "message": "Error creating constellation",
    "error": true
}
```
---
## PATCH /constellations/:id

### Request
**Method**: *PATCH*<br />
**URL**: */constellations/:id*<br />
**Parameters**:<br />
>:warning:<br />
> **property_name:** id **|** **type:** integer **|** **required:** true **|** **description:** the ID of the constellation to update<br />
>:warning:<br />

**Request Body**:<br />
>:warning:<br />
>**property_name:** name | **type:** string | **required:** false | **description:** the new name of the constellation.<br />
>**property_name:** description | **type:** string | **required:** false | **description:** the new description of the constellation.<br />
>**property_name:** isShine | **type:** boolean | **required:** false | **description:** whether the constellation should shine or not.<br />
>**property_name:** isOn | **type:** boolean | **required:** false | **description:** whether the constellation should be turned on or off.<br />
>**property_name:** image | **type:** file | **required:** false | **description:** the new image file of the constellation.<br />
>:warning:<br />

### Response
**Status Code**: *200 OK*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**constellation**: *The updated constellation object.*<br />
**message**: *A message indicating the result of the fetch.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json 
{
    "status_code": 200,
    "constellation": {
        "id": 1,
        "name": "Orion",
        "description": "A prominent constellation located on the celestial equator.",
        "isOn": true,
        "isShine": false,
        "linkToImage": "/uploads/orion.jpg",
        "createdAt": "2023-04-30T12:00:00.000Z",
        "updatedAt": "2023-04-30T13:00:00.000Z"
    },
    "message": "Constellation with ID 1 updated",
    "error": false
}
```
**Status Code**: *404 Not Found*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 404,
    "message": "Constellation not found",
    "error": true
}
```
**Status Code**: *400 Bad Request*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 400,
    "message": "Bad request",
    "error": true
}
```
**Status Code**: *500 Internal Server Error*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 500,
    "message": "Error updating constellation",
    "error": true
}
```

---
## GET /constellations/:id

### Request
**Method**: *GET*<br />
**URL**: */constellations/:id*<br />
**Parameters**:<br />
>:warning:<br />
> **property_name:** id **|** **type:** integer **|** **required:** true **|** **description:** the ID of the constellation to retrieve<br />
>:warning:<br />

**Request Body**: *None*<br />

### Response
**Status Code**: *200 OK*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**constellation**: *The constellation object with the specified ID.*<br />
**message**: *A message indicating the result of the fetch.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json 
{
    "status_code": 200,
    "constellation": {
        "id": 1,
        "name": "Orion",
        "description": "A prominent constellation located on the celestial equator.",
        "isOn": false,
        "isShine": false,
        "linkToImage": "/uploads/orion.jpg",
        "createdAt": "2023-04-30T12:00:00.000Z",
        "updatedAt": "2023-04-30T12:00:00.000Z"
    },
    "message": "Constellation with ID 1",
    "error": false
}
```
**Status Code**: *404 Not Found*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 404,
    "message": "Constellation not found",
    "error": true
}
```
**Status Code**: *500 Internal Server Error*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 500,
    "message": "Error getting constellation",
    "error": true
}
```
---
## DELETE /constellations/:id

### Request
**Method**: *DELETE*<br />
**URL**: */constellations/:id*<br />
**Parameters**:<br />
>:warning:<br />
> **property_name:** id **|** **type:** integer **|** **required:** true **|** **description:** the ID of the constellation to retrieve<br />
>:warning:<br />

**Request Body**: *None*<br />

### Response
**Status Code**: *200 OK*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**constellation**: *The constellation object with the specified ID.*<br />
**message**: *A message indicating the result of the fetch.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json 
{
    "status_code": 200,
    "message": "Constellation with ID 1 deleted",
    "error": false
}
```
**Status Code**: *404 Not Found*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 404,
    "message": "Constellation not found",
    "error": true
}
```
**Status Code**: *400 Bad Request*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 400,
    "message": "Bad request",
    "error": true
}
```
**Status Code**: *500 Internal Server Error*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 500,
    "message": "Error deleting constellation",
    "error": true
}
```
---
## GET /star-constellation/star/:id

### Request
**Method**: *GET*<br />
**URL**: */star-constellation/star/:id*<br />
**Parameters**:<br />
>:warning:<br />
> **property_name:** id **|** **type:** integer **|** **required:** true **|** **description:** the ID of the star to retrieve<br />
>:warning:<br />

**Request Body**: *None*<br />

### Response
**Status Code**: *200 OK*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json 
{
    "status_code": 200,
    "data": {
        "id": 1,
        "name": "Sirius",
        "constellations": [
            {
                "id": 3,
                "name": "Canis Major",
                "createdAt": "2021-05-01T00:00:00.000Z",
                "updatedAt": "2021-05-01T00:00:00.000Z",
            }
        ],
        "createdAt": "2021-05-01T00:00:00.000Z",
        "updatedAt": "2021-05-01T00:00:00.000Z"
    },
    "error": false
}
```
**Status Code**: *404 Not Found*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 404,
    "message": "Star not found",
    "error": true
}
```
**Status Code**: *500 Internal Server Error*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 500,
    "message": "Error getting star",
    "error": true
}
```
---
## GET /star-constellation/constellation/:id

### Request
**Method**: *GET*<br />
**URL**: */star-constellation/constellation/:id*<br />
**Parameters**:<br />
>:warning:<br />
> **property_name:** id **|** **type:** integer **|** **required:** true **|** **description:** the ID of the constellation to retrieve<br />
>:warning:<br />

**Request Body**: *None*<br />

### Response
**Status Code**: *200 OK*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json 
{
    "status_code": 200,
    "data": {
        "id": 1,
        "name": "Sirius",
        "stars": [
            {
                "id": 3,
                "name": "Canis Major",
                "createdAt": "2021-05-01T00:00:00.000Z",
                "updatedAt": "2021-05-01T00:00:00.000Z",
            }
        ],
        "createdAt": "2021-05-01T00:00:00.000Z",
        "updatedAt": "2021-05-01T00:00:00.000Z"
    },
    "error": false
}
```
**Status Code**: *404 Not Found*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 404,
    "message": "Constellation not found",
    "error": true
}
```
**Status Code**: *500 Internal Server Error*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 500,
    "message": "Error getting constellation",
    "error": true
}
```
---
## POST /star-constellation/star/:starId/constellation/:constellationId

### Request
**Method**: *GET*<br />
**URL**: */star-constellation/star/:starId/constellation/:constellationId*<br />
**Parameters**:<br />
>:warning:<br />
> **property_name:** starId **|** **type:** integer **|** **required:** true **|** **description:** the ID of the star to retrieve<br />
> **property_name:** constellationId **|** **type:** integer **|** **required:** true **|** **description:** the ID of the constellation to retrieve<br />
>:warning:<br />

**Request Body**: *None*<br />

### Response
**Status Code**: *200 OK*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json 
{
    "status_code": 200,
    "message": "Association between Constellation Sirius and Star Canis Major added",
    "error": false
}
```
**Status Code**: *404 Not Found*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 404,
    "message": "Star or constellation not found",
    "error": true
}
```
**Status Code**: *409 Conflict*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 409,
    "message": "Association between Constellation Sirius and Star Canis Major already exists",
    "error": true
}
```
**Status Code**: *500 Internal Server Error*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 500,
    "message": "Error adding association between Star and Constellation",
    "error": true
}
```
---
## DELETE /star-constellation/star/:starId/constellation/:constellationId

### Request
**Method**: *DELETE*<br />
**URL**: */star-constellation/star/:starId/constellation/:constellationId*<br />
**Parameters**:<br />
>:warning:<br />
> **property_name:** starId **|** **type:** integer **|** **required:** true **|** **description:** the ID of the star to retrieve<br />
> **property_name:** constellationId **|** **type:** integer **|** **required:** true **|** **description:** the ID of the constellation to retrieve<br />
>:warning:<br />

**Request Body**: *None*<br />

### Response
**Status Code**: *200 OK*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json 
{
    "status_code": 200,
    "message": "Association between Constellation Sirius and Star Canis Major deleted",
    "error": false
}
```
**Status Code**: *404 Not Found*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 404,
    "message": "Association between Constellation Sirius and Star Canis Major not found",
    "error": true
}
```
**Status Code**: *500 Internal Server Error*<br />
**Body**: *None*<br />
**status_code**: *The status code of the response.*<br />
**message**: *A message indicating that an error occurred.*<br />
**error**: *A boolean indicating whether an error occurred.*<br />
```json
{
    "status_code": 500,
    "message": "Error deleting association between Star and Constellation",
    "error": true
}
```