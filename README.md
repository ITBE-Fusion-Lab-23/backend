# Backend server code for ITBE Fusion Lab 2023 Group A

This is the repository storing the full backend server code for ITBE Fusion Lab Group A. It contains several folders including _3dcitydb_, _review-microservice_, and _review-db_.

By running all the components together, you can have the backend running locally on your device.
## Quickstart

### Setup

Clone this repository:
```
git clone https://github.com/ITBE-Fusion-Lab-23/backend.git
```

> [!IMPORTANT]
> The 3DCityDB folder does not contain the necessary files to display the contents correctly. The files are too large to be pushed inside a git repository.
> For security reasons, the database secrets and connections string should not be placed inside a git repository. Therefore, these files are also available only in the submission folder.

For the back end to run, the 3D CityDB data, database secrets, and connection string must be added to the correct directories.

The folders "A_Submission_Folder/SoftwareDev/3D City DB Data/CityGMLData/" and "A_Submission_Folder/SoftwareDev/3D City DB Data/pg-data/" in the submission folder are to be put into the "backend/3dcitydb/" folder of the repository.

The database secrets ("A_Submission_Folder/SoftwareDev/Backend Secrets/mongodb_root_password.txt" and "A_Submission_Folder/SoftwareDev/Backend Secrets/mongodb_root_username.txt") have to be inserted into the repository under "backend/review-db/secrets/".

The submission file "A_Submission_Folder/SoftwareDev/Backend Secrets/.env" has to be made available in the repository's root folder "backend/".

Submission folder structure:

```
├── A_Submission_Folder/
│   ├── SoftwareDev/ 
│       ├── 3D City DB Data/
│           ├── CityGMLData/
│           ├── pg-data/
│       ├── Backend Secrets/
│           ├── mongodb_root_password.txt
│           ├── mongodb_root_username.txt
│           ├── .env
│   ├── ...
└── 
```

After all the files are correctly placed, run:

```
docker compose up --build
```

The spec.yaml file contains the Swagger Documentation of the Review-Microservice API with OpenAPI Specification 3.0 and can be tested here in the [Swagger Editor](https://editor.swagger.io).

## Contributors
- [@Jeffrey Limnardy](https://github.com/jeffreylimnardy)
- [@Julian Gerstner](https://github.com/JulianLeQuack)

Contact this [email](mailto:jeffrey.limnardy@tum.de) for more information about this repository.

## License

This repository is available under the MIT license. See the LICENSE file for more info.
