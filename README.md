# Backend server code for ITBE Fusion Lab 2023 Group A

This is the repository storing the full backend server code for ITBE Fusion Lab Group A. It contains several folders including _3dcitydb_, _review-microservice_, and _review-db_.

By running all the components together, you can have the backend running locally on your device.

## Setup

For the back end to run, the MongoDB and 3D CityDB data has to be added to the correct directories.
The folders "CityGMLData" and "pg-data" on SyncAndShare are to be put into the "3dcitydb" folder.

## Quickstart

For a fast and easy start, run:

```
docker compose up --build
```

The spec.yaml file contains the Swagger Documentation of the Review-Microservice API with OpenAPI Specification 3.0 and can be tested here in the [Swagger Editor](https://editor.swagger.io).

> [!IMPORTANT]
> The 3DCityDB folder does not contain the necessary files to display the contents correctly. The files are too large to be pushed inside a git repository. The files can be found [here](https://syncandshare.lrz.de/getlink/fi6upvofAsMGdi3iyQ5pdG/3D%20City%20DB%20Data).

>[!NOTE]
>The review-db/secrets folder should normally not be inside a git repository. However, for the purpose of this submission, in order to simplify the testing process, we left the secret inside the repository.

## Contributors
- [@Jeffrey Limnardy](https://github.com/jeffreylimnardy)
- [@Julian Gerstner](https://github.com/JulianLeQuack)

Contact this [email](mailto:jeffrey.limnardy@tum.de) for more information about this repository.
