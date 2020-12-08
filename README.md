# ECC Extend Business Process Scenario

## Description
The main intent of this scenario is to complement an existing business process in an SAP solution – currently SAP S/4HANA, SAP SuccessFactors or selected SAP Cloud solutions - with additional business process steps. This involves adding major logic and/or additional data and goes beyond simple UI changes.

More details of extension scnenarios can be found [here](https://pages.github.tools.sap/sapcpextensions/).
Detailed steps of the S/4 HANA Extension Scenario can be found [here](https://github.wdf.sap.corp/refapps/cp-extension-scenarios/blob/master/s4-extend-business-process/Clickstream.xlsx?raw=true)

This application showcases:

- Building application on SAP Cloud Platform using SAP Cloud Application Programming Model(CAP)
- Consuming Events from S/4 HANA on premise using SAP CP Enterprise Messaging
- Consuming REST API's from S/4 HANA on premise using SAP CP Connectivity Service
- Serverless Runtime

## Business Scenario

A business scenario is used to showcase how to build a S/4 HANA on premise extension Application.

As an employee of Business Partner Validation Firm iCredible, which is a third party vendor of ACME Corporation, John would like to get notifications whenever new Business Partners are added in the S/4 HANA backend system of ACME Corporation. John would then be able to review the Business Partner details in his extension app. He would proceed to visit the Business Partner’s registered office and do some background verification. John would then proceed to update/validate the verification details into the extension app. Once the details are verified, the Business Partner gets activated in the S/4 HANA system of ACME Corporation.

- Custom extension application that works independently from S/4 HANA​

- Changes in S/4 communicated via events in real time to extension application.​

- Compute intensive batch processing available on demand (serverless environment)​

- Vendor personnel needs access to only custom app

## Architecture

### Solution Diagram

![solution diagram](./documentation/images/Architecture.png)

The Business Partner Validation application is developed using [SAP Cloud Application programming Model (CAP)](https://cap.cloud.sap/docs/) and runs and runs on the SAP Cloud Platform Cloud Foundry Environment. It consumes platform services like Enterprise Messaging, SAP HANA and Connectivity. The events generated in S/4 HANA on preimse are inserted into the Enterprise messaging queue. The application running in Cloud Foundry polls the queue for these messages and inserts them into the HANA database. The Business Partner Validation Application also uses S/4 HANA REST API's to read data from Business Partner Data from S/4 HANA system. The Business Partner Validation App also places the processed events into a Enterprise Message Queue from where a Serverless Application consumes it and posts it back to S/4 HANA on premise system

## Requirements
* S4 Hana on premise system.
* SAP Cloud Platform account with [Enterprise Messaging](https://help.sap.com/viewer/product/SAP_ENTERPRISE_MESSAGING/Cloud/en-US) service. The 'default' plan for Enterprise Messaging service is required.

### For local development you would require the following:
* [Node js](https://nodejs.org/en/download/)
* [Cloud Foundry Command Line Interface (CLI)](https://github.com/cloudfoundry/cli#downloads)
* [Visual Studio Code](https://cap.cloud.sap/docs/get-started/in-vscode)
* [cds-dk](https://cap.cloud.sap/docs/get-started/)
* [SQLite ](https://sqlite.org/download.html)
* To build the multi target application, we need the [Cloud MTA Build tool](https://sap.github.io/cloud-mta-build-tool/), download the tool from [here](https://sap.github.io/cloud-mta-build-tool/download/)
* For Windows system, install 'MAKE' from https://sap.github.io/cloud-mta-build-tool/makefile/
>Note: Please set the npm registry for @sap libraries using the command :  
`npm set @sap:registry=https://npm.sap.com`
* [multiapps plugin](https://github.com/cloudfoundry-incubator/multiapps-cli-plugin) - `cf install-plugin multiapps`  
*  mbt -  `npm install -g mbt`

## Configuration

### Entitlements

The application requires below set of SAP Cloud Platform Entitelements/Quota

| Service                           | Plan       | Number of Instances |
|-----------------------------------|------------|:-------------------:|
| Destination                       | lite       |          1          |
| Enterprise Messaging              | default    |          1          |
| SAP HANA Schemas & HDI Containers | hdi-shared |          1          |
| SAP Hana Service                  | 64standard |          1          |
| Application Runtime               |            |          3          |


### Project Structure

The project contains below folders and files

File / Folder | Purpose
---------|----------
`app/` | content for UI frontends go here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`package.json` | project metadata and configuration
`readme.md` | this getting started guide


### Steps to deploy locally

- Open terminal in VSCode
- Run `cds watch`

### Steps to deploy the application on CF

1. Build the application
    `mbt build -p=cf `  
2. Login to Cloud Foundry by typing the below commands on command prompt
    ```
    cf api <api>
    cf login -u <username> -p <password>
    ```
    `api` - [URL of the Cloud Foundry landscape](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/350356d1dc314d3199dca15bd2ab9b0e.html) that you are trying to connect to.

    Select the org and space when prompted to. For more information on the same refer [link](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/75125ef1e60e490e91eb58fe48c0f9e7.html#loio4ef907afb1254e8286882a2bdef0edf4).

3. Deploy the application

	Navigate to mta_archives folder and run the below command from CLI

   `cf deploy BusinessPartnerValidation_1.0.0.mtar`

## Known Issues

No known issues...

## How to Obtain Support

In case you find a bug, or you need additional support, please open an issue here in GitHub.

