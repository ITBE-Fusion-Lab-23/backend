# Backend server code for ITBE Fusion Lab 2023 Group A

This is the repository storing the full backend server code for ITBE Fusion Lab Group A. It contains several folders including _3dcitydb_, _review-microservice_, and _review-db_.

By running all the components together, you can have the backend running locally on your device.

## Setup

Clone this repository:
```
git clone https://github.com/ITBE-Fusion-Lab-23/backend.git
```
> [!IMPORTANT]
> The 3DCityDB folder does not contain the necessary files to display the contents correctly. The files are too large to be pushed inside a git repository.

For the back end to run, the 3D CityDB data has to be added to the correct directories.
The folders "CityGMLData" and "pg-data" on the submission folder are to be put into the "3dcitydb" folder.

```
├── A_Submission_Folder/
│   ├── SoftwareDev/ 
│       ├── 3D City DB Data/
│           ├── CityGMLData/
│           ├── pg-data/
│   ├── ...
└── 
```

>[!NOTE]
> For security reasons, the database secrets and connections string should not be placed inside a git repository. Therefore, these files are also available only in the submission folder.

For the database to run properly, the database secrets (mongodb_root_password.txt, mongodb_root_username.txt) has to be inserted into the review-db/secrets folder, and the .env file has to be available in the root folder.

```
├── A_Submission_Folder/
│   ├── SoftwareDev/ 
│       ├── Backend Secrets/
│           ├── mongodb_root_password.txt
│           ├── mongodb_root_username.txt
│           ├── .env
│   ├── ...
└── 
```



## Quickstart

For a fast and easy start, run:

```
docker compose up --build
```

The spec.yaml file contains the Swagger Documentation of the Review-Microservice API with OpenAPI Specification 3.0 and can be tested here in the [Swagger Editor](https://editor.swagger.io).

## Contributors
- [@Jeffrey Limnardy](https://github.com/jeffreylimnardy)
- [@Julian Gerstner](https://github.com/JulianLeQuack)

Contact this [email](mailto:jeffrey.limnardy@tum.de) for more information about this repository.
