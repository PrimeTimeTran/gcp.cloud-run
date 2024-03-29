# GCP Cloud Run Service Deploy
<!-- ![Demo](./demo.gif) -->

CI/CD with Github actions, Docker registry, GCP Cloud Run & NodeJS.

The purpose of this project is to demo how to automate in CI/CD the revision of a GCP Cloud Run Service on push to a Github Repo.

## Requirements

- Github
  - Repo
  - Secrets
  - Actions
  - .yml syntax
- Docker
  - Account
  - Repo
- GCP
  - Service Agent
  - .json

## Steps

### Build app

I used NodeJS and [NPX Express Generator](https://expressjs.com/en/starter/generator.html) because it was quick & easy to get a simple web page which you can checkout [here](https://gcp-cloud-run-example-64gv3lpybq-uc.a.run.app/).


### Update Version Code
Use a Marketplace Github Action to bump the version on push to repo/trigger.
In my case I just have it as push to main because this is a POC.

## Update Response from Github Action
Github actions have a lot of helpers which allow us to manage/administer our CI/CD pipeline more easily.

In this demo I just grab the commit sha to add to the resp as POC.

### Build image
Build the container image within the job.

```sh
docker build -t primetimetran/gcp-cloud-run-example:latest . --platform linux/amd64
```
I included `--platform linux/amd64` because it'll fail in Cloud Run if I don't at the time of writing. Note that you may need to remove it for the next step to succeed.

### Test image works locally
This is what you'd do locally before integrating the CI/CD to produce a revision within Github actions

```sh
docker run -p=3000:3000 primetimetran/gcp-cloud-run-example:latest
```

We map host:container ports with the `-p=3000:3000`. So our host port 3000 will point toward the container port's 3000. If it was `-p=3005:3000` then it'd be host port `3005` to container port `3000`.

### Push image to Docker Hub

```sh
docker push primetimetran/gcp-cloud-run-example
```
This shares our local image to DockerHub's container registry.

### Create a service.yaml file and put your service/image data per [docs instruction](https://cloud.google.com/run/docs/deploying#images).

### Test new service revision from local command:

```sh
gcloud run services replace service.yaml --region us-central1
```

### Test new service revision from local command with region specified in service.yaml:

```sh
gcloud run services replace service.yaml
```

## Resources

- [GCP Cloud Run Docs](https://cloud.google.com/run/docs/deploying#service)





## Bonus
Update index file using a step in the jobs action which updates the response to include a url to the commit which triggered the workflow.

```sh
sed -i "6s/.*/const resp = { title: 'CI\\\/CD with Github Actions, Docker, GCP Cloud Run', commitLink: '\$\{\{ github.event.repository.html_url \}\}\/commit\/\$\{\{ github.sha \}\}' }/" routes/index.js > routes/index_temp.js && mv routes/index_temp.js routes/index.js

```