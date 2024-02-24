# GCP Cloud Run Service Deploy
![Demo](./demo.gif)

Deploy a service to GCP Cloud Run using the CLI or a Github repo. 

Deploy a revision of a GCP service on push to a Github repo.

- [ ] Build app

I'm using NodeJS and [NPX Express Generator](https://expressjs.com/en/starter/generator.html)

- [ ] Build image

docker build -t primetimetran/gcp-cloud-run-example:demo1 . --platform linux/amd64

I included `--platform linux/amd64` because it'll fail in Cloud Run if I don't at the time of writing. Note that you may need to remove it for the next step to succeed.

- [ ] Test image works locally

docker run -p=3000:3000 primetimetran/gcp-cloud-run-example:demo1

We map host:container ports with the `-p=3000:3000`. So our host port 3000 will point toward the container port's 3000. If it was `-p=3005:3000` then it'd be host port `3005` to container port `3000`.

- [ ] Push image to Docker Hub

docker push primetimetran/gcp-cloud-run-example

This shares our local image to DockerHub's container registry.

- [ ] Create a service.yaml file and put your service/image data per [docs instruction](https://cloud.google.com/run/docs/deploying#images).

- [ ] Test new service revision from local command:

gcloud run services replace service.yaml --region us-central1

- [ ] Test new service revision from local command with region specified in service.yaml:

gcloud run services replace service.yaml

## Resources

- [GCP Cloud Run Docs](https://cloud.google.com/run/docs/deploying#service)