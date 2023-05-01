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