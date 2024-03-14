# Google Groups Messanger

Create new conversation in Google groups using puppeteer.

_(Have in mind that this will work only if you don't have two-factor authentication set for the user)_

## Usage

Copy `example.config.json` to `config.json`.

### Locally

1. Run `yarn`
2. Run `yarn dev` and open http://localhost:8080/

### In the cloud

The project is prepared for deploying in GCP's cloud run.

1. Copy `example.cloudbuild.yaml` to `cloudbuild.yaml` and replace the placeholders.
2. Run `yarn deploy` (Of course you should have `gcloud` CLI already working)